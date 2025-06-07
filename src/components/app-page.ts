import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-page')
export class AppPage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .header, .footer {
      min-height: 64px;
      width: 100%;
    }
    .body {
      flex: 1 0 auto;
      width: 100%;
    }
    .footer {
      flex-shrink: 0;
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