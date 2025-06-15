import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('simple-button')
export class SimpleButton extends LitElement {
    static styles = css`
    .simple-button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      background: var(--simple-button--background);
      border: 2px solid #b97a1a;
      border-radius: 16px;
      box-shadow: var(--simple-button--box-shadow);
      color: var(--simple-button--color);
      font-weight: bold;
      font-size: 24px;
      outline: none;
      transition: transform 0.1s;
      min-height: 48px;
      min-width: 120px;
      gap: 0.7em;
      user-select: none;
      padding-inline: 12px;
    }
    .simple-button:active {
      transform: translateY(2px);
      box-shadow: var(--simple-button__active--box-shadow);
    }
    .simple-button__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3em;
      margin-right: 0.5em;
    }
    .simple-button__label {
      flex: 1;
      text-align: center;
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
    }
  `;

    @property({ type: String }) icon? = ''; // SVG string or emoji
    @property({ type: String }) label = '';

    render() {
        return html`
      <button class="simple-button" @click="${() => this.dispatchEvent(new CustomEvent('button-clicked'))}">
        ${this.icon
                ? html`<span class="simple-button__icon">${unsafeHTML(this.icon)}</span>`
                : null}
        <span class="simple-button__label">${this.label}</span>
      </button>
    `;
    }
}