# lzxszty

独立的恋爱区静态站。当前包括首页、日常、数据、时间线、碎碎念、关于、成就和小游戏等基础入口。

## Commands

```sh
npm ci
npm run dev
npm run build
npm run preview
```

如果在 WSL 里开发：

```sh
cd /mnt/d/ztyqwqSite/lzxszty
. ~/.nvm/nvm.sh
nvm use 22
npm ci
npm run dev
```

## Routes

```text
/
/post/
/post/:slug/
/stat/
/timeline/
/whisper/
/about/
/achievement/
/game/
```

## Materials

首页素材库放在 `public/materials/`。当前只有一张占位爱心图，首页每次载入会从素材库里随机挑选一张图。

## Deployment

这个仓库是 GitHub Pages project site，默认公开地址会是：

```text
https://ztyqwq.github.io/lzxszty/
```

Astro 已配置 `base: '/lzxszty'`。

## Privacy

真正私密的文字和图片不要以明文放进 `public/` 或最终构建产物。后续私密层应使用构建时加密，或保留在不发布的私有目录里。
