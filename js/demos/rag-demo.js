/**
 * RAG Demo - 知识库问答演示逻辑
 * 实现模拟问答、思考动画、打字机效果、引用来源展示等功能
 */

(function() {
  'use strict';

  // 模拟问答数据
  const qaDemo = {
    question: 'OpenClaw 支持哪些消息平台？',
    answer: 'OpenClaw 支持多种消息平台，包括：Discord、Telegram、Slack、飞书、企业微信等主流即时通讯工具。每个平台都有专门的适配器，确保消息收发的稳定性和一致性。此外，还支持通过 Webhook 接入自定义平台，满足企业私有化部署的需求。',
    sources: [
      { 
        doc: '快速入门指南.pdf', 
        page: 5, 
        snippet: 'OpenClaw 目前支持以下平台...',
        icon: '📕'
      },
      { 
        doc: '架构设计文档.md', 
        page: 12, 
        snippet: '消息适配器层负责对接各平台...',
        icon: '📗'
      }
    ],
    confidence: 0.94,
    snippets: [
      {
        source: '快速入门指南.pdf',
        text: 'OpenClaw 目前支持以下平台：Discord、Telegram、Slack、飞书、企业微信、钉钉、WhatsApp 等主流即时通讯工具。',
        score: 0.96
      },
      {
        source: '架构设计文档.md',
        text: '消息适配器层负责对接各平台，提供统一的抽象接口，屏蔽底层差异，让上层业务逻辑无需关心具体平台实现。',
        score: 0.89
      },
      {
        source: 'Webhook 集成指南.md',
        text: '通过 Webhook 机制，可以将 OpenClaw 接入任何支持 HTTP 回调的系统，实现与私有平台的快速集成。',
        score: 0.85
      },
      {
        source: '企业部署手册.pdf',
        text: '对于有特殊安全要求的企业，OpenClaw 支持私有化部署，所有数据保留在企业内部，满足合规要求。',
        score: 0.78
      }
    ]
  };

  // 其他模拟问答
  const mockQA = {
    'OpenClaw 是什么？': {
      answer: 'OpenClaw 是一个开源的 AI Agent 框架，旨在简化 AI 应用的开发和部署。它提供了统一的接口来管理不同的 AI 模型、消息平台和工具，让开发者可以专注于业务逻辑而不是底层集成。',
      sources: [
        { doc: 'OpenClaw 简介.pdf', page: 1, snippet: 'OpenClaw 是一个开源的 AI Agent 框架...', icon: '📕' },
        { doc: 'README.md', page: 1, snippet: 'OpenClaw - 让 AI 应用开发更简单...', icon: '📗' }
      ],
      confidence: 0.98,
      snippets: [
        { source: 'OpenClaw 简介.pdf', text: 'OpenClaw 是一个开源的 AI Agent 框架，旨在简化 AI 应用的开发和部署。', score: 0.98 },
        { source: 'README.md', text: 'OpenClaw 提供了统一的接口来管理不同的 AI 模型、消息平台和工具。', score: 0.95 },
        { source: '开发者指南.md', text: '使用 OpenClaw，开发者可以专注于业务逻辑而不是底层集成。', score: 0.92 }
      ]
    },
    '如何安装 OpenClaw？': {
      answer: '安装 OpenClaw 非常简单，只需要几个步骤：1. 确保已安装 Node.js 18+；2. 运行 npm install -g openclaw；3. 执行 openclaw init 初始化项目；4. 配置环境变量和 API 密钥；5. 运行 openclaw start 启动服务。详细安装指南请参考官方文档。',
      sources: [
        { doc: '安装指南.md', page: 2, snippet: '运行 npm install -g openclaw 全局安装...', icon: '📕' },
        { doc: '快速开始.md', page: 1, snippet: '执行 openclaw init 初始化你的第一个项目...', icon: '📗' }
      ],
      confidence: 0.96,
      snippets: [
        { source: '安装指南.md', text: '确保已安装 Node.js 18+，然后运行 npm install -g openclaw 进行全局安装。', score: 0.97 },
        { source: '快速开始.md', text: '执行 openclaw init 初始化你的第一个项目，然后按照提示完成配置。', score: 0.94 },
        { source: '配置手册.pdf', text: '配置环境变量和 API 密钥后，运行 openclaw start 即可启动服务。', score: 0.91 }
      ]
    },
    '支持哪些 AI 模型？': {
      answer: 'OpenClaw 支持市面上主流的 AI 模型，包括：OpenAI 的 GPT-4/GPT-3.5、Anthropic 的 Claude、Google 的 Gemini、以及众多开源模型如 Llama、Mistral 等。通过统一的模型接口，你可以轻松切换不同的模型而无需修改业务代码。',
      sources: [
        { doc: '模型配置指南.md', page: 4, snippet: 'OpenClaw 支持 OpenAI、Anthropic、Google 等主流模型...', icon: '📕' },
        { doc: '模型对比表.pdf', page: 2, snippet: '支持的开源模型包括 Llama、Mistral、CodeLlama...', icon: '📗' }
      ],
      confidence: 0.92,
      snippets: [
        { source: '模型配置指南.md', text: 'OpenClaw 支持 OpenAI 的 GPT-4/GPT-3.5、Anthropic 的 Claude、Google 的 Gemini 等主流模型。', score: 0.95 },
        { source: '模型对比表.pdf', text: '开源模型支持包括 Llama、Mistral、CodeLlama、Vicuna 等。', score: 0.90 },
        { source: '开发者指南.md', text: '通过统一的模型接口，可以轻松切换不同模型而无需修改业务代码。', score: 0.88 }
      ]
    },
    '如何创建自定义技能？': {
      answer: '创建自定义技能只需三步：1. 在 skills 目录下创建新的技能文件夹；2. 编写 SKILL.md 描述技能功能和使用方法；3. 实现技能的核心逻辑代码。OpenClaw 会自动加载并注册新技能，你可以在对话中直接调用。',
      sources: [
        { doc: '技能开发指南.md', page: 5, snippet: '在 skills 目录下创建新的技能文件夹...', icon: '📕' },
        { doc: 'SKILL.md 规范.md', page: 1, snippet: 'SKILL.md 是技能的描述文件，包含功能说明、参数定义...', icon: '📗' }
      ],
      confidence: 0.95,
      snippets: [
        { source: '技能开发指南.md', text: '在 skills 目录下创建新的技能文件夹，编写 SKILL.md 和核心逻辑代码。', score: 0.96 },
        { source: 'SKILL.md 规范.md', text: 'SKILL.md 是技能的描述文件，包含功能说明、参数定义和使用示例。', score: 0.93 },
        { source: 'API 文档.md', text: 'OpenClaw 会自动加载并注册新技能，无需手动配置。', score: 0.89 }
      ]
    }
  };

  // 思考步骤
  const thinkingSteps = [
    { icon: '🔍', text: '分析问题语义...', duration: 800 },
    { icon: '📚', text: '检索相关知识库...', duration: 1000 },
    { icon: '🎯', text: '匹配最相关文档...', duration: 900 },
    { icon: '✨', text: '生成答案...', duration: 1200 }
  ];

  // DOM 元素引用
  let kbSelect, qaInput, qaSubmitBtn, smartSuggestions;
  let thinkingArea, thinkingStepsEl, answerArea, answerText;
  let confidenceFill, confidenceValue, sourcesHeader, sourcesList, sourcesToggle;
  let snippetsArea, snippetsGrid;

  // 当前打字机实例
  let currentTypeWriter = null;
  let isProcessing = false;

  /**
   * 初始化
   */
  function init() {
    // 获取 DOM 元素
    kbSelect = document.getElementById('kbSelect');
    qaInput = document.getElementById('qaInput');
    qaSubmitBtn = document.getElementById('qaSubmitBtn');
    smartSuggestions = document.getElementById('smartSuggestions');
    thinkingArea = document.getElementById('thinkingArea');
    thinkingStepsEl = document.getElementById('thinkingSteps');
    answerArea = document.getElementById('answerArea');
    answerText = document.getElementById('answerText');
    confidenceFill = document.getElementById('confidenceFill');
    confidenceValue = document.getElementById('confidenceValue');
    sourcesHeader = document.getElementById('sourcesHeader');
    sourcesList = document.getElementById('sourcesList');
    sourcesToggle = document.getElementById('sourcesToggle');
    snippetsArea = document.getElementById('snippetsArea');
    snippetsGrid = document.getElementById('snippetsGrid');

    if (!qaInput || !qaSubmitBtn) {
      console.error('RAG demo: Required elements not found');
      return;
    }

    // 绑定事件
    bindEvents();
  }

  /**
   * 绑定事件
   */
  function bindEvents() {
    // 提交按钮
    qaSubmitBtn.addEventListener('click', handleSubmit);

    // 输入框回车提交
    qaInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !isProcessing) {
        handleSubmit();
      }
    });

    // 输入框焦点效果
    qaInput.addEventListener('focus', () => {
      updateIreneMood('thinking', '想查什么资料？输入问题就行~');
    });

    // 智能提示点击
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const question = chip.dataset.question;
        if (question) {
          qaInput.value = question;
          qaInput.focus();
          // 视觉反馈
          chip.style.transform = 'scale(0.95)';
          setTimeout(() => chip.style.transform = '', 150);
        }
      });
    });

    // 来源展开/收起
    if (sourcesHeader) {
      sourcesHeader.addEventListener('click', toggleSources);
    }
  }

  /**
   * 处理提交
   */
  async function handleSubmit() {
    const question = qaInput.value.trim();
    
    if (!question) {
      showNotification('请先输入一个问题', 'warning');
      qaInput.focus();
      return;
    }

    if (isProcessing) return;
    isProcessing = true;

    // 停止之前的打字机
    if (currentTypeWriter) {
      currentTypeWriter.stop();
    }

    // 重置状态
    resetUI();

    // 更新UI状态
    setLoading(true);
    updateIreneMood('working', '正在知识库中搜索...');

    // 显示思考动画
    showThinkingAnimation();

    // 模拟处理延迟
    await simulateThinking();

    // 获取答案数据
    const data = getAnswerData(question);

    // 隐藏思考动画
    hideThinkingAnimation();

    // 显示答案
    showAnswer(data);

    // 显示相关片段
    showSnippets(data.snippets);

    // 完成
    setLoading(false);
    isProcessing = false;
  }

  /**
   * 获取答案数据
   */
  function getAnswerData(question) {
    // 检查是否有精确匹配
    if (mockQA[question]) {
      return mockQA[question];
    }
    
    // 返回默认数据
    return qaDemo;
  }

  /**
   * 重置UI
   */
  function resetUI() {
    answerArea.classList.remove('active');
    snippetsArea.classList.remove('active');
    sourcesList.classList.remove('expanded');
    sourcesToggle.classList.remove('expanded');
    confidenceFill.style.width = '0%';
    confidenceValue.textContent = '0%';
  }

  /**
   * 设置加载状态
   */
  function setLoading(loading) {
    if (loading) {
      qaSubmitBtn.disabled = true;
      qaSubmitBtn.innerHTML = '<span>⚡</span><span>搜索中...</span>';
    } else {
      qaSubmitBtn.disabled = false;
      qaSubmitBtn.innerHTML = '<span>🔍</span><span>搜索</span>';
    }
  }

  /**
   * 显示思考动画
   */
  function showThinkingAnimation() {
    thinkingArea.classList.add('active');
    
    // 重置所有步骤
    const steps = thinkingStepsEl.querySelectorAll('.thinking-step');
    steps.forEach(step => {
      step.classList.remove('active', 'completed');
    });
  }

  /**
   * 隐藏思考动画
   */
  function hideThinkingAnimation() {
    thinkingArea.classList.remove('active');
  }

  /**
   * 模拟思考过程
   */
  async function simulateThinking() {
    const steps = thinkingStepsEl.querySelectorAll('.thinking-step');
    
    for (let i = 0; i < steps.length; i++) {
      // 标记当前步骤为活跃
      steps[i].classList.add('active');
      
      // 等待一段时间
      await new Promise(resolve => setTimeout(resolve, thinkingSteps[i].duration));
      
      // 标记为完成
      steps[i].classList.remove('active');
      steps[i].classList.add('completed');
    }
  }

  /**
   * 显示答案
   */
  function showAnswer(data) {
    answerArea.classList.add('active');
    
    // 清空之前的内容
    answerText.innerHTML = '';
    sourcesList.innerHTML = '';
    
    // 创建打字机效果
    currentTypeWriter = new TypeWriter(answerText, data.answer, {
      speed: 20,
      onComplete: () => {
        updateIreneMood('happy', '找到答案了！还可以查看引用来源~');
      }
    });
    
    currentTypeWriter.start();
    
    // 动画显示置信度
    setTimeout(() => {
      const confidencePercent = Math.round(data.confidence * 100);
      confidenceFill.style.width = confidencePercent + '%';
      confidenceValue.textContent = confidencePercent + '%';
    }, 100);
    
    // 渲染引用来源
    renderSources(data.sources);
  }

  /**
   * 渲染引用来源
   */
  function renderSources(sources) {
    sourcesList.innerHTML = sources.map(source => `
      <div class="source-item">
        <span class="source-icon">${source.icon || '📄'}</span>
        <div class="source-content">
          <div class="source-doc">${source.doc} · 第 ${source.page} 页</div>
          <div class="source-snippet">${source.snippet}</div>
        </div>
        <span class="source-meta">P${source.page}</span>
      </div>
    `).join('');
  }

  /**
   * 切换来源展开/收起
   */
  function toggleSources() {
    sourcesList.classList.toggle('expanded');
    sourcesToggle.classList.toggle('expanded');
  }

  /**
   * 显示相关文档片段
   */
  function showSnippets(snippets) {
    snippetsArea.classList.add('active');
    
    snippetsGrid.innerHTML = snippets.map(snippet => `
      <div class="snippet-card">
        <div class="snippet-source">📄 ${snippet.source}</div>
        <div class="snippet-text">${snippet.text}</div>
        <div class="snippet-score">
          相关度
          <span class="snippet-score-bar">
            <span class="snippet-score-fill" style="width: ${Math.round(snippet.score * 100)}%"></span>
          </span>
          ${Math.round(snippet.score * 100)}%
        </div>
      </div>
    `).join('');
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
      this.element.innerHTML = '<span class="answer-text typing"></span><span class="typing-cursor"></span>';
      this.type();
      return this;
    }

    type() {
      if (!this.isRunning) return;

      const textSpan = this.element.querySelector('.answer-text');
      const cursor = this.element.querySelector('.typing-cursor');

      if (this.currentIndex < this.text.length) {
        textSpan.textContent += this.text.charAt(this.currentIndex);
        this.currentIndex++;
        
        // 随机速度，模拟真实打字
        const randomSpeed = this.speed + (Math.random() * 15 - 7);
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
      this.element.innerHTML = `<span class="answer-text typing">${this.text}</span>`;
      this.onComplete();
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
      idle: '💡',
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
  window.RAGDemo = {
    qaDemo,
    mockQA
  };

})();