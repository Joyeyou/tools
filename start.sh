#!/bin/bash

# 在线工具集 - 快速启动脚本

echo "🚀 启动在线工具集..."
echo ""
echo "📍 项目路径: $(pwd)"
echo "🌐 访问地址: http://localhost:8000"
echo ""
echo "🔐 登录信息:"
echo "   用户名: admin    密码: admin123"
echo "   用户名: eyou     密码: eyou2026"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 启动 Python HTTP 服务器
python3 -m http.server 8000
