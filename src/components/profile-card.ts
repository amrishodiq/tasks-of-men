import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Profile } from '../types/user.js';
import { getLevelFromXp, xpForLevel } from '../modules/leveling-system.js';
import './exp-progress-bar.ts';

const RACE_IMAGES: Record<string, string> = {
  human: '/assets/images/human.png',
  elf: '/assets/images/elf.png',
  orc: '/assets/images/orc.png'
};

@customElement('profile-card')
export class ProfileCard extends LitElement {
  static styles = css`
    .profile-card {
      border-radius: 12px;
      background: linear-gradient(180deg, #f9d976 0%, #f39c12 100%);
      box-shadow: 0 4px #b97a1a, 0 2px 4px rgba(0,0,0,0.15);
      padding: 1.5rem;
      max-width: 320px;
      margin: 8px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-inline: auto;
    }
    .profile-card__avatar {
      width: 110px;
      height: 110px;
      object-fit: contain;
      margin-bottom: 1.2rem;
      border-radius: 10%;
      background: #251004;
      border: 8px solid #c57021;
      transition: border-color 0.2s;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    }
    .profile-card__name {
      font-size: 1.3em;
      font-weight: bold;
      margin-bottom: 0.3em;
      color: #b97a1a;
      text-align: center;
    }
    .profile-card__race {
      font-size: 1.1em;
      color: #666;
      text-transform: capitalize;
      text-align: center;
    }
    .profile-card__level {
      font-size: 1.1em;
      color: #502a0c;
      font-weight: bold;
      margin-top: 0.5em;
      text-align: center;
    }
  `;

  @property({ type: Object }) profile?: Profile;

  render() {
    if (!this.profile) return null;
    const { name, race, totalExperience } = this.profile;
    const avatar = RACE_IMAGES[race] || '';
    const level = getLevelFromXp(totalExperience);
    const experienceNeeded = xpForLevel(level + 1);

    return html`
      <div class="profile-card">
        <img class="profile-card__avatar" src="${avatar}" alt="${race} avatar" />
        <div class="profile-card__name">${name}</div>
        <div class="profile-card__race">${race}</div>
        <div class="profile-card__level">Level: ${level}</div>
        <exp-progress-bar value="${totalExperience}" max="${experienceNeeded}"></exp-progress-bar>
      </div>
    `;
  }
}