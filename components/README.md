# Components 目录

此目录包含技能展示平台的可复用组件模板。

## 组件清单

### SkillCard
技能卡片组件，用于首页技能网格展示。

**文件**:
- `SkillCard.html` - HTML模板
- `SkillCard.css` - 样式 (位于 css/components/)
- `SkillCard.js` - 交互逻辑 (位于 js/components/)

**特性**:
- 悬停发光效果
- 微动效 (translateY + scale)
- 图标旋转动画
- 技能标签显示

### SkillDetail
技能详情页框架组件。

**文件**:
- `SkillDetail.html` - HTML模板
- `SkillDetail.css` - 样式
- `SkillDetail.js` - 页面逻辑

**特性**:
- 全屏过渡动画
- Hero区域
- 功能特性网格
- 演示区域容器
- 相关技能推荐

### DemoArea
演示区域组件，每个技能详情页的核心交互区。

**文件**:
- `DemoArea.html` - HTML模板
- `DemoArea.css` - 样式
- `DemoArea.js` - 演示逻辑

**特性**:
- 打字机效果
- 加载动画
- 交互式输入
- 结果展示

### IreneMood
Irene表情组件，随交互状态变化。

**文件**:
- `IreneMood.html` - HTML模板
- `IreneMood.css` - 样式
- `IreneMood.js` - 状态管理

**特性**:
- 多表情状态
- 动画效果
- 自动状态切换

## 使用方式

1. 复制模板文件到目标位置
2. 根据技能配置修改数据
3. 引入对应的CSS和JS文件
4. 初始化组件

## 命名规范

- CSS类名: `kebab-case` (如 `skill-card`)
- JS类名: `PascalCase` (如 `SkillCard`)
- 文件命名: 与类名一致
- 数据属性: `data-skill-id`
