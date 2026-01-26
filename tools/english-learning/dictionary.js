/**
 * 词典API服务
 * 混合模式：优先使用在线API，失败时回退到本地词库
 */

class DictionaryService {
    constructor() {
        // 在线API配置
        this.apis = [
            {
                name: 'Free Dictionary API',
                url: (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
                parser: this.parseFreeDict.bind(this)
            }
        ];

        // 本地词库缓存
        this.localCache = new Map();
        this.initLocalVocab();
    }

    /**
     * 查询单词（主方法）
     */
    async lookup(word) {
        word = word.trim().toLowerCase();

        if (!word) {
            return null;
        }

        try {
            // 尝试在线API
            for (const api of this.apis) {
                try {
                    const response = await fetch(api.url(word));
                    if (response.ok) {
                        const data = await response.json();
                        return api.parser(data, word);
                    }
                } catch (error) {
                    console.warn(`${api.name} failed:`, error);
                    continue;
                }
            }

            // 所有API失败，尝试本地词库
            return this.lookupLocal(word);
        } catch (error) {
            console.error('Lookup error:', error);
            return this.lookupLocal(word);
        }
    }

    /**
     * 批量查询
     */
    async lookupBatch(words) {
        const results = [];
        for (const word of words) {
            const result = await this.lookup(word);
            if (result) {
                results.push(result);
            }
        }
        return results;
    }

    /**
     * 解析 Free Dictionary API 响应（优化：收集所有例句）
     */
    parseFreeDict(data, word) {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return null;
        }

        const entry = data[0];
        const meanings = [];

        // 提取所有词性和释义
        if (entry.meanings) {
            for (const meaning of entry.meanings) {
                const partOfSpeech = meaning.partOfSpeech || '';

                for (const definition of meaning.definitions || []) {
                    // 收集所有例句（不只是第一个）
                    const examples = [];
                    if (definition.example) {
                        examples.push(definition.example);
                    }

                    meanings.push({
                        partOfSpeech: partOfSpeech,
                        definition: definition.definition || '',
                        examples: examples, // 改为数组
                        example: definition.example || '', // 保留向后兼容
                        synonyms: definition.synonyms || [],
                        antonyms: definition.antonyms || []
                    });
                }
            }
        }

        // 提取音标
        const phonetics = entry.phonetics || [];
        let phonetic = '';
        let audioUrl = '';

        for (const p of phonetics) {
            if (p.text && !phonetic) {
                phonetic = p.text;
            }
            if (p.audio && !audioUrl) {
                audioUrl = p.audio;
            }
        }

        return {
            word: entry.word || word,
            phonetic: phonetic || entry.phonetic || '',
            audioUrl: audioUrl,
            meanings: meanings,
            source: 'online',
            sourceApi: 'Free Dictionary API'
        };
    }

    /**
     * 本地词库查询（备份）
     */
    lookupLocal(word) {
        // 检查缓存
        if (this.localCache.has(word)) {
            return this.localCache.get(word);
        }

        // 基础本地词库（示例）
        const basicVocab = this.getBasicVocab(word);
        if (basicVocab) {
            this.localCache.set(word, basicVocab);
            return basicVocab;
        }

        return {
            word: word,
            phonetic: '',
            audioUrl: '',
            meanings: [{
                partOfSpeech: '',
                definition: '未找到该单词的详细信息，请检查拼写或稍后重试。',
                example: '',
                synonyms: [],
                antonyms: []
            }],
            source: 'local',
            sourceApi: 'Local Fallback'
        };
    }

