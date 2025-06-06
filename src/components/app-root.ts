import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './task-list.ts';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: sans-serif;
    }
  `;

  render() {
    return html`
      <h1>Tasks of Men</h1>
      <task-list></task-list>
    `;
  }
}
