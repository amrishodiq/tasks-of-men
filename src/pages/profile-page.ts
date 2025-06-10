import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../components/app-page.ts';
import '../components/race-selector.ts';
import '../components/simple-button.ts';
import type { Race } from '../types/user.js';

@customElement('profile-page')
export class ProfilePage extends LitElement {
  static styles = css`
    .profile-page__title {
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
    .profile-page__input-group {
      margin: 0 24px;
    }
    .profile-page__label {
      font-weight: bold;
      margin-bottom: 0.3em;
      display: block;
    }
    .profile-page__input {
      width: 100%;
      padding: 0.5em;
      font-size: 1em;
      border-radius: 6px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
  `;

  @property({ type: String }) name: string = '';
  @property({ type: String }) race: Race = 'human';
  @property({ type: Boolean }) disabled: boolean = false;

  render() {
    return html`
      <app-page>
        <div slot="header">
          <h2 class="profile-page__title">Create Your Profile</h2>
        </div>
        <div slot="body">
          <race-selector
            .value=${this.race}
            @race-selected=${(e: CustomEvent) => this.onRaceSelected(e)}>
          </race-selector>
          <div class="profile-page__input-group">
            <label class="profile-page__label" for="name">Name</label>
            <input
              id="name"
              class="profile-page__input"
              type="text"
              .value=${this.name}
              @input=${(e: Event) => this.onNameInput(e)}
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div slot="footer">
          <simple-button
            label="Save"
            @button-clicked=${this.onSave}
            .disabled=${!this.name.trim() || this.disabled}>
          </simple-button>
        </div>
      </app-page>
    `;
  }

  private onRaceSelected(e: CustomEvent) {
    this.race = e.detail.race;
    this.dispatchEvent(new CustomEvent('race-selected', { detail: { race: this.race }, bubbles: true, composed: true }));
  }

  private onNameInput(e: Event) {
    this.name = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('name-input', { detail: { name: this.name }, bubbles: true, composed: true }));
  }

  private onSave() {
    this.dispatchEvent(new CustomEvent('save-user', {
      detail: { name: this.name, race: this.race },
      bubbles: true,
      composed: true
    }));
  }
}