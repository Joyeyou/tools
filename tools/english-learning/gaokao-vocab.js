/**
 * 上海高考考纲词汇库
 * 包含3500个常见高考词汇（这里列出部分示例）
 */

const GaokaoVocabulary = {
    // 高考核心词汇集（示例：实际应包含完整3500词）
    coreWords: new Set([
        // A
        'abandon', 'ability', 'able', 'abnormal', 'aboard', 'abolish', 'abortion', 'about',
        'above', 'abroad', 'abrupt', 'absence', 'absent', 'absolute', 'absolutely', 'absorb',
        'abstract', 'absurd', 'abundant', 'abuse', 'academic', 'academy', 'accelerate', 'accent',
        'accept', 'acceptable', 'access', 'accessible', 'accident', 'accidental', 'accommodate', 'accommodation',
        'accompany', 'accomplish', 'accord', 'according', 'account', 'accountant', 'accumulate', 'accuracy',
        'accurate', 'accuse', 'accustomed', 'ache', 'achieve', 'achievement', 'acid', 'acknowledge',
        'acquaintance', 'acquire', 'acquisition', 'across', 'act', 'action', 'active', 'activist',
        'activity', 'actor', 'actress', 'actual', 'actually', 'acute', 'adapt', 'adaptation',
        'add', 'addicted', 'addition', 'additional', 'address', 'adequate', 'adjust', 'adjustment',
        'administer', 'administration', 'admirable', 'admire', 'admission', 'admit', 'adolescent', 'adopt',
        'adorable', 'adult', 'advance', 'advanced', 'advantage', 'adventure', 'advertise', 'advertisement',
        'advice', 'advisable', 'advise', 'advocate', 'affair', 'affect', 'affection', 'afford',
        'afraid', 'after', 'afternoon', 'afterward', 'again', 'against', 'age', 'agency',
        'agenda', 'agent', 'aggressive', 'ago', 'agree', 'agreeable', 'agreement', 'agriculture',
        'ahead', 'aid', 'aim', 'air', 'aircraft', 'airline', 'airport', 'alarm',
        'album', 'alcohol', 'alert', 'alien', 'alike', 'alive', 'all', 'allergic',
        'allocate', 'allow', 'allowance', 'almost', 'alone', 'along', 'aloud', 'alphabet',
        'already', 'also', 'alter', 'alternative', 'although', 'altitude', 'altogether', 'aluminum',
        'always', 'amateur', 'amaze', 'amazing', 'ambiguous', 'ambition', 'ambulance', 'among',
        'amount', 'ample', 'amuse', 'amusement', 'analyse', 'analysis', 'ancestor', 'anchor',
        'ancient', 'and', 'anger', 'angle', 'angry', 'animal', 'anniversary', 'announce',
        'annoy', 'annual', 'another', 'answer', 'ant', 'anticipate', 'anxiety', 'anxious',
        'any', 'anybody', 'anyhow', 'anyone', 'anything', 'anyway', 'anywhere', 'apart',
        'apartment', 'apologize', 'apology', 'apparent', 'appeal', 'appear', 'appearance', 'appetite',
        'applaud', 'apple', 'appliance', 'applicant', 'application', 'apply', 'appoint', 'appointment',
        'appreciate', 'appreciation', 'approach', 'appropriate', 'approval', 'approve', 'approximate', 'approximately',
        'april', 'arbitrary', 'arch', 'architect', 'architecture', 'arctic', 'are', 'area',
        'argue', 'argument', 'arise', 'arithmetic', 'arm', 'army', 'around', 'arouse',
        'arrange', 'arrangement', 'arrest', 'arrival', 'arrive', 'arrow', 'art', 'article',
        'artificial', 'artist', 'artistic', 'as', 'ash', 'ashamed', 'asia', 'asian',
        'aside', 'ask', 'asleep', 'aspect', 'assess', 'assessment', 'asset', 'assign',
        'assignment', 'assist', 'assistance', 'assistant', 'associate', 'association', 'assume', 'assumption',
        'assure', 'astonish', 'astronaut', 'astronomer', 'astronomy', 'at', 'athlete', 'athletic',
        'atmosphere', 'atom', 'atomic', 'attach', 'attack', 'attain', 'attempt', 'attend',
        'attendance', 'attention', 'attentive', 'attitude', 'attorney', 'attract', 'attraction', 'attractive',
        'attribute', 'audience', 'august', 'aunt', 'author', 'authority', 'auto', 'automatic',
        'automobile', 'autonomous', 'autumn', 'available', 'avenue', 'average', 'avoid', 'await',
        'awake', 'award', 'aware', 'awareness', 'away', 'awesome', 'awful', 'awkward',

        // B
        'baby', 'bachelor', 'back', 'background', 'backward', 'bacon', 'bacteria', 'bad',
        'badly', 'badminton', 'bag', 'baggage', 'bake', 'bakery', 'balance', 'balanced',
        'balcony', 'ball', 'ballet', 'balloon', 'bamboo', 'ban', 'banana', 'band',
        'bang', 'bank', 'bankrupt', 'banner', 'bar', 'barbecue', 'barber', 'bare',
        'barely', 'bargain', 'bark', 'barn', 'barrel', 'barrier', 'base', 'baseball',
        'basement', 'basic', 'basically', 'basin', 'basis', 'basket', 'basketball', 'bat',
        'bath', 'bathe', 'bathroom', 'bathtub', 'battery', 'battle', 'bay', 'be',

        // C - E (部分高频词)
        'cabinet', 'cable', 'cafe', 'cafeteria', 'cage', 'cake', 'calculate', 'calculator',
        'calendar', 'call', 'calm', 'camera', 'camp', 'campaign', 'campus', 'can',
        'cancel', 'cancer', 'candidate', 'candle', 'candy', 'canteen', 'cap', 'capable',
        'capacity', 'capital', 'captain', 'capture', 'car', 'carbon', 'card', 'cardboard',
        'care', 'career', 'careful', 'carefully', 'careless', 'cargo', 'carpenter', 'carpet',
        'carriage', 'carrier', 'carrot', 'carry', 'cart', 'cartoon', 'carve', 'case',
        'cash', 'cast', 'castle', 'casual', 'cat', 'catalog', 'catastrophe', 'catch',
        'category', 'cater', 'cathedral', 'cattle', 'cause', 'caution', 'cautious', 'cave',
        'cease', 'ceiling', 'celebrate', 'celebration', 'celebrity', 'cell', 'cellar', 'cent',
        'centimeter', 'central', 'centre', 'century', 'ceremony', 'certain', 'certainly', 'certificate',
        'chain', 'chair', 'chairman', 'chairwoman', 'chalk', 'challenge', 'challenging', 'champion',
        'championship', 'chance', 'change', 'changeable', 'channel', 'chaos', 'chapter', 'character',
        'characteristic', 'charge', 'charity', 'charm', 'charming', 'chart', 'chase', 'chat',
        'cheap', 'cheat', 'check', 'cheek', 'cheer', 'cheerful', 'cheese', 'chef',
        'chemical', 'chemist', 'chemistry', 'cheque', 'cherry', 'chess', 'chest', 'chew',
        'chicken', 'chief', 'child', 'childhood', 'childish', 'chill', 'chimney', 'chin',
        'china', 'chinese', 'chip', 'chocolate', 'choice', 'choir', 'choke', 'choose',

        // 继续添加更多常见词...
        'communicate', 'community', 'company', 'compare', 'compete', 'competition', 'complete', 'complex',
        'concentrate', 'concept', 'concern', 'concert', 'conclude', 'conclusion', 'condition', 'conduct',
        'conference', 'confidence', 'confident', 'confirm', 'conflict', 'confuse', 'congratulate', 'connect',
        'consequence', 'consider', 'considerable', 'consist', 'constant', 'construct', 'consult', 'consume',
        'contact', 'contain', 'contemporary', 'content', 'contest', 'context', 'continent', 'continue',
        'contract', 'contrast', 'contribute', 'control', 'controversial', 'convenient', 'convention', 'conversation',
        'convert', 'convince', 'cook', 'cookie', 'cool', 'cooperate', 'coordinate', 'cope',
        'copy', 'core', 'corn', 'corner', 'corporate', 'correct', 'correspond', 'cost',
        'cottage', 'cotton', 'could', 'council', 'count', 'counter', 'country', 'countryside',
        'county', 'couple', 'courage', 'course', 'court', 'cousin', 'cover', 'cow',
        'crack', 'craft', 'crash', 'crazy', 'cream', 'create', 'creative', 'creature',
        'credit', 'crew', 'crime', 'criminal', 'crisis', 'criterion', 'critic', 'critical',
        'criticize', 'crop', 'cross', 'crowd', 'crowded', 'crucial', 'cruel', 'cry',
        'crystal', 'cube', 'cubic', 'cuisine', 'cultural', 'culture', 'cup', 'cupboard',
        'cure', 'curious', 'currency', 'current', 'curriculum', 'curtain', 'curve', 'custom',
        'customer', 'customs', 'cut', 'cute', 'cycle', 'cyclist',

        // D
        'dad', 'daddy', 'daily', 'damage', 'damp', 'dance', 'dancer', 'danger',
        'dangerous', 'dare', 'dark', 'darkness', 'dash', 'data', 'database', 'date',
        'daughter', 'dawn', 'day', 'dead', 'deadline', 'deaf', 'deal', 'dealer',
        'dear', 'death', 'debate', 'debt', 'decade', 'decay', 'december', 'decent',
        'decide', 'decision', 'deck', 'declare', 'decline', 'decorate', 'decoration', 'decrease',
        'dedicate', 'deed', 'deep', 'deeply', 'deer', 'defeat', 'defence', 'defend',
        'define', 'definite', 'definitely', 'definition', 'degree', 'delay', 'delete', 'deliberate',
        'delicate', 'delicious', 'delight', 'delighted', 'deliver', 'delivery', 'demand', 'demonstrate',
        'dentist', 'deny', 'depart', 'department', 'departure', 'depend', 'dependent', 'deposit',
        'depression', 'depth', 'derive', 'describe', 'description', 'desert', 'deserve', 'design',
        'designer', 'desirable', 'desire', 'desk', 'desperate', 'despite', 'dessert', 'destination',
        'destroy', 'destruction', 'detail', 'detailed', 'detect', 'detective', 'determine', 'determined',
        'develop', 'development', 'device', 'devil', 'devote', 'devoted', 'diagram', 'dial',
        'dialogue', 'diamond', 'diary', 'dictation', 'dictionary', 'die', 'diet', 'differ',
        'difference', 'different', 'difficult', 'difficulty', 'dig', 'digest', 'digital', 'dignity',
        'dilemma', 'dimension', 'dinner', 'dinosaur', 'dioxide', 'dip', 'diploma', 'direct',
        'direction', 'directly', 'director', 'directory', 'dirt', 'dirty', 'disability', 'disabled',
        'disadvantage', 'disagree', 'disappear', 'disappoint', 'disappointed', 'disappointing', 'disappointment', 'disaster',
        'discount', 'discourage', 'discover', 'discovery', 'discrimination', 'discuss', 'discussion', 'disease',
        'disgusting', 'dish', 'disk', 'dislike', 'dismiss', 'disorder', 'display', 'disposal',
        'dispose', 'dispute', 'distance', 'distant', 'distinct', 'distinction', 'distinguish', 'distribute',
        'district', 'disturb', 'disturbing', 'dive', 'diverse', 'diversity', 'divide', 'division',
        'divorce', 'dizzy', 'do', 'dock', 'doctor', 'document', 'documentary', 'dog',
        'doll', 'dollar', 'domain', 'domestic', 'dominant', 'dominate', 'donate', 'donation',
        'done', 'door', 'doorbell', 'dormitory', 'dot', 'double', 'doubt', 'doubtful',
        'down', 'download', 'downstairs', 'downtown', 'downward', 'dozen', 'draft', 'drag',
        'dragon', 'drama', 'dramatic', 'draw', 'drawer', 'drawing', 'dream', 'dress',
        'drink', 'drive', 'driver', 'drop', 'drought', 'drown', 'drug', 'drum',
        'drunk', 'dry', 'duck', 'due', 'dull', 'dumb', 'dump', 'during',
        'dusk', 'dust', 'dusty', 'duty', 'dynamic',

        // E
        'each', 'eager', 'eagle', 'ear', 'early', 'earn', 'earnest', 'earth',
        'earthquake', 'ease', 'easily', 'east', 'eastern', 'easy', 'eat', 'ecology',
        'economic', 'economical', 'economics', 'economist', 'economy', 'edge', 'edition', 'editor',
        'educate', 'education', 'educational', 'educator', 'effect', 'effective', 'efficiency', 'efficient',
        'effort', 'egg', 'eight', 'eighteen', 'eighth', 'eighty', 'either', 'elaborate',
        'elder', 'elderly', 'elect', 'election', 'electric', 'electrical', 'electricity', 'electronic',
        'elegant', 'element', 'elementary', 'elephant', 'elevator', 'eleven', 'eliminate', 'else',
        'elsewhere', 'email', 'embarrass', 'embarrassed', 'embarrassing', 'embassy', 'emerge', 'emergency',
        'emission', 'emotion', 'emotional', 'emperor', 'emphasis', 'emphasize', 'empire', 'employ',
        'employee', 'employer', 'employment', 'empty', 'enable', 'encounter', 'encourage', 'encouragement',
        'end', 'ending', 'endless', 'enemy', 'energetic', 'energy', 'enforce', 'engage',
        'engine', 'engineer', 'engineering', 'enhance', 'enjoy', 'enjoyable', 'enlarge', 'enormous',
        'enough', 'enquiry', 'ensure', 'enter', 'enterprise', 'entertain', 'entertaining', 'entertainment',
        'enthusiasm', 'enthusiastic', 'entire', 'entirely', 'entitle', 'entrance', 'entry', 'envelope',
        'environment', 'environmental', 'envy', 'equal', 'equality', 'equation', 'equip', 'equipment',
        'equivalent', 'era', 'eraser', 'error', 'erupt', 'escape', 'especially', 'essay',
        'essential', 'establish', 'estate', 'estimate', 'etc', 'ethnic', 'europe', 'european',
        'evaluate', 'evaluation', 'even', 'evening', 'event', 'eventually', 'ever', 'every',
        'everybody', 'everyday', 'everyone', 'everything', 'everywhere', 'evidence', 'evident', 'evil',
        'evolution', 'evolve', 'exact', 'exactly', 'exam', 'examination', 'examine', 'example',
        'exceed', 'excellent', 'except', 'exception', 'exceptional', 'excess', 'excessive', 'exchange',
        'excite', 'excited', 'excitement', 'exciting', 'exclaim', 'exclude', 'excuse', 'execute',
        'executive', 'exercise', 'exert', 'exhaust', 'exhausted', 'exhibit', 'exhibition', 'exist',
        'existence', 'exit', 'exotic', 'expand', 'expansion', 'expect', 'expectation', 'expedition',
        'expense', 'expensive', 'experience', 'experienced', 'experiment', 'experimental', 'expert', 'explain',
        'explanation', 'explicit', 'explode', 'exploit', 'exploration', 'explore', 'explorer', 'explosion',
        'export', 'expose', 'exposure', 'express', 'expression', 'extend', 'extension', 'extensive',
        'extent', 'external', 'extinct', 'extra', 'extraordinary', 'extreme', 'extremely', 'eye',

        // 更多词汇...（实际应用中应包含完整的3500词）
        'face', 'facilitate', 'facility', 'fact', 'factor', 'factory', 'fade', 'fail',
        'failure', 'faint', 'fair', 'fairly', 'fairy', 'faith', 'faithful', 'fall',
        'false', 'fame', 'familiar', 'family', 'famine', 'famous', 'fan', 'fancy',
        'fantastic', 'fantasy', 'far', 'fare', 'farm', 'farmer', 'farming', 'fascinate',
        'fashion', 'fashionable', 'fast', 'fasten', 'fat', 'fatal', 'fate', 'father',
        'fault', 'favor', 'favorable', 'favorite', 'fear', 'fearful', 'feast', 'feather',
        'feature', 'february', 'federal', 'fee', 'feed', 'feedback', 'feel', 'feeling',
        'fellow', 'female', 'fence', 'ferry', 'festival', 'fetch', 'fever', 'few',
        'field', 'fierce', 'fifteen', 'fifth', 'fifty', 'fight', 'fighter', 'figure',
        'file', 'fill', 'film', 'filter', 'final', 'finally', 'finance', 'financial',
        'find', 'finding', 'fine', 'finger', 'finish', 'fire', 'firework', 'firm',
        'first', 'fish', 'fisherman', 'fist', 'fit', 'fitness', 'five', 'fix',
        'flag', 'flame', 'flash', 'flashlight', 'flat', 'flavor', 'flee', 'flesh',
        'flexible', 'flight', 'float', 'flood', 'floor', 'flour', 'flow', 'flower',
        'flu', 'fluent', 'fluid', 'fly', 'focus', 'fog', 'foggy', 'fold',
        'folk', 'follow', 'following', 'fond', 'food', 'fool', 'foolish', 'foot',
        'football', 'footstep', 'for', 'forbid', 'force', 'forecast', 'forehead', 'foreign',
        'foreigner', 'foresee', 'forest', 'forever', 'forget', 'forgive', 'fork', 'form',
        'formal', 'format', 'former', 'formula', 'forth', 'fortunate', 'fortunately', 'fortune',
        'forty', 'forward', 'found', 'foundation', 'fountain', 'four', 'fourteen', 'fourth',
        'fox', 'fragile', 'fragment', 'frame', 'framework', 'frank', 'free', 'freedom',
        'freeway', 'freeze', 'freezing', 'freight', 'french', 'frequency', 'frequent', 'frequently',
        'fresh', 'friction', 'friday', 'fridge', 'friend', 'friendly', 'friendship', 'frighten',
        'frightened', 'frightening', 'frog', 'from', 'front', 'frontier', 'frost', 'frown',
        'fruit', 'fruitful', 'frustrated', 'fry', 'fuel', 'fulfil', 'full', 'fun',
        'function', 'fund', 'fundamental', 'funeral', 'funny', 'fur', 'furious', 'furnish',
        'furniture', 'further', 'furthermore', 'future'
    ]),

    /**
     * 检查是否为高考词汇
     */
    isGaokaoWord(word) {
        return this.coreWords.has(word.toLowerCase());
    },

    /**
     * 获取词汇统计
     */
    getStats() {
        return {
            total: this.coreWords.size,
            description: '上海高考考纲核心词汇'
        };
    }
};

