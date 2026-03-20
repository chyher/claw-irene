/**
 * Humanizer Skill Demo
 * AI文本人性化演示
 */

window.initDemo = function(skillData) {
  const demoArea = document.getElementById('demoArea');
  
  demoArea.innerHTML = `
    <div class="demo-area__header">
      <span class="demo-area__title">Humanizer 演示</span>
      <span class="demo-area__status">
        <span class="demo-area__status-dot"></span>
        在线
      </span>
    </div>
    
    <div class="demo-area__content">
      <div class="demo-area__input">
        <label class="demo-area__input-label">输入AI生成的文本</label>
        <textarea 
          class="demo-area__input-field" 
          id="inputText"
          placeholder="粘贴一段AI生成的文字，我会帮你去除AI味..."
          rows="4"
        >本文旨在探讨人工智能技术在现代社会中的应用。通过分析相关数据，我们可以得出结论...</textarea>
      </div>
      
      <div class="demo-area__action">
        <button class="demo-area__btn" id="transformBtn">
          <span>✨</span>
          开始转换
        </button>
        <button class="demo-area__btn demo-area__btn--secondary" id="clearBtn">
          清空
        </button>
      </div>
      
      <div class="demo-area__output" id="outputArea" style="display: none;">
        <div class="demo-area__output-label">转换结果</div>
        <div class="demo-area__output-content" id="outputContent"></div>
      </div>
    </div>
  `;
  
  const inputText = document.getElementById('inputText');
  const transformBtn = document.getElementById('transformBtn');
  const clearBtn = document.getElementById('clearBtn');
  const outputArea = document.getElementById('outputArea');
  const outputContent = document.getElementById('outputContent');
  
  // Transform button click
  transformBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    if (!text) {
      inputText.focus();
      return;
    }
    
    // Disable button
    transformBtn.disabled = true;
    transformBtn.innerHTML = '<span>⏳</span> 处理中...';
    
    // Update Irene mood
    window.eventBus.emit('mood:change', 'thinking');
    
    // Simulate processing
    await Utils.delay(1500);
    
    // Transform text (mock)
    const transformed = transformText(text);
    
    // Show output
    outputArea.style.display = 'block';
    outputContent.innerHTML = '';
    
    // Type out result
    const typewriter = new TypeWriter(outputContent, {
      speed: 30,
      onComplete: () => {
        transformBtn.disabled = false;
        transformBtn.innerHTML = '<span>✨</span> 再次转换';
        window.eventBus.emit('mood:change', 'happy');
      }
    });
    typewriter.mount();
    await typewriter.type(transformed);
  });
  
  // Clear button click
  clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputArea.style.display = 'none';
    outputContent.innerHTML = '';
    inputText.focus();
  });
  
  // Input focus effects
  inputText.addEventListener('focus', () => {
    window.eventBus.emit('mood:change', 'excited');
  });
  
  // Transform function (mock)
  function transformText(text) {
    const replacements = [
      { from: /本文旨在/g, to: '我想聊聊' },
      { from: /通过分析/g, to: '看看' },
      { from: /我们可以得出结论/g, to: '不难发现' },
      { from: /相关数据/g, to: '实际情况' },
      { from: /人工智能/g, to: 'AI' },
      { from: /技术/g, to: '技术' },
      { from: /应用/g, to: '落地场景' },
      { from: /探讨/g, to: '聊聊' }
    ];
    
    let result = text;
    replacements.forEach(({ from, to }) => {
      result = result.replace(from, to);
    });
    
    return result + '\n\n[已优化：去除AI味，更自然流畅]';
  }
};
