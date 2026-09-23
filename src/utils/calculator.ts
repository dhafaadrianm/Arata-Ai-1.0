import {
  MaterialOption,
  SlicerInputData,
  LaserInputData,
  CalculatedResult,
  InputMode3D,
  InputModeLaser,
} from '../types';

/**
 * Format number to Indonesian Rupiah currency format
 * e.g. 15000 -> "Rp 15.000"
 */
export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rounded);
}

/**
 * Calculate estimated weight in grams from 3D model bounding dimensions and infill
 */
export function estimateWeightFromDimensions(
  data: SlicerInputData,
  density: number
): { weightGrams: number; volumeCm3: number; estimatedMinutes: number } {
  const { lengthX, widthY, heightZ, infillPercent, geometryType, wallThickness } = data;

  // Bounding box in cm³ (mm / 10 to convert to cm)
  const boundingVolumeCm3 = (Math.max(1, lengthX) * Math.max(1, widthY) * Math.max(1, heightZ)) / 1000;

  // Shape occupancy factor relative to bounding box
  let occupancyFactor = 0.28; // standard default
  switch (geometryType) {
    case 'mechanical':
      occupancyFactor = 0.45; // denser, flat walls, brackets
      break;
    case 'standard':
      occupancyFactor = 0.30;
      break;
    case 'organic':
      occupancyFactor = 0.22; // figures, complex curvatures
      break;
    case 'hollow':
      occupancyFactor = 0.15; // cups, vases, casings
      break;
  }

  // Shell thickness factor based on walls (1-4 walls)
  const shellFactor = Math.min(0.55, 0.15 + wallThickness * 0.08);
  const infillRatio = Math.max(0, Math.min(100, infillPercent)) / 100;

  // Solid portion = shell + interior filled by infill
  const solidRatio = shellFactor + (1 - shellFactor) * infillRatio;

  const effectiveVolumeCm3 = boundingVolumeCm3 * occupancyFactor * solidRatio;

  // Weight = volume in cm³ * density in g/cm³
  const calculatedWeight = Math.max(1, effectiveVolumeCm3 * density);
  const roundedWeight = Math.round(calculatedWeight * 10) / 10;

  // Rough print time estimation (approx 8 - 15 grams per hour for standard FDM, or layer height based)
  const estimatedMinutes = Math.max(15, Math.round((roundedWeight / 12) * 60));

  return {
    weightGrams: roundedWeight,
    volumeCm3: Math.round(effectiveVolumeCm3 * 10) / 10,
    estimatedMinutes,
  };
}

/**
 * Calculate 3D Printing cost
 */
export function calculate3DPrint(
  material: MaterialOption,
  data: SlicerInputData,
  mode: InputMode3D
): CalculatedResult {
  let estimatedWeight = 0;
  let volumeCm3: number | undefined;
  let estimatedMinutes: number | undefined;
  let dimensionsSummary = '';
  let infillSummary = '';

  if (mode === 'direct_weight') {
    estimatedWeight = Math.max(0, data.directWeight);
    dimensionsSummary = 'Input langsung dari slicer';
    infillSummary = '-';
    // Rough estimate for print time
    estimatedMinutes = Math.max(15, Math.round((estimatedWeight / 12) * 60));
  } else {
    const est = estimateWeightFromDimensions(data, material.density);
    estimatedWeight = est.weightGrams;
    volumeCm3 = est.volumeCm3;
    estimatedMinutes = est.estimatedMinutes;
    dimensionsSummary = `${data.lengthX} × ${data.widthY} × ${data.heightZ} mm`;
    infillSummary = `${data.infillPercent}% infill (${data.geometryType})`;
  }

  const subtotalPerItem = Math.round(estimatedWeight * material.pricePerUnit);
  const totalPrice = subtotalPerItem * Math.max(1, data.quantity);

  return {
    materialId: material.id,
    materialName: material.name,
    serviceType: '3d_print',
    fileName: data.fileName.trim() || 'Model 3D Part',
    quantity: Math.max(1, data.quantity),
    unitRate: material.pricePerUnit,
    unitLabel: 'gram',
    estimatedWeightOrLength: estimatedWeight,
    subtotalPerItem,
    totalPrice,
    volumeCm3,
    estimatedPrintTimeMinutes: estimatedMinutes,
    dimensionsSummary,
    infillSummary,
  };
}

/**
 * Calculate estimated laser path length in meters
 */
export function estimateLaserMetersFromDimensions(data: LaserInputData): number {
  const { lengthX, widthY, engravingType } = data;
  const xMeters = lengthX / 1000;
  const yMeters = widthY / 1000;

  if (engravingType === 'vector_cut') {
    // Keliling luar + estimasi detail internal 1.5x
    const perimeter = 2 * (xMeters + yMeters);
    return Math.max(0.1, Math.round(perimeter * 1.5 * 100) / 100);
  }

  // Raster engraving (bolak-balik scanline laser)
  // Step over: dense ~0.15mm (0.00015m), light ~0.35mm (0.00035m)
  const lineSpacingMeters = engravingType === 'raster_dense' ? 0.0002 : 0.0004;
  const numPasses = Math.max(1, Math.floor(yMeters / lineSpacingMeters));
  // Total laser path in meters
  const totalLaserPath = numPasses * xMeters;
  return Math.max(0.2, Math.round(totalLaserPath * 10) / 10);
}

/**
 * Calculate Laser Engraving cost (Rp 100 per meter)
 */
export function calculateLaser(
  material: MaterialOption,
  data: LaserInputData,
  mode: InputModeLaser
): CalculatedResult {
  let estimatedMeters = 0;
  let dimensionsSummary = '';

  if (mode === 'direct_length') {
    estimatedMeters = Math.max(0, data.directMeters);
    dimensionsSummary = 'Panjang lintasan langsung';
  } else {
    estimatedMeters = estimateLaserMetersFromDimensions(data);
    const typeLabel =
      data.engravingType === 'vector_cut'
        ? 'Vector Cut / Garis Potong'
        : data.engravingType === 'raster_dense'
        ? 'Grafir Raster Padat'
        : 'Grafir Raster Ringan';
    dimensionsSummary = `${data.lengthX} × ${data.widthY} mm (${typeLabel})`;
  }

  const subtotalPerItem = Math.round(estimatedMeters * material.pricePerUnit);
  const totalPrice = subtotalPerItem * Math.max(1, data.quantity);

  return {
    materialId: material.id,
    materialName: material.name,
    serviceType: 'laser_engraving',
    fileName: data.fileName.trim() || 'Desain Laser Part',
    quantity: Math.max(1, data.quantity),
    unitRate: material.pricePerUnit,
    unitLabel: 'meter',
    estimatedWeightOrLength: estimatedMeters,
    subtotalPerItem,
    totalPrice,
    dimensionsSummary,
  };
}

/**
 * Convert print minutes to readable hours and minutes format
 */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} menit`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} jam`;
  }
  return `${hours} jam ${remainingMinutes} mnt`;
}
