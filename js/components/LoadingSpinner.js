/**
 * LoadingSpinner Component
 * 加载动画组件
 */

class LoadingSpinner extends Component {
  constructor(element, options = {}) {
    super(element);
    this.options = {
      type: options.type || 'dots', // dots, pulse, spinner, bars
      color: options.color || 'cyan',
      size: options.size || 'medium', // small, medium, large
      text: options.text || null,
      ...options
    };
  }

  render() {
    const sizeClass = `loading-spinner--${this.options.size}`;
    const colorClass = `loading-spinner--${this.options.color}`;
    
    this.element.className = `loading-spinner ${sizeClass} ${colorClass}`;
    
    let spinnerHTML = '';
    
    switch (this.options.type) {
      case 'dots':
        spinnerHTML = this.renderDots();
        break;
      case 'pulse':
        spinnerHTML = this.renderPulse();
        break;
      case 'spinner':
        spinnerHTML = this.renderSpinner();
        break;
      case 'bars':
        spinnerHTML = this.renderBars();
        break;
      default:
        spinnerHTML = this.renderDots();
    }
    
    this.element.innerHTML = `
      <div class="loading-spinner__container">
        ${spinnerHTML}
        ${this.options.text ? `<span class="loading-spinner__text">${this.options.text}</span>` : ''}
      </div>
    `;
  }

  renderDots() {
    return `
      <div class="loading-spinner__dots">
        <span class="loading-spinner__dot"></span>
        <span class="loading-spinner__dot"></span>
        <span class="loading-spinner__dot"></span>
      </div>
    `;
  }

  renderPulse() {
    return `
      <div class="loading-spinner__pulse">
        <span class="loading-spinner__pulse-ring"></span>
        <span class="loading-spinner__pulse-ring"></span>
      </div>
    `;
  }

  renderSpinner() {
    return `
      <div class="loading-spinner__spinner">
        <svg viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
        </svg>
      </div>
    `;
  }

  renderBars() {
    return `
      <div class="loading-spinner__bars">
        <span class="loading-spinner__bar"></span>
        <span class="loading-spinner__bar"></span>
        <span class="loading-spinner__bar"></span>
        <span class="loading-spinner__bar"></span>
        <span class="loading-spinner__bar"></span>
      </div>
    `;
  }

  bindEvents() {
    // No events to bind
  }

  setText(text) {
    const textElement = this.element.querySelector('.loading-spinner__text');
    if (textElement) {
      textElement.textContent = text;
    }
  }

  setProgress(percent) {
    // Add progress indicator if not exists
    let progressElement = this.element.querySelector('.loading-spinner__progress');
    
    if (!progressElement) {
      progressElement = Utils.createElement('div', {
        className: 'loading-spinner__progress'
      });
      this.element.querySelector('.loading-spinner__container').appendChild(progressElement);
    }
    
    progressElement.innerHTML = `
      <div class="loading-spinner__progress-bar" style="width: ${percent}%"></div>
      <span class="loading-spinner__progress-text">${Math.round(percent)}%</span>
    `;
  }

  show() {
    this.element.style.display = 'flex';
    Animations.fadeIn(this.element, 200);
  }

  hide() {
    Animations.fadeOut(this.element, 200).then(() => {
      this.element.style.display = 'none';
    });
  }

  // Static methods for quick use
  static showIn(element, options = {}) {
    const spinner = new LoadingSpinner(element, options);
    spinner.mount();
    spinner.show();
    return spinner;
  }

  static async withPromise(element, promise, options = {}) {
    const spinner = LoadingSpinner.showIn(element, options);
    
    try {
      const result = await promise;
      spinner.hide();
      return result;
    } catch (error) {
      spinner.hide();
      throw error;
    }
  }
}

window.LoadingSpinner = LoadingSpinner;
