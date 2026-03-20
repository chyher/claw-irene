# Irene Blog 技能展示平台 - 架构设计文档

## 1. 项目概述

### 1.1 目标
构建一个交互式的技能展示平台，展示 Irene 的 8 个核心技能，每个技能配有独立详情页和实时演示区域。

### 1.2 设计原则
- **纯原生技术栈**: HTML5 + CSS3 + Vanilla JS
- **组件化思维**: 模块化设计，便于维护和扩展
- **性能优先**: 60fps 动画，懒加载策略
- **赛博朋克美学**: 延续现有深色+霓虹视觉风格

---

## 2. 组件架构设计

### 2.1 核心组件清单

```
components/
├── SkillCard/              # 技能卡片组件
│   ├── SkillCard.css
│   ├── SkillCard.js
│   └── README.md
├── SkillDetail/            # 技能详情页框架
│   ├── SkillDetail.css
│   ├── SkillDetail.js
│   └── README.md
├── DemoArea/               # 演示区域组件
│   ├── DemoArea.css
│   ├── DemoArea.js
│   └── README.md
├── IreneMood/              # Irene 表情组件
│   ├── IreneMood.css
│   ├── IreneMood.js
│   └── README.md
└── shared/                 # 共享组件
    ├── LoadingSpinner/
    ├── TypeWriter/
    ├── GlowButton/
    └── PageTransition/
```

### 2.2 SkillCard 组件

**功能**: 首页技能网格中的卡片单元

**特性**:
- 悬停发光效果 (box-shadow + border-color transition)
- 微动效 (translateY + scale)
- 图标动画 (hover 时旋转/缩放)
- 技能等级指示器

**CSS 关键实现**:
```css
.skill-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 245, 255, 0.2);
}

.skill-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: var(--accent-cyan);
  box-shadow: 
    0 20px 40px rgba(0, 245, 255, 0.15),
    0 0 60px rgba(0, 245, 255, 0.1);
}

.skill-card .icon {
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.skill-card:hover .icon {
  transform: rotate(360deg) scale(1.1);
}
```

**JS 接口**:
```javascript
class SkillCard {
  constructor(config) {
    this.id = config.id;           // 技能唯一标识
    this.name = config.name;       // 技能名称
    this.icon = config.icon;       // 图标 (emoji 或 SVG)
    this.desc = config.desc;       // 简短描述
    this.tags = config.tags;       // 标签数组
    this.level = config.level;     // 熟练度 (1-5)
    this.color = config.color;     // 主题色
  }
  
  render() { /* 返回 DOM 元素 */ }
  onHover(callback) { /* 悬停事件 */ }
  onClick(callback) { /* 点击事件 - 导航到详情页 */ }
}
```

### 2.3 SkillDetail 组件

**功能**: 技能详情页框架，包含全屏过渡动画

**页面结构**:
```
SkillDetail Page
├── Hero Section (技能标题 + 简介)
├── Feature Grid (功能特性)
├── DemoArea (实时演示区)
├── Use Cases (使用场景)
└── Related Skills (相关技能)
```

**全屏过渡动画实现**:
```css
/* 页面进入动画 */
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}

.skill-detail {
  animation: pageEnter 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* 共享元素过渡 (View Transition API) */
::view-transition-old(skill-card) {
  animation: cardToDetail 0.5s ease forwards;
}

::view-transition-new(skill-detail) {
  animation: detailFromCard 0.5s ease forwards;
}
```

**JS 页面切换逻辑**:
```javascript
class SkillDetail {
  constructor(skillId) {
    this.skillId = skillId;
    this.data = this.loadSkillData(skillId);
  }
  
  async navigateFromCard(cardElement) {
    // 使用 View Transition API
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        this.render();
      });
      await transition.ready;
    } else {
      // 降级方案: CSS 动画
      this.render();
    }
  }
  
  render() { /* 渲染完整详情页 */ }
}
```

### 2.4 DemoArea 组件

**功能**: 技能实时演示区域

**核心功能**:
- 打字机效果展示输出
- 加载动画状态
- 交互式输入区
- 结果展示区

