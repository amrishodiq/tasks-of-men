import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('page-tab')
export class PageTab extends LitElement {
    static styles = css`
    .page-tab {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .page-tab__bar {
      display: flex;
      justify-content: center;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      color: var(--page-tab__bar--color);      
      width: fit-content;
      background: var(--page-tab__bar--background);
      gap: 1px;
      margin-block-start: 8px;
    }
    .page-tab__button {
      border: none;
      font-size: 1.1em;
      font-weight: bold;
      padding: 8px 24px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      background: transparent;
    }
    .page-tab__button:first-child {
      border-top-left-radius: 12px;
    }
    .page-tab__button:last-child {
      border-top-right-radius: 12px;
    }
    .page-tab__button--active {
      background: var(--page-tab__button--active--background);
      color: var(--page-tab__button--active--color);
      box-shadow: var(--page-tab__button--active--box-shadow);
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      letter-spacing: 1px;
      text-shadow: 
        -1px -1px 0 #444444,  
        1px -1px 0 #444444,
        -1px  1px 0 #444444,
        1px  1px 0 #444444,
        0   -1.5px 0 #444444,
        0    1.5px 0 #444444,
        -1.5px 0   0 #444444,
        1.5px 0   0 #444444,
        1px 1px 0 #b97a1a,
        -1px -1px 1px #fff,
        0 2px 6px rgba(0,0,0,0.10);
    }
    .page-tab__separator {
      width: 100vw;
      height: 8px;
      background: var(--page-tab__separator--background);
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
        <div class="page-tab">
          <div class="page-tab__bar">
            <button
              class="page-tab__button${this.active === 'quest' ? ' page-tab__button--active' : ''}"
              @click=${() => this.select('quest')}
            >Quest</button>
            <button
              class="page-tab__button${this.active === 'profile' ? ' page-tab__button--active' : ''}"
              @click=${() => this.select('profile')}
            >Profile</button>
          </div>
          <div class="page-tab__separator"></div>
        </div>
      `;
    }
}