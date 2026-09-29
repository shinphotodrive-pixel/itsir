import React from 'react';
import { TabType } from '../types';
import { 
  ShieldCheck, 
  Activity, 
  Sliders, 
  Layers, 
  Cpu, 
  ExternalLink, 
  Video, 
  Menu, 
  X,
  Radio
} from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: '개요 & 산업 규제', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'optics', label: '광학 & 파장 시뮬레이터', icon: <Sliders className="w-4 h-4" /> },
    { id: 'products', label: '주요 제품 탐색기', icon: <Layers className="w-4 h-4" /> },
    { id: 'sync', label: '동기화 & AI 제어', icon: <Cpu className="w-4 h-4" /> },
    { id: 'resources', label: '구매처 & 영상 자료실', icon: <Video className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center font-bold text-base text-white shadow-md shadow-indigo-600/30">
              <Radio className="w-5 h-5 text-indigo-100 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">ITS Analysis</span>
                <span className="text-xs text-slate-400 font-mono">v2.4 Pro</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                ITS 하이브리드 투광기 기술 대시보드
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex space-x-1 text-sm font-medium">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-btn-${tab.id}`}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
