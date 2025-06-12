# DESIGN DECISION

This document describes the main design patterns and CSS methodology used in the **Tasks of Men** project.

---

## 1. Component-Based Pattern

**Purpose:**  
To build the UI as a collection of reusable, encapsulated, and independent components, making the codebase modular, maintainable, and scalable.

**Basic Structure:**  
Each UI part is implemented as a custom element (Web Component) using Lit. Components manage their own state, rendering, and events.

**Where Used:**  
All UI elements/pages are implemented as components in the `src/components/` and `src/pages/` folders.

**Example:**
```typescript
// src/components/simple-button.ts
@customElement('simple-button')
export class SimpleButton extends LitElement {
  // ...
  render() {
    return html`<button class="simple-button"><slot></slot></button>`;
  }
}
```

---

## 2. Module Pattern

**Purpose:**  
To organize business logic, utilities, and data structures in separate modules, promoting code reusability and separation of concerns.

**Basic Structure:**  
Modules are plain JavaScript/TypeScript files exporting functions, classes, or constants.

**Where Used:**  
- Utility functions: `src/modules/leveling-system.js`
- Type definitions: `src/types/task.js`, `src/types/user.js`
- Helpers: `src/utils/string-utils.js`

**Example:**
```typescript
// src/modules/leveling-system.js
export function getLevelFromXp(xp: number): number { /* ... */ }
export function xpForLevel(level: number): number { /* ... */ }
```

---

## 3. CSS Methodology: Block Element Modifier (BEM)

**Purpose:**  
To keep CSS class naming consistent, readable, and maintainable, especially for large projects with many components.

**Basic Structure:**  
- **Block:** The main component (`profile-card`)
- **Element:** A part of the block (`profile-card__avatar`)
- **Modifier:** A variant or state (`profile-card__avatar--large`)

**Where Used:**  
All CSS classes in components use BEM naming.

**Example:**
```css
/* src/components/profile-card.ts */
.profile-card { ... }
.profile-card__avatar { ... }
.profile-card__level { ... }
.profile-card__avatar--large { ... }
```

---

## Summary

- **Component-Based Pattern** is used for UI structure and encapsulation.
- **Module Pattern** is used for business logic, utilities, and types.
- **BEM** is used for CSS class naming to ensure clarity and scalability.

This combination ensures the project is easy to maintain, extend, and collaborate on.