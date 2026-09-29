import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  ShieldCheck, 
  Radio, 
  Eye, 
  Car, 
  FileText, 
  Scale, 
  Camera, 
  ChevronRight 
} from 'lucide-react';
import { REGULATION_FACTS } from '../data/itsData';

export const OverviewTab: React.FC = () => {
  const [simulationState, setSimulationState] = useState<'stealth' | 'triggered'>('stealth');
  const [isFlashing, setIsFlashing] = useState(false);

  const handleTriggerSimulation = () => {
    setIsFlashing(true);
    setSimulationState('triggered');
    setTimeout(() => {
      setIsFlashing(false);
    }, 400);
  };

  const handleResetToStealth = () => {
    setSimulationState('stealth');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Executive Intro */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>차세대 ITS 광학 표준 분석 리포트</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            지능형 교통 단속 조명 패러다임의 대전환
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            과거 야간 단속에 사용되던 가시광 단일 제논(Xenon) 플래시는 운전자 순간 실명(Flash Blindness) 및 주거지 빛공해를 유발하여 민원과 2차 추돌 사고의 원인이 되었습니다. 
            현대의 <b>스마트 듀얼 하이브리드(850nm IR + 고휘도 백색 가시광) 시스템</b>은 평시 99%의 시간을 비가시광으로 조용히 차량을 추적하고, 
            위반 확정 시에만 수백 마이크로초(µs) 초미세 펄스로 가시광을 터뜨려 <b>빛공해 방지법 준수</b>와 <b>풀 컬러 법적 증거력 확보</b>를 동시에 실현합니다.
          </p>
        </div>
      </div>

      {/* Interactive Trigger Simulator Demo Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4" />
              <span>실시간 하이브리드 발광 메커니즘 시뮬레이터</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              평시 스텔스 감시 ⇄ 위반 시 순간 펄스 발광 전환 테스트
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToStealth}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                simulationState === 'stealth'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              평시 스텔스 (IR)
            </button>
            <button
              onClick={handleTriggerSimulation}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>위반 포착 트리거 발광</span>
            </button>
          </div>
        </div>

        {/* Visual Simulation Canvas / Preview */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Visual Road Representation */}
          <div className={`relative h-64 rounded-xl overflow-hidden border transition-all duration-300 flex flex-col justify-between p-4 ${
            isFlashing 
              ? 'bg-amber-100/90 border-amber-300 shadow-[0_0_50px_rgba(251,191,36,0.5)]' 
              : simulationState === 'triggered'
                ? 'bg-slate-800 border-indigo-500/40'
                : 'bg-slate-950 border-slate-800'
          }`}>
            {/* Top Status Bar */}
            <div className="flex justify-between items-center z-10">
              <span className={`text-xs px-2.5 py-1 rounded-full font-mono font-bold flex items-center gap-1.5 ${
                simulationState === 'stealth'
                  ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/50'
                  : 'bg-rose-950/80 text-rose-300 border border-rose-700/50'
              }`}>
                <span className={`w-2 h-2 rounded-full ${simulationState === 'stealth' ? 'bg-indigo-400 animate-ping' : 'bg-rose-400'}`}></span>
                {simulationState === 'stealth' ? 'MODE: 850nm STEALTH IR' : 'MODE: HYBRID STROBE ACTIVE'}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {simulationState === 'stealth' ? '운전자 체감 조도: 0 Lux (비가시)' : '순간 가시광 펄스: 180µs 완료'}
              </span>
            </div>

            {/* Road & Vehicle Graphic Simulation */}
            <div className="flex flex-col items-center justify-center my-auto text-center z-10">
              <div className="relative">
                {/* Illuminator Head */}
                <div className={`mx-auto mb-3 w-16 h-8 rounded-lg flex items-center justify-center border text-xs font-mono font-bold transition-all ${
                  isFlashing
                    ? 'bg-white text-slate-900 border-amber-400 shadow-[0_0_30px_#fff]'
                    : simulationState === 'triggered'
                      ? 'bg-indigo-600 text-white border-indigo-400'
                      : 'bg-slate-800 text-indigo-400 border-slate-700'
                }`}>
                  <Radio className="w-4 h-4 mr-1" />
                  {isFlashing ? 'FLASH' : 'HYBRID'}
                </div>

                {/* Light Cone beam */}
                <div className={`w-48 h-12 mx-auto rounded-b-full transition-opacity duration-200 ${
                  isFlashing
                    ? 'bg-gradient-to-b from-amber-200/90 to-transparent opacity-100 blur-sm'
                    : simulationState === 'triggered'
                      ? 'bg-gradient-to-b from-indigo-400/30 to-transparent opacity-60'
                      : 'bg-gradient-to-b from-indigo-500/15 to-transparent opacity-40'
                }`} />

                {/* Vehicle */}
                <div className={`mt-2 p-3 rounded-xl inline-flex flex-col items-center border transition-all ${
                  isFlashing
                    ? 'bg-white text-slate-900 border-amber-400'
                    : 'bg-slate-900/90 text-white border-slate-700'
                }`}>
                  <Car className="w-8 h-8 text-indigo-400 mb-1" />
                  <div className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                    52가 8192
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">시속 118 km/h (과속 감지)</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Info */}
            <div className="text-[11px] text-center text-slate-400 z-10">
              {simulationState === 'stealth'
                ? '평시 상태: 운전자의 전방 주시를 방해하지 않고 24시간 차량 속도 및 궤적 추적'
                : '위반 발생: 번호판 + 차체 색상 + 운전자 안전벨트 착용 여부 풀컬러 고화질 증거 캡처 성공'}
            </div>
          </div>

          {/* Camera Capture Feed Output Simulation */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  ANPR 엣지 카메라 수신 화면 분석
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  9MP Global Shutter
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">화상 모드:</span>
                  <span className="font-bold text-white">
                    {simulationState === 'stealth' ? 'IR 흑백 밴드패스 (IR Mono)' : '고화질 풀 컬러 (RGB Vivid)'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">인식 항목:</span>
                  <span className="font-semibold text-indigo-300">
                    {simulationState === 'stealth' ? '차량 번호판 문자/숫자 식별' : '번호판 + 차체 색상 + 차종 + 운전자 행태'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">빛공해 / 눈부심 (Glare):</span>
                  <span className="font-semibold text-emerald-400">
                    {simulationState === 'stealth' ? '0% (완전 비가시/암점 수준)' : '300µs 순간 발광 (잔상 없음)'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400">운전자 시각 경고 (Deterrent):</span>
                  <span className="font-semibold text-amber-400">
                    {simulationState === 'stealth' ? '대기 (자율 주행 유도)' : '플래시 경고로 즉각 감속 유도'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-200">
              💡 <b>하이브리드 조명의 핵심:</b> 위반 차량 1대에만 플래시가 터지므로, 주변 차선 운전자에게 지속적인 광공해를 주지 않으며 단속 효과는 극대화됩니다.
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Cards: Traditional vs Modern Hybrid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Traditional */}
        <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            과거 방식 (도태)
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">전통적 제논(Xenon) / 상시 백색 플래시</h3>
                <p className="text-xs text-slate-500">강한 순간 조도 및 광폭 눈부심 발생</p>
              </div>
            </div>
            <ul className="space-y-3.5 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <span><b>운전자 순간 시각 상실:</b> 야간 25,000 Lux 이상의 순간 광량으로 암순응 상태 운전자의 2차 추돌 사고 위험 증가.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <span><b>심각한 주거지 빛공해:</b> 도로 인접 아파트 및 주택 창문으로 빛이 침투하여 수면 장애 민원 폭증.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <span><b>높은 유지보수 비용:</b> 제논 방전관(Tube)의 발열 및 물리적 수명(약 200만 회 펄스) 한계로 빈번한 교체 소요.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-800 font-medium">
            ⚠️ <b>규제 리스크:</b> 빛공해 방지법 개정에 따라 주거지 연직조도 기준(10 Lux) 초과 시 과태료 처분 대상.
          </div>
        </div>

        {/* Modern Hybrid */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            최신 표준 (권장)
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">스마트 듀얼 하이브리드 (IR + 백색/적색 경고)</h3>
                <p className="text-xs text-slate-500">평시 스텔스 + 위반 시 180µs 펄스 발광</p>
              </div>
            </div>
            <ul className="space-y-3.5 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><b>평시 스텔스 감시 (99%):</b> 비가시광 850nm IR로 연속 감시하여 운전자 눈부심 제로 및 생체 리듬 보호.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><b>위반 시 순간 펄스 발광:</b> 위반 감지 시 수백 마이크로초(µs) 동안만 백색광을 터뜨려 차량 색상 및 운전자 풀컬러 기록.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><b>시각적 경고(Deterrent) 효과:</b> 적색 암점(Faint Red Glow)과 순간 펄스를 통해 운전자의 즉각 감속 및 법규 준수 유도.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 font-medium">
            ✅ <b>규제 준수:</b> 평시 0 Lux 운용으로 빛공해 규제를 완벽 충족하며 고체 LED 탑재로 수명 10만 시간 이상 보장.
          </div>
        </div>
      </div>

      {/* 4-Step Operational Process Flow */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          하이브리드 교통 단속 조명 4단계 스마트 운영 프로세스
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          인공지능 엣지 카메라와 듀얼 투광기가 어떻게 통신하며 빛공해 없이 결정적 증거를 채집하는지 도식화한 흐름입니다.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">STEP 01</span>
                <Eye className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">상시 스텔스 감시</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                850nm 고출력 IR 조명이 도로에 연속 조사되어, 눈부심 없이 24시간 통행 차량의 번호판을 자동 인식 및 추적합니다.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-medium text-indigo-600">조도: 0 Lux (육안 비가시)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">STEP 02</span>
                <Car className="w-4 h-4 text-amber-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">위반 행위 AI 실시간 판별</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                레이더 및 비전 AI 신경망이 차량의 과속, 신호위반, 버스전용차로 침범, 안전벨트 미착용을 실시간 포착합니다.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-medium text-amber-600">판별 속도: 15ms 이내</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700">STEP 03</span>
                <Zap className="w-4 h-4 text-rose-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">초정밀 펄스 트리거</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                TTL 하드웨어 접점을 통해 180~500µs 미세 시간 동안 백색 가시광 스트로보를 발광하여 셔터 노출과 완벽 동기화합니다.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-medium text-rose-600">오차 범위: ±5µs 나노초급</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">STEP 04</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">풀컬러 증거 패킷 전송</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                선명한 차량 번호판, 차체 색상, 운전자 정면 얼굴이 포함된 고화질 풀 컬러 증거 사진을 경찰청 ITS 서버로 암호화 전송합니다.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-medium text-emerald-600">증거 채택률: 99.8% 달성</div>
          </div>
        </div>
      </div>

      {/* Regulation Table: Korea Light Pollution Prevention Act */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">대한민국 환경부 빛공해 방지법 개정 및 처벌 기준</h3>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-600">
            법률 제11조 시행령
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
          빛공해 방지법 강화에 따라 지자체와 경찰청 ITS 단속 장비 또한 빛방사허용기준을 엄격히 준수해야 하며, 기준 위반 시 지자체 관리 주체에도 과태료가 부과될 수 있습니다.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">구분 항목</th>
                <th className="p-3.5">개정 전 기준</th>
                <th className="p-3.5">개정 후 강화 기준</th>
                <th className="p-3.5">하이브리드 조명 대응 효과</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 font-bold text-slate-900">1차 위반 과태료</td>
                <td className="p-3.5 text-slate-500">5만 원</td>
                <td className="p-3.5 font-bold text-rose-600">30만 원 (6배 인상)</td>
                <td className="p-3.5 text-emerald-700 font-medium">평시 IR 0 Lux 운영으로 위반 소지 원천 차단</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">3차 이상 위반 과태료</td>
                <td className="p-3.5 text-slate-500">최대 100만 원</td>
                <td className="p-3.5 font-bold text-rose-600">최대 1,000만 원 부과</td>
                <td className="p-3.5 text-emerald-700 font-medium">지속 민원 해소 및 행정 처분 방지</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">주거지 야간 연직조도</td>
                <td className="p-3.5 text-slate-500">권고 수준 관리</td>
                <td className="p-3.5 font-semibold text-slate-800">1종~3종 구역 10 Lux 이하 엄격 제한</td>
                <td className="p-3.5 text-emerald-700 font-medium">타원형 HRT 렌즈로 차선 외 주거지 빛 누출 95% 차단</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">운전자 눈부심 지수 (TI)</td>
                <td className="p-3.5 text-slate-500">규정 미비</td>
                <td className="p-3.5 font-semibold text-slate-800">임계불능 지표 15% 이하 유지</td>
                <td className="p-3.5 text-emerald-700 font-medium">적색 암점(Glow) 기술로 시야 방해 제로</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
