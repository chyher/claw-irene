/**
 * Humanizer Demo - 去AI化演示逻辑
 * 实现简单的字符串替换去AI化逻辑，支持打字机效果输出
 */

(function() {
  'use strict';

  // AI套话映射表 - 用于替换
  const AI_PATTERNS = {
    // 开头套话
    '在当今': '现在',
    '众所周知': '大家都知道',
    '不可否认的是': '说实话',
    '值得注意的是': '有意思的是',
    '需要指出的是': '其实',
    '必须承认': '老实说',
    '毫无疑问': '显然',
    '从某种程度上说': '某种程度上',
    '从某种意义上讲': '说白了',
    '总而言之': '总之',
    '综上所述': '所以',
    '基于上述分析': '根据这些',
    '通过本文的分析': '看完这些',
    
    // 过渡词
    '首先，': '',
    '其次，': '',
    '再次，': '',
    '最后，': '',
    '第一，': '',
    '第二，': '',
    '第三，': '',
    '一方面': '',
    '另一方面': '',
    '与此同时': '同时',
    '不仅如此': '而且',
    '除此之外': '另外',
    '换句话说': '也就是说',
    '简而言之': '简单说',
    
    // 正式化表达
    '充分利用': '用好',
    '有效利用': '用好',
    '进行优化': '优化',
    '实施改进': '改进',
    '开展研究': '研究',
    '推进工作': '推进',
    '落实措施': '落实',
    '加强管理': '管好',
    '提升水平': '提高',
    '增强能力': '提高',
    '促进发展': '推动',
    '推动进步': '推动',
    '实现目标': '达到目标',
    '达成目的': '达到目的',
    '取得成效': '有效果',
    '获得成果': '有成果',
    
    // 冗长表达
    '数字化转型的浪潮中': '数字化时代',
    '快速发展的背景下': '现在',
    '日益激烈的竞争中': '竞争激烈',
    '不断变化的形势下': '形势变化快',
    '复杂多变的环境中': '环境复杂',
    '人工智能技术的优势': 'AI的优势',
    '业务流程的智能化升级': '业务智能化',
    '运营效率和市场竞争力': '效率和竞争力',
    '社会进步的重要力量': '重要推动力',
    '巨大的应用潜力': '很有用',
    '持续优化': '不断优化',
    '详细规划': '具体规划',
    '深入分析': '仔细分析',
    '全面评估': '好好评估',
    '系统梳理': '梳理清楚',
    
    // 连接词优化
    '；因此，': '。所以',
    '；然而，': '。但是',
    '；此外，': '。另外',
    '；同时，': '。同时',
    '；另外，': '。另外',
    
    // 冗余词汇
    '非常地': '很',
    '极其地': '很',
    '十分地': '很',
    '相当地': '挺',
    '特别地': '特别',
    '显著地': '明显',
    '明显地': '明显',
    '有效地': '有效',
    '充分地': '充分',
    '全面地': '全面',
    '深入地': '深入',
    '细致地': '细致',
  };

  // 口语化替换（随机选择）
  const CASUAL_REPLACEMENTS = {
    '因此': ['所以', '于是', '这样一来'],
    '然而': ['但是', '不过', '可是'],
    '此外': ['另外', '还有', '再说'],
    '并且': ['而且', '还', '并且'],
    '如果': ['要是', '假如', '如果'],
    '很多': ['不少', '很多', '挺多'],
    '非常': ['特别', '很', '相当'],
    '认为': ['觉得', '认为', '感觉'],
    '表示': ['说', '表示', '称'],
    '进行': ['做', '进行', '搞'],
    '使用': ['用', '使用', '拿'],
    '获取': ['拿到', '得到', '获得'],
    '购买': ['买', '购买', '入手'],
    '查看': ['看看', '瞅瞅', '查看'],
    '了解': ['知道', '了解', '搞清楚'],
  };

  /**
   * 去AI化处理
   * @param {string} text - 输入文本
   * @returns {string} - 处理后的文本
   */
  function humanize(text) {
    if (!text || !text.trim()) {
      return '';
    }

    let result = text;

    // 1. 替换AI套话
    Object.entries(AI_PATTERNS).forEach(([pattern, replacement]) => {
      const regex = new RegExp(pattern, 'g');
      result = result.replace(regex, replacement);
    });

    // 2. 口语化替换（随机）
    Object.entries(CASUAL_REPLACEMENTS).forEach(([pattern, replacements]) => {
      const regex = new RegExp(pattern, 'g');
      result = result.replace(regex, () => {
        return replacements[Math.floor(Math.random() * replacements.length)];
      });
    });

    // 3. 简化长句 - 将逗号分隔的长句适当拆分
    result = simplifyLongSentences(result);

    // 4. 清理多余空格和标点
    result = cleanText(result);

    // 5. 添加一些口语化元素
    result = addCasualTouch(result);

    return result;
  }

  /**
   * 简化长句
   */
  function simplifyLongSentences(text) {
    // 如果句子太长，尝试在适当位置拆分
    const sentences = text.split('。');
    const simplified = sentences.map(sentence => {
      // 如果单句超过50字且有逗号，考虑拆分
      if (sentence.length > 50 && sentence.includes('，')) {
        const parts = sentence.split('，');
        if (parts.length > 3) {
          // 将长句拆成短句
          return parts.join('，').replace(/，/g, (match, offset, string) => {
            // 每2-3个逗号后加一个句号
            const before = string.substring(0, offset);
            const commaCount = (before.match(/，/g) || []).length;
            if (commaCount > 0 && commaCount % 2 === 0) {
              return '。';
            }
            return match;
          });
        }
      }
      return sentence;
    });
    
    return simplified.join('。');
  }

  /**
   * 清理文本
   */
  function cleanText(text) {
    return text
      .replace(/\s+/g, ' ')           // 多个空格合并
      .replace(/。+/g, '。')          // 多个句号合并
      .replace(/，+/g, '，')          // 多个逗号合并
      .replace(/；+/g, '；')          // 多个分号合并
      .replace(/^\s+/, '')            // 开头空格
      .replace(/\s+$/, '')            // 结尾空格
      .replace(/，\s*。/g, '。')       // 逗号+句号 -> 句号
      .replace(/。\s*，/g, '，')       // 句号+逗号 -> 逗号
      .trim();
  }

  /**
   * 添加口语化元素
   */
  function addCasualTouch(text) {
    const touches = [
      { prefix: '', suffix: '' },
      { prefix: '', suffix: '。说实话，这样确实更好' },
      { prefix: '其实', suffix: '' },
      { prefix: '', suffix: '。你觉得呢？' },
    ];
    
    // 20%概率添加口语化元素
    if (Math.random() < 0.2) {
      const touch = touches[Math.floor(Math.random() * touches.length)];
      return touch.prefix + text + touch.suffix;
    }
    
    return text;
  }

  /**
   * 打字机效果类
   */
  class TypeWriter {
    constructor(element, text, options = {}) {
      this.element = element;
      this.text = text;
      this.speed = options.speed || 30;
      this.onComplete = options.onComplete || (() => {});
      this.currentIndex = 0;
      this.isRunning = false;
    }

    start() {
      this.isRunning = true;
      this.element.innerHTML = '<span class="output-text"></span><span class="typing-cursor"></span>';
      this.type();
      return this;
    }

    type() {
      if (!this.isRunning) return;

      const textSpan = this.element.querySelector('.output-text');
      const cursor = this.element.querySelector('.typing-cursor');

      if (this.currentIndex < this.text.length) {
        textSpan.textContent += this.text.charAt(this.currentIndex);
        this.currentIndex++;
        
        // 随机速度，模拟真实打字
        const randomSpeed = this.speed + (Math.random() * 20 - 10);
        setTimeout(() => this.type(), randomSpeed);
      } else {
        // 打字完成
        cursor.remove();
        this.onComplete();
      }
    }

    stop() {
      this.isRunning = false;
    }

    complete() {
      this.stop();
      this.element.innerHTML = `<span class="output-text">${this.text}</span>`;
      this.onComplete();
    }
  }

  // DOM 元素引用
  let inputText, outputArea, humanizeBtn, copyBtn, transformIndicator;
  let currentTypeWriter = null;

  /**
   * 初始化
   */
  function init() {
    inputText = document.getElementById('inputText');
    outputArea = document.getElementById('outputArea');
    humanizeBtn = document.getElementById('humanizeBtn');
    copyBtn = document.getElementById('copyBtn');
    transformIndicator = document.getElementById('transformIndicator');

    if (!inputText || !outputArea || !humanizeBtn) {
      console.error('Humanizer demo: Required elements not found');
      return;
    }

    // 绑定事件
    bindEvents();
    
    // 设置默认示例文本
    inputText.value = '在当今数字化转型的浪潮中，企业需要充分利用人工智能技术的优势，实现业务流程的智能化升级，从而提升运营效率和市场竞争力。';
  }

  /**
   * 绑定事件
   */
  function bindEvents() {
    // 转换按钮
    humanizeBtn.addEventListener('click', handleHumanize);

    // 复制按钮
    if (copyBtn) {
      copyBtn.addEventListener('click', handleCopy);
    }

    // 示例标签点击
    document.querySelectorAll('.example-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const example = tag.dataset.example;
        if (example) {
          inputText.value = example;
          inputText.focus();
          // 添加视觉反馈
          tag.style.transform = 'scale(0.95)';
          setTimeout(() => tag.style.transform = '', 150);
        }
      });
    });

    // 输入框焦点效果
    inputText.addEventListener('focus', () => {
      updateIreneMood('thinking', '在写什么呢？让我看看~');
    });

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Enter 触发转换
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleHumanize();
      }
    });
  }

  /**
   * 处理转换
   */
  async function handleHumanize() {
    const text = inputText.value.trim();
    
    if (!text) {
      showNotification('请先输入一些文本', 'warning');
      inputText.focus();
      return;
    }

    // 停止之前的打字机
    if (currentTypeWriter) {
      currentTypeWriter.stop();
    }

    // 更新UI状态
    setLoading(true);
    updateIreneMood('working', '正在去除AI味...');

    // 模拟处理延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    // 执行转换
    const result = humanize(text);

    // 显示结果（打字机效果）
    outputArea.classList.add('has-content');
    
    currentTypeWriter = new TypeWriter(outputArea, result, {
      speed: 25,
      onComplete: () => {
        setLoading(false);
        enableCopy(result);
        updateIreneMood('happy', '搞定！文字自然多了~');
      }
    });

    currentTypeWriter.start();
  }

  /**
   * 处理复制
   */
  async function handleCopy() {
    const text = outputArea.querySelector('.output-text')?.textContent || '';
    
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      
      // 视觉反馈
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = '<span>✓</span><span>已复制</span>';
      
      updateIreneMood('excited', '已复制到剪贴板！');
      
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = '<span>📋</span><span>复制</span>';
      }, 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      showNotification('复制失败，请手动复制', 'error');
    }
  }

  /**
   * 设置加载状态
   */
  function setLoading(loading) {
    if (loading) {
      humanizeBtn.disabled = true;
      humanizeBtn.classList.add('loading');
      humanizeBtn.innerHTML = '<span>⚡</span><span>转换中...</span>';
      transformIndicator.classList.remove('hidden');
      outputArea.innerHTML = '';
      outputArea.classList.remove('has-content');
      if (copyBtn) copyBtn.disabled = true;
    } else {
      humanizeBtn.disabled = false;
      humanizeBtn.classList.remove('loading');
      humanizeBtn.innerHTML = '<span>✨</span><span>去除AI味</span>';
      transformIndicator.classList.add('hidden');
    }
  }

  /**
   * 启用复制按钮
   */
  function enableCopy(text) {
    if (copyBtn && text) {
      copyBtn.disabled = false;
    }
  }

  /**
   * 更新Irene表情
   */
  function updateIreneMood(mood, message) {
    const irene = document.getElementById('ireneMood');
    if (!irene) return;

    const avatar = irene.querySelector('.irene-avatar');
    const bubble = irene.querySelector('.irene-bubble span');

    // 表情映射
    const emojis = {
      idle: '😺',
      thinking: '🤔',
      working: '⚡',
      happy: '😸',
      excited: '✨'
    };

    if (avatar && emojis[mood]) {
      avatar.textContent = emojis[mood];
    }

    if (bubble && message) {
      bubble.textContent = message;
      // 显示气泡
      irene.classList.add('show-bubble');
      setTimeout(() => {
        irene.classList.remove('show-bubble');
      }, 3000);
    }
  }

  /**
   * 显示通知
   */
  function showNotification(message, type = 'info') {
    // 简单的通知实现
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 24px;
      background: ${type === 'error' ? 'rgba(255, 107, 107, 0.9)' : type === 'warning' ? 'rgba(245, 158, 11, 0.9)' : 'rgba(0, 245, 255, 0.9)'};
      color: white;
      border-radius: 8px;
      font-size: 14px;
      z-index: 10000;
      animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // 添加动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from { transform: translate(-50%, -100%); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translate(-50%, 0); opacity: 1; }
      to { transform: translate(-50%, -100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 导出API供外部使用
  window.Humanizer = {
    humanize,
    TypeWriter
  };

})();