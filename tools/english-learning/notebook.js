/**
 * 单词本管理模块
 * 阶段3：单词本分类、管理、导出
 */

class NotebookManager {
    constructor(storage) {
        this.storage = storage;
        this.currentNotebook = null;
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.initElements();
        this.initEventListeners();
        this.initDefaultNotebooks();
    }

    /**
     * 初始化DOM元素
     */
    initElements() {
        this.notebookBtn = document.getElementById('notebookBtn');
        this.notebookModal = document.getElementById('notebookModal');
        this.notebookOverlay = document.getElementById('notebookOverlay');
        this.closeNotebookBtn = document.getElementById('closeNotebookBtn');
        this.notebookList = document.getElementById('notebookList');
        this.createNotebookBtn = document.getElementById('createNotebookBtn');
        this.editNotebookModal = document.getElementById('editNotebookModal');
        this.editNotebookOverlay = document.getElementById('editNotebookOverlay');
        this.cancelEditNotebookBtn = document.getElementById('cancelEditNotebookBtn');
        this.saveNotebookBtn = document.getElementById('saveNotebookBtn');
        this.notebookNameInput = document.getElementById('notebookNameInput');
        this.notebookCategorySelect = document.getElementById('notebookCategorySelect');
        this.notebookDescInput = document.getElementById('notebookDescInput');
        this.historyList = document.getElementById('historyList');
        this.reviewReminder = document.getElementById('reviewReminder');
        this.exportAllNotebooksBtn = document.getElementById('exportAllNotebooksBtn');
    }

    /**
     * 初始化事件监听
     */
    initEventListeners() {
        // 打开单词本模态框
        this.notebookBtn.addEventListener('click', () => this.openNotebookModal());

        // 关闭单词本模态框
        this.closeNotebookBtn.addEventListener('click', () => this.closeNotebookModal());
        this.notebookOverlay.addEventListener('click', () => this.closeNotebookModal());

        // 创建单词本
        this.createNotebookBtn.addEventListener('click', () => this.openCreateNotebookModal());

        // 取消编辑
        this.cancelEditNotebookBtn.addEventListener('click', () => this.closeEditNotebookModal());
        this.editNotebookOverlay.addEventListener('click', () => this.closeEditNotebookModal());

        // 保存单词本
        this.saveNotebookBtn.addEventListener('click', () => this.saveNotebook());

        // 导出所有单词本
        this.exportAllNotebooksBtn.addEventListener('click', () => this.exportAllNotebooks());
    }

    /**
     * 初始化默认单词本
     */
    initDefaultNotebooks() {
        const notebooks = this.storage.getNotebooks();
        if (notebooks.length === 0) {
            // 创建默认单词本
            this.storage.createNotebook('高考核心词汇', 'gaokao', '上海高考3500核心词汇');
            this.storage.createNotebook('需要复习', 'custom', '标记为需要复习的单词');
            this.storage.createNotebook('难记单词', 'custom', '标记为难词的单词');
        }
    }

    /**
     * 打开单词本模态框
     */
    openNotebookModal() {
        this.notebookModal.classList.remove('hidden');
        this.renderNotebooks();
        this.renderHistory();
        this.renderReviewReminder();
    }

    /**
     * 关闭单词本模态框
     */
    closeNotebookModal() {
        this.notebookModal.classList.add('hidden');
    }

    /**
     * 打开创建/编辑单词本模态框
     */
    openCreateNotebookModal(notebook = null) {
        this.currentNotebook = notebook;

        if (notebook) {
            document.getElementById('editNotebookTitle').textContent = '编辑单词本';
            this.notebookNameInput.value = notebook.name;
            this.notebookCategorySelect.value = notebook.category;
            this.notebookDescInput.value = notebook.description || '';
        } else {
            document.getElementById('editNotebookTitle').textContent = '新建单词本';
            this.notebookNameInput.value = '';
            this.notebookCategorySelect.value = 'gaokao';
            this.notebookDescInput.value = '';
        }

        this.editNotebookModal.classList.remove('hidden');
    }

