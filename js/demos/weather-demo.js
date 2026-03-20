/**
 * Weather 技能演示逻辑
 * 模拟天气查询与预报功能
 */

// 模拟天气数据
const weatherDatabase = {
  '北京': {
    current: {
      temp: 22,
      condition: '晴朗',
      icon: '☀️',
      iconClass: 'sun',
      humidity: '45%',
      wind: '3级',
      pressure: '1013hPa',
      uv: '中等'
    },
    forecast: [
      { day: '今天', high: 24, low: 12, icon: '☀️', condition: '晴' },
      { day: '明天', high: 23, low: 11, icon: '⛅', condition: '多云' },
      { day: '周六', high: 20, low: 9, icon: '🌧️', condition: '小雨' },
      { day: '周日', high: 18, low: 8, icon: '⛅', condition: '阴' },
      { day: '周一', high: 21, low: 10, icon: '☀️', condition: '晴' }
    ]
  },
  '上海': {
    current: {
      temp: 19,
      condition: '多云',
      icon: '⛅',
      iconClass: 'cloud',
      humidity: '68%',
      wind: '4级',
      pressure: '1010hPa',
      uv: '弱'
    },
    forecast: [
      { day: '今天', high: 21, low: 15, icon: '⛅', condition: '多云' },
      { day: '明天', high: 22, low: 16, icon: '🌧️', condition: '小雨' },
      { day: '周六', high: 20, low: 14, icon: '🌧️', condition: '中雨' },
      { day: '周日', high: 23, low: 15, icon: '⛅', condition: '阴' },
      { day: '周一', high: 25, low: 17, icon: '☀️', condition: '晴' }
    ]
  },
  '广州': {
    current: {
      temp: 28,
      condition: '雷阵雨',
      icon: '⛈️',
      iconClass: '',
      humidity: '82%',
      wind: '5级',
      pressure: '1005hPa',
      uv: '强'
    },
    forecast: [
      { day: '今天', high: 30, low: 24, icon: '⛈️', condition: '雷阵雨' },
      { day: '明天', high: 29, low: 23, icon: '🌧️', condition: '中雨' },
      { day: '周六', high: 31, low: 25, icon: '⛅', condition: '多云' },
      { day: '周日', high: 32, low: 26, icon: '☀️', condition: '晴' },
      { day: '周一', high: 33, low: 27, icon: '☀️', condition: '晴' }
    ]
  },
  '深圳': {
    current: {
      temp: 29,
      condition: '多云',
      icon: '⛅',
      iconClass: 'cloud',
      humidity: '75%',
      wind: '3级',
      pressure: '1007hPa',
      uv: '强'
    },
    forecast: [
      { day: '今天', high: 31, low: 25, icon: '⛅', condition: '多云' },
      { day: '明天', high: 30, low: 24, icon: '🌧️', condition: '阵雨' },
      { day: '周六', high: 32, low: 26, icon: '⛅', condition: '多云' },
      { day: '周日', high: 33, low: 27, icon: '☀️', condition: '晴' },
      { day: '周一', high: 32, low: 26, icon: '☀️', condition: '晴' }
    ]
  },
  '杭州': {
    current: {
      temp: 18,
      condition: '小雨',
      icon: '🌧️',
      iconClass: '',
      humidity: '72%',
      wind: '3级',
      pressure: '1012hPa',
      uv: '弱'
    },
    forecast: [
      { day: '今天', high: 20, low: 14, icon: '🌧️', condition: '小雨' },
      { day: '明天', high: 19, low: 13, icon: '⛅', condition: '阴' },
      { day: '周六', high: 22, low: 15, icon: '⛅', condition: '多云' },
      { day: '周日', high: 24, low: 16, icon: '☀️', condition: '晴' },
      { day: '周一', high: 25, low: 17, icon: '☀️', condition: '晴' }
    ]
  },
  '成都': {
    current: {
      temp: 17,
      condition: '阴',
      icon: '☁️',
      iconClass: 'cloud',
      humidity: '78%',
      wind: '2级',
      pressure: '1014hPa',
      uv: '弱'
    },
    forecast: [
      { day: '今天', high: 19, low: 13, icon: '☁️', condition: '阴' },
      { day: '明天', high: 20, low: 14, icon: '⛅', condition: '多云' },
      { day: '周六', high: 22, low: 15, icon: '☀️', condition: '晴' },
      { day: '周日', high: 23, low: 16, icon: '☀️', condition: '晴' },
      { day: '周一', high: 21, low: 14, icon: '⛅', condition: '多云' }
    ]
  },
  '武汉': {
    current: {
      temp: 21,
      condition: '晴',
      icon: '☀️',
      iconClass: 'sun',
      humidity: '55%',
      wind: '3级',
      pressure: '1011hPa',
      uv: '中等'
    },
    forecast: [
      { day: '今天', high: 23, low: 14, icon: '☀️', condition: '晴' },
      { day: '明天', high: 24, low: 15, icon: '⛅', condition: '多云' },
      { day: '周六', high: 22, low: 13, icon: '🌧️', condition: '小雨' },
      { day: '周日', high: 20, low: 12, icon: '⛅', condition: '阴' },
      { day: '周一', high: 23, low: 14, icon: '☀️', condition: '晴' }
    ]
  },
  '西安': {
    current: {
      temp: 20,
      condition: '晴',
      icon: '☀️',
      iconClass: 'sun',
      humidity: '42%',
      wind: '2级',
      pressure: '1015hPa',
      uv: '中等'
    },
    forecast: [
      { day: '今天', high: 22, low: 10, icon: '☀️', condition: '晴' },
      { day: '明天', high: 23, low: 11, icon: '☀️', condition: '晴' },
      { day: '周六', high: 21, low: 9, icon: '⛅', condition: '多云' },
      { day: '周日', high: 19, low: 8, icon: '☁️', condition: '阴' },
      { day: '周一', high: 22, low: 10, icon: '☀️', condition: '晴' }
    ]
  },
  '重庆': {
    current: {
      temp: 22,
      condition: '多云',
      icon: '⛅',
      iconClass: 'cloud',
      humidity: '70%',
      wind: '2级',
      pressure: '1009hPa',
      uv: '中等'
    },
    forecast: [
      { day: '今天', high: 24, low: 17, icon: '⛅', condition: '多云' },
      { day: '明天', high: 25, low: 18, icon: '🌧️', condition: '阵雨' },
      { day: '周六', high: 23, low: 16, icon: '⛅', condition: '阴' },
      { day: '周日', high: 26, low: 19, icon: '☀️', condition: '晴' },
      { day: '周一', high: 27, low: 20, icon: '☀️', condition: '晴' }
    ]
  },
  '南京': {
    current: {
      temp: 19,
      condition: '多云',
      icon: '⛅',
      iconClass: 'cloud',
      humidity: '62%',
      wind: '3级',
      pressure: '1013hPa',
      uv: '中等'
    },
    forecast: [
      { day: '今天', high: 21, low: 13, icon: '⛅', condition: '多云' },
      { day: '明天', high: 20, low: 12, icon: '🌧️', condition: '小雨' },
      { day: '周六', high: 18, low: 11, icon: '⛅', condition: '阴' },
      { day: '周日', high: 22, low: 14, icon: '☀️', condition: '晴' },
      { day: '周一', high: 24, low: 15, icon: '☀️', condition: '晴' }
    ]
  }
};

