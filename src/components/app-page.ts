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
      color: #f9f3e8; /* Warna teks terang */
      /* Background cokelat bertekstur kayu */
      background-color: var(--background-app-page--base);
      /* background-image: url('/assets/images/wood-background-1.png'); */
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
      background: var(--background-app-page--layer-1);
    }
    .header slot[name="header"] {
      display: inline-block;
      /* padding: 8px 12px; */
      /* background: linear-gradient(180deg, #c49a6c 80%, #8d6748 100%); */
      /* border-radius: 18px; */
      /* border: 4px solid #7a4a1a; */
      color: #4b2e0a;
      font-size: 20px;
      letter-spacing: 1px;
      /* box-shadow:
        0 2px 8px rgba(60,32,10,0.18),
        inset 0 2px 8px #fff4,
        inset 0 -4px 12px #7a4a1a99; */
      /* text-shadow:
        1px 1px 0 #fff8,
        2px 2px 2px #7a4a1a,
        0 2px 8px #0006,
        0 0 2px #fff8; */
      text-align: center;
      margin: 0;
      /* Efek ukiran */
      /* filter: brightness(0.97) contrast(1.08); */
    }
    .body {
      flex: 1 0 auto;
      width: 100%;
      background: var(--background-app-page--layer-1);
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