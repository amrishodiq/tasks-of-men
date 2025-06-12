import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './task-item.ts';
import { Task } from '../types/task.js';
import { repeat } from 'lit/directives/repeat.js';

@customElement('task-list')
export class TaskList extends LitElement {
  @property({ type: Array }) tasks: Task[] = [];

  private onEditTask(e: CustomEvent) {
    this.dispatchEvent(new CustomEvent('edit-task', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  private onDeleteTask(e: CustomEvent) {
    this.dispatchEvent(new CustomEvent('delete-task', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  private priorityValue(priority?: string) {
    if (priority === 'high') return 3;
    if (priority === 'medium') return 2;
    if (priority === 'low') return 1;
    return 0;
  }

  render() {
    // Urutkan sesuai kriteria:
    // 1. completed di bawah
    // 2. dueDate terdekat di atas
    // 3. priority: high > medium > low > undefined
    // 4. updatedAt terbaru di atas
    const sortedTasks = [...this.tasks].sort((a, b) => {
      // 1. Completed
      if (a.completed !== b.completed) return a.completed ? 1 : -1;

      // 2. Due date (yang dueDate lebih dekat di atas, kosong di bawah)
      if (a.dueDate && b.dueDate) {
        const aDue = new Date(a.dueDate).getTime();
        const bDue = new Date(b.dueDate).getTime();
        if (aDue !== bDue) return aDue - bDue;
      } else if (a.dueDate && !b.dueDate) {
        return -1;
      } else if (!a.dueDate && b.dueDate) {
        return 1;
      }

      // 3. Priority
      const aPriority = this.priorityValue(a.priority);
      const bPriority = this.priorityValue(b.priority);
      if (aPriority !== bPriority) return bPriority - aPriority;

      // 4. updatedAt (terbaru di atas)
      const aUpdated = new Date(a.updatedAt).getTime();
      const bUpdated = new Date(b.updatedAt).getTime();
      return bUpdated - aUpdated;
    });

    return html`
      ${repeat(
        sortedTasks,
        task => task.id,
        task => html`
          <task-item
            .task=${task}
            @edit-task=${(e: CustomEvent) => this.onEditTask(e)}
            @delete-task=${(e: CustomEvent) => this.onDeleteTask(e)}>
          </task-item>
        `
      )}
    `;
  }
}
