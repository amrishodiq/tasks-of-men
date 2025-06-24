import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('search-bar')
export class SearchBar extends LitElement {
  @property({ type: String }) value: string = '';

  static styles = css`
    .search-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      padding: 10px 24px 0px 24px;
    }
    input[type="text"] {
      flex: 1;
      width: 100%;
      padding: 8px;
      font-size: 1rem;
      border-radius: 6px;
      border: 1px solid rgb(204, 204, 204);
      box-sizing: border-box;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      border: 2px solid rgb(185, 122, 26);
      border-radius: 6px;
      background: var(--simple-button--background);
      transition: transform 0.1s;
      padding-inline: 12px;
      padding: 8px 16px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
  `;

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  private onSearch(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('search', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <form class="search-bar" @submit=${this.onSearch}>
        <input
          type="text"
          .value=${this.value}
          @input=${this.onInput}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    `;
  }
}