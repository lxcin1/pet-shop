# 🐾 Paw & Co. 极简宠物用品商城

> 为宠物提供更好的生活方式。

一个简洁、温暖、高品质感的宠物用品电商网页，让用户快速浏览商品、了解品牌理念并完成购买。

## ✨ 特性

- **极简设计**：米白背景 + 深棕文字 + 苔绿点缀，充足留白
- **7 个页面**：首页 / 商品列表 / 商品详情 / 购物车 / 收藏 / 关于我们 / 联系方式
- **响应式布局**：PC / 平板 / 手机全适配
- **轻量动效**：页面淡入、Hover 放大、滚动入场动画
- **购物功能**：商品浏览、搜索、分类筛选、排序、加入购物车、收藏

## 🛠 技术栈

- React 19
- Vite
- Tailwind CSS 3
- React Router 7

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器
# http://localhost:5173/
```

## 📦 构建生产版本

```bash
npm run build
npm run preview
```

## 📁 项目结构

```
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── images/          # 21 张高清宠物图片
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/       # Navbar / Footer / ProductCard / ReviewCard
    ├── pages/            # Home / Products / ProductDetail / Cart / Favorites / About / Contact
    ├── context/          # CartContext（购物车 + 收藏状态）
    ├── data/             # 商品 & 评论数据
    └── hooks/            # useReveal（滚动入场动画）
```

## 🎨 设计

| 颜色 | 用途 |
|------|------|
| `#FAF7F2` cream | 背景主色 |
| `#6B5849` bark | 文字主色 |
| `#5C7152` leaf | 品牌点缀 |
| `#F2ECE1` sand | 辅助背景 |
| `#C9A88A` clay | 装饰色 |

字体：Noto Sans SC（正文）+ Playfair Display（标题）

---

Made with care for every furry friend 🐾
