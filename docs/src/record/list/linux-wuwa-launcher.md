# 使用 Wine 在 Linux 上运行鸣潮启动器

在 Linux 上，鸣潮本体可以通过特殊手段运行，但启动器却不行，这让我们的游戏更新非常困难

## 在 Wine 中安装并修复鸣潮启动器

正常在 Wine 中安装鸣潮启动器即可，此时启动器是无法打开的

首先，我们要更改 WebView2 的兼容设置，使其检测到系统的环境为 Windows 7，在 Wine 中执行以下命令

```batch
reg add 'HKCU\Software\Wine\AppDefaults\msedgewebview2.exe' /v Version /d win7
```

然后我们准备开始修补启动器本体，这需要在 Linux 中安装 bbe

找到启动器所在位置，这通常在 `$WINEPREFIX/drive_c/Program Files/Wuthering Waves/`

### 手动补丁

找到 `Wuthering Waves` 目录下，会有一个版本名字的文件夹，类似于 `2.2.1.0`，在这个文件夹下打开命令行

接下来要修补 `launcher_main.dll` 文件，推荐先在补丁前备份原始文件

```bash
cp launcher_main.dll launcher_main.dll.bak
```

修补该文件

```bash
bbe -e "s/\x12AllowsTransparency/\x09IsEnabled\x1bA\x00\x03AAAAA/" launcher_main.dll.bak > launcher_main.dll
```

然后打开启动器，启动器可以正常打开
每次启动器更新都需要重新执行这个操作

### 使用脚本

修改高亮位置的路径为启动器路径，并运行如下脚本

```bash{4}
#!/usr/bin/env bash

# Base directory where version directories reside
base_dir="/path/to/Wuthering Waves"

# Check if bbe is installed
if ! command -v bbe &> /dev/null; then
    echo "Error: bbe is not installed. Please install bbe and try again."
    exit 1
fi

# Auto-detect the latest version directory (assumes version directories match the pattern X.Y.Z.W)
version_dir=$(find "$base_dir" -maxdepth 1 -type d -name "[0-9]*.[0-9]*.[0-9]*.[0-9]*" | sort -V | tail -n1)

if [ -z "$version_dir" ]; then
    echo "No version directory found in '$base_dir'."
    exit 1
fi

echo "Using version directory: $version_dir"
cd "$version_dir" || { echo "Failed to change directory to $version_dir"; exit 1; }

# Check if the DLL still contains the original pattern
if ! grep -a -q $'\x12AllowsTransparency' launcher_main.dll; then
    echo "launcher_main.dll is already patched or does not contain the expected pattern."
    exit 0
fi

# Backup the original file and apply the patch using bbe
mv launcher_main.dll launcher_main.dll.bak
bbe -e "s/\x12AllowsTransparency/\x09IsEnabled\x1bA\x00\x03AAAAA/" launcher_main.dll.bak > launcher_main.dll

echo "Patch applied successfully."
```

然后打开启动器，启动器可以正常打开
每次启动器更新都需要重新执行这个操作


## 参考
#69 - New Waves launcher does not work out of the box (workaround in thread)
应项目要求不予提供此链接
