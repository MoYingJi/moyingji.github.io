# Sunshine / Moonlight
一套自托管的串流服务

## Moonlight

Sunshine 和 NVIDIA GameStream 的开源客户端

Moonlight 是 NVIDIA GameStream 协议的开源实现<br/>
其实现了 NVIDIA Shield 使用的协议，并编写了一组第三方客户端

<ProjectProperties name="Moonlight">
    <template #platform> <PlatformWindows/> <PlatformLinux/> <PlatformMacOS/> <PlatformAndroid/> </template>
    <template #url>
        <LinkGithub project="moonlight-stream/moonlight-qt" suffix="Qt (PC)"/>
        <LinkGithub project="moonlight-stream/moonlight-android" suffix="Android"/>
    </template>
    <template #license> GPL-3.0 </template>
    <template #android> com.limelight </template>
</ProjectProperties>

<ProjectDownloads
    winget="MoonlightGameStreamingProject.Moonlight"
    archlinux_repo="extra" archlinux_name="moonlight-qt"
    obtainium_github="moonlight-stream/moonlight-android"
/>

### 月光·阿西西

Moonlight 的一个分支，增强了一些功能

::: warning
此项目及其作者被曝有问题，参见 [关于「月光·阿西西」及其作者](/fragments/moonlight-axixi)
:::

<ProjectProperties name="月光·阿西西">
    <template #platform> <PlatformAndroid/> </template>
    <template #url> <LinkGithub project="Axixi2233/moonlight-android"/> </template>
    <template #license> GPL-3.0 (假开源) </template>
    <template #android> com.limelight.unofficialA </template>
</ProjectProperties>

<ProjectDownloads
    obtainium_github="Axixi2233/moonlight-android"
/>

## Sunshine

Moonlight 的自托管游戏串流主机

<ProjectProperties name="Sunshine">
    <template #platform> <PlatformWindows text="Windows 10+"/> <PlatformLinux/> <PlatformMacOS text="MacOS 13+"/> </template>
    <template #url> <LinkGithub project="LizardByte/Sunshine"/> </template>
    <template #license> GPL-3.0 </template>
</ProjectProperties>

<ProjectDownloads
    winget="LizardByte.Sunshine"
    archlinuxcn="sunshine"
    aur="sunshine-bin"
/>

Sunshine 是串流的服务端, 配置好后就可以在 Moonlight 上开始串流了

你需要在 Sunshine 的托盘图标中右键，点击 <BadgeText text="Open Sunshine"/> 以打开 Sunshine 的 WebUI<br/>
然后设置一个用户名和密码，以后打开 WebUI 时都会需要<br/>
可以在 <BadgeText text="Configuration"/> -> <BadgeText text="General"/> -> <BadgeText text="Locale"/> 中设置 WebUI 的语言为中文

如果遇到了问题 可以查看 [官方 Troubleshooting](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2troubleshooting.html)

### 配置 KMS 捕获 <PlatformLinux/>

大部分 Wayland 桌面环境都需要允许 KMS 捕获才能工作

使用以下命令允许 Sunshine 进行 KMS 捕获

```bash
sudo setcap cap_sys_admin+p $(readlink -f $(which sunshine))
```

### 自启动服务 <PlatformLinux/>

Sunshine 默认创建了一个服务 用于自启动，使用以下命令来启用此服务

```bash
systemctl --user enable sunshine
```
