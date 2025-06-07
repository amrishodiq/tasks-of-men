import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../pages/profile-page.js';
import '../pages/edit-task-page.ts';
import '../pages/main-page.ts';
import { TaskManager } from '../modules/task-manager.js';
import { UserManager } from '../modules/user-manager.js';
import type { Task } from '../types/task.js';
import type { Profile, Race } from '../types/user.js';
import { getTaskExperience } from '../modules/leveling-system.js';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: sans-serif;
    }
  `;

  // Start of State
  @state() private showEditTask = false;
  @state() private editingTask: Task | null = null;
  @state() private user: Profile | null = UserManager.getUser();
  @state() private newUserName: string = '';
  @state() private newUserRace: Race = 'human';
  @state() private activeTab: 'quest' | 'profile' = 'quest';
  @state() private tasks: Task[] = TaskManager.getTasks();
  // End of State

  private get isProfileMode() {
    return !this.user;
  }

  private get isEditTaskMode() {
    return this.showEditTask;
  }

  // Start of Event Handlers
  private handleTabChanged(e: CustomEvent) {
    this.activeTab = e.detail.tab;
  }

  private handleAddTask() {
    this.editingTask = null;
    this.showEditTask = true;
  }

  private handleEditTask(e: CustomEvent) {
    this.editingTask = e.detail.task;
    this.showEditTask = true;
  }

  private handleCancelEdit() {
    this.showEditTask = false;
    this.editingTask = null;
  }

  private handleToggleCompleted(e: CustomEvent) {
    const updatedTask = e.detail;
    TaskManager.updateTask(updatedTask);
    this.tasks = TaskManager.getTasks();
    
    // Tambahkan experience jika task selesai
    if (updatedTask.completed && this.user) {
      const exp = getTaskExperience(updatedTask);
      const newUser = { ...this.user, totalExperience: this.user.totalExperience + exp };
      UserManager.setUser(newUser);
      this.user = newUser;
    }

    if (!updatedTask.completed && this.user) {
      // Jika task diralat jadi tidak selesai, kurangi experience
      const newUser = { ...this.user, totalExperience: this.user.totalExperience - getTaskExperience(updatedTask) };
      UserManager.setUser(newUser);
      this.user = newUser;
    }

    this.requestUpdate();
  }

  private handleSaveTask(e: CustomEvent) {
    const task = e.detail.task;

    if (this.editingTask) {
      TaskManager.updateTask(task);
    } else {
      task.id = crypto.randomUUID();
      task.createdAt = new Date().toISOString();
      task.updatedAt = new Date().toISOString();
      task.completed = false;
      task.userId = this.user?.id || '';
      TaskManager.addTask(task);
    }
    this.tasks = TaskManager.getTasks();
    this.showEditTask = false;
    this.editingTask = null;
  }

  private handleRaceSelected(e: CustomEvent) {
    this.newUserRace = e.detail.race;
  }

  private handleNameInput(e: CustomEvent) {
    this.newUserName = e.detail.name;
  }

  private handleSaveUser(e: CustomEvent) {
    const user: Profile = {
      id: crypto.randomUUID(),
      name: e.detail.name,
      race: e.detail.race,
      role: 'default',
      avatarUrl: '',
      totalExperience: 0
    };
    UserManager.setUser(user);
    this.user = user;
  }

  private handleDeleteTask(e: CustomEvent) {
    // Mungkin perlu konfirmasi sebelum menghapus
    TaskManager.deleteTask(e.detail.id);
    this.tasks = TaskManager.getTasks();
  }
  // End of Event Handlers

  private renderProfilePage() {
    return html`
      <profile-page
        .name=${this.newUserName}
        .race=${this.newUserRace}
        @name-input=${this.handleNameInput}
        @race-selected=${this.handleRaceSelected}
        @save-user=${this.handleSaveUser}>
      </profile-page>
    `;
  }

  private renderEditTaskPage() {
    return html`
      <edit-task-page
        .task=${this.editingTask}
        @cancel-edit=${this.handleCancelEdit}
        @save-task=${this.handleSaveTask}>
      </edit-task-page>
    `;
  }

  private renderMainPage() {
    return html`
      <main-page
        .activeTab=${this.activeTab}
        .user=${this.user}
        .tasks=${this.tasks}
        @tab-changed=${this.handleTabChanged}
        @edit-task=${this.handleEditTask}
        @add-task=${this.handleAddTask}
        @toggle-completed=${this.handleToggleCompleted}
        @delete-task=${this.handleDeleteTask}>
      </main-page>
    `;
  }

  render() {
    if (this.isProfileMode) return this.renderProfilePage();
    if (this.isEditTaskMode) return this.renderEditTaskPage();
    return this.renderMainPage();
  }
}