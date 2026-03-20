/**
 * SkillCard Component
 * 技能卡片组件 - 用于首页技能网格展示
 */

class SkillCard extends Component {
  constructor(element, skillData) {
    super(element);
    this.data = skillData;
    this.isHovered = false;
    this.clickHandlers = [];
    this.hoverHandlers = [];
  }

  render() {
    const { id, name, icon, color, description, tags } = this.data;
    
    this.element.innerHTML = `
      <div class="skill-card" data-skill-id="${id}" style="--skill-color: ${color}">
        <div class="skill-card__icon">${icon}</div>
        <h3 class="skill-card__name">${name}</h3>
        <p class="skill-card__desc">${description}</p>
        <div class="skill-card__tags">
          ${tags.map(tag => this.renderTag(tag)).join('')}
        </div>
        <div class="skill-card__arrow"></div>
      </div>
    `;
    
    this.cardElement = this.element.querySelector('.skill-card');
  }

  renderTag(tag) {
    const tagClass = tag === 'PRO' ? 'skill-card__tag--pro' : 
                     tag === 'NEW' ? 'skill-card__tag--new' : '';
    return `<span class="skill-card__tag ${tagClass}">${tag}</span>`;
  }

  bindEvents() {
    if (!this.cardElement) return;

    // Hover events
    this.addEventListener(this.cardElement, 'mouseenter', () => {
      this.isHovered = true;
      this.emit('skill:hover', { skillId: this.data.id, isHovered: true });
      this.hoverHandlers.forEach(cb => cb(true));
    });

    this.addEventListener(this.cardElement, 'mouseleave', () => {
      this.isHovered = false;
      this.emit('skill:hover', { skillId: this.data.id, isHovered: false });
      this.hoverHandlers.forEach(cb => cb(false));
    });

    // Click event
    this.addEventListener(this.cardElement, 'click', (e) => {
      e.preventDefault();
      this.emit('skill:click', { skillId: this.data.id, data: this.data });
      this.clickHandlers.forEach(cb => cb(this.data));
    });

    // Keyboard navigation
    this.addEventListener(this.cardElement, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.cardElement.click();
      }
    });

    // Focus management
    this.cardElement.setAttribute('tabindex', '0');
    this.cardElement.setAttribute('role', 'button');
    this.cardElement.setAttribute('aria-label', `查看 ${this.data.name} 技能详情`);
  }

  onClick(callback) {
    this.clickHandlers.push(callback);
    return () => {
      this.clickHandlers = this.clickHandlers.filter(cb => cb !== callback);
    };
  }

  onHover(callback) {
    this.hoverHandlers.push(callback);
    return () => {
      this.hoverHandlers = this.hoverHandlers.filter(cb => cb !== callback);
    };
  }

  focus() {
    this.cardElement?.focus();
  }

  setActive(active) {
    if (this.cardElement) {
      this.cardElement.classList.toggle('skill-card--active', active);
    }
  }

  animateEntry(delay = 0) {
    if (this.cardElement) {
      this.cardElement.classList.add('skill-card--animate');
      this.cardElement.style.animationDelay = `${delay}ms`;
    }
  }
}

// Export for use in other modules
window.SkillCard = SkillCard;
