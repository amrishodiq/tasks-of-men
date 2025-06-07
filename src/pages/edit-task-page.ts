import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../components/app-page.ts';
import '../components/edit-task-card.ts';
import '../components/simple-button.ts';
import type { Task } from '../types/task.js';

@customElement('edit-task-page')
export class EditTaskPage extends LitElement {
  @property({ type: Object }) task: Task | null = null;

  render() {
    return html`
      <app-page>
        <div slot="header">
          <h2>${this.task ? 'Edit Task' : 'Add Task'}</h2>
        </div>
        <div slot="body">
          <edit-task-card
            .task=${this.task ?? undefined}>
          </edit-task-card>
        </div>
        <div slot="footer">
          <simple-button
            label="Cancel"
            @button-clicked=${this._onCancel}>
          </simple-button>
          <simple-button
            label="Save"
            @button-clicked=${this._onSaveClick}>
          </simple-button>
        </div>
      </app-page>
    `;
  }

  private _onCancel(e?: Event) {
    this.dispatchEvent(new CustomEvent('cancel-edit', { bubbles: true, composed: true }));
  }

  private _onSaveClick() {
    const editCard = this.renderRoot.querySelector('edit-task-card') as any;
    if (editCard && typeof editCard.save === 'function') {
      editCard.save();
    }
  }
}