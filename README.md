# lzxszty

独立的恋爱区静态站。当前只是 Astro 骨架和一个占位首页，后续再补时间轴、相册、共同记忆和私密层。

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
npm ci
npm run dev
```

## Deployment

这个仓库是 GitHub Pages project site，默认公开地址会是：

```text
https://ztyqwq.github.io/lzxszty/
```

Astro 已配置 `base: '/lzxszty'`。

## Privacy

真正私密的文字和图片不要以明文放进 `public/` 或最终构建产物。后续私密层应使用构建时加密，或保留在不发布的私有目录里。
