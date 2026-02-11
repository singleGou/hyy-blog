## BEM

三要素：

| 要素                  | 符号            | 含义                                           | 命名规则示例                        |
| :-------------------- | :-------------- | :--------------------------------------------- | :---------------------------------- |
| **Block (块)**        | 无              | 独立的、可复用的功能单元（如：菜单、卡片）     | `.menu`, `.card`                    |
| **Element (元素)**    | `__` (双下划线) | 块的组成部分，不能脱离块独立存在（如：菜单项） | `.menu__item`, `.card__title`       |
| **Modifier (修饰符)** | `--` (双连字符) | 描述块或元素的状态或变体（如：禁用、高亮）     | `.menu--vertical`, `.btn--disabled` |

示例：

```html
<div class="user-card user-card--vip"> <!-- Block + Modifier -->
  <img class="user-card__avatar" src="avatar.jpg" alt="头像"> <!-- Element -->
  <h3 class="user-card__name">张三</h3> <!-- Element -->
  <button class="user-card__button user-card__button--primary">
    关注
  </button> <!-- Element + Modifier -->
  <button class="user-card__button user-card__button--disabled">
    已关注
  </button> <!-- Element + Modifier -->
</div>
```

使用 scss 等预处理器写法更直观：

```scss
.user-card {
  padding: 16px;
  border: 1px solid #ddd;
  
  // Modifier: VIP 状态
  &--vip {
    border-color: gold;
  }

  // Element: 头像
  &__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  // Element: 按钮
  &__button {
    padding: 8px 12px;
    margin-right: 8px;
    
    // Modifier: 主要按钮
    &--primary {
      background-color: #007bff;
      color: white;
    }
    
    // Modifier: 禁用按钮
    &--disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
```

### 常见误区

#### 避免深层嵌套命名：

```html
<!-- 错误：层级过深，违反了 BEM 的扁平化原则 -->
<div class="header">
  <div class="header__nav">
    <div class="header__nav__list"> 
      <!-- 这里不应该出现三层嵌套 -->
    </div>
  </div>
</div>
```

**正确做法：**
保持扁平化。如果 `list` 是 `nav` 的一部分，直接命名为 `.header__list`，或者将 `nav` 提升为一个独立的 Block（`.nav`）

#### 避免语义化过强的单词

不要使用 `left`、`red` 这种描述外观的词，因为需求变更时，左边的按钮可能变到右边，红色可能变成蓝色。

- **不推荐：** `.btn--red`
- **推荐：** `.btn--danger` 或 `.btn--primary`14

#### 推荐结合 CSS 预处理器

使用 Sass/SCSS 或 Less 可以极大地简化 BEM 的书写，避免手写冗长的类名，利用 `&` 符号嵌套书写，既保持了结构清晰，又减少了重复代码

### 总结

BEM 本质上是一种**约定优于配置**的开发思想

- **什么时候用？** 当你开发组件库、大型项目或者需要多人协作维护的项目时，BEM 是首选
- **什么时候不用？** 如果你只是写一个简单的单页活动页，或者使用了 CSS-in-JS、Vue Scoped CSS 等具备天然作用域隔离的方案，BEM 的严格命名可能显得有些冗余