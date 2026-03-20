/**
 * Tavily Search 演示逻辑
 * 模拟搜索功能，展示搜索结果卡片
 */

// 模拟搜索数据
const searchResults = [
  {
    title: 'OpenClaw 官方文档',
    source: 'docs.openclaw.ai',
    snippet: 'OpenClaw 是一个开源的 AI 助手框架，支持多种技能扩展。它提供了丰富的 API 和工具，让开发者可以轻松构建智能助手应用。文档包含完整的安装指南、API 参考和示例代码。',
    score: 0.95,
    url: 'https://docs.openclaw.ai'
  },
  {
    title: 'GitHub - openclaw/openclaw',
    source: 'github.com',
    snippet: 'OpenClaw - Your AI assistant framework. 开源 AI 助手框架，支持插件系统、多平台接入、技能扩展。Star 数快速增长中，社区活跃，欢迎贡献代码。',
    score: 0.92,
    url: 'https://github.com/openclaw/openclaw'
  },
  {
    title: 'Tavily Search API 文档',
    source: 'docs.tavily.com',
    snippet: 'Tavily 是专为 AI 应用设计的搜索 API。提供高质量的搜索结果、自动摘要、相关性评分。支持多种搜索参数定制，包括搜索深度、时间范围、域名过滤等。',
    score: 0.89,
    url: 'https://docs.tavily.com'
  },
  {
    title: 'AI 搜索技术对比：Tavily vs 传统搜索',
    source: 'blog.example.com',
    snippet: '本文深入对比 Tavily AI 搜索与传统搜索引擎的差异。Tavily 通过大语言模型理解查询意图，返回结构化结果，包含摘要和相关性评分，显著提升 AI 应用的信息获取效率。',
    score: 0.85,
    url: 'https://blog.example.com/ai-search-comparison'
  },
  {
    title: 'OpenClaw 社区论坛',
    source: 'forum.openclaw.ai',
    snippet: 'OpenClaw 用户交流社区。分享使用技巧、插件开发经验、问题解答。热门话题包括：技能开发指南、最佳实践、性能优化、新功能讨论等。',
    score: 0.82,
    url: 'https://forum.openclaw.ai'
  },
  {
    title: '构建 AI 助手的最佳实践',
    source: 'dev.to',
    snippet: '如何使用 OpenClaw 和 Tavily 构建智能助手。从架构设计到部署上线的完整指南。包含代码示例、配置说明、常见问题解决方案。适合初学者和进阶开发者。',
    score: 0.78,
    url: 'https://dev.to/ai-assistant-guide'
  }
];

// DOM 元素
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const searchResults = document.getElementById('searchResults');
const resultsContainer = document.getElementById('resultsContainer');
const resultCount = document.getElementById('resultCount');
const copyAllBtn = document.getElementById('copyAllBtn');

// Irene 表情
const ireneMood = document.getElementById('ireneMood');
const ireneBubble = ireneMood.querySelector('.irene-bubble span');

// 状态
let isSearching = false;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  showIreneTip('输入关键词，开始智能搜索吧~ 🔍');
});

// 事件监听
function initEventListeners() {
  // 搜索按钮点击
  searchBtn.addEventListener('click', performSearch);
  
  // 回车搜索
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // 输入框聚焦效果
  searchInput.addEventListener('focus', () => {
    showIreneTip('我在听，输入你想搜索的内容~');
  });
  
  // 复制全部
  copyAllBtn.addEventListener('click', copyAllResults);
}

// 执行搜索
async function performSearch() {
  const query = searchInput.value.trim();
  
  if (!query) {
    searchInput.focus();
    showIreneTip('先输入搜索关键词哦~ 📝');
    return;
  }
  
  if (isSearching) return;
  
  isSearching = true;
  searchBtn.disabled = true;
  searchBtn.classList.add('loading');
  searchBtn.innerHTML = '<span>⏳</span><span>搜索中...</span>';
  
  // 隐藏之前的结果
  searchResults.classList.remove('active');
  loadingSpinner.classList.add('active');
  
  showIreneTip('正在搜索中，稍等片刻... 🔍');
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // 显示结果
  loadingSpinner.classList.remove('active');
  displayResults(query);
  
  // 恢复按钮
  isSearching = false;
  searchBtn.disabled = false;
  searchBtn.classList.remove('loading');
  searchBtn.innerHTML = '<span>🔍</span><span>搜索</span>';
  
  showIreneTip(`找到 ${searchResults.length} 个结果，点击查看详情~ 🎉`);
}

