import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

@customElement('icon-button')
export class IconButton extends LitElement {
  @property() path: string = '';

  static styles = [
    css`
      button {
        flex: 1;
        min-height: 44px;
        font-size: 16px;
        border: none;
        border-radius: 22px;
        cursor: pointer;
        transition: background 0.2s;
        background: var(--background-default-button);
        color: var(--color-default-button);
      }
        .icon-button {
            width: 44px;
            height: 44px;
            background: var(--background-default-icon-button);
        }
        .icon-button > svg {
            width: 24px;
            height: 24px;
            object-fit: contain;
            pointer-events: none;
        }
    `
  ];

  render() {
    return html`
      <button class="icon-button">
        ${unsafeSVG(this.path)}
      </button>
    `;
  }
}