    /**
     * 关闭编辑单词本模态框
     */
    closeEditNotebookModal() {
        this.editNotebookModal.classList.add('hidden');
        this.currentNotebook = null;
    }

    /**
     * 保存单词本
     */
    saveNotebook() {
        const name = this.notebookNameInput.value.trim();
        const category = this.notebookCategorySelect.value;
        const description = this.notebookDescInput.value.trim();

        if (!name) {
            app.showToast('请输入单词本名称', 'warning');
            return;
        }

        if (this.currentNotebook) {
            // 更新现有单词本
            this.storage.updateNotebook(this.currentNotebook.id, name, category, description);
            app.showToast('单词本已更新', 'success');
        } else {
            // 创建新单词本
            this.storage.createNotebook(name, category, description);
            app.showToast('单词本已创建', 'success');
        }

        this.closeEditNotebookModal();
        this.renderNotebooks();
    }

    /**
     * 渲染单词本列表
     */
    renderNotebooks() {
        const notebooks = this.storage.getNotebooks();
        this.notebookList.innerHTML = '';

        if (notebooks.length === 0) {
            this.notebookList.innerHTML = `
                <div class="col-span-full text-center py-8 text-gray-500">
                    还没有单词本，点击"新建单词本"创建一个吧！
                </div>
            `;
            return;
        }

        notebooks.forEach(notebook => {
            const card = this.createNotebookCard(notebook);
            this.notebookList.appendChild(card);
        });
    }

