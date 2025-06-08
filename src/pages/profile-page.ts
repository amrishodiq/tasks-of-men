import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../components/app-page.ts';
import '../components/race-selector.ts';
import '../components/simple-button.ts';
import type { Race } from '../types/user.js';

@customElement('profile-page')
export class ProfilePage extends LitElement {
  static styles = css`
    h2 {
      display: inline-block;
      padding: 8px 24px;
      background: linear-gradient(180deg, #f9d976 0%, #f39c12 100%);
      border: 2px solid #b97a1a;
      border-radius: 16px;
      box-shadow: 0 4px #b97a1a, 0 2px 8px rgba(0,0,0,0.15);
      color: #ffffff;
      font-size: 20px;
      letter-spacing: 1px;
      text-shadow: 
        -1px -1px 0 #444444,  
        1px -1px 0 #444444,
        -1px  1px 0 #444444,
        1px  1px 0 #444444,
        0   -1.5px 0 #444444,
        0    1.5px 0 #444444,
        -1.5px 0   0 #444444,
        1.5px 0   0 #444444,
        1px 1px 0 #b97a1a,      /* bayangan gelap bawah kanan */
        -1px -1px 1px #fff,     /* highlight terang atas kiri */
        0 2px 6px rgba(0,0,0,0.10); /* drop shadow halus */
      letter-spacing: 2px;
      text-align: center;
      margin: 0;
    }
    .header-title {
      margin-block: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .input-group {
      margin: 0 24px;
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
          <h2 class="header-title">Create Your Profile</h2>
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