**打字机效果实现**:
```javascript
class TypeWriter {
  constructor(element, options = {}) {
    this.element = element;
    this.speed = options.speed || 50;
    this.cursor = options.cursor || '▋';
    this.onComplete = options.onComplete || (() => {});
  }
  
  async type(text) {
    this.element.innerHTML = `<span class="type-text"></span><span class="cursor">${this.cursor}</span>`;
    const typeText = this.element.querySelector('.type-text');
    
    for (let i = 0; i < text.length; i++) {
      typeText.textContent += text[i];
      await this.delay(this.speed);
    }
    
    this.onComplete();
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

**加载动画**:
```css
.demo-loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.demo-loading .dot {
  width: 8px;
  height: 8px;
  background: var(--accent-cyan);
  border-radius: 50%;
  animation: loadingBounce 1.4s ease-in-out infinite both;
}

.demo-loading .dot:nth-child(1) { animation-delay: -0.32s; }
.demo-loading .dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes loadingBounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
```

### 2.5 IreneMood 组件

**功能**: 根据交互状态变化的 Irene 表情

**表情状态**:
| 状态 | 触发条件 | 表情 |
|------|----------|------|
| idle | 无交互 5秒后 | 😺 |
| happy | 技能加载成功 | 😸 |
| thinking | 处理中 | 🤔 |
| excited | 用户积极交互 | ✨ |
| sleepy | 深夜时段 | 😴 |

**实现**:
```javascript
class IreneMood {
  constructor() {
    this.moods = {
      idle: { emoji: '😺', animation: 'gentle-float' },
      happy: { emoji: '😸', animation: 'bounce' },
      thinking: { emoji: '🤔', animation: 'tilt' },
      excited: { emoji: '✨', animation: 'sparkle' },
      sleepy: { emoji: '😴', animation: 'slow-breath' }
    };
    this.currentMood = 'idle';
    this.element = document.createElement('div');
    this.element.className = 'irene-mood';
  }
  
  setMood(mood) {
    if (this.moods[mood]) {
      this.currentMood = mood;
      this.render();
    }
  }
  
  render() {
    const mood = this.moods[this.currentMood];
    this.element.innerHTML = mood.emoji;
    this.element.style.animation = `${mood.animation} 2s ease-in-out infinite`;
  }
}
```

---

## 3. 路由与页面结构

### 3.1 路由映射

```
/                           # 首页 - 技能网格
├── /skills/
│   ├── humanizer          # AI文本人性化
│   ├── daily-ai-news      # 每日AI新闻
│   ├── canvas-design      # Canvas海报设计
│   ├── frontend-design    # 前端开发
│   ├── docx-master        # Word文档处理
│   ├── search-assistant   # 搜索助手
│   ├── auto-workflow      # 自动化工作流
│   └── rag-qa             # RAG文档问答
```

### 3.2 页面结构模板

每个技能详情页遵循统一模板:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- 共享 head 模板 -->
  <link rel="stylesheet" href="../css/shared.css">
  <link rel="stylesheet" href="../css/skill-detail.css">
  <link rel="stylesheet" href="../css/demo-area.css">
</head>
<body>
  <!-- 导航 -->
  <nav class="navbar">...</nav>
  
  <!-- 技能详情页容器 -->
  <main class="skill-detail" data-skill-id="humanizer">
    <!-- Hero 区域 -->
    <section class="skill-hero">
      <div class="skill-icon">📝</div>
      <h1>Humanizer</h1>
      <p class="skill-desc">去除AI味，让文字更有人情味</p>
    </section>
    
    <!-- 功能特性 -->
    <section class="skill-features">
      <!-- 特性卡片网格 -->
    </section>
    
    <!-- 演示区域 -->
    <section class="demo-section">
      <div class="demo-area" id="demoArea">
        <!-- 动态加载演示内容 -->
      </div>
    </section>
    
    <!-- 使用场景 -->
    <section class="use-cases">
      <!-- 场景卡片 -->
    </section>
  </main>
  
  <!-- Irene 表情 -->
  <div class="irene-mood-container"></div>
  
  <!-- 脚本 -->
  <script src="../js/shared.js"></script>
  <script src="../js/skill-detail.js"></script>
  <script src="../js/demo-humanizer.js"></script>
</body>
</html>
```

---

## 4. 技术规范

### 4.1 CSS 架构

**文件组织**:
```
css/
├── shared.css              # 共享变量、重置、工具类
├── components/
│   ├── skill-card.css
│   ├── skill-detail.css
│   ├── demo-area.css
│   └── irene-mood.css
├── animations.css          # 关键帧动画库
├── responsive.css          # 响应式断点
└── skills/                 # 各技能特定样式
    ├── humanizer.css
    ├── daily-ai-news.css
    └── ...
```

