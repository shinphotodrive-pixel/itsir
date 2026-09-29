export interface Product {
  id: string;
  brand: string;
  name: string;
  type: string;
  irRange: number;
  whiteRange: number;
  housing: string;
  specs: string;
  power?: string;
  voltage?: string;
  protection?: string;
  beamAngle?: string;
  url: string;
  badge: string;
  keyFeatures: string[];
}

export interface PurchaseItem {
  id: string;
  productName: string;
  features: string;
  distributor: string;
  url: string;
  notes: string;
  region: string;
  badge: string;
}

export interface VideoItem {
  id: string;
  brand: string;
  brandColor: string;
  title: string;
  description: string;
  youtubeId1: string;
  label1: string;
  youtubeId2?: string;
  label2?: string;
  duration?: string;
  category: string;
}

export type TabType = 'overview' | 'optics' | 'products' | 'sync' | 'resources';

export interface OpticsSimulationResult {
  distance: number;
  visibilityText: string;
  visibilityClass: string;
  modeText: string;
  snrEstimate: number;
  beamWidthAt100m: number;
  illuminanceAt50m: number;
}
