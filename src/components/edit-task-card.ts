import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Task, Priority } from '../types/task.js';

@customElement('edit-task-card')
export class EditTaskCard extends LitElement {
    static styles = css`
    .edit-task-card {
      border-radius: 12px;
      background: linear-gradient(180deg, #f9d976 0%, #f39c12 100%);
      box-shadow: 0 4px #b97a1a, 0 2px 4px rgba(0,0,0,0.15);
      padding: 1.5rem;
      max-width: 400px;
      margin: 0 12px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .edit-task-card__label {
      color: #502a0c;
      font-weight: bold;
      margin-bottom: 0.2em;
      display: block;
    }
    .edit-task-card__input,
    .edit-task-card__textarea,
    .edit-task-card__select {
      width: 100%;
      padding: 0.5em;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 1em;
      margin-bottom: 0.5em;
      box-sizing: border-box;
    }
    .edit-task-card__actions {
      display: flex;
      gap: 1em;
      justify-content: flex-end;
    }
    .edit-task-card__inline-row {
      display: flex;
    }
    .edit-task-card__inline-row input[type="checkbox"] {
      margin-inline-start: auto;
      flex: 0;
    }
    .edit-task-card__checkbox {
      -webkit-appearance: none;
      appearance: none;
      background-color: #f39c12;
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
    .edit-task-card__checkbox::before {
      content: "";
      width: 24px;
      height: 24px;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em #502a0c;
      background-color: CanvasText;
      transform-origin: bottom left;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }
    .edit-task-card__checkbox:checked::before {
      transform: scale(1);
    }
  `;

    @property({ type: Object }) task?: Task;

    @state() private editedTask: Task = this.task ?? {
        id: '',
        title: '',
        description: '',
        completed: false,
        createdAt: '',
        updatedAt: ''
    };

    updated(changedProps: Map<string, unknown>) {
        if (changedProps.has('task') && this.task) {
            this.editedTask = { ...this.task };
        }
    }

    private handleInput(e: Event) {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const { name, value, type } = target;
        this.editedTask = {
            ...this.editedTask,
            [name]: type === 'checkbox'
                ? (target instanceof HTMLInputElement ? target.checked : false)
                : value
        };
    }

    public save() {
        this.dispatchEvent(new CustomEvent('save-task', {
            detail: { task: this.editedTask },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const t = this.editedTask;
        return html`
      <div class="edit-task-card">
        <div>
          <label class="edit-task-card__label" for="title">Title</label>
          <input id="title" name="title" class="edit-task-card__input" .value=${t.title} @input=${this.handleInput} required />
        </div>
        <div>
          <label class="edit-task-card__label" for="description">Description</label>
          <textarea id="description" name="description" class="edit-task-card__textarea" .value=${t.description} @input=${this.handleInput}></textarea>
        </div>
        <div>
          <label class="edit-task-card__label" for="dueDate">Due Date</label>
          <input id="dueDate" name="dueDate" type="date" class="edit-task-card__input" .value=${t.dueDate ?? ''} @input=${this.handleInput} />
        </div>
        <div>
          <label class="edit-task-card__label" for="priority">Priority</label>
          <select id="priority" name="priority" class="edit-task-card__select" .value=${t.priority ?? ''} @change=${this.handleInput}>
            <option value="">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label class="edit-task-card__inline-row edit-task-card__label">
            Completed
            <input type="checkbox" name="completed" class="edit-task-card__checkbox" .checked=${t.completed} @change=${this.handleInput} />
          </label>
        </div>
      </div>
    `;
    }
}