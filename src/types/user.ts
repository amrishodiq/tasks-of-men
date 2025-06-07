export type Role = 'default' | 'tank' | 'mage' | 'support';
export type Race = 'human' | 'elf' | 'orc';

export type Profile = {
    id: string;
    name: string;
    race: Race;
    role: Role;
    avatarUrl: string;
    totalExperience: number;
}