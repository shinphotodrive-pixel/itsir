import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { 
  Sliders, 
  Lightbulb, 
  Maximize2, 
  Target, 
  Gauge, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Zap
} from 'lucide-react';

Chart.register(...registerables);

export const OpticsTab: React.FC = () => {
  // Chart Ref
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Simulator States
  const [wavelength, setWavelength] = useState<'850' | '940' | 'white'>('850');
  const [power, setPower] = useState<number>(90);
  const [beamAngle, setBeamAngle] = useState<number>(10); // 10, 35, 60

  // Mount Chart.js
  useEffect(() => {
    if (!chartCanvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['730nm (근적외선)', '850nm (ITS 글로벌 표준)', '940nm (스텔스 완전비가시)', '백색 가시광 (Warm White)'],
        datasets: [
          {
            label: 'CMOS 센서 양자 효율 (Quantum Efficiency %)',
            data: [85, 70, 35, 95],
            backgroundColor: 'rgba(37, 99, 235, 0.85)',
            borderColor: '#2563eb',
            borderWidth: 1,
            yAxisID: 'y',
            borderRadius: 6
          },
          {
            label: '인간 육안 시인성 및 눈부심 지수 (Score 0-100)',
            data: [65, 20, 0, 100],
            type: 'line',
            borderColor: '#d97706',
            backgroundColor: '#d97706',
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: { display: true, text: 'CMOS 양자 효율 (%)', font: { size: 12, weight: 'bold' } },
            min: 0,
            max: 100,
            grid: { color: 'rgba(226, 232, 240, 0.6)' }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: { display: true, text: '인간 육안 시인성 (Glow/Glare)', font: { size: 12, weight: 'bold' } },
            min: 0,
            max: 100,
            grid: { drawOnChartArea: false }
          },
          x: {
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
              label: (context) => {
                if (context.datasetIndex === 0) {
                  return `CMOS 양자효율: ${context.raw}%`;
                }
                return `인간 눈부심 지표: ${context.raw}점 / 100`;
              }
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

  // Compute Simulator Output
  const computeSimulation = () => {
    let baseDistance = 0;
    let visibilityText = '';
    let modeText = '';
    let visClass = '';
    let illuminanceLux = 0;
    let beamWidthAt100m = 0;

    // Optical physics calculations
    // Divergence: Width = 2 * Distance * tan(Angle / 2)
    const rad = (beamAngle * Math.PI) / 180;
    beamWidthAt100m = Math.round(2 * 100 * Math.tan(rad / 2) * 10) / 10;

    if (wavelength === '850') {
      baseDistance = Math.sqrt(power) * 22 * (10 / beamAngle);
      visibilityText = '희미한 적색 암점 (Faint Red Glow - 시야 방해 0%)';
      modeText = '850nm 고속 IR 흑백 번호판 추출 (센서 QE 70% 최적)';
      visClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      illuminanceLux = Math.round((power * 18) / (beamAngle * 1.2));
    } else if (wavelength === '940') {
      baseDistance = Math.sqrt(power) * 12 * (10 / beamAngle);
      visibilityText = '완전 비가시 (Stealth - 육안 눈부심 0점)';
      modeText = '940nm 근거리 IR 캡처 (QE 35%로 고전력 필요)';
      visClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      illuminanceLux = Math.round((power * 9) / (beamAngle * 1.2));
    } else {
      // white
      baseDistance = Math.sqrt(power) * 15 * (10 / beamAngle);
      visibilityText = '순간 백색 스트로보 (Visual Deterrent 경고)';
      modeText = '풀 컬러 차체 / 번호판 / 안전벨트 법적 증거 채집';
      visClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      illuminanceLux = Math.round((power * 45) / (beamAngle * 1.2));
    }

    const finalDistance = Math.round(baseDistance);

    return {
      distance: finalDistance,
      visibilityText,
      modeText,
      visClass,
      illuminanceLux,
      beamWidthAt100m
    };
  };

  const simResult = computeSimulation();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>광학 물리 공학 분석</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          광학적 물리 메커니즘 및 파장 특성
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
          단속 카메라에 장착되는 이미지 센서(CMOS)의 양자 효율(Quantum Efficiency)과 인간 망막의 감도 곡선(Photopic Curve)은 파장 대역에 따라 극명하게 갈립니다. 
          아래의 데이터와 인터랙티브 시뮬레이터를 통해 왜 850nm가 전 세계 ITS 장거리 단속의 황금 표준으로 채택되었는지 물리적 상관관계를 분석할 수 있습니다.
        </p>
      </div>

      {/* Grid: Chart & Interactive Simulator */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Wavelength Chart Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Gauge className="w-5 h-5 text-indigo-600" />
                파장대별 CMOS 센서 감도 vs 인간 육안 시인성
              </h3>
              <span className="text-xs px-2 py-0.5 rounded font-mono bg-slate-100 text-slate-600">
                실측 스펙트럼
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              CMOS 센서의 수광 효율(QE %)과 운전자가 인지하는 빛공해/눈부심 지수의 트레이드오프 비교
            </p>

            <div className="chart-container" style={{ position: 'relative', height: '340px' }}>
              <canvas ref={chartCanvasRef} id="chartWavelengthCanvas"></canvas>
            </div>
          </div>

          {/* Technical Note */}
          <div className="mt-4 p-3.5 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200 leading-relaxed">
            <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-indigo-600" />
              <span>핵심 물리 분석 결과:</span>
            </p>
            <b>940nm</b>는 인간 망막에 완전히 보이지 않아 완벽한 스텔스 감시가 가능하지만, 일반 실리콘 CMOS 센서의 양자 효율이 850nm 대비 <b>50% 이하</b>로 급감하여 
            동일한 조달 거리를 확보하려면 2배 이상의 LED 칩과 전력이 요구됩니다. 따라서 장거리(100~450m) ITS 교통 단속에는 <b>850nm</b>가 최적의 균형점으로 통용됩니다.
          </div>
        </div>

        {/* Interactive Optics Simulator */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                대화형 광학 조사 거리 & 도달 반응 시뮬레이터
              </h3>
              <span className="text-xs px-2 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-700">
                실시간 연산 엔진
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              파장 대역, 전력 소모량(W), 렌즈 집광 각도를 조절하여 예상 도달 거리와 도로 조도를 즉각 계산합니다.
            </p>

            <div className="space-y-4">
              {/* Parameter 1: Wavelength */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  1. 파장 대역 선택 (Wavelength)
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => setWavelength('850')}
                    className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                      wavelength === '850'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>850 nm</div>
                    <div className="text-[10px] font-normal opacity-80">ITS 글로벌 표준</div>
                  </button>
                  <button
                    onClick={() => setWavelength('940')}
                    className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                      wavelength === '940'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>940 nm</div>
                    <div className="text-[10px] font-normal opacity-80">완전 비가시</div>
                  </button>
                  <button
                    onClick={() => setWavelength('white')}
                    className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                      wavelength === 'white'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>백색 가시광</div>
                    <div className="text-[10px] font-normal opacity-80">순간 풀컬러</div>
                  </button>
                </div>
              </div>

              {/* Parameter 2: Power Slider */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">2. 투입 전력 (Power Consumption)</span>
                  <span className="font-mono font-bold text-sm text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {power} W
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="300"
                  step="5"
                  value={power}
                  onChange={(e) => setPower(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>15W (소형 PoE)</span>
                  <span>90W (PoE++ 표준)</span>
                  <span>300W (고출력 제논 펄스)</span>
                </div>
              </div>

              {/* Parameter 3: Lens Angle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  3. 2차 광학 렌즈 빔 각도 (Beam Angle)
                </label>
                <select
                  value={beamAngle}
                  onChange={(e) => setBeamAngle(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value={10}>10° 원형 스팟 빔 (초장거리 150m~450m 고속도로 전용)</option>
                  <option value={35}>35°x10° HRT 타원형 (Standard 2~3차선 균일 조도)</option>
                  <option value={60}>60°x25° 광각 타원형 (광폭 교차로 및 다차선용)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Real-time Calculation Result Display Card */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs text-slate-400">예상 유효 유효 조사 거리:</span>
              <span className="text-2xl font-bold font-mono text-emerald-400">
                {simResult.distance} m
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
              <span className="text-slate-400">운전자 시인성 및 눈부심:</span>
              <span className={`font-semibold px-2 py-0.5 rounded border ${simResult.visClass}`}>
                {simResult.visibilityText}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
              <span className="text-slate-400">100m 지점 빔 확산 폭:</span>
              <span className="font-mono font-bold text-indigo-300">
                약 {simResult.beamWidthAt100m} m (차선 폭 커버)
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">ANPR 카메라 캡처 모드:</span>
              <span className="font-semibold text-slate-200">
                {simResult.modeText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HRT Holographic Diffuser Optical Explanation */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">
            HRT (Hot-spot Reduction Technology) 홀로그래픽 디퓨저 빔 포밍 원리
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          일반 원형 렌즈를 사용할 경우 중앙부 광량이 너무 강해 번호판이 하얗게 날아가는 화이트아웃(White-out)이 발생하고 주변부는 어두워집니다. 
          Raytec 등의 선도 제조사는 HRT 홀로그래픽 디퓨저를 적용하여 이 문제를 완벽히 해결합니다.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          {/* Step 1 */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 w-fit mb-2">
                STEP 01
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">원형 렌즈의 한계 (Hot-spot)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                단순 2차 원형 콜리메이터 렌즈는 빛을 중앙에 집중시킵니다. 이로 인해 카메라 센서 중앙부는 빛 포화(Saturation)가 일어나고, 외곽 차선은 어두워지는 비네팅(Vignetting)이 발생합니다.
              </p>
            </div>
            <div className="mt-4 p-2 bg-rose-50 border border-rose-100 rounded-lg text-[11px] text-rose-700 font-medium">
              문제점: 반사 번호판 글자 식별 불가
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-xl bg-indigo-50/70 border border-indigo-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-200 text-indigo-800 w-fit mb-2">
                STEP 02
              </div>
              <h4 className="font-bold text-indigo-950 text-base mb-2">홀로그래픽 마이크로 구조 에칭</h4>
              <p className="text-xs text-indigo-900 leading-relaxed">
                디퓨저 렌즈 표면에 수 마이크로미터(µm) 단위의 비주기적 미세 굴절 패턴을 홀로그래피 방식으로 에칭합니다. 
                이를 통해 원형 빔을 16:9 직사각형 도로 형태의 <b>타원형(Elliptical) 플랫 탑(Flat-top) 빔</b>으로 굴절시킵니다.
              </p>
            </div>
            <div className="mt-4 p-2 bg-indigo-100 border border-indigo-200 rounded-lg text-[11px] text-indigo-800 font-medium">
              핵심 기술: 35°x10° 균일 빔 변환
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 w-fit mb-2">
                STEP 03
              </div>
              <h4 className="font-bold text-emerald-950 text-base mb-2">다차선 균일 조도 실현</h4>
              <p className="text-xs text-emerald-900 leading-relaxed">
                빛의 에너지가 중앙 손실 없이 3~4차선 전 차로에 걸쳐 균등한 조도로 분포됩니다. 
                재귀반사 번호판의 하이라이트 번짐을 없애고 150m 전방 차량도 동일한 선명도로 인식합니다.
              </p>
            </div>
            <div className="mt-4 p-2 bg-emerald-100 border border-emerald-200 rounded-lg text-[11px] text-emerald-800 font-medium">
              효과: 전 차선 99.9% 번호판 판독 성공률
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
