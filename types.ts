export enum GearSlot {
  HEAD = 'Head',
  AMULET = 'Amulet',
  CAPE = 'Cape',
  WEAPON = 'Weapon',
  SHIELD = 'Shield',
  BODY = 'Body',
  LEGS = 'Legs',
  HANDS = 'Hands',
  FEET = 'Feet',
  RING = 'Ring',
  AMMUNITION = 'Ammunition',
  AURA = 'Aura',
  POCKET = 'Pocket', // For pocket slot items
}

export interface RuneScapeItem {
  id: string;
  name: string;
  slot: GearSlot | 'Inventory'; // 'Inventory' for items that go into inventory
  bonuses: {
    attack: {
      stab: number;
      slash: number;
      crush: number;
      magic: number;
      range: number;
    };
    strength: number;
    magicDamage: number;
    rangeStrength: number;
    defence: {
      stab: number;
      slash: number;
      crush: number;
      magic: number;
      range: number;
    };
    armour: number;
    lifePoints: number;
    prayer: number;
  };
  iconUrl: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  gear: Partial<Record<GearSlot, RuneScapeItem>>;
  inventory: RuneScapeItem[];
}

export interface Guide {
  id: string;
  title: string;
  boss: string;
  content: string; // Markdown or rich text content
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface SimulateGear {
  gear: Partial<Record<GearSlot, RuneScapeItem>>;
}

export interface SimulatorStats {
  totalAttack: {
    stab: number;
    slash: number;
    crush: number;
    magic: number;
    range: number;
  };
  totalStrength: number;
  totalMagicDamage: number;
  totalRangeStrength: number;
  totalDefence: {
    stab: number;
    slash: number;
    crush: number;
    magic: number;
    range: number;
  };
  totalArmour: number;
  totalLifePoints: number;
  totalPrayer: number;
}