// 显示搜索结果
function displayResults(query) {
  resultsContainer.innerHTML = '';
  resultCount.textContent = searchResults.length;
  
  // 模拟根据查询调整结果（实际项目中这里会调用真实 API）
  const results = searchResults.map(result => ({
    ...result,
    // 高亮匹配的关键词
    snippet: highlightKeywords(result.snippet, query)
  }));
  
  results.forEach((result, index) => {
    const card = createResultCard(result, index);
    resultsContainer.appendChild(card);
  });
  
  searchResults.classList.add('active');
}

// 创建结果卡片
function createResultCard(result, index) {
  const card = document.createElement('div');
  card.className = 'result-card';
  card.style.animationDelay = `${(index + 1) * 0.1}s`;
  
  card.innerHTML = `
    <div class="result-header">
      <a href="${result.url}" target="_blank" class="result-title">${escapeHtml(result.title)}</a>
      <div class="result-score">
        <span>相关性</span>
        <span class="score-value">${(result.score * 100).toFixed(0)}%</span>
      </div>
    </div>
    <div class="result-source">
      <div class="source-icon">🌐</div>
      <span>${escapeHtml(result.source)}</span>
    </div>
    <div class="result-snippet">${result.snippet}</div>
    <div class="result-actions">
      <button class="result-btn copy-btn" data-index="${index}">
        <span>📋</span>
        <span>复制</span>
      </button>
      <button class="result-btn open-btn" data-url="${result.url}">
        <span>🔗</span>
        <span>访问</span>
      </button>
    </div>
  `;
  
  // 复制按钮事件
  const copyBtn = card.querySelector('.copy-btn');
  copyBtn.addEventListener('click', () => {
    copyResult(result, copyBtn);
  });
  
  // 访问按钮事件
  const openBtn = card.querySelector('.open-btn');
  openBtn.addEventListener('click', () => {
    window.open(result.url, '_blank');
  });
  
  return card;
}

// 高亮关键词
function highlightKeywords(text, query) {
  if (!query) return escapeHtml(text);
  
  const keywords = query.split(/\s+/).filter(k => k.length > 1);
  let highlighted = escapeHtml(text);
  
  keywords.forEach(keyword => {
    const regex = new RegExp(`(${escapeRegex(keyword)})`, 'gi');
    highlighted = highlighted.replace(regex, '<mark style="background: rgba(0, 245, 255, 0.3); color: var(--accent-cyan); padding: 2px 4px; border-radius: 4px;">$1</mark>');
  });
  
  return highlighted;
}

// 复制单个结果
async function copyResult(result, btn) {
  const text = `${result.title}\n${result.url}\n\n${result.snippet.replace(/<[^>]*>/g, '')}`;
  
  try {
    await navigator.clipboard.writeText(text);
    
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>✓</span><span>已复制</span>';
    btn.classList.add('copied');
    
    showIreneTip('已复制到剪贴板！📋');
    
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    showIreneTip('复制失败，请手动复制 😅');
  }
}

// 复制全部结果
async function copyAllResults() {
  const text = searchResults.map((result, i) => 
    `${i + 1}. ${result.title}\n   ${result.url}\n   ${result.snippet}\n`
  ).join('\n');
  
  try {
    await navigator.clipboard.writeText(text);
    
    const originalHTML = copyAllBtn.innerHTML;
    copyAllBtn.innerHTML = '<span>✓</span><span>已复制</span>';
    copyAllBtn.classList.add('copied');
    
    showIreneTip('全部结果已复制！📋');
    
    setTimeout(() => {
      copyAllBtn.innerHTML = originalHTML;
      copyAllBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    showIreneTip('复制失败，请手动复制 😅');
  }
}

// 显示 Irene 提示
function showIreneTip(message) {
  if (ireneBubble) {
    ireneBubble.textContent = message;
    ireneMood.classList.add('show-bubble');
    
    setTimeout(() => {
      ireneMood.classList.remove('show-bubble');
    }, 3000);
  }
}

// 工具函数：转义 HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 工具函数：转义正则特殊字符
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 页面加载完成后的额外初始化
window.addEventListener('load', () => {
  // 添加页面进入动画
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
