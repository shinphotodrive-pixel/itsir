import React from 'react';
import { Radio, Gauge, Zap, Scale } from 'lucide-react';

export const KeyStatsBar: React.FC = () => {
  const stats = [
    {
      title: '최대 IR 조사 거리',
      value: '450 m',
      subtext: 'Raytec 10° 렌즈 기준',
      icon: <Radio className="w-4 h-4 text-indigo-400" />,
      badge: '초장거리',
      borderColor: 'border-indigo-500/30'
    },
    {
      title: '핵심 표준 파장',
      value: '850 nm',
      subtext: 'CMOS 양자효율 70% 최적',
      icon: <Gauge className="w-4 h-4 text-amber-400" />,
      badge: 'ITS 표준',
      borderColor: 'border-amber-500/30'
    },
    {
      title: '초고속 스트로보 응답',
      value: '180 ~ 500 µs',
      subtext: '마이크로초 셔터 동기화',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      badge: '블러 제로',
      borderColor: 'border-emerald-500/30'
    },
    {
      title: '빛공해 방지 과태료',
      value: '기존 대비 6배 인상',
      subtext: '1차 30만 원 ~ 3차 1,000만 원',
      icon: <Scale className="w-4 h-4 text-rose-400" />,
      badge: '환경부 규제',
      borderColor: 'border-rose-500/30'
    }
  ];

  return (
    <section className="bg-slate-900 border-b border-slate-800 text-slate-200 py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-slate-800/80 p-3 sm:p-3.5 rounded-xl border ${stat.borderColor} shadow-sm flex flex-col justify-between hover:bg-slate-800 transition-colors`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  {stat.icon}
                  <span className="truncate">{stat.title}</span>
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300">
                  {stat.badge}
                </span>
              </div>
              <div>
                <span className="text-base sm:text-xl font-bold tracking-tight text-white block">
                  {stat.value}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5 truncate">
                  {stat.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
