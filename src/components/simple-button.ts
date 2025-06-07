import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('simple-button')
export class SimpleButton extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
    }
    button {
      display: flex;
      align-items: center;
      background: linear-gradient(180deg, #f9d976 0%, #f39c12 100%);
      border: 2px solid #b97a1a;
      border-radius: 16px;
      box-shadow: 0 4px #b97a1a, 0 2px 8px rgba(0,0,0,0.15);
      color: #fff;
      font-weight: bold;
      font-size: 1rem;
      padding: 0.5em 1.2em;
      cursor: pointer;
      outline: none;
      transition: transform 0.1s;
      min-height: 48px;
      min-width: 120px;
      gap: 0.7em;
      user-select: none;
    }
    button:active {
      transform: translateY(2px);
      box-shadow: 0 2px #b97a1a;
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3em;
      margin-right: 0.5em;
    }
    .label {
      flex: 1;
      text-align: left;
    }
  `;

    @property({ type: String }) icon? = ''; // SVG string or emoji
    @property({ type: String }) label = '';

    render() {
        return html`
      <button @click="${() => this.dispatchEvent(new CustomEvent('button-clicked'))}">
        ${this.icon
                ? html`<span class="icon">${unsafeHTML(this.icon)}</span>`
                : null}
        <span class="label">${this.label}</span>
      </button>
    `;
    }
}