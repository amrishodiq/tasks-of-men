import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Task, Priority } from '../types/task.js';

@customElement('edit-task-card')
export class EditTaskCard extends LitElement {
    static styles = css`
    .card {
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
    label {
      color: #502a0c;
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
    .inline-row {
      display: flex;
    }

    .inline-row input[type="checkbox"] {
      margin-inline-start: auto;
      flex: 0;
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
          <label class="inline-row">
            Completed
            <input type="checkbox" name="completed" .checked=${t.completed} @change=${this.handleInput} />
          </label>
        </div>
      </div>
    `;
    }
}