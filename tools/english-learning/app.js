/**
 * 英语学习工具 - 主应用逻辑
 * 阶段1: 核心查词功能
 * 阶段2: 学习增强功能（发音、标记、历史）
 */

class EnglishLearningApp {
    constructor() {
        this.dictionary = dictionaryService;
        this.storage = new StorageManager();
        this.initElements();
        this.initEventListeners();
        this.loadStatistics();
    }

    /**
     * 初始化DOM元素引用
     */
    initElements() {
        this.wordInput = document.getElementById('wordInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.loadingState = document.getElementById('loadingState');
        this.resultsSection = document.getElementById('resultsSection');
        this.emptyState = document.getElementById('emptyState');
        this.statsSection = document.getElementById('statsSection');
        this.exportToolbar = document.getElementById('exportToolbar');
        this.exportPdfBtn = document.getElementById('exportPdfBtn');
        this.printBtn = document.getElementById('printBtn');

        // 存储当前查询结果
        this.currentResults = [];
    }

    /**
     * 初始化事件监听
     */
    initEventListeners() {
        // 查询按钮
        this.searchBtn.addEventListener('click', () => this.handleSearch());

        // 清空按钮
        this.clearBtn.addEventListener('click', () => this.handleClear());

        // 回车键查询
        this.wordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                this.handleSearch();
            }
        });

        // 快速示例按钮
        document.querySelectorAll('.quick-example').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.wordInput.value = e.target.textContent.trim();
                this.handleSearch();
            });
        });

        // 导出PDF按钮
        this.exportPdfBtn.addEventListener('click', () => this.exportToPDF());

        // 打印按钮
        this.printBtn.addEventListener('click', () => this.handlePrint());
    }

    /**
     * 处理查询
     */
    async handleSearch() {
        const input = this.wordInput.value.trim();

        if (!input) {
            this.showToast('请输入单词', 'warning');
            return;
        }

        // 解析输入（支持空格、逗号、分号分隔）
        const words = this.parseInput(input);

        if (words.length === 0) {
            this.showToast('未识别到有效单词', 'error');
            return;
        }

        // 显示加载状态
        this.showLoading();

        try {
            // 批量查询
            const results = await this.dictionary.lookupBatch(words);

            // 保存到历史记录
            for (const result of results) {
                this.storage.addToHistory(result.word);
            }

            // 更新统计
            this.storage.updateStatistics(results.length);
            this.loadStatistics();

            // 显示结果
            this.displayResults(results);

            // 如果有结果，显示成功提示
            if (results.length > 0) {
                this.showToast(`成功查询 ${results.length} 个单词`, 'success');
            }
        } catch (error) {
            console.error('查询错误:', error);
            this.showToast('查询失败，请稍后重试', 'error');
            this.hideLoading();
        }
    }

    /**
     * 解析输入文本为单词数组
     */
    parseInput(input) {
        // 支持空格、逗号、分号、换行分隔
        return input
            .split(/[\s,;，；\n]+/)
            .map(word => word.trim())
            .filter(word => word.length > 0 && /^[a-zA-Z-]+$/.test(word));
    }

    /**
     * 显示结果
     */
    displayResults(results) {
        this.hideLoading();
        this.emptyState.classList.add('hidden');
        this.resultsSection.classList.remove('hidden');
        this.resultsSection.innerHTML = '';

        // 保存当前结果用于导出
        this.currentResults = results;

        if (results.length === 0) {
            this.resultsSection.innerHTML = `
                <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                    <p class="text-yellow-800">未找到相关单词，请检查拼写</p>
                </div>
            `;
            this.exportToolbar.classList.add('hidden');
            return;
        }

        // 显示导出工具栏
        this.exportToolbar.classList.remove('hidden');

        // 渲染每个单词卡片
        results.forEach((result, index) => {
            const card = this.createWordCard(result, index);
            this.resultsSection.appendChild(card);
        });

        // 滚动到结果区域
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * 创建单词卡片
     */
    createWordCard(data, index) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300';

        // 获取标记状态
        const tag = this.storage.getTag(data.word);

        card.innerHTML = `
            <div class="p-6 sm:p-8">
                <!-- Header: 单词和音标 -->
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 class="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
                                ${data.word}
                            </h3>
                            ${this.renderSourceBadge(data.source)}
                            ${this.renderGaokaoBadge(data.word)}
                        </div>
                        ${data.phonetic ? `
                            <div class="flex items-center gap-2 text-gray-600">
                                <span class="text-lg">${data.phonetic}</span>
                            </div>
                        ` : ''}
                    </div>

                    <!-- 发音和标记按钮 -->
                    <div class="flex flex-wrap gap-2">
                        <button
                            onclick="app.playPronunciation('${data.word}', '${data.audioUrl || ''}')"
                            class="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-primary rounded-lg transition-colors duration-200 cursor-pointer"
                            title="发音"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                            </svg>
                            <span class="hidden sm:inline">发音</span>
                        </button>

                        <!-- 标记按钮 -->
                        <button
                            onclick="app.toggleTag('${data.word}', 'mastered')"
                            class="tag-btn px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${tag === 'mastered' ? 'bg-green-100 text-green-700 ring-2 ring-green-500' : 'bg-gray-100 hover:bg-green-50 text-gray-600'}"
                            title="已掌握"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </button>

                        <button
                            onclick="app.toggleTag('${data.word}', 'review')"
                            class="tag-btn px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${tag === 'review' ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500' : 'bg-gray-100 hover:bg-yellow-50 text-gray-600'}"
                            title="需复习"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </button>

                        <button
                            onclick="app.toggleTag('${data.word}', 'difficult')"
                            class="tag-btn px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${tag === 'difficult' ? 'bg-red-100 text-red-700 ring-2 ring-red-500' : 'bg-gray-100 hover:bg-red-50 text-gray-600'}"
                            title="难词"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                        </button>

                        <!-- 添加到单词本按钮 -->
                        <button
                            onclick="app.showAddToNotebookMenu('${data.word}')"
                            class="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors duration-200 cursor-pointer"
                            title="添加到单词本"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <span class="hidden sm:inline">单词本</span>
                        </button>
                    </div>
                </div>

                <!-- Meanings -->
                <div class="space-y-6">
                    ${this.renderMeanings(data.meanings, data.word)}
                </div>
            </div>
        `;

        return card;
    }

    /**
     * 渲染释义列表
     */
    renderMeanings(meanings, word) {
        if (!meanings || meanings.length === 0) {
            return '<p class="text-gray-500">暂无释义</p>';
        }

        return meanings.map((meaning, idx) => `
            <div class="meaning-item ${idx > 0 ? 'pt-4 border-t border-gray-100' : ''}">
                ${meaning.partOfSpeech ? `
                    <span class="inline-block px-3 py-1 bg-indigo-100 text-primary text-sm font-semibold rounded-full mb-3">
                        ${meaning.partOfSpeech}
                    </span>
                ` : ''}

                <p class="text-lg text-gray-800 mb-3">
                    ${meaning.definition}
                </p>

                ${(meaning.examples && meaning.examples.length > 0) || meaning.example ? `
                    <div class="bg-blue-50 border-l-4 border-primary px-4 py-3 rounded-r-lg mb-3">
                        <p class="text-sm text-gray-600 mb-2 font-semibold">例句:</p>
                        ${(meaning.examples && meaning.examples.length > 0 ?
                            meaning.examples.map(ex => `
                                <p class="text-gray-700 italic mb-2 last:mb-0">
                                    • ${this.highlightWord(ex, word)}
                                </p>
                            `).join('')
                            :
                            `<p class="text-gray-700 italic">
                                ${this.highlightWord(meaning.example, word)}
                            </p>`
                        )}
                    </div>
                ` : ''}

                ${(meaning.synonyms && meaning.synonyms.length > 0) || (meaning.antonyms && meaning.antonyms.length > 0) ? `
                    <div class="flex flex-wrap gap-4 text-sm">
                        ${meaning.synonyms && meaning.synonyms.length > 0 ? `
                            <div>
                                <span class="font-semibold text-green-700">同义词: </span>
                                <span class="text-gray-600">${meaning.synonyms.slice(0, 3).join(', ')}</span>
                            </div>
                        ` : ''}
                        ${meaning.antonyms && meaning.antonyms.length > 0 ? `
                            <div>
                                <span class="font-semibold text-red-700">反义词: </span>
                                <span class="text-gray-600">${meaning.antonyms.slice(0, 3).join(', ')}</span>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    /**
     * 高亮例句中的单词
     */
    highlightWord(sentence, word) {
        if (!sentence || !word) return sentence;

        const regex = new RegExp(`\\b(${word}[a-z]*)\\b`, 'gi');
        return sentence.replace(regex, '<span class="highlight-word">$1</span>');
    }

    /**
     * 渲染数据源徽章
     */
    renderSourceBadge(source) {
        if (source === 'online') {
            return `
                <span class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
                    </svg>
                    在线
                </span>
            `;
        } else {
            return `
                <span class="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"></path>
                        <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path>
                    </svg>
                    离线
                </span>
            `;
        }
    }

    /**
     * 渲染高考考纲徽章
     */
    renderGaokaoBadge(word) {
        if (typeof GaokaoVocabulary !== 'undefined' && GaokaoVocabulary.isGaokaoWord(word)) {
            return `
                <span class="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded animate-pulse">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    高考考纲
                </span>
            `;
        }
        return '';
    }

    /**
     * 播放发音
     */
    playPronunciation(word, audioUrl) {
        // 优先使用在线音频
        if (audioUrl) {
            const played = this.dictionary.playAudio(audioUrl);
            if (played) {
                this.showToast('正在播放...', 'info');
                return;
            }
        }

        // 回退到浏览器语音合成
        this.dictionary.speak(word);
        this.showToast('正在播放...', 'info');
    }

    /**
     * 切换标记状态
     */
    toggleTag(word, tagType) {
        const currentTag = this.storage.getTag(word);

        if (currentTag === tagType) {
            // 如果已经是这个标记，则移除
            this.storage.removeTag(word);
            this.showToast('已移除标记', 'info');
        } else {
            // 否则设置新标记
            this.storage.setTag(word, tagType);
            const tagNames = {
                'mastered': '已掌握',
                'review': '需复习',
                'difficult': '难词'
            };
            this.showToast(`已标记为: ${tagNames[tagType]}`, 'success');
        }

        // 重新加载统计
        this.loadStatistics();

        // 刷新当前结果（更新按钮状态）
        // 这里简化处理，直接重新渲染所有标记按钮
        this.updateTagButtons(word);
    }

    /**
     * 更新标记按钮状态
     */
    updateTagButtons(word) {
        const tag = this.storage.getTag(word);
        const buttons = document.querySelectorAll(`button[onclick*="'${word}'"]`);

        buttons.forEach(btn => {
            const onclick = btn.getAttribute('onclick');
            if (!onclick.includes('toggleTag')) return;

            // 重置所有样式
            btn.className = 'tag-btn px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer bg-gray-100 hover:bg-gray-50 text-gray-600';

            // 根据当前标记更新对应按钮
            if (onclick.includes("'mastered'") && tag === 'mastered') {
                btn.className = 'tag-btn px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer bg-green-100 text-green-700 ring-2 ring-green-500';
            } else if (onclick.includes("'review'") && tag === 'review') {
                btn.className = 'tag-btn px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500';
            } else if (onclick.includes("'difficult'") && tag === 'difficult') {
                btn.className = 'tag-btn px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer bg-red-100 text-red-700 ring-2 ring-red-500';
            } else if (onclick.includes("'mastered'")) {
                btn.className = 'tag-btn px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer bg-gray-100 hover:bg-green-50 text-gray-600';
            } else if (onclick.includes("'review'")) {
                btn.className = 'tag-btn px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer bg-gray-100 hover:bg-yellow-50 text-gray-600';
            } else if (onclick.includes("'difficult'")) {
                btn.className = 'tag-btn px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer bg-gray-100 hover:bg-red-50 text-gray-600';
            }
        });
    }

    /**
     * 加载统计数据
     */
    loadStatistics() {
        const stats = this.storage.getStatistics();

        document.getElementById('todayCount').textContent = stats.todayCount;
        document.getElementById('totalCount').textContent = stats.totalCount;
        document.getElementById('masteredCount').textContent = stats.masteredCount;
        document.getElementById('reviewCount').textContent = stats.reviewCount;

        // 如果有数据，显示统计区域
        if (stats.totalCount > 0) {
            this.statsSection.classList.remove('hidden');
        }
    }

    /**
     * 清空输入和结果
     */
    handleClear() {
        this.wordInput.value = '';
        this.resultsSection.classList.add('hidden');
        this.resultsSection.innerHTML = '';
        this.emptyState.classList.remove('hidden');
        this.exportToolbar.classList.add('hidden');
        this.currentResults = [];
        this.wordInput.focus();
    }

    /**
     * 导出为PDF（使用html2canvas避免中文和音标乱码）
     */
    async exportToPDF() {
        if (!this.currentResults || this.currentResults.length === 0) {
            this.showToast('没有可导出的内容', 'warning');
            return;
        }

        this.showToast('正在生成PDF，请稍候...', 'info');

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');

            // 创建临时容器用于渲染（优化：更紧凑）
            const container = document.createElement('div');
            container.style.cssText = `
                position: fixed;
                left: -9999px;
                top: 0;
                width: 190mm;
                background: white;
                padding: 0;
                font-family: 'Open Sans', 'Microsoft YaHei', sans-serif;
            `;
            document.body.appendChild(container);

            // 渲染标题（更紧凑）
            container.innerHTML = `
                <div style="text-align: center; margin-bottom: 5px; padding: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 6px;">
                    <h1 style="color: white; margin: 0; font-size: 18px; font-weight: bold;">Vocabulary List</h1>
                    <p style="color: white; margin: 3px 0 0 0; font-size: 10px;">
                        ${new Date().toLocaleDateString('en-US')} | ${this.currentResults.length} words
                    </p>
                </div>
            `;

            // 渲染标题并添加到PDF
            const titleCanvas = await html2canvas(container, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const titleImgData = titleCanvas.toDataURL('image/png');
            const titleImgWidth = 190;
            const titleImgHeight = (titleCanvas.height * titleImgWidth) / titleCanvas.width;
            doc.addImage(titleImgData, 'PNG', 10, 8, titleImgWidth, titleImgHeight);

            let currentY = 8 + titleImgHeight + 2;

            // 渲染每个单词卡片
            for (let i = 0; i < this.currentResults.length; i++) {
                const result = this.currentResults[i];
                const tag = this.storage.getTag(result.word);
                const isGaokao = typeof GaokaoVocabulary !== 'undefined' && GaokaoVocabulary.isGaokaoWord(result.word);

                // 标记颜色
                const tagColors = {
                    'mastered': { bg: '#dcfce7', text: '#16a34a', label: '✓ 已掌握' },
                    'review': { bg: '#fef9c3', text: '#ca8a04', label: '↻ 需复习' },
                    'difficult': { bg: '#fee2e2', text: '#dc2626', label: '⚠ 难词' }
                };

                // 渲染单词卡片HTML（紧凑优化版 - 修复对齐）
                container.innerHTML = `
                    <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 6px 8px; margin-bottom: 3px; display: flex; gap: 8px;">
                        <!-- 左侧：单词信息 -->
                        <div style="width: 32%; border-right: 1px solid #d1d5db; padding-right: 8px;">
                            <div style="background: #6366f1; color: white; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; margin-bottom: 4px;">
                                ${i + 1}
                            </div>
                            <div style="font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 3px; word-break: break-word;">
                                ${result.word}
                            </div>
                            ${result.phonetic ? `
                                <div style="font-size: 10px; color: #6b7280; margin-bottom: 3px;">
                                    ${result.phonetic}
                                </div>
                            ` : ''}
                            ${isGaokao ? `
                                <div style="display: inline-block; background: #fef2f2; color: #dc2626; padding: 2px 5px; border-radius: 4px; font-size: 8px; font-weight: bold; margin-bottom: 3px;">
                                    ★ Gaokao
                                </div>
                            ` : ''}
                            ${tag && tagColors[tag] ? `
                                <div style="background: ${tagColors[tag].bg}; color: ${tagColors[tag].text}; padding: 2px 5px; border-radius: 4px; font-size: 8px; font-weight: bold; text-align: center;">
                                    ${tagColors[tag].label}
                                </div>
                            ` : ''}
                        </div>

                        <!-- 右侧：释义（最多2个，更紧凑）-->
                        <div style="flex: 1;">
                            ${result.meanings.slice(0, 2).map((meaning, idx) => `
                                <div style="margin-bottom: ${idx < Math.min(result.meanings.length, 2) - 1 ? '6px' : '0'};">
                                    ${meaning.partOfSpeech ? `
                                        <span style="display: inline-block; background: #eef2ff; color: #4f46e5; padding: 1px 6px; border-radius: 3px; font-size: 9px; font-weight: bold; margin-bottom: 2px;">
                                            ${meaning.partOfSpeech}
                                        </span>
                                    ` : ''}
                                    <div style="font-size: 11px; color: #1f2937; line-height: 1.3; margin-bottom: 2px;">
                                        ${meaning.definition}
                                    </div>
                                    ${meaning.example ? `
                                        <div style="font-size: 9px; color: #6b7280; font-style: italic; line-height: 1.3; padding: 2px 0 2px 6px; margin-left: 0; border-left: 3px solid #4f46e5; display: block;">
                                            ${meaning.example}
                                        </div>
                                    ` : ''}
                                    ${meaning.synonyms && meaning.synonyms.length > 0 ? `
                                        <div style="font-size: 8px; color: #059669; margin-top: 2px;">
                                            Syn: ${meaning.synonyms.slice(0, 2).join(', ')}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

                // 渲染为图片
                const canvas = await html2canvas(container, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#ffffff'
                });

                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 190;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // 检查是否需要新页面（优化：增加到285mm）
                if (currentY + imgHeight > 283) {
                    doc.addPage();
                    currentY = 10;
                }

                // 添加图片到PDF
                doc.addImage(imgData, 'PNG', 10, currentY, imgWidth, imgHeight);
                currentY += imgHeight + 1.5; // 减小卡片间距
            }

            // 清理临时容器
            document.body.removeChild(container);

            // 添加页脚（纯英文，避免乱码）
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(7);
                doc.setTextColor(156, 163, 175);
                doc.text(
                    `Page ${i} / ${pageCount}`,
                    105,
                    287,
                    { align: 'center' }
                );
                doc.text(
                    'English Learning Tool - For Gaokao 2027',
                    200,
                    287,
                    { align: 'right' }
                );
            }

            // 下载文件
            const filename = `vocabulary_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.pdf`;
            doc.save(filename);

            this.showToast('PDF导出成功！', 'success');
        } catch (error) {
            console.error('PDF导出失败:', error);
            this.showToast('PDF导出失败：' + error.message, 'error');
        }
    }

    /**
     * 打印功能
     */
    handlePrint() {
        if (!this.currentResults || this.currentResults.length === 0) {
            this.showToast('没有可打印的内容', 'warning');
            return;
        }

        // 创建打印窗口
        const printWindow = window.open('', '_blank');

        // 生成打印内容
        let printContent = `
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <title>英语学习单词表 - ${new Date().toLocaleDateString('zh-CN')}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Poppins:wght@400;600;700&display=swap');

                    * { margin: 0; padding: 0; box-sizing: border-box; }

                    body {
                        font-family: 'Open Sans', sans-serif;
                        line-height: 1.6;
                        padding: 20px;
                        color: #333;
                    }

                    h1 {
                        font-family: 'Poppins', sans-serif;
                        color: #4F46E5;
                        text-align: center;
                        margin-bottom: 10px;
                        font-size: 24px;
                    }

                    .date {
                        text-align: center;
                        color: #666;
                        margin-bottom: 30px;
                        font-size: 14px;
                    }

                    .word-card {
                        margin-bottom: 25px;
                        page-break-inside: avoid;
                        border: 1px solid #e5e7eb;
                        padding: 15px;
                        border-radius: 8px;
                    }

                    .word-header {
                        display: flex;
                        align-items: baseline;
                        gap: 10px;
                        margin-bottom: 10px;
                        border-bottom: 2px solid #4F46E5;
                        padding-bottom: 5px;
                    }

                    .word-title {
                        font-family: 'Poppins', sans-serif;
                        font-size: 20px;
                        font-weight: 700;
                        color: #1f2937;
                    }

                    .word-phonetic {
                        font-size: 14px;
                        color: #6b7280;
                    }

                    .meaning {
                        margin: 10px 0;
                        padding-left: 10px;
                    }

                    .pos {
                        display: inline-block;
                        background: #eef2ff;
                        color: #4F46E5;
                        padding: 2px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        font-weight: 600;
                        margin-bottom: 5px;
                    }

                    .definition {
                        margin: 5px 0;
                        font-size: 14px;
                    }

                    .example {
                        background: #f0f9ff;
                        border-left: 3px solid #4F46E5;
                        padding: 8px 12px;
                        margin: 8px 0;
                        font-style: italic;
                        font-size: 13px;
                        color: #374151;
                    }

                    .synonyms, .antonyms {
                        font-size: 12px;
                        margin-top: 5px;
                        color: #4b5563;
                    }

                    .synonyms strong, .antonyms strong {
                        color: #059669;
                    }

                    .footer {
                        margin-top: 40px;
                        text-align: center;
                        font-size: 12px;
                        color: #9ca3af;
                        border-top: 1px solid #e5e7eb;
                        padding-top: 20px;
                    }

                    @media print {
                        body { padding: 15px; }
                        .word-card { page-break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                <h1>📚 英语学习单词表</h1>
                <div class="date">导出日期：${new Date().toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</div>
        `;

        // 添加每个单词
        this.currentResults.forEach((result, index) => {
            printContent += `
                <div class="word-card">
                    <div class="word-header">
                        <span class="word-title">${index + 1}. ${result.word}</span>
                        ${result.phonetic ? `<span class="word-phonetic">${result.phonetic}</span>` : ''}
                    </div>
            `;

            result.meanings.forEach(meaning => {
                printContent += '<div class="meaning">';

                if (meaning.partOfSpeech) {
                    printContent += `<div class="pos">${meaning.partOfSpeech}</div>`;
                }

                printContent += `<div class="definition">${meaning.definition}</div>`;

                if (meaning.example) {
                    printContent += `<div class="example">${meaning.example}</div>`;
                }

                if (meaning.synonyms && meaning.synonyms.length > 0) {
                    printContent += `<div class="synonyms"><strong>同义词：</strong>${meaning.synonyms.slice(0, 3).join(', ')}</div>`;
                }

                if (meaning.antonyms && meaning.antonyms.length > 0) {
                    printContent += `<div class="antonyms"><strong>反义词：</strong>${meaning.antonyms.slice(0, 3).join(', ')}</div>`;
                }

                printContent += '</div>';
            });

            printContent += '</div>';
        });

        printContent += `
                <div class="footer">
                    <p>英语学习工具 - 为高二学生定制 · 助力2027年1月上海高考春考 🎓</p>
                    <p>共 ${this.currentResults.length} 个单词</p>
                </div>
            </body>
            </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();

        // 等待内容加载完成后打印
        printWindow.onload = function() {
            printWindow.print();
        };

        this.showToast('正在准备打印...', 'info');
    }

    /**
     * 显示加载状态
     */
    showLoading() {
        this.loadingState.classList.remove('hidden');
        this.resultsSection.classList.add('hidden');
        this.emptyState.classList.add('hidden');
        this.searchBtn.disabled = true;
        this.searchBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    /**
     * 隐藏加载状态
     */
    hideLoading() {
        this.loadingState.classList.add('hidden');
        this.searchBtn.disabled = false;
        this.searchBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    /**
     * 显示添加到单词本的菜单
     */
    showAddToNotebookMenu(word) {
        const notebooks = this.storage.getNotebooks();

        if (notebooks.length === 0) {
            this.showToast('请先创建单词本', 'warning');
            notebookManager.openNotebookModal();
            return;
        }

        // 创建简单的选择菜单
        const menu = document.createElement('div');
        menu.className = 'fixed inset-0 z-50 flex items-center justify-center';
        menu.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50" onclick="this.parentElement.remove()"></div>
            <div class="relative bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 max-h-[70vh] overflow-y-auto">
                <h3 class="text-xl font-heading font-bold text-gray-800 mb-4">添加 "${word}" 到单词本</h3>
                <div class="space-y-2">
                    ${notebooks.map(nb => `
                        <button
                            onclick="app.addWordToNotebook('${word}', '${nb.id}'); this.closest('.fixed').remove();"
                            class="w-full text-left px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-indigo-50 transition-all cursor-pointer"
                        >
                            <div class="font-semibold text-gray-800">${nb.name}</div>
                            <div class="text-sm text-gray-600">${nb.words.length} 个单词</div>
                        </button>
                    `).join('')}
                </div>
                <button
                    onclick="this.closest('.fixed').remove()"
                    class="mt-4 w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors cursor-pointer"
                >
                    取消
                </button>
            </div>
        `;

        document.body.appendChild(menu);
    }

    /**
     * 添加单词到单词本
     */
    addWordToNotebook(word, notebookId) {
        notebookManager.addWordToNotebook(word, notebookId);
    }

    /**
     * 显示提示消息
     */
    showToast(message, type = 'info') {
        // 简单的提示实现（可以后续用更好的UI库替换）
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };

        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300`;
        toast.textContent = message;

        document.body.appendChild(toast);

        // 动画进入
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
        }, 10);

        // 3秒后移除
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

/**
 * 本地存储管理器
 */
class StorageManager {
    constructor() {
        this.STORAGE_KEY = 'englishLearningTool';
        this.data = this.load();
    }

    /**
     * 加载数据
     */
    load() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('加载数据失败:', error);
        }

        return {
            history: [],
            tags: {}, // { word: 'mastered' | 'review' | 'difficult' }
            statistics: {
                totalCount: 0,
                todayCount: 0,
                lastDate: null
            },
            notebooks: [], // 单词本列表
            wordReviewDates: {} // { word: lastReviewDate }
        };
    }

    /**
     * 保存数据
     */
    save() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
        } catch (error) {
            console.error('保存数据失败:', error);
        }
    }

    /**
     * 添加到历史记录
     */
    addToHistory(word) {
        if (!this.data.history.includes(word)) {
            this.data.history.unshift(word);
            // 限制历史记录数量
            if (this.data.history.length > 100) {
                this.data.history = this.data.history.slice(0, 100);
            }
            this.save();
        }
    }

    /**
     * 获取历史记录
     */
    getHistory() {
        return this.data.history;
    }

    /**
     * 设置标记
     */
    setTag(word, tag) {
        this.data.tags[word] = tag;
        this.save();
    }

    /**
     * 获取标记
     */
    getTag(word) {
        return this.data.tags[word] || null;
    }

    /**
     * 移除标记
     */
    removeTag(word) {
        delete this.data.tags[word];
        this.save();
    }

    /**
     * 更新统计
     */
    updateStatistics(count) {
        const today = new Date().toDateString();

        // 检查是否是新的一天
        if (this.data.statistics.lastDate !== today) {
            this.data.statistics.todayCount = 0;
            this.data.statistics.lastDate = today;
        }

        this.data.statistics.todayCount += count;
        this.data.statistics.totalCount += count;

        this.save();
    }

    /**
     * 获取统计数据
     */
    getStatistics() {
        const today = new Date().toDateString();

        // 重置今日计数（如果是新的一天）
        if (this.data.statistics.lastDate !== today) {
            this.data.statistics.todayCount = 0;
            this.data.statistics.lastDate = today;
            this.save();
        }

        // 计算标记统计
        const tags = Object.values(this.data.tags);
        const masteredCount = tags.filter(t => t === 'mastered').length;
        const reviewCount = tags.filter(t => t === 'review').length;

        return {
            todayCount: this.data.statistics.todayCount,
            totalCount: this.data.statistics.totalCount,
            masteredCount: masteredCount,
            reviewCount: reviewCount
        };
    }

    /**
     * === 单词本管理方法 ===
     */

    /**
     * 创建单词本
     */
    createNotebook(name, category, description = '') {
        const notebook = {
            id: Date.now().toString(),
            name: name,
            category: category,
            description: description,
            words: [],
            createdAt: new Date().toISOString()
        };

        if (!this.data.notebooks) {
            this.data.notebooks = [];
        }

        this.data.notebooks.push(notebook);
        this.save();
        return notebook;
    }

    /**
     * 获取所有单词本
     */
    getNotebooks() {
        if (!this.data.notebooks) {
            this.data.notebooks = [];
        }
        return this.data.notebooks;
    }

    /**
     * 根据ID获取单词本
     */
    getNotebookById(id) {
        return this.getNotebooks().find(nb => nb.id === id);
    }

    /**
     * 更新单词本
     */
    updateNotebook(id, name, category, description) {
        const notebook = this.getNotebookById(id);
        if (notebook) {
            notebook.name = name;
            notebook.category = category;
            notebook.description = description;
            this.save();
        }
    }

    /**
     * 删除单词本
     */
    deleteNotebook(id) {
        this.data.notebooks = this.getNotebooks().filter(nb => nb.id !== id);
        this.save();
    }

    /**
     * 添加单词到单词本
     */
    addWordToNotebook(notebookId, word) {
        const notebook = this.getNotebookById(notebookId);
        if (notebook && !notebook.words.includes(word)) {
            notebook.words.push(word);
            this.save();
        }
    }

    /**
     * 从单词本移除单词
     */
    removeWordFromNotebook(notebookId, word) {
        const notebook = this.getNotebookById(notebookId);
        if (notebook) {
            notebook.words = notebook.words.filter(w => w !== word);
            this.save();
        }
    }

    /**
     * 获取需要复习的单词
     */
    getReviewWords() {
        // 返回标记为"需复习"和"难词"的单词
        const words = [];
        for (const [word, tag] of Object.entries(this.data.tags)) {
            if (tag === 'review' || tag === 'difficult') {
                words.push(word);
            }
        }
        return words;
    }

    /**
     * 记录单词复习时间
     */
    recordReview(word) {
        if (!this.data.wordReviewDates) {
            this.data.wordReviewDates = {};
        }
        this.data.wordReviewDates[word] = new Date().toISOString();
        this.save();
    }

    /**
     * 获取单词上次复习时间
     */
    getLastReviewDate(word) {
        if (!this.data.wordReviewDates) {
            return null;
        }
        return this.data.wordReviewDates[word] || null;
    }
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new EnglishLearningApp();
    notebookManager = new NotebookManager(app.storage);
    console.log('✅ 英语学习工具已启动');
});
