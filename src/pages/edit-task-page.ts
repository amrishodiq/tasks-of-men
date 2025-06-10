import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../components/app-page.ts';
import '../components/edit-task-card.ts';
import '../components/simple-button.ts';
import type { Task } from '../types/task.js';

@customElement('edit-task-page')
export class EditTaskPage extends LitElement {
  static styles = css`
    .edit-task-page__title {
      display: inline-block;
      padding: 8px 24px;
      background: linear-gradient(180deg, #f9d976 0%, #f39c12 100%);
      border: 2px solid #b97a1a;
      border-radius: 16px;
      box-shadow: 0 4px #b97a1a, 0 2px 8px rgba(0,0,0,0.15);
      color: #ffffff;
      font-size: 20px;
      letter-spacing: 2px;
      text-shadow: 
        -1px -1px 0 #444444,  
        1px -1px 0 #444444,
        -1px  1px 0 #444444,
        1px  1px 0 #444444,
        0   -1.5px 0 #444444,
        0    1.5px 0 #444444,
        -1.5px 0   0 #444444,
        1.5px 0   0 #444444,
        1px 1px 0 #b97a1a,
        -1px -1px 1px #fff,
        0 2px 6px rgba(0,0,0,0.10);
      text-align: center;
      margin: 0;
    }
    .edit-task-page__footer {
      display: flex;
      gap: 16px;
      justify-content: center;
      align-items: center;
    }
  `;

  @property({ type: Object }) task: Task | null = null;

  render() {
    return html`
      <app-page>
        <div slot="header">
          <h2 class="edit-task-page__title">${this.task ? 'Edit Task' : 'Add Task'}</h2>
        </div>
        <div slot="body">
          <edit-task-card
            .task=${this.task ?? undefined}>
          </edit-task-card>
        </div>
        <div slot="footer" class="edit-task-page__footer">
          <simple-button
            label="Cancel"
            @button-clicked=${this.onCancel}>
          </simple-button>
          <simple-button
            label="Save"
            @button-clicked=${this.onSaveClick}>
          </simple-button>
        </div>
      </app-page>
    `;
  }

  private onCancel(e?: Event) {
    this.dispatchEvent(new CustomEvent('cancel-edit', { bubbles: true, composed: true }));
  }

  private onSaveClick() {
    const editCard = this.renderRoot.querySelector('edit-task-card') as any;
    if (editCard && typeof editCard.save === 'function') {
      editCard.save();
    }
  }
}