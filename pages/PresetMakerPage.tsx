import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Modal from '../components/Modal';
import { Preset, RuneScapeItem, GearSlot } from '../types';
import { GEAR_SLOTS, INVENTORY_SIZE } from '../constants';
import { fetchItems } from '../services/runescapeApiService';

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
          const filteredResults = filterSlot === 'Inventory'
            ? fetchedItems.filter(item => item.slot === 'Inventory')
            : (filterSlot
              ? fetchedItems.filter(item => item.slot === filterSlot)
              : fetchedItems); // No slot filter for generic search if filterSlot is null
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


const PresetMakerPage: React.FC = () => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [currentPreset, setCurrentPreset] = useState<Preset>({
    id: '',
    name: '',
    description: '',
    gear: {},
    inventory: Array(INVENTORY_SIZE).fill(undefined),
  });
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlotForModal, setSelectedSlotForModal] = useState<{ slot: GearSlot | 'Inventory'; index?: number } | null>(null);

  useEffect(() => {
    // Load presets from local storage on mount
    const savedPresets = localStorage.getItem('pvmHubPresets');
    if (savedPresets) {
      setPresets(JSON.parse(savedPresets));
    }
  }, []);

  useEffect(() => {
    // Save presets to local storage whenever they change
    localStorage.setItem('pvmHubPresets', JSON.stringify(presets));
  }, [presets]);

  const resetCurrentPreset = useCallback(() => {
    setCurrentPreset({
      id: '',
      name: '',
      description: '',
      gear: {},
      inventory: Array(INVENTORY_SIZE).fill(undefined),
    });
    setEditingPresetId(null);
  }, []);

  const handlePresetNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPreset((prev) => ({ ...prev, name: e.target.value }));
  }, []);

  const handlePresetDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentPreset((prev) => ({ ...prev, description: e.target.value }));
  }, []);

  const handleSavePreset = useCallback(() => {
    if (!currentPreset.name) {
      alert('Preset name cannot be empty.');
      return;
    }

    if (editingPresetId) {
      setPresets((prevPresets) =>
        prevPresets.map((preset) =>
          preset.id === editingPresetId ? { ...currentPreset, id: editingPresetId } : preset
        )
      );
      alert('Preset updated successfully!');
    } else {
      const newPreset: Preset = {
        ...currentPreset,
        id: crypto.randomUUID(),
      };
      setPresets((prevPresets) => [...prevPresets, newPreset]);
      alert('Preset saved successfully!');
    }
    resetCurrentPreset();
  }, [currentPreset, editingPresetId, resetCurrentPreset]);

  const handleLoadPreset = useCallback((presetId: string) => {
    const presetToLoad = presets.find((preset) => preset.id === presetId);
    if (presetToLoad) {
      setCurrentPreset(presetToLoad);
      setEditingPresetId(presetId);
    }
  }, [presets]);

  const handleDeletePreset = useCallback((presetId: string) => {
    if (window.confirm('Are you sure you want to delete this preset?')) {
      setPresets((prevPresets) => prevPresets.filter((preset) => preset.id !== presetId));
      if (editingPresetId === presetId) {
        resetCurrentPreset();
      }
      alert('Preset deleted.');
    }
  }, [editingPresetId, resetCurrentPreset]);

  // Fix: Use setSelectedSlotForModal instead of setSelectedItemForModal
  const openItemSelector = useCallback((slot: GearSlot | 'Inventory', index?: number) => {
    setSelectedSlotForModal({ slot, index });
    setIsModalOpen(true);
  }, []);

  const handleSelectItemForSlot = useCallback((item: RuneScapeItem | undefined) => {
    if (!selectedSlotForModal) return;

    setCurrentPreset((prev) => {
      const newPreset = { ...prev };
      if (selectedSlotForModal.slot === 'Inventory' && selectedSlotForModal.index !== undefined) {
        newPreset.inventory = [...newPreset.inventory];
        newPreset.inventory[selectedSlotForModal.index] = item;
      } else {
        newPreset.gear = { ...newPreset.gear, [selectedSlotForModal.slot]: item };
      }
      return newPreset;
    });
    setIsModalOpen(false);
    // Fix: Use setSelectedSlotForModal instead of setSelectedItemForModal
    setSelectedSlotForModal(null);
  }, [selectedSlotForModal]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Preset Maker</h1>
      <p className="text-gray-400 mb-8">
        Create, customize, and save your perfect gear and inventory setups.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preset Details & Controls */}
        <Card title={editingPresetId ? 'Edit Preset' : 'Create New Preset'} className="lg:col-span-1">
          <Input
            id="presetName"
            label="Preset Name"
            value={currentPreset.name}
            onChange={handlePresetNameChange}
            placeholder="e.g., Raksha Melee Phase"
          />
          <TextArea
            id="presetDescription"
            label="Description"
            value={currentPreset.description}
            onChange={handlePresetDescriptionChange}
            rows={4}
            placeholder="Brief description of this preset's purpose..."
          />
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
            <Button onClick={handleSavePreset}>
              {editingPresetId ? 'Update Preset' : 'Save Preset'}
            </Button>
            <Button variant="secondary" onClick={resetCurrentPreset}>
              New Preset
            </Button>
          </div>

          <h3 className="text-xl font-semibold text-gray-100 mt-8 mb-4 border-t border-gray-700 pt-4">Saved Presets</h3>
          {presets.length === 0 ? (
            <p className="text-gray-400">No presets saved yet.</p>
          ) : (
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {presets.map((preset) => (
                <li key={preset.id} className="bg-gray-700 p-3 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <span className="font-medium text-gray-100">{preset.name}</span>
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <Button size="sm" onClick={() => handleLoadPreset(preset.id)}>Load</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDeletePreset(preset.id)}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Gear and Inventory Layout */}
        <div className="lg:col-span-2">
          <Card title="Current Gear & Inventory" className="min-h-[400px]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {GEAR_SLOTS.map((slot) => (
                <div key={slot} className="flex flex-col items-center bg-gray-700 p-2 rounded-md">
                  <span className="text-sm font-semibold text-gray-300 mb-1">{slot}</span>
                  <div
                    className="relative w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors"
                    onClick={() => openItemSelector(slot)}
                    title={currentPreset.gear?.[slot]?.name || `Click to select ${slot} item`}
                    aria-label={`Current ${slot} item: ${currentPreset.gear?.[slot]?.name || 'Empty'}. Click to change.`}
                  >
                    {currentPreset.gear?.[slot] ? (
                      <img
                        src={currentPreset.gear[slot]?.iconUrl}
                        alt={currentPreset.gear[slot]?.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs text-center p-1">Empty</span>
                    )}
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => openItemSelector(slot)} className="mt-1 w-full text-xs">
                    {currentPreset.gear?.[slot] ? 'Change' : 'Select'}
                  </Button>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-t border-gray-700 pt-4">Inventory</h3>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: INVENTORY_SIZE }).map((_, index) => (
                <div
                  key={index}
                  className="relative w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
                  onClick={() => openItemSelector('Inventory', index)}
                  title={currentPreset.inventory[index]?.name || 'Empty slot'}
                  aria-label={`Inventory slot ${index + 1}: ${currentPreset.inventory[index]?.name || 'Empty'}. Click to change.`}
                >
                  {currentPreset.inventory[index] ? (
                    <img
                      src={currentPreset.inventory[index]?.iconUrl}
                      alt={currentPreset.inventory[index]?.name}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs">+</span>
                  )}
                  {currentPreset.inventory[index] && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening item selector
                        // Note: This clears the item at the specific inventory slot.
                        // The modal handler `handleSelectItemForSlot` would also clear it if `undefined` is passed.
                        // However, directly calling `handleSelectItemForSlot` here would require passing
                        // `selectedSlotForModal` correctly, which might be stale in this context if not careful.
                        // A simpler direct update to `currentPreset.inventory` is safer here for clearing.
                        setCurrentPreset((prev) => {
                          const newInventory = [...prev.inventory];
                          newInventory[index] = undefined;
                          return { ...prev, inventory: newInventory };
                        });
                      }}
                      className="absolute -top-1 -right-1 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs h-4 w-4 flex items-center justify-center leading-none"
                      aria-label={`Clear ${currentPreset.inventory[index]?.name || 'item'} from slot`}
                    >
                      X
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {selectedSlotForModal && (
        <ItemSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectItem={handleSelectItemForSlot}
          currentSlot={selectedSlotForModal.slot}
          filterSlot={selectedSlotForModal.slot} // Filter based on the selected gear/inventory slot
        />
      )}
    </div>
  );
};

export default PresetMakerPage;