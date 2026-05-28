# Linux 游戏

这里有一些 Linux 游戏相关的东西

 - 本文会尽量用词正确
 - 本文适用于 Arch Linux，但尽量在其它发行版下也保持正确
 - 本文默认读者拥有 Linux 基础

## 使用 Proton 游玩 Windows 游戏

> [!TIP]
>
> 我写了一个简单的通用启动脚本 [Hyps](https://github.com/MoYingJi/Hyps)，它的核心部分都由 Bash 编写，这也使得用户可以方便地查看、更改源代码。或许可以在里面找到有用的部分，可能是一个小工具、一个环境变量、一段警告。但现在已经变成石山了

### 基础知识 - Wine / Proton

Wine 是一款可以在类 Unix 操作系统中运行 Windows 应用程序的兼容层（[Wine - ArchWiki](https://wiki.archlinux.org/title/Wine)）

Proton 是基于 Wine 的 Steam Play 兼容性工具，做了很多优化改进，还免去了一些环境配置

#### Wine Prefix

Wine Prefix（或译作 Wine 前缀）是一个目录，它就像一个 Windows 环境，Wine 将设置、注册表和模拟的目录结构都放在下面

> [!TIP]
>
> 推荐为每个游戏使用一个不同的 Wine Prefix，当一个游戏的环境出问题时也不会影响其它游戏，而且也能为不同的游戏使用不同的 Wine 或 Proton 版本（因为如果 Wine Prefix 和 Wine 的版本不匹配，就需要在启动 Wine 时升级 Prefix，这会耗费较长时间）

默认的 Wine Prefix 位置在 `~/.wine/`

一个 Wine Prefix 大致长这样（模拟，非真实输出）

```
├── dosdevices
│   ├── c: -> ../drive_c
│   ├── z: -> /
│   ├── com1 -> /dev/ttyS0
│   ├── com2 -> /dev/ttyS1
│   └── ...
├── drive_c
│   ├── ProgramData
│   ├── Program Files
│   ├── Program Files (x86)
│   ├── users
│   └── windows
├── system.reg
├── userdef.reg
└── user.reg
```

Steam Play 使用 Compat Data 作为兼容的 “容器”，Proton 作为一个集成进 Steam 的 Steam Play 兼容性工具，也使用了这个目录结构（后面所说的 Compat Data 默认是 Proton 的 Compat Data）

如果通过 Steam 启动，这个目录默认会在 Steam 游戏库里的 `steamapps/compatdata/<AppID>/`

（Steam 的默认游戏库在 `~/.local/share/Steam/`）

一个 Compat Data 大致长这样（模拟，非真实输出）

```
├── pfx
│   ├── dosdevices
│   ├── drive_c
│   ├── system.reg
│   ├── userdef.reg
│   ├── user.reg
│   └── creation_sync_guard
├── config_info
├── pfx.lock
├── tracked_files
└── version
```

啊没错，`pfx` 目录其实就是 Wine Prefix 的结构。现在通常将 Wine Prefix 和 Compat Data 混称，甚至直接建立一个 `pfx -> .` 的符号链接，更模糊了两者，~~所以这已经不重要了，我也混称吧（~~

#### 理论知识 - DirectX 支持

众所周知，Linux 不支持 DirectX，因此游玩使用 DirectX 的游戏需要**图形指令翻译工具**（简称翻译层）

Wine 默认的 DirectX（DX12 除外）翻译层是 WineD3D，将其翻译为 OpenGL，已经严重落后。现在更推荐的是 [dxvk](https://github.com/doitsujin/dxvk)，可以将 DirectX 8~11 翻译为 Vulkan。Proton 默认使用 dxvk。dxvk 还有一个分支是 [dxvk-gplasync](https://gitlab.com/Ph42oN/dxvk-gplasync)，异步编译着色器以尽可能减少卡顿

Wine 默认的 Direct3D 12 翻译层是 vkd3d，将其翻译为 Vulkan。Proton 默认使用的 vkd3d-proton 是 VKD3D 的一个分支，为游戏优化

如果使用 NVIDIA 显卡，还推荐使用 dxvk-nvapi，它为 dxvk 和 vkd3d-proton 提供 NVIDIA NVAPI 库的实现，转发相关调用（主要是 [NVIDIA DLSS](#nvidia-dlss)）。Proton 已经默认添加

### 打开 Wine 设置

正如我之前所说，Wine 设置是每个 Prefix 独立的，所以这需要指定 Prefix，同时最好也使用和这个 Prefix 版本一样的 Wine 来设置

```shell
# Wine
WINEPREFIX="/path/to/prefix" /path/to/wine winecfg
# Proton (裸) (不建议使用，建议使用 UMU，详见后文)
STEAM_COMPAT_DATA_PATH="/path/to/prefix" /path/to/proton/proton run winecfg
# UMU
WINEPREFIX="/path/to/prefix" PROTONPATH="/path/to/proton" umu-run winecfg
```

### 为 Wine 替换 dxvk

> [!IMPORTANT]
>
> Proton 不需要这个操作

下载一个 dxvk，会看到这样的目录结构

```
dxvk-gplasync-v2.7.1-1
├── x32
│   ├── d3d10core.dll
│   ├── d3d11.dll
│   ├── d3d8.dll
│   ├── d3d9.dll
│   └── dxgi.dll
└── x64
    ├── d3d10core.dll
    ├── d3d11.dll
    ├── d3d8.dll
    ├── d3d9.dll
    └── dxgi.dll
```

将 `x64` 中的所有 dll 复制或替换到 Wine Prefix 的 `system32` 文件夹内，`x32` 复制或替换到 `syswow64` 内

dxvk 提供的演示：

```shell
export WINEPREFIX=/path/to/wineprefix
cp x64/*.dll $WINEPREFIX/drive_c/windows/system32
cp x32/*.dll $WINEPREFIX/drive_c/windows/syswow64
```

然后[打开 Wine 设置](#打开-wine-设置)，打开「**函数库**」选项卡，在「**新增函数库顶替**」中分别添加 `d3d8`、`d3d9`、`d3d10core`、`d3d11`、`dxgi`，然后为添加到每一个项，点击右侧「**编辑**」，选择「**原装**」

或者直接通过命令改注册表

```batch
:: 这是一个 Windows 批处理，是在 Wine 内运行的
reg add "HKEY_CURRENT_USER\Software\Wine\DllOverrides" /v "d3d8" /d native /f
reg add "HKEY_CURRENT_USER\Software\Wine\DllOverrides" /v "d3d9" /d native /f
reg add "HKEY_CURRENT_USER\Software\Wine\DllOverrides" /v "d3d10core" /d native /f
reg add "HKEY_CURRENT_USER\Software\Wine\DllOverrides" /v "d3d11" /d native /f
reg add "HKEY_CURRENT_USER\Software\Wine\DllOverrides" /v "dxgi" /d native /f
```

### UMU - 脱离 Steam 运行 Proton

Steam 让 Proton 在专门的容器中运行，直接运行 Proton 可能会遇到问题。推荐的方法是在 Steam 中手动添加游戏、选择自定义 Proton 后启动。[详细信息](https://github.com/GloriousEggroll/proton-ge-custom#ge-proton)

[UMU](https://github.com/Open-Wine-Components/umu-launcher) 会模拟 Steam 启动 Proton 的方式，使之可以脱离 Steam 运行

```shell
# 直接运行即可，（如果不指定）会自动下载官方 Proton 最新版本
umu-run "/path/to/game.exe"
# 或者也可以给游戏加参数
umu-run "/path/to/game.exe" -SkipSplash -dx12
# 通过环境变量，分别指定自定义 Proton 和 Wine Prefix（Compat Data）
PROTONPATH="/path/to/proton/" WINEPREFIX="/path/to/prefix" umu-run "/path/to/game.exe"
```

大多第三方启动器都默认使用了 UMU 启动游戏

### ProtonPlus

[ProtonPlus](https://github.com/Vysp3r/ProtonPlus) 是一款兼容性工具管理器

它的众所周知的功能是下载和更新多种 Proton 版本。除此之外，它还可以一键[切换 Steam 游戏所使用的 Proton 版本](#强制指定-proton-版本)，提供方便的[启动选项](#基础知识---启动选项)编辑功能

### HDR

关于 Linux 上的 HDR 支持，可以看 [HDR - ArchWiki](https://wiki.archlinux.org/title/HDR)，确保 HDR 被正确配置（比如使用 mpv 看一个 HDR 视频，或使用支持的浏览器如 Chromium 打开 [HDR 测试网页](https://testufo.com/hdr)）

> [!IMPORTANT]
>
> 内容编写于 2026-05-25，可能有时效性

由于 X.org 不支持 HDR，因此需要将 Proton 切换到原生 Wayland，设置环境变量 `PROTON_ENABLE_WAYLAND=1` 启用 Proton 的实验性原生 Wayland 驱动，这可能会引发一些问题。然后设置环境变量 `PROTON_ENABLE_HDR=1` 启用 HDR 支持

### NVIDIA DLSS

详见
 - [DLSS / Smooth Motion / Reflex — NVIDIA Driver Installation Guide](https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/gaming.html)
 - [Passing driver settings · jp7677/dxvk-nvapi Wiki](https://github.com/jp7677/dxvk-nvapi/wiki/Passing-driver-settings)

有了 dxvk-nvapi，大多数功能开箱即用，除了在 Vulkan 上的 NVIDIA Reflex（比如终末地），需要额外的 Vulkan 层，Arch 系用户可以直接安装 [aur/dxvk-nvapi-vkreflex-layer](https://aur.archlinux.org/packages/dxvk-nvapi-vkreflex-layer)（其它发行版可以看[这里](https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/gaming.html#reflex-for-vulkan-steam-play-proton)），然后为游戏设置环境变量 `DXVK_NVAPI_VKREFLEX=1`

### Workarounds

#### 鸣潮

[在 Linux 上运行鸣潮官方启动器](./workarounds/wuwa-launcher.md)

### 其它问题

#### 鼠标光标大小

这是系统缩放与 Wine 的 DPI 不匹配的问题

[打开 Wine 设置](#打开-wine-设置)，打开「**显示**」选项卡，找到「**屏幕分辨率**」，（如果这项从未不内你设置过）将输入框中的数字（一般默认是 96）乘以你的缩放再填进去就好了

## Steam

使用 Proton 运行游戏时，上面的内容同样适用，不再赘述

### 基础知识 - 启动选项

Steam 会在游戏启动时将启动选项中的 `%AppId%` 替换为游戏对应的数字 ID，`%command%` 替换为默认启动命令，然后运行这个新命令

一个常用的启动选项是

```shell
prime-run gamemoderun mangohud %command%
```

简单地说，`prime-run` 指定游戏运行在 NVIDIA 显卡上，`gamemoderun` 优化游戏的调度，`mangohud` 启动一个性能检测覆盖层（类似微星小飞机）。当然，这不是通用的，比如你不是 NVIDIA 显卡就可以将 `prime-run` 删去或替换为你显卡的 PRIME；你也分别需要安装 [GameMode](#gamemode) 和 [MangoHud](#mangohud) 才能使用 `gamemoderun` 和 `mangohud`

如果想要实验，甚至可以

```shell
notify-send steam "%command%"
# (需要安装 libnotify) 把启动命令作为消息发送到桌面环境
# 或者
echo "%command%" > $(mktemp /tmp/steam-command.XXXXXXXXXX)
# 把启动命令写入一个文件，在 /tmp 下找文件 steam-command 就可以了
# 都是正常起效果的
```

### 强制指定 Proton 版本

要让某个游戏强制用某个 Proton 运行，只需要在库中右键游戏，「**属性...**」->「**兼容性**」，勾选「**强制使用特定 Steam Play 兼容性工具**」，然后就在下面的下拉框里随便选啦

如果要给 Steam 添加你自己的 Proton，只需要将 Proton 放在下面的任意文件夹里即可
 - `~/.local/share/Steam/compatibilitytools.d/`（用户级）
 - `/usr/share/steam/compatibilitytools.d/`（系统级）

从 AUR 安装的 Proton 大都已经放在系统级文件夹下了，通过 [ProtonPlus](#protonplus) 安装的也都放在用户级文件夹下了

除 Steam 外，大多第三方启动器也都默认会从这里寻找 Proton

### Steam 库所在分区限制影响 compatdata

如果 Steam 游戏库位于 NTFS 或 exFAT 等有限制的文件系统，这会有点麻烦

Proton 会在 [Wine Prefix](#wine-prefix) 中的 `dosdevices` 文件夹中创建 `c:` 等文件夹（或指向 `../drive_c` 的符号链接）。但有些文件系统并不支持文件名中包含 `:` 这个特殊字符，有些文件系统甚至不支持符号链接

对于支持符号链接但不支持特殊字符的文件系统，可以直接将 Steam 库中的 `compatdata` 文件夹迁移至支持的文件系统，并创建一个符号链接，将 Steam 库中的 `compatdata` 链接到迁移的位置。我习惯全部塞到 `~/.local/share/Steam/steamapps/compatdata/` 里面

如果连符号链接都不支持，那只能从[启动选项](#基础知识---启动选项)下手，使用 `STEAM_COMPAT_DATA_PATH` 环境变量手动指定位置。迁移 `compatdata`。对于每个在这个库的游戏，在启动选项前添加这个环境变量，就像

```shell
STEAM_COMPAT_DATA_PATH="$HOME/.local/share/Steam/steamapps/compatdata/%AppId%" %command%
```

## 实用工具

这里的介绍尽量简洁。如果相中了，你总要点进去看的，不是吗？（

### MangoHud

[MangoHud](https://github.com/flightlessmango/MangoHud) 是一个 Vulkan 和 OpenGL 覆盖层，用于在应用程序内监控系统性能并记录基准测试指标（[MangoHud - ArchWiki](https://wiki.archlinux.org/title/MangoHud)）

要使用它，只需要将 `mangohud` 包装在游戏命令的外面，比如[在 Steam 中使用启动选项](#基础知识---启动选项) `mangohud %command%`

它类似于 Windows 上微星小飞机的性能监控叠加层。官方在 README 提供了 GIF 预览，可以看看是否符合心意。默认配置会在目标窗口左上角显示 FPS、CPU 和 GPU 占用等指标，按 <kbd>RShift</kbd>+<kbd>F12</kbd> 切换隐藏和显示

要显示的内容、显示样式、位置、快捷键等，都可以在配置文件中自定义，通用的配置文件位于 `~/.config/MangoHud/MangoHud.conf`，也可以为每个应用程序或游戏配置不同的配置文件（[详细信息](https://github.com/flightlessmango/MangoHud#hud-configuration)）。官方提供了[示例配置](https://github.com/flightlessmango/MangoHud/blob/master/data/MangoHud.conf)

配置文件也可以通过图形化配置。官方推荐使用 [GOverlay](https://github.com/benjamimgois/goverlay)，但它附带且依赖其它东西，有一个更便捷的替代品是 [MangoJuice](https://github.com/radiolamp/mangojuice)

### GameMode

[GameMode](https://github.com/FeralInteractive/gamemode) 是一个 Linux 守护进程和库的组合，它允许游戏请求将一组优化临时应用于主机操作系统和/或游戏进程（[GameMode - ArchWiki](https://wiki.archlinux.org/title/GameMode)）

它可以配置包括但不限于 CPU 和 I/O 调度、GPU 超频，还能在游戏运行时阻止熄屏或睡眠，禁用拆分锁缓解等

要使用它，只需要将 `gamemoderun` 包装在游戏命令的外面，比如[在 Steam 中使用启动选项](#基础知识---启动选项) `gamemoderun %command%`

它的用户配置文件位于 `~/.config/gamemode.ini`。官方提供了[示例配置](https://github.com/FeralInteractive/gamemode/blob/master/example/gamemode.ini)（[详细信息](https://github.com/FeralInteractive/gamemode#configuration)）

### OverlayFS

可以让游戏文件本体保持只读（比如只读挂载 NTFS 分区），但允许游戏文件被修改（比如缓存和热更新等），修改都被保存到一个目录里，删掉这个目录就能一键复原游戏文件

详见 [Overlay 文件系统](../overlayfs.md)

## NVIDIA

最基础的安装就不用我说了吧，Arch 最简单的可以看 [Arch Wiki](https://wiki.archlinux.org/title/NVIDIA)，其它发行版我没用过也不知道啊（

NVIDIA 驱动会附上一份 README。它应该已经在你电脑里了。你可以通过包管理器查看 NVIDIA 驱动相关的包拥有哪些文件。Arch Linux 的 `extra/nvidia-utils` 在 `/usr/share/doc/nvidia/` 里

当然，也有一份[在线版](https://download.nvidia.com/XFree86/Linux-x86_64/595.71.05/README/)，最好将 URL 中的驱动版本换成你现在的

### NVIDIA Dynamic Boost

> [!IMPORTANT]
>
> 内容可能与显卡型号、驱动版本、笔记本厂商都有关，仅做尝试

最大功耗达不到宣称的最大功耗，此时就需要启用 Dynamic Boost

```shell
sudo systemctl enable --now nvidia-powerd.service
```

开启了 Dynamic Boost 后，笔记本的模式切换也会影响最大功耗，比如我，只有在笔记本的狂暴模式下才能解锁标称的最大功耗 140W，否则只有 80W

[官方配置说明](https://download.nvidia.com/XFree86/Linux-x86_64/595.71.05/README/dynamicboost.html)
