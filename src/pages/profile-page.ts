import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../components/app-page.ts';
import '../components/race-selector.ts';
import '../components/simple-button.ts';
import type { Race } from '../types/user.js';

@customElement('profile-page')
export class ProfilePage extends LitElement {
  static styles = css`
    .input-group {
      margin-top: 1.5em;
    }
    label {
      font-weight: bold;
      margin-bottom: 0.3em;
      display: block;
    }
    input {
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
          <h2>Create Your Profile</h2>
        </div>
        <div slot="body">
          <race-selector
            .value=${this.race}
            @race-selected=${(e: CustomEvent) => this._onRaceSelected(e)}>
          </race-selector>
          <div class="input-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              .value=${this.name}
              @input=${(e: Event) => this._onNameInput(e)}
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div slot="footer">
          <simple-button
            label="Save"
            @button-clicked=${this._onSave}
            .disabled=${!this.name.trim() || this.disabled}>
          </simple-button>
        </div>
      </app-page>
    `;
  }

  private _onRaceSelected(e: CustomEvent) {
    this.race = e.detail.race;
    this.dispatchEvent(new CustomEvent('race-selected', { detail: { race: this.race }, bubbles: true, composed: true }));
  }

  private _onNameInput(e: Event) {
    this.name = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('name-input', { detail: { name: this.name }, bubbles: true, composed: true }));
  }

  private _onSave() {
    this.dispatchEvent(new CustomEvent('save-user', {
      detail: { name: this.name, race: this.race },
      bubbles: true,
      composed: true
    }));
  }
}