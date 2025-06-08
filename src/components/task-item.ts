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
      gap: 12px;
      margin: 8px 24px;
      background: linear-gradient(180deg, #f9d976 0%, #f39c12 100%);
      box-shadow: 0 4px #b97a1a, 0 2px 4px rgba(0,0,0,0.15);
      border-radius: 8px;      
      padding-inline: 12px;
    }
    .task-row.completed {
      opacity: .5;
    }
    .title {
      flex: 1;
      text-decoration: var(--completed, none);
      color: #502a0c;
      font-size: 16px;
    }
    input[type="checkbox"] {
      /* Add if not using autoprefixer */
      -webkit-appearance: none;
      appearance: none;
      /* For iOS < 15 to remove gradient background */
      background-color: #f39c12;
      /* Not removed via appearance */
      margin: 0;
      font: inherit;
      color: #ffffff;
      width: 24px;
      height: 24px;
      border: 4px solid #ffffff;
      border-radius: 12px;
      transform: translateY(-0.075em);
      display: grid;
      place-content: center;
    }
    input[type="checkbox"]::before {
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
    input[type="checkbox"]:checked::before {
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
      <div class="task-row ${this.task.completed?'completed':''}" 
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