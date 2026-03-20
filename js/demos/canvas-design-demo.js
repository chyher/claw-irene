/**
 * Canvas Design Skill Demo
 * 商业海报、信息图设计演示
 */

// Template configurations
const templates = [
  {
    id: 'product-promo',
    name: '产品推广海报',
    desc: '适合电商产品展示，突出卖点和促销信息',
    tags: ['社交媒体', '电商'],
    type: 'social',
    width: 600,
    height: 400,
    elements: [
      { type: 'rect', x: 0, y: 0, width: 600, height: 400, fill: 'linear-gradient(135deg, #ff6b6b, #ff00aa)' },
      { type: 'text', x: 300, y: 100, text: '新品上市', fontSize: 48, color: '#ffffff', fontWeight: 'bold', textAlign: 'center' },
      { type: 'text', x: 300, y: 180, text: '限时特惠 50% OFF', fontSize: 28, color: '#ffffff', textAlign: 'center' },
      { type: 'rect', x: 200, y: 220, width: 200, height: 50, fill: '#ffffff', borderRadius: 25 },
      { type: 'text', x: 300, y: 255, text: '立即购买', fontSize: 20, color: '#ff6b6b', fontWeight: 'bold', textAlign: 'center' },
      { type: 'text', x: 300, y: 350, text: '活动时间：即日起至月底', fontSize: 14, color: '#ffffff', textAlign: 'center' }
    ]
  },
  {
    id: 'data-infographic',
    name: '数据信息图',
    desc: '展示数据统计和趋势分析的专业图表',
    tags: ['信息图', '数据'],
    type: 'infographic',
    width: 600,
    height: 400,
    elements: [
      { type: 'rect', x: 0, y: 0, width: 600, height: 400, fill: '#0a0a0f' },
      { type: 'text', x: 300, y: 50, text: '2024年度数据报告', fontSize: 32, color: '#00f5ff', fontWeight: 'bold', textAlign: 'center' },
      { type: 'rect', x: 50, y: 100, width: 150, height: 200, fill: 'rgba(0, 245, 255, 0.1)', borderColor: '#00f5ff', borderWidth: 2 },
      { type: 'text', x: 125, y: 180, text: '85%', fontSize: 48, color: '#00f5ff', fontWeight: 'bold', textAlign: 'center' },
      { type: 'text', x: 125, y: 220, text: '用户增长', fontSize: 14, color: '#ffffff', textAlign: 'center' },
      { type: 'rect', x: 225, y: 100, width: 150, height: 200, fill: 'rgba(168, 85, 247, 0.1)', borderColor: '#a855f7', borderWidth: 2 },
      { type: 'text', x: 300, y: 180, text: '2.5M', fontSize: 48, color: '#a855f7', fontWeight: 'bold', textAlign: 'center' },
      { type: 'text', x: 300, y: 220, text: '活跃用户', fontSize: 14, color: '#ffffff', textAlign: 'center' },
      { type: 'rect', x: 400, y: 100, width: 150, height: 200, fill: 'rgba(34, 197, 94, 0.1)', borderColor: '#22c55e', borderWidth: 2 },
      { type: 'text', x: 475, y: 180, text: '99%', fontSize: 48, color: '#22c55e', fontWeight: 'bold', textAlign: 'center' },
      { type: 'text', x: 475, y: 220, text: '满意度', fontSize: 14, color: '#ffffff', textAlign: 'center' },
      { type: 'text', x: 300, y: 360, text: '数据来源：内部统计 | 统计时间：2024年12月', fontSize: 12, color: '#9898a8', textAlign: 'center' }
    ]
  },
  {
    id: 'event-invitation',
    name: '活动邀请海报',
    desc: '会议、派对、展览等活动邀请设计',
    tags: ['活动', '邀请'],
    type: 'event',
    width: 600,
    height: 400,
    elements: [
      { type: 'rect', x: 0, y: 0, width: 600, height: 400, fill: '#ffffff' },
      { type: 'circle', x: 300, y: 200, radius: 180, fill: 'rgba(0, 245, 255, 0.1)' },
      { type: 'text', x: 300, y: 120, text: 'TECH', fontSize: 64, color: '#0a0a0f', fontWeight: 'bold', textAlign: 'center' },
      { type: 'text', x: 300, y: 180, text: 'CONFERENCE', fontSize: 32, color: '#00f5ff', fontWeight: 'bold', textAlign: 'center' },
      { type: 'text', x: 300, y: 240, text: '2025', fontSize: 48, color: '#a855f7', fontWeight: 'bold', textAlign: 'center' },
      { type: 'rect', x: 200, y: 280, width: 200, height: 40, fill: '#0a0a0f', borderRadius: 20 },
      { type: 'text', x: 300, y: 307, text: '立即报名', fontSize: 16, color: '#ffffff', fontWeight: 'bold', textAlign: 'center' },
      { type: 'text', x: 300, y: 360, text: '2025年3月15日 · 上海国际会议中心', fontSize: 14, color: '#6b6b7b', textAlign: 'center' }
    ]
  },
  {
    id: 'business-card',
    name: '简约名片',
    desc: '专业商务名片设计，简洁大方',
    tags: ['名片', '商务'],
    type: 'card',
    width: 600,
    height: 400,
    elements: [
      { type: 'rect', x: 0, y: 0, width: 600, height: 400, fill: '#ffffff' },
      { type: 'rect', x: 0, y: 0, width: 200, height: 400, fill: '#0a0a0f' },
      { type: 'text', x: 100, y: 150, text: 'IRENE', fontSize: 28, color: '#00f5ff', fontWeight: 'bold', textAlign: 'center' },
      { type: 'text', x: 100, y: 190, text: 'AI ASSISTANT', fontSize: 12, color: '#9898a8', textAlign: 'center', letterSpacing: 2 },
      { type: 'text', x: 250, y: 120, text: '艾琳', fontSize: 32, color: '#0a0a0f', fontWeight: 'bold' },
      { type: 'text', x: 250, y: 160, text: '高级AI助手', fontSize: 16, color: '#6b6b7b' },
      { type: 'line', x1: 250, y1: 200, x2: 550, y2: 200, stroke: '#e8e8f0', lineWidth: 1 },
      { type: 'text', x: 250, y: 240, text: '📧 irene@ai-assistant.com', fontSize: 14, color: '#0a0a0f' },
      { type: 'text', x: 250, y: 270, text: '📱 +86 138 0000 0000', fontSize: 14, color: '#0a0a0f' },
      { type: 'text', x: 250, y: 300, text: '🌐 www.irene-ai.com', fontSize: 14, color: '#0a0a0f' },
      { type: 'text', x: 250, y: 350, text: '让AI成为你的得力助手', fontSize: 12, color: '#00f5ff', fontStyle: 'italic' }
    ]
  }
];

