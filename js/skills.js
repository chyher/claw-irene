/**
 * Skills Grid Interactive Logic
 * Irene Blog - Skill Showcase Platform
 */

// Skill data configuration
const skillsData = [
  { id: 'humanizer', name: 'Humanizer', icon: '✍️', desc: '去除AI味，让文字更自然', mood: '😺', url: 'skills/humanizer.html' },
  { id: 'daily-ai-news', name: 'Daily AI News', icon: '📰', desc: '每日AI新闻聚合', mood: '🤓', url: 'skills/daily-ai-news.html' },
  { id: 'canvas-design', name: 'Canvas Design', icon: '🎨', desc: '商业海报、信息图设计', mood: '😸', url: 'skills/canvas-design.html' },
  { id: 'frontend-design', name: 'Frontend Design', icon: '💻', desc: '高保真交互界面设计', mood: '🤖', url: 'skills/frontend-design.html' },
  { id: 'tavily-search', name: 'Tavily Search', icon: '🔍', desc: '智能网络搜索', mood: '🧐', url: 'skills/tavily-search.html' },
  { id: 'uml-drawio', name: 'UML Drawio', icon: '🏗️', desc: '生成专业UML图表', mood: '🏗️', url: 'skills/uml-drawio.html' },
  { id: 'rag', name: 'RAG', icon: '🧠', desc: '企业级知识库问答', mood: '💡', url: 'skills/rag.html' },
  { id: 'weather', name: 'Weather', icon: '🌤️', desc: '天气查询与预报', mood: '☀️', url: 'skills/weather.html' }
];

// Default Irene mood
const defaultMood = '🐱';

// DOM Elements
let skillsGrid = null;
let ireneMoodAvatar = null;
let ireneMoodText = null;
let transitionOverlay = null;

/**
 * Initialize the skills grid
 */
function initSkillsGrid() {
  // Find or create the skills grid container
  skillsGrid = document.querySelector('.skills-grid');
  
  if (!skillsGrid) {
    console.warn('Skills grid container not found');
    return;
  }
  
  // Find Irene mood elements
  ireneMoodAvatar = document.querySelector('.irene-mood-avatar');
  ireneMoodText = document.querySelector('.irene-mood-text');
  
  // Create transition overlay if not exists
  createTransitionOverlay();
  
  // Render skill cards
  renderSkillCards();
  
  // Initialize animations
  initAnimations();
  
  // Add event listeners
  addEventListeners();
}

/**
 * Create fullscreen transition overlay
 */
function createTransitionOverlay() {
  if (document.querySelector('.transition-overlay')) {
    transitionOverlay = document.querySelector('.transition-overlay');
    return;
  }
  
  transitionOverlay = document.createElement('div');
  transitionOverlay.className = 'transition-overlay';
  transitionOverlay.innerHTML = `
    <div class="transition-content">
      <div class="transition-icon">🐱</div>
      <div class="transition-text">Loading...</div>
    </div>
  `;
  document.body.appendChild(transitionOverlay);
}

/**
 * Render skill cards to the grid
 */
function renderSkillCards() {
  skillsGrid.innerHTML = skillsData.map(skill => `
    <div class="skill-card" data-skill="${skill.id}" data-mood="${skill.mood}">
      <a href="${skill.url}" class="skill-link" data-skill="${skill.id}"></a>
      <span class="skill-icon">${skill.icon}</span>
      <h3 class="skill-name">${skill.name}</h3>
      <p class="skill-desc">${skill.desc}</p>
    </div>
  `).join('');
}

/**
 * Initialize scroll-based animations
 */
function initAnimations() {
  // Use Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add small delay for staggered effect
        const card = entry.target;
        const index = Array.from(skillsGrid.children).indexOf(card);
        setTimeout(() => {
          card.classList.add('fade-in');
        }, index * 50);
        
        observer.unobserve(card);
      }
    });
  }, observerOptions);
  
  // Observe all skill cards
  document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
  });
}

/**
 * Add event listeners for interactions
 */
