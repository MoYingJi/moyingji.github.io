# Obtainium
从各来源更新你的 Android 应用

<ProjectProperties name="Obtainium">
    <template #platform> <PlatformAndroid/> </template>
    <template #url> <LinkGithub project="ImranR98/Obtainium"/> </template>
    <template #license> GPL-3.0-only </template>
    <template #android> dev.imranr.obtainium </template>
</ProjectProperties>

<ProjectDownloads
    obtainium_github="ImranR98/Obtainium"
/>

Obtainium 是一个开源的 Android 应用获取和更新工具

其可以从包括但不限于

- F-Droid 官方和第三方仓库
- GitHub Releases
- 腾讯应用宝
- 酷安
- vivo 应用商店
- 华为应用市场

等等来源获取和更新 Android 应用

不过，将其作为搜索工具可不好... 因为其搜索功能比较差劲
所以我的选择是先复制好对应来源的 URL 粘贴到里面来添加应用程序

同时，此应用也会出现在本推荐菜单的食用方法中 (包括本应用)
所以你会看到套娃了（

## 添加应用

首先，你需要准备一个来源 URL 比如 GitHub 仓库的 URL (前提是其在 GitHub Releases 中发布 Apk)
点击底栏的 <bt>添加应用</bt>，然后将来源 URL 填入，配置好选项后点击 <bt>添加</bt>
之后 Obtainium 会自动下载安装包 (或者跳出提示框让你选择版本或架构)
下载完后会和本地的版本进行比对，如果本地版本低于下载的版本，则会进行更新，或者本地不存在，则会进行安装
完成啦！是不是有点废话...
