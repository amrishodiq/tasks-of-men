import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Race } from '../types/user.js';

const RACES: { value: Race; label: string; img: string }[] = [
  { value: 'human', label: 'Human', img: './assets/images/human.png' },
  { value: 'elf', label: 'Elf', img: './assets/images/elf.png' },
  { value: 'orc', label: 'Orc', img: './assets/images/orc.png' }
];

@customElement('race-selector')
export class RaceSelector extends LitElement {
  static styles = css`
    .race-selector__carousel {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 48px 0;
    }
    .race-selector__race {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      opacity: 0.8;
      border-radius: 12px;
      border: 4px solid transparent;
    }
    .race-selector__race--selected {
      transform: scale(1.2);
      opacity: 1;
      z-index: 1;
    }
    .race-selector__img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border-radius: 10%;
      background: #251004;
      margin-bottom: 0.5rem;
      border: 8px solid #c57021;
      transition: border-color 0.2s;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    }
    .race-selector__race--selected .race-selector__img {
      width: 110px;
      height: 110px;
      border-color: #f39c12;
    }
    .race-selector__label {
      font-weight: bold;
      font-size: 1.1em;
      text-align: center;
      margin-top: 0.2em;
    }
  `;

  @property({ type: String }) value: Race = 'human';
  @state() private selectedIndex = 0;

  firstUpdated() {
    this.selectedIndex = RACES.findIndex(r => r.value === this.value) || 0;
  }

  private selectRace(idx: number) {
    this.selectedIndex = idx;
    this.value = RACES[idx].value;
    this.dispatchEvent(new CustomEvent('race-selected', {
      detail: { race: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="race-selector__carousel">
        ${RACES.map((race, idx) => html`
          <div
            class="race-selector__race${this.selectedIndex === idx ? ' race-selector__race--selected' : ''}"
            @click=${() => this.selectRace(idx)}
            tabindex="0"
            aria-label=${race.label}
          >
            <img class="race-selector__img" src=${race.img} alt=${race.label} />
            <div class="race-selector__label">${race.label}</div>
          </div>
        `)}
      </div>
    `;
  }
}