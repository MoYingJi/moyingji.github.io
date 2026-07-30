# 为原神开启 HDR

> [!IMPORTANT]
>
> 内容编写于 2026-05-29，可能有时效性

先确保系统的 HDR 正常，先看 [这里](../index.md#hdr)，需要设置 `PROTON_ENABLE_WAYLAND=1 PROTON_ENABLE_HDR=1 DXVK_HDR=1`

原神隐藏了 HDR 设置的开关，因此需要修改注册表

```batch
:: 国服
reg add "HKEY_CURRENT_USER\Software\miHoYo\原神" /v WINDOWS_HDR_ON_h3132281285 /t REG_DWORD /d 1 /f
:: 国际服
reg add "HKEY_CURRENT_USER\SOFTWARE\miHoYo\Genshin Impact" /v WINDOWS_HDR_ON_h3132281285 /t REG_DWORD /d 1 /f
```

> [!IMPORTANT]
>
> 将命令保存在批处理文件中时，需要注意编码问题
>
> 比如以 UTF-8 编码保存，需要在开头加入 `chcp 65001`

空月之歌后，此注册表项会在每次进入游戏后重置为 `0`，因此，此操作需要每次打开游戏都进行一次

这在 Windows 上可以通过创建一个批处理文件启动游戏来解决，但这会影响 `UMU_USE_STEAM`（此功能要生效，游戏本体必须**直接**由 Proton 或 UMU 启动，因为它的作用就是让游戏的父进程是 `steam.exe`），所以只能在 Linux 侧两次启动 Wine，就像这样：

```shell
# 指定 Wine Prefix 和 Proton
export WINEPREFIX="/path/to/prefix"
export PROTONPATH="/path/to/proton"
# 设置
export PROTON_ENABLE_WAYLAND=1
export PROTON_ENABLE_HDR=1
export DXVK_HDR=1
# 先启动一次，执行一些操作（像这样子在 Linux 侧调用不用考虑编码问题，保存在批处理文件中则需要考虑）
umu-run reg add "HKEY_CURRENT_USER\Software\miHoYo\原神" /v WINDOWS_HDR_ON_h3132281285 /t REG_DWORD /d 1 /f
# 再直接启动游戏
UMU_USE_STEAM=1 umu-run "/path/to/YuanShen.exe"
```

> [!TIP]
>
> 也可以将两条命令倒转（先运行游戏，游戏结束完后再设置注册表），这样做的优点是游戏启动快，缺点是设置后首次启动不生效（因为这里设置注册表相当于设置了下次启动的值）

> [!TIP]
>
> 设置注册表的简便方法
>
> 如果已经设置过一次注册表，就可以用一些偷懒方法。因为游戏不会直接删除注册表项，而是将其设置为 `0`，这就给 Linux 侧的~~神秘~~操作留下了空间
>
> ```shell
> export WINEPREFIX="/path/to/prefix"
> # 保证此 prefix 下没有 wineserver 运行（通常对应游戏关闭）
> sed -i 's/"WINDOWS_HDR_ON_h3132281285"=dword:00000000/"WINDOWS_HDR_ON_h3132281285"=dword:00000001/g' "$WINEPREFIX/user.reg"
> ```
