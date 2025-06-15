import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../components/app-page.ts';
import '../components/page-tab.ts';
import '../components/task-list.ts';
import '../components/profile-card.ts';
import '../components/simple-button.ts';
import '../components/toggle-buttons.ts';
import type { Profile } from '../types/user.js';
import { Task } from '../types/task.js';

@customElement('main-page')
export class MainPage extends LitElement {
  @property({ type: String }) activeTab: 'quest' | 'profile' = 'quest';
  @property({ type: Object }) user: Profile | null = null;
  @property({ type: Array }) tasks: Task[] = [];
  @state() private filter: 'all' | 'completed' | 'incomplete' = 'all';

  private get filteredTasks() {
    if (this.filter === 'completed') {
      return this.tasks.filter(t => t.completed);
    }
    if (this.filter === 'incomplete') {
      return this.tasks.filter(t => !t.completed);
    }
    return this.tasks;
  }

  render() {
    return html`
      <app-page>
        <div slot="header">
          <page-tab
            .active=${this.activeTab}
            @tab-changed=${(e: CustomEvent) => this.onTabChanged(e)}>
          </page-tab>
        </div>
        <div slot="body">
          ${this.activeTab === 'quest'
            ? html`
                <toggle-buttons
                  .options=${['All', 'Incomplete', 'Completed']}
                  .selected=${this.filterIndex}
                  @toggle-changed=${this.onToggleFilter}>
                </toggle-buttons>
                <task-list 
                  .tasks=${this.filteredTasks}
                  @edit-task=${(e: CustomEvent) => this.onEditTask(e)}>
                </task-list>
              `
            : html`<profile-card .profile=${this.user ?? undefined}></profile-card>`
          }
        </div>
        <div slot="footer">
          ${this.activeTab === 'quest'
            ? html`
                <simple-button  
                  label="Add Task" 
                  @button-clicked=${() => this.onAddTask()}>
                </simple-button>
              `
            : null
          }
        </div>
      </app-page>
    `;
  }

  private get filterIndex() {
    return this.filter === 'all' ? 0 : this.filter === 'incomplete' ? 1 : 2;
  }

  private onToggleFilter(e: CustomEvent) {
    const idx = e.detail.selected;
    this.filter = idx === 0 ? 'all' : idx === 1 ? 'incomplete' : 'completed';
  }

  private onTabChanged(e: CustomEvent) {
    this.dispatchEvent(new CustomEvent('tab-changed', { detail: e.detail, bubbles: true, composed: true }));
  }

  private onEditTask(e: CustomEvent) {
    this.dispatchEvent(new CustomEvent('edit-task', { detail: e.detail, bubbles: true, composed: true }));
  }

  private onAddTask() {
    this.dispatchEvent(new CustomEvent('add-task', { bubbles: true, composed: true }));
  }
}