**CSS 变量系统**:
```css
:root {
  /* 颜色系统 */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: rgba(20, 20, 30, 0.8);
  --text-primary: #e8e8f0;
  --text-secondary: #9898a8;
  --accent-cyan: #00f5ff;
  --accent-magenta: #ff00aa;
  --accent-purple: #a855f7;
  
  /* 发光效果 */
  --glow-cyan: 0 0 20px rgba(0, 245, 255, 0.5);
  --glow-magenta: 0 0 20px rgba(255, 0, 170, 0.5);
  --glow-purple: 0 0 20px rgba(168, 85, 247, 0.5);
  
  /* 边框 */
  --border-glow: 1px solid rgba(0, 245, 255, 0.3);
  --border-radius: 16px;
  
  /* 间距 */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 48px;
  --space-2xl: 80px;
  
  /* 动画 */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
}
```

### 4.2 JavaScript 架构

**文件组织**:
```
js/
├── shared.js               # 共享工具函数、事件总线
├── components/
│   ├── SkillCard.js
│   ├── SkillDetail.js
│   ├── DemoArea.js
│   ├── IreneMood.js
│   ├── TypeWriter.js
│   └── LoadingSpinner.js
├── demos/                  # 各技能演示逻辑
│   ├── demo-humanizer.js
│   ├── demo-daily-ai-news.js
│   └── ...
└── data/
    └── skills.js           # 技能数据配置
```

**组件基类**:
```javascript
// shared.js
class Component {
  constructor(element) {
    this.element = typeof element === 'string' 
      ? document.querySelector(element) 
      : element;
    this.isMounted = false;
  }
  
  mount() {
    if (!this.isMounted) {
      this.render();
      this.bindEvents();
      this.isMounted = true;
    }
    return this;
  }
  
  unmount() {
    if (this.isMounted) {
      this.unbindEvents();
      this.element.innerHTML = '';
      this.isMounted = false;
    }
    return this;
  }
  
  render() { /* 子类实现 */ }
  bindEvents() { /* 子类实现 */ }
  unbindEvents() { /* 子类实现 */ }
}

// 事件总线
class EventBus {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(data));
    }
  }
}
window.eventBus = new EventBus();
```

### 4.3 组件复用策略

**1. 模板复用**
```javascript
// templates/skill-detail-template.js
const SkillDetailTemplate = {
  render(data) {
    return `
      <section class="skill-hero">
        <div class="skill-icon" style="--skill-color: ${data.color}">
          ${data.icon}
        </div>
        <h1>${data.name}</h1>
        <p class="skill-desc">${data.description}</p>
      </section>
      <!-- ... -->
    `;
  }
};
```

**2. CSS 类复用**
```css
/* 工具类 */
.glow-hover:hover {
  box-shadow: var(--glow-cyan);
}

.card-base {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  border: var(--border-glow);
}

.animate-fade-in {
  animation: fadeIn 0.5s var(--ease-out-expo) forwards;
}
```

**3. 数据驱动配置**
```javascript
// data/skills.js
const SKILLS = [
  {
    id: 'humanizer',
    name: 'Humanizer',
    icon: '📝',
    color: '#ff6b6b',
    description: '去除AI味，让文字更有人情味',
    features: ['智能改写', '语气调节', '风格匹配'],
    demoType: 'text-transform'
  },
  {
    id: 'daily-ai-news',
    name: 'Daily AI News',
    icon: '📰',
    color: '#a855f7',
    description: '每日AI圈最新动态聚合',
    features: ['智能抓取', '分类整理', '热度排序'],
    demoType: 'news-feed'
  }
  // ... 其他技能
];
```

---

## 5. 动画性能优化

### 5.1 优化原则

**DO**:
- 使用 `transform` 和 `opacity` 做动画
- 使用 `will-change` 提前告知浏览器
- 使用 CSS 动画而非 JS 动画
- 使用 `requestAnimationFrame` 做复杂动画

**DON'T**:
- 动画 `width`, `height`, `top`, `left`
- 在滚动事件中直接操作 DOM
- 同时触发大量动画

### 5.2 性能优化代码

```css
/* GPU 加速 */
.gpu-accelerated {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 减少重绘 */
.contain-layout {
  contain: layout style paint;
}

/* 内容可见性 - 懒渲染 */
.lazy-render {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

```javascript
// 节流滚动事件
function throttle(fn, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn.apply(this, arguments);
      time = Date.now();
    }
  };
}

