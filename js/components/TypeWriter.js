/**
 * TypeWriter Component
 * 打字机效果组件
 */

class TypeWriter extends Component {
  constructor(element, options = {}) {
    super(element);
    this.options = {
      speed: options.speed || 50,
      cursor: options.cursor || '▋',
      cursorBlink: options.cursorBlink !== false,
      onComplete: options.onComplete || (() => {}),
      onType: options.onType || (() => {}),
      pauseOnPunctuation: options.pauseOnPunctuation !== false,
      punctuationPause: options.punctuationPause || 200
    };
    this.isTyping = false;
    this.currentText = '';
    this.typingQueue = [];
  }

  render() {
    this.element.innerHTML = `
      <span class="typewriter">
        <span class="typewriter__text"></span>
        <span class="typewriter__cursor"></span>
      </span>
    `;
    
    this.textElement = this.element.querySelector('.typewriter__text');
    this.cursorElement = this.element.querySelector('.typewriter__cursor');
    
    if (!this.options.cursorBlink) {
      this.cursorElement.style.animation = 'none';
    }
  }

  bindEvents() {
    // No events to bind
  }

  async type(text) {
    if (this.isTyping) {
      this.typingQueue.push(text);
      return;
    }

    this.isTyping = true;
    this.currentText = '';
    this.textElement.textContent = '';
    
    // Show cursor
    this.cursorElement.style.opacity = '1';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      this.currentText += char;
      this.textElement.textContent = this.currentText;
      
      this.options.onType(char, i, text);
      
      // Calculate delay
      let delay = this.options.speed;
      
      // Pause on punctuation
      if (this.options.pauseOnPunctuation && /[.!?。！？]/.test(char)) {
        delay = this.options.punctuationPause;
      } else if (this.options.pauseOnPunctuation && /[,，;；:]/.test(char)) {
        delay = this.options.punctuationPause / 2;
      }
      
      // Randomize slightly for natural feel
      delay += Utils.random(-10, 10);
      
      await Utils.delay(delay);
    }

    this.isTyping = false;
    this.options.onComplete(this.currentText);
    
    // Process queue
    if (this.typingQueue.length > 0) {
      const nextText = this.typingQueue.shift();
      await Utils.delay(500);
      await this.type(nextText);
    }
  }

  async typeLines(lines, lineDelay = 500) {
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) {
        this.currentText += '\n';
        await Utils.delay(lineDelay);
      }
      await this.type(lines[i]);
    }
  }

  async delete(count = null) {
    const deleteCount = count || this.currentText.length;
    
    for (let i = 0; i < deleteCount; i++) {
      this.currentText = this.currentText.slice(0, -1);
      this.textElement.textContent = this.currentText;
      await Utils.delay(this.options.speed / 2);
    }
  }

  clear() {
    this.currentText = '';
    this.textElement.textContent = '';
    this.typingQueue = [];
    this.isTyping = false;
  }

  setCursor(visible) {
    this.cursorElement.style.opacity = visible ? '1' : '0';
  }

  setText(text) {
    this.currentText = text;
    this.textElement.textContent = text;
  }

  getText() {
    return this.currentText;
  }

  isActive() {
    return this.isTyping;
  }

  // Static method for quick typing
  static async quickType(element, text, options = {}) {
    const typewriter = new TypeWriter(element, options);
    typewriter.mount();
    await typewriter.type(text);
    return typewriter;
  }
}

window.TypeWriter = TypeWriter;
