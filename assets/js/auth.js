/**
 * 认证系统
 * 提供登录、登出、权限检查等功能
 */

const Auth = {
    // 配置
    config: {
        // 用户列表（实际使用时建议改为更安全的方式）
        users: [
            { username: 'admin', password: 'admin123' },
            { username: 'eyou', password: 'eyou2026' }
        ],
        storageKey: 'auth_token',
        expiryKey: 'auth_expiry'
    },

    /**
     * 登录
     */
    login(username, password, remember = true) {
        // 查找用户
        const user = this.config.users.find(
            u => u.username === username && u.password === password
        );

        if (!user) {
            return {
                success: false,
                message: '用户名或密码错误'
            };
        }

        // 生成简单的 token（实际使用时建议使用更安全的方式）
        const token = btoa(username + ':' + Date.now());

        // 设置过期时间
        const expiry = remember
            ? Date.now() + (7 * 24 * 60 * 60 * 1000)  // 7天
            : Date.now() + (24 * 60 * 60 * 1000);     // 1天

        // 保存到 localStorage
        localStorage.setItem(this.config.storageKey, token);
        localStorage.setItem(this.config.expiryKey, expiry.toString());

        return {
            success: true,
            message: '登录成功',
            user: { username: user.username }
        };
    },

    /**
     * 登出
     */
    logout() {
        localStorage.removeItem(this.config.storageKey);
        localStorage.removeItem(this.config.expiryKey);
        window.location.href = 'login.html';
    },

    /**
     * 检查是否已登录
     */
    isLoggedIn() {
        const token = localStorage.getItem(this.config.storageKey);
        const expiry = localStorage.getItem(this.config.expiryKey);

        if (!token || !expiry) {
            return false;
        }

        // 检查是否过期
        if (Date.now() > parseInt(expiry)) {
            this.logout();
            return false;
        }

        return true;
    },

    /**
     * 要求登录（在受保护页面调用）
     */
    requireLogin() {
        if (!this.isLoggedIn()) {
            window.location.href = '/login.html';
        }
    },

    /**
     * 获取当前用户信息
     */
    getCurrentUser() {
        const token = localStorage.getItem(this.config.storageKey);
        if (!token) return null;

        try {
            const decoded = atob(token);
            const username = decoded.split(':')[0];
            return { username };
        } catch (error) {
            return null;
        }
    },

    /**
     * 延长登录时间
     */
    extendSession(days = 7) {
        if (!this.isLoggedIn()) return false;

        const expiry = Date.now() + (days * 24 * 60 * 60 * 1000);
        localStorage.setItem(this.config.expiryKey, expiry.toString());
        return true;
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}
