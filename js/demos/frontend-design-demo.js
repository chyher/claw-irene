/**
 * Frontend Design Demo
 * 前端设计技能演示逻辑
 */

const componentTemplates = {
  'neon-btn': {
    html: `<button class="neon-btn">NEON</button>`,
    css: `.neon-btn {
  padding: 14px 32px;
  background: transparent;
  border: 2px solid var(--current-theme);
  border-radius: 8px;
  color: var(--current-theme);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
}

.neon-btn:hover {
  background: var(--current-theme);
  color: #0a0a0f;
  box-shadow: 0 0 30px var(--current-theme),
              0 0 60px var(--current-theme);
}`
  },
  'glass-card': {
    html: `<div class="glass-card">\n  <h3>玻璃卡片</h3>\n  <p>毛玻璃效果</p>\n</div>`,
    css: `.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--current-theme);
  transform: translateY(-4px);
}`
  },
  'gradient-text': {
    html: `<span class="gradient-text">渐变文字</span>`,
    css: `.gradient-text {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(
    90deg,
    var(--current-theme),
    #ff00aa
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`
  },
  'pulse-loader': {
    html: `<div class="pulse-loader"></div>`,
    css: `.pulse-loader {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--current-theme);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}`
  },
  'toggle-switch': {
    html: `<label class="toggle-switch">\n  <input type="checkbox">\n  <span class="toggle-slider"></span>\n</label>`,
    css: `.toggle-switch {
  position: relative;
  width: 60px;
  height: 32px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #12121a;
  border-radius: 32px;
  transition: 0.3s;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
}

.toggle-switch input:checked + .toggle-slider {
  background: var(--current-theme);
}

.toggle-switch input:checked + .toggle-slider:before {
  transform: translateX(28px);
}`
  },
  'animated-input': {
    html: `<input type="text" class="animated-input" placeholder="输入内容...">`,
    css: `.animated-input {
  width: 100%;
  padding: 16px;
  background: rgba(20, 20, 30, 0.8);
  border: 2px solid transparent;
  border-radius: 8px;
  color: #e8e8f0;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
}

.animated-input:focus {
  border-color: var(--current-theme);
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
}`
  }
};

let currentComponent = 'neon-btn';
let isDarkMode = true;
let currentTheme = 'cyan';

document.addEventListener('DOMContentLoaded', () => {
  initThemeControls();
  initComponentCards();
  initCodeEditor();
  initCopyButton();
  initIreneMood();
  loadComponent('neon-btn');
});

function initThemeControls() {
  const themeBtns = document.querySelectorAll('.theme-btn');
  const modeToggle = document.getElementById('modeToggle');
  const radiusSlider = document.getElementById('radiusSlider');

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTheme = btn.dataset.theme;
      document.body.setAttribute('data-theme', currentTheme);
      updateIreneBubble('切换到' + getThemeName(currentTheme) + '主题！');
    });
  });

  modeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-mode', isDarkMode ? 'dark' : 'light');
    document.getElementById('modeIcon').textContent = isDarkMode ? '🌙' : '☀️';
    document.getElementById('modeText').textContent = isDarkMode ? '暗色' : '亮色';
    updateIreneBubble(isDarkMode ? '切换到暗色模式' : '切换到亮色模式');
  });

  radiusSlider.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--border-radius-custom', e.target.value + 'px');
  });
}

function getThemeName(theme) {
  const names = { 'cyan': '青色', 'purple': '紫色', 'pink': '粉色' };
  return names[theme] || theme;
}

function initComponentCards() {
  const cards = document.querySelectorAll('.component-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const component = card.dataset.component;
      loadComponent(component);
      cards.forEach(c => c.style.borderColor = '');
      card.style.borderColor = 'var(--current-theme)';
      updateIreneBubble('加载 ' + card.querySelector('.component-name').textContent + ' 组件');
    });
  });
}

function loadComponent(componentId) {
  currentComponent = componentId;
  const template = componentTemplates[componentId];
  if (template) {
    const code = '<!-- HTML -->\n' + template.html + '\n\n/* CSS */\n' + template.css;
    document.getElementById('codeEditor').value = code;
    updatePreview(template.html, template.css);
  }
}

function updatePreview(html, css) {
  const styleId = 'dynamic-preview-style';
  let styleEl = document.getElementById(styleId);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
  document.getElementById('previewContent').innerHTML = html;
}

function initCodeEditor() {
  const editor = document.getElementById('codeEditor');
  let timer;
  editor.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const code = editor.value;
      const htmlMatch = code.match(/<!-- HTML -->\n([\s\S]*?)(?=\n\n\/\* CSS|$)/);
      const cssMatch = code.match(/\/\* CSS \*\/\n([\s\S]*)/);
      if (htmlMatch && cssMatch) {
        updatePreview(htmlMatch[1].trim(), cssMatch[1].trim());
      }
    }, 300);
  });
}

function initCopyButton() {
  const btn = document.getElementById('copyBtn');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById('codeEditor').value);
      showToast('已复制到剪贴板！');
      btn.classList.add('copied');
      btn.textContent = '已复制';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.textContent = '复制代码';
      }, 2000);
    } catch (err) {
      showToast('复制失败，请手动复制');
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function initIreneMood() {
  const avatar = document.querySelector('.irene-avatar');
  const moods = ['🤖', '😸', '🤔', '✨', '😺'];
  let idx = 0;
  avatar.addEventListener('click', () => {
    idx = (idx + 1) % moods.length;
    avatar.textContent = moods[idx];
    const texts = ['Frontend Design 已就绪！', '组件库加载完成！', '试试编辑代码实时预览！', '点击组件查看详情！', '有什么设计需求吗？'];
    updateIreneBubble(texts[idx]);
  });
}

function updateIreneBubble(text) {
  const bubble = document.getElementById('moodBubble');
  bubble.textContent = text;
  bubble.style.opacity = '1';
  bubble.style.transform = 'translateY(0)';
  setTimeout(() => {
    bubble.style.opacity = '';
    bubble.style.transform = '';
  }, 3000);
}