/**
 * 艾宾浩斯复习计划
 * 遗忘曲线：20分钟、1小时、1天、2天、4天、7天、15天
 */
const EbbinghausReview = {
    // 复习间隔（天数）
    intervals: [0, 1, 2, 4, 7, 15, 30],

    /**
     * 计算下次复习时间
     */
    getNextReviewDate(lastReviewDate, reviewCount = 0) {
        if (!lastReviewDate) {
            return new Date(); // 立即复习
        }

        const last = new Date(lastReviewDate);
        const intervalIndex = Math.min(reviewCount, this.intervals.length - 1);
        const daysToAdd = this.intervals[intervalIndex];

        const nextDate = new Date(last);
        nextDate.setDate(nextDate.getDate() + daysToAdd);

        return nextDate;
    },

    /**
     * 检查是否需要复习
     */
    needsReview(lastReviewDate, reviewCount = 0) {
        const nextReview = this.getNextReviewDate(lastReviewDate, reviewCount);
        return new Date() >= nextReview;
    },

    /**
     * 获取复习阶段描述
     */
    getReviewStage(reviewCount) {
        const stages = [
            '第1次复习（短期记忆）',
            '第2次复习（1天后）',
            '第3次复习（2天后）',
            '第4次复习（4天后）',
            '第5次复习（7天后）',
            '第6次复习（15天后）',
            '长期记忆巩固'
        ];

        const index = Math.min(reviewCount, stages.length - 1);
        return stages[index];
    }
};
