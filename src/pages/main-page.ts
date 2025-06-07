import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../components/app-page.ts';
import '../components/page-tab.ts';
import '../components/task-list.ts';
import '../components/profile-card.ts';
import '../components/simple-button.ts';
import type { Profile } from '../types/user.js';
import { Task } from '../types/task.js';

@customElement('main-page')
export class MainPage extends LitElement {
  @property({ type: String }) activeTab: 'quest' | 'profile' = 'quest';
  @property({ type: Object }) user: Profile | null = null;
  @property({ type: Array }) tasks: Task[] = [];

  render() {
    return html`
      <app-page>
        <div slot="header">
          <page-tab
            .active=${this.activeTab}
            @tab-changed=${(e: CustomEvent) => this._onTabChanged(e)}>
          </page-tab>
        </div>
        <div slot="body">
          ${this.activeTab === 'quest'
            ? html`<task-list 
                .tasks=${this.tasks}
                @edit-task=${(e: CustomEvent) => this._onEditTask(e)}
                @delete-task=${this._onDeleteTask}></task-list>`
            : html`<profile-card .profile=${this.user}></profile-card>`
          }
        </div>
        <div slot="footer">
          ${this.activeTab === 'quest'
            ? html`
                <simple-button  
                  label="Add Task" 
                  @button-clicked=${() => this._onAddTask()}>
                </simple-button>
              `
            : null
          }
        </div>
      </app-page>
    `;
  }

  private _onTabChanged(e: CustomEvent) {
    this.dispatchEvent(new CustomEvent('tab-changed', { detail: e.detail, bubbles: true, composed: true }));
  }

  private _onEditTask(e: CustomEvent) {
    this.dispatchEvent(new CustomEvent('edit-task', { detail: e.detail, bubbles: true, composed: true }));
  }

  private _onAddTask() {
    this.dispatchEvent(new CustomEvent('add-task', { bubbles: true, composed: true }));
  }

  private _onDeleteTask(e: CustomEvent) {
    // this.dispatchEvent(new CustomEvent('delete-task', {
    //   detail: e.detail,
    //   bubbles: true,
    //   composed: true
    // }));
  }
}