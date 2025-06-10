import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('exp-progress-bar')
export class ExpProgressBar extends LitElement {
  static styles = css`
    .exp-progress-bar {
      width: 320px;
      max-width: 320px;
      height: 18px;
      background: #e0c08a;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(80,42,12,0.08) inset;
      overflow: hidden;
      position: relative;
      margin: 8px 0;
      border: 2px solid #b97a1a;
    }
    .exp-progress-bar__fill {
      height: 100%;
      background: linear-gradient(0deg, #84f176 0%, #0caf0c 50%, #84f176 100%);
      border-radius: 12px 0 0 12px;
      transition: width 0.4s cubic-bezier(.4,2,.6,1);
      box-shadow: 0 2px 8px rgba(243,156,18,0.15) inset;
    }
    .exp-progress-bar__label {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95em;
      color: #502a0c;
      font-weight: bold;
      text-shadow: 0 1px 2px #fff8;
      pointer-events: none;
      user-select: none;
    }
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;

  render() {
    const percent = this.max > 0 ? Math.min(100, Math.round((this.value / this.max) * 100)) : 0;
    return html`
      <div class="exp-progress-bar" title="Experience">
        <div class="exp-progress-bar__fill" style="width: ${percent}%;"></div>
        <div class="exp-progress-bar__label">${this.value} / ${this.max} XP</div>
      </div>
    `;
  }
}