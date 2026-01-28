# 🛠️ Tool.eyou.ai - 项目上下文文档

> 本文档记录项目的完整上下文、开发历史、操作步骤，便于快速恢复工作状态

---

## 📋 项目概述

### 基本信息
- **项目名称**: 在线工具集 (Tool.eyou.ai)
- **项目类型**: 纯静态网站，包含多个在线工具
- **技术栈**: HTML + JavaScript + Tailwind CSS
- **项目路径**: `/Users/macmini/tool.eyou.ai`
- **GitHub 仓库**: https://github.com/Joyeyou/tools
- **线上地址**: https://tool.eyou.ai (部署在 Vercel)

### 项目特点
- ✅ 纯静态网站，无需后端
- ✅ 本地存储（localStorage）保存数据
- ✅ 认证系统保护工具访问
- ✅ 自动保存用户数据
- ✅ 响应式设计，支持移动端

---

## 📁 项目结构

```
tool.eyou.ai/
├── index.html              # 首页（工具导航）
├── login.html             # 登录页面
├── start.sh               # 快速启动脚本
├── assets/
│   └── js/
│       └── auth.js        # 认证系统
├── tools/
│   ├── html-preview/      # HTML 预览工具 ⭐ 重点
│   │   ├── index.html     # 页面结构
│   │   └── app.js         # 核心功能（820 行）
│   └── english-learning/  # 英语学习工具
│       ├── index.html
│       ├── app.js
│       ├── dictionary.js
│       ├── notebook.js
│       └── gaokao-vocab.js
├── DEPLOYMENT.md          # 部署指南
├── CHANGELOG.md           # 更新日志
├── README.md             # 项目说明
└── PROJECT_CONTEXT.md    # 本文档（项目上下文）
```

---

## 🔐 登录信息

### 用户账号
项目使用前端认证系统，账号配置在 `assets/js/auth.js` 文件中：

**账号1：管理员**
- 用户名：`admin`
- 密码：`admin123`

**账号2：eyou**
- 用户名：`eyou`
- 密码：`eyou2026`

### 认证机制
- 使用 localStorage 存储 token
- 默认保持登录 7 天
- 未登录自动重定向到登录页
- 支持登出功能

---

## 🚀 如何启动项目

### 方法1：使用启动脚本（推荐）

```bash
cd /Users/macmini/tool.eyou.ai
./start.sh
```

启动后访问：http://localhost:8000

### 方法2：手动启动

```bash
cd /Users/macmini/tool.eyou.ai
python3 -m http.server 8000
```

### 方法3：使用 Node.js

```bash
cd /Users/macmini/tool.eyou.ai
npx http-server -p 8000
```

### 停止服务器
按 `Ctrl + C` 停止服务器

---

## 📝 完整的 Git 推送步骤

### 步骤1：检查状态

```bash
cd /Users/macmini/tool.eyou.ai
git status
```

查看哪些文件被修改了。

### 步骤2：查看修改内容（可选）

```bash
git diff
```

查看具体修改了什么内容。

### 步骤3：添加文件到暂存区

**添加所有修改的文件：**
```bash
git add .
```

**或者添加特定文件：**
```bash
git add index.html
git add tools/html-preview/app.js
```

### 步骤4：提交更改

```bash
git commit -m "你的提交信息"
```

**提交信息规范：**
- 简短描述（50字以内）
- 可以多行，第一行是标题，空一行后是详细说明
- 使用中文即可

**示例：简单提交**
```bash
git commit -m "修复 HTML 预览工具的 bug"
```

**示例：详细提交**
```bash
git commit -m "重大更新：HTML 预览工具全面升级

✨ 新功能：
- 实时自动预览
- 代码格式化
- 模板库

🐛 Bug 修复：
- 修复页面闪烁问题

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### 步骤5：推送到 GitHub

```bash
git push origin main
```

### 步骤6：等待 Vercel 自动部署

- 推送后，Vercel 会自动检测到变化
- 1-3 分钟后自动部署完成
- 访问 https://tool.eyou.ai 查看更新

### 完整示例（一键执行）

```bash
# 进入项目目录
cd /Users/macmini/tool.eyou.ai

# 查看状态
git status

# 添加所有文件
git add .

# 提交（请修改提交信息）
git commit -m "更新说明"

