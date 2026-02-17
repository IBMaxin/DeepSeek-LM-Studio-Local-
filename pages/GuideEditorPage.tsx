import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import { Guide } from '../types';
import { BOSS_LIST } from '../constants';
import { generateGuideDraft } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Import remarkGfm
import remarkSlug from 'remark-slug'; // Import remarkSlug

interface TableOfContentsEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

// Simple slugify function
const slugify = (text: string) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const GuideEditorPage: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [currentGuide, setCurrentGuide] = useState<Guide | null>(null);
  const [editingGuideId, setEditingGuideId] = useState<string | null>(null);
  const [newGuideTitle, setNewGuideTitle] = useState('');
  const [newGuideBoss, setNewGuideBoss] = useState('');
  const [newGuideContent, setNewGuideContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsEntry[]>([]);

  useEffect(() => {
    // Load guides from local storage on mount
    const savedGuides = localStorage.getItem('pvmHubGuides');
    if (savedGuides) {
      setGuides(JSON.parse(savedGuides));
    }
  }, []);

  useEffect(() => {
    // Save guides to local storage whenever they change
    localStorage.setItem('pvmHubGuides', JSON.stringify(guides));
  }, [guides]);

  // Effect to generate Table of Contents when currentGuide changes
  useEffect(() => {
    if (currentGuide?.content) {
      const headings: TableOfContentsEntry[] = [];
      const lines = currentGuide.content.split('\n');
      lines.forEach((line) => {
        if (line.startsWith('## ')) {
          const text = line.substring(3).trim();
          headings.push({ id: slugify(text), text, level: 2 });
        } else if (line.startsWith('### ')) {
          const text = line.substring(4).trim();
          headings.push({ id: slugify(text), text, level: 3 });
        }
      });
      setTableOfContents(headings);
    } else {
      setTableOfContents([]);
    }
  }, [currentGuide?.content]);

  const resetForm = useCallback(() => {
    setNewGuideTitle('');
    setNewGuideBoss('');
    setNewGuideContent('');
    setEditingGuideId(null);
    setCurrentGuide(null);
    setGenerationError(null);
    setTableOfContents([]); // Clear TOC when form is reset
  }, []);

  const handleSaveGuide = useCallback(() => {
    if (!newGuideTitle || !newGuideBoss || !newGuideContent) {
      alert('Please fill in all guide fields.');
      return;
    }

    const now = new Date().toISOString();
    if (editingGuideId) {
      setGuides((prevGuides) =>
        prevGuides.map((guide) =>
          guide.id === editingGuideId
            ? { ...guide, title: newGuideTitle, boss: newGuideBoss, content: newGuideContent, updatedAt: now }
            : guide
        )
      );
      alert('Guide updated successfully!');
    } else {
      const newGuide: Guide = {
        id: crypto.randomUUID(),
        title: newGuideTitle,
        boss: newGuideBoss,
        content: newGuideContent,
        author: 'User', // Placeholder
        createdAt: now,
        updatedAt: now,
      };
      setGuides((prevGuides) => [...prevGuides, newGuide]);
      alert('Guide created successfully!');
    }
    resetForm();
  }, [editingGuideId, newGuideTitle, newGuideBoss, newGuideContent, resetForm]);

  const handleEditGuide = useCallback((guideId: string) => {
    const guideToEdit = guides.find((guide) => guide.id === guideId);
    if (guideToEdit) {
      setNewGuideTitle(guideToEdit.title);
      setNewGuideBoss(guideToEdit.boss);
      setNewGuideContent(guideToEdit.content);
      setEditingGuideId(guideToEdit.id);
      setCurrentGuide(null); // Clear viewing current guide
    }
  }, [guides]);

  const handleDeleteGuide = useCallback((guideId: string) => {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      setGuides((prevGuides) => prevGuides.filter((guide) => guide.id !== guideId));
      if (editingGuideId === guideId) {
        resetForm();
      }
      if (currentGuide?.id === guideId) {
        setCurrentGuide(null);
      }
      alert('Guide deleted.');
    }
  }, [editingGuideId, currentGuide, resetForm]);

  const handleViewGuide = useCallback((guideId: string) => {
    const guideToView = guides.find((guide) => guide.id === guideId);
    if (guideToView) {
      setCurrentGuide(guideToView);
      resetForm(); // Clear any ongoing editing
    }
  }, [guides, resetForm]);

  const handleGenerateDraft = useCallback(async () => {
    if (!newGuideBoss) {
      alert('Please select a boss to generate a guide draft for.');
      return;
    }
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const draft = await generateGuideDraft({ bossName: newGuideBoss });
      setNewGuideContent(draft);
      if (draft.includes('Error:') || draft.includes('Failed to generate')) {
        setGenerationError(draft);
      }
    } catch (error) {
      console.error('Error in handleGenerateDraft:', error);
      setGenerationError(`An unexpected error occurred: ${(error as Error).message}`);
    } finally {
      setIsGenerating(false);
    }
  }, [newGuideBoss]);

  const handleScrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const bossOptions = useMemo(() => {
    return BOSS_LIST.map((boss) => ({ value: boss, label: boss }));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">PvM Guide Editor</h1>
      <p className="text-gray-400 mb-8">
        Create, edit, and manage your RuneScape PvM guides. Get AI assistance for drafting!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Guide Creation/Editing Form */}
        <Card title={editingGuideId ? 'Edit Guide' : 'Create New Guide'}>
          <Input
            id="guideTitle"
            label="Guide Title"
            value={newGuideTitle}
            onChange={(e) => setNewGuideTitle(e.target.value)}
            placeholder="e.g., Raksha Solo Guide"
          />
          <Select
            id="guideBoss"
            label="Boss"
            value={newGuideBoss}
            onChange={(e) => setNewGuideBoss(e.target.value)}
            options={[{ value: '', label: '-- Select a Boss --' }, ...bossOptions]}
          />
          <TextArea
            id="guideContent"
            label="Guide Content (Markdown supported)"
            value={newGuideContent}
            onChange={(e) => setNewGuideContent(e.target.value)}
            rows={15}
            placeholder="Write your detailed guide here..."
          />
          {generationError && (
            <div className="bg-red-800 text-red-100 p-3 rounded-md mb-4 text-sm" role="alert">
              {generationError}
            </div>
          )}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
            <Button onClick={handleSaveGuide} disabled={isGenerating}>
              {editingGuideId ? 'Update Guide' : 'Save Guide'}
            </Button>
            <Button variant="secondary" onClick={resetForm} disabled={isGenerating}>
              Clear Form
            </Button>
            <Button variant="ghost" onClick={handleGenerateDraft} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Draft (AI)'}
            </Button>
          </div>
        </Card>

        {/* Existing Guides / Guide Viewer */}
        <Card title="Your Guides" className="relative">
          {currentGuide ? (
            <div className="mb-6 flex">
              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <div className="w-1/4 pr-4 border-r border-gray-700 sticky top-4 max-h-[calc(100vh-150px)] overflow-y-auto">
                  <h4 className="text-lg font-semibold text-gray-100 mb-3">Contents</h4>
                  <nav aria-label="Table of contents">
                    <ul className="space-y-1">
                      {tableOfContents.map((entry) => (
                        <li key={entry.id} className={entry.level === 3 ? 'ml-4' : ''}>
                          <a
                            href={`#${entry.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleScrollToHeading(entry.id);
                            }}
                            className="text-gray-300 hover:text-indigo-400 text-sm block"
                            aria-label={`Jump to ${entry.text}`}
                          >
                            {entry.level === 3 ? '• ' : ''}{entry.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              {/* Guide Content */}
              <div className={`${tableOfContents.length > 0 ? 'w-3/4 pl-4' : 'w-full'}`}>
                <h3 className="text-2xl font-semibold text-gray-100 mb-2">{currentGuide.title}</h3>
                <p className="text-indigo-400 text-lg mb-4">Boss: {currentGuide.boss}</p>
                <div className="bg-gray-700 p-4 rounded-md overflow-auto max-h-96 mb-4 prose prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkSlug]}>{currentGuide.content}</ReactMarkdown>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleEditGuide(currentGuide.id)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteGuide(currentGuide.id)}>Delete</Button>
                  <Button variant="secondary" onClick={() => setCurrentGuide(null)}>Back to List</Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {guides.length === 0 ? (
                <p className="text-gray-400">No guides created yet. Start by creating one!</p>
              ) : (
                <ul className="space-y-4">
                  {guides.map((guide) => (
                    <li key={guide.id} className="bg-gray-700 p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100">{guide.title}</h3>
                        <p className="text-gray-400 text-sm">Boss: {guide.boss}</p>
                      </div>
                      <div className="flex space-x-2 mt-3 sm:mt-0">
                        <Button size="sm" onClick={() => handleViewGuide(guide.id)}>View</Button>
                        <Button size="sm" variant="secondary" onClick={() => handleEditGuide(guide.id)}>Edit</Button>
                        <Button size="sm" variant="danger" onClick={() => handleDeleteGuide(guide.id)}>Delete</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GuideEditorPage;