import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('toggle-buttons')
export class ToggleButtons extends LitElement {
  static styles = css`
    .toggle-buttons {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin: 8px 24px 12px;
    }
    .toggle-buttons__button {
      padding: 8px 20px;
      border: 2px solid var(--toggle-buttons--border, #b97a1a);
      background: var(--toggle-buttons--background, #fff8e1);
      color: var(--toggle-buttons--color, #502a0c);
      border-radius: 12px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      outline: none;
    }
    .toggle-buttons__button--active {
      background: var(--toggle-buttons--active-background, #f39c12);
      color: var(--toggle-buttons--active-color, #fff);
      border-color: var(--toggle-buttons--active-border, #f39c12);
    }
  `;

  @property({ type: Array }) options: string[] = [];
  @property({ type: Number }) selected = 0;

  private select(idx: number) {
    this.selected = idx;
    this.dispatchEvent(new CustomEvent('toggle-changed', {
      detail: { selected: idx, value: this.options[idx] },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="toggle-buttons">
        ${this.options.map((opt, idx) => html`
          <button
            class="toggle-buttons__button${this.selected === idx ? ' toggle-buttons__button--active' : ''}"
            @click=${() => this.select(idx)}
            type="button"
          >${opt}</button>
        `)}
      </div>
    `;
  }
}