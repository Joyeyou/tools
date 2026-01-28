/**
 * HTML 预览工具 - 增强版
 * 实时编辑和预览 HTML 代码
 * 功能：实时预览、代码格式化、模板库、响应式预览、全屏模式
 */

class HTMLPreviewTool {
    constructor() {
        // HTML 模板库
        this.templates = [
            {
                name: '空白页面',
                description: '最基础的 HTML5 模板',
                code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的页面</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`
            },
            {
                name: '响应式卡片',
                description: '现代风格的卡片布局',
                code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>响应式卡片</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 400px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            transform: translateY(0);
            transition: transform 0.3s ease;
        }
        .card:hover {
            transform: translateY(-10px);
        }
        h1 {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 28px;
        }
        p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>🎨 欢迎使用</h1>
        <p>这是一个现代风格的响应式卡片设计，具有优雅的渐变背景和悬停动画效果。</p>
        <button class="btn" onclick="alert('你好！')">点击我</button>
    </div>
</body>
</html>`
            },
            {
                name: '表单页面',
                description: '美观的登录表单',
                code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录表单</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .form-container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
        }
        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 500;
        }
        input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e1e1e1;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        input:focus {
            outline: none;
            border-color: #f5576c;
        }
        button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        button:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>🔐 用户登录</h2>
        <form onsubmit="event.preventDefault(); alert('登录成功！');">
            <div class="form-group">
                <label>用户名</label>
                <input type="text" placeholder="请输入用户名" required>
            </div>
            <div class="form-group">
                <label>密码</label>
                <input type="password" placeholder="请输入密码" required>
            </div>
            <button type="submit">登录</button>
        </form>
    </div>
</body>
</html>`
            },
            {
                name: 'Landing Page',
                description: '产品落地页模板',
                code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>产品落地页</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Arial', sans-serif;
            color: #333;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 100px 20px;
        }
        .hero h1 {
            font-size: 48px;
            margin-bottom: 20px;
        }
        .hero p {
            font-size: 20px;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        .cta-button {
            display: inline-block;
            padding: 15px 40px;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 30px;
            font-weight: bold;
            transition: transform 0.3s;
        }
        .cta-button:hover {
            transform: scale(1.1);
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .feature {
            text-align: center;
            padding: 30px;
        }
        .feature h3 {
            font-size: 24px;
            margin: 20px 0 10px;
            color: #667eea;
        }
        .icon {
            font-size: 48px;
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>🚀 欢迎使用我们的产品</h1>
        <p>简单、强大、易用的解决方案</p>
        <a href="#" class="cta-button">立即开始</a>
    </div>
    <div class="features">
        <div class="feature">
            <div class="icon">⚡</div>
            <h3>快速高效</h3>
            <p>闪电般的速度，极致的性能体验</p>
        </div>
        <div class="feature">
            <div class="icon">🎨</div>
            <h3>美观设计</h3>
            <p>精心设计的界面，赏心悦目</p>
        </div>
        <div class="feature">
            <div class="icon">🔒</div>
            <h3>安全可靠</h3>
            <p>企业级安全保障，值得信赖</p>
        </div>
    </div>
</body>
</html>`
            },
            {
                name: 'CSS 动画',
                description: '炫酷的 CSS 动画效果',
                code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS 动画展示</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #0f0f0f;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }
        .container {
            position: relative;
            width: 300px;
            height: 300px;
        }
        .circle {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: #667eea;
            animation: spin 2s linear infinite;
        }
        .circle:nth-child(2) {
            border-top-color: #764ba2;
            animation-duration: 3s;
            animation-direction: reverse;
        }
        .circle:nth-child(3) {
            border-top-color: #f093fb;
            animation-duration: 4s;
        }
        .center-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            animation: pulse 2s ease-in-out infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="center-text">CSS<br>动画</div>
    </div>
</body>
</html>`
            },
            {
                name: 'Dashboard',
                description: '仪表板布局示例',
                code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Arial', sans-serif;
            background: #f5f5f5;
        }
        .header {
            background: white;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header h1 {
            color: #333;
            font-size: 24px;
        }
        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .card h3 {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .card .value {
            font-size: 32px;
            font-weight: bold;
            color: #333;
        }
        .card .trend {
            color: #22c55e;
            font-size: 14px;
            margin-top: 10px;
        }
        .card.purple .value { color: #667eea; }
        .card.blue .value { color: #3b82f6; }
        .card.green .value { color: #22c55e; }
        .card.orange .value { color: #f59e0b; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 数据仪表板</h1>
    </div>
    <div class="dashboard">
        <div class="card purple">
            <h3>总用户数</h3>
            <div class="value">12,345</div>
            <div class="trend">↑ 12% 比上月</div>
        </div>
        <div class="card blue">
            <h3>活跃用户</h3>
            <div class="value">8,234</div>
            <div class="trend">↑ 8% 比上月</div>
        </div>
        <div class="card green">
            <h3>总收入</h3>
            <div class="value">¥56,789</div>
            <div class="trend">↑ 24% 比上月</div>
        </div>
        <div class="card orange">
            <h3>新订单</h3>
            <div class="value">456</div>
            <div class="trend">↑ 15% 比上月</div>
        </div>
    </div>
</body>
</html>`
            }
        ];

        this.currentDevice = 'desktop';
        this.isFullscreen = false;
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.codeEditor = document.getElementById('codeEditor');
        this.preview = document.getElementById('preview');
        this.previewContainer = document.getElementById('previewContainer');
        this.previewSection = document.getElementById('previewSection');

        // 按钮
        this.exportBtn = document.getElementById('exportBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.formatBtn = document.getElementById('formatBtn');
        this.templateBtn = document.getElementById('templateBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');

        // 模板弹窗
        this.templateModal = document.getElementById('templateModal');
        this.closeModal = document.getElementById('closeModal');
        this.templateList = document.getElementById('templateList');

        // 从 localStorage 加载上次的代码
        this.loadCode();

        // 绑定事件
        this.bindEvents();

        // 渲染模板列表
        this.renderTemplates();

        // 首次运行 - 自动预览已保存的代码
        this.runCode();
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 格式化按钮
        this.formatBtn.addEventListener('click', () => this.formatCode());

        // 模板按钮
        this.templateBtn.addEventListener('click', () => this.openTemplateModal());

        // 导出按钮
        this.exportBtn.addEventListener('click', () => this.exportHTML());

        // 清空按钮
        this.clearBtn.addEventListener('click', () => this.clearCode());

        // 全屏按钮
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        // 设备切换按钮
        document.querySelectorAll('.device-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const device = e.currentTarget.getAttribute('data-device');
                this.switchDevice(device);
            });
        });

        // 关闭模板弹窗
        this.closeModal.addEventListener('click', () => this.closeTemplateModal());
        this.templateModal.addEventListener('click', (e) => {
            if (e.target === this.templateModal) {
                this.closeTemplateModal();
            }
        });

        // 键盘快捷键支持
        this.codeEditor.addEventListener('keydown', (e) => {
            // Tab 键支持
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.codeEditor.selectionStart;
                const end = this.codeEditor.selectionEnd;
                const value = this.codeEditor.value;

                // 插入两个空格
                this.codeEditor.value = value.substring(0, start) + '  ' + value.substring(end);
                this.codeEditor.selectionStart = this.codeEditor.selectionEnd = start + 2;
            }

            // F11 全屏
            if (e.key === 'F11') {
                e.preventDefault();
                this.toggleFullscreen();
            }

            // Ctrl/Cmd + Shift + F 格式化
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
                e.preventDefault();
                this.formatCode();
            }
        });

        // 实时预览（防抖优化性能）
        let previewTimeout;
        this.codeEditor.addEventListener('input', () => {
            clearTimeout(previewTimeout);
            previewTimeout = setTimeout(() => {
                this.runCode();
            }, 300); // 300ms 延迟，避免输入时频繁刷新
        });

        // 自动保存（防抖）
        let saveTimeout;
        this.codeEditor.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                this.saveCode();
            }, 1000);
        });

        // 窗口关闭前保存
        window.addEventListener('beforeunload', () => {
            this.saveCode();
        });

        // ESC 键退出全屏
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isFullscreen) {
                this.toggleFullscreen();
            }
        });
    }

    /**
     * 运行代码
     */
    runCode() {
        const code = this.codeEditor.value;

        try {
            // 创建一个新的文档
            const previewDoc = this.preview.contentDocument || this.preview.contentWindow.document;
            previewDoc.open();
            previewDoc.write(code || '<html><body></body></html>'); // 空代码时显示空白页
            previewDoc.close();
        } catch (error) {
            console.error('运行错误:', error);
            this.showToast('运行出错，请检查代码', 'error');
        }
    }

    /**
     * 格式化代码
     */
    formatCode() {
        const code = this.codeEditor.value;

        if (!code.trim()) {
            this.showToast('没有可格式化的代码', 'warning');
            return;
        }

        try {
            // 使用 Prettier 格式化
            const formatted = prettier.format(code, {
                parser: 'html',
                plugins: prettierPlugins,
                printWidth: 80,
                tabWidth: 2,
                useTabs: false,
                semi: true,
                singleQuote: true,
                trailingComma: 'none',
                bracketSpacing: true,
                htmlWhitespaceSensitivity: 'css'
            });

            this.codeEditor.value = formatted;
            this.saveCode();
            this.runCode();
            this.showToast('格式化成功', 'success');
        } catch (error) {
            console.error('格式化错误:', error);
            this.showToast('格式化失败，请检查代码语法', 'error');
        }
    }

    /**
     * 渲染模板列表
     */
    renderTemplates() {
        this.templateList.innerHTML = this.templates.map((template, index) => `
            <div class="template-card bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-purple-400" data-index="${index}">
                <h4 class="text-lg font-bold text-gray-800 mb-2">${template.name}</h4>
                <p class="text-sm text-gray-600">${template.description}</p>
            </div>
        `).join('');

        // 绑定模板点击事件
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                this.loadTemplate(index);
            });
        });
    }

    /**
     * 加载模板
     */
    loadTemplate(index) {
        const template = this.templates[index];
        this.codeEditor.value = template.code;
        this.saveCode();
        this.runCode();
        this.closeTemplateModal();
        this.showToast(`已加载模板：${template.name}`, 'success');
    }

    /**
     * 打开模板弹窗
     */
    openTemplateModal() {
        this.templateModal.classList.add('active');
    }

    /**
     * 关闭模板弹窗
     */
    closeTemplateModal() {
        this.templateModal.classList.remove('active');
    }

    /**
     * 切换设备预览
     */
    switchDevice(device) {
        this.currentDevice = device;

        // 更新按钮状态
        document.querySelectorAll('.device-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-device') === device) {
                btn.classList.add('active');
            }
        });

        // 更新预览容器类名
        this.previewContainer.className = `preview-container ${device} flex-1`;

        this.showToast(`已切换到${device === 'desktop' ? '桌面' : device === 'tablet' ? '平板' : '手机'}预览`, 'info');
    }

    /**
     * 切换全屏模式
     */
    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;

        if (this.isFullscreen) {
            this.previewSection.classList.add('fullscreen');
            this.fullscreenBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
            this.showToast('已进入全屏模式 (ESC 退出)', 'info');
        } else {
            this.previewSection.classList.remove('fullscreen');
            this.fullscreenBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                </svg>
            `;
        }
    }

    /**
     * 清空代码
     */
    clearCode() {
        if (this.codeEditor.value.trim() && !confirm('确定要清空所有代码吗？')) {
            return;
        }

        this.codeEditor.value = '';
        this.preview.src = 'about:blank';
        this.saveCode();
        this.runCode();
        this.showToast('已清空', 'success');
    }

    /**
     * 导出 HTML 文件
     */
    exportHTML() {
        const code = this.codeEditor.value;

        if (!code.trim()) {
            this.showToast('没有可导出的代码', 'warning');
            return;
        }

        try {
            // 创建 Blob 对象
            const blob = new Blob([code], { type: 'text/html;charset=utf-8' });

            // 创建下载链接
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');

            // 生成文件名（使用时间戳）
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const filename = `html-preview-${timestamp}.html`;

            link.href = url;
            link.download = filename;

            // 触发下载
            document.body.appendChild(link);
            link.click();

            // 清理
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            this.showToast('导出成功：' + filename, 'success');
        } catch (error) {
            console.error('导出错误:', error);
            this.showToast('导出失败，请重试', 'error');
        }
    }

    /**
     * 保存代码到 localStorage
     */
    saveCode() {
        try {
            localStorage.setItem('htmlPreviewCode', this.codeEditor.value);
        } catch (error) {
            console.warn('无法保存代码:', error);
        }
    }

    /**
     * 从 localStorage 加载代码
     */
    loadCode() {
        try {
            const savedCode = localStorage.getItem('htmlPreviewCode');
            if (savedCode) {
                this.codeEditor.value = savedCode;
            }
        } catch (error) {
            console.warn('无法加载代码:', error);
        }
    }

    /**
     * 显示提示消息
     */
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');

        // 设置消息
        toastMessage.textContent = message;

        // 设置颜色
        const colors = {
            success: 'bg-green-600',
            error: 'bg-red-600',
            warning: 'bg-yellow-600',
            info: 'bg-gray-900'
        };

        toast.className = `fixed bottom-4 right-4 ${colors[type] || colors.info} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`;

        // 显示
        toast.classList.remove('hidden');

        // 3秒后隐藏
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new HTMLPreviewTool();
});
