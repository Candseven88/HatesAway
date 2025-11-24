# 🚀 HatesAway - Cloudflare Pages 部署指南

## 📋 部署步骤

### 1. 登录 Cloudflare

访问：https://dash.cloudflare.com/
- 如果没有账号，免费注册（只需要邮箱）

---

### 2. 创建 Pages 项目

1. 左侧菜单：**Workers & Pages**
2. 点击：**Create** 或 **Create application**
3. 选择：**Pages** 标签
4. 点击：**Connect to Git**

---

### 3. 连接 GitHub 仓库

1. 选择 **GitHub**
2. 点击 **+ Add account** 或 **Install & Authorize**
3. 授权 Cloudflare 访问你的 GitHub
4. 选择仓库：`Candseven88/HatesAway`
5. 点击 **Begin setup**

---

### 4. 配置构建设置

#### 基本设置
```
Project name: hatesaway (或任意你喜欢的名字)
Production branch: main
```

#### 构建配置

| 设置项 | 值 |
|--------|-----|
| **Framework preset** | Next.js (Static HTML Export) |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | (留空) |
| **Environment variables** | (暂不需要) |

---

### 5. 部署

1. 点击 **Save and Deploy**
2. 等待构建（约2-3分钟）
3. 🎉 完成！

---

## 🌐 访问你的应用

部署成功后，你会得到一个URL：

```
https://hatesaway.pages.dev
```

或自定义域名：
```
https://your-custom-domain.com
```

---

## 🔄 自动部署

配置完成后，每次推送到 `main` 分支，Cloudflare 都会自动重新部署！

```bash
# 日常开发流程
git add .
git commit -m "Update feature"
git push origin main

# Cloudflare 自动检测并部署 🚀
```

---

## ⚙️ 高级配置（可选）

### 自定义域名

1. 在 Cloudflare Pages 项目中
2. 点击 **Custom domains**
3. 点击 **Set up a custom domain**
4. 输入域名并按提示配置 DNS

### 环境变量

如果未来需要添加环境变量（如API密钥）：

1. 进入项目 **Settings**
2. 选择 **Environment variables**
3. 添加变量：
   ```
   KEY: YOUR_VALUE
   ```

---

## 🐛 故障排除

### 构建失败

1. 检查 Build log
2. 确认 `package.json` 中的依赖正确
3. 确认 Node.js 版本兼容（推荐 18.x 或 20.x）

### 页面空白

1. 检查浏览器控制台错误
2. 确认 `next.config.ts` 中 `output: 'export'` 已设置
3. 查看 Cloudflare Functions 日志

### 数据不保存

⚠️ **重要**：当前使用 localStorage，只在浏览器本地保存
- 未来升级到 Cloudflare D1 数据库后，数据会云端保存

---

## 📊 监控和分析

Cloudflare 提供免费的：
- 📈 流量分析
- 🌍 地理分布
- ⚡ 性能指标
- 🔒 安全监控

在 **Analytics** 标签查看

---

## 🎯 下一步

- [ ] 自定义域名
- [ ] 集成 Cloudflare D1 数据库
- [ ] 集成 Cloudflare R2 存储
- [ ] 设置 CDN 缓存策略
- [ ] 添加 Web Analytics

---

## 📚 相关文档

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js 静态导出](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare D1 数据库](https://developers.cloudflare.com/d1/)

---

**问题？** 查看 Cloudflare Pages 的部署日志，或联系支持团队。
