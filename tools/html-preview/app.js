/**
 * HTML 预览工具
 * 实时编辑和预览 HTML 代码
 */

class HTMLPreviewTool {
    constructor() {
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.codeEditor = document.getElementById('codeEditor');
        this.preview = document.getElementById('preview');
        this.runBtn = document.getElementById('runBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.refreshBtn = document.getElementById('refreshBtn');

        // 从 localStorage 加载上次的代码
        this.loadCode();

        // 绑定事件
        this.bindEvents();

        // 首次运行
        if (this.codeEditor.value.trim()) {
            this.runCode();
        }
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 运行按钮
        this.runBtn.addEventListener('click', () => this.runCode());

        // 导出按钮
        this.exportBtn.addEventListener('click', () => this.exportHTML());

        // 清空按钮
        this.clearBtn.addEventListener('click', () => this.clearCode());

        // 刷新按钮
        this.refreshBtn.addEventListener('click', () => this.runCode());

        // 键盘快捷键 Ctrl/Cmd + Enter
        this.codeEditor.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            }

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
    }

    /**
     * 运行代码
     */
    runCode() {
        const code = this.codeEditor.value;

        if (!code.trim()) {
            this.showToast('请输入代码', 'warning');
            return;
        }

        try {
            // 创建一个新的文档
            const previewDoc = this.preview.contentDocument || this.preview.contentWindow.document;
            previewDoc.open();
            previewDoc.write(code);
            previewDoc.close();

            this.showToast('运行成功', 'success');
        } catch (error) {
            console.error('运行错误:', error);
            this.showToast('运行出错，请检查代码', 'error');
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
