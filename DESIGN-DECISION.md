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

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-page')
export class AppPage extends LitElement {
  static styles = css`
    ...
  `;

  render() {
    return html`
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    `;
  }
}

...

@customElement('edit-task-page')
export class EditTaskPage extends LitElement {
  static styles = css`
    ...
  `;

  @property({ type: Object }) task: Task | null = null;

  render() {
    return html`
      <app-page>
        <div slot="header">
          <h2 class="edit-task-page__title">${this.task ? 'Edit Task' : 'Add Task'}</h2>
        </div>
        <div slot="body">
          <edit-task-card
            .task=${this.task ?? undefined}>
          </edit-task-card>
        </div>
        <div slot="footer" class="edit-task-page__footer">
          <simple-button
            label="Cancel"
            @button-clicked=${this.onCancel}>
          </simple-button>
          <simple-button
            label="Save"
            @button-clicked=${this.onSaveClick}>
          </simple-button>
        </div>
      </app-page>
    `;
  }

  ...
}
```

Note that:
- We build components as the building blocks for larger components.
- The `EditTaskPage` component (`edit-task-page`) is composed of smaller components: `app-page`, `edit-task-card`, and `simple-button`.


---

## 2. Module Pattern

**Purpose:**  
To organize business logic, utilities, and data structures in separate modules, promoting code reusability and separation of concerns.

**Basic Structure:**  
Modules in JavaScript/TypeScript isolates private variables and functions and share public API. The purpose is to prevent the module from global polution.

**Where Used:**  
- Task manager: `src/modules/task-manager.ts`
- User manager: `src/modules/user-manager.ts`

**Example:**
```typescript
// src/modules/task-manager.js
export const TaskManager = (() => {
  let tasks: Task[] = DataStorage.loadTasks();

  function getTasks() {
    return tasks;
  }

  function addTask(task: Task): void {
    tasks.push(task);
    DataStorage.saveTasks(tasks);
  }

  function deleteTask(id: String): void {
    tasks = tasks.filter(task => task.id !== id);
    DataStorage.saveTasks(tasks);
  }

  function updateTask(updatedTask: Task): void {
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    DataStorage.saveTasks(tasks);
  }

  return {
    getTasks,
    addTask,
    deleteTask,
    updateTask
  };
})();
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

## 4. Git Flow and Semantic Versioning

**Purpose:**
To educate developers for good discipline and constency in branch and version naming.

**References:**
[Git Flow Cheat Sheet](https://danielkummer.github.io/git-flow-cheatsheet/)
[Semantic Versioning Cheat Sheet](https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/other/semvar.html)

---

## Summary

- **Component-Based Pattern** is used for UI structure and encapsulation.
- **Module Pattern** is used for business logic, utilities, and types.
- **BEM** is used for CSS class naming to ensure clarity and scalability.

This combination ensures the project is easy to maintain, extend, and collaborate on.