import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('page-tab')
export class PageTab extends LitElement {
    static styles = css`
    .tab-bar {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      background: #f9d976;
      padding: 0.5rem 0;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      margin-bottom: 1rem;
    }
    button {
      background: none;
      border: none;
      font-size: 1.1em;
      font-weight: bold;
      color: #b97a1a;
      padding: 0.7em 2em;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    button.active {
      background: linear-gradient(180deg, #f9d976 0%, #f39c12 100%);
      color: #fff;
      box-shadow: 0 2px 8px rgba(243,156,18,0.15);
    }
  `;

    @property({ type: String }) active: 'quest' | 'profile' = 'quest';

    private select(tab: 'quest' | 'profile') {
        this.active = tab;
        this.dispatchEvent(new CustomEvent('tab-changed', {
            detail: { tab },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
      <div class="tab-bar">
        <button
          class=${this.active === 'quest' ? 'active' : ''}
          @click=${() => this.select('quest')}
        >Quest</button>
        <button
          class=${this.active === 'profile' ? 'active' : ''}
          @click=${() => this.select('profile')}
        >Profile</button>
      </div>
    `;
    }
}