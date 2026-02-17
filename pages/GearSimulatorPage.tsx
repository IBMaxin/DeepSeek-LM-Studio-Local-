import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Card from '../components/Card';
import { RuneScapeItem, GearSlot, SimulateGear, SimulatorStats } from '../types';
import { GEAR_SLOTS } from '../constants';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import { fetchItems, fetchItemDetails } from '../services/runescapeApiService';

interface ItemSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: RuneScapeItem | undefined) => void;
  currentSlot: GearSlot | 'Inventory';
  title?: string;
  filterSlot?: GearSlot | 'Inventory'; // Optional: filter items by a specific slot
}

const ItemSelectionModal: React.FC<ItemSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  currentSlot,
  title = 'Select Item',
  filterSlot,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<RuneScapeItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSearchResults([]);
      setIsSearching(false);
      setError(null);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 0) {
        setIsSearching(true);
        setError(null);
        try {
          const fetchedItems = await fetchItems(searchTerm);
          // Filter by slot if a specific filterSlot is provided
          const filteredResults = filterSlot && filterSlot !== 'Inventory'
            ? fetchedItems.filter(item => item.slot === filterSlot)
            : fetchedItems;
          setSearchResults(filteredResults);
        } catch (err) {
          console.error('Failed to fetch items:', err);
          setError('Failed to load items. Please try again.');
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300); // Debounce search

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, isOpen, filterSlot]);

  const handleItemClick = useCallback((item: RuneScapeItem) => {
    onSelectItem(item);
    onClose();
  }, [onSelectItem, onClose]);

  const handleClear = useCallback(() => {
    onSelectItem(undefined);
    onClose();
  }, [onSelectItem, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${title} for ${currentSlot}`}>
      <Input
        id="itemSearch"
        placeholder="Search for an item..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <div className="max-h-64 overflow-y-auto bg-gray-700 p-2 rounded-md">
        {isSearching && <p className="text-gray-400 text-center">Searching...</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}
        {!isSearching && searchTerm.length > 0 && searchResults.length === 0 && (
          <p className="text-gray-400 text-center">No items found.</p>
        )}
        {!isSearching && searchTerm.length === 0 && (
          <p className="text-gray-400 text-center">Start typing to search for items.</p>
        )}

        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {searchResults.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center p-2 bg-gray-800 rounded-md cursor-pointer hover:bg-indigo-600 transition-colors group"
              onClick={() => handleItemClick(item)}
              title={item.name}
              aria-label={`Select ${item.name}`}
            >
              <img src={item.iconUrl} alt={item.name} className="w-10 h-10 object-contain" />
              <span className="text-xs text-center text-gray-300 group-hover:text-white mt-1 leading-tight">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="danger" onClick={handleClear} className="mr-2">Clear Slot</Button>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
};


const GearSimulatorPage: React.FC = () => {
  const [currentGear, setCurrentGear] = useState<SimulateGear>({ gear: {} });
  const [characterName, setCharacterName] = useState('My Character');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlotForModal, setSelectedSlotForModal] = useState<GearSlot | null>(null);

  const handleOpenItemSelection = useCallback((slot: GearSlot) => {
    setSelectedSlotForModal(slot);
    setIsModalOpen(true);
  }, []);

  const handleSelectItemForSlot = useCallback(async (item: RuneScapeItem | undefined) => {
    if (selectedSlotForModal) {
      setCurrentGear((prevGear) => ({
        ...prevGear,
        gear: {
          ...prevGear.gear,
          [selectedSlotForModal]: item || undefined,
        },
      }));
    }
    setIsModalOpen(false);
    setSelectedSlotForModal(null);
  }, [selectedSlotForModal]);

  const calculateTotalStats = useCallback((): SimulatorStats => {
    const initialStats: SimulatorStats = {
      totalAttack: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      totalStrength: 0,
      totalMagicDamage: 0,
      totalRangeStrength: 0,
      totalDefence: { stab: 0, slash: 0, crush: 0, magic: 0, range: 0 },
      totalArmour: 0,
      totalLifePoints: 0,
      totalPrayer: 0,
    };

    return Object.values(currentGear.gear || {}).reduce((acc: SimulatorStats, item?: RuneScapeItem) => {
      if (!item) return acc;
      return {
        totalAttack: {
          stab: acc.totalAttack.stab + item.bonuses.attack.stab,
          slash: acc.totalAttack.slash + item.bonuses.attack.slash,
          crush: acc.totalAttack.crush + item.bonuses.attack.crush,
          magic: acc.totalAttack.magic + item.bonuses.attack.magic,
          range: acc.totalAttack.range + item.bonuses.attack.range,
        },
        totalStrength: acc.totalStrength + item.bonuses.strength,
        totalMagicDamage: acc.totalMagicDamage + item.bonuses.magicDamage,
        totalRangeStrength: acc.totalRangeStrength + item.bonuses.rangeStrength,
        totalDefence: {
          stab: acc.totalDefence.stab + item.bonuses.defence.stab,
          slash: acc.totalDefence.slash + item.bonuses.defence.slash,
          crush: acc.totalDefence.crush + item.bonuses.defence.crush,
          magic: acc.totalDefence.magic + item.bonuses.defence.magic,
          range: acc.totalDefence.range + item.bonuses.defence.range,
        },
        totalArmour: acc.totalArmour + item.bonuses.armour,
        totalLifePoints: acc.totalLifePoints + item.bonuses.lifePoints,
        totalPrayer: acc.totalPrayer + item.bonuses.prayer,
      };
    }, initialStats);
  }, [currentGear.gear]);

  const simulatedStats = useMemo(() => calculateTotalStats(), [calculateTotalStats]);

  const clearAllGear = useCallback(() => {
    setCurrentGear({ gear: {} });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Gear Simulator</h1>
      <p className="text-gray-400 mb-8">
        Assemble your perfect PvM setup and instantly see your combined stats.
      </p>

      <Card title="Character & Actions" className="mb-8">
        <Input
          id="characterName"
          label="Character Name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          className="max-w-xs"
        />
        <Button variant="danger" onClick={clearAllGear} className="mt-4">
          Clear All Gear
        </Button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gear Selection */}
        <Card title="Gear Slots" className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {GEAR_SLOTS.map((slot) => (
              <div key={slot} className="flex flex-col items-center p-2 bg-gray-700 rounded-md">
                <span className="text-sm font-semibold text-gray-300 mb-1">{slot}</span>
                <div
                  className="relative w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-2 overflow-hidden cursor-pointer hover:bg-gray-500 transition-colors"
                  onClick={() => handleOpenItemSelection(slot)}
                  title={currentGear.gear?.[slot]?.name || `Click to select ${slot} item`}
                  aria-label={`Current ${slot} item: ${currentGear.gear?.[slot]?.name || 'Empty'}. Click to change.`}
                >
                  {currentGear.gear?.[slot] ? (
                    <img
                      src={currentGear.gear[slot]?.iconUrl}
                      alt={currentGear.gear[slot]?.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs text-center p-1">Empty</span>
                  )}
                </div>
                <Button size="sm" variant="secondary" onClick={() => handleOpenItemSelection(slot)} className="w-full text-xs">
                  {currentGear.gear?.[slot] ? 'Change' : 'Select'}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Simulated Stats */}
        <Card title="Simulated Stats" className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-4">
            <h3 className="text-lg font-semibold text-indigo-400">{characterName}'s Current Stats</h3>
            <div className="bg-gray-700 p-4 rounded-md">
              <h4 className="font-medium text-gray-200 mb-2">Attack Bonuses:</h4>
              <ul className="text-sm space-y-1">
                <li>Stab: <span className="font-mono text-green-400">{simulatedStats.totalAttack.stab}</span></li>
                <li>Slash: <span className="font-mono text-green-400">{simulatedStats.totalAttack.slash}</span></li>
                <li>Crush: <span className="font-mono text-green-400">{simulatedStats.totalAttack.crush}</span></li>
                <li>Magic: <span className="font-mono text-green-400">{simulatedStats.totalAttack.magic}</span></li>
                <li>Range: <span className="font-mono text-green-400">{simulatedStats.totalAttack.range}</span></li>
              </ul>
            </div>
            <div className="bg-gray-700 p-4 rounded-md">
              <h4 className="font-medium text-gray-200 mb-2">Damage Bonuses:</h4>
              <ul className="text-sm space-y-1">
                <li>Strength: <span className="font-mono text-green-400">{simulatedStats.totalStrength}</span></li>
                <li>Magic Damage: <span className="font-mono text-green-400">{simulatedStats.totalMagicDamage}%</span></li>
                <li>Range Strength: <span className="font-mono text-green-400">{simulatedStats.totalRangeStrength}</span></li>
              </ul>
            </div>
            <div className="bg-gray-700 p-4 rounded-md">
              <h4 className="font-medium text-gray-200 mb-2">Defence Bonuses:</h4>
              <ul className="text-sm space-y-1">
                <li>Stab Defence: <span className="font-mono text-blue-400">{simulatedStats.totalDefence.stab}</span></li>
                <li>Slash Defence: <span className="font-mono text-blue-400">{simulatedStats.totalDefence.slash}</span></li>
                <li>Crush Defence: <span className="font-mono text-blue-400">{simulatedStats.totalDefence.crush}</span></li>
                <li>Magic Defence: <span className="font-mono text-blue-400">{simulatedStats.totalDefence.magic}</span></li>
                <li>Range Defence: <span className="font-mono text-blue-400">{simulatedStats.totalDefence.range}</span></li>
              </ul>
            </div>
            <div className="bg-gray-700 p-4 rounded-md">
              <h4 className="font-medium text-gray-200 mb-2">Other Stats:</h4>
              <ul className="text-sm space-y-1">
                <li>Armour: <span className="font-mono text-blue-400">{simulatedStats.totalArmour}</span></li>
                <li>Life Points: <span className="font-mono text-red-400">{simulatedStats.totalLifePoints}</span></li>
                <li>Prayer Bonus: <span className="font-mono text-yellow-400">{simulatedStats.totalPrayer}</span></li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {selectedSlotForModal && (
        <ItemSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectItem={handleSelectItemForSlot}
          currentSlot={selectedSlotForModal}
          filterSlot={selectedSlotForModal} // Filter items by the specific gear slot
        />
      )}
    </div>
  );
};

export default GearSimulatorPage;