# 推送到 GitHub
git push origin main
```

---

## 🎨 HTML 预览工具 - 功能详解

### 核心功能（2026-01-28 更新）

#### 1. 实时自动预览 ⭐⭐⭐⭐⭐
- 左侧输入代码，右侧自动实时显示
- 300ms 防抖优化，避免频繁刷新
- 无需点击"运行"按钮
- 删除代码，预览自动清空

#### 2. 代码格式化 ⭐⭐⭐⭐⭐
- 使用 Prettier 进行专业级格式化
- 一键整理 HTML/CSS/JavaScript 代码
- 快捷键：`Ctrl/Cmd + Shift + F`
- 智能错误提示

#### 3. 模板库 ⭐⭐⭐⭐⭐
- 6 个精心设计的 HTML 模板
- 一键加载到编辑器
- 模板列表：
  1. 空白页面 - 基础 HTML5 模板
  2. 响应式卡片 - 现代风格卡片设计
  3. 表单页面 - 精美登录表单
  4. Landing Page - 产品落地页
  5. CSS 动画 - 炫酷动画效果
  6. Dashboard - 仪表板布局

#### 4. 响应式预览 ⭐⭐⭐⭐
- 三种设备模式切换：
  - 💻 桌面 (Desktop) - 全屏预览
  - 📱 平板 (Tablet) - 768x1024px
  - 📱 手机 (Mobile) - 375x667px
- 真实设备尺寸模拟
- 精美的设备边框效果

#### 5. 全屏模式 ⭐⭐⭐
- 预览区域全屏显示
- 专注查看效果
- 快捷键：`F11` 进入，`ESC` 退出

### 其他功能
- ✅ 导出 HTML 文件（带时间戳）
- ✅ 清空代码
- ✅ 自动保存到 localStorage
- ✅ Tab 键缩进支持
- ✅ 代码语法高亮（Prism.js）

### 键盘快捷键
| 快捷键 | 功能 |
|--------|------|
| `Tab` | 代码缩进（2 空格）|
| `Ctrl/Cmd + Shift + F` | 格式化代码 |
| `F11` | 全屏/退出全屏 |
| `ESC` | 退出全屏 |

### 技术实现
- **Prettier**: 代码格式化库
- **Prism.js**: 语法高亮库
- **Tailwind CSS**: 样式框架
- **localStorage**: 本地存储
- **iframe**: 预览容器

---

## 📅 开发历史

### 2026-01-28 - 重大更新

#### ✨ 新增功能
1. **实时自动预览**
   - 移除"运行"按钮
   - 输入即预览，300ms 防抖
   - 优化用户体验

2. **代码格式化**
   - 集成 Prettier 库
   - 支持 HTML/CSS/JS 格式化
   - 添加快捷键支持

3. **模板库系统**
   - 设计 6 个专业模板
   - 模板选择弹窗
   - 一键加载功能

4. **响应式预览**
   - 三种设备切换
   - 真实尺寸模拟
   - 设备边框效果

5. **全屏模式**
   - 全屏预览功能
   - 键盘快捷键支持
   - 流畅动画过渡

#### 🐛 Bug 修复
1. **页面闪烁问题** ⭐ 重要
   - 问题：未登录访问时，先显示工具页，然后闪回登录页
   - 原因：页面先渲染，再执行认证检查
   - 解决方案：
     - 页面默认隐藏（`visibility: hidden`）
     - 认证通过后显示（添加 `.auth-verified` 类）
     - 使用 `location.replace()` 优化重定向
   - 影响范围：
     - `index.html`
     - `tools/html-preview/index.html`
     - `tools/english-learning/index.html`

#### 🎨 UI/UX 优化
1. **视觉改进**
   - 实时预览指示器（绿色呼吸灯）
   - 渐变色按钮设计
   - 设备切换按钮样式
   - 模板弹窗动画
   - 预览区渐变标题栏

2. **交互优化**
   - 防抖优化（预览 300ms，保存 1000ms）
   - Toast 提示系统
   - 流畅的动画过渡

#### ⚡ 性能优化
- 实时预览防抖
- 自动保存防抖
- 代码加载顺序优化

#### 🔧 其他改进
- 添加 `start.sh` 快速启动脚本
- 支持更多键盘快捷键
- 改进错误提示

#### 📦 提交信息
- **Commit**: ff64383
- **Files**: 5 个文件修改
- **Lines**: +909 / -53
- **Co-Authored-By**: Claude Sonnet 4.5

---

## 🌐 部署信息

### GitHub 仓库
- **仓库地址**: https://github.com/Joyeyou/tools
- **分支**: main
- **自动部署**: ✅ 已配置

### Vercel 部署
- **平台**: Vercel
- **项目名称**: tools
- **生产地址**: https://tool.eyou.ai
- **自动部署**: ✅ GitHub main 分支推送时自动部署
- **部署时间**: 通常 1-3 分钟

### 部署流程
1. 本地修改代码
2. 推送到 GitHub（`git push origin main`）
3. Vercel 自动检测变化
4. Vercel 自动构建和部署
5. 1-3 分钟后线上更新完成

### 如何查看部署状态
- 访问 https://vercel.com
- 进入 `tools` 项目
- 查看 "Deployments" 标签页

---

## 🔄 常见操作

### 查看 Git 日志
```bash
git log --oneline -10
```

### 查看远程仓库
```bash
git remote -v
```

### 回滚到上一个版本
```bash
git reset --hard HEAD^
```

### 强制推送（谨慎使用）
```bash
git push origin main --force
```

### 查看某个文件的修改历史
```bash
git log -p tools/html-preview/app.js
```

### 比较两个提交的差异
```bash
git diff commit1 commit2
```

---

## 🎯 未来计划

### 计划添加的功能
- [ ] 图片压缩工具
- [ ] JSON 格式化工具
- [ ] Base64 编码/解码工具
- [ ] 时间戳转换工具
- [ ] 颜色选择器
- [ ] 正则表达式测试工具
- [ ] Markdown 编辑器

### HTML 预览工具潜在改进
- [ ] 支持 CSS/JS 分离编辑（三栏布局）
- [ ] 控制台输出显示
- [ ] 代码历史版本管理
- [ ] 代码分享功能
- [ ] 拖拽上传 HTML 文件
- [ ] 更多模板

---

## 💡 开发备注

### 重要提醒
1. **认证系统**：
   - 账号密码存储在 `assets/js/auth.js`
   - 使用前端认证，仅适用于私人使用
   - 如需公开部署，建议改用后端认证

2. **代码规范**：
   - 变量名使用小驼峰命名法（camelCase）
   - 所有文字使用中文
   - 代码注释清晰完整

3. **测试流程**：
   - 本地测试无误后再推送
   - 推送后等待 Vercel 部署完成
   - 访问线上地址验证功能

4. **备份建议**：
   - 定期推送到 GitHub
   - 重要修改前先提交当前版本
   - 使用有意义的提交信息

---

## 📞 问题排查

### 问题1：页面空白或无法访问
**可能原因**：
- 本地服务器未启动
- 端口被占用
- 路径错误

**解决方法**：
```bash
cd /Users/macmini/tool.eyou.ai
./start.sh
```

### 问题2：修改未生效
**可能原因**：
- 浏览器缓存
- 文件未保存
- 未推送到 GitHub

**解决方法**：
1. 清除浏览器缓存（Ctrl/Cmd + Shift + R）
2. 检查文件是否保存
3. 检查是否推送到 GitHub

### 问题3：Git 推送失败
**可能原因**：
- 网络问题
- 远程仓库有冲突
- 权限问题

**解决方法**：
```bash
# 先拉取最新代码
git pull origin main

