export type ServiceType = '3d_print' | 'laser_engraving';

export type MaterialId = 'pla_plus' | 'petg' | 'resin' | 'laser_engraving';

export interface MaterialOption {
  id: MaterialId;
  name: string;
  category: ServiceType;
  pricePerUnit: number;
  unit: 'gram' | 'meter';
  description: string;
  density: number; // g/cm³ (for 3D print: PLA+ ~1.24, PETG ~1.27, Resin ~1.15)
  tag: string;
  color: string;
  recommendedFor: string;
}

export type InputMode3D = 'dimensions' | 'direct_weight';

export type ModelGeometryType = 'organic' | 'standard' | 'hollow' | 'mechanical';

export interface SlicerInputData {
  // Dimensions in mm
  lengthX: number; // mm
  widthY: number;  // mm
  heightZ: number; // mm
  infillPercent: number; // 0 to 100%
  geometryType: ModelGeometryType;
  wallThickness: number; // 1 to 4 perimeter shells
  
  // Direct weight input in grams
  directWeight: number;
  
  // Quantity
  quantity: number;
  
  // Custom part name / file name
  fileName: string;
}

export type InputModeLaser = 'direct_length' | 'dimensions';

export interface LaserInputData {
  // Dimensions in mm or cm
  lengthX: number; // mm
  widthY: number;  // mm
  engravingType: 'raster_dense' | 'raster_light' | 'vector_cut';
  
  // Direct length in meters
  directMeters: number;
  
  // Quantity
  quantity: number;
  
  // Custom part name
  fileName: string;
}

export interface CalculatedResult {
  materialId: MaterialId;
  materialName: string;
  serviceType: ServiceType;
  fileName: string;
  quantity: number;
  unitRate: number; // Rp per gram or Rp per meter
  unitLabel: 'gram' | 'meter';
  
  // Calculated metrics
  estimatedWeightOrLength: number; // grams or meters per item
  subtotalPerItem: number;
  totalPrice: number;
  
  // Detailed metadata for slicer breakdown
  volumeCm3?: number;
  estimatedPrintTimeMinutes?: number;
  dimensionsSummary?: string;
  infillSummary?: string;
}

export interface PresetItem {
  id: string;
  title: string;
  materialId: MaterialId;
  category: ServiceType;
  dimensions: { x: number; y: number; z?: number };
  infill?: number;
  weightOrLength: number;
  description: string;
}
