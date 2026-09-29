import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { KeyStatsBar } from './components/KeyStatsBar';
import { OverviewTab } from './components/OverviewTab';
import { OpticsTab } from './components/OpticsTab';
import { ProductsTab } from './components/ProductsTab';
import { SyncTab } from './components/SyncTab';
import { ResourcesTab } from './components/ResourcesTab';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-indigo-500 selection:text-white antialiased">
      {/* Top Navigation */}
      <Header currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* 4 Core Key Metrics Banner */}
      <KeyStatsBar />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentTab === 'overview' && <OverviewTab />}
        {currentTab === 'optics' && <OpticsTab />}
        {currentTab === 'products' && <ProductsTab />}
        {currentTab === 'sync' && <SyncTab />}
        {currentTab === 'resources' && <ResourcesTab />}
      </main>

      {/* Technical Footer */}
      <Footer />
    </div>
  );
}
