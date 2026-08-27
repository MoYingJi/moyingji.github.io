# 一些项目

一些可以在 Linux 上运行的程序或网页

## 实用程序

### Qalculate!

`GPL-2.0-or-later` | [官网](https://qalculate.github.io)

多功能跨平台桌面计算器，具有可自定义的功能、单位、任意精度、符号计算等（库、命令行界面和图形用户界面）

### Filelight

`GPL-2.0-or-later` | [KDE 应用程序](https://apps.kde.org/zh-cn/filelight) [源代码](https://invent.kde.org/utilities/filelight)

KDE 系的磁盘占用查看器，以图形化方式显示电脑磁盘使用情况。它通过多层同心圆示意图来显示文件夹结构，易于理解

### DB Browser for SQLite

`MPL-2.0 OR GPL-3.0-or-later` | [官网](https://sqlitebrowser.org) [GitHub](https://github.com/sqlitebrowser/sqlitebrowser)

创建、设计和编辑与 SQLite 兼容的数据库文件

### StartLive

`GPL-3.0` | [GitHub](https://github.com/Radekyspec/StartLive)

绕过哔哩哔哩直播姬获取推流地址

### keyd

`MIT` | [GitHub](https://github.com/rvaiya/keyd)

Linux 上的系统级键盘重映射守护进程

非常好地帮我将 Copilot 替换为右 Ctrl。而且在我笔记本的键盘进可乐坏掉一小片区域的那几天帮了我很大忙

### OBS Game Capture

`GPL-2.0-or-later` | [GitHub](https://github.com/nowrep/obs-vkcapture)

高性能低开销地采集 Vulkan/OpenGL 游戏画面给 [OBS Studio](https://github.com/obsproject/obs-studio)

（比 PipeWire 效率高吧，还能捕获 HDR）

## 系统信息

### Mission Center

`GPL-3.0-or-later` | [官网](https://missioncenter.io) [GitLab](https://gitlab.com/mission-center-devs/mission-center)

一个任务管理器，使用了 Adwaita，界面设计比较类似 Windows 的任务管理器，~~可以数框框~~

### CPU-X

`GPL-3.0-or-later` | [官网](https://thetumultuousunicornofdarkness.github.io/CPU-X/) [GitHub](https://github.com/TheTumultuousUnicornOfDarkness/CPU-X)

可以收集有关 CPU、主板等的信息。类似于 Windows 上的 CPU-Z

### KDiskMark

`GPL-3.0-or-later` | [GitHub](https://github.com/JonMagon/KDiskMark)

简单磁盘基准测试工具，类似 CrystalDiskMark
可以测试顺序与随机读写性能，测试指标有带宽、IOPS、延迟（在界面中主要呈现的还是带宽）

### QDiskInfo

`GPL-3.0` | [GitHub](https://github.com/edisionnano/QDiskInfo)

显示现代硬盘驱动器的 SMART 数据，类似 CrystalDiskInfo

> [SMART](https://zh.wikipedia.org/wiki/S.M.A.R.T.)：<ruby>自我监测、分析及报告技术<rp>（</rp><rt>**S**elf-**M**onitoring **A**nalysis and **R**eporting **T**echnology</rt><rp>）</rp></ruby>

> [!TIP]
>
> 此项目支持简体中文翻译。但 Arch Linux 的 `archlinuxcn/qdiskinfo` 包没有中文翻译，可以安装 `aur/qdiskinfo-bin`，但属性名称还是没有中文

## 游戏相关

### 与另一篇文章相关

有包含在 [Linux 游戏](../gaming/index.md) 内的部分就不再赘述了

 - [ProtonPlus](../gaming/index.md#protonplus) - 管理 Proton 和 Steam 游戏的启动参数
 - [MangoHud](../gaming/index.md#mangohud) - 性能监控覆盖层（帧率和软硬件状态）
 - [GameMode](../gaming/index.md#gamemode) - 优化游戏进程的调度

### MHY Warp

`MIT` | [GitHub](https://github.com/busyoGG/MHYWarp)

兼容 Linux 的米游抽卡记录查询软件（不过是 Electron）
支持导入导出 UIGF 格式的文件

### CEP 终末地规划器

`AGPL-3.0` | **在线网页** | [Web](https://end.canmoe.com) [GitHub](https://github.com/cmyyx/cep)

为《明日方舟：终末地》提供：基质规划、角色攻略、精锻规划、卡池日历 等功能

## 音视频相关

### qpwgraph

`GPL-2.0-or-later` | **无本地化** | [freedesktop.org](https://gitlab.freedesktop.org/rncbc/qpwgraph) [GitHub](https://github.com/rncbc/qpwgraph)

基于 Qt 的 PipeWire 图/接线板。主要功能是相连或断连音频输入和输出。总之用了都说好玩，点进去看看嘛

### EasyEffects

`GPL-3.0-or-later` | [官网](https://wwmm.github.io/easyeffects) [GitHub](https://github.com/wwmm/easyeffects)

PipeWire 应用的限幅器、压缩器、卷积器、均衡器、自动音量控制以及许多其他插件

### Spek

`GPL-3.0` | [官网](https://www.spek.cc) [GitHub](https://github.com/alexkay/spek)

声学频谱分析仪。经常在视频里看到别人拿它来鉴别音频的 “真假无损”

## 其它

### we-layerd

`Unlicensed` | <span style="color: red;">**非开源**</span> | [GitHub](https://github.com/Aromatic05/we-layerd)

一个 Linux Wayland 原生的 Wallpaper Engine 运行时

基于 Rust 守护进程实现，支持 GNOME 以及 layer-shell 合成器（如 niri、Hyprland 和 KDE Plasma）

## 赤石科技

### CEF Detector

`MIT` | [GitHub](https://github.com/Tobiichi-Origuchi/CefDetector)

喜报！这台电脑上一共有 n 个 Chromium 内核的应用！

> 你说的对，但是《LibCEF》是由谷歌自主研发的一款全新开放浏览器内核。第三方代码运行在在一个被称作「CEF」的浏览器沙盒，在这里，被前端程序员选中的代码将被授予「libcef.so」，导引浏览器之力‌。你将扮演一位名为「电脑用户」的冤种角色，在各种软件的安装中下载类型各异、体积庞大的 CEF 们，被它们一起占用硬盘空间，吃光你的内存——同时，逐步发掘「CEF」的真相