function addEventListeners() {
  const cards = document.querySelectorAll('.skill-card');
  
  cards.forEach(card => {
    // Mouse enter - show Irene mood
    card.addEventListener('mouseenter', handleCardHover);
    
    // Mouse leave - reset Irene mood
    card.addEventListener('mouseleave', handleCardLeave);
    
    // Click - show transition and navigate
    card.addEventListener('click', handleCardClick);
    
    // Touch events for mobile
    card.addEventListener('touchstart', handleCardTouch, { passive: true });
  });
  
  // Keyboard navigation support
  document.addEventListener('keydown', handleKeyboardNav);
}

/**
 * Handle card hover - update Irene mood
 */
function handleCardHover(e) {
  const card = e.currentTarget;
  const mood = card.dataset.mood;
  const skillName = card.querySelector('.skill-name').textContent;
  
  if (ireneMoodAvatar && mood) {
    ireneMoodAvatar.textContent = mood;
    ireneMoodAvatar.classList.add('hovered');
  }
  
  if (ireneMoodText) {
    ireneMoodText.textContent = `想试试 ${skillName}？`;
    ireneMoodText.classList.add('visible');
  }
}

/**
 * Handle card leave - reset Irene mood
 */
function handleCardLeave(e) {
  if (ireneMoodAvatar) {
    ireneMoodAvatar.textContent = defaultMood;
    ireneMoodAvatar.classList.remove('hovered');
  }
  
  if (ireneMoodText) {
    ireneMoodText.classList.remove('visible');
  }
}

/**
 * Handle card click - show transition effect
 */
function handleCardClick(e) {
  const card = e.currentTarget;
  const skillId = card.dataset.skill;
  const skill = skillsData.find(s => s.id === skillId);
  
  if (!skill) return;
  
  // Create ripple effect
  createRipple(e, card);
  
  // Show transition overlay
  showTransition(skill);
  
  // Prevent default navigation - we'll handle it
  e.preventDefault();
  
  // Navigate after transition
  setTimeout(() => {
    window.location.href = skill.url;
  }, 800);
}

/**
 * Handle touch events for mobile
 */
function handleCardTouch(e) {
  const card = e.currentTarget;
  const mood = card.dataset.mood;
  
  if (ireneMoodAvatar && mood) {
    ireneMoodAvatar.textContent = mood;
    ireneMoodAvatar.classList.add('hovered');
  }
}

/**
 * Create ripple effect on click
 */
function createRipple(e, card) {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  
  card.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

/**
 * Show fullscreen transition overlay
 */
function showTransition(skill) {
  if (!transitionOverlay) return;
  
  const icon = transitionOverlay.querySelector('.transition-icon');
  const text = transitionOverlay.querySelector('.transition-text');
  
  if (icon) icon.textContent = skill.icon;
  if (text) text.textContent = `正在进入 ${skill.name}...`;
  
  transitionOverlay.classList.add('active');
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNav(e) {
  const cards = document.querySelectorAll('.skill-card');
  const focused = document.activeElement;
  const focusedCard = focused?.closest('.skill-card');
  
  let currentIndex = -1;
  if (focusedCard) {
    currentIndex = Array.from(cards).indexOf(focusedCard);
  }
  
  switch (e.key) {
    case 'ArrowRight':
      e.preventDefault();
      currentIndex = (currentIndex + 1) % cards.length;
      cards[currentIndex]?.focus();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      currentIndex = currentIndex <= 0 ? cards.length - 1 : currentIndex - 1;
      cards[currentIndex]?.focus();
      break;
    case 'ArrowDown':
      e.preventDefault();
      currentIndex = (currentIndex + 4) % cards.length;
      cards[currentIndex]?.focus();
      break;
    case 'ArrowUp':
      e.preventDefault();
      currentIndex = currentIndex < 4 ? cards.length - (4 - currentIndex) : currentIndex - 4;
      cards[currentIndex]?.focus();
      break;
    case 'Enter':
      if (focusedCard) {
        const skillId = focusedCard.dataset.skill;
        const skill = skillsData.find(s => s.id === skillId);
        if (skill) {
          showTransition(skill);
          setTimeout(() => {
            window.location.href = skill.url;
          }, 800);
        }
      }
      break;
  }
}

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkillsGrid);
} else {
  initSkillsGrid();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initSkillsGrid, skillsData };
}