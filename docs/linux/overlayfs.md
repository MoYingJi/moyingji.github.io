# Overlay 文件系统

OverlayFS 的内容来自多个目录，可以让上层目录（upperdir）的内容覆盖下层目录（lowerdir）

有关它的详细信息，可以看
 - [Overlay filesystem - ArchWiki](https://wiki.archlinux.org/title/Overlay_filesystem)
 - [Overlay Filesystem - The Linux Kernel documentation](https://docs.kernel.org/filesystems/overlayfs.html)

这里只介绍它的常见用途之一：将 OverlayFS 的所有修改操作都应用到可写的上层目录，这样修改 OverlayFS 时就不会实际修改下层目录

## 挂载

在这种情况下，还需要一个与上层目录处于同一文件系统且可写的工作目录（workdir）

```shell
# 使用 mount（需要 root）
mount -t overlay overlay -o lowerdir=/lower,upperdir=/upper,workdir=/work /merged
# 使用 fuse-overlayfs（需要安装相应的软件包）
fuse-overlayfs -o lowerdir=/lower,upperdir=/upper,workdir=/work /merged
# （将上方的 /lower、/upper、/work、/merge 替换为真实路径）
```

这样就将 OverlayFS 挂载到了 `/merged` 上。当 `/upper` 没有任何内容时，`/merged` 的内容和 `/lower` 一致。对 `/merged` 的所有修改不会影响 `/lower`，而是被转发到 `/upper`

## 演示修改

```shell
touch /lower/test
```

`/merged` 中会有 `/lower` 的内容

```
├── lower
│   └── test
├── merged
│   └── test
├── upper
└── work
```

修改 `/merged`

```shell
touch /merged/newfile
```

```
├── lower
│   └── test
├── merged
│   ├── newfile
│   └── test
├── upper
│   └── newfile
└── work
```

```shell
rm /merged/test
```

```
├── lower
│   └── test      # <empty>
├── merged
│   └── newfile
├── upper
│   ├── newfile
│   └── test      # <whiteout> (用于遮挡住位于下层目录的同名文件，这样它看起来就被删除了)
└── work
```

```shell
echo "modify file" > /merged/test
```

```
├── lower
│   └── test      # <empty>
├── merged
│   ├── newfile
│   └── test      # modify file
├── upper
│   ├── newfile
│   └── test      # modify file
└── work
```

## 用途

### 游戏运行

NTFS 在 Linux 上比较灵车，平时我的 NTFS 游戏分区以只读挂载，但游戏运行时却需要修改自身的文件（如一些缓存和热更新），此时我就会使用 OverlayFS，游戏本体保持只读，游戏的缓存和热更新等都会被写到我指定的 OverlayFS 的上层目录里

这样做的用途不仅在于可以只读挂载游戏分区，存在于只读文件系统上的游戏文件肯定是未被修改的原始文件，对于环境调试也更方便了，因为我只需要清空上层目录就可以将游戏文件复原

> [!TIP]
>
> 我的游戏启动脚本 [Hyps](https://github.com/MoYingJi/Hyps) 里写了这项功能，可以在里面搜索 `OVERLAY` 寻找相关代码，看到我是如何使用的