    /**
     * 初始化本地词库（常用高考词汇 - 优化版：包含多个例句和用法）
     */
    initLocalVocab() {
        // 添加一些常用高考词汇，包含丰富的例句和用法
        const commonWords = {
            'abandon': {
                word: 'abandon',
                phonetic: '/əˈbændən/',
                meanings: [
                    {
                        partOfSpeech: 'v.',
                        definition: '放弃；中止（计划、活动等）',
                        examples: [
                            'They had to abandon the game because of rain.',
                            'The search was abandoned when night came.',
                            'We had to abandon our plan to climb the mountain.'
                        ],
                        example: 'They had to abandon the game because of rain.',
                        synonyms: ['give up', 'quit', 'discontinue'],
                        antonyms: ['continue', 'keep', 'maintain']
                    },
                    {
                        partOfSpeech: 'v.',
                        definition: '遗弃；抛弃（某人）',
                        examples: [
                            'He abandoned his wife and children.',
                            'The baby was abandoned by its parents.'
                        ],
                        example: 'He abandoned his wife and children.',
                        synonyms: ['desert', 'forsake', 'leave'],
                        antonyms: ['stay with', 'support']
                    }
                ],
                source: 'local'
            },
            'ability': {
                word: 'ability',
                phonetic: '/əˈbɪləti/',
                meanings: [
                    {
                        partOfSpeech: 'n.',
                        definition: '能力；才能（做某事的能力）',
                        examples: [
                            'She has the ability to solve complex problems.',
                            'He has remarkable ability in music.',
                            'Reading will improve your ability to write.',
                            'The test measures your ability to think logically.'
                        ],
                        example: 'She has the ability to solve complex problems.',
                        synonyms: ['capability', 'capacity', 'skill', 'talent'],
                        antonyms: ['inability', 'incompetence']
                    }
                ],
                source: 'local'
            },
            'achieve': {
                word: 'achieve',
                phonetic: '/əˈtʃiːv/',
                meanings: [
                    {
                        partOfSpeech: 'v.',
                        definition: '实现；达到（目标、成就等）',
                        examples: [
                            'She achieved her goal of becoming a doctor.',
                            'He has achieved great success in his career.',
                            'We finally achieved our target sales.',
                            'It takes hard work to achieve your dreams.'
                        ],
                        example: 'She achieved her goal of becoming a doctor.',
                        synonyms: ['accomplish', 'attain', 'reach', 'realize'],
                        antonyms: ['fail', 'miss']
                    }
                ],
                source: 'local'
            },
            'affect': {
                word: 'affect',
                phonetic: '/əˈfekt/',
                meanings: [
                    {
                        partOfSpeech: 'v.',
                        definition: '影响；对...产生作用',
                        examples: [
                            'The disease affects many young children.',
                            'How does this law affect you personally?',
                            'The weather seriously affected our plans.',
                            'Climate change is affecting the whole world.'
                        ],
                        example: 'The disease affects many young children.',
                        synonyms: ['influence', 'impact', 'change'],
                        antonyms: []
                    }
                ],
                source: 'local'
            },
            'appreciate': {
                word: 'appreciate',
                phonetic: '/əˈpriːʃieɪt/',
                meanings: [
                    {
                        partOfSpeech: 'v.',
                        definition: '欣赏；感激；理解',
                        examples: [
                            'I really appreciate your help.',
                            'She appreciates good music.',
                            'We all appreciate the importance of education.',
                            'I would appreciate it if you could reply soon.'
                        ],
                        example: 'I really appreciate your help.',
                        synonyms: ['value', 'be grateful for', 'understand'],
                        antonyms: ['undervalue', 'depreciate']
                    }
                ],
                source: 'local'
            },
            'approach': {
                word: 'approach',
                phonetic: '/əˈprəʊtʃ/',
                meanings: [
                    {
                        partOfSpeech: 'v.',
                        definition: '接近；靠近；着手处理',
                        examples: [
                            'Winter is approaching.',
                            'A car was approaching from the distance.',
                            'We need a new approach to this problem.',
                            'He approached me with a question.'
                        ],
                        example: 'Winter is approaching.',
                        synonyms: ['come near', 'move toward', 'tackle'],
                        antonyms: ['leave', 'depart', 'withdraw']
                    },
                    {
                        partOfSpeech: 'n.',
                        definition: '方法；途径；态度',
                        examples: [
                            'We need a new approach to teaching.',
                            'His approach to the problem was very practical.',
                            'Different approaches produce different results.'
                        ],
                        example: 'We need a new approach to teaching.',
                        synonyms: ['method', 'way', 'strategy'],
                        antonyms: []
                    }
                ],
                source: 'local'
            }
        };

        for (const [word, data] of Object.entries(commonWords)) {
            this.localCache.set(word, data);
        }
    }

    /**
     * 获取基础词汇信息（兜底方案）
     */
    getBasicVocab(word) {
        // 如果本地有缓存，返回
        return this.localCache.get(word) || null;
    }

    /**
     * 文本转语音（使用浏览器API）
     */
    speak(word, lang = 'en-US') {
        if ('speechSynthesis' in window) {
            // 停止之前的语音
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = lang;
            utterance.rate = 0.8; // 稍慢一点，便于学习
            utterance.pitch = 1.0;

            window.speechSynthesis.speak(utterance);
        } else {
            console.warn('浏览器不支持语音合成');
        }
    }

    /**
     * 播放在线音频
     */
    playAudio(audioUrl) {
        if (!audioUrl) {
            return false;
        }

        try {
            const audio = new Audio(audioUrl);
            audio.play().catch(error => {
                console.warn('音频播放失败:', error);
                return false;
            });
            return true;
        } catch (error) {
            console.error('音频播放错误:', error);
            return false;
        }
    }
}

// 导出单例
const dictionaryService = new DictionaryService();