// 城市列表
const cityList = Object.keys(weatherDatabase);

// Irene 表情配置
const ireneExpressions = {
  '晴朗': { emoji: '☀️', text: '今天天气不错，要出去走走吗？' },
  '多云': { emoji: '⛅', text: '多云天气，适合户外活动~' },
  '阴': { emoji: '☁️', text: '阴天呢，记得带件外套哦' },
  '小雨': { emoji: '🌧️', text: '记得带伞，别淋湿了喵' },
  '中雨': { emoji: '☔', text: '雨有点大，出门要小心' },
  '雷阵雨': { emoji: '⛈️', text: '打雷了，尽量待在室内吧' },
  '阵雨': { emoji: '🌦️', text: '阵雨天气，随时可能下雨' },
  '晴': { emoji: '☀️', text: '阳光明媚，心情也要好起来！' }
};

// DOM 元素
let cityInput, searchBtn, autocompleteDropdown, currentWeatherCard;
let forecastContainer, quickCities, ireneMood;
let selectedAutocompleteIndex = -1;

// 当前选中的城市
let currentCity = '北京';

/**
 * 初始化
 */
function init() {
  cityInput = document.getElementById('cityInput');
  searchBtn = document.getElementById('searchBtn');
  autocompleteDropdown = document.getElementById('autocompleteDropdown');
  currentWeatherCard = document.getElementById('currentWeatherCard');
  forecastContainer = document.getElementById('forecastContainer');
  quickCities = document.getElementById('quickCities');
  ireneMood = document.getElementById('ireneMood');
  
  // 绑定事件
  cityInput.addEventListener('input', handleInput);
  cityInput.addEventListener('focus', () => {
    if (cityInput.value.trim()) handleInput({ target: cityInput });
  });
  cityInput.addEventListener('keydown', handleKeydown);
  searchBtn.addEventListener('click', handleSearch);
  document.addEventListener('click', handleDocumentClick);
  
  // 快速选择城市
  quickCities.addEventListener('click', handleQuickCityClick);
  
  // 初始化显示
  updateWeatherDisplay(currentCity);
  updateCurrentDate();
}

