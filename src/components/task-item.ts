import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Task } from '../types/task.js';
import './icon-button.ts';
import deleteIcon from '../assets/delete.svg?raw';
import { formatDueIn } from '../utils/string-utils.js';

@customElement('task-item')
export class TaskItem extends LitElement {
  @property({ type: Object }) task!: Task;

  static styles = css`
    .task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 8px 24px;
      background: var(--task-item--background);
      box-shadow: var(--task-item--box-shadow);
      border-radius: 8px;      
      padding-inline: 12px;
    }
    .task-item__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-block: 8px;
    }
    .task-item__title {
      flex: 1;
      text-decoration: var(--completed, none);
      color: var(--task-item__title--color);
      font-size: 18px;
    }
    .task-item__due {
      font-size: 14px;
      color: var(--task-item__due--color);
    }
    .task-item--completed {
      opacity: .5;
    }    
    .task-item__checkbox {
      -webkit-appearance: none;
      appearance: none;
      background-color: var(--task-item__checkbox--background);
      margin: 0;
      font: inherit;
      color: #ffffff;
      width: 24px;
      height: 24px;
      border: var(--task-item__checkbox--border);
      border-radius: 12px;
      transform: translateY(-0.075em);
      display: grid;
      place-content: center;
    }
    .task-item__checkbox::before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em #502a0c;
      background-color: CanvasText;
      transform-origin: bottom left;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }
    .task-item__checkbox:checked::before {
      transform: scale(1);
    }
  `;

  private onToggleCompleted(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.dispatchEvent(new CustomEvent('toggle-completed', {
      detail: { ...this.task, completed: checked, updatedAt: new Date().toISOString() },
      bubbles: true,
      composed: true
    }));
  }

  private onDelete(e: Event) {
    e.stopPropagation(); // Agar tidak memicu edit-task
    this.dispatchEvent(new CustomEvent('delete-task', {
      detail: { id: this.task.id },
      bubbles: true,
      composed: true
    }));
  }

  private onClick() {
    this.dispatchEvent(new CustomEvent('edit-task', {
      detail: { task: this.task },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const dueIn = formatDueIn(this.task.dueDate);

    return html`
      <div
        class="task-item${this.task.completed ? ' task-item--completed' : ''}" 
        style=${this.task.completed ? '--completed:line-through;--completed-color:#aaa;' : ''}
        @click=${this.onClick}
      >
        <input
          type="checkbox"
          class="task-item__checkbox"
          .checked=${this.task.completed}
          @change=${this.onToggleCompleted}
          @click=${(e: Event) => e.stopPropagation()}
          title="Mark as completed"
        />
        <div class="task-item__content">
          <span class="task-item__title">${this.task.title}</span>
          ${dueIn ? html`<span class="task-item__due">${dueIn}</span>` : ''}
        </div>        
        <icon-button path="${deleteIcon}" @click=${this.onDelete}></icon-button>
      </div>
    `;
  }
}