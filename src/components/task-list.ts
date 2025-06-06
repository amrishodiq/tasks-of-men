import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { taskManager } from '../modules/taskManager.js';
import './task-item.ts';

@customElement('task-list')
export class TaskList extends LitElement {
  @state() 
  private tasks = taskManager.getTasks();

  render() {
    return html`
      ${this.tasks.map(
        (task) => html`<task-item .task=${task}></task-item>`
      )}
    `;
  }
}
