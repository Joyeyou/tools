# 🛠️ 在线工具集

专注于提供简单、高效、实用的在线工具。

**注意：此工具集为私人使用，需要登录才能访问。**

## ✨ 当前工具

### 1. 📚 英语学习工具
专为高考学生设计的英语词汇学习工具。

**功能特点：**
- ✅ 批量查词（空格、逗号分隔）
- ✅ 详细释义（词性、定义、例句、同义反义词）
- ✅ 单词本管理（6种分类：高考/托福/雅思/四级/六级/自定义）
- ✅ 上海高考考纲词汇标注
- ✅ 艾宾浩斯复习系统
- ✅ PDF 导出功能
- ✅ 发音功能
- ✅ 学习统计

**访问地址：** `tools/english-learning/index.html`

### 2. 💻 HTML 预览工具
在线编辑和预览 HTML/CSS/JavaScript 代码。

**功能特点：**
- ✅ 实时预览
- ✅ 代码编辑器
- ✅ 自动保存
- ✅ 键盘快捷键（Ctrl/Cmd + Enter 运行）
- ✅ 响应式设计

**访问地址：** `tools/html-preview/index.html`

## 📁 项目结构

```
在线工具集/
├── login.html                    # 登录页面
├── index.html                    # 首页（工具导航）
├── tools/
│   ├── english-learning/         # 英语学习工具
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── dictionary.js
│   │   ├── notebook.js
│   │   └── gaokao-vocab.js
│   └── html-preview/             # HTML 预览工具
│       ├── index.html
│       └── app.js
├── assets/
│   ├── css/                      # 公共样式
│   ├── js/
│   │   └── auth.js              # 认证系统
│   └── images/                   # 图片资源
└── README.md
```

## 🔐 登录系统

### 默认账号

工具集已启用登录保护，默认账号：

| 用户名 | 密码 | 说明 |
|--------|------|------|
| admin  | admin123 | 管理员账号 |
| eyou   | eyou2026 | 普通账号 |

**重要提示：**
1. 首次部署后，请立即修改 `assets/js/auth.js` 中的默认密码
2. 建议使用更安全的认证方式（如后端验证）
3. 登录状态默认保持7天

### 修改账号密码

编辑 `assets/js/auth.js` 文件：

```javascript
users: [
    { username: 'your_username', password: 'your_password' },
    // 添加更多用户...
]
```

## 🚀 如何使用

### 方法1：直接打开（推荐）
1. 双击 `login.html` 文件，在浏览器中打开
2. 使用上述账号登录
3. 登录成功后即可使用所有工具

### 方法2：本地服务器
使用本地 HTTP 服务器：

```bash
# Python 3
python3 -m http.server 8000

# Node.js (需要先安装 http-server)
npx http-server -p 8000

# 然后在浏览器访问
http://localhost:8000/login.html
```

### 方法3：部署到服务器
这是一个纯静态网站，可以部署到任何静态网站托管服务：

**推荐托管平台：**
- [Vercel](https://vercel.com/) - 免费，支持自定义域名
- [Netlify](https://www.netlify.com/) - 免费，自动部署
- [GitHub Pages](https://pages.github.com/) - 免费，与 GitHub 集成
- [Cloudflare Pages](https://pages.cloudflare.com/) - 免费，全球 CDN

**部署步骤（以 Vercel 为例）：**

1. 将项目上传到 GitHub
2. 访问 [Vercel](https://vercel.com/)，使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择您的 GitHub 仓库
5. 点击 "Deploy"
6. 完成！自动生成访问链接

## 🔧 技术栈

- **前端框架：** 纯 HTML + JavaScript
- **样式：** Tailwind CSS
- **字体：** Inter, Poppins, Fira Code (Google Fonts)
- **存储：** localStorage (浏览器本地存储)
- **PDF生成：** jsPDF + html2canvas

## 📱 浏览器要求

- ✅ Chrome 90+ (推荐)
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+

建议使用最新版本浏览器以获得最佳体验。

## 🎯 设计理念

1. **简单易用** - 无需注册，打开即用
2. **高效实用** - 专注核心功能，避免冗余
3. **安全可靠** - 本地存储，数据安全
4. **完全免费** - 所有功能永久免费，无广告
5. **易于扩展** - 模块化设计，便于添加新工具

## 🔮 未来计划

我们计划添加更多实用工具：

- [ ] 图片压缩工具
- [ ] JSON 格式化工具
- [ ] Base64 编码/解码工具
- [ ] 时间戳转换工具
- [ ] 颜色选择器
- [ ] 正则表达式测试工具
- [ ] Markdown 编辑器
- [ ] 更多...

## 📮 反馈与建议

如果您有任何问题或建议，欢迎反馈！

## 📄 开源协议

本项目采用 MIT 协议开源。

---

**在线工具集** - 让工作和学习更轻松 ✨

最后更新：2026年1月26日
