import React from 'react';
import { Shield, FileText, Radio, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center space-x-2 text-slate-200 font-semibold">
            <Radio className="w-4 h-4 text-indigo-400" />
            <span>ITS Hybrid Illuminator Technology & Market Analysis System</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> 빛공해 방지법 준수
            </span>
            <span className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-amber-400" /> ANPR 법적 증거력 확보
            </span>
          </div>
        </div>

        <div className="text-center sm:text-left text-slate-400 text-[11px] leading-relaxed space-y-1">
          <p>
            본 대시보드는 지능형 교통 시스템(ITS), 무인 과속/신호위반 단속 카메라의 야간 조명 표준에 관한 공학적 연구 자료 및 제조사(Raytec, Dahua, Hikvision, Tattile 등) 공식 데이터시트를 바탕으로 구축되었습니다.
          </p>
          <p className="text-slate-400">
            참조 규격: 대한민국 환경부 인공조명에 의한 빛공해 방지법 제11조 및 동법 시행령 · IEEE 802.3bt PoE++ · IP66 / IP67 방수방진 표준.
          </p>
        </div>
      </div>
    </footer>
  );
};