// Canvas state
let canvas, ctx;
let currentTemplate = null;
let selectedElement = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let currentColor = '#000000';
let currentBgColor = '#ffffff';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initTemplateGrid();
  initCanvas();
  initEventListeners();
});

// Initialize template grid
function initTemplateGrid() {
  const grid = document.getElementById('templateGrid');
  
  templates.forEach(template => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
      <div class="template-card__preview">
        <canvas id="preview-${template.id}" width="260" height="180"></canvas>
        <div class="template-card__overlay">
          <span class="template-card__overlay-text">使用此模板</span>
        </div>
      </div>
      <div class="template-card__info">
        <div class="template-card__name">${template.name}</div>
        <div class="template-card__desc">${template.desc}</div>
        <div class="template-card__tags">
          ${template.tags.map(tag => `<span class="template-card__tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => loadTemplate(template));
    grid.appendChild(card);
    
    // Render preview
    setTimeout(() => renderPreview(template), 0);
  });
}

// Render template preview
function renderPreview(template) {
  const previewCanvas = document.getElementById(`preview-${template.id}`);
  if (!previewCanvas) return;
  
  const pctx = previewCanvas.getContext('2d');
  const scaleX = previewCanvas.width / template.width;
  const scaleY = previewCanvas.height / template.height;
  
  pctx.save();
  pctx.scale(scaleX, scaleY);
  renderTemplate(pctx, template);
  pctx.restore();
}

// Load template into designer
function loadTemplate(template) {
  currentTemplate = JSON.parse(JSON.stringify(template)); // Deep copy
  
  document.getElementById('templateSection').style.display = 'none';
  document.getElementById('designerSection').classList.add('active');
  
  // Resize canvas
  canvas.width = template.width;
  canvas.height = template.height;
  
  // Update size label
  document.querySelector('.canvas-size-label').textContent = 
    `${template.width} x ${template.height} px`;
  
  renderCanvas();
  
  // Update Irene mood
  document.getElementById('ireneAvatar').textContent = '✨';
  setTimeout(() => {
    document.getElementById('ireneAvatar').textContent = '😸';
  }, 2000);
}

// Back to templates
function backToTemplates() {
  document.getElementById('templateSection').style.display = 'block';
  document.getElementById('designerSection').classList.remove('active');
  currentTemplate = null;
  selectedElement = null;
}

// Initialize canvas
function initCanvas() {
  canvas = document.getElementById('designCanvas');
  ctx = canvas.getContext('2d');
  
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseleave', handleMouseUp);
}

// Render template to context
function renderTemplate(context, template) {
  template.elements.forEach(el => {
    renderElement(context, el);
  });
}

// Render single element
function renderElement(context, el) {
  context.save();
  
  switch (el.type) {
    case 'rect':
      if (el.fill && el.fill.startsWith('linear-gradient')) {
        const gradient = parseGradient(context, el.fill, el.x, el.y, el.x + el.width, el.y + el.height);
        context.fillStyle = gradient;
      } else {
        context.fillStyle = el.fill || '#000000';
      }
      
      if (el.borderRadius) {
        roundRect(context, el.x, el.y, el.width, el.height, el.borderRadius);
        context.fill();
      } else {
        context.fillRect(el.x, el.y, el.width, el.height);
      }
      
      if (el.borderColor) {
        context.strokeStyle = el.borderColor;
        context.lineWidth = el.borderWidth || 1;
        context.strokeRect(el.x, el.y, el.width, el.height);
      }
      break;
      
    case 'circle':
      context.beginPath();
      context.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
      context.fillStyle = el.fill || '#000000';
      context.fill();
      break;
      
    case 'text':
      context.font = `${el.fontStyle || ''} ${el.fontWeight || ''} ${el.fontSize || 24}px "Noto Sans SC", sans-serif`.trim();
      context.fillStyle = el.color || '#000000';
      context.textAlign = el.textAlign || 'left';
      context.textBaseline = 'middle';
      context.fillText(el.text, el.x, el.y);
      break;
      
    case 'line':
      context.beginPath();
      context.moveTo(el.x1, el.y1);
      context.lineTo(el.x2, el.y2);
      context.strokeStyle = el.stroke || '#000000';
      context.lineWidth = el.lineWidth || 1;
      context.stroke();
      break;
  }
  
  // Draw selection indicator
  if (el === selectedElement) {
    context.strokeStyle = '#00f5ff';
    context.lineWidth = 2;
    context.setLineDash([5, 5]);
    const bbox = getElementBounds(el);
    context.strokeRect(bbox.x - 5, bbox.y - 5, bbox.width + 10, bbox.height + 10);
    context.setLineDash([]);
  }
  
  context.restore();
}

// Parse gradient string
function parseGradient(context, gradientStr, x1, y1, x2, y2) {
  const match = gradientStr.match(/linear-gradient\((\d+)deg,\s*([^,]+),\s*([^)]+)\)/);
  if (match) {
    const angle = parseInt(match[1]) * Math.PI / 180;
    const color1 = match[2].trim();
    const color2 = match[3].trim();
    
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const dx = Math.cos(angle) * (x2 - x1) / 2;
    const dy = Math.sin(angle) * (y2 - y1) / 2;
    
    const gradient = context.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  }
  return gradientStr;
}

// Draw rounded rectangle
function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

// Get element bounds
function getElementBounds(el) {
  switch (el.type) {
    case 'rect':
      return { x: el.x, y: el.y, width: el.width, height: el.height };
    case 'circle':
      return { x: el.x - el.radius, y: el.y - el.radius, width: el.radius * 2, height: el.radius * 2 };
    case 'text':
      return { x: el.x - 50, y: el.y - el.fontSize / 2, width: 100, height: el.fontSize };
    case 'line':
      return { x: Math.min(el.x1, el.x2), y: Math.min(el.y1, el.y2), 
               width: Math.abs(el.x2 - el.x1), height: Math.abs(el.y2 - el.y1) };
    default:
      return { x: el.x, y: el.y, width: 50, height: 50 };
  }
}

// Render main canvas
function renderCanvas() {
  if (!currentTemplate) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Apply background color
  if (currentBgColor === 'gradient1') {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff6b6b');
    gradient.addColorStop(1, '#ff00aa');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (currentBgColor === 'gradient2') {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#00f5ff');
    gradient.addColorStop(1, '#a855f7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = currentBgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  renderTemplate(ctx, currentTemplate);
}

// Mouse event handlers
function handleMouseDown(e) {
  if (!currentTemplate) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  
  // Find clicked element (reverse order to select top-most)
  for (let i = currentTemplate.elements.length - 1; i >= 0; i--) {
    const el = currentTemplate.elements[i];
    const bounds = getElementBounds(el);
    
    if (x >= bounds.x && x <= bounds.x + bounds.width &&
        y >= bounds.y && y <= bounds.y + bounds.height) {
      selectedElement = el;
      isDragging = true;
      dragOffset.x = x - el.x;
      dragOffset.y = y - el.y;
      updatePropertyPanel(el);
      renderCanvas();
      return;
    }
  }
  
  selectedElement = null;
  renderCanvas();
}

function handleMouseMove(e) {
  if (!isDragging || !selectedElement) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  
  selectedElement.x = x - dragOffset.x;
  selectedElement.y = y - dragOffset.y;
  
  renderCanvas();
}

function handleMouseUp() {
  isDragging = false;
}

// Update property panel with selected element values
function updatePropertyPanel(el) {
  if (el.type === 'text') {
    document.getElementById('textContent').value = el.text || '';
    document.getElementById('fontSize').value = el.fontSize || 24;
  }
}

// Initialize event listeners
function initEventListeners() {
  // Text content change
  document.getElementById('textContent').addEventListener('input', (e) => {
    if (selectedElement && selectedElement.type === 'text') {
      selectedElement.text = e.target.value;
      renderCanvas();
    }
  });
  
  // Font size change
  document.getElementById('fontSize').addEventListener('input', (e) => {
    if (selectedElement && selectedElement.type === 'text') {
      selectedElement.fontSize = parseInt(e.target.value);
      renderCanvas();
    }
  });
  
  // Color picker
  document.querySelectorAll('#colorPicker .color-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('#colorPicker .color-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      currentColor = opt.dataset.color;
      if (selectedElement && selectedElement.type === 'text') {
        selectedElement.color = currentColor;
        renderCanvas();
      }
    });
  });
  
  // Background color picker
  document.querySelectorAll('#bgColorPicker .color-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('#bgColorPicker .color-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      currentBgColor = opt.dataset.color;
      renderCanvas();
    });
  });
  
  // Export PNG
  document.getElementById('exportPngBtn').addEventListener('click', exportPNG);
  
  // Export PDF
  document.getElementById('exportPdfBtn').addEventListener('click', exportPDF);
}

// Export as PNG
function exportPNG() {
  const btn = document.getElementById('exportPngBtn');
  btn.classList.add('loading');
  btn.disabled = true;
  
  setTimeout(() => {
    const link = document.createElement('a');
    link.download = `design-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    btn.classList.remove('loading');
    btn.disabled = false;
  }, 1000);
}

// Export as PDF (simulated as image for demo)
function exportPDF() {
  const btn = document.getElementById('exportPdfBtn');
  btn.classList.add('loading');
  btn.disabled = true;
  
  setTimeout(() => {
    const link = document.createElement('a');
    link.download = `design-${Date.now()}.pdf`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    btn.classList.remove('loading');
    btn.disabled = false;
  }, 1500);
}