/**
 * 处理输入事件
 */
function handleInput(e) {
  const value = e.target.value.trim();
  selectedAutocompleteIndex = -1;
  
  if (value.length === 0) {
    hideAutocomplete();
    return;
  }
  
  const matches = cityList.filter(city => city.includes(value));
  
  if (matches.length > 0) {
    showAutocomplete(matches);
  } else {
    hideAutocomplete();
  }
}

/**
 * 显示自动完成下拉
 */
function showAutocomplete(matches) {
  autocompleteDropdown.innerHTML = matches.map((city, index) => {
    const data = weatherDatabase[city];
    return `
      <div class="autocomplete-item" data-city="${city}" data-index="${index}">
        <span class="autocomplete-icon">${data.current.icon}</span>
        <span class="autocomplete-text">${city}</span>
      </div>
    `;
  }).join('');
  
  // 绑定点击事件
  const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const city = item.dataset.city;
      selectCity(city);
    });
  });
  
  autocompleteDropdown.classList.add('active');
}

/**
 * 隐藏自动完成下拉
 */
function hideAutocomplete() {
  autocompleteDropdown.classList.remove('active');
  selectedAutocompleteIndex = -1;
}

/**
 * 处理键盘事件
 */
function handleKeydown(e) {
  const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedAutocompleteIndex = Math.min(selectedAutocompleteIndex + 1, items.length - 1);
    updateAutocompleteSelection(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedAutocompleteIndex = Math.max(selectedAutocompleteIndex - 1, -1);
    updateAutocompleteSelection(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (selectedAutocompleteIndex >= 0 && items[selectedAutocompleteIndex]) {
      const city = items[selectedAutocompleteIndex].dataset.city;
      selectCity(city);
    } else {
      handleSearch();
    }
  } else if (e.key === 'Escape') {
    hideAutocomplete();
  }
}

/**
 * 更新自动完成选择
 */
function updateAutocompleteSelection(items) {
  items.forEach((item, index) => {
    item.classList.toggle('selected', index === selectedAutocompleteIndex);
  });
}

/**
 * 处理文档点击
 */
function handleDocumentClick(e) {
  if (!e.target.closest('.search-input-wrapper')) {
    hideAutocomplete();
  }
}

/**
 * 选择城市
 */
function selectCity(city) {
  cityInput.value = city;
  hideAutocomplete();
  updateWeatherDisplay(city);
  updateQuickCities(city);
}

/**
 * 处理搜索
 */
function handleSearch() {
  const city = cityInput.value.trim();
  if (city) {
    if (weatherDatabase[city]) {
      selectCity(city);
    } else {
      // 模拟加载其他城市的数据
      showLoading();
      setTimeout(() => {
        hideLoading();
        // 使用随机数据
        const randomWeather = generateRandomWeather(city);
        weatherDatabase[city] = randomWeather;
        cityList.push(city);
        updateWeatherDisplay(city);
        updateQuickCities(city);
      }, 800);
    }
  }
}

/**
 * 生成随机天气数据
 */
function generateRandomWeather(city) {
  const conditions = [
    { condition: '晴朗', icon: '☀️', iconClass: 'sun' },
    { condition: '多云', icon: '⛅', iconClass: 'cloud' },
    { condition: '阴', icon: '☁️', iconClass: 'cloud' },
    { condition: '小雨', icon: '🌧️', iconClass: '' },
    { condition: '晴', icon: '☀️', iconClass: 'sun' }
  ];
  
  const currentCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const baseTemp = 15 + Math.floor(Math.random() * 15);
  
  const forecast = [];
  const days = ['今天', '明天', '周六', '周日', '周一'];
  for (let i = 0; i < 5; i++) {
    const cond = conditions[Math.floor(Math.random() * conditions.length)];
    const high = baseTemp + Math.floor(Math.random() * 8) - 2;
    const low = high - 8 - Math.floor(Math.random() * 5);
    forecast.push({
      day: days[i],
      high,
      low,
      icon: cond.icon,
      condition: cond.condition
    });
  }
  
  return {
    current: {
      temp: baseTemp,
      condition: currentCondition.condition,
      icon: currentCondition.icon,
      iconClass: currentCondition.iconClass,
      humidity: `${40 + Math.floor(Math.random() * 40)}%`,
      wind: `${2 + Math.floor(Math.random() * 4)}级`,
      pressure: `${1000 + Math.floor(Math.random() * 20)}hPa`,
      uv: ['弱', '中等', '强'][Math.floor(Math.random() * 3)]
    },
    forecast
  };
}

/**
 * 显示加载状态
 */
function showLoading() {
  currentWeatherCard.classList.add('loading');
  searchBtn.disabled = true;
  searchBtn.innerHTML = '<span class="loading-spinner"></span>';
}

/**
 * 隐藏加载状态
 */
function hideLoading() {
  currentWeatherCard.classList.remove('loading');
  searchBtn.disabled = false;
  searchBtn.innerHTML = '<span>查询</span>';
}

/**
 * 处理快速城市点击
 */
function handleQuickCityClick(e) {
  const chip = e.target.closest('.city-chip');
  if (chip) {
    const city = chip.dataset.city;
    cityInput.value = city;
    updateWeatherDisplay(city);
    updateQuickCities(city);
  }
}

/**
 * 更新快速城市选择状态
 */
function updateQuickCities(activeCity) {
  const chips = quickCities.querySelectorAll('.city-chip');
  chips.forEach(chip => {
    chip.classList.toggle('active', chip.dataset.city === activeCity);
  });
}

/**
 * 更新天气显示
 */
function updateWeatherDisplay(city) {
  const data = weatherDatabase[city];
  if (!data) return;
  
  currentCity = city;
  const current = data.current;
  
  // 更新当前天气
  document.getElementById('cityName').textContent = city;
  
  const tempEl = document.getElementById('currentTemp');
  tempEl.innerHTML = `<span class="temp-animate">${current.temp}°</span>`;
  
  document.getElementById('weatherCondition').textContent = current.condition;
  
  const iconEl = document.getElementById('weatherIcon');
  iconEl.textContent = current.icon;
  iconEl.className = 'weather-icon-large ' + (current.iconClass || '');
  
  // 更新详细数据
  document.getElementById('humidity').textContent = current.humidity;
  document.getElementById('windSpeed').textContent = current.wind;
  document.getElementById('pressure').textContent = current.pressure;
  document.getElementById('uvIndex').textContent = current.uv;
  
  // 更新预报
  updateForecast(data.forecast);
  
  // 更新 Irene 表情
  updateIreneMood(current.condition);
}

/**
 * 更新预报
 */
function updateForecast(forecast) {
  forecastContainer.innerHTML = forecast.map((day, index) => `
    <div class="forecast-card" style="animation: fadeInUp 0.5s ease ${index * 0.1}s both;">
      <div class="forecast-day">${day.day}</div>
      <div class="forecast-icon">${day.icon}</div>
      <div class="forecast-condition">${day.condition}</div>
      <div class="forecast-temps">
        <span class="temp-high">${day.high}°</span>
        <span class="temp-low">${day.low}°</span>
      </div>
    </div>
  `).join('');
}

/**
 * 更新 Irene 表情
 */
function updateIreneMood(condition) {
  const expression = ireneExpressions[condition] || ireneExpressions['晴'];
  const avatar = ireneMood.querySelector('.irene-avatar');
  const bubble = ireneMood.querySelector('.irene-bubble span');
  
  avatar.textContent = expression.emoji;
  bubble.textContent = expression.text;
}

/**
 * 更新当前日期
 */
function updateCurrentDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  document.getElementById('currentDate').textContent = now.toLocaleDateString('zh-CN', options);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
