import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { PRODUCTS_DATA } from '../data/itsData';
import { Product } from '../types';
import { 
  Layers, 
  Search, 
  ExternalLink, 
  Check, 
  Zap, 
  Radio, 
  Shield, 
  Maximize2, 
  Info,
  X
} from 'lucide-react';

Chart.register(...registerables);

export const ProductsTab: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Filtered Products
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesBrand =
      selectedBrand === 'all'
        ? true
        : selectedBrand === 'Others'
        ? !['Raytec', 'Dahua', 'Hikvision'].includes(product.brand)
        : product.brand === selectedBrand;

    const matchesSearch =
      searchQuery === ''
        ? true
        : product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBrand && matchesSearch;
  });

  // Render Horizontal Bar Chart for Ranges
  useEffect(() => {
    if (!chartCanvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    const labels = PRODUCTS_DATA.map((p) => p.name.split(' ')[0] + ' ' + (p.name.split(' ')[1] || ''));
    const irData = PRODUCTS_DATA.map((p) => p.irRange);
    const whiteData = PRODUCTS_DATA.map((p) => p.whiteRange);

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'IR 적외선 유효 거리 (m)',
            data: irData,
            backgroundColor: 'rgba(30, 41, 59, 0.85)',
            borderColor: '#1e293b',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: '백색 가시광 경고 유효 거리 (m)',
            data: whiteData,
            backgroundColor: 'rgba(217, 119, 6, 0.85)',
            borderColor: '#d97706',
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: '유효 조사 거리 (Meters)', font: { size: 12, weight: 'bold' } },
            min: 0,
            max: 500,
            grid: { color: 'rgba(226, 232, 240, 0.6)' }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { size: 11, weight: 'normal' }
            }
          }
        },
        plugins: {
          legend: { 
            position: 'bottom', 
            labels: { boxWidth: 14, font: { size: 11, family: 'Pretendard, sans-serif' }, padding: 15 } 
          },
          tooltip: {
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw} m`
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Intro */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>글로벌 하드웨어 벤치마크</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          글로벌 선도 제조사 플래그십 하이브리드 제품 탐색기
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
          영국 Raytec, 중국 Dahua 및 Hikvision, 이탈리아 Tattile 등 고속도로 및 도심 ITS 구축 현장에서 검증된 최고 등급의 하이브리드 투광기와 지능형 일체형 카메라를 비교 분석합니다.
        </p>
      </div>

      {/* Comparison Chart: IR vs White Range */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <Radio className="w-5 h-5 text-indigo-600" />
            주요 플래그십 모델별 조사 거리 비교 (IR vs 백색광)
          </h3>
          <span className="text-xs font-mono text-slate-500">
            단위: 미터 (m) / 10° 협각 렌즈 기준
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Raytec VARIO2 HY16 모델은 450m라는 독보적 장거리 IR 투사력을 제공하며, Dahua 및 Hikvision은 올인원 센서 융합형에 강점을 가집니다.
        </p>

        <div className="chart-container" style={{ position: 'relative', height: '340px' }}>
          <canvas ref={chartCanvasRef} id="chartProductRangeCanvas"></canvas>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="font-bold text-slate-700 mr-1 text-xs">브랜드 필터:</span>
          {['all', 'Raytec', 'Dahua', 'Hikvision', 'Others'].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all text-xs ${
                selectedBrand === b
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {b === 'all' ? '전체 보기' : b === 'Others' ? '기타 전문사 (Tattile/TitanHz)' : b}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="모델명, 규격, 사양 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            <div>
              {/* Card Header: Brand & Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {product.brand}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {product.badge}
                </span>
              </div>

              {/* Product Name */}
              <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-1 group-hover:text-indigo-600 transition-colors">
                {product.name}
              </h4>
              <p className="text-xs font-medium text-slate-500 mb-4">{product.type}</p>

              {/* Range Meters Metric Box */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-4 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-indigo-500" />
                    IR 적외선 도달거리:
                  </span>
                  <span className="font-bold font-mono text-slate-900 text-sm">{product.irRange} m</span>
                </div>
                {/* Visual meter */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-800 h-full rounded-full"
                    style={{ width: `${(product.irRange / 450) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    백색광 경고 도달거리:
                  </span>
                  <span className="font-bold font-mono text-amber-600 text-sm">{product.whiteRange} m</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${(product.whiteRange / 450) * 100}%` }}
                  />
                </div>
              </div>

              {/* Key Features Bullets */}
              <div className="space-y-2 mb-4">
                {product.keyFeatures.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => setSelectedProductForModal(product)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5 text-slate-600" />
                <span>상세 스펙</span>
              </button>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>공식 페이지</span>
                <ExternalLink className="w-3 h-3 text-slate-300" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm">검색 결과에 일치하는 플래그십 제품이 없습니다.</p>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                  {selectedProductForModal.brand}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedProductForModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProductForModal(null)}
                className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-xs">장비 유형:</span>
                  <span className="font-semibold text-slate-800">{selectedProductForModal.type}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">보호 규격:</span>
                  <span className="font-semibold text-slate-800">{selectedProductForModal.protection || 'IP66'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">최대 전력:</span>
                  <span className="font-semibold text-slate-800">{selectedProductForModal.power || '90W'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">입력 전압:</span>
                  <span className="font-semibold text-slate-800">{selectedProductForModal.voltage || 'PoE+ / 24V'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-xs">하우징 크기:</span>
                  <span className="font-semibold text-slate-800">{selectedProductForModal.housing}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  핵심 기술 사양 전문
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                  {selectedProductForModal.specs}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  특화 기능 목록
                </h4>
                <div className="space-y-2">
                  {selectedProductForModal.keyFeatures.map((kf, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-700 text-xs">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{kf}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <button
                onClick={() => setSelectedProductForModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-300 transition-colors"
              >
                닫기
              </button>
              <a
                href={selectedProductForModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
              >
                <span>제조사 공식 사이트 방문</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
