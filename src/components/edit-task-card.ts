import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Task, Priority } from '../types/task.js';

@customElement('edit-task-card')
export class EditTaskCard extends LitElement {
    static styles = css`
    .card {
      background: #fffbe6;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      padding: 1.5rem;
      max-width: 400px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    label {
      font-weight: bold;
      margin-bottom: 0.2em;
      display: block;
    }
    input, textarea, select {
      width: 100%;
      padding: 0.5em;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 1em;
      margin-bottom: 0.5em;
      box-sizing: border-box;
    }
    .actions {
      display: flex;
      gap: 1em;
      justify-content: flex-end;
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
        const { name, value, type, checked } = target;
        this.editedTask = {
            ...this.editedTask,
            [name]: type === 'checkbox' ? checked : value
        };
    }

    public save() {
        this.dispatchEvent(new CustomEvent('save-task', {
            detail: { task: this.editedTask },
            bubbles: true,
            composed: true
        }));
    }

    private cancel() {
        this.dispatchEvent(new CustomEvent('cancel-edit', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const t = this.editedTask;
        return html`
      <div class="card">
        <div>
          <label for="title">Title</label>
          <input id="title" name="title" .value=${t.title} @input=${this.handleInput} required />
        </div>
        <div>
          <label for="description">Description</label>
          <textarea id="description" name="description" .value=${t.description} @input=${this.handleInput}></textarea>
        </div>
        <div>
          <label for="dueDate">Due Date</label>
          <input id="dueDate" name="dueDate" type="date" .value=${t.dueDate ?? ''} @input=${this.handleInput} />
        </div>
        <div>
          <label for="priority">Priority</label>
          <select id="priority" name="priority" .value=${t.priority ?? ''} @change=${this.handleInput}>
            <option value="">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>
            <input type="checkbox" name="completed" .checked=${t.completed} @change=${this.handleInput} />
            Completed
          </label>
        </div>
      </div>
    `;
    }
}