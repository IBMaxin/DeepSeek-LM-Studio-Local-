import { GearSlot, RuneScapeItem } from '../types';

/**
 * Internal mock database for RuneScape items.
 * In a real application, this would be fetched from a backend API.
 */
const _mockItemDatabase: RuneScapeItem[] = [
  // Melee Gear
  {
    id: 'drygore_mains_longsword',
    name: 'Drygore mace',
    slot: GearSlot.WEAPON,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 130, magic: 0, range: 0 },
      strength: 65,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/drygore%20mace.png',
  },
  {
    id: 'drygore_off_longsword',
    name: 'Drygore off-hand mace',
    slot: GearSlot.SHIELD, // Off-hand weapon also uses shield slot for dual wield
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 65, magic: 0, range: 0 },
      strength: 32,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/drygore%20off-hand%20mace.png',
  },
  {
    id: 'masterwork_helm',
    name: 'Masterwork helm',
    slot: GearSlot.HEAD,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 10, slash: 12, crush: 8, magic: -2, range: 10 },
      armour: 65,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/masterwork%20helm.png',
  },
  {
    id: 'masterwork_platebody',
    name: 'Masterwork platebody',
    slot: GearSlot.BODY,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 30, slash: 35, crush: 25, magic: -6, range: 30 },
      armour: 180,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/masterwork%20platebody.png',
  },
  {
    id: 'masterwork_platelegs',
    name: 'Masterwork platelegs',
    slot: GearSlot.LEGS,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 20, slash: 25, crush: 18, magic: -4, range: 20 },
      armour: 120,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/masterwork%20platelegs.png',
  },
  {
    id: 'laceration_boots',
    name: 'Laceration boots',
    slot: GearSlot.FEET,
    bonuses: {
      attack: { stab: 20, slash: 20, crush: 20, magic: 0, range: 0 },
      strength: 10,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 5, slash: 5, crush: 5, magic: 5, range: 5 },
      armour: 30,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/laceration%20boots.png',
  },
  // Ranged Gear
  {
    id: 'ascension_cross',
    name: 'Ascension crossbow',
    slot: GearSlot.WEAPON,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 100 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 55,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/ascension%20crossbow.png',
  },
  {
    id: 'off_hand_ascension_cross',
    name: 'Off-hand ascension crossbow',
    slot: GearSlot.SHIELD,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 50 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 27,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/off-hand%20ascension%20crossbow.png',
  },
  {
    id: 'pernix_cowl',
    name: 'Pernix cowl',
    slot: GearSlot.HEAD,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 20 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 5, slash: 5, crush: 5, magic: 5, range: 5 },
      armour: 50,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/pernix%20cowl.png',
  },
  {
    id: 'pernix_body',
    name: 'Pernix body',
    slot: GearSlot.BODY,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 45 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 15, slash: 15, crush: 15, magic: 15, range: 15 },
      armour: 120,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/pernix%20body.png',
  },
  {
    id: 'pernix_chaps',
    name: 'Pernix chaps',
    slot: GearSlot.LEGS,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 30 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 10, slash: 10, crush: 10, magic: 10, range: 10 },
      armour: 90,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/pernix%20chaps.png',
  },
  {
    id: 'swift_gloves',
    name: 'Swift gloves',
    slot: GearSlot.HANDS,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 20 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 10,
      defence: { stab: 5, slash: 5, crush: 5, magic: 5, range: 5 },
      armour: 30,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/swift%20gloves.png',
  },
  // Magic Gear
  {
    id: 'seismic_wand',
    name: 'Seismic wand',
    slot: GearSlot.WEAPON,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 90, range: 0 },
      strength: 0,
      magicDamage: 40,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/seismic%20wand.png',
  },
  {
    id: 'seismic_singularity',
    name: 'Seismic singularity',
    slot: GearSlot.SHIELD,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 45, range: 0 },
      strength: 0,
      magicDamage: 20,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/seismic%20singularity.png',
  },
  {
    id: 'virtus_mask',
    name: 'Virtus mask',
    slot: GearSlot.HEAD,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 20, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 5, slash: 5, crush: 5, magic: 5, range: 5 },
      armour: 50,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/virtus%20mask.png',
  },
  {
    id: 'virtus_robe_top',
    name: 'Virtus robe top',
    slot: GearSlot.BODY,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 45, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 15, slash: 15, crush: 15, magic: 15, range: 15 },
      armour: 120,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/virtus%20robe%20top.png',
  },
  {
    id: 'virtus_robe_legs',
    name: 'Virtus robe legs',
    slot: GearSlot.LEGS,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 30, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 10, slash: 10, crush: 10, magic: 10, range: 10 },
      armour: 90,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/virtus%20robe%20legs.png',
  },
  {
    id: 'blast_diffusion_boots',
    name: 'Blast diffusion boots',
    slot: GearSlot.FEET,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 20, range: 0 },
      strength: 0,
      magicDamage: 10,
      rangeStrength: 0,
      defence: { stab: 5, slash: 5, crush: 5, magic: 5, range: 5 },
      armour: 30,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/blast%20diffusion%20boots.png',
  },
  // Hybrid/General Items
  {
    id: 'amulet_of_souls',
    name: 'Amulet of souls',
    slot: GearSlot.AMULET,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 5, slash: 5, crush: 5, magic: 5, range: 5 },
      armour: 0,
      lifePoints: 0,
      prayer: 10,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/amulet%20of%20souls.png',
  },
  {
    id: 'raksha_spike',
    name: 'Raksha\'s spike',
    slot: GearSlot.POCKET,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/rakshas%20spike.png',
  },
  {
    id: 'grimoire',
    name: 'Grimoire',
    slot: GearSlot.SHIELD,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/grimoire.png',
  },
  {
    id: 'ardougnre_cloak_4',
    name: 'Ardougne cloak 4',
    slot: GearSlot.CAPE,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 5, slash: 5, crush: 5, magic: 5, range: 5 },
      armour: 0,
      lifePoints: 0,
      prayer: 6,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/ardougne%20cloak%204.png',
  },
  {
    id: 'ring_of_death',
    name: 'Ring of Death',
    slot: GearSlot.RING,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 10, slash: 10, crush: 10, magic: 10, range: 10 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/ring%20of%20death.png',
  },
  {
    id: 'elite_enhanced_dark_bow',
    name: 'Elite enhanced dark bow',
    slot: GearSlot.WEAPON,
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 90 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 40,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/elite%20enhanced%20dark%20bow.png',
  },
  // Inventory Items
  {
    id: 'elven_ritual_shard',
    name: 'Elven ritual shard',
    slot: 'Inventory',
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/elven%20ritual%20shard.png',
  },
  {
    id: 'super_restore_4',
    name: 'Super restore (4)',
    slot: 'Inventory',
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/super%20restore%20(4).png',
  },
  {
    id: 'rocktail',
    name: 'Rocktail',
    slot: 'Inventory',
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 2300, // Placeholder for healing item
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/rocktail.png',
  },
  {
    id: 'enhanced_excalibur',
    name: 'Enhanced Excalibur',
    slot: 'Inventory',
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/enhanced%20excalibur.png',
  },
  {
    id: 'overload_supreme_4',
    name: 'Overload (supreme) (4)',
    slot: 'Inventory',
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/overload%20(supreme)%20(4).png',
  },
  {
    id: 'adrenaline_potion_6',
    name: 'Adrenaline potion (6)',
    slot: 'Inventory',
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/adrenaline%20potion%20(6).png',
  },
  {
    id: 'saradomin_brew_4',
    name: 'Saradomin brew (4)',
    slot: 'Inventory',
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0, // Brewing item
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/saradomin%20brew%20(4).png',
  },
  {
    id: 'super_prayer_4',
    name: 'Super prayer potion (4)',
    slot: 'Inventory',
    bonuses: {
      attack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      strength: 0,
      magicDamage: 0,
      rangeStrength: 0,
      defence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      armour: 0,
      lifePoints: 0,
      prayer: 0,
    },
    iconUrl: 'https://cdn.jsdelivr.net/gh/runescape/item-icons@master/sprites/super%20prayer%20potion%20(4).png',
  },
];

/**
 * Simulates an asynchronous API call to fetch RuneScape items.
 * @param query Optional search query to filter items by name.
 * @returns A promise that resolves to an array of RuneScape items.
 */
export const fetchItems = (query?: string): Promise<RuneScapeItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = _mockItemDatabase;
      if (query) {
        results = _mockItemDatabase.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      resolve(results);
    }, 500); // Simulate network delay
  });
};

/**
 * Simulates an asynchronous API call to fetch details for a specific RuneScape item.
 * @param itemId The ID of the item to fetch.
 * @returns A promise that resolves to the RuneScape item or undefined if not found.
 */
export const fetchItemDetails = (itemId: string): Promise<RuneScapeItem | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = _mockItemDatabase.find(item => item.id === itemId);
      resolve(item);
    }, 200); // Simulate network delay
  });
};
