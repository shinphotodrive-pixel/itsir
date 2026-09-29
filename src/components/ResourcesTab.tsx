import React, { useState } from 'react';
import { PURCHASE_ITEMS, VIDEO_ITEMS } from '../data/itsData';
import { VideoModal } from './VideoModal';
import { 
  ShoppingBag, 
  Video, 
  ExternalLink, 
  Search, 
  Play, 
  Building2, 
  CheckCircle2,
  FileCheck,
  Globe
} from 'lucide-react';

export const ResourcesTab: React.FC = () => {
  const [searchTable, setSearchTable] = useState('');
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  const filteredPurchases = PURCHASE_ITEMS.filter((item) => {
    const q = searchTable.toLowerCase();
    return (
      item.productName.toLowerCase().includes(q) ||
      item.distributor.toLowerCase().includes(q) ||
      item.features.toLowerCase().includes(q) ||
      item.region.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>B2B 구매 경로 및 공식 기술 자료</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          구매처 디렉토리 및 기술 시연 영상 라이브러리
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
          공공기관 관공서 조달 입찰, 지자체 스마트 도로 사업, 또는 도로공사 ITS 엔지니어링 설계를 위한 공식 B2B 유통 채널과 
          주요 제조사의 야간 실제 구동 테스트 영상을 한눈에 확인할 수 있습니다.
        </p>
      </div>

      {/* Table Section: Official B2B Distributors */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              공식/공인 B2B 유통망 및 조달 채널 디렉토리
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              국내외 검증된 엔터프라이즈 광학 장비 조달처 목록
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="제품명, 유통사 검색..."
              value={searchTable}
              onChange={(e) => setSearchTable(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b border-slate-200 text-xs">
              <tr>
                <th className="p-4">제조사 & 모델명</th>
                <th className="p-4">핵심 광학/하이브리드 특성</th>
                <th className="p-4">유통 채널 & 구매 링크</th>
                <th className="p-4">지역 / 비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredPurchases.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span>{item.productName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 text-xs max-w-xs leading-relaxed">
                    {item.features}
                  </td>
                  <td className="p-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs hover:bg-indigo-100 transition-colors border border-indigo-200/60 shadow-xs"
                    >
                      <Globe className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{item.distributor}</span>
                      <ExternalLink className="w-3 h-3 text-indigo-500" />
                    </a>
                  </td>
                  <td className="p-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-700">{item.region}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {item.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.notes}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Video Demonstration Library */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
              하이브리드 조명 작동 시연 및 엔지니어링 기술 영상 라이브러리
            </h3>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            클릭 시 앱 내부 플레이어로 즉시 시청 가능
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {VIDEO_ITEMS.map((vid) => (
            <div
              key={vid.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${vid.brandColor}`}>
                    {vid.brand}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    {vid.category}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-base mb-2">
                  {vid.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {vid.description}
                </p>
              </div>

              {/* Video Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setActiveVideo({ id: vid.youtubeId1, title: `${vid.brand} - ${vid.label1}` })}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{vid.label1}</span>
                </button>

                {vid.youtubeId2 && (
                  <button
                    onClick={() => setActiveVideo({ id: vid.youtubeId2!, title: `${vid.brand} - ${vid.label2}` })}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 text-slate-600" />
                    <span>{vid.label2}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Video Modal */}
      {activeVideo && (
        <VideoModal
          youtubeId={activeVideo.id}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
};
