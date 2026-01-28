# 🔐 安全配置说明

## ⚠️ 重要提醒

本项目使用前端认证系统，**仅适用于私人使用或内部工具**。

如果你计划：
- 部署到公网
- 分享给他人使用
- 用于生产环境

**请务必修改默认密码或使用后端认证系统！**

---

## 📝 如何查看和修改账号信息

### 查看账号
账号信息存储在：`assets/js/auth.js` 文件中

打开该文件，找到 `users` 数组：

```javascript
users: [
    { username: 'admin', password: 'admin123' },
    { username: 'eyou', password: 'eyou2026' }
]
```

### 修改密码

1. 打开 `assets/js/auth.js` 文件
2. 修改 `users` 数组中的密码
3. 保存文件
4. 重启本地服务器（如果正在运行）
5. **不要将修改后的密码提交到公共 GitHub 仓库**

**示例：**

```javascript
users: [
    { username: 'admin', password: '你的新密码' },
    { username: 'eyou', password: '你的新密码2' }
]
```

### 添加新用户

在 `users` 数组中添加新的用户对象：

```javascript
users: [
    { username: 'admin', password: 'admin123' },
    { username: 'eyou', password: 'eyou2026' },
    { username: 'newuser', password: 'newpassword' }  // 新用户
]
```

---

## 🛡️ 安全建议

### 1. 修改默认密码
- ✅ 使用强密码（至少 12 位，包含大小写字母、数字、特殊字符）
- ✅ 不要使用常见密码（如：123456、password 等）
- ✅ 定期更换密码

### 2. 不要提交敏感信息到 GitHub
- ✅ 检查提交内容，确保没有包含密码
- ✅ 使用 `.gitignore` 忽略敏感文件
- ✅ 如果不小心提交了敏感信息，立即修改密码

### 3. 限制访问
- ✅ 仅在可信网络使用
- ✅ 不要在公共 WiFi 下登录
- ✅ 使用 HTTPS（Vercel 自动提供）

### 4. 考虑使用后端认证
如果需要更高的安全性，建议：
- 使用后端认证系统（如：JWT、OAuth）
- 使用数据库存储加密后的密码
- 实现登录失败次数限制
- 添加验证码功能

---

## 🔍 检查清单

部署前请确认：

- [ ] 已修改默认密码
- [ ] 密码足够强（至少 12 位）
- [ ] 未将密码提交到 GitHub
- [ ] 已测试登录功能
- [ ] 已设置 HTTPS（Vercel 自动配置）

---

## 📞 遇到问题？

如果你：
- 忘记了密码
- 无法登录
- 遇到安全问题

**解决方法：**
1. 编辑 `assets/js/auth.js` 文件
2. 重置密码为新密码
3. 清除浏览器缓存和 localStorage
4. 重新登录

**清除 localStorage：**
- 按 F12 打开开发者工具
- 切换到 Console 标签页
- 输入：`localStorage.clear()`
- 刷新页面

---

## ⚡ 快速参考

**文件位置：** `assets/js/auth.js`

**默认账号：** 见 `auth.js` 文件（请勿在文档中公开）

**修改密码后：** 重启服务器并清除浏览器缓存

**部署前：** 必须修改默认密码

---

**最后更新**: 2026-01-28
**版本**: v2.0.0
