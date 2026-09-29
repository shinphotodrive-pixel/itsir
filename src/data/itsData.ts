import { Product, PurchaseItem, VideoItem } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'dahua-italf',
    brand: 'Dahua',
    name: 'ITALF-300AG-GL 올인원 일루미네이터',
    type: '4-in-1 다목적 고성능 플래시',
    irRange: 150,
    whiteRange: 100,
    housing: '279 x 279 x 452 mm (대형 원형 광학 하우징)',
    power: '최대 300W 펄스',
    voltage: 'AC 90~264V',
    protection: 'IP66 방수방진',
    beamAngle: '10° / 15° 원형',
    specs: '웜라이트 LED 스트로보/플래시 + 백색/IR 제논 플래시 동시 탑재, 180~500µs 마이크로초 펄스 제어, RS485 및 TTL 하드웨어 동기화 지원',
    url: 'https://www.dahuasecurity.com/products/intelligent-traffic/intelligent-traffic-products/supplement-lights/flash-light/italf-300AG-GL',
    badge: '올인원 최고사양',
    keyFeatures: [
      '4가지 모드 통합 (LED 연속/스트로보 + 제논 가시/IR 플래시)',
      '180µs 초정밀 카메라 셔터 동기화',
      'AI 차체 반사율 연동 1~16단계 가변 조광',
      '고속도로 ANPR 및 속도 단속 최적화'
    ]
  },
  {
    id: 'raytec-hy16',
    brand: 'Raytec',
    name: 'VARIO2 IP PoE Hybrid (HY16-1)',
    type: 'Network 2-in-1 IP Hybrid',
    irRange: 450,
    whiteRange: 195,
    housing: '3.1kg 압출 알루미늄 대형 방열 섀시',
    power: '90W PoE (IEEE 802.3bt)',
    voltage: 'PoE++ 또는 24V DC',
    protection: 'IP66, IK10 내충격',
    beamAngle: '10°x10° (기본), 교체형 디퓨저 지원',
    specs: '24 IR(850nm) + 24 White LED 교차 배열, Platinum LED 기술 탑재, 10° 원형 교체형 렌즈, HTTP REST API & VMS 직접 연동',
    url: 'https://www.bhphotovideo.com/c/product/1831866-REG/raytec_var2_ippoe_hy16_1_vario2_ip_hybrid_network.html',
    badge: '450m 초장거리',
    keyFeatures: [
      '세계 최장 450m 적외선 투과 거리 (10° 렌즈)',
      '평시 IR 스텔스 감시 + 침입/위반 시 백색광 경고',
      'HRT 홀로그래픽 렌즈(10°, 35°x10°, 60°x25°) 핫스팟 제거',
      'IP 웹 GUI 및 VMS(Milestone, Genetec) 네이티브 통합'
    ]
  },
  {
    id: 'raytec-hy4',
    brand: 'Raytec',
    name: 'VARIO2 IP PoE Hybrid (HY4-1)',
    type: 'Mid-range Compact Hybrid',
    irRange: 130,
    whiteRange: 70,
    housing: '1.2kg 콤팩트 알루미늄 섀시',
    power: '25W PoE+ (IEEE 802.3at)',
    voltage: 'PoE+ 또는 12-24V AC/DC',
    protection: 'IP66, IK09',
    beamAngle: '10°x10°, 35°x10°, 60°x25°',
    specs: 'HRT 타원형 및 원형 Interchangeable Lens 시스템, VMS 직접 결합 시각 경고 가동, 도심형 교차로 및 2~3차선 ANPR 표준',
    url: 'https://www.orbitadigital.com/en/cctv-accessories/illuminators/19180-var2-ippoe-hy4-1.html',
    badge: '표준 차선용',
    keyFeatures: [
      '도심 도로 맞춤형 130m IR / 70m 백색광',
      '타원형 빔 포밍으로 번호판 화이트아웃 방지',
      '원격 웹 브라우저 조도 튜닝 및 타이머 제어',
      '저전력 25W로 친환경 에너지 절감 규격'
    ]
  },
  {
    id: 'hikvision-allrounder',
    brand: 'Hikvision',
    name: 'iDS-TCV907-HER All-Rounder',
    type: '통합 카메라 + 레이더 + 스트로보',
    irRange: 150,
    whiteRange: 150,
    housing: '통합 올인원 센서 하우징',
    power: '45W (피크 90W)',
    voltage: 'AC 100~240V',
    protection: 'IP66, 서지 보호 6kV',
    beamAngle: '2~3차선 광학 화각 맞춤',
    specs: '9MP 글로벌 셔터 GMOS 센서, 60~61GHz 고주파 FMCW 레이더 내장 (최대 128대 차량 동시 추적), 16개 고휘도 듀얼 스트로보 비즈 탑재',
    url: 'https://www.securitywholesalers.com.au/product/hikvision-ids-2cd8a46g0-izhs-deepinview-face-recognition-indoor-moto-varifocal-bullet-network-camera/',
    badge: '레이더 일체형',
    keyFeatures: [
      '레이더 + 9MP 카메라 + 하이브리드 스트로보 3-in-1',
      '128대 차선별 속도/궤적 실시간 추적',
      '차량 색상/차종/안전벨트/휴대폰 사용 동시 AI 식별',
      'ColorVu 기술 결합 야간 초저조도 풀컬러 생성'
    ]
  },
  {
    id: 'tattile-smart',
    brand: 'Others',
    name: 'Tattile Smart+ Traffic Light',
    type: 'AI 엣지 ANPR 전용 카메라',
    irRange: 100,
    whiteRange: 50,
    housing: '항공용 알루미늄 합금 하우징',
    power: '30W 이하',
    voltage: '24V DC / PoE+',
    protection: 'IP67 완전 방진방수',
    beamAngle: '차선 정밀 집광',
    specs: '850nm 고출력 IR LED 12개 원형 배치, BCCM (Blue Code Color Matrix) 독자 알고리즘, 최대 320km/h 주행 차량 99% 적색신호위반 단속',
    url: 'https://www.tattile.com/vision-solutions/smart-traffic-light/',
    badge: '초고속 단속',
    keyFeatures: [
      '최대 320km/h 극한 속도 모션 블러 제로화',
      '교차로 적색 신호위반 및 꼬리물기 특화',
      '차량 번호판 + 신호등 현시 동시 캡처',
      '독립형 Edge AI 신경망 온보드 처리'
    ]
  },
  {
    id: 'titanhz-ir',
    brand: 'Others',
    name: 'TitanHz Supplement IR Flash Light',
    type: '단독 고출력 제논 펄스 플래시',
    irRange: 120,
    whiteRange: 0,
    housing: '헤비듀티 주물 방열 플래시',
    power: '200J 순간 펄스 에너지',
    voltage: 'AC 220V',
    protection: 'IP66',
    beamAngle: '12° 스팟 빔',
    specs: '200J 제논 펄스 방전 튜브, 67ms 이하 고속 리차징 충전 시간, 850nm 파장 단일 차선 고휘도 조명에 특화된 산업용 보조 플래시',
    url: 'https://www.titanhz.com/titanhz-intelligent-traffic-supplement-light.aspx',
    badge: '200J 제논 펄스',
    keyFeatures: [
      '200 줄(Joule) 초강력 순간 광량 방출',
      '야간 악천후(안개, 우천) 관통 투과율 우수',
      '외장 컨트롤러 연동 TTL 펄스 트리거링',
      '전통 제논 특유의 높은 순간 피크 발광력'
    ]
  }
];