    /**
     * 创建单词本卡片
     */
    createNotebookCard(notebook) {
        const card = document.createElement('div');
        card.className = 'bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer';

        const categoryColors = {
            'gaokao': { bg: 'bg-red-100', text: 'text-red-700', label: '高考' },
            'toefl': { bg: 'bg-blue-100', text: 'text-blue-700', label: '托福' },
            'ielts': { bg: 'bg-green-100', text: 'text-green-700', label: '雅思' },
            'cet4': { bg: 'bg-purple-100', text: 'text-purple-700', label: '四级' },
            'cet6': { bg: 'bg-indigo-100', text: 'text-indigo-700', label: '六级' },
            'custom': { bg: 'bg-gray-100', text: 'text-gray-700', label: '自定义' }
        };

        const catStyle = categoryColors[notebook.category] || categoryColors['custom'];

        card.innerHTML = `
            <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                    <h4 class="font-heading font-bold text-gray-800 text-lg mb-1">${notebook.name}</h4>
                    <span class="inline-block px-2 py-1 ${catStyle.bg} ${catStyle.text} text-xs rounded-full">
                        ${catStyle.label}
                    </span>
                </div>
                <div class="flex gap-1">
                    <button
                        onclick="notebookManager.editNotebook('${notebook.id}')"
                        class="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        title="编辑"
                    >
                        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <button
                        onclick="notebookManager.deleteNotebook('${notebook.id}')"
                        class="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="删除"
                    >
                        <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            ${notebook.description ? `
                <p class="text-sm text-gray-600 mb-3">${notebook.description}</p>
            ` : ''}

            <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">
                    <span class="font-semibold text-primary">${notebook.words.length}</span> 个单词
                </span>
                <div class="flex gap-2">
                    <button
                        onclick="notebookManager.viewNotebook('${notebook.id}')"
                        class="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-primary rounded-lg transition-colors cursor-pointer"
                    >
                        查看
                    </button>
                    <button
                        onclick="notebookManager.exportNotebook('${notebook.id}')"
                        class="px-3 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors cursor-pointer"
                    >
                        导出
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    /**
     * 编辑单词本
     */
    editNotebook(notebookId) {
        const notebook = this.storage.getNotebookById(notebookId);
        if (notebook) {
            this.openCreateNotebookModal(notebook);
        }
    }

    /**
     * 删除单词本
     */
    deleteNotebook(notebookId) {
        if (confirm('确定要删除这个单词本吗？其中的单词不会被删除。')) {
            this.storage.deleteNotebook(notebookId);
            app.showToast('单词本已删除', 'success');
            this.renderNotebooks();
        }
    }

    /**
     * 查看单词本
     */
    viewNotebook(notebookId) {
        const notebook = this.storage.getNotebookById(notebookId);
        if (!notebook) return;

        // 查询单词本中的所有单词
        const words = notebook.words.join(', ');
        if (words) {
            // 填充到输入框并查询
            app.wordInput.value = words;
            this.closeNotebookModal();
            app.handleSearch();
        } else {
            app.showToast('单词本为空', 'info');
        }
    }

    /**
     * 导出单词本
     */
    exportNotebook(notebookId) {
        const notebook = this.storage.getNotebookById(notebookId);
        if (!notebook || notebook.words.length === 0) {
            app.showToast('单词本为空', 'warning');
            return;
        }

        // 先查询所有单词，然后导出
        app.dictionary.lookupBatch(notebook.words).then(results => {
            if (results.length > 0) {
                app.currentResults = results;
                app.exportToPDF();
            }
        });
    }

    /**
     * 导出所有单词本
     */
    exportAllNotebooks() {
        const notebooks = this.storage.getNotebooks();
        if (notebooks.length === 0) {
            app.showToast('没有单词本可导出', 'warning');
            return;
        }

        // 收集所有单词（去重）
        const allWords = new Set();
        notebooks.forEach(nb => {
            nb.words.forEach(word => allWords.add(word));
        });

        if (allWords.size === 0) {
            app.showToast('所有单词本都是空的', 'warning');
            return;
        }

        // 查询并导出
        app.showToast('正在准备导出...', 'info');
        app.dictionary.lookupBatch(Array.from(allWords)).then(results => {
            if (results.length > 0) {
                app.currentResults = results;
                app.exportToPDF();
            }
        });
    }

    /**
     * 添加单词到单词本
     */
    addWordToNotebook(word, notebookId) {
        this.storage.addWordToNotebook(notebookId, word);
        app.showToast('已添加到单词本', 'success');
    }

    /**
     * 渲染历史记录
     */
    renderHistory() {
        const history = this.storage.getHistory().slice(0, 20); // 最近20个
        this.historyList.innerHTML = '';

        if (history.length === 0) {
            this.historyList.innerHTML = `
                <span class="text-gray-500 text-sm">还没有查询历史</span>
            `;
            return;
        }

        history.forEach(word => {
            const badge = document.createElement('button');
            badge.className = 'px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-primary rounded-lg text-sm transition-colors cursor-pointer';
            badge.textContent = word;
            badge.onclick = () => {
                app.wordInput.value = word;
                this.closeNotebookModal();
                app.handleSearch();
            };
            this.historyList.appendChild(badge);
        });
    }

    /**
     * 渲染复习提醒
     */
    renderReviewReminder() {
        const reviewWords = this.storage.getReviewWords();
        this.reviewReminder.innerHTML = '';

        if (reviewWords.length === 0) {
            this.reviewReminder.innerHTML = `
                <p>暂无需要复习的单词 ✨</p>
            `;
            return;
        }

        this.reviewReminder.innerHTML = `
            <p class="mb-2">你有 <strong>${reviewWords.length}</strong> 个单词需要复习</p>
            <button
                onclick="notebookManager.startReview()"
                class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors cursor-pointer text-sm"
            >
                开始复习
            </button>
        `;
    }

    /**
     * 开始复习
     */
    startReview() {
        const reviewWords = this.storage.getReviewWords();
        if (reviewWords.length === 0) {
            app.showToast('暂无需要复习的单词', 'info');
            return;
        }

        // 填充到输入框并查询
        app.wordInput.value = reviewWords.join(', ');
        this.closeNotebookModal();
        app.handleSearch();
    }
}

// 导出单例
let notebookManager;
