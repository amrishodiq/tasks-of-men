import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Task } from '../types/task.js';
import './icon-button.ts';
import deleteIcon from '../assets/delete.svg?raw';

@customElement('task-item')
export class TaskItem extends LitElement {
  @property({ type: Object }) task!: Task;

  static styles = css`
    .task-row {
      display: flex;
      align-items: center;
      gap: 0.7em;
      padding: 0.5em 0;
    }
    .title {
      flex: 1;
      text-decoration: var(--completed, none);
      color: var(--completed-color, inherit);
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

  private _onDelete(e: Event) {
    e.stopPropagation(); // Agar tidak memicu edit-task
    this.dispatchEvent(new CustomEvent('delete-task', {
      detail: { id: this.task.id },
      bubbles: true,
      composed: true
    }));
  }

  private _onClick() {
    this.dispatchEvent(new CustomEvent('edit-task', {
      detail: { task: this.task },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="task-row" 
        style=${this.task.completed ? '--completed:line-through;--completed-color:#aaa;' : ''}
        @click=${this._onClick}>
        <input
          type="checkbox"
          .checked=${this.task.completed}
          @change=${this.onToggleCompleted}
          @click=${(e: Event) => e.stopPropagation()}
          title="Mark as completed"
        />
        <span class="title">${this.task.title}</span>
        <icon-button path="${deleteIcon}" @click=${this._onDelete}></icon-button>
      </div>
    `;
  }
}