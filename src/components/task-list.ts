import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './task-item.ts';
import { Task } from '../types/task.js';
import { repeat } from 'lit/directives/repeat.js';

@customElement('task-list')
export class TaskList extends LitElement {
  @property({ type: Array }) tasks: Task[] = [];

  private _onEditTask(e: CustomEvent) {
    this.dispatchEvent(new CustomEvent('edit-task', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  private _onDeleteTask(e: CustomEvent) {
    this.dispatchEvent(new CustomEvent('delete-task', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    // Urutkan: yang belum completed di atas, yang completed di bawah
    const sortedTasks = [...this.tasks].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });

    return html`
      ${repeat(
        sortedTasks,
        task => task.id,
        task => html`
          <task-item
            .task=${task}
            @edit-task=${(e: CustomEvent) => this._onEditTask(e)}
            @delete-task=${(e: CustomEvent) => this._onDeleteTask(e)}>
          </task-item>
        `
      )}
    `;
  }
}
