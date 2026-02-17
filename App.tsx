import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import GuideEditorPage from './pages/GuideEditorPage';
import PresetMakerPage from './pages/PresetMakerPage';
import GearSimulatorPage from './pages/GearSimulatorPage';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-gray-900 text-gray-200">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/guide-editor" element={<GuideEditorPage />} />
              <Route path="/preset-maker" element={<PresetMakerPage />} />
              <Route path="/gear-simulator" element={<GearSimulatorPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;