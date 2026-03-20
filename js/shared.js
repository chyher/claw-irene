/**
 * Irene Blog - Shared JavaScript
 * 共享工具函数、组件基类、事件总线
 */

// ============================================
// Event Bus - 全局事件通信
// ============================================
class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Event handler error for ${event}:`, error);
        }
      });
    }
  }

  once(event, callback) {
    const onceCallback = (data) => {
      callback(data);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }
}

// 全局事件总线实例
window.eventBus = new EventBus();

// ============================================
// Component Base Class - 组件基类
// ============================================
class Component {
  constructor(element, options = {}) {
    this.element = typeof element === 'string'
      ? document.querySelector(element)
      : element;
    this.options = options;
    this.isMounted = false;
    this.eventListeners = [];
  }

  mount() {
    if (!this.isMounted) {
      this.render();
      this.bindEvents();
      this.isMounted = true;
      this.onMount?.();
    }
    return this;
  }

  unmount() {
    if (this.isMounted) {
      this.unbindEvents();
      this.element.innerHTML = '';
      this.isMounted = false;
      this.onUnmount?.();
    }
    return this;
  }

  render() {
    // 子类实现
  }

  bindEvents() {
    // 子类实现
  }

  unbindEvents() {
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];
  }

  addEventListener(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    this.eventListeners.push({ element, event, handler });
  }

  emit(event, data) {
    window.eventBus.emit(event, data);
  }

  on(event, callback) {
    const unsubscribe = window.eventBus.on(event, callback);
    this.eventListeners.push({ type: 'eventBus', unsubscribe });
    return unsubscribe;
  }
}

// ============================================
// Utility Functions - 工具函数
// ============================================

const Utils = {
  // 防抖
  debounce(fn, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        fn(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // 节流
  throttle(fn, wait) {
    let time = Date.now();
    return function(...args) {
      if ((time + wait - Date.now()) < 0) {
        fn.apply(this, args);
        time = Date.now();
      }
    };
  },

  // 延迟
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // 随机范围
  random(min, max) {
    return Math.random() * (max - min) + min;
  },

  // 随机整数
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // 随机数组元素
  randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // 打乱数组
  shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  },

  // 深拷贝
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // 格式化日期
  formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes);
  },

  // 检测元素是否在视口内
  isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -threshold &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // 平滑滚动到元素
  scrollTo(element, offset = 0) {
    const target = typeof element === 'string' ? document.querySelector(element) : element;
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  },

  // 创建元素
  createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    return element;
  },

  // 转义 HTML
  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // 检测用户偏好
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  prefersDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  },

  // 存储封装
  storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch {
        return defaultValue;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
    remove(key) {
      localStorage.removeItem(key);
    },
    clear() {
      localStorage.clear();
    }
  }
};

// 挂载到全局
window.Utils = Utils;

// ============================================
// Animation Utilities - 动画工具
// ============================================

const Animations = {
  // 淡入
  fadeIn(element, duration = 500) {
    return new Promise(resolve => {
      element.style.opacity = '0';
      element.style.transition = `opacity ${duration}ms ease`;
      requestAnimationFrame(() => {
        element.style.opacity = '1';
      });
      setTimeout(resolve, duration);
    });
  },

  // 淡出
  fadeOut(element, duration = 500) {
    return new Promise(resolve => {
      element.style.transition = `opacity ${duration}ms ease`;
      element.style.opacity = '0';
      setTimeout(() => {
        element.style.display = 'none';
        resolve();
      }, duration);
    });
  },

  // 滑入
  slideIn(element, direction = 'up', duration = 500) {
    const transforms = {
      up: 'translateY(30px)',
      down: 'translateY(-30px)',
      left: 'translateX(30px)',
      right: 'translateX(-30px)'
    };
    return new Promise(resolve => {
      element.style.opacity = '0';
      element.style.transform = transforms[direction];
      element.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      requestAnimationFrame(() => {
        element.style.opacity = '1';
        element.style.transform = 'translate(0)';
      });
      setTimeout(resolve, duration);
    });
  },

  // 脉冲效果
  pulse(element, duration = 1000) {
    element.style.animation = `pulse ${duration}ms ease-in-out`;
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  },

  // 抖动效果
  shake(element, duration = 500) {
    element.style.animation = `shake ${duration}ms ease-in-out`;
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  },

  // 交错动画
  stagger(elements, animationFn, staggerDelay = 100) {
    elements.forEach((el, index) => {
      setTimeout(() => animationFn(el), index * staggerDelay);
    });
  }
};

window.Animations = Animations;

// ============================================
// Intersection Observer Helper - 视口检测
// ============================================

class ViewportObserver {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };
    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
    this.callbacks = new Map();
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      const callback = this.callbacks.get(entry.target);
      if (callback) {
        callback(entry.isIntersecting, entry);
      }
    });
  }

  observe(element, callback) {
    this.observer.observe(element);
    this.callbacks.set(element, callback);
  }

  unobserve(element) {
    this.observer.unobserve(element);
    this.callbacks.delete(element);
  }

  disconnect() {
    this.observer.disconnect();
    this.callbacks.clear();
  }
}

window.ViewportObserver = ViewportObserver;

// ============================================
// Page Transition - 页面过渡
// ============================================

class PageTransition {
  static async navigate(url, options = {}) {
    const { transition = 'fade', duration = 500 } = options;

    // 检查 View Transition API 支持
    if (document.startViewTransition && transition === 'view') {
      const viewTransition = document.startViewTransition(async () => {
        window.location.href = url;
      });
      await viewTransition.ready;
    } else {
      // 降级方案
      const overlay = Utils.createElement('div', {
        className: 'page-transition-overlay',
        style: `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--bg-primary);
          z-index: 9999;
          opacity: 0;
          transition: opacity ${duration}ms ease;
        `
      });
      document.body.appendChild(overlay);

      await Animations.fadeIn(overlay, duration / 2);
      window.location.href = url;
    }
  }
}

window.PageTransition = PageTransition;

// ============================================
// Skill Data Loader - 技能数据加载
// ============================================

const SkillData = {
  // 技能数据配置
  skills: [
    {
      id: 'humanizer',
      name: 'Humanizer',
      icon: '📝',
      color: '#ff6b6b',
      description: '去除AI味，让文字更有人情味',
      longDescription: '通过智能改写技术，将机械化的AI生成文本转换为自然流畅的人写风格，保持原意的同时提升可读性。',
      features: [
        { icon: '✨', title: '智能改写', desc: '自动识别AI特征词汇并替换' },
        { icon: '🎭', title: '语气调节', desc: '支持正式、随意、幽默等多种风格' },
        { icon: '🎯', title: '风格匹配', desc: '根据场景选择最适合的表达方式' }
      ],
      useCases: ['周报润色', '邮件优化', '文案改写'],
      tags: ['写作', 'PRO'],
      demoType: 'text-transform'
    },
    {
      id: 'daily-ai-news',
      name: 'Daily AI News',
      icon: '📰',
      color: '#a855f7',
      description: '每日AI圈最新动态聚合',
      longDescription: '自动抓取全球AI领域最新资讯，智能分类整理，按热度排序，让你第一时间掌握行业动态。',
      features: [
        { icon: '🌐', title: '智能抓取', desc: '多源信息自动聚合' },
        { icon: '📊', title: '分类整理', desc: '按技术、产品、公司自动归类' },
        { icon: '🔥', title: '热度排序', desc: '基于讨论度智能排序' }
      ],
      useCases: ['晨会准备', '行业研究', '趋势跟踪'],
      tags: ['资讯', 'NEW'],
      demoType: 'news-feed'
    },
    {
      id: 'canvas-design',
      name: 'Canvas Design',
      icon: '🎨',
      color: '#f59e0b',
      description: 'Canvas海报与视觉设计',
      longDescription: '使用HTML5 Canvas技术创建精美的海报、封面、图表等视觉内容，支持导出多种格式。',
      features: [
        { icon: '🖼️', title: '海报生成', desc: '一键生成社交媒体海报' },
        { icon: '📐', title: '精确布局', desc: '像素级精准控制' },
        { icon: '💾', title: '多格式导出', desc: '支持PNG、JPG、SVG' }
      ],
      useCases: ['社媒运营', '活动海报', '数据可视化'],
      tags: ['设计', 'PRO'],
      demoType: 'canvas-preview'
    },
    {
      id: 'frontend-design',
      name: 'Frontend Design',
      icon: '💻',
      color: '#6366f1',
      description: '前端开发与界面设计',
      longDescription: '从概念到代码的一站式前端开发服务，包含响应式布局、交互动效、组件开发等。',
      features: [
        { icon: '📱', title: '响应式布局', desc: '完美适配各种设备' },
        { icon: '✨', title: '交互动效', desc: '流畅的动画体验' },
        { icon: '🧩', title: '组件开发', desc: '可复用的模块化组件' }
      ],
      useCases: [' landing page', '后台系统', '交互原型'],
      tags: ['开发', 'PRO'],
      demoType: 'code-preview'
    },
    {
      id: 'docx-master',
      name: 'DOCX Master',
      icon: '📄',
      color: '#22c55e',
      description: 'Word文档精准读写',
      longDescription: '专业的Word文档处理能力，支持复杂的格式操作、表格处理、批量替换等功能。',
      features: [
        { icon: '📖', title: '精准读写', desc: '保留原有格式的同时编辑' },
        { icon: '📊', title: '表格处理', desc: '复杂的表格操作支持' },
        { icon: '🔄', title: '批量操作', desc: '高效处理大量文档' }
      ],
      useCases: ['合同生成', '报告撰写', '批量处理'],
      tags: ['办公', 'PRO'],
      demoType: 'document-preview'
    },
    {
      id: 'search-assistant',
      name: 'Search Assistant',
      icon: '🔍',
      color: '#0ea5e9',
      description: '智能搜索与信息整合',
      longDescription: '结合多种搜索技术，快速找到你需要的信息，并自动整理成结构化内容。',
      features: [
        { icon: '🌐', title: '多源搜索', desc: '网页、学术、新闻全覆盖' },
        { icon: '🧠', title: '智能摘要', desc: '自动生成内容摘要' },
        { icon: '📑', title: '信息整合', desc: '多源信息交叉验证' }
      ],
      useCases: ['竞品调研', '资料收集', '事实核查'],
      tags: ['搜索'],
      demoType: 'search-demo'
    },
    {
      id: 'auto-workflow',
      name: 'Auto Workflow',
      icon: '⚡',
      color: '#ec4899',
      description: '自动化工作流搭建',
      longDescription: '可视化搭建自动化流程，定时任务、条件触发、数据流转，让重复工作自动化。',
      features: [
        { icon: '⏰', title: '定时任务', desc: '灵活的定时触发机制' },
        { icon: '⚙️', title: '条件触发', desc: '基于条件的智能执行' },
        { icon: '📈', title: '数据流转', desc: '多系统间数据自动同步' }
      ],
      useCases: ['日报生成', '数据监控', '流程自动化'],
      tags: ['自动化'],
      demoType: 'flowchart'
    },
    {
      id: 'rag-qa',
      name: 'RAG QA',
      icon: '🧠',
      color: '#8b5cf6',
      description: 'RAG文档问答系统',
      longDescription: '基于检索增强生成技术，让AI能够基于你的私有文档进行精准问答。',
      features: [
        { icon: '📚', title: '文档理解', desc: '支持多种格式文档' },
        { icon: '💬', title: '精准问答', desc: '基于文档内容的回答' },
        { icon: '🔗', title: '来源追溯', desc: '每个回答都有出处' }
      ],
      useCases: ['知识库问答', '文档检索', '智能客服'],
      tags: ['AI'],
      demoType: 'chat-demo'
    }
  ],

  // 获取所有技能
  getAll() {
    return this.skills;
  },

  // 根据ID获取技能
  getById(id) {
    return this.skills.find(skill => skill.id === id);
  },

  // 根据标签筛选
  getByTag(tag) {
    return this.skills.filter(skill => skill.tags.includes(tag));
  },

  // 搜索技能
  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.skills.filter(skill =>
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.description.toLowerCase().includes(lowerQuery)
    );
  }
};

window.SkillData = SkillData;

//