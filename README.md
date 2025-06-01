# Next.js 初始化模板

一个简洁的 Next.js 初始化模板，适合快速开始新项目或学习现代前端开发。

## 🚀 快速开始

### 安装依赖
```bash
npm i
```

> 强烈推荐安装 `Biome` 插件，提早规避 Bug
> 可在 cursor 左上角的插件市场中搜索并安装

### 启动开发服务器
```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 线上部署

#### 使用 Vercel 一键部署

Vercel 是 Next.js 官方推荐的零配置部署平台，非常适合静态和 SSR 应用。

**完整步骤如下：**

##### 第一步：准备 GitHub 仓库

1. **注册 GitHub 账号**
   - 前往 [https://github.com/](https://github.com/) 
   - 点击 "Sign up" 注册新账号
   - 填写用户名、邮箱、密码并验证

2. **创建新仓库**
   - 登录后点击右上角的 "+" 按钮
   - 选择 "New repository"
   - 仓库名称填写：`my-nextjs-app`（可自定义）
   - 设置为 Public（公开）
   - 点击 "Create repository"

3. **上传项目代码**
   ```bash
   # 在项目根目录执行
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/my-nextjs-app.git
   git push -u origin main
   ```

##### 第二步：部署到 Vercel

1. **注册登录 Vercel**
   - 前往 [https://vercel.com/](https://vercel.com/) 
   - 点击 "Sign up" 并选择 "Continue with GitHub"
   - 授权 Vercel 访问你的 GitHub 账号

2. **导入项目**
   - 登录后点击 "New Project"
   - 选择刚才创建的 GitHub 仓库
   - 点击 "Import"

3. **配置部署**
   - Framework Preset：自动检测为 "Next.js"
   - Build Command：`npm run build`（通常自动填写）
   - Output Directory：`.next`（通常自动填写）
   - Install Command：`npm install`（通常自动填写）

4. **开始部署**
   - 点击 "Deploy" 按钮
   - 等待 2-3 分钟完成构建
   - 部署成功后会得到一个免费的 `.vercel.app` 域名

##### 第三步：后续更新

以后每次修改代码并推送到 GitHub，Vercel 会自动重新部署：

```bash
git add .
git commit -m "更新说明"
git push
```

#### 其他部署选项

##### Netlify（备选方案）
1. 前往 [https://netlify.com/](https://netlify.com/)
2. 注册并连接 GitHub
3. 选择仓库并部署
4. 构建命令：`npm run build`
5. 发布目录：`out`

##### 本地构建测试
```bash
npm run build      # 构建生产版本
npm start         # 启动生产服务器
```

**🎉 恭喜！** 你的 Next.js 应用现在已经上线了！


## 📄 许可证

MIT License - 可自由使用和修改。

---

**开始你的 Next.js 之旅吧！** 🎉# tools
# tools
