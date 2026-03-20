/**
 * Word DOCX 演示逻辑
 * 实现文件上传、文档预览、内容复制等功能
 */

// 模拟文档数据
const docData = {
  title: '项目周报.docx',
  paragraphs: [
    { type: 'heading1', text: '一、本周工作总结' },
    { type: 'paragraph', text: '本周主要完成了以下工作：前端页面开发完成80%，后端API接口联调完成60%，数据库设计文档已更新。整体进度符合预期，预计下周可以完成第一阶段交付。' },
    { type: 'heading2', text: '1.1 开发进度' },
    { type: 'paragraph', text: '前端页面开发进度良好，已完成首页、用户中心、数据统计等主要模块的开发工作。目前正在处理细节优化和响应式适配。' },
    { type: 'heading2', text: '1.2 问题与风险' },
    { type: 'paragraph', text: '本周遇到的主要问题是第三方接口调用频率限制，已与对方技术团队沟通，预计下周解决。' }
  ],
  tables: [
    {
      headers: ['任务', '状态', '进度'],
      rows: [
        ['前端页面开发', '进行中', '80%'],
        ['后端API联调', '进行中', '60%'],
        ['数据库设计', '已完成', '100%'],
        ['接口文档编写', '待开始', '0%']
      ]
    }
  ]
};

// DOM 元素
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadProgress = document.getElementById('uploadProgress');
const progressFill = document.getElementById('progressFill');
const docPreview = document.getElementById('docPreview');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const editBtn = document.getElementById('editBtn');
const ireneMood = document.getElementById('ireneMood');

/**
 * 初始化
 */
function init() {
  setupUploadEvents();
  setupActionButtons();
  setupIreneMood();
}

/**
 * 设置上传事件
 */
function setupUploadEvents() {
  // 点击上传
  uploadZone.addEventListener('click', () => {
    fileInput.click();
  });

  // 文件选择
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  });

  // 拖放事件
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.docx')) {
        handleFileUpload(file);
      } else {
        showNotification('请上传 .docx 格式的文件', 'error');
      }
    }
  });
}

/**
 * 处理文件上传
 */
function handleFileUpload(file) {
  // 显示进度条
  uploadProgress.classList.add('active');
  
  // 模拟上传进度
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      setTimeout(() => {
        // 隐藏上传区域，显示预览
        uploadZone.style.display = 'none';
        uploadProgress.classList.remove('active');
        docPreview.classList.add('visible');
        
        // 更新文档标题
        document.getElementById('docTitle').textContent = file.name;
        
        showNotification('文档解析成功！', 'success');
      }, 500);
    }
    progressFill.style.width = progress + '%';
  }, 200);
}

/**
 * 设置操作按钮
 */
function setupActionButtons() {
  // 复制按钮
  copyBtn.addEventListener('click', async () => {
    const docContent = document.getElementById('docContent');
    const text = extractTextFromDoc(docContent);
    
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = '<span>✓</span><span>已复制</span>';
      
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = '<span>📋</span><span>复制</span>';
      }, 2000);
      
      showNotification('内容已复制到剪贴板', 'success');
    } catch (err) {
      showNotification('复制失败，请手动复制', 'error');
    }
  });

  // 下载按钮
  downloadBtn.addEventListener('click', () => {
    showNotification('下载功能演示：实际应用中将下载原始文件', 'info');
  });

  // 编辑按钮
  editBtn.addEventListener('click', () => {
    showNotification('编辑功能演示：实际应用中将打开编辑器', 'info');
  });
}

/**
 * 从文档中提取文本
 */
function extractTextFromDoc(container) {
  const headings = container.querySelectorAll('.doc-heading1, .doc-heading2');
  const paragraphs = container.querySelectorAll('.doc-paragraph');
  
  let text = '';
  
  headings.forEach(h => {
    text += h.textContent + '\n\n';
  });
  
  paragraphs.forEach(p => {
    text += p.textContent + '\n\n';
  });
  
  return text.trim();
}

/**
 * 设置 Irene 表情交互
 */
function setupIreneMood() {
  const ireneAvatar = ireneMood.querySelector('.irene-avatar');
  const ireneBubble = ireneMood.querySelector('.irene-bubble span');
  
  const messages = [
    'Word文档处理，格式完美保留~',
    '支持红头文件格式哦！',
    '表格也能完整提取 📊',
    '试试拖拽上传文件吧~'
  ];
  
  let messageIndex = 0;
  
  ireneAvatar.addEventListener('click', () => {
    messageIndex = (messageIndex + 1) % messages.length;
    ireneBubble.textContent = messages[messageIndex];
    ireneMood.classList.add('show-bubble');
    
    setTimeout(() => {
      ireneMood.classList.remove('show-bubble');
    }, 3000);
  });
  
  // 自动显示提示
  setTimeout(() => {
    ireneMood.classList.add('show-bubble');
    setTimeout(() => {
      ireneMood.classList.remove('show-bubble');
    }, 4000);
  }, 1000);
}

/**
 * 显示通知
 */
function showNotification(message, type = 'info') {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : type === 'error' ? 'rgba(255, 107, 107, 0.9)' : 'rgba(0, 245, 255, 0.9)'};
    color: #000;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10000;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // 显示动画
  requestAnimationFrame(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(-50%) translateY(0)';
  });
  
  // 自动隐藏
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-50%) translateY(-20px)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