# 解决冲突后再推送
git push origin main
```

### 问题4：Vercel 部署失败
**可能原因**：
- 代码错误
- 构建失败
- Vercel 配置问题

**解决方法**：
1. 访问 Vercel 控制台查看错误日志
2. 检查代码语法错误
3. 回滚到上一个工作版本

---

## 📚 相关文档

- **项目说明**: README.md
- **部署指南**: DEPLOYMENT.md
- **更新日志**: CHANGELOG.md
- **登录指南**: LOGIN_GUIDE.md
- **项目上下文**: PROJECT_CONTEXT.md（本文档）

---

## 🤖 Claude 使用指南

### 如何让 Claude 快速恢复上下文

当你重新打开项目时，告诉 Claude：

```
请阅读 /Users/macmini/tool.eyou.ai/PROJECT_CONTEXT.md 文件，
这是项目的完整上下文文档。
```

Claude 会快速了解：
- 项目是什么
- 已经做了什么
- 如何启动项目
- 如何推送到 GitHub
- 所有重要信息

### 常见指令

**启动项目：**
```
请帮我启动 tool.eyou.ai 项目
```

**推送到 GitHub：**
```
请帮我把修改推送到 GitHub
```

**查看项目状态：**
```
请查看 tool.eyou.ai 项目的 git 状态
```

---

## 📊 项目统计

### 代码量统计
- HTML 文件：3 个主要页面
- JavaScript 文件：6 个核心文件
- 总代码行数：约 2000+ 行

### 功能模块
- 认证系统：1 个
- 工具模块：2 个（HTML 预览 + 英语学习）
- 计划模块：7+ 个

---

**文档最后更新**: 2026-01-28 20:50
**文档版本**: v1.0
**维护者**: Claude Sonnet 4.5

---

> 💡 提示：每次重大更新后，记得更新此文档的"开发历史"部分
