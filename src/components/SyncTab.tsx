import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { 
  Cpu, 
  Zap, 
  Radio, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Network, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

Chart.register(...registerables);

export const SyncTab: React.FC = () => {
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Interactive Microsecond Timing Simulator State
  const [pulseDelay, setPulseDelay] = useState<number>(300); // 100 ~ 600 µs
  const [pulseDuration, setPulseDuration] = useState<number>(200); // 100 ~ 400 µs
  const [aiDimmingLevel, setAiDimmingLevel] = useState<number>(14); // 1 to 20 steps

  // Shutter exposure window is fixed at 200µs to 500µs
  const shutterStart = 200;
  const shutterEnd = 500;
  const isSyncSuccess = pulseDelay >= shutterStart && (pulseDelay + pulseDuration * 0.5) <= shutterEnd;

  // Chart setup
  useEffect(() => {
    if (!chartCanvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['0µs (Trigger)', '100µs', '200µs (Shutter Open)', '300µs (Flash Peak)', '400µs', '500µs (Shutter Close)', '600µs'],
        datasets: [
          {
            label: '카메라 셔터 개방 노출 윈도우 (TTL 레벨 %)',
            data: [0, 0, 100, 100, 100, 0, 0],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.12)',
            fill: true,
            stepped: true,
            borderWidth: 2,
            pointRadius: 4
          },
          {
            label: '하이브리드 플래시 펄스 발광 (Xenon/LED Strobe %)',
            data: [0, 0, 0, 100, 75, 0, 0],
            borderColor: '#059669',
            backgroundColor: 'rgba(5, 150, 105, 0.2)',
            fill: true,
            stepped: false,
            tension: 0.3,
            borderWidth: 2.5,
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: { display: true, text: '신호 Level (%)', font: { size: 12, weight: 'bold' } },
            min: 0,
            max: 125,
            grid: { color: 'rgba(226, 232, 240, 0.6)' }
          },
          x: {
            grid: { color: 'rgba(226, 232, 240, 0.4)' },
            ticks: { font: { size: 11, weight: 'normal' } }
          }
        },
        plugins: {
          legend: { 
            position: 'bottom', 
            labels: { boxWidth: 14, font: { size: 11, family: 'Pretendard, sans-serif' }, padding: 15 } 
          },
          tooltip: {
            padding: 10,
            cornerRadius: 8
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
      {/* Section Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>초고속 전자제어 & 엣지 인공지능</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          초정밀 Microsecond 동기화 & 엣지 AI 지능형 제어
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
          시속 320km/h로 질주하는 차량의 번호판을 모션 블러(Motion Blur) 없이 칼같이 정지된 화상으로 기록하려면 카메라 셔터 개방 시간(180µs~500µs)과 플래시 발광 타이밍이 마이크로초 단위로 완벽히 정렬되어야 합니다. 
          또한 차체와 재귀반사 번호판의 반사율을 감지하여 발광량을 1~20단계로 자율 조절하는 Edge AI 아키텍처를 소개합니다.
        </p>
      </div>

      {/* Grid: Timeline Chart + Microsecond Simulator */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Timeline Chart Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                카메라 셔터-플래시 펄스 동기화 타임라인
              </h3>
              <span className="text-xs px-2 py-0.5 rounded font-mono bg-slate-100 text-slate-600">
                TTL Signal Flow
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              카메라 트리거 신호가 발생한 뒤 셔터가 완전히 열린 300µs 지점에 플래시 피크가 정확히 동기화되는 메커니즘
            </p>

            <div className="chart-container" style={{ position: 'relative', height: '320px' }}>
              <canvas ref={chartCanvasRef} id="chartSyncTimelineCanvas"></canvas>
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <p className="font-bold text-amber-950 mb-1 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>동기화 핵심 제어 원리:</span>
            </p>
            카메라 글로벌/롤링 셔터의 물리적 노출 시간은 약 <b>180µs ~ 500µs</b>에 불과합니다. 
            투광기 플래시 발광 피크가 이 구간에서 벗어나면 화면 상/하단에 검은 띠가 생기는 <b>롤링 셔터 밴딩(Banding)</b>이 일어나거나 증거 사진이 암전 처리됩니다.
          </div>
        </div>

        {/* Microsecond Timing & AI Dimming Simulator */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                마이크로초(µs) 동기화 & AI 조광 인터랙티브 테스트
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                isSyncSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {isSyncSuccess ? '동기화 적합' : '동기화 이탈'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              셔터 개방 윈도우(200µs~500µs)와 플래시 지연 발광 타이밍을 직접 매칭해보세요.
            </p>

            {/* Slider 1: Flash Delay */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-bold text-slate-700">트리거 후 플래시 발광 지연 (Delay):</span>
                  <span className="font-mono font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {pulseDelay} µs
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="10"
                  value={pulseDelay}
                  onChange={(e) => setPulseDelay(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>50µs (너무 빠름)</span>
                  <span className="text-emerald-600 font-bold">200~400µs (정상 윈도우)</span>
                  <span>600µs (셔터 닫힌 후)</span>
                </div>
              </div>

              {/* Slider 2: AI Dimming Steps */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    AI 자율 조광 제어 단계 (1~20 Step):
                  </span>
                  <span className="font-mono font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Level {aiDimmingLevel} / 20
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={aiDimmingLevel}
                  onChange={(e) => setAiDimmingLevel(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Level 1 (재귀반사 극심 시 최저광)</span>
                  <span>Level 10 (표준 세단)</span>
                  <span>Level 20 (무광 대형 화물차)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sync Result Box */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs text-slate-400">동기화 검증 상태:</span>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                {isSyncSuccess ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    완벽 노출 동기화 (밴딩 제로)
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    타이밍 불일치 (블랙 밴딩 발생)
                  </span>
                )}
              </div>
            </div>

            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">카메라 셔터 개방 구간:</span>
                <span className="font-mono text-slate-200">200 µs ~ 500 µs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">플래시 도달 타이밍:</span>
                <span className={`font-mono font-bold ${isSyncSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pulseDelay} µs
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI 번호판 반사 방지 연산:</span>
                <span className="font-mono text-indigo-300">
                  출력 {aiDimmingLevel * 5}% (화이트아웃 마진 99.4%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Edge AI & Protocol Architecture Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4 border border-indigo-100">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              STM32 Cortex M4 / VPU 하드웨어 가속
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dahua ITALF 및 TitanHz 등 선도 투광기는 내부에 전용 <b>STM32 마이크로컨트롤러</b> 또는 Intel Movidius VPU를 내장합니다. 
              카메라와 나노초 단위로 인터럽트를 주고받으며 최대 10kHz 주파수 응답으로 다차선 연속 과속 차량을 끊김 없이 연속 캡처합니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-indigo-600">
            응답 지연시간: &lt; 50ns
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4 border border-emerald-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              AI 능동형 번호판 반사 방지 (1~20 Step)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              국내외 고반사 재귀필름(Retro-reflective Sheet) 번호판은 고광량 플래시 수광 시 글자가 지워지는 백화(Over-exposure)가 발생합니다. 
              엣지 AI가 차체 반사율을 사전 추정하여 투광기 출력을 1단계에서 20단계(제논 1~16단계)로 자동 감쇄합니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-emerald-600">
            동적 범위: 20단계 PWM 디지털 튜닝
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4 border border-blue-100">
              <Network className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              복합 통신 규격 (TTL, RS-485, Web API)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              지연 없는 물리 신호를 위한 <b>TTL 하드웨어 펄스</b>와 광량/장비 상태 원격 진단을 위한 <b>RS-485 직렬 통신</b>이 기본 제공됩니다. 
              Raytec VARIO2 IP 제품군의 경우 90W PoE(IEEE 802.3bt) 및 HTTP REST API를 통해 관제 VMS 소프트웨어와 실시간 동기화됩니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-blue-600">
            지원: TTL, RS-485, PoE++, HTTP REST API
          </div>
        </div>
      </div>
    </div>
  );
};