export const PURCHASE_ITEMS: PurchaseItem[] = [
  {
    id: 'pur-1',
    productName: 'Raytec VARIO2 IP PoE Hybrid (HY16-1)',
    features: 'IR(450m) + 백색광(195m), 10° 원형 렌즈, 90W PoE, Web API',
    distributor: 'B&H Photo Video',
    url: 'https://www.bhphotovideo.com/c/product/1831866-REG/raytec_var2_ippoe_hy16_1_vario2_ip_hybrid_network.html',
    notes: '글로벌 최대 광학 유통망 (엔터프라이즈 B2B 구매 견적 발송 지원)',
    region: '글로벌 / 북미',
    badge: 'B2B 공식'
  },
  {
    id: 'pur-2',
    productName: 'Raytec VARIO2 IP PoE Hybrid (HY4-1)',
    features: 'IR(130m) + 백색광(70m), HRT 타원형/원형 렌즈, 25W PoE+',
    distributor: 'Orbita Digital',
    url: 'https://www.orbitadigital.com/en/cctv-accessories/illuminators/19180-var2-ippoe-hy4-1.html',
    notes: '전문 CCTV 및 ITS 주변기기 유럽 공인 유통 벤더',
    region: '유럽 / 인터내셔널',
    badge: '공인 유통사'
  },
  {
    id: 'pur-3',
    productName: 'Raytec VARIO2 HYBRID 전 라인업',
    features: 'IR 및 백색광 동시 탑재, 국내 지자체 납품 인증, 기술 컨설팅',
    distributor: 'Optex Korea (옵텍스코리아)',
    url: 'https://www.optexkorea.com/products/cctv-lighting/vario2-hybrid/',
    notes: '한국 공식 지사 (국내 관공서 B2B, 지자체 조달 연계 및 현장 기술 지원)',
    region: '대한민국 (국내 공식)',
    badge: '국내 공식 파트너'
  },
  {
    id: 'pur-4',
    productName: 'Raytec PSTR-i96-HV ANPR Pulsed IR',
    features: 'ANPR 전용 고휘도 Pulsed IR (초고속 차선 단속 전용 조명)',
    distributor: 'Use-IP (UK)',
    url: 'https://www.use-ip.co.uk/accessories/cctv-lighting',
    notes: '영국 기반 ITS 및 지능형 카메라 전문 유통몰',
    region: '영국 / 유럽',
    badge: '전문 유통'
  },
  {
    id: 'pur-5',
    productName: 'Hikvision TandemVu / All-Rounder (iDS시리즈)',
    features: '4MP/9MP 하이브리드 일루미네이터, ColorVu 야간 컬러 캡처 통합',
    distributor: 'Security Wholesalers',
    url: 'https://www.securitywholesalers.com.au/product/hikvision-ids-2cd8a46g0-izhs-deepinview-face-recognition-indoor-moto-varifocal-bullet-network-camera/',
    notes: '오세아니아/아시아 태평양 ITS 솔루션 B2B 공식 도매 채널',
    region: 'APAC',
    badge: '도매 채널'
  }
];

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 'vid-1',
    brand: 'Dahua Technology',
    brandColor: 'bg-red-500/10 text-red-600 border-red-200',
    title: 'Dahua Smart Dual Light 기술 & 라이브 현장 시연',
    description: '평시 850nm IR 모드로 도로 빛공해를 완벽 방지하다가 위반 차량 포착 시 웜 라이트로 전환하여 풀 컬러 영상 증거를 수집하는 메커니즘 시연.',
    youtubeId1: 'JNf1m5kZWUg',
    label1: '스마트 듀얼 라이트 원리',
    youtubeId2: 'Ee0YWdf00Ac',
    label2: '야간 실제 테스트 영상',
    category: '광학 메커니즘'
  },
  {
    id: 'vid-2',
    brand: 'Raytec',
    brandColor: 'bg-blue-500/10 text-blue-600 border-blue-200',
    title: 'Raytec VARIO2 Hybrid & Extreme 기술 소개',
    description: 'HRT 홀로그래픽 타원형 디퓨저로 차선 전체 균일 조도를 구현하고, 센서 이벤트 트리거 시 가시광 플래시로 운전자 경고 효과를 극대화하는 시연.',
    youtubeId1: 'uo27BXMA1_w',
    label1: 'VARIO2 하이브리드 기술',
    youtubeId2: 's3waG3iaQco',
    label2: 'ANPR 고속 단속 솔루션',
    category: '홀로그래픽 광학'
  },
  {
    id: 'vid-3',
    brand: 'Hikvision',
    brandColor: 'bg-rose-500/10 text-rose-600 border-rose-200',
    title: 'Hikvision ITS Traffic & Radar Speed Detection',
    description: 'FMCW 고주파 레이더와 듀얼 센서 렌즈, 고성능 스트로보 라이트 비즈가 실시간 동기화되어 다차선 과속 및 신호위반을 포착하는 인터페이스.',
    youtubeId1: 'amYUQqLvxSU',
    label1: 'ITS 통합 솔루션',
    youtubeId2: '1ePrxNZq4qk',
    label2: '레이더 속도 측정 리뷰',
    category: '레이더/카메라 통합'
  },
  {
    id: 'vid-4',
    brand: 'Dahua / Web 5.0',
    brandColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    title: 'Web 5.0 하이브리드 일루미네이터 설정 및 튜닝 가이드',
    description: '웹 GUI 인터페이스를 통해 일루미네이터 조도 감도, 마이크로초 펄스 폭 트리거, 주야간 스케줄링 반응 모드를 단계별로 구성하는 엔지니어링 가이드.',
    youtubeId1: 'HAkak-wSnaI',
    label1: 'GUI 설정 튜토리얼 1',
    youtubeId2: 'v8IeitRJ9gY',
    label2: 'GUI 설정 튜토리얼 2',
    category: '엔지니어링 설정'
  }
];

export const REGULATION_FACTS = {
  koreaAct: '환경부 인공조명에 의한 빛공해 방지법 제11조 및 시행령 개정안',
  fineChange: '1차 위반 시 과태료 5만 원 → 30만 원 (6배 인상), 3차 이상 최대 1,000만 원 부과',
  luminanceLimit: '주거지 야간 연직조도 기준 10 Lux 이하(보호구역 2 Lux 이하) 엄격 제한',
  traditionalIssue: '기존 제논 플래시(Xenon) 순간 최대 25,000 Lux 이상 방출로 운전자 순간 실명(Flash Blindness) 및 민원 급증',
  hybridSolution: '평시 850nm 비가시 적외선(IR) 0 Lux(육안 기준) 운용, 위반 시에만 300µs 미세 펄스 가시광 발광'
};
