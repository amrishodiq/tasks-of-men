import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-page')
export class AppPage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      box-sizing: border-box;      
      color: var(--app-page--color);
      background-color: var(--app-page--background);
      background-size: cover;
      background-repeat: repeat;
      background-position: center;
    }
    .header, .footer {
      min-height: 64px;
      width: 100%;
    }
    .header {
      flex-shrink: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: var(--app-page--header__background);
    }
    .header slot[name="header"] {
      display: inline-block;
      color: #4b2e0a;
      font-size: 20px;
      letter-spacing: 1px;
      text-align: center;
      margin: 0;
    }
    .body {
      flex: 1 0 auto;
      width: 100%;
      background: var(--app-page--header__background);
      border-bottom-left-radius: 36px;
      border-bottom-right-radius: 36px;
    }
    .footer {
      flex-shrink: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }
  `;

  render() {
    return html`
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    `;
  }
}