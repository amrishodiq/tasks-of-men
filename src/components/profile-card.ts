import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Profile } from '../types/user.js';
import { getLevelFromXp } from '../modules/leveling-system.js';

const RACE_IMAGES: Record<string, string> = {
  human: '/assets/images/human.png',
  elf: '/assets/images/elf.png',
  orc: '/assets/images/orc.png'
};

@customElement('profile-card')
export class ProfileCard extends LitElement {
  static styles = css`
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fffbe6;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      padding: 2rem 1.5rem 1.5rem 1.5rem;
      max-width: 320px;
      margin: 0 auto;
    }
    .avatar {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: #eee;
      object-fit: contain;
      border: 3px solid #f39c12;
      margin-bottom: 1.2rem;
      box-shadow: 0 2px 8px rgba(243,156,18,0.08);
    }
    .name {
      font-size: 1.3em;
      font-weight: bold;
      margin-bottom: 0.3em;
      color: #b97a1a;
      text-align: center;
    }
    .race {
      font-size: 1.1em;
      color: #666;
      text-transform: capitalize;
      text-align: center;
    }
  `;

  @property({ type: Object }) profile?: Profile;

  render() {
    if (!this.profile) return null;
    const { name, race, totalExperience } = this.profile;
    const avatar = RACE_IMAGES[race] || '';
    const level = getLevelFromXp(totalExperience);

    return html`
      <div class="card">
        <img class="avatar" src="${avatar}" alt="${race} avatar" />
        <div class="name">${name}</div>
        <div class="race">${race}</div>
        <div class="level">Level: ${level}</div>
      </div>
    `;
  }
}