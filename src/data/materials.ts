import { MaterialOption, PresetItem } from '../types';

export const MATERIALS: MaterialOption[] = [
  {
    id: 'pla_plus',
    name: '3D Print PLA+',
    category: '3d_print',
    pricePerUnit: 299,
    unit: 'gram',
    description: 'Filamen ramah lingkungan, presisi tinggi, hasil rapi, ideal untuk prototipe & pajangan.',
    density: 1.24, // g/cm³
    tag: 'Paling Populer',
    color: 'emerald',
    recommendedFor: 'Prototipe, action figure, casing hobi, dudukan handphone, dekorasi',
  },
  {
    id: 'petg',
    name: '3D Print PETG',
    category: '3d_print',
    pricePerUnit: 499,
    unit: 'gram',
    description: 'Lebih kuat, tahan panas & benturan, tahan cuaca outdoor, lentur & kokoh.',
    density: 1.27, // g/cm³
    tag: 'Tahan Panas & Kuat',
    color: 'amber',
    recommendedFor: 'Part fungsional mesin, aksesoris motor/mobil, bracket teknis, outdoor',
  },
  {
    id: 'resin',
    name: '3D Print Resin (SLA/MSLA)',
    category: '3d_print',
    pricePerUnit: 599,
    unit: 'gram',
    description: 'Resolusi ultra tajam tanpa garis layer kasat mata, detail sangat mikroskopis & mulus.',
    density: 1.15, // g/cm³
    tag: 'Detail Ultra Halus',
    color: 'purple',
    recommendedFor: 'Miniatur anime, perhiasan, cetakan gigi/medis, part presisi tinggi',
  },
  {
    id: 'laser_engraving',
    name: 'Laser Engraving & Cut',
    category: 'laser_engraving',
    pricePerUnit: 100,
    unit: 'meter',
    description: 'Grafir tajam & potong presisi untuk kayu, akrilik, kulit, kertas karton, atau logam coating.',
    density: 0,
    tag: 'Rp 100 / Meter',
    color: 'rose',
    recommendedFor: 'Plakat, grafir logo, gantungan kunci kayu/akrilik, souvenir, tumbler',
  },
];

export const PRESETS: PresetItem[] = [
  {
    id: 'keychain_pla',
    title: 'Gantungan Kunci Custom (3D)',
    materialId: 'pla_plus',
    category: '3d_print',
    dimensions: { x: 50, y: 30, z: 5 },
    infill: 20,
    weightOrLength: 12,
    description: 'Ukuran 5 x 3 cm tebal 5mm, infill 20%',
  },
  {
    id: 'phone_stand',
    title: 'Dudukan / Stand HP (3D)',
    materialId: 'pla_plus',
    category: '3d_print',
    dimensions: { x: 80, y: 70, z: 65 },
    infill: 15,
    weightOrLength: 45,
    description: 'Stand handphone meja kokoh, infill 15%',
  },
  {
    id: 'bracket_petg',
    title: 'Bracket / Dudukan Teknis (3D)',
    materialId: 'petg',
    category: '3d_print',
    dimensions: { x: 60, y: 40, z: 25 },
    infill: 40,
    weightOrLength: 35,
    description: 'Part mekanikal kuat tahan panas, infill 40%',
  },
  {
    id: 'miniature_resin',
    title: 'Miniatur Karakter / Figure (3D)',
    materialId: 'resin',
    category: '3d_print',
    dimensions: { x: 35, y: 35, z: 75 },
    infill: 100,
    weightOrLength: 28,
    description: 'Tinggi 7.5cm detail tinggi resin padat / hollow',
  },
  {
    id: 'plakat_akrilik',
    title: 'Grafir Plakat / Logo 10x10 cm',
    materialId: 'laser_engraving',
    category: 'laser_engraving',
    dimensions: { x: 100, y: 100 },
    weightOrLength: 20, // 20 meter lintasan
    description: 'Ukuran 10x10cm grafir raster sedang (estimasi 20m)',
  },
  {
    id: 'laser_tag',
    title: 'Label Nama / Keychain Kayu Grafir',
    materialId: 'laser_engraving',
    category: 'laser_engraving',
    dimensions: { x: 60, y: 25 },
    weightOrLength: 6, // 6 meter lintasan
    description: 'Grafir teks nama & potong outline (estimasi 6m)',
  },
];