// 使用 Intersection Observer 触发动画
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
```

### 5.3 降级策略

```javascript
// 检测用户偏好
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// 条件应用动画
if (!prefersReducedMotion) {
  document.body.classList.add('animations-enabled');
}
```

---

## 6. 目录结构建议

### 6.1 推荐结构

```
/root/.openclaw/workspace/data/projects/irene-blog/
├── index.html                    # 首页 - 技能网格
├── ARCHITECTURE.md               # 架构文档
├── README.md                     # 项目说明
├── progress.md                   # 进度跟踪
├── css/
│   ├── style.css                 # 主样式 (现有)
│   ├── shared.css                # 共享变量和工具类
│   ├── animations.css            # 动画关键帧库
│   ├── responsive.css            # 响应式断点
│   └── components/
│       ├── skill-card.css
│       ├── skill-detail.css
│       ├── demo-area.css
│       └── irene-mood.css
├── js/
│   ├── shared.js                 # 共享工具函数
│   ├── components/
│       ├── SkillCard.js
│       ├── SkillDetail.js
│       ├── DemoArea.js
│       ├── IreneMood.js
│       ├── TypeWriter.js
│       └── LoadingSpinner.js
│   ├── demos/
│   │   ├── demo-humanizer.js
│   │   ├── demo-daily-ai-news.js
│   │   ├── demo-canvas-design.js
│   │   ├── demo-frontend-design.js
│   │   ├── demo-docx-master.js
│   │   ├── demo-search-assistant.js
│   │   ├── demo-auto-workflow.js
│   │   └── demo-rag-qa.js
│   └── data/
│       └── skills.js             # 技能数据配置
├── skills/                       # 技能详情页
│   ├── index.html                # 技能列表 (可选)
│   ├── humanizer.html
│   ├── daily-ai-news.html
│   ├── canvas-design.html
│   ├── frontend-design.html
│   ├── docx-master.html
│   ├── search-assistant.html
│   ├── auto-workflow.html
│   └── rag-qa.html
├── components/                   # 组件模板 (可选)
│   ├── SkillCard.html
│   ├── SkillDetail.html
│   ├── DemoArea.html
│   └── IreneMood.html
├── assets/
│   ├── images/
│   └── icons/
├── posts/                        # 博客文章 (现有)
└── data/                         # 数据文件 (现有)
    └── posts.json
```

---

## 7. 开发检查清单

### 7.1 组件开发流程

- [ ] 创建组件 CSS 文件
- [ ] 创建组件 JS 文件
- [ ] 编写组件文档注释
- [ ] 添加响应式适配
- [ ] 测试动画性能 (60fps)
- [ ] 验证可访问性 (ARIA)

### 7.2 技能页面开发流程

- [ ] 复制页面模板
- [ ] 配置技能数据
- [ ] 实现演示逻辑
- [ ] 添加 Irene 表情交互
- [ ] 测试页面过渡动画
- [ ] 验证移动端适配

### 7.3 性能检查项

- [ ] Lighthouse 性能评分 > 90
- [ ] 首次内容绘制 (FCP) < 1.8s
- [ ] 累积布局偏移 (CLS) < 0.1
- [ ] 动画帧率稳定在 60fps
- [ ] 图片懒加载配置
- [ ] JS/CSS 按需加载

---

## 8. 附录

### 8.1 技能清单

| ID | 名称 | 图标 | 主题色 | 演示类型 |
|----|------|------|--------|----------|
| humanizer | Humanizer | 📝 | #ff6b6b | 文本转换 |
| daily-ai-news | Daily AI News | 📰 | #a855f7 | 新闻列表 |
| canvas-design | Canvas Design | 🎨 | #f59e0b | 画布演示 |
| frontend-design | Frontend Design | 💻 | #6366f1 | 代码预览 |
| docx-master | DOCX Master | 📄 | #22c55e | 文档预览 |
| search-assistant | Search Assistant | 🔍 | #0ea5e9 | 搜索演示 |
| auto-workflow | Auto Workflow | ⚡ | #ec4899 | 流程图 |
| rag-qa | RAG QA | 🧠 | #8b5cf6 | 问答演示 |

### 8.2 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 8.3 参考资源

- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

---

*文档版本: 1.0*  
*最后更新: 2026-03-20*  
*作者: Archie (AI 架构师助手)*