import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('task-item')
export class TaskItem extends LitElement {
  @property({ type: Object }) 
  task: { id: number; title: string } = {
    id: 0,
    title: ''
  };

  render() {
    return html`<div class="task">${this.task.title}</div>`;
  }

  static styles = css`
    .task {
      border: 1px solid #ccc;
      padding: 0.5rem;
      margin: 0.5rem 0;
    }
  `;
}
