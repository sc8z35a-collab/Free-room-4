import * as THREE from 'three';

/**
 * Complete 135-Tile Photographic PBR Atlas Registry (15 Atlases x 3x3 Grid).
 * Every tile maps directly to the user's 15 high-resolution seamless PBR atlases
 * stored at `./textures/pbr/atlas_01.jpg` .. `atlas_15.jpg`.
 */
export const PBR_TILE_CATALOG = {
  // === ATLAS 01: Industrial Concrete, Plaster, Grating, Rubber, Ceramic, Towel, Wet Rock ===
  darkSlateMetal:      { atlas: 1, r: 0, c: 0, rough: 0.48, metal: 0.65, nStr: 1.4, fallback: 0x2b2e33 },
  viaductConcreteRust: { atlas: 1, r: 0, c: 1, rough: 0.88, metal: 0.04, nStr: 2.1, fallback: 0x8f8a82 },
  creamPlasterWall:    { atlas: 1, r: 0, c: 2, rough: 0.90, metal: 0.02, nStr: 0.8, fallback: 0xe6dfd0 },
  steelTrenchGrate:    { atlas: 1, r: 1, c: 0, rough: 0.36, metal: 0.84, nStr: 2.6, fallback: 0x646b73 },
  rubberDimpleBlack:   { atlas: 1, r: 1, c: 1, rough: 0.72, metal: 0.05, nStr: 2.5, fallback: 0x1e2024 },
  matteCarbonBlack:    { atlas: 1, r: 1, c: 2, rough: 0.62, metal: 0.14, nStr: 1.0, fallback: 0x202226 },
  ceramicGlazeCream:   { atlas: 1, r: 2, c: 0, rough: 0.16, metal: 0.05, nStr: 0.5, fallback: 0xebe6d8 },
  bathTowelWoven:      { atlas: 1, r: 2, c: 1, rough: 0.94, metal: 0.00, nStr: 2.2, fallback: 0xe8edf2 },
  wetDarkBoulder:      { atlas: 1, r: 2, c: 2, rough: 0.34, metal: 0.08, nStr: 2.8, fallback: 0x2f312e },

  // === ATLAS 02: Grass, Dry Grass, Soil, Autumn Leaves, Hedge Foliage, Tree Bark, Moss, Woodchips ===
  grassFresh:          { atlas: 2, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 2.0, fallback: 0x4d7c0f },
  grassDryAutumn:      { atlas: 2, r: 0, c: 1, rough: 0.94, metal: 0.00, nStr: 2.0, fallback: 0xa18a5c },
  soilRichDark:        { atlas: 2, r: 0, c: 2, rough: 0.95, metal: 0.00, nStr: 2.4, fallback: 0x3b312a },
  autumnFallenLeaves:  { atlas: 2, r: 1, c: 0, rough: 0.86, metal: 0.00, nStr: 2.3, fallback: 0x9a6338 },
  hedgeFoliageGreen:   { atlas: 2, r: 1, c: 1, rough: 0.80, metal: 0.00, nStr: 2.2, fallback: 0x2e6b1e },
  treeBarkRealistic:   { atlas: 2, r: 1, c: 2, rough: 0.92, metal: 0.00, nStr: 2.8, fallback: 0x6e5d4f },
  forestMoss:          { atlas: 2, r: 2, c: 0, rough: 0.95, metal: 0.00, nStr: 2.2, fallback: 0x5c7c22 },
  woodChipsMulch:      { atlas: 2, r: 2, c: 1, rough: 0.90, metal: 0.00, nStr: 2.4, fallback: 0x8d633e },
  wildCloverGrass:     { atlas: 2, r: 2, c: 2, rough: 0.90, metal: 0.00, nStr: 1.9, fallback: 0x538424 },

  // === ATLAS 03: Asphalt, Cracked Asphalt, Yellow Tactile Paving, Curb, Pavers, Concrete, Gravel, Corrugated ===
  asphaltFine:         { atlas: 3, r: 0, c: 0, rough: 0.88, metal: 0.04, nStr: 2.0, fallback: 0x4b4f56 },
  asphaltCracked:      { atlas: 3, r: 0, c: 1, rough: 0.90, metal: 0.04, nStr: 2.4, fallback: 0x454950 },
  tactilePavingYellow: { atlas: 3, r: 0, c: 2, rough: 0.72, metal: 0.02, nStr: 2.6, fallback: 0xeab308 },
  concreteCurb:        { atlas: 3, r: 1, c: 0, rough: 0.86, metal: 0.03, nStr: 2.2, fallback: 0x8c8d8b },
  sidewalkPavers:      { atlas: 3, r: 1, c: 1, rough: 0.84, metal: 0.03, nStr: 2.0, fallback: 0x7c7f85 },
  smoothConcreteSlab:  { atlas: 3, r: 1, c: 2, rough: 0.76, metal: 0.05, nStr: 1.4, fallback: 0x7b838e },
  gravelStones:        { atlas: 3, r: 2, c: 0, rough: 0.92, metal: 0.02, nStr: 2.8, fallback: 0x868582 },
  corrugatedZincSteel: { atlas: 3, r: 2, c: 1, rough: 0.42, metal: 0.78, nStr: 2.4, fallback: 0x94a0ad },
  stormDrainGrate:     { atlas: 3, r: 2, c: 2, rough: 0.40, metal: 0.82, nStr: 2.8, fallback: 0x676f78 },

  // === ATLAS 04: Tatami, Washi, Office Carpet, Wallpaper, Ceiling Tile, White Tile, Walnut Flooring, Checkered ===
  tatamiWoven:         { atlas: 4, r: 0, c: 0, rough: 0.88, metal: 0.00, nStr: 1.8, fallback: 0xa6a365 },
  washiPaperSoft:      { atlas: 4, r: 0, c: 1, rough: 0.92, metal: 0.00, nStr: 0.8, fallback: 0xf0ebe2 },
  carpetTileDark:      { atlas: 4, r: 0, c: 2, rough: 0.95, metal: 0.00, nStr: 2.1, fallback: 0x4b4f56 },
  carpetBeigeLoop:     { atlas: 4, r: 1, c: 0, rough: 0.94, metal: 0.00, nStr: 2.0, fallback: 0xb39f8c },
  wallpaperWhiteWoven: { atlas: 4, r: 1, c: 1, rough: 0.90, metal: 0.00, nStr: 1.4, fallback: 0xedeae3 },
  acousticCeilingTile: { atlas: 4, r: 1, c: 2, rough: 0.92, metal: 0.00, nStr: 1.6, fallback: 0xeaeaea },
  whiteSquareTile:     { atlas: 4, r: 2, c: 0, rough: 0.24, metal: 0.04, nStr: 1.2, fallback: 0xf1f3f5 },
  walnutWoodFloor:     { atlas: 4, r: 2, c: 1, rough: 0.46, metal: 0.04, nStr: 1.7, fallback: 0x5c3c24 },
  checkeredLinoleum:   { atlas: 4, r: 2, c: 2, rough: 0.40, metal: 0.04, nStr: 0.9, fallback: 0xbcb9b0 },

  // === ATLAS 05: Precision Hull Panels (White, Yellow, Clean White, Gunmetal, Rusted Patch, Orange-White, Steel, Blue-White, Black) ===
  panelWhiteWeathered: { atlas: 5, r: 0, c: 0, rough: 0.48, metal: 0.45, nStr: 1.8, fallback: 0xd9dad8 },
  panelIndustrialYel:  { atlas: 5, r: 0, c: 1, rough: 0.52, metal: 0.55, nStr: 2.1, fallback: 0xc28a1d },
  panelCleanWhiteTech: { atlas: 5, r: 0, c: 2, rough: 0.30, metal: 0.40, nStr: 1.5, fallback: 0xe6ebf0 },
  panelGunmetalTech:   { atlas: 5, r: 1, c: 0, rough: 0.42, metal: 0.72, nStr: 2.0, fallback: 0x4e555e },
  panelRustedPatch:    { atlas: 5, r: 1, c: 1, rough: 0.78, metal: 0.52, nStr: 2.5, fallback: 0x734b38 },
  panelWhiteOrange:    { atlas: 5, r: 1, c: 2, rough: 0.38, metal: 0.42, nStr: 1.6, fallback: 0xe6ddd5 },
  panelHeavySteelBay:  { atlas: 5, r: 2, c: 0, rough: 0.46, metal: 0.74, nStr: 2.2, fallback: 0x878d94 },
  panelWhiteBlueLab:   { atlas: 5, r: 2, c: 1, rough: 0.28, metal: 0.38, nStr: 1.4, fallback: 0xe4ebf2 },
  panelStealthBlack:   { atlas: 5, r: 2, c: 2, rough: 0.44, metal: 0.68, nStr: 1.9, fallback: 0x26292e },

  // === ATLAS 06: Robotic Armor Plates, Conduit Bay, Heat-Blued Titanium, Metal Scrap, Crystals, Pad ===
  armorWhiteOrange:    { atlas: 6, r: 0, c: 0, rough: 0.34, metal: 0.48, nStr: 1.7, fallback: 0xe2dfd9 },
  armorBlackCrimson:   { atlas: 6, r: 0, c: 1, rough: 0.38, metal: 0.65, nStr: 1.9, fallback: 0x3b2d30 },
  armorWhiteGold:      { atlas: 6, r: 0, c: 2, rough: 0.28, metal: 0.68, nStr: 1.6, fallback: 0xe3decb },
  mechConduitBay:      { atlas: 6, r: 1, c: 0, rough: 0.48, metal: 0.76, nStr: 2.7, fallback: 0x474546 },
  heatBluedTitanium:   { atlas: 6, r: 1, c: 1, rough: 0.32, metal: 0.88, nStr: 1.6, fallback: 0x6f5f68 },
  ribbedArmorConduit:  { atlas: 6, r: 1, c: 2, rough: 0.42, metal: 0.74, nStr: 2.4, fallback: 0x5c6066 },
  metalScrapPile:      { atlas: 6, r: 2, c: 0, rough: 0.66, metal: 0.72, nStr: 2.8, fallback: 0x6d7076 },
  crystalClusterBlue:  { atlas: 6, r: 2, c: 1, rough: 0.16, metal: 0.18, nStr: 2.2, fallback: 0x38bdf8 },
  industrialLandingPad:{ atlas: 6, r: 2, c: 2, rough: 0.62, metal: 0.48, nStr: 1.9, fallback: 0x6e7072 },

  // === ATLAS 07: Doors, Stainless Elevator, Wood Door, Vault, Frosted Glass Double Door, Light Panel, Canvas, Truss ===
  heavyBlastDoor:      { atlas: 7, r: 0, c: 0, rough: 0.50, metal: 0.74, nStr: 2.4, fallback: 0x747980 },
  brushedStainlessDoor:{ atlas: 7, r: 0, c: 1, rough: 0.26, metal: 0.88, nStr: 1.2, fallback: 0x9ea5ad },
  classicWoodDoor:     { atlas: 7, r: 0, c: 2, rough: 0.52, metal: 0.04, nStr: 2.1, fallback: 0x7c4e2a },
  steelVaultHatch:     { atlas: 7, r: 1, c: 0, rough: 0.48, metal: 0.80, nStr: 2.6, fallback: 0x757b82 },
  frostedGlassDoor:    { atlas: 7, r: 1, c: 1, rough: 0.24, metal: 0.55, nStr: 1.5, fallback: 0x99aeb5 },
  ceilingLightPanel:   { atlas: 7, r: 1, c: 2, rough: 0.20, metal: 0.10, nStr: 0.8, fallback: 0xf7f5eb },
  wovenCanvasBurlap:   { atlas: 7, r: 2, c: 0, rough: 0.94, metal: 0.00, nStr: 2.0, fallback: 0xd4c2a3 },
  steelTrussShutter:   { atlas: 7, r: 2, c: 1, rough: 0.46, metal: 0.78, nStr: 2.6, fallback: 0x696e75 },
  weatheredBlueConcrete:{ atlas: 7, r: 2, c: 2, rough: 0.82, metal: 0.05, nStr: 1.4, fallback: 0xaabac1 },

  // === ATLAS 08: Carpets, Parquet Wood, Bordered Tatami, Quilted Knit, Damask, Red Gingham ===
  persianCarpetRed:    { atlas: 8, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 1.6, fallback: 0x7c2020 },
  medallionCarpetBlue: { atlas: 8, r: 0, c: 1, rough: 0.92, metal: 0.00, nStr: 1.6, fallback: 0x2a3b5c },
  floralStripFabric:   { atlas: 8, r: 0, c: 2, rough: 0.90, metal: 0.00, nStr: 1.5, fallback: 0x9e7d62 },
  starCarpetPurple:    { atlas: 8, r: 1, c: 0, rough: 0.92, metal: 0.00, nStr: 1.6, fallback: 0x522653 },
  parquetWoodFloor:    { atlas: 8, r: 1, c: 1, rough: 0.44, metal: 0.04, nStr: 1.6, fallback: 0x996537 },
  tatamiBordered:      { atlas: 8, r: 1, c: 2, rough: 0.88, metal: 0.00, nStr: 1.8, fallback: 0xaba870 },
  quiltedKnitFabric:   { atlas: 8, r: 2, c: 0, rough: 0.94, metal: 0.00, nStr: 2.3, fallback: 0xd8cec0 },
  damaskBlueCloth:     { atlas: 8, r: 2, c: 1, rough: 0.90, metal: 0.00, nStr: 1.7, fallback: 0x4d6b8a },
  redGinghamCloth:     { atlas: 8, r: 2, c: 2, rough: 0.92, metal: 0.00, nStr: 1.3, fallback: 0xb85252 },

  // === ATLAS 09: Peeling Plaster, Red Barn Wood, Galvanized Silo, Scratched Red Metal, Gray Planks, Hay, Logs, Mossy Concrete, Diamond Plate ===
  peelingPlasterWall:  { atlas: 9, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 2.6, fallback: 0xc8b99e },
  redBarnWood:         { atlas: 9, r: 0, c: 1, rough: 0.84, metal: 0.00, nStr: 2.3, fallback: 0x8f241f },
  galvanizedSiloMetal: { atlas: 9, r: 0, c: 2, rough: 0.42, metal: 0.80, nStr: 1.8, fallback: 0x89949e },
  scratchedRedSteel:   { atlas: 9, r: 1, c: 0, rough: 0.44, metal: 0.62, nStr: 1.5, fallback: 0xa6201c },
  weatheredGrayPlanks: { atlas: 9, r: 1, c: 1, rough: 0.88, metal: 0.00, nStr: 2.4, fallback: 0x736b5f },
  strawHayBale:        { atlas: 9, r: 1, c: 2, rough: 0.96, metal: 0.00, nStr: 2.6, fallback: 0xb38b43 },
  rusticLogWall:       { atlas: 9, r: 2, c: 0, rough: 0.90, metal: 0.00, nStr: 2.7, fallback: 0x6c513b },
  mossyRustConcrete:   { atlas: 9, r: 2, c: 1, rough: 0.90, metal: 0.04, nStr: 2.4, fallback: 0x7e7d75 },
  diamondPlateSteel:   { atlas: 9, r: 2, c: 2, rough: 0.42, metal: 0.82, nStr: 2.5, fallback: 0x6e7378 },

  // === ATLAS 10: Wild Grass, Daisies, Thistles, Dirt Path, Dry Ferns, Berry Hedge, Charred Ground, Soil Profile, Packed Gravel ===
  wildGrassMeadow:     { atlas: 10, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 2.0, fallback: 0x4f7d1c },
  daisyMeadowGrass:    { atlas: 10, r: 0, c: 1, rough: 0.92, metal: 0.00, nStr: 1.9, fallback: 0x5c8225 },
  thistleBrush:        { atlas: 10, r: 0, c: 2, rough: 0.90, metal: 0.00, nStr: 2.2, fallback: 0x4b6336 },
  dirtFootpath:        { atlas: 10, r: 1, c: 0, rough: 0.94, metal: 0.00, nStr: 2.3, fallback: 0x786245 },
  dryAutumnFerns:      { atlas: 10, r: 1, c: 1, rough: 0.94, metal: 0.00, nStr: 2.5, fallback: 0x87562f },
  berryFoliageBush:    { atlas: 10, r: 1, c: 2, rough: 0.82, metal: 0.00, nStr: 2.2, fallback: 0x4e6625 },
  charredEarth:        { atlas: 10, r: 2, c: 0, rough: 0.96, metal: 0.00, nStr: 2.4, fallback: 0x2b2724 },
  soilCrossSection:    { atlas: 10, r: 2, c: 1, rough: 0.94, metal: 0.00, nStr: 2.5, fallback: 0x73563a },
  packedEarthGravel:   { atlas: 10, r: 2, c: 2, rough: 0.92, metal: 0.00, nStr: 2.5, fallback: 0x8f7d68 },

  // === ATLAS 11: Quartz, Green Marble, Slate, Lichen Rock, Sand, Riverbed Pebbles, Seaweed Rock, Wet Cobbles, Sandy Bank ===
  quartzCrystalRock:   { atlas: 11, r: 0, c: 0, rough: 0.42, metal: 0.06, nStr: 2.5, fallback: 0xc2beb8 },
  greenMarbleVeined:   { atlas: 11, r: 0, c: 1, rough: 0.24, metal: 0.06, nStr: 1.6, fallback: 0x3b543c },
  layeredDarkSlate:    { atlas: 11, r: 0, c: 2, rough: 0.78, metal: 0.08, nStr: 2.7, fallback: 0x5c6066 },
  lichenStoneWall:     { atlas: 11, r: 1, c: 0, rough: 0.88, metal: 0.02, nStr: 2.5, fallback: 0x8c8763 },
  rippledSand:         { atlas: 11, r: 1, c: 1, rough: 0.90, metal: 0.00, nStr: 2.1, fallback: 0xc9a87a },
  riverbedWetPebbles:  { atlas: 11, r: 1, c: 2, rough: 0.24, metal: 0.06, nStr: 2.6, fallback: 0x5f6259 },
  seaweedCoastalRock:  { atlas: 11, r: 2, c: 0, rough: 0.62, metal: 0.04, nStr: 2.6, fallback: 0x5c6b39 },
  wetBlackCobbles:     { atlas: 11, r: 2, c: 1, rough: 0.22, metal: 0.08, nStr: 2.7, fallback: 0x303336 },
  sandyClayBank:       { atlas: 11, r: 2, c: 2, rough: 0.94, metal: 0.00, nStr: 2.5, fallback: 0xa6835c },

  // === ATLAS 12: Stone Masonry, Ivy Wall, Limestone, Brick Plaster, White Stucco, Porous Stone, Water-Streaked Block, Dark Stone, Timber Door ===
  stoneMasonryWall:    { atlas: 12, r: 0, c: 0, rough: 0.88, metal: 0.02, nStr: 2.7, fallback: 0x87837a },
  ivyStoneWall:        { atlas: 12, r: 0, c: 1, rough: 0.88, metal: 0.02, nStr: 2.5, fallback: 0x6b6d62 },
  limestoneBlocks:     { atlas: 12, r: 0, c: 2, rough: 0.90, metal: 0.00, nStr: 2.6, fallback: 0xb5aa99 },
  exposedBrickPlaster: { atlas: 12, r: 1, c: 0, rough: 0.88, metal: 0.00, nStr: 2.4, fallback: 0xa87c65 },
  whiteStuccoWall:     { atlas: 12, r: 1, c: 1, rough: 0.92, metal: 0.00, nStr: 1.9, fallback: 0xe3e2de },
  porousTravertine:    { atlas: 12, r: 1, c: 2, rough: 0.90, metal: 0.00, nStr: 2.6, fallback: 0xb2a999 },
  waterStreakedBlock:  { atlas: 12, r: 2, c: 0, rough: 0.86, metal: 0.04, nStr: 2.2, fallback: 0x7f857c },
  darkDungeonStone:    { atlas: 12, r: 2, c: 1, rough: 0.88, metal: 0.04, nStr: 2.6, fallback: 0x3f403d },
  rivetedTimberDoor:   { atlas: 12, r: 2, c: 2, rough: 0.78, metal: 0.14, nStr: 2.5, fallback: 0x5c4632 },

  // === ATLAS 13: Striped Marble, Fresco, Carved Relief, Gold Mosaic, Arches, Statue, Wooden Lattice, Blue Plaster, Etched Stone ===
  stripedMarble:       { atlas: 13, r: 0, c: 0, rough: 0.36, metal: 0.06, nStr: 1.5, fallback: 0x6e6a62 },
  botanicalFresco:     { atlas: 13, r: 0, c: 1, rough: 0.84, metal: 0.02, nStr: 1.4, fallback: 0xa89275 },
  carvedStoneRelief:   { atlas: 13, r: 0, c: 2, rough: 0.82, metal: 0.02, nStr: 2.6, fallback: 0xc2b39c },
  goldMosaicTiles:     { atlas: 13, r: 1, c: 0, rough: 0.24, metal: 0.86, nStr: 2.2, fallback: 0xc49c37 },
  gothicStoneArches:   { atlas: 13, r: 1, c: 1, rough: 0.82, metal: 0.02, nStr: 2.5, fallback: 0xb8a993 },
  classicalStatueNiche:{ atlas: 13, r: 1, c: 2, rough: 0.78, metal: 0.04, nStr: 2.5, fallback: 0xb59c85 },
  woodenLatticeGrid:   { atlas: 13, r: 2, c: 0, rough: 0.72, metal: 0.02, nStr: 2.8, fallback: 0x6b4c30 },
  weatheredBluePlaster:{ atlas: 13, r: 2, c: 1, rough: 0.86, metal: 0.02, nStr: 2.0, fallback: 0x6b82a3 },
  etchedAncientStone:  { atlas: 13, r: 2, c: 2, rough: 0.86, metal: 0.02, nStr: 2.1, fallback: 0xab9f8a },

  // === ATLAS 14: Welded Hazard Steel, Peeling Paint Steel, Green Rubber Mat, Architectural White Concrete, White Marble, Wood Slats, Terrazzo, Exhibition White Tile, Hard Linoleum Sheet! ===
  weldedHazardSteel:   { atlas: 14, r: 0, c: 0, rough: 0.56, metal: 0.74, nStr: 2.5, fallback: 0x665e54 },
  peelingPaintSteel:   { atlas: 14, r: 0, c: 1, rough: 0.68, metal: 0.45, nStr: 2.2, fallback: 0xb8a385 },
  greenRubberDimple:   { atlas: 14, r: 0, c: 2, rough: 0.72, metal: 0.04, nStr: 2.2, fallback: 0x4f7854 },
  archWhiteConcrete:   { atlas: 14, r: 1, c: 0, rough: 0.80, metal: 0.03, nStr: 1.5, fallback: 0xd9dce0 },
  polishedWhiteMarble: { atlas: 14, r: 1, c: 1, rough: 0.14, metal: 0.06, nStr: 0.7, fallback: 0xe6e8eb },
  modernWoodSlats:     { atlas: 14, r: 1, c: 2, rough: 0.50, metal: 0.04, nStr: 2.4, fallback: 0x9c6b3b },
  terrazzoFloor:       { atlas: 14, r: 2, c: 0, rough: 0.28, metal: 0.06, nStr: 1.2, fallback: 0xd6d2cc },
  exhibitionWhiteTile: { atlas: 14, r: 2, c: 1, rough: 0.22, metal: 0.05, nStr: 0.9, fallback: 0xe3e5e8 },
  hardLinoleumSheet:   { atlas: 14, r: 2, c: 2, rough: 0.42, metal: 0.04, nStr: 1.0, fallback: 0x879bb3 },

  // === ATLAS 15: Safety Diamond Plate, Riveted Olive Steel, Tire-Marked Viaduct Concrete, Blue Corrugated, Dark Rustic Planks, Cream Tank, Perforated Steel, Roll-Up Shutter, Heavy Steel Door ===
  safetyDiamondPlate:  { atlas: 15, r: 0, c: 0, rough: 0.46, metal: 0.78, nStr: 2.4, fallback: 0x665f5a },
  rivetedOliveSteel:   { atlas: 15, r: 0, c: 1, rough: 0.56, metal: 0.70, nStr: 2.1, fallback: 0x5c6e60 },
  viaductConcreteTire: { atlas: 15, r: 0, c: 2, rough: 0.86, metal: 0.04, nStr: 2.0, fallback: 0x8b8d8f },
  blueCorrugatedSteel: { atlas: 15, r: 1, c: 0, rough: 0.54, metal: 0.68, nStr: 2.4, fallback: 0x4b748a },
  darkRusticPlanks:    { atlas: 15, r: 1, c: 1, rough: 0.84, metal: 0.02, nStr: 2.5, fallback: 0x5e4736 },
  rivetedCreamSteel:   { atlas: 15, r: 1, c: 2, rough: 0.58, metal: 0.48, nStr: 1.7, fallback: 0xd1c7b2 },
  perforatedMetalSheet:{ atlas: 15, r: 2, c: 0, rough: 0.44, metal: 0.82, nStr: 2.7, fallback: 0x7c7e80 },
  rollUpMetalShutter:  { atlas: 15, r: 2, c: 1, rough: 0.50, metal: 0.76, nStr: 2.6, fallback: 0x9c9d9e },
  industrialSteelDoor: { atlas: 15, r: 2, c: 2, rough: 0.48, metal: 0.78, nStr: 2.4, fallback: 0x7c8085 },

  // === ATLAS 16: Golden Ginkgo Carpet, Autumn Maple, Sakura Petals, Pine Needles, Chestnuts, Frosted Winter Grass, Snow Ground, Rain Puddles, Wet Autumn Leaves ===
  ginkgoLeavesCarpet:  { atlas: 16, r: 0, c: 0, rough: 0.78, metal: 0.00, nStr: 2.3, fallback: 0xeab308 },
  autumnMapleLeaves:   { atlas: 16, r: 0, c: 1, rough: 0.78, metal: 0.00, nStr: 2.3, fallback: 0xc2410c },
  sakuraPetalsCarpet:  { atlas: 16, r: 0, c: 2, rough: 0.82, metal: 0.00, nStr: 1.9, fallback: 0xf9a8d4 },
  pineNeedlesFloor:    { atlas: 16, r: 1, c: 0, rough: 0.90, metal: 0.00, nStr: 2.5, fallback: 0x854d27 },
  chestnutsAcornsFloor:{ atlas: 16, r: 1, c: 1, rough: 0.86, metal: 0.00, nStr: 2.6, fallback: 0x714e2e },
  frostedWinterGrass:  { atlas: 16, r: 1, c: 2, rough: 0.74, metal: 0.04, nStr: 2.2, fallback: 0x9eb0a5 },
  snowDustedGround:    { atlas: 16, r: 2, c: 0, rough: 0.86, metal: 0.02, nStr: 2.0, fallback: 0xe2e8f0 },
  rainPuddleGravel:    { atlas: 16, r: 2, c: 1, rough: 0.22, metal: 0.08, nStr: 2.2, fallback: 0x64686e },
  wetAutumnLeaves:     { atlas: 16, r: 2, c: 2, rough: 0.28, metal: 0.06, nStr: 2.4, fallback: 0x784421 },

  // === ATLAS 17: Seasonal Flowerbeds (Sunflowers, Tulips, Cosmos, Spider Lily, Morning Glory, Roses, Nemophila, Chrysanthemum, Pansies) ===
  sunflowerBed:        { atlas: 17, r: 0, c: 0, rough: 0.84, metal: 0.00, nStr: 2.2, fallback: 0xd9a116 },
  tulipGarden:         { atlas: 17, r: 0, c: 1, rough: 0.80, metal: 0.00, nStr: 2.1, fallback: 0xd94668 },
  cosmosFlowerField:   { atlas: 17, r: 0, c: 2, rough: 0.84, metal: 0.00, nStr: 2.1, fallback: 0xd95898 },
  redSpiderLily:       { atlas: 17, r: 1, c: 0, rough: 0.82, metal: 0.00, nStr: 2.3, fallback: 0xc22720 },
  morningGloryVines:   { atlas: 17, r: 1, c: 1, rough: 0.80, metal: 0.00, nStr: 2.1, fallback: 0x5c68b8 },
  redRoseBush:         { atlas: 17, r: 1, c: 2, rough: 0.78, metal: 0.00, nStr: 2.2, fallback: 0x992424 },
  nemophilaBlueField:  { atlas: 17, r: 2, c: 0, rough: 0.82, metal: 0.00, nStr: 2.0, fallback: 0x6ea4e8 },
  chrysanthemumBed:    { atlas: 17, r: 2, c: 1, rough: 0.84, metal: 0.00, nStr: 2.2, fallback: 0xc9a896 },
  pansyFlowerBed:      { atlas: 17, r: 2, c: 2, rough: 0.82, metal: 0.00, nStr: 2.1, fallback: 0x7c5896 },

  // === ATLAS 18: Aquatic & Wetland Plants (Lotus, Water Lilies, Duckweed, Cattails, Hyacinth, Horsetail, Watercress, Algae, Sphagnum Moss) ===
  lotusLeafCanopy:     { atlas: 18, r: 0, c: 0, rough: 0.70, metal: 0.00, nStr: 2.0, fallback: 0x4b7d3b },
  waterLilyPond:       { atlas: 18, r: 0, c: 1, rough: 0.28, metal: 0.04, nStr: 1.9, fallback: 0x456338 },
  duckweedWater:       { atlas: 18, r: 0, c: 2, rough: 0.65, metal: 0.00, nStr: 2.1, fallback: 0x6c9c24 },
  cattailReeds:        { atlas: 18, r: 1, c: 0, rough: 0.86, metal: 0.00, nStr: 2.4, fallback: 0x5d7a36 },
  waterHyacinth:       { atlas: 18, r: 1, c: 1, rough: 0.72, metal: 0.00, nStr: 2.1, fallback: 0x5a8238 },
  horsetailShoots:     { atlas: 18, r: 1, c: 2, rough: 0.86, metal: 0.00, nStr: 2.4, fallback: 0x527d29 },
  watercressBed:       { atlas: 18, r: 2, c: 0, rough: 0.80, metal: 0.00, nStr: 2.1, fallback: 0x638c33 },
  wetGreenAlgae:       { atlas: 18, r: 2, c: 1, rough: 0.32, metal: 0.04, nStr: 2.0, fallback: 0x4f731f },
  sphagnumMoss:        { atlas: 18, r: 2, c: 2, rough: 0.90, metal: 0.00, nStr: 2.3, fallback: 0x7d8c3a },

  // === ATLAS 19: Coastal & Beach Surfaces (Coarse Sand, Volcanic Black Sand, Shell Sand, Barnacles, Tidepool, Driftwood, Sea Glass, Wet Rippled Sand, Kelp) ===
  beachSandCoarse:     { atlas: 19, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 2.3, fallback: 0xc2a882 },
  volcanicBlackSand:   { atlas: 19, r: 0, c: 1, rough: 0.90, metal: 0.04, nStr: 2.4, fallback: 0x2d2e30 },
  shellBeachSand:      { atlas: 19, r: 0, c: 2, rough: 0.88, metal: 0.02, nStr: 2.5, fallback: 0xc4b59e },
  barnacleRock:        { atlas: 19, r: 1, c: 0, rough: 0.84, metal: 0.02, nStr: 2.8, fallback: 0x7a7668 },
  tidepoolReef:        { atlas: 19, r: 1, c: 1, rough: 0.36, metal: 0.05, nStr: 2.6, fallback: 0x595747 },
  beachDriftwood:      { atlas: 19, r: 1, c: 2, rough: 0.88, metal: 0.00, nStr: 2.7, fallback: 0x9c8e7c },
  seaGlassPebbles:     { atlas: 19, r: 2, c: 0, rough: 0.28, metal: 0.08, nStr: 2.4, fallback: 0x8ea6a6 },
  wetRippledSand:      { atlas: 19, r: 2, c: 1, rough: 0.34, metal: 0.06, nStr: 2.1, fallback: 0x8c7b66 },
  coastalKelpBed:      { atlas: 19, r: 2, c: 2, rough: 0.32, metal: 0.05, nStr: 2.5, fallback: 0x5c4732 },

  // === ATLAS 20: Geology & Minerals (Pumice, Granite, Layered Sandstone, Chalk Limestone, Dark Shale, Quartz-Veined Basalt, Obsidian, Orange Lichen, Conglomerate) ===
  porousPumiceStone:   { atlas: 20, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 2.6, fallback: 0xd1cabd },
  speckledDarkGranite: { atlas: 20, r: 0, c: 1, rough: 0.72, metal: 0.06, nStr: 2.3, fallback: 0x6b6f75 },
  layeredSandstone:    { atlas: 20, r: 0, c: 2, rough: 0.86, metal: 0.00, nStr: 2.2, fallback: 0xc2996d },
  whiteChalkRock:      { atlas: 20, r: 1, c: 0, rough: 0.90, metal: 0.00, nStr: 2.1, fallback: 0xe6e6e3 },
  darkShaleLayers:     { atlas: 20, r: 1, c: 1, rough: 0.78, metal: 0.08, nStr: 2.7, fallback: 0x545960 },
  quartzVeinedBasalt:  { atlas: 20, r: 1, c: 2, rough: 0.70, metal: 0.06, nStr: 2.5, fallback: 0x6e7378 },
  blackObsidianGlass:  { atlas: 20, r: 2, c: 0, rough: 0.14, metal: 0.22, nStr: 2.4, fallback: 0x1c1e24 },
  orangeLichenRock:    { atlas: 20, r: 2, c: 1, rough: 0.88, metal: 0.02, nStr: 2.5, fallback: 0x997954 },
  riverConglomerate:   { atlas: 20, r: 2, c: 2, rough: 0.88, metal: 0.02, nStr: 2.7, fallback: 0x8f8778 },

  // === ATLAS 21: Earth, Farmland & Mud (Cracked Clay, Red Laterite, Rich Humus, Plowed Field, Rice Paddy, Forest Mushrooms, Mud Footprints, Weedy Gravel, Twigs) ===
  crackedDryClay:      { atlas: 21, r: 0, c: 0, rough: 0.94, metal: 0.00, nStr: 2.7, fallback: 0xc48f5a },
  redLateriteSoil:     { atlas: 21, r: 0, c: 1, rough: 0.94, metal: 0.00, nStr: 2.4, fallback: 0x9e4724 },
  darkGardenHumus:     { atlas: 21, r: 0, c: 2, rough: 0.96, metal: 0.00, nStr: 2.4, fallback: 0x332820 },
  plowedSoilRows:      { atlas: 21, r: 1, c: 0, rough: 0.94, metal: 0.00, nStr: 2.6, fallback: 0x6b4b32 },
  floodedRicePaddy:    { atlas: 21, r: 1, c: 1, rough: 0.26, metal: 0.06, nStr: 1.8, fallback: 0x757863 },
  forestMushrooms:     { atlas: 21, r: 1, c: 2, rough: 0.88, metal: 0.00, nStr: 2.3, fallback: 0x5c4d38 },
  muddyBootprints:     { atlas: 21, r: 2, c: 0, rough: 0.34, metal: 0.05, nStr: 2.6, fallback: 0x614632 },
  weedyGravelGround:   { atlas: 21, r: 2, c: 1, rough: 0.90, metal: 0.02, nStr: 2.6, fallback: 0x7d8075 },
  forestFloorTwigs:    { atlas: 21, r: 2, c: 2, rough: 0.92, metal: 0.00, nStr: 2.5, fallback: 0x694e38 },

  // === ATLAS 22: Pavements & Steps (Sand Gravel, Herringbone Brick, Exposed Terrazzo, Mossy Stone Steps, Grass-Grid Paver, Slate Flagstone, Square Pavers, Wood-Block, Cracked Asphalt) ===
  fineSandGravel:      { atlas: 22, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 2.2, fallback: 0xc49f70 },
  herringboneBrick:    { atlas: 22, r: 0, c: 1, rough: 0.84, metal: 0.02, nStr: 2.3, fallback: 0x99533b },
  terrazzoCoarse:      { atlas: 22, r: 0, c: 2, rough: 0.32, metal: 0.06, nStr: 1.5, fallback: 0xcfcac4 },
  mossyStoneSteps:     { atlas: 22, r: 1, c: 0, rough: 0.88, metal: 0.02, nStr: 2.6, fallback: 0x707365 },
  grassGridPavers:     { atlas: 22, r: 1, c: 1, rough: 0.86, metal: 0.02, nStr: 2.5, fallback: 0x7c8f5c },
  darkSlateFlagstone:  { atlas: 22, r: 1, c: 2, rough: 0.78, metal: 0.06, nStr: 2.3, fallback: 0x60666e },
  cleanConcretePavers: { atlas: 22, r: 2, c: 0, rough: 0.80, metal: 0.03, nStr: 1.9, fallback: 0xa6a8ab },
  endGrainWoodPaving:  { atlas: 22, r: 2, c: 1, rough: 0.78, metal: 0.02, nStr: 2.4, fallback: 0x82684b },
  crackedDarkAsphalt:  { atlas: 22, r: 2, c: 2, rough: 0.88, metal: 0.04, nStr: 2.5, fallback: 0x52565c },

  // === ATLAS 23: Traditional Japanese Architecture (Kawara Roof, Thatch, Shoji Screen, Namako Wall, Earthen Clay Wall, Vermilion Lacquer, Cedar Bark, Bamboo Fence, Sudare Reed) ===
  kawaraRoofTile:      { atlas: 23, r: 0, c: 0, rough: 0.52, metal: 0.14, nStr: 2.6, fallback: 0x595e66 },
  thatchRoofStraw:     { atlas: 23, r: 0, c: 1, rough: 0.96, metal: 0.00, nStr: 2.7, fallback: 0x856642 },
  shojiPaperScreen:    { atlas: 23, r: 0, c: 2, rough: 0.88, metal: 0.00, nStr: 1.9, fallback: 0xe6dfd3 },
  namakoLatticeWall:   { atlas: 23, r: 1, c: 0, rough: 0.78, metal: 0.04, nStr: 2.6, fallback: 0x999c9e },
  earthenPlasterWall:  { atlas: 23, r: 1, c: 1, rough: 0.92, metal: 0.00, nStr: 2.0, fallback: 0xb89668 },
  vermilionWoodLacquer:{ atlas: 23, r: 1, c: 2, rough: 0.34, metal: 0.06, nStr: 1.2, fallback: 0xc22b0e },
  cedarBarkShingles:   { atlas: 23, r: 2, c: 0, rough: 0.90, metal: 0.00, nStr: 2.6, fallback: 0x784c32 },
  bambooFenceBound:    { atlas: 23, r: 2, c: 1, rough: 0.70, metal: 0.02, nStr: 2.5, fallback: 0xb39457 },
  sudareReedScreen:    { atlas: 23, r: 2, c: 2, rough: 0.84, metal: 0.00, nStr: 2.5, fallback: 0xa6834c },

  // === ATLAS 24: Architectural Walls & Masonry (Gabion Rock, Rammed Earth, Cinder Block Wall, White Clapboard, Exposed Aggregate, Rough Stucco, Glazed Green Brick, Adobe, Terracotta) ===
  gabionWireRocks:     { atlas: 24, r: 0, c: 0, rough: 0.86, metal: 0.18, nStr: 2.8, fallback: 0x7d7a74 },
  rammedEarthWall:     { atlas: 24, r: 0, c: 1, rough: 0.92, metal: 0.00, nStr: 2.3, fallback: 0xa87c52 },
  concreteCinderBlock: { atlas: 24, r: 0, c: 2, rough: 0.88, metal: 0.02, nStr: 2.4, fallback: 0x949699 },
  whiteWoodSiding:     { atlas: 24, r: 1, c: 0, rough: 0.74, metal: 0.02, nStr: 2.2, fallback: 0xdcdad5 },
  exposedAggregatePad: { atlas: 24, r: 1, c: 1, rough: 0.86, metal: 0.02, nStr: 2.6, fallback: 0xa39e95 },
  roughBeigeStucco:    { atlas: 24, r: 1, c: 2, rough: 0.94, metal: 0.00, nStr: 2.4, fallback: 0xd9cfc2 },
  glazedGreenBrick:    { atlas: 24, r: 2, c: 0, rough: 0.24, metal: 0.06, nStr: 2.0, fallback: 0x2a5c44 },
  mudAdobeBricks:      { atlas: 24, r: 2, c: 1, rough: 0.94, metal: 0.00, nStr: 2.4, fallback: 0xb38b62 },
  terracottaRoofTiles: { atlas: 24, r: 2, c: 2, rough: 0.78, metal: 0.02, nStr: 2.6, fallback: 0xb55d35 },

  // === ATLAS 25: Woods, Plywood, OSB & Corkboard (Firewood, Log Wall, Weathered Planks, Peeling Paint Wood, Birch Plywood, OSB Board, Wicker, Mossy Planks, Corkboard) ===
  stackedFirewood:     { atlas: 25, r: 0, c: 0, rough: 0.88, metal: 0.00, nStr: 2.7, fallback: 0x9e754c },
  roundLogWall:        { atlas: 25, r: 0, c: 1, rough: 0.84, metal: 0.00, nStr: 2.6, fallback: 0x8c5e38 },
  weatheredSilverWood: { atlas: 25, r: 0, c: 2, rough: 0.88, metal: 0.00, nStr: 2.4, fallback: 0x807c75 },
  peelingBluePlanks:   { atlas: 25, r: 1, c: 0, rough: 0.84, metal: 0.00, nStr: 2.4, fallback: 0xa8b3b8 },
  birchPlywoodSheet:   { atlas: 25, r: 1, c: 1, rough: 0.68, metal: 0.00, nStr: 1.4, fallback: 0xd4b083 },
  osbParticleBoard:    { atlas: 25, r: 1, c: 2, rough: 0.82, metal: 0.00, nStr: 2.2, fallback: 0xc29963 },
  wovenWickerRattan:   { atlas: 25, r: 2, c: 0, rough: 0.80, metal: 0.00, nStr: 2.7, fallback: 0xb08452 },
  mossyTimberPlanks:   { atlas: 25, r: 2, c: 1, rough: 0.90, metal: 0.00, nStr: 2.5, fallback: 0x5c6638 },
  corkPinboard:        { atlas: 25, r: 2, c: 2, rough: 0.92, metal: 0.00, nStr: 2.2, fallback: 0xc48e5a },

  // === ATLAS 26: Glass, Brushed Hairline Aluminum & Industrial Grates (Diamond Steel, Wired Frosted Glass, Glass Block, Stained Glass, Wrought Iron, Brushed Aluminum Hairline, Corten Rust, Tree Grate, Red Corrugated) ===
  cleanDiamondSteel:   { atlas: 26, r: 0, c: 0, rough: 0.36, metal: 0.86, nStr: 2.4, fallback: 0x8a8f96 },
  wiredFrostedGlass:   { atlas: 26, r: 0, c: 1, rough: 0.24, metal: 0.14, nStr: 1.5, fallback: 0xaab8b5 },
  architecturalGlassBk:{ atlas: 26, r: 0, c: 2, rough: 0.14, metal: 0.18, nStr: 2.2, fallback: 0x9eb0b0 },
  stainedGlassWindow:  { atlas: 26, r: 1, c: 0, rough: 0.18, metal: 0.12, nStr: 2.0, fallback: 0x8ea39e },
  wroughtIronGrille:   { atlas: 26, r: 1, c: 1, rough: 0.48, metal: 0.82, nStr: 2.6, fallback: 0x9e9e9b },
  brushedAluHairline:  { atlas: 26, r: 1, c: 2, rough: 0.20, metal: 0.94, nStr: 1.1, fallback: 0xd4dbe3 },
  cortenRustPlate:     { atlas: 26, r: 2, c: 0, rough: 0.78, metal: 0.56, nStr: 1.8, fallback: 0x8a4522 },
  castIronTreeGrate:   { atlas: 26, r: 2, c: 1, rough: 0.54, metal: 0.78, nStr: 2.8, fallback: 0x696560 },
  redCorrugatedMetal:  { atlas: 26, r: 2, c: 2, rough: 0.50, metal: 0.68, nStr: 2.5, fallback: 0xa63029 },

  // === ATLAS 27: Urban Parks & Athletic Surfaces (Chain-Link Fence, Dual Tactile Paving, Artificial Turf, Athletic Running Track, Playground Sand, Tricolor EPDM Rubber, Yellow Steel, Green Park Bench, Red Painted Metal) ===
  chainLinkFence:      { atlas: 27, r: 0, c: 0, rough: 0.42, metal: 0.80, nStr: 2.6, fallback: 0x5d7a52 },
  tactilePavingDual:   { atlas: 27, r: 0, c: 1, rough: 0.70, metal: 0.02, nStr: 2.6, fallback: 0xeab308 },
  artificialSportsTurf:{ atlas: 27, r: 0, c: 2, rough: 0.90, metal: 0.00, nStr: 2.2, fallback: 0x3b6e24 },
  athleticRunningTrack:{ atlas: 27, r: 1, c: 0, rough: 0.82, metal: 0.02, nStr: 2.1, fallback: 0x9e3529 },
  playgroundFineSand:  { atlas: 27, r: 1, c: 1, rough: 0.92, metal: 0.00, nStr: 2.2, fallback: 0xc4a882 },
  epdmPlaygroundRubber:{ atlas: 27, r: 1, c: 2, rough: 0.86, metal: 0.00, nStr: 2.4, fallback: 0x4b7ea8 },
  yellowPaintedSteel:  { atlas: 27, r: 2, c: 0, rough: 0.36, metal: 0.45, nStr: 1.1, fallback: 0xeab308 },
  greenParkBenchWood:  { atlas: 27, r: 2, c: 1, rough: 0.76, metal: 0.02, nStr: 2.3, fallback: 0x2d6b47 },
  redPaintedSteel:     { atlas: 27, r: 2, c: 2, rough: 0.36, metal: 0.45, nStr: 1.2, fallback: 0xc92c29 },

  // === ATLAS 28: Plazas, Walkways & Decking (Exposed Pebble Concrete, Interlocking Brick Plaza, Hard Clay Court, Park Lawn, Deck Boards, Railroad Tie Steps, Stone Crazy Paving, Dual Rubber Path, White Beach Sand) ===
  pebbleAggregateFloor:{ atlas: 28, r: 0, c: 0, rough: 0.84, metal: 0.02, nStr: 2.5, fallback: 0x9e9a92 },
  interlockingBrick:   { atlas: 28, r: 0, c: 1, rough: 0.82, metal: 0.02, nStr: 2.3, fallback: 0x8f756e },
  clayTennisCourt:     { atlas: 28, r: 0, c: 2, rough: 0.90, metal: 0.00, nStr: 1.9, fallback: 0xc4a47a },
  parkLawnGrass:       { atlas: 28, r: 1, c: 0, rough: 0.92, metal: 0.00, nStr: 2.0, fallback: 0x6b8f38 },
  woodenBoardwalk:     { atlas: 28, r: 1, c: 1, rough: 0.80, metal: 0.02, nStr: 2.3, fallback: 0x7d7060 },
  railroadTieSteps:    { atlas: 28, r: 1, c: 2, rough: 0.88, metal: 0.02, nStr: 2.6, fallback: 0x786c5c },
  warmCrazyFlagstone:  { atlas: 28, r: 2, c: 0, rough: 0.82, metal: 0.02, nStr: 2.4, fallback: 0x9c8e78 },
  parkRubberPath:      { atlas: 28, r: 2, c: 1, rough: 0.86, metal: 0.00, nStr: 2.3, fallback: 0x6b5c4c },
  whiteSoftSand:       { atlas: 28, r: 2, c: 2, rough: 0.92, metal: 0.00, nStr: 1.7, fallback: 0xd9d2c7 },

  // === ATLAS 29: Equipment, Chains, Decking & Facade Tiles (Scratched Red Steel 2, Yellow Vinyl, Galvanized Steel Chains, Timber Logs, Blue Climbing Bars, Ivy Wood Lattice, Cedar Shingles, Composite Decking, White Architectural Facade Tile) ===
  scratchedCrimsonMat: { atlas: 29, r: 0, c: 0, rough: 0.36, metal: 0.62, nStr: 1.5, fallback: 0xc21f1c },
  yellowTarpaulinVinyl:{ atlas: 29, r: 0, c: 1, rough: 0.42, metal: 0.04, nStr: 1.2, fallback: 0xe6b80e },
  galvanizedSteelChain:{ atlas: 29, r: 0, c: 2, rough: 0.36, metal: 0.88, nStr: 2.8, fallback: 0x7d8690 },
  pineLogsHorizontal:  { atlas: 29, r: 1, c: 0, rough: 0.84, metal: 0.00, nStr: 2.5, fallback: 0x8f724f },
  blueSteelJungleGym:  { atlas: 29, r: 1, c: 1, rough: 0.46, metal: 0.68, nStr: 2.6, fallback: 0x1e6bb8 },
  ivyWoodenTrellis:    { atlas: 29, r: 1, c: 2, rough: 0.82, metal: 0.00, nStr: 2.5, fallback: 0x6e7845 },
  redCedarShingles:    { atlas: 29, r: 2, c: 0, rough: 0.84, metal: 0.00, nStr: 2.6, fallback: 0x7d4c35 },
  compositeDecking:    { atlas: 29, r: 2, c: 1, rough: 0.72, metal: 0.04, nStr: 2.2, fallback: 0x78685c },
  whiteFacadeTileGrid: { atlas: 29, r: 2, c: 2, rough: 0.28, metal: 0.06, nStr: 1.7, fallback: 0xe3e2de },

  // === ATLAS 30: Water, Pool Tile, Reeds, Granite & Fresh Bamboo (Lotus Pond Water, Muddy Pebbles, Dry Stone Wall, Blue Pool Mosaic, Tall Pond Reeds, Wet Forest Moss, Red Painted Planks, Polished Gray Granite, Fresh Green Bamboo) ===
  lotusPondCaustics:   { atlas: 30, r: 0, c: 0, rough: 0.14, metal: 0.08, nStr: 1.8, fallback: 0x2e635c },
  muddyRiverStones:    { atlas: 30, r: 0, c: 1, rough: 0.56, metal: 0.04, nStr: 2.6, fallback: 0x6b5c42 },
  mossyFieldstoneWall: { atlas: 30, r: 0, c: 2, rough: 0.88, metal: 0.02, nStr: 2.7, fallback: 0x787a70 },
  bluePoolMosaicTile:  { atlas: 30, r: 1, c: 0, rough: 0.18, metal: 0.06, nStr: 1.7, fallback: 0x2d7ec4 },
  tallWaterReeds:      { atlas: 30, r: 1, c: 1, rough: 0.80, metal: 0.00, nStr: 2.3, fallback: 0x4f7d24 },
  wetLushMoss:         { atlas: 30, r: 1, c: 2, rough: 0.52, metal: 0.04, nStr: 2.5, fallback: 0x4c661c },
  brightRedPlanks:     { atlas: 30, r: 2, c: 0, rough: 0.72, metal: 0.02, nStr: 2.2, fallback: 0xb8381e },
  polishedGrayGranite: { atlas: 30, r: 2, c: 1, rough: 0.32, metal: 0.08, nStr: 1.8, fallback: 0x8f8e8c },
  freshGreenBamboo:    { atlas: 30, r: 2, c: 2, rough: 0.42, metal: 0.02, nStr: 2.4, fallback: 0x6e8535 },

  // === ATLAS 31: Traditional Rural Hearth, Pottery Shards, Loom, Straw Mat, Shelves, Dried Fish, Bench, Millstone, Clay Jar ===
  clayHearthPot:       { atlas: 31, r: 0, c: 0, rough: 0.90, metal: 0.00, nStr: 2.5, fallback: 0x8c735b },
  terracottaShards:    { atlas: 31, r: 0, c: 1, rough: 0.88, metal: 0.00, nStr: 2.7, fallback: 0x9c5c42 },
  woodenWeavingLoom:   { atlas: 31, r: 0, c: 2, rough: 0.84, metal: 0.00, nStr: 2.4, fallback: 0x8f755c },
  wovenStrawBedMat:    { atlas: 31, r: 1, c: 0, rough: 0.94, metal: 0.00, nStr: 2.6, fallback: 0xb89660 },
  rusticPotteryShelf:  { atlas: 31, r: 1, c: 1, rough: 0.82, metal: 0.00, nStr: 2.5, fallback: 0x6b5340 },
  hangingDriedFish:    { atlas: 31, r: 1, c: 2, rough: 0.78, metal: 0.04, nStr: 2.4, fallback: 0x8f7c66 },
  oldTimberStool:      { atlas: 31, r: 2, c: 0, rough: 0.86, metal: 0.00, nStr: 2.5, fallback: 0x7d6045 },
  carvedStoneMill:     { atlas: 31, r: 2, c: 1, rough: 0.88, metal: 0.02, nStr: 2.6, fallback: 0x857d73 },
  earthenwareStorageJar:{ atlas: 31, r: 2, c: 2, rough: 0.78, metal: 0.02, nStr: 2.2, fallback: 0x754d38 },

  // === ATLAS 32: Lived-In Japanese Apartment Walls ===
  fadedMintAptWall:    { atlas: 32, r: 0, c: 0, rough: 0.90, metal: 0.00, nStr: 1.5, fallback: 0x99ab92 },
  weatheredLinenWall:  { atlas: 32, r: 0, c: 1, rough: 0.92, metal: 0.00, nStr: 2.0, fallback: 0x9e8c7a },
  tapedCorkPinboard:   { atlas: 32, r: 0, c: 2, rough: 0.92, metal: 0.00, nStr: 2.2, fallback: 0xb37f4c },
  agedKitchenTiles:    { atlas: 32, r: 1, c: 0, rough: 0.28, metal: 0.04, nStr: 1.6, fallback: 0xd9ccb8 },
  retroBlueBathTile:   { atlas: 32, r: 1, c: 1, rough: 0.24, metal: 0.04, nStr: 1.5, fallback: 0x8ca3b3 },
  vintageFloralPaper:  { atlas: 32, r: 1, c: 2, rough: 0.90, metal: 0.00, nStr: 1.3, fallback: 0xc2b8a3 },
  woodWainscotWall:    { atlas: 32, r: 2, c: 0, rough: 0.74, metal: 0.02, nStr: 2.1, fallback: 0x946b46 },
  stainedWindowSill:   { atlas: 32, r: 2, c: 1, rough: 0.84, metal: 0.00, nStr: 1.9, fallback: 0xa6afa3 },
  scratchedDeskWood:   { atlas: 32, r: 2, c: 2, rough: 0.54, metal: 0.04, nStr: 1.7, fallback: 0x7a4e2b },

  // === ATLAS 33: Industrial & Lab Wall Panels ===
  scuffedCreamPanel:   { atlas: 33, r: 0, c: 0, rough: 0.62, metal: 0.25, nStr: 1.5, fallback: 0xc9bfa8 },
  dentedPaintedMetal:  { atlas: 33, r: 0, c: 1, rough: 0.56, metal: 0.45, nStr: 2.2, fallback: 0xb8afa3 },
  boltedPatchConcrete: { atlas: 33, r: 0, c: 2, rough: 0.80, metal: 0.20, nStr: 2.1, fallback: 0xbfb7a8 },
  twoToneWorkshopWall: { atlas: 33, r: 1, c: 0, rough: 0.76, metal: 0.14, nStr: 1.6, fallback: 0xb5b8ba },
  dampGreenConcrete:   { atlas: 33, r: 1, c: 1, rough: 0.86, metal: 0.04, nStr: 1.8, fallback: 0x8a998c },
  tieHoleConcreteWall: { atlas: 33, r: 1, c: 2, rough: 0.84, metal: 0.04, nStr: 1.6, fallback: 0xbdb7ab },
  scratchedCornerGuard:{ atlas: 33, r: 2, c: 0, rough: 0.52, metal: 0.56, nStr: 2.2, fallback: 0x45484d },
  patchedFiberglass:   { atlas: 33, r: 2, c: 1, rough: 0.66, metal: 0.04, nStr: 1.8, fallback: 0xc2bda8 },
  scratchedGrayWall:   { atlas: 33, r: 2, c: 2, rough: 0.80, metal: 0.06, nStr: 1.9, fallback: 0x99958c },

  // === ATLAS 34: Lived-In Apartment Floors ===
  bedsideWornCarpet:   { atlas: 34, r: 0, c: 0, rough: 0.94, metal: 0.00, nStr: 2.0, fallback: 0x948778 },
  corkFloorTiles:      { atlas: 34, r: 0, c: 1, rough: 0.86, metal: 0.00, nStr: 2.1, fallback: 0xb38252 },
  sunBleachedWoodFloor:{ atlas: 34, r: 0, c: 2, rough: 0.62, metal: 0.02, nStr: 1.8, fallback: 0x9c754d },
  wovenRattanFloorMat: { atlas: 34, r: 1, c: 0, rough: 0.76, metal: 0.00, nStr: 2.5, fallback: 0xa67c46 },
  patchedParquetFloor: { atlas: 34, r: 1, c: 1, rough: 0.54, metal: 0.04, nStr: 1.9, fallback: 0x7d4c2e },
  kitchenLinoleumDrops:{ atlas: 34, r: 1, c: 2, rough: 0.44, metal: 0.04, nStr: 1.3, fallback: 0xaba596 },
  coarseEntryDoormat:  { atlas: 34, r: 2, c: 0, rough: 0.96, metal: 0.00, nStr: 2.5, fallback: 0x6b6356 },
  wetGreenBathTile:    { atlas: 34, r: 2, c: 1, rough: 0.24, metal: 0.06, nStr: 1.7, fallback: 0x7d9994 },
  patchedVintageRug:   { atlas: 34, r: 2, c: 2, rough: 0.92, metal: 0.00, nStr: 2.0, fallback: 0x9e846b },

  // === ATLAS 35: Workshop & Garage Floors ===
  wornBlueRubberFloor: { atlas: 35, r: 0, c: 0, rough: 0.42, metal: 0.06, nStr: 1.8, fallback: 0x667280 },
  cloggedFloorDrain:   { atlas: 35, r: 0, c: 1, rough: 0.58, metal: 0.74, nStr: 2.8, fallback: 0x66625c },
  garageTireConcrete:  { atlas: 35, r: 0, c: 2, rough: 0.84, metal: 0.04, nStr: 1.9, fallback: 0x9e988f },
  diamondAccessHatch:  { atlas: 35, r: 1, c: 0, rough: 0.40, metal: 0.82, nStr: 2.5, fallback: 0x999a9c },
  redQuarryFloorTile:  { atlas: 35, r: 1, c: 1, rough: 0.76, metal: 0.02, nStr: 1.9, fallback: 0x9e5949 },
  chalkRingRubberMat:  { atlas: 35, r: 1, c: 2, rough: 0.72, metal: 0.04, nStr: 2.2, fallback: 0x8f8a82 },
  grittyConcreteLeaves:{ atlas: 35, r: 2, c: 0, rough: 0.88, metal: 0.02, nStr: 2.1, fallback: 0x9e988e },
  scratchedParquetWood:{ atlas: 35, r: 2, c: 1, rough: 0.56, metal: 0.04, nStr: 1.8, fallback: 0x78563a },
  metalFilingsRubber:  { atlas: 35, r: 2, c: 2, rough: 0.72, metal: 0.14, nStr: 2.5, fallback: 0x4b4e52 },

  // === ATLAS 36: Apartment Ceilings, Fixtures & Vents ===
  patchedCeilingCloth: { atlas: 36, r: 0, c: 0, rough: 0.90, metal: 0.00, nStr: 2.0, fallback: 0xa69b8d },
  ceilingMeshHatch:    { atlas: 36, r: 0, c: 1, rough: 0.86, metal: 0.12, nStr: 2.4, fallback: 0xaba294 },
  frostedCeilingLamp:  { atlas: 36, r: 0, c: 2, rough: 0.24, metal: 0.08, nStr: 1.2, fallback: 0xe6dcc8 },
  sootyExhaustVent:    { atlas: 36, r: 1, c: 0, rough: 0.88, metal: 0.18, nStr: 2.4, fallback: 0x8f7d66 },
  stainedCeilingTile:  { atlas: 36, r: 1, c: 1, rough: 0.90, metal: 0.00, nStr: 1.7, fallback: 0xa8a69e },
  removedLampRing:     { atlas: 36, r: 1, c: 2, rough: 0.90, metal: 0.00, nStr: 1.3, fallback: 0xb3a99b },
  ceilingAccessHatch:  { atlas: 36, r: 2, c: 0, rough: 0.76, metal: 0.34, nStr: 2.2, fallback: 0xb5b2a8 },
  dustyLouveredVent:   { atlas: 36, r: 2, c: 1, rough: 0.78, metal: 0.42, nStr: 2.7, fallback: 0xa39c90 },
  ceilingMetalDuct:    { atlas: 36, r: 2, c: 2, rough: 0.48, metal: 0.65, nStr: 1.8, fallback: 0xa8a49c },

  // === ATLAS 37: Daily Home Interior Facades ===
  woodenShoeCabinet:   { atlas: 37, r: 0, c: 0, rough: 0.66, metal: 0.06, nStr: 2.2, fallback: 0x6b472b },
  retroGasStoveFront:  { atlas: 37, r: 0, c: 1, rough: 0.44, metal: 0.45, nStr: 2.3, fallback: 0xc2b8a8 },
  ringStainedCounter:  { atlas: 37, r: 0, c: 2, rough: 0.60, metal: 0.04, nStr: 1.7, fallback: 0x8c633d },
  glassMugCupboard:    { atlas: 37, r: 1, c: 0, rough: 0.34, metal: 0.08, nStr: 2.2, fallback: 0x7d6552 },
  bathMirrorSinkShelf: { atlas: 37, r: 1, c: 1, rough: 0.38, metal: 0.22, nStr: 2.1, fallback: 0xb3b2aa },
  closetFabricBox:     { atlas: 37, r: 1, c: 2, rough: 0.90, metal: 0.00, nStr: 2.2, fallback: 0x877b6b },
  canvasLaundryBag:    { atlas: 37, r: 2, c: 0, rough: 0.92, metal: 0.00, nStr: 2.3, fallback: 0xbdb3a3 },
  woodenSewingBox:     { atlas: 37, r: 2, c: 1, rough: 0.78, metal: 0.08, nStr: 2.4, fallback: 0x755c44 },
  pantryPreservedJars: { atlas: 37, r: 2, c: 2, rough: 0.32, metal: 0.26, nStr: 2.4, fallback: 0x75634b },

  // === ATLAS 38: Apartment Mailboxes, Steel Racks, Lockers & Workshop Storage ===
  aptParcelLockers:    { atlas: 38, r: 0, c: 0, rough: 0.48, metal: 0.68, nStr: 2.2, fallback: 0xa69f96 },
  steelRackCardboard:  { atlas: 38, r: 0, c: 1, rough: 0.84, metal: 0.24, nStr: 2.5, fallback: 0x997c5c },
  canvasWallPockets:   { atlas: 38, r: 0, c: 2, rough: 0.92, metal: 0.00, nStr: 2.4, fallback: 0xb3a592 },
  blueWorkshopLocker:  { atlas: 38, r: 1, c: 0, rough: 0.56, metal: 0.66, nStr: 1.9, fallback: 0x6e8594 },
  coinLaundryWasher:   { atlas: 38, r: 1, c: 1, rough: 0.32, metal: 0.72, nStr: 2.2, fallback: 0x9e9c96 },
  blueHandTruckDeck:   { atlas: 38, r: 1, c: 2, rough: 0.52, metal: 0.64, nStr: 2.4, fallback: 0x45698f },
  workGlovesShelf:     { atlas: 38, r: 2, c: 0, rough: 0.86, metal: 0.08, nStr: 2.5, fallback: 0x7d6b56 },
  wireSpoolRack:       { atlas: 38, r: 2, c: 1, rough: 0.82, metal: 0.04, nStr: 2.5, fallback: 0x7d6b5c },
  hardwareHookBoard:   { atlas: 38, r: 2, c: 2, rough: 0.62, metal: 0.48, nStr: 2.6, fallback: 0x8c7054 },

  // === ATLAS 39: Wall Art, Pressed Flowers, Patchwork & Vintage Spacecraft Blueprint Poster ===
  geometricPaperArt:   { atlas: 39, r: 0, c: 0, rough: 0.88, metal: 0.00, nStr: 1.5, fallback: 0xc9baa3 },
  framedOceanPhoto:    { atlas: 39, r: 0, c: 1, rough: 0.36, metal: 0.04, nStr: 1.7, fallback: 0x5c7d8a },
  seashellDisplayBox:  { atlas: 39, r: 0, c: 2, rough: 0.84, metal: 0.00, nStr: 2.5, fallback: 0xa69887 },
  pressedFlowerFrame:  { atlas: 39, r: 1, c: 0, rough: 0.24, metal: 0.06, nStr: 1.8, fallback: 0xbcb5a6 },
  paintedWoodMosaic:   { atlas: 39, r: 1, c: 1, rough: 0.78, metal: 0.02, nStr: 2.3, fallback: 0x9c8266 },
  denimPatchHanging:   { atlas: 39, r: 1, c: 2, rough: 0.92, metal: 0.00, nStr: 2.3, fallback: 0x8f857a },
  vintageBlueprintArt: { atlas: 39, r: 2, c: 0, rough: 0.88, metal: 0.00, nStr: 1.6, fallback: 0xc2b59e },
  emptyWoodenFrame:    { atlas: 39, r: 2, c: 1, rough: 0.82, metal: 0.04, nStr: 2.0, fallback: 0xa6947a },
  floralEmbroideryHoop:{ atlas: 39, r: 2, c: 2, rough: 0.90, metal: 0.00, nStr: 2.4, fallback: 0xb39f8c },

  // === ATLAS 40: Fabrics & Garments ===
  plaidFlannelShirt:   { atlas: 40, r: 0, c: 0, rough: 0.90, metal: 0.00, nStr: 2.0, fallback: 0x3b5978 },
  stripedBathTowel:    { atlas: 40, r: 0, c: 1, rough: 0.96, metal: 0.00, nStr: 2.5, fallback: 0x8f99a6 },
  orangeTweedCushion:  { atlas: 40, r: 0, c: 2, rough: 0.94, metal: 0.00, nStr: 2.5, fallback: 0xb85e2a },
  patchworkQuiltCloth: { atlas: 40, r: 1, c: 0, rough: 0.92, metal: 0.00, nStr: 2.1, fallback: 0x8c8780 },
  stitchedLinenNapkin: { atlas: 40, r: 1, c: 1, rough: 0.92, metal: 0.00, nStr: 2.0, fallback: 0xc9c2b4 },
  floralCottonPillow:  { atlas: 40, r: 1, c: 2, rough: 0.92, metal: 0.00, nStr: 1.7, fallback: 0xc9c4b8 },
  linenWorkshopApron:  { atlas: 40, r: 2, c: 0, rough: 0.92, metal: 0.00, nStr: 2.0, fallback: 0xb3a796 },
  wovenKilimRug:       { atlas: 40, r: 2, c: 1, rough: 0.94, metal: 0.00, nStr: 2.4, fallback: 0x7d6354 },
  seigaihaBlueCurtain: { atlas: 40, r: 2, c: 2, rough: 0.88, metal: 0.00, nStr: 2.0, fallback: 0x525e6e },

  // === ATLAS 41: Ancient & Earthen Clay Walls ===
  layeredClayStrata:   { atlas: 41, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 2.3, fallback: 0xa67c52 },
  strawMixedMudWall:   { atlas: 41, r: 0, c: 1, rough: 0.94, metal: 0.00, nStr: 2.3, fallback: 0x9e7d54 },
  wattleDaubMudWall:   { atlas: 41, r: 0, c: 2, rough: 0.94, metal: 0.00, nStr: 2.8, fallback: 0x8f7354 },
  crackedMudPlaster:   { atlas: 41, r: 1, c: 0, rough: 0.94, metal: 0.00, nStr: 2.5, fallback: 0xa6825c },
  sootStainedEarthWall:{ atlas: 41, r: 1, c: 1, rough: 0.94, metal: 0.00, nStr: 2.3, fallback: 0x5c4f42 },
  redOchreClayWall:    { atlas: 41, r: 1, c: 2, rough: 0.92, metal: 0.00, nStr: 2.3, fallback: 0x9e4b2b },
  peelingLimeClayWall: { atlas: 41, r: 2, c: 0, rough: 0.92, metal: 0.00, nStr: 2.5, fallback: 0xc2b39c },
  handprintClayWall:   { atlas: 41, r: 2, c: 1, rough: 0.92, metal: 0.00, nStr: 2.1, fallback: 0xa37f5a },
  wetSeepingMudWall:   { atlas: 41, r: 2, c: 2, rough: 0.42, metal: 0.04, nStr: 2.6, fallback: 0x705638 },

  // === ATLAS 42: Onsen & Ryokan Materials ===
  goldenTatamiWeave:   { atlas: 42, r: 0, c: 0, rough: 0.86, metal: 0.00, nStr: 2.2, fallback: 0xd1b370 },
  naturalRattanWeave:  { atlas: 42, r: 0, c: 1, rough: 0.78, metal: 0.00, nStr: 2.6, fallback: 0xc49452 },
  paleHinokiCypress:   { atlas: 42, r: 0, c: 2, rough: 0.56, metal: 0.02, nStr: 1.2, fallback: 0xd9be9c },
  terryClothWhite:     { atlas: 42, r: 1, c: 0, rough: 0.96, metal: 0.00, nStr: 2.3, fallback: 0xe6e8eb },
  indigoKasuriCloth:   { atlas: 42, r: 1, c: 1, rough: 0.90, metal: 0.00, nStr: 1.8, fallback: 0x2c4266 },
  crimsonNorenLinen:   { atlas: 42, r: 1, c: 2, rough: 0.88, metal: 0.00, nStr: 1.6, fallback: 0xb82c14 },
  warmBambooBlind:     { atlas: 42, r: 2, c: 0, rough: 0.72, metal: 0.02, nStr: 2.4, fallback: 0xc99c54 },
  cleanWhiteTerrazzo:  { atlas: 42, r: 2, c: 1, rough: 0.24, metal: 0.05, nStr: 0.9, fallback: 0xe6e6e3 },
  blackPebbledLeather: { atlas: 42, r: 2, c: 2, rough: 0.46, metal: 0.08, nStr: 2.3, fallback: 0x212429 },

  // === ATLAS 43: Water, Steam & Condensation ===
  wetGlossyCypress:    { atlas: 43, r: 0, c: 0, rough: 0.16, metal: 0.06, nStr: 1.7, fallback: 0xc47e3d },
  wetDarkBasalt:       { atlas: 43, r: 0, c: 1, rough: 0.22, metal: 0.08, nStr: 2.7, fallback: 0x3b3d3e },
  yellowSulfurCrust:   { atlas: 43, r: 0, c: 2, rough: 0.88, metal: 0.02, nStr: 2.5, fallback: 0xd9d49e },
  milkyOnsenWater:     { atlas: 43, r: 1, c: 0, rough: 0.10, metal: 0.08, nStr: 1.1, fallback: 0xd4dbd4 },
  clearCausticRiver:   { atlas: 43, r: 1, c: 1, rough: 0.08, metal: 0.10, nStr: 1.8, fallback: 0x5c8575 },
  smoothWhitePebbles:  { atlas: 43, r: 1, c: 2, rough: 0.54, metal: 0.02, nStr: 2.5, fallback: 0xd9d6cf },
  wetMossyRockFace:    { atlas: 43, r: 2, c: 0, rough: 0.62, metal: 0.04, nStr: 2.6, fallback: 0x6b704b },
  condensationGlass:   { atlas: 43, r: 2, c: 1, rough: 0.26, metal: 0.08, nStr: 2.0, fallback: 0xc4ccd1 },
  ironMineralCrust:    { atlas: 43, r: 2, c: 2, rough: 0.48, metal: 0.18, nStr: 2.5, fallback: 0xa64e18 },

  // === ATLAS 44: Coastal Tidal Flats & Dunes ===
  wetTidalMudflat:     { atlas: 44, r: 0, c: 0, rough: 0.24, metal: 0.06, nStr: 2.3, fallback: 0x827566 },
  wetSeaweedTangle:    { atlas: 44, r: 0, c: 1, rough: 0.30, metal: 0.05, nStr: 2.6, fallback: 0x523f2a },
  crushedSeashells:    { atlas: 44, r: 0, c: 2, rough: 0.84, metal: 0.02, nStr: 2.7, fallback: 0xb3a89a },
  wetVolcanicSand:     { atlas: 44, r: 1, c: 0, rough: 0.64, metal: 0.05, nStr: 2.4, fallback: 0x333538 },
  driftwoodPebbleShore:{ atlas: 44, r: 1, c: 1, rough: 0.86, metal: 0.02, nStr: 2.7, fallback: 0x8c8a85 },
  coastalTidepoolRock: { atlas: 44, r: 1, c: 2, rough: 0.28, metal: 0.06, nStr: 2.6, fallback: 0x736c59 },
  redMarshSucculents:  { atlas: 44, r: 2, c: 0, rough: 0.84, metal: 0.00, nStr: 2.4, fallback: 0x8c6354 },
  coastalDuneGrass:    { atlas: 44, r: 2, c: 1, rough: 0.88, metal: 0.00, nStr: 2.3, fallback: 0x8c946b },
  seafoamWetSand:      { atlas: 44, r: 2, c: 2, rough: 0.18, metal: 0.08, nStr: 1.9, fallback: 0x9c8c78 },

  // === ATLAS 45: Forest & Meadow Ground Covers ===
  denseCloverCarpet:   { atlas: 45, r: 0, c: 0, rough: 0.88, metal: 0.00, nStr: 2.1, fallback: 0x457d1f },
  dandelionMeadow:     { atlas: 45, r: 0, c: 1, rough: 0.88, metal: 0.00, nStr: 2.0, fallback: 0x5c8529 },
  forestGreenFerns:    { atlas: 45, r: 0, c: 2, rough: 0.84, metal: 0.00, nStr: 2.3, fallback: 0x4b7d24 },
  yellowWildflowers:   { atlas: 45, r: 1, c: 0, rough: 0.86, metal: 0.00, nStr: 2.3, fallback: 0x998c24 },
  purpleThymeBlossoms: { atlas: 45, r: 1, c: 1, rough: 0.86, metal: 0.00, nStr: 2.2, fallback: 0x756b6e },
  tallMeadowGrass:     { atlas: 45, r: 1, c: 2, rough: 0.88, metal: 0.00, nStr: 2.3, fallback: 0x527d24 },
  dryOakFallenLeaves:  { atlas: 45, r: 2, c: 0, rough: 0.88, metal: 0.00, nStr: 2.5, fallback: 0x8c6342 },
  exposedTreeRootsSoil:{ atlas: 45, r: 2, c: 1, rough: 0.92, metal: 0.00, nStr: 2.7, fallback: 0x695948 },
  wetMuddyTrailPuddles:{ atlas: 45, r: 2, c: 2, rough: 0.28, metal: 0.06, nStr: 2.5, fallback: 0x614e3d },

  // === ATLAS 46: Japanese Shopfront & Konbini ===
  indigoShopNoren:        { atlas: 46, r: 0, c: 0, rough: 0.88, metal: 0.00, nStr: 1.8, fallback: 0x2a3b5c },
  hangingWoodMenuSlats:   { atlas: 46, r: 0, c: 1, rough: 0.72, metal: 0.02, nStr: 2.1, fallback: 0xc29e70 },
  bakeryWoodShelf:        { atlas: 46, r: 0, c: 2, rough: 0.68, metal: 0.02, nStr: 2.0, fallback: 0xb08250 },
  konbiniDrinkCooler:     { atlas: 46, r: 1, c: 0, rough: 0.24, metal: 0.14, nStr: 1.9, fallback: 0xd0d8e0 },
  greengrocerVeggieCrates:{ atlas: 46, r: 1, c: 1, rough: 0.76, metal: 0.00, nStr: 2.4, fallback: 0x6c8a48 },
  redWhiteShopAwning:     { atlas: 46, r: 1, c: 2, rough: 0.84, metal: 0.00, nStr: 1.9, fallback: 0xc23832 },
  woodRegisterCounter:    { atlas: 46, r: 2, c: 0, rough: 0.56, metal: 0.04, nStr: 1.5, fallback: 0xa67c52 },
  packedDirtPebble:       { atlas: 46, r: 2, c: 1, rough: 0.92, metal: 0.00, nStr: 2.6, fallback: 0x8a7968 },
  tricolorCrushedStone:   { atlas: 46, r: 2, c: 2, rough: 0.90, metal: 0.02, nStr: 2.8, fallback: 0x8f8a82 },

  // === ATLAS 47: School, Gym & University Library ===
  greenClassroomChalkboard:{ atlas: 47, r: 0, c: 0, rough: 0.78, metal: 0.04, nStr: 1.2, fallback: 0x2b4d3e },
  univReceptionCounter:   { atlas: 47, r: 0, c: 1, rough: 0.36, metal: 0.10, nStr: 1.6, fallback: 0xc8c2b6 },
  mintSchoolCurtain:      { atlas: 47, r: 0, c: 2, rough: 0.90, metal: 0.00, nStr: 2.1, fallback: 0x9ec4b0 },
  lightTerrazzoHallFloor: { atlas: 47, r: 1, c: 0, rough: 0.28, metal: 0.05, nStr: 1.0, fallback: 0xdcd8d0 },
  gymWoodCourtFloor:      { atlas: 47, r: 1, c: 1, rough: 0.22, metal: 0.04, nStr: 1.3, fallback: 0xc49258 },
  cosmicSkyWallMural:     { atlas: 47, r: 1, c: 2, rough: 0.76, metal: 0.02, nStr: 1.1, fallback: 0x2a3b64 },
  whiteBlueSchoolTile:    { atlas: 47, r: 2, c: 0, rough: 0.26, metal: 0.06, nStr: 1.5, fallback: 0xd8e0e6 },
  univLibraryBookshelf:   { atlas: 47, r: 2, c: 1, rough: 0.68, metal: 0.02, nStr: 2.3, fallback: 0x7d5d42 },
  shintoShrineHallFront:  { atlas: 47, r: 2, c: 2, rough: 0.72, metal: 0.06, nStr: 2.2, fallback: 0x8a5e3c },

  // === ATLAS 48: Japanese Apartment Exterior & Station ===
  warmLitAptWindow:       { atlas: 48, r: 0, c: 0, rough: 0.20, metal: 0.16, nStr: 1.6, fallback: 0xe2c48c },
  frostedBalconyRailing:  { atlas: 48, r: 0, c: 1, rough: 0.34, metal: 0.28, nStr: 1.7, fallback: 0xbec6ce },
  grayExteriorCeramicTile:{ atlas: 48, r: 0, c: 2, rough: 0.44, metal: 0.06, nStr: 1.8, fallback: 0x9ea3a8 },
  screwedWoodSignPlank:   { atlas: 48, r: 1, c: 0, rough: 0.78, metal: 0.04, nStr: 2.0, fallback: 0xb89668 },
  boltedSteelAccessPlate: { atlas: 48, r: 1, c: 1, rough: 0.34, metal: 0.84, nStr: 1.9, fallback: 0xa2a8b0 },
  yellowChevronTactile:   { atlas: 48, r: 1, c: 2, rough: 0.68, metal: 0.02, nStr: 2.6, fallback: 0xe6be28 },
  washedPebbleConcrete:   { atlas: 48, r: 2, c: 0, rough: 0.88, metal: 0.02, nStr: 2.7, fallback: 0x8c8a86 },
  whiteSteelMeterBox:     { atlas: 48, r: 2, c: 1, rough: 0.42, metal: 0.48, nStr: 1.5, fallback: 0xd8dce0 },
  ribbedConcreteStair:    { atlas: 48, r: 2, c: 2, rough: 0.84, metal: 0.04, nStr: 2.6, fallback: 0x8e9094 },

  // === ATLAS 49: Japanese Home Interior ===
  floralFusumaSliding:    { atlas: 49, r: 0, c: 0, rough: 0.82, metal: 0.00, nStr: 1.4, fallback: 0xdcd2be },
  shojiPaperWindow:       { atlas: 49, r: 0, c: 1, rough: 0.80, metal: 0.00, nStr: 1.7, fallback: 0xe8e2d2 },
  compactThreeBurnerSink: { atlas: 49, r: 0, c: 2, rough: 0.28, metal: 0.72, nStr: 1.9, fallback: 0xb8bec4 },
  creamUpperKitchenCab:   { atlas: 49, r: 1, c: 0, rough: 0.46, metal: 0.06, nStr: 1.4, fallback: 0xe2dcc8 },
  studyDeskOpenNotebook:  { atlas: 49, r: 1, c: 1, rough: 0.56, metal: 0.02, nStr: 1.7, fallback: 0xb88c5c },
  kidsWoodenToyShelf:     { atlas: 49, r: 1, c: 2, rough: 0.68, metal: 0.02, nStr: 2.0, fallback: 0xc29e70 },
  blueGinghamTablecloth:  { atlas: 49, r: 2, c: 0, rough: 0.90, metal: 0.00, nStr: 1.8, fallback: 0x7c9ec4 },
  familyPhotoGalleryWall: { atlas: 49, r: 2, c: 1, rough: 0.52, metal: 0.04, nStr: 1.8, fallback: 0xc8c0b2 },
  japaneseUnitBathTub:    { atlas: 49, r: 2, c: 2, rough: 0.22, metal: 0.14, nStr: 1.4, fallback: 0xe4e8ec },

  // === ATLAS 50: Town Shops, Laundry & Station Platform ===
  bakeryGlassDisplay:     { atlas: 50, r: 0, c: 0, rough: 0.24, metal: 0.16, nStr: 1.9, fallback: 0xc89a64 },
  pharmacyBoxShelves:     { atlas: 50, r: 0, c: 1, rough: 0.54, metal: 0.08, nStr: 2.1, fallback: 0xd6dce2 },
  stainlessRamenKitchen:  { atlas: 50, r: 0, c: 2, rough: 0.30, metal: 0.78, nStr: 2.0, fallback: 0xadb4bc },
  retroBarberMirrorChair: { atlas: 50, r: 1, c: 0, rough: 0.34, metal: 0.26, nStr: 1.9, fallback: 0xa8927c },
  stackedCoinWashers:     { atlas: 50, r: 1, c: 1, rough: 0.28, metal: 0.52, nStr: 2.0, fallback: 0xd0d4d8 },
  sentoWashingMirrors:    { atlas: 50, r: 1, c: 2, rough: 0.24, metal: 0.18, nStr: 1.8, fallback: 0xc8d2d8 },
  warmPineWallPlanks:     { atlas: 50, r: 2, c: 0, rough: 0.68, metal: 0.00, nStr: 1.9, fallback: 0xc89a64 },
  trainPlatformEdgeLine:  { atlas: 50, r: 2, c: 1, rough: 0.78, metal: 0.02, nStr: 2.4, fallback: 0x8e9296 },
  slidingGlassLabCabinet: { atlas: 50, r: 2, c: 2, rough: 0.26, metal: 0.22, nStr: 1.8, fallback: 0xd8e0e4 },

  // === ATLAS 51: Street Props & Night Festival ===
  wetSpeckledGranite:     { atlas: 51, r: 0, c: 0, rough: 0.24, metal: 0.06, nStr: 2.3, fallback: 0x707478 },
  boltedDarkBenchSlats:   { atlas: 51, r: 0, c: 1, rough: 0.68, metal: 0.06, nStr: 2.1, fallback: 0x5c4230 },
  glossyBoxwoodHedge:     { atlas: 51, r: 0, c: 2, rough: 0.58, metal: 0.00, nStr: 2.6, fallback: 0x355c28 },
  glowingRedChochin:      { atlas: 51, r: 1, c: 0, rough: 0.64, metal: 0.00, nStr: 1.7, fallback: 0xd43828 },
  vermilionPaintedWood:   { atlas: 51, r: 1, c: 1, rough: 0.44, metal: 0.04, nStr: 1.5, fallback: 0xc83a24 },
  woodenYataiStall:       { atlas: 51, r: 1, c: 2, rough: 0.72, metal: 0.02, nStr: 2.1, fallback: 0xa67c52 },
  seigaihaManholeCover:   { atlas: 51, r: 2, c: 0, rough: 0.56, metal: 0.76, nStr: 2.8, fallback: 0x484c52 },
  squareSteelDrainGrate:  { atlas: 51, r: 2, c: 1, rough: 0.48, metal: 0.80, nStr: 2.8, fallback: 0x62666c },
  tricolorRecycleBins:    { atlas: 51, r: 2, c: 2, rough: 0.36, metal: 0.22, nStr: 1.8, fallback: 0x708498 },

  // === ATLAS 52: Interior Flooring & Wallpapers ===
  darkWalnutStripFloor:   { atlas: 52, r: 0, c: 0, rough: 0.42, metal: 0.02, nStr: 1.7, fallback: 0x5c3c24 },
  warmHerringboneParquet: { atlas: 52, r: 0, c: 1, rough: 0.38, metal: 0.02, nStr: 1.8, fallback: 0xa67442 },
  whiteSquareMarbleTile:  { atlas: 52, r: 0, c: 2, rough: 0.20, metal: 0.04, nStr: 1.2, fallback: 0xe6e6e2 },
  creamFloralWallpaper:   { atlas: 52, r: 1, c: 0, rough: 0.86, metal: 0.00, nStr: 1.4, fallback: 0xe6dcc8 },
  blueStripeWallpaper:    { atlas: 52, r: 1, c: 1, rough: 0.86, metal: 0.00, nStr: 1.3, fallback: 0xb8cce0 },
  pastelGreenPlaster:     { atlas: 52, r: 1, c: 2, rough: 0.88, metal: 0.00, nStr: 1.5, fallback: 0xc2d8c8 },
  fineParticleboardWood:  { atlas: 52, r: 2, c: 0, rough: 0.82, metal: 0.00, nStr: 2.2, fallback: 0xb8966e },
  horizontalCedarPanel:   { atlas: 52, r: 2, c: 1, rough: 0.68, metal: 0.00, nStr: 1.9, fallback: 0xa8784e },
  ribbedWoodWainscoting:  { atlas: 52, r: 2, c: 2, rough: 0.64, metal: 0.00, nStr: 2.2, fallback: 0x8c623c },

  // === ATLAS 53: Curtains, Fabrics, Leather & Rugs ===
  deepBluePleatedCurtain: { atlas: 53, r: 0, c: 0, rough: 0.88, metal: 0.00, nStr: 2.2, fallback: 0x264068 },
  blueCheckeredCurtain:   { atlas: 53, r: 0, c: 1, rough: 0.88, metal: 0.00, nStr: 2.0, fallback: 0x7c9ec0 },
  stripedQuiltMattress:   { atlas: 53, r: 0, c: 2, rough: 0.92, metal: 0.00, nStr: 2.2, fallback: 0xd4d0c8 },
  grayDiamondQuiltCloth:  { atlas: 53, r: 1, c: 0, rough: 0.90, metal: 0.00, nStr: 2.3, fallback: 0x888c92 },
  deepGreenVelvetCarpet:  { atlas: 53, r: 1, c: 1, rough: 0.94, metal: 0.00, nStr: 2.4, fallback: 0x285432 },
  warmBrownPebbledLeather:{ atlas: 53, r: 1, c: 2, rough: 0.46, metal: 0.06, nStr: 2.2, fallback: 0x7a4c2e },
  roundBraidedFloorRug:   { atlas: 53, r: 2, c: 0, rough: 0.94, metal: 0.00, nStr: 2.6, fallback: 0xa68e70 },
  kidsTownRoadPlaymat:    { atlas: 53, r: 2, c: 1, rough: 0.90, metal: 0.00, nStr: 1.6, fallback: 0x8eb878 },
  botanicalLinenNoren:    { atlas: 53, r: 2, c: 2, rough: 0.88, metal: 0.00, nStr: 1.9, fallback: 0xc8c0a8 },

  // === ATLAS 54: Doors, Furniture & Home Appliances ===
  redPanelEntryDoor:      { atlas: 54, r: 0, c: 0, rough: 0.42, metal: 0.14, nStr: 1.9, fallback: 0xb82424 },
  yellowPanelEntryDoor:   { atlas: 54, r: 0, c: 1, rough: 0.42, metal: 0.14, nStr: 1.9, fallback: 0xe6c020 },
  woodenKoushiSlidingDoor:{ atlas: 54, r: 0, c: 2, rough: 0.62, metal: 0.04, nStr: 2.2, fallback: 0xb07c48 },
  flatscreenTvMtFuji:     { atlas: 54, r: 1, c: 0, rough: 0.16, metal: 0.18, nStr: 1.0, fallback: 0x467cb8 },
  tallWoodHomeBookshelf:  { atlas: 54, r: 1, c: 1, rough: 0.68, metal: 0.02, nStr: 2.3, fallback: 0x7e5a3a },
  woodSystemKitchenUnit:  { atlas: 54, r: 1, c: 2, rough: 0.46, metal: 0.24, nStr: 1.8, fallback: 0xb08454 },
  matteBlackFridge:       { atlas: 54, r: 2, c: 0, rough: 0.34, metal: 0.62, nStr: 1.2, fallback: 0x262a30 },
  antiqueKeyakiTansu:     { atlas: 54, r: 2, c: 1, rough: 0.36, metal: 0.18, nStr: 2.2, fallback: 0x702c1c },
  trifoldVanityDresser:   { atlas: 54, r: 2, c: 2, rough: 0.38, metal: 0.16, nStr: 1.9, fallback: 0x6c422c },

  // === ATLAS 55: Station, Train & Industrial Surfaces ===
  brassInlaidMarbleFloor: { atlas: 55, r: 0, c: 0, rough: 0.22, metal: 0.24, nStr: 1.6, fallback: 0xc2b8a8 },
  rivetedStainlessWall:   { atlas: 55, r: 0, c: 1, rough: 0.30, metal: 0.88, nStr: 2.0, fallback: 0xa2a09a },
  blueStripeSubwayTile:   { atlas: 55, r: 0, c: 2, rough: 0.26, metal: 0.06, nStr: 1.7, fallback: 0xd6dde2 },
  retroBlueCreamTrainCar: { atlas: 55, r: 1, c: 0, rough: 0.32, metal: 0.46, nStr: 2.0, fallback: 0x3a547c },
  darkWalnutHerringbone:  { atlas: 55, r: 1, c: 1, rough: 0.40, metal: 0.02, nStr: 2.0, fallback: 0x5c3a22 },
  greenGoldTrimFabric:    { atlas: 55, r: 1, c: 2, rough: 0.84, metal: 0.06, nStr: 2.0, fallback: 0x28543c },
  rustedRivetedIronPlate: { atlas: 55, r: 2, c: 0, rough: 0.72, metal: 0.58, nStr: 2.5, fallback: 0x744c36 },
  hexMeshIndustrialGrille:{ atlas: 55, r: 2, c: 1, rough: 0.42, metal: 0.82, nStr: 2.8, fallback: 0x4e524e },
  checkerPlateConcreteEdge:{ atlas: 55, r: 2, c: 2, rough: 0.58, metal: 0.44, nStr: 2.5, fallback: 0x7e8286 },

  // === ATLAS 56: Apartment Details, AC Unit & Fabrics ===
  wallHangingCalendar:    { atlas: 56, r: 0, c: 0, rough: 0.84, metal: 0.00, nStr: 1.5, fallback: 0xe2dcd0 },
  roundWoodWallClock:     { atlas: 56, r: 0, c: 1, rough: 0.44, metal: 0.06, nStr: 1.7, fallback: 0xdcd4c6 },
  childCrayonDrawing:     { atlas: 56, r: 0, c: 2, rough: 0.90, metal: 0.00, nStr: 1.3, fallback: 0xe8e2d6 },
  warmGraySquareTile:     { atlas: 56, r: 1, c: 0, rough: 0.46, metal: 0.04, nStr: 1.7, fallback: 0xb4aea6 },
  gardenWoodChipMulch:    { atlas: 56, r: 1, c: 1, rough: 0.92, metal: 0.00, nStr: 2.8, fallback: 0x6e4a2c },
  outdoorAcCondenserUnit: { atlas: 56, r: 1, c: 2, rough: 0.44, metal: 0.46, nStr: 2.3, fallback: 0xc8c4ba },
  indigoTwillDenim:       { atlas: 56, r: 2, c: 0, rough: 0.88, metal: 0.00, nStr: 2.2, fallback: 0x2c527a },
  vintageRoseCotton:      { atlas: 56, r: 2, c: 1, rough: 0.90, metal: 0.00, nStr: 1.7, fallback: 0xdcd2c2 },
  stitchedOrangeCanvas:   { atlas: 56, r: 2, c: 2, rough: 0.88, metal: 0.00, nStr: 2.1, fallback: 0xdc6414 },

  // === ATLAS 57: Shotengai Shopping Street, Hardware & Market ===
  secondhandBookStall:    { atlas: 57, r: 0, c: 0, rough: 0.82, metal: 0.00, nStr: 2.4, fallback: 0xa68e6e },
  flowerShopBuckets:      { atlas: 57, r: 0, c: 1, rough: 0.72, metal: 0.14, nStr: 2.5, fallback: 0x7c8e58 },
  boutiqueClothingRack:   { atlas: 57, r: 0, c: 2, rough: 0.88, metal: 0.04, nStr: 2.4, fallback: 0x7c6e60 },
  retroApplianceShelf:    { atlas: 57, r: 1, c: 0, rough: 0.48, metal: 0.28, nStr: 2.2, fallback: 0xa68c6e },
  hardwareToolPegboard:   { atlas: 57, r: 1, c: 1, rough: 0.56, metal: 0.42, nStr: 2.6, fallback: 0x9c7c54 },
  dagashiCandyShelves:    { atlas: 57, r: 1, c: 2, rough: 0.52, metal: 0.06, nStr: 2.4, fallback: 0xa67e58 },
  fishmongerIceTray:      { atlas: 57, r: 2, c: 0, rough: 0.24, metal: 0.22, nStr: 2.5, fallback: 0x9aa4ae },
  butcherMeatDisplayCase: { atlas: 57, r: 2, c: 1, rough: 0.28, metal: 0.34, nStr: 2.2, fallback: 0xb06864 },
  teaCanisterShopShelf:   { atlas: 57, r: 2, c: 2, rough: 0.36, metal: 0.46, nStr: 2.1, fallback: 0x8c7458 },

  // === ATLAS 58: Shokudo Food, Cafe & Ticket Vending ===
  shoyuRamenBowlTop:      { atlas: 58, r: 0, c: 0, rough: 0.22, metal: 0.04, nStr: 2.1, fallback: 0xa87644 },
  japaneseCurryRiceTop:   { atlas: 58, r: 0, c: 1, rough: 0.28, metal: 0.02, nStr: 2.1, fallback: 0x9e7040 },
  patisserieCakeShowcase: { atlas: 58, r: 0, c: 2, rough: 0.20, metal: 0.28, nStr: 1.9, fallback: 0xc8beb2 },
  izakayaBottleShelf:     { atlas: 58, r: 1, c: 0, rough: 0.24, metal: 0.14, nStr: 2.1, fallback: 0x6e4e34 },
  charcoalYakitoriGrill:  { atlas: 58, r: 1, c: 1, rough: 0.42, metal: 0.36, nStr: 2.6, fallback: 0x7c4a2a },
  shokudoTicketMachine:   { atlas: 58, r: 1, c: 2, rough: 0.32, metal: 0.36, nStr: 1.8, fallback: 0xd2d6dc },
  cafeCoffeeShortcake:    { atlas: 58, r: 2, c: 0, rough: 0.34, metal: 0.04, nStr: 1.7, fallback: 0x8c6244 },
  terracottaTactileTiles: { atlas: 58, r: 2, c: 1, rough: 0.72, metal: 0.02, nStr: 2.6, fallback: 0xb8462c },
  checkeredCafeTileFloor: { atlas: 58, r: 2, c: 2, rough: 0.22, metal: 0.06, nStr: 1.2, fallback: 0x80807c },

  // === ATLAS 59: School, Office, Logistics & Medical ===
  warmSchoolWoodFloor:    { atlas: 59, r: 0, c: 0, rough: 0.48, metal: 0.02, nStr: 1.7, fallback: 0xc28e50 },
  classroomArtPinboard:   { atlas: 59, r: 0, c: 1, rough: 0.84, metal: 0.02, nStr: 1.8, fallback: 0x528458 },
  gymWallBarsRibStall:    { atlas: 59, r: 0, c: 2, rough: 0.56, metal: 0.06, nStr: 2.3, fallback: 0xbe9058 },
  nurseryRainbowWall:     { atlas: 59, r: 1, c: 0, rough: 0.84, metal: 0.00, nStr: 1.3, fallback: 0xd8d2b8 },
  officeBinderSteelCabinet:{ atlas: 59, r: 1, c: 1, rough: 0.46, metal: 0.36, nStr: 2.1, fallback: 0xa6aeb4 },
  staffPhotoNoticeBoard:  { atlas: 59, r: 1, c: 2, rough: 0.62, metal: 0.16, nStr: 1.8, fallback: 0x5c7c66 },
  warehouseCardboardRack: { atlas: 59, r: 2, c: 0, rough: 0.76, metal: 0.22, nStr: 2.3, fallback: 0x9c8c74 },
  cobaltPebbledLeather:   { atlas: 59, r: 2, c: 1, rough: 0.48, metal: 0.06, nStr: 2.2, fallback: 0x3a76be },
  clinicMedicalRecordDesk:{ atlas: 59, r: 2, c: 2, rough: 0.52, metal: 0.08, nStr: 1.9, fallback: 0xc8c2b2 },

  // === ATLAS 60: Lab, Underground Facility & Sci-Fi Industrial ===
  copperSteelPipeBank:    { atlas: 60, r: 0, c: 0, rough: 0.34, metal: 0.86, nStr: 2.7, fallback: 0x8e6c54 },
  scifiHoloDataConsole:   { atlas: 60, r: 0, c: 1, rough: 0.20, metal: 0.42, nStr: 1.8, fallback: 0x1c4a64 },
  recessedFluorescentPanel:{ atlas: 60, r: 0, c: 2, rough: 0.24, metal: 0.26, nStr: 1.6, fallback: 0xc8d8e6 },
  greenIndustrialBulkhead:{ atlas: 60, r: 1, c: 0, rough: 0.32, metal: 0.48, nStr: 2.3, fallback: 0x2c8c50 },
  blueIndustrialWaterPump:{ atlas: 60, r: 1, c: 1, rough: 0.40, metal: 0.78, nStr: 2.6, fallback: 0x2c669c },
  industrialBoilerTank:   { atlas: 60, r: 1, c: 2, rough: 0.44, metal: 0.76, nStr: 2.6, fallback: 0x7c8286 },
  whiteRivetedSteelHull:  { atlas: 60, r: 2, c: 0, rough: 0.40, metal: 0.54, nStr: 2.0, fallback: 0xd0d0cc },
  bundledMulticolorCables:{ atlas: 60, r: 2, c: 1, rough: 0.42, metal: 0.24, nStr: 2.7, fallback: 0x6c5e54 },
  yellowBlackHazardStripes:{ atlas: 60, r: 2, c: 2, rough: 0.62, metal: 0.08, nStr: 2.0, fallback: 0xc89a1c },

  // === ATLAS 61: Tokyo Subway Station ===
  subwayBallastTracks:     { atlas: 61, r: 0, c: 0, rough: 0.84, metal: 0.32, nStr: 2.8, fallback: 0x6c665e },
  subwayConduitWall:       { atlas: 61, r: 0, c: 1, rough: 0.78, metal: 0.24, nStr: 2.5, fallback: 0x6e6a62 },
  subwayVaultedCeilingLamp:{ atlas: 61, r: 0, c: 2, rough: 0.62, metal: 0.22, nStr: 2.2, fallback: 0x8a867e },
  subwayPlatformTactile:   { atlas: 61, r: 1, c: 0, rough: 0.76, metal: 0.04, nStr: 2.4, fallback: 0x9c988a },
  subwayPlatformApron:     { atlas: 61, r: 1, c: 1, rough: 0.84, metal: 0.06, nStr: 2.6, fallback: 0x726c64 },
  subwayStationBenchWall:  { atlas: 61, r: 1, c: 2, rough: 0.56, metal: 0.14, nStr: 2.1, fallback: 0x9e9c92 },
  subwayTwinFluorescent:   { atlas: 61, r: 2, c: 0, rough: 0.48, metal: 0.32, nStr: 2.0, fallback: 0x9e988e },
  subwayExitArrowCorridor: { atlas: 61, r: 2, c: 1, rough: 0.68, metal: 0.18, nStr: 2.1, fallback: 0x8e8a80 },
  subwayDrainagePlateFloor:{ atlas: 61, r: 2, c: 2, rough: 0.54, metal: 0.74, nStr: 2.8, fallback: 0x76726a },

  // === ATLAS 62: Mossy Forest Shrine Ruins ===
  mossyShrineStonePavers:  { atlas: 62, r: 0, c: 0, rough: 0.88, metal: 0.02, nStr: 2.7, fallback: 0x666a58 },
  lichenKawaraRoofTiles:   { atlas: 62, r: 0, c: 1, rough: 0.78, metal: 0.04, nStr: 2.8, fallback: 0x686c68 },
  peelingVermilionShrine:  { atlas: 62, r: 0, c: 2, rough: 0.82, metal: 0.02, nStr: 2.5, fallback: 0x8e3c30 },
  agedCedarShrinePlanks:   { atlas: 62, r: 1, c: 0, rough: 0.84, metal: 0.00, nStr: 2.5, fallback: 0x5c4a38 },
  carvedMossyStoneRelief:  { atlas: 62, r: 1, c: 1, rough: 0.88, metal: 0.02, nStr: 2.8, fallback: 0x7c806c },
  shimenawaStrawRope:      { atlas: 62, r: 1, c: 2, rough: 0.94, metal: 0.00, nStr: 2.9, fallback: 0xb6a280 },
  peelingPlasterStoneWall: { atlas: 62, r: 2, c: 0, rough: 0.90, metal: 0.00, nStr: 2.7, fallback: 0x9e9684 },
  autumnMomijiSoilBed:     { atlas: 62, r: 2, c: 1, rough: 0.90, metal: 0.00, nStr: 2.6, fallback: 0x5c4434 },
  verdigrisCopperSheet:    { atlas: 62, r: 2, c: 2, rough: 0.56, metal: 0.62, nStr: 2.3, fallback: 0x5e8e7a },

  // === ATLAS 63: Weathered Tokyo Subway Train ===
  subwayCarSideWindows:    { atlas: 63, r: 0, c: 0, rough: 0.34, metal: 0.46, nStr: 2.1, fallback: 0x8c9694 },
  subwayCarSlidingDoors:   { atlas: 63, r: 0, c: 1, rough: 0.36, metal: 0.64, nStr: 2.0, fallback: 0x9e9c96 },
  subwayCarFrontCabFace:   { atlas: 63, r: 0, c: 2, rough: 0.30, metal: 0.48, nStr: 2.1, fallback: 0x7c8e8c },
  subwayCarRoofVentPanel:  { atlas: 63, r: 1, c: 0, rough: 0.58, metal: 0.68, nStr: 2.6, fallback: 0x84827e },
  subwayCarBogieWheels:    { atlas: 63, r: 1, c: 1, rough: 0.52, metal: 0.78, nStr: 2.8, fallback: 0x6c6c6a },
  subwayCarAisleFloor:     { atlas: 63, r: 1, c: 2, rough: 0.32, metal: 0.08, nStr: 1.4, fallback: 0x7c847e },
  subwayCarMoquetteSeat:   { atlas: 63, r: 2, c: 0, rough: 0.78, metal: 0.14, nStr: 2.1, fallback: 0x547882 },
  subwayCarInteriorCeiling:{ atlas: 63, r: 2, c: 1, rough: 0.42, metal: 0.26, nStr: 2.0, fallback: 0xa6a296 },
  subwayCarGangwayDoor:    { atlas: 63, r: 2, c: 2, rough: 0.52, metal: 0.42, nStr: 2.3, fallback: 0x807c76 },

  // === ATLAS 64: Underground Ruin Floors ===
  packedCaveDirtFloor:     { atlas: 64, r: 0, c: 0, rough: 0.94, metal: 0.00, nStr: 2.6, fallback: 0x74583c },
  scatteredDryStrawFloor:  { atlas: 64, r: 0, c: 1, rough: 0.94, metal: 0.00, nStr: 2.8, fallback: 0x8c7042 },
  ancientCobbleFlagstone:  { atlas: 64, r: 0, c: 2, rough: 0.88, metal: 0.02, nStr: 2.7, fallback: 0x686058 },
  wornStoneRuinSteps:      { atlas: 64, r: 1, c: 0, rough: 0.88, metal: 0.02, nStr: 2.8, fallback: 0x6c6050 },
  muddyBootprintPuddles:   { atlas: 64, r: 1, c: 1, rough: 0.24, metal: 0.06, nStr: 2.6, fallback: 0x543e2c },
  charredAshGroundBed:     { atlas: 64, r: 1, c: 2, rough: 0.94, metal: 0.00, nStr: 2.5, fallback: 0x525252 },
  stainedRottenFloorPlanks:{ atlas: 64, r: 2, c: 0, rough: 0.86, metal: 0.02, nStr: 2.5, fallback: 0x5c4430 },
  embeddedRiverPebbleDirt: { atlas: 64, r: 2, c: 1, rough: 0.90, metal: 0.02, nStr: 2.7, fallback: 0x726658 },
  shatteredTerracottaTiles:{ atlas: 64, r: 2, c: 2, rough: 0.84, metal: 0.02, nStr: 2.6, fallback: 0x8e5c48 },

  // === ATLAS 65: Authentic Japanese Food & Kitchen Materials ===
  steamingWhiteRiceMacro:  { atlas: 65, r: 0, c: 0, rough: 0.26, metal: 0.00, nStr: 2.4, fallback: 0xeceae2 },
  fermentedMisoPaste:      { atlas: 65, r: 0, c: 1, rough: 0.44, metal: 0.00, nStr: 2.4, fallback: 0xb25c1e },
  roastedCrispNoriSheet:   { atlas: 65, r: 0, c: 2, rough: 0.42, metal: 0.04, nStr: 2.6, fallback: 0x263218 },
  crispyPankoTonkatsu:     { atlas: 65, r: 1, c: 0, rough: 0.72, metal: 0.00, nStr: 2.8, fallback: 0xc87424 },
  slicedYellowTakuan:      { atlas: 65, r: 1, c: 1, rough: 0.24, metal: 0.00, nStr: 1.5, fallback: 0xe4b810 },
  indigoAsanohaNoren:      { atlas: 65, r: 1, c: 2, rough: 0.88, metal: 0.00, nStr: 1.9, fallback: 0x263c5e },
  kraftRiceSackTwine:      { atlas: 65, r: 2, c: 0, rough: 0.86, metal: 0.00, nStr: 2.3, fallback: 0xc6a882 },
  clearPvcStripCurtain:    { atlas: 65, r: 2, c: 1, rough: 0.14, metal: 0.16, nStr: 1.6, fallback: 0xa4b0b8 },
  weatheredIzakayaCounter: { atlas: 65, r: 2, c: 2, rough: 0.56, metal: 0.02, nStr: 2.2, fallback: 0x7c5432 },

  // === ATLAS 66: Medieval Stone & Heritage Architecture ===
  creamLimestoneAshlar:    { atlas: 66, r: 0, c: 0, rough: 0.84, metal: 0.00, nStr: 2.3, fallback: 0xd4c8b2 },
  flutedGothicStonePillar: { atlas: 66, r: 0, c: 1, rough: 0.82, metal: 0.00, nStr: 2.6, fallback: 0xc0b29c },
  carvedAcanthusCapital:   { atlas: 66, r: 0, c: 2, rough: 0.82, metal: 0.00, nStr: 2.8, fallback: 0xc4b6a0 },
  romanStoneArchVault:     { atlas: 66, r: 1, c: 0, rough: 0.84, metal: 0.00, nStr: 2.6, fallback: 0xbcae98 },
  agedWhiteLimePlaster:    { atlas: 66, r: 1, c: 1, rough: 0.88, metal: 0.00, nStr: 1.9, fallback: 0xdedad2 },
  fadedMedievalFresco:     { atlas: 66, r: 1, c: 2, rough: 0.84, metal: 0.00, nStr: 2.0, fallback: 0xb8a28c },
  sootStainedCastleBlock:  { atlas: 66, r: 2, c: 0, rough: 0.88, metal: 0.02, nStr: 2.4, fallback: 0x565046 },
  paneledOakWainscoting:   { atlas: 66, r: 2, c: 1, rough: 0.52, metal: 0.02, nStr: 2.2, fallback: 0x764c28 },
  wovenUnicornTapestry:    { atlas: 66, r: 2, c: 2, rough: 0.90, metal: 0.00, nStr: 2.1, fallback: 0x6e6c54 },

  // === ATLAS 67: Railway, Shield Tunnel & Road Infrastructure ===
  ballastWoodTieRail:      { atlas: 67, r: 0, c: 0, rough: 0.82, metal: 0.34, nStr: 2.8, fallback: 0x767068 },
  ballastConcreteTieRail:  { atlas: 67, r: 0, c: 1, rough: 0.84, metal: 0.14, nStr: 2.7, fallback: 0x8e8c88 },
  shieldTunnelConcreteRing:{ atlas: 67, r: 0, c: 2, rough: 0.80, metal: 0.04, nStr: 2.2, fallback: 0x8c8c8a },
  cleanConcreteDeckJoint:  { atlas: 67, r: 1, c: 0, rough: 0.82, metal: 0.02, nStr: 1.8, fallback: 0xb2b0ac },
  tireScuffedRoadDeck:     { atlas: 67, r: 1, c: 1, rough: 0.78, metal: 0.04, nStr: 2.1, fallback: 0x908e8c },
  glossyWhiteSubwayTile:   { atlas: 67, r: 1, c: 2, rough: 0.18, metal: 0.06, nStr: 1.5, fallback: 0xe2e4e4 },
  galvanizedSteelPole:     { atlas: 67, r: 2, c: 0, rough: 0.36, metal: 0.86, nStr: 1.6, fallback: 0x9ca4ac },
  boltedHighwayGuardrail:  { atlas: 67, r: 2, c: 1, rough: 0.38, metal: 0.84, nStr: 2.4, fallback: 0xa2aab0 },
  diamondTreadManhole:     { atlas: 67, r: 2, c: 2, rough: 0.60, metal: 0.72, nStr: 2.8, fallback: 0x605c58 },

  // === ATLAS 68: Underground & Cave Ceilings ===
  craggyCaveRockCeiling:   { atlas: 68, r: 0, c: 0, rough: 0.90, metal: 0.04, nStr: 2.9, fallback: 0x625a50 },
  timberBeamTunnelCeiling: { atlas: 68, r: 0, c: 1, rough: 0.86, metal: 0.00, nStr: 2.7, fallback: 0x644830 },
  wovenReedMudCeiling:     { atlas: 68, r: 0, c: 2, rough: 0.92, metal: 0.00, nStr: 2.8, fallback: 0x8c7656 },
  sootBlackenedCaveVault:  { atlas: 68, r: 1, c: 0, rough: 0.94, metal: 0.02, nStr: 2.3, fallback: 0x2a2826 },
  drippingIcicleCaveStone: { atlas: 68, r: 1, c: 1, rough: 0.24, metal: 0.10, nStr: 2.7, fallback: 0x6c6e62 },
  collapsedClayBedrock:    { atlas: 68, r: 1, c: 2, rough: 0.92, metal: 0.02, nStr: 2.9, fallback: 0x7c6e5c },
  stackedRoundMineLogs:    { atlas: 68, r: 2, c: 0, rough: 0.86, metal: 0.00, nStr: 2.7, fallback: 0x664e38 },
  darkSlateVaultSlabs:     { atlas: 68, r: 2, c: 1, rough: 0.84, metal: 0.04, nStr: 2.4, fallback: 0x5c5a52 },
  danglingEarthRootsRoof:  { atlas: 68, r: 2, c: 2, rough: 0.92, metal: 0.00, nStr: 2.8, fallback: 0x685642 },

  // === ATLAS 69: Abandoned Underground Cistern Masonry ===
  dampCisternStoneBlocks:  { atlas: 69, r: 0, c: 0, rough: 0.78, metal: 0.04, nStr: 2.6, fallback: 0x7e807e },
  waterlineAlgaeStoneWall: { atlas: 69, r: 0, c: 1, rough: 0.62, metal: 0.04, nStr: 2.6, fallback: 0x5c5e4e },
  flutedWetDarkBasalt:     { atlas: 69, r: 0, c: 2, rough: 0.44, metal: 0.08, nStr: 2.8, fallback: 0x464844 },
  ironOxideSeepingStone:   { atlas: 69, r: 1, c: 0, rough: 0.76, metal: 0.08, nStr: 2.6, fallback: 0xb29874 },
  thickMossCisternWall:    { atlas: 69, r: 1, c: 1, rough: 0.86, metal: 0.00, nStr: 2.8, fallback: 0x546834 },
  wetGlossyDarkGranite:    { atlas: 69, r: 1, c: 2, rough: 0.20, metal: 0.08, nStr: 2.7, fallback: 0x565450 },
  submergedCausticBlocks:  { atlas: 69, r: 2, c: 0, rough: 0.14, metal: 0.08, nStr: 2.2, fallback: 0x868874 },
  rippledWetSiltFloor:     { atlas: 69, r: 2, c: 1, rough: 0.68, metal: 0.02, nStr: 2.3, fallback: 0x7c7466 },
  flakingWhiteCisternLime: { atlas: 69, r: 2, c: 2, rough: 0.88, metal: 0.00, nStr: 2.6, fallback: 0xc0bcb0 },

  // === ATLAS 70: Abandoned Mine Equipment & Metal ===
  heavyRustedRivetedSteel: { atlas: 70, r: 0, c: 0, rough: 0.78, metal: 0.68, nStr: 2.7, fallback: 0x78503c },
  rustedSquareIronGrating: { atlas: 70, r: 0, c: 1, rough: 0.66, metal: 0.76, nStr: 2.9, fallback: 0x38322e },
  flakingRedLeadIronRust:  { atlas: 70, r: 0, c: 2, rough: 0.78, metal: 0.46, nStr: 2.7, fallback: 0x8c4434 },
  rustedDiamondTreadSteel: { atlas: 70, r: 1, c: 0, rough: 0.64, metal: 0.74, nStr: 2.7, fallback: 0x765c4c },
  dentedYellowOilDrum:     { atlas: 70, r: 1, c: 1, rough: 0.54, metal: 0.56, nStr: 2.3, fallback: 0xc28a24 },
  weatheredMineWoodCrate:  { atlas: 70, r: 1, c: 2, rough: 0.84, metal: 0.04, nStr: 2.5, fallback: 0x7e6c5a },
  coiledRustedSteelCable:  { atlas: 70, r: 2, c: 0, rough: 0.62, metal: 0.78, nStr: 2.9, fallback: 0x5c4636 },
  stainedBurlapSandbag:    { atlas: 70, r: 2, c: 1, rough: 0.94, metal: 0.00, nStr: 2.6, fallback: 0xa69278 },
  chippedGreenMachinery:   { atlas: 70, r: 2, c: 2, rough: 0.60, metal: 0.56, nStr: 2.4, fallback: 0x6e8268 },

  // === ATLAS 71: Abandoned Mine Timber & Ore Rock ===
  darkCoalShaleRock:       { atlas: 71, r: 0, c: 0, rough: 0.76, metal: 0.14, nStr: 2.9, fallback: 0x3a3c3e },
  ironOreVeinedRock:       { atlas: 71, r: 0, c: 1, rough: 0.84, metal: 0.12, nStr: 2.9, fallback: 0x6c665c },
  nailedMineShaftPlanks:   { atlas: 71, r: 0, c: 2, rough: 0.84, metal: 0.04, nStr: 2.6, fallback: 0x624e38 },
  splitRottenMineTimber:   { atlas: 71, r: 1, c: 0, rough: 0.88, metal: 0.00, nStr: 2.8, fallback: 0x524234 },
  crushedBlackCoalGravel:  { atlas: 71, r: 1, c: 1, rough: 0.88, metal: 0.08, nStr: 2.8, fallback: 0x363638 },
  mineCartTimberTrack:     { atlas: 71, r: 1, c: 2, rough: 0.88, metal: 0.06, nStr: 2.8, fallback: 0x665e54 },
  horizontalMineBoardwalk: { atlas: 71, r: 2, c: 0, rough: 0.82, metal: 0.02, nStr: 2.5, fallback: 0x7e6448 },
  charredBlackenedTimber:  { atlas: 71, r: 2, c: 1, rough: 0.90, metal: 0.02, nStr: 2.8, fallback: 0x322e2a },
  quartzVeinedGrayGranite: { atlas: 71, r: 2, c: 2, rough: 0.80, metal: 0.06, nStr: 2.8, fallback: 0x7e7e7a },

  // === ATLAS 72: Japanese Abandoned Stone Quarry ===
  drilledBlueGrayQuarry:   { atlas: 72, r: 0, c: 0, rough: 0.82, metal: 0.04, nStr: 2.6, fallback: 0x767c82 },
  ochreSandstoneCliff:     { atlas: 72, r: 0, c: 1, rough: 0.88, metal: 0.02, nStr: 2.7, fallback: 0xb69268 },
  chiseledVerticalQuarry:  { atlas: 72, r: 0, c: 2, rough: 0.84, metal: 0.02, nStr: 2.8, fallback: 0xa4a29c },
  rustStreakedSlateCliff:  { atlas: 72, r: 1, c: 0, rough: 0.84, metal: 0.06, nStr: 2.7, fallback: 0x9c6e46 },
  crushedWhiteGraniteBed:  { atlas: 72, r: 1, c: 1, rough: 0.86, metal: 0.04, nStr: 2.9, fallback: 0xb2aea6 },
  crushedDarkBasaltBallast:{ atlas: 72, r: 1, c: 2, rough: 0.86, metal: 0.06, nStr: 2.9, fallback: 0x52565a },
  lichenCoveredQuarryRock: { atlas: 72, r: 2, c: 0, rough: 0.90, metal: 0.00, nStr: 2.8, fallback: 0x86906c },
  redLateriteQuarryDirt:   { atlas: 72, r: 2, c: 1, rough: 0.92, metal: 0.00, nStr: 2.7, fallback: 0x9c5c3e },
  weedyQuarryGravelFloor:  { atlas: 72, r: 2, c: 2, rough: 0.90, metal: 0.02, nStr: 2.7, fallback: 0x76786a },

  // === ATLAS 73: Abandoned Hillside Concrete Bunker ===
  boardFormedBunkerWall:   { atlas: 73, r: 0, c: 0, rough: 0.84, metal: 0.02, nStr: 2.4, fallback: 0x92908c },
  peelingWhiteBunkerPaint: { atlas: 73, r: 0, c: 1, rough: 0.86, metal: 0.02, nStr: 2.5, fallback: 0xbcbab2 },
  weatheredRedBunkerBrick: { atlas: 73, r: 0, c: 2, rough: 0.86, metal: 0.02, nStr: 2.6, fallback: 0x7e4e3e },
  spallingCrackedConcrete: { atlas: 73, r: 1, c: 0, rough: 0.88, metal: 0.02, nStr: 2.5, fallback: 0x8e8c88 },
  efflorescenceDampWall:   { atlas: 73, r: 1, c: 1, rough: 0.84, metal: 0.02, nStr: 2.4, fallback: 0x6c685e },
  oliveDrabBunkerPaint:    { atlas: 73, r: 1, c: 2, rough: 0.78, metal: 0.04, nStr: 2.1, fallback: 0x768854 },
  flakingCharcoalPlaster:  { atlas: 73, r: 2, c: 0, rough: 0.88, metal: 0.04, nStr: 2.5, fallback: 0x626466 },
  ribbedBunkerTieConcrete: { atlas: 73, r: 2, c: 1, rough: 0.84, metal: 0.08, nStr: 2.5, fallback: 0x96928c },
  crackedVintageSquareTile:{ atlas: 73, r: 2, c: 2, rough: 0.54, metal: 0.04, nStr: 2.4, fallback: 0xc8c0b2 },

  // === ATLAS 74: Underground Vault & Beam Ceilings (Variant B) ===
  fracturedGraniteVault:   { atlas: 74, r: 0, c: 0, rough: 0.90, metal: 0.04, nStr: 2.9, fallback: 0x625e58 },
  rafterWoodRoofDeck:      { atlas: 74, r: 0, c: 1, rough: 0.84, metal: 0.00, nStr: 2.7, fallback: 0x6c4c32 },
  wovenTwigMudCeiling:     { atlas: 74, r: 0, c: 2, rough: 0.92, metal: 0.00, nStr: 2.8, fallback: 0x8e7454 },
  charredStoneCeiling:     { atlas: 74, r: 1, c: 0, rough: 0.94, metal: 0.02, nStr: 2.4, fallback: 0x322e2a },
  mineralSeepVaultWall:    { atlas: 74, r: 1, c: 1, rough: 0.72, metal: 0.04, nStr: 2.5, fallback: 0x7e7256 },
  brokenPlasterLathHole:   { atlas: 74, r: 1, c: 2, rough: 0.92, metal: 0.02, nStr: 2.9, fallback: 0x847664 },
  verticalPineLogWall:     { atlas: 74, r: 2, c: 0, rough: 0.86, metal: 0.00, nStr: 2.7, fallback: 0x72563c },
  ashlarSlateBlockWall:    { atlas: 74, r: 2, c: 1, rough: 0.84, metal: 0.04, nStr: 2.5, fallback: 0x6e6a62 },
  hangingRootEarthBank:    { atlas: 74, r: 2, c: 2, rough: 0.92, metal: 0.00, nStr: 2.8, fallback: 0x6c543c },

  // === ATLAS 75: Historic Ground & Trail Floors (Variant B) ===
  packedClayTrailDirt:     { atlas: 75, r: 0, c: 0, rough: 0.94, metal: 0.00, nStr: 2.6, fallback: 0x80644a },
  goldenStrawBarnFloor:    { atlas: 75, r: 0, c: 1, rough: 0.94, metal: 0.00, nStr: 2.8, fallback: 0x947644 },
  mossyRoundedCobbles:     { atlas: 75, r: 0, c: 2, rough: 0.88, metal: 0.02, nStr: 2.7, fallback: 0x6e6860 },
  chippedStoneStaircase:   { atlas: 75, r: 1, c: 0, rough: 0.88, metal: 0.02, nStr: 2.8, fallback: 0x746c60 },
  rainBootprintMudTrack:   { atlas: 75, r: 1, c: 1, rough: 0.28, metal: 0.06, nStr: 2.6, fallback: 0x5c4634 },
  burntTimberCharcoalBed:  { atlas: 75, r: 1, c: 2, rough: 0.94, metal: 0.00, nStr: 2.5, fallback: 0x585858 },
  verticalAgedDeckPlanks:  { atlas: 75, r: 2, c: 0, rough: 0.84, metal: 0.02, nStr: 2.5, fallback: 0x68503c },
  packedGravelPathway:     { atlas: 75, r: 2, c: 1, rough: 0.90, metal: 0.02, nStr: 2.7, fallback: 0x7c6e5c },
  crackedRedQuarryTile:    { atlas: 75, r: 2, c: 2, rough: 0.82, metal: 0.02, nStr: 2.5, fallback: 0x96644e },

  // === ATLAS 76: Ruined Decay, Oil Stains & Ancient Shards ===
  collapsedBrickPlaster:   { atlas: 76, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 2.9, fallback: 0x9c8872 },
  crushedRedBrickRubble:   { atlas: 76, r: 0, c: 1, rough: 0.90, metal: 0.02, nStr: 2.9, fallback: 0x8e5c46 },
  dustyCobwebConcrete:     { atlas: 76, r: 0, c: 2, rough: 0.90, metal: 0.02, nStr: 2.6, fallback: 0x706c64 },
  mossyFlakingStucco:      { atlas: 76, r: 1, c: 0, rough: 0.88, metal: 0.00, nStr: 2.7, fallback: 0x767a5c },
  blackSootRainStreaks:    { atlas: 76, r: 1, c: 1, rough: 0.86, metal: 0.04, nStr: 2.5, fallback: 0x64625c },
  rainbowOilStainConcrete: { atlas: 76, r: 1, c: 2, rough: 0.24, metal: 0.22, nStr: 2.2, fallback: 0x726c62 },
  ancientOchreCaveArt:     { atlas: 76, r: 2, c: 0, rough: 0.88, metal: 0.00, nStr: 2.3, fallback: 0xac987e },
  tricklingMossWaterfall:  { atlas: 76, r: 2, c: 1, rough: 0.34, metal: 0.06, nStr: 2.8, fallback: 0x667048 },
  ancientPotteryShards:    { atlas: 76, r: 2, c: 2, rough: 0.86, metal: 0.02, nStr: 2.8, fallback: 0x846c56 },

  // === ATLAS 77: Japanese Apartment Living & PC Desk ===
  woodGlassDishCupboard:   { atlas: 77, r: 0, c: 0, rough: 0.44, metal: 0.08, nStr: 1.8, fallback: 0xb68654 },
  fridgeDoorCuteMagnets:   { atlas: 77, r: 0, c: 1, rough: 0.30, metal: 0.46, nStr: 1.5, fallback: 0xc4c8cc },
  indoorLaundryDryingRack: { atlas: 77, r: 0, c: 2, rough: 0.88, metal: 0.14, nStr: 2.0, fallback: 0xc8c4bc },
  chromeWallTowelBars:     { atlas: 77, r: 1, c: 0, rough: 0.88, metal: 0.18, nStr: 2.2, fallback: 0xcac6be },
  whiteWindowBlinds:       { atlas: 77, r: 1, c: 1, rough: 0.48, metal: 0.22, nStr: 2.4, fallback: 0xd4d0ca },
  hinokiKamidanaAltar:     { atlas: 77, r: 1, c: 2, rough: 0.62, metal: 0.06, nStr: 2.1, fallback: 0xc8a472 },
  pottedHouseplantShelves: { atlas: 77, r: 2, c: 0, rough: 0.72, metal: 0.04, nStr: 2.4, fallback: 0x8ea06c },
  topDownPcMonitorDesk:    { atlas: 77, r: 2, c: 1, rough: 0.46, metal: 0.18, nStr: 1.8, fallback: 0x9a744e },
  blueHemSheerCurtain:     { atlas: 77, r: 2, c: 2, rough: 0.88, metal: 0.00, nStr: 1.8, fallback: 0xdce0e4 },

  // === ATLAS 78: Dungeon Stone, Iron Gates & Torch Sconce ===
  spiralStoneStaircase:    { atlas: 78, r: 0, c: 0, rough: 0.86, metal: 0.02, nStr: 2.9, fallback: 0x6a6456 },
  mossyDungeonSteps:       { atlas: 78, r: 0, c: 1, rough: 0.88, metal: 0.02, nStr: 2.8, fallback: 0x645e50 },
  studdedIronCellDoor:     { atlas: 78, r: 0, c: 2, rough: 0.68, metal: 0.64, nStr: 2.8, fallback: 0x5c5448 },
  crackedStoneRingDoor:    { atlas: 78, r: 1, c: 0, rough: 0.86, metal: 0.14, nStr: 2.7, fallback: 0x76705e },
  chainedRustyIronCage:    { atlas: 78, r: 1, c: 1, rough: 0.68, metal: 0.72, nStr: 2.9, fallback: 0x685442 },
  mossyNailedBridgeWood:   { atlas: 78, r: 1, c: 2, rough: 0.86, metal: 0.04, nStr: 2.6, fallback: 0x60523e },
  heavyRopePostRailing:    { atlas: 78, r: 2, c: 0, rough: 0.90, metal: 0.04, nStr: 2.8, fallback: 0x74664e },
  rustedIronBarGrate:      { atlas: 78, r: 2, c: 1, rough: 0.66, metal: 0.76, nStr: 2.9, fallback: 0x564638 },
  ironWallTorchSconce:     { atlas: 78, r: 2, c: 2, rough: 0.72, metal: 0.56, nStr: 2.9, fallback: 0x72644e },

  // === ATLAS 79: Cleanroom, Aerospace & Orbital Lab Modules ===
  starfieldPortholeWindow: { atlas: 79, r: 0, c: 0, rough: 0.22, metal: 0.58, nStr: 2.0, fallback: 0x6c7480 },
  pressurizedO2TankRack:   { atlas: 79, r: 0, c: 1, rough: 0.34, metal: 0.66, nStr: 2.3, fallback: 0x7296be },
  whiteCleanroomHatch:     { atlas: 79, r: 0, c: 2, rough: 0.36, metal: 0.52, nStr: 2.0, fallback: 0xc4c8cc },
  labAirFiltrationUnit:    { atlas: 79, r: 1, c: 0, rough: 0.36, metal: 0.54, nStr: 2.2, fallback: 0xc2c8ce },
  fluidRecycleLabPanel:    { atlas: 79, r: 1, c: 1, rough: 0.26, metal: 0.52, nStr: 2.2, fallback: 0x90a4b8 },
  yellowZeroGWarningSign:  { atlas: 79, r: 1, c: 2, rough: 0.34, metal: 0.26, nStr: 1.7, fallback: 0xe8bc1c },
  redEmergencyMaskBox:     { atlas: 79, r: 2, c: 0, rough: 0.34, metal: 0.36, nStr: 2.1, fallback: 0xb63c34 },
  whiteSciFiBulkheadWall:  { atlas: 79, r: 2, c: 1, rough: 0.38, metal: 0.32, nStr: 1.7, fallback: 0xdcdede },
  steelDeckUtilityTrench:  { atlas: 79, r: 2, c: 2, rough: 0.44, metal: 0.72, nStr: 2.5, fallback: 0x8c9298 },

  // === ATLAS 80: Urban Transit, Safety Doors & Elevators ===
  tricolorFloorGuideArrows:{ atlas: 80, r: 0, c: 0, rough: 0.62, metal: 0.04, nStr: 1.8, fallback: 0x9a9c9c },
  dualYellowTactileBlock:  { atlas: 80, r: 0, c: 1, rough: 0.66, metal: 0.02, nStr: 2.7, fallback: 0xebb818 },
  metroTransitRouteMap:    { atlas: 80, r: 0, c: 2, rough: 0.26, metal: 0.14, nStr: 1.2, fallback: 0xe2e4e6 },
  greenEmergencyExitDoor:  { atlas: 80, r: 1, c: 0, rough: 0.38, metal: 0.42, nStr: 1.7, fallback: 0x3a764c },
  redFireAlarmCallPoint:   { atlas: 80, r: 1, c: 1, rough: 0.32, metal: 0.16, nStr: 1.8, fallback: 0xc23830 },
  classicRedJapanesePost:  { atlas: 80, r: 1, c: 2, rough: 0.30, metal: 0.44, nStr: 1.6, fallback: 0xc83024 },
  castIronTreeGrateFull:   { atlas: 80, r: 2, c: 0, rough: 0.66, metal: 0.68, nStr: 2.8, fallback: 0x6c6e6a },
  stainlessParkFountain:   { atlas: 80, r: 2, c: 1, rough: 0.24, metal: 0.86, nStr: 1.5, fallback: 0xb4b6b8 },
  twinStainlessElevators:  { atlas: 80, r: 2, c: 2, rough: 0.26, metal: 0.78, nStr: 1.7, fallback: 0xb4b0a8 },

  // === ATLAS 81: Volcanic Minerals, Obsidian & Hot Spring ===
  pinkSpeckledGranite:     { atlas: 81, r: 0, c: 0, rough: 0.68, metal: 0.08, nStr: 2.7, fallback: 0x7e6e68 },
  wetBlackObsidianRock:    { atlas: 81, r: 0, c: 1, rough: 0.22, metal: 0.20, nStr: 2.8, fallback: 0x3a3c3c },
  crimsonIronOxideCrust:   { atlas: 81, r: 0, c: 2, rough: 0.56, metal: 0.24, nStr: 2.8, fallback: 0x7e3418 },
  bandedSedimentaryStrata: { atlas: 81, r: 1, c: 0, rough: 0.84, metal: 0.06, nStr: 2.7, fallback: 0x78563c },
  crackedBasaltBedrock:    { atlas: 81, r: 1, c: 1, rough: 0.86, metal: 0.06, nStr: 2.7, fallback: 0x726452 },
  amberQuartzOreVein:      { atlas: 81, r: 1, c: 2, rough: 0.62, metal: 0.16, nStr: 2.8, fallback: 0x945222 },
  crystallineYellowSulfur: { atlas: 81, r: 2, c: 0, rough: 0.78, metal: 0.04, nStr: 2.8, fallback: 0xd6c656 },
  steamingTurquoiseSpring: { atlas: 81, r: 2, c: 1, rough: 0.12, metal: 0.10, nStr: 1.9, fallback: 0x5c8c8a },
  fracturedGlassyObsidian: { atlas: 81, r: 2, c: 2, rough: 0.14, metal: 0.24, nStr: 2.7, fallback: 0x383430 },

  // === ATLAS 82: Ornate Cathedral, Marble & Gold Brocade ===
  carvedGoldenAltar:       { atlas: 82, r: 0, c: 0, rough: 0.52, metal: 0.42, nStr: 2.6, fallback: 0x9a825c },
  crimsonGoldVelvetBanner: { atlas: 82, r: 0, c: 1, rough: 0.78, metal: 0.28, nStr: 2.4, fallback: 0x7e281e },
  blackGoldVeinedMarble:   { atlas: 82, r: 0, c: 2, rough: 0.16, metal: 0.18, nStr: 1.4, fallback: 0x302e2c },
  creamAlabasterTile:      { atlas: 82, r: 1, c: 0, rough: 0.22, metal: 0.06, nStr: 1.3, fallback: 0xcbc0ac },
  amberGothicAlabasterWin: { atlas: 82, r: 1, c: 1, rough: 0.24, metal: 0.18, nStr: 2.4, fallback: 0xc29848 },
  carvedMarblePulpitRelief:{ atlas: 82, r: 1, c: 2, rough: 0.58, metal: 0.12, nStr: 2.6, fallback: 0xa89c86 },
  redMarbleGoldColumns:    { atlas: 82, r: 2, c: 0, rough: 0.22, metal: 0.34, nStr: 2.1, fallback: 0x8c4434 },
  gildedGothicOakPanels:   { atlas: 82, r: 2, c: 1, rough: 0.44, metal: 0.22, nStr: 2.4, fallback: 0x6c4c28 },
  celestialStarVaultMural: { atlas: 82, r: 2, c: 2, rough: 0.52, metal: 0.30, nStr: 1.8, fallback: 0x566480 },

  // === ATLAS 83: Earthen Plaster & Rammed Clay (Variant B) ===
  rammedEarthOchreWall:    { atlas: 83, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 2.4, fallback: 0xa87246 },
  choppedStrawClayWall:    { atlas: 83, r: 0, c: 1, rough: 0.94, metal: 0.00, nStr: 2.4, fallback: 0xa47a4c },
  exposedWattleLathMud:    { atlas: 83, r: 0, c: 2, rough: 0.94, metal: 0.00, nStr: 2.8, fallback: 0x987a58 },
  dryCrackedAdobePlaster:  { atlas: 83, r: 1, c: 0, rough: 0.94, metal: 0.00, nStr: 2.5, fallback: 0xb68a62 },
  hearthSootClayWall:      { atlas: 83, r: 1, c: 1, rough: 0.94, metal: 0.00, nStr: 2.3, fallback: 0x685442 },
  terracottaRedEarthWall:  { atlas: 83, r: 1, c: 2, rough: 0.92, metal: 0.00, nStr: 2.4, fallback: 0xa64e2c },
  peelingWhitewashAdobe:   { atlas: 83, r: 2, c: 0, rough: 0.92, metal: 0.00, nStr: 2.5, fallback: 0xcac0ae },
  stampedHandprintAdobe:   { atlas: 83, r: 2, c: 1, rough: 0.92, metal: 0.00, nStr: 2.2, fallback: 0xac8660 },
  erodedDampClayBank:      { atlas: 83, r: 2, c: 2, rough: 0.86, metal: 0.02, nStr: 2.7, fallback: 0x7e6244 },

  // === ATLAS 84: Town Street Furniture, Lockers & Awnings ===
  sakuraRiverStreetMural:  { atlas: 84, r: 0, c: 0, rough: 0.72, metal: 0.02, nStr: 1.7, fallback: 0x78a4c2 },
  communityPinnedCorkboard:{ atlas: 84, r: 0, c: 1, rough: 0.86, metal: 0.02, nStr: 2.0, fallback: 0xb28e6c },
  floralCafeBlueEntryDoor: { atlas: 84, r: 0, c: 2, rough: 0.56, metal: 0.12, nStr: 2.2, fallback: 0x6c7c7e },
  pastelIceCreamVending:   { atlas: 84, r: 1, c: 0, rough: 0.30, metal: 0.28, nStr: 1.7, fallback: 0xd8c6cc },
  greenStreetNewsstand:    { atlas: 84, r: 1, c: 1, rough: 0.56, metal: 0.38, nStr: 2.2, fallback: 0x5c8478 },
  meshUmbrellaStandRack:   { atlas: 84, r: 1, c: 2, rough: 0.42, metal: 0.54, nStr: 2.0, fallback: 0x867e7c },
  smartParcelPickupLocker: { atlas: 84, r: 2, c: 0, rough: 0.36, metal: 0.52, nStr: 1.8, fallback: 0xb4b8be },
  pottedJapanesePineBonsai:{ atlas: 84, r: 2, c: 1, rough: 0.74, metal: 0.02, nStr: 2.3, fallback: 0x6e8250 },
  blueWhiteStripeAwning:   { atlas: 84, r: 2, c: 2, rough: 0.84, metal: 0.00, nStr: 1.9, fallback: 0x628ec8 },

  // === ATLAS 85: Historic Brickwork & Herringbone Pavers ===
  sunbakedAdobeBricks:     { atlas: 85, r: 0, c: 0, rough: 0.92, metal: 0.00, nStr: 2.6, fallback: 0xa67852 },
  crumblingMudBrickWall:   { atlas: 85, r: 0, c: 1, rough: 0.94, metal: 0.00, nStr: 2.9, fallback: 0xa27c56 },
  classicRedClayBrickWall: { atlas: 85, r: 0, c: 2, rough: 0.84, metal: 0.02, nStr: 2.5, fallback: 0x9c4c34 },
  fireCharredBlackBricks:  { atlas: 85, r: 1, c: 0, rough: 0.90, metal: 0.04, nStr: 2.6, fallback: 0x463c36 },
  patchworkOldRedBricks:   { atlas: 85, r: 1, c: 1, rough: 0.86, metal: 0.02, nStr: 2.6, fallback: 0x8c5c44 },
  industrialSootBrickWall: { atlas: 85, r: 1, c: 2, rough: 0.88, metal: 0.04, nStr: 2.5, fallback: 0x4e423c },
  peelingPlasterRedBrick:  { atlas: 85, r: 2, c: 0, rough: 0.88, metal: 0.00, nStr: 2.6, fallback: 0xa48870 },
  mossCoveredDarkBrick:    { atlas: 85, r: 2, c: 1, rough: 0.88, metal: 0.00, nStr: 2.7, fallback: 0x5c523c },
  herringboneRedBrickPaver:{ atlas: 85, r: 2, c: 2, rough: 0.80, metal: 0.02, nStr: 2.5, fallback: 0x945c44 },

  // === ATLAS 86: Weathered Timber, Wicker & Bark Shingles ===
  silveredDriftwoodPlanks: { atlas: 86, r: 0, c: 0, rough: 0.88, metal: 0.00, nStr: 2.7, fallback: 0x766858 },
  shouSugiBanCharredWood:  { atlas: 86, r: 0, c: 1, rough: 0.88, metal: 0.02, nStr: 2.7, fallback: 0x2c2826 },
  rottedHollowDeckBoards:  { atlas: 86, r: 0, c: 2, rough: 0.88, metal: 0.00, nStr: 2.8, fallback: 0x62503e },
  gnarledRootGrainWood:    { atlas: 86, r: 1, c: 0, rough: 0.86, metal: 0.00, nStr: 2.8, fallback: 0x82644a },
  deepSplitOldOakTrunk:    { atlas: 86, r: 1, c: 1, rough: 0.88, metal: 0.00, nStr: 2.9, fallback: 0x785c42 },
  patchedRustHingeShutter: { atlas: 86, r: 1, c: 2, rough: 0.82, metal: 0.14, nStr: 2.6, fallback: 0x745c46 },
  termiteBoredOldTimber:   { atlas: 86, r: 2, c: 0, rough: 0.90, metal: 0.00, nStr: 2.9, fallback: 0x7e644c },
  wovenWillowWattleFence:  { atlas: 86, r: 2, c: 1, rough: 0.88, metal: 0.00, nStr: 2.8, fallback: 0x9c7c52 },
  overlappingBarkShingles: { atlas: 86, r: 2, c: 2, rough: 0.88, metal: 0.00, nStr: 2.8, fallback: 0x7c624e },

  // === ATLAS 87: Polished Luxury Stone, Inlay & Carvings ===
  glossyBlackMarbleBricks: { atlas: 87, r: 0, c: 0, rough: 0.14, metal: 0.14, nStr: 1.5, fallback: 0x282c30 },
  goldenSandstoneAshlar:   { atlas: 87, r: 0, c: 1, rough: 0.68, metal: 0.02, nStr: 2.1, fallback: 0xc29254 },
  polishedGreenSerpentine: { atlas: 87, r: 0, c: 2, rough: 0.20, metal: 0.10, nStr: 1.8, fallback: 0x4e6c54 },
  romanStarMarbleMosaic:   { atlas: 87, r: 1, c: 0, rough: 0.22, metal: 0.08, nStr: 1.6, fallback: 0x7e6858 },
  carvedGeometricRelief:   { atlas: 87, r: 1, c: 1, rough: 0.72, metal: 0.04, nStr: 2.7, fallback: 0x7c746a },
  ancientGlyphStoneTablet: { atlas: 87, r: 1, c: 2, rough: 0.78, metal: 0.02, nStr: 2.5, fallback: 0x927c66 },
  polishedBrownMarbleCol:  { atlas: 87, r: 2, c: 0, rough: 0.16, metal: 0.12, nStr: 1.5, fallback: 0x7e746a },
  wornBasaltCobbleFloor:   { atlas: 87, r: 2, c: 1, rough: 0.54, metal: 0.06, nStr: 2.5, fallback: 0x665e54 },
  crackedBlueSlateMarble:  { atlas: 87, r: 2, c: 2, rough: 0.28, metal: 0.10, nStr: 2.2, fallback: 0x525c62 },

  // === ATLAS 88: Natural Fieldstone & Drystone Masonry ===
  fittedGraniteFieldstone: { atlas: 88, r: 0, c: 0, rough: 0.88, metal: 0.02, nStr: 2.8, fallback: 0x78726a },
  mudMortarFieldstone:     { atlas: 88, r: 0, c: 1, rough: 0.90, metal: 0.00, nStr: 2.8, fallback: 0x866e54 },
  stackedThinSlateWall:    { atlas: 88, r: 0, c: 2, rough: 0.86, metal: 0.04, nStr: 2.9, fallback: 0x766e64 },
  cyclopeanGraniteBlocks:  { atlas: 88, r: 1, c: 0, rough: 0.88, metal: 0.02, nStr: 2.8, fallback: 0x82786c },
  roundedRiverCobbleWall:  { atlas: 88, r: 1, c: 1, rough: 0.82, metal: 0.02, nStr: 2.8, fallback: 0x7e766c },
  mossyCastleStoneWall:    { atlas: 88, r: 1, c: 2, rough: 0.88, metal: 0.00, nStr: 2.8, fallback: 0x6c7252 },
  crumblingDrystoneRuin:   { atlas: 88, r: 2, c: 0, rough: 0.90, metal: 0.02, nStr: 2.9, fallback: 0x847664 },
  whiteMortarCountryStone: { atlas: 88, r: 2, c: 1, rough: 0.86, metal: 0.02, nStr: 2.7, fallback: 0x8a8478 },
  sootDarkenedRuinBlocks:  { atlas: 88, r: 2, c: 2, rough: 0.88, metal: 0.04, nStr: 2.7, fallback: 0x5c5044 },
};

const _atlasImageCache = new Map();
const _atlasPromiseCache = new Map();

function loadAtlasImage(atlasId) {
  if (_atlasImageCache.has(atlasId)) return Promise.resolve(_atlasImageCache.get(atlasId));
  if (_atlasPromiseCache.has(atlasId)) return _atlasPromiseCache.get(atlasId);

  const pad = String(atlasId).padStart(2, '0');
  const url = `./textures/pbr/atlas_${pad}.jpg`;

  const p = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      _atlasImageCache.set(atlasId, img);
      resolve(img);
    };
    img.onerror = () => {
      console.warn(`[PBR Atlas] Could not load ${url}, using fallback color.`);
      resolve(null);
    };
    img.src = url;
  });
  _atlasPromiseCache.set(atlasId, p);
  return p;
}

/**
 * Generates a real tangent-space Sobel normal map directly from a sliced photographic tile canvas!
 */
function buildSobelNormalFromCanvas(srcCanvas, strength = 1.8) {
  const w = srcCanvas.width;
  const h = srcCanvas.height;
  const sCtx = srcCanvas.getContext('2d');
  const src = sCtx.getImageData(0, 0, w, h).data;

  const nCanvas = document.createElement('canvas');
  nCanvas.width = w;
  nCanvas.height = h;
  const nCtx = nCanvas.getContext('2d');
  const out = nCtx.createImageData(w, h);
  const dst = out.data;

  const luma = (x, y) => {
    const cx = ((x % w) + w) % w;
    const cy = ((y % h) + h) % h;
    const i = (cy * w + cx) * 4;
    return (src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114) / 255.0;
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const tl = luma(x - 1, y - 1), t = luma(x, y - 1), tr = luma(x + 1, y - 1);
      const l = luma(x - 1, y), r = luma(x + 1, y);
      const bl = luma(x - 1, y + 1), b = luma(x, y + 1), br = luma(x + 1, y + 1);
      const dx = (tr + 2 * r + br - tl - 2 * l - bl) * strength;
      const dy = (bl + 2 * b + br - tl - 2 * t - tr) * strength;
      const nz = 1.0;
      const invLen = 1.0 / Math.sqrt(dx * dx + dy * dy + nz * nz);
      const idx = (y * w + x) * 4;
      dst[idx] = Math.round((-dx * invLen * 0.5 + 0.5) * 255);
      dst[idx + 1] = Math.round((-dy * invLen * 0.5 + 0.5) * 255);
      dst[idx + 2] = Math.round((nz * invLen * 0.5 + 0.5) * 255);
      dst[idx + 3] = 255;
    }
  }
  nCtx.putImageData(out, 0, 0);
  const tex = new THREE.CanvasTexture(nCanvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Slices a single (r, c) photographic tile cleanly (with 5px bleed margin trim!)
 * into a seamless repeat-wrappable CanvasTexture + Sobel NormalMap.
 */
function sliceTileTextures(img, r, c, normalStrength) {
  const cellW = img.width / 3;
  const cellH = img.height / 3;
  const margin = 5;
  const outSize = 320;

  const tileCanvas = document.createElement('canvas');
  tileCanvas.width = outSize;
  tileCanvas.height = outSize;
  const ctx = tileCanvas.getContext('2d');
  ctx.drawImage(
    img,
    c * cellW + margin,
    r * cellH + margin,
    cellW - margin * 2,
    cellH - margin * 2,
    0,
    0,
    outSize,
    outSize
  );

  const map = new THREE.CanvasTexture(tileCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 8;

  const normalMap = buildSobelNormalFromCanvas(tileCanvas, normalStrength);
  return { map, normalMap };
}

/**
 * Creates a Photographic PBR Material Bank backed by ALL 88 uploaded 3x3 Atlases (792 Tiles).
 */
export function createPbrAtlasBank(preloadAtlasIds = [1, 2, 3, 4, 5, 6, 7, 9, 11, 14, 15]) {
  const matCache = new Map();
  const tileTexCache = new Map();
  const pendingBinders = [];

  function bindTileToMaterial(mat, key, spec, repeatX, repeatY) {
    const img = _atlasImageCache.get(spec.atlas);
    if (!img) return false;

    const baseKey = `${spec.atlas}_${spec.r}_${spec.c}`;
    let pair = tileTexCache.get(baseKey);
    if (!pair) {
      pair = sliceTileTextures(img, spec.r, spec.c, spec.nStr);
      tileTexCache.set(baseKey, pair);
    }

    const map = repeatX === 1 && repeatY === 1 ? pair.map : pair.map.clone();
    const normalMap = repeatX === 1 && repeatY === 1 ? pair.normalMap : pair.normalMap.clone();
    if (repeatX !== 1 || repeatY !== 1) {
      map.repeat.set(repeatX, repeatY);
      map.needsUpdate = true;
      normalMap.repeat.set(repeatX, repeatY);
      normalMap.needsUpdate = true;
    }

    mat.color.setHex(mat.userData.tintHex ?? 0xffffff);
    mat.map = map;
    mat.normalMap = normalMap;
    mat.normalScale.set(0.85, 0.85);
    mat.needsUpdate = true;
    return true;
  }

  /**
   * Returns a photorealistic PBR MeshStandardMaterial for any of the 792 catalog tile keys!
   */
  function get(key, { repeatX = 1, repeatY = 1, tint = 0xffffff, roughness, metalness } = {}) {
    const spec = PBR_TILE_CATALOG[key] || PBR_TILE_CATALOG.archWhiteConcrete;
    const cacheId = `${key}_${repeatX}x${repeatY}_${tint.toString(16)}_${roughness ?? 'd'}_${metalness ?? 'd'}`;
    if (matCache.has(cacheId)) return matCache.get(cacheId);

    const mat = new THREE.MeshStandardMaterial({
      color: spec.fallback,
      roughness: roughness ?? spec.rough,
      metalness: metalness ?? spec.metal,
    });
    mat.userData.tintHex = tint;

    if (!bindTileToMaterial(mat, key, spec, repeatX, repeatY)) {
      pendingBinders.push({ mat, key, spec, repeatX, repeatY });
      loadAtlasImage(spec.atlas).then(() => {
        bindTileToMaterial(mat, key, spec, repeatX, repeatY);
      });
    }

    matCache.set(cacheId, mat);
    return mat;
  }

  // Kick off preload for requested atlases and resolve `ready` once all loaded & bound!
  const ready = Promise.all(preloadAtlasIds.map((id) => loadAtlasImage(id))).then(() => {
    for (const b of pendingBinders) {
      bindTileToMaterial(b.mat, b.key, b.spec, b.repeatX, b.repeatY);
    }
    pendingBinders.length = 0;
    return true;
  });

  function dispose() {
    for (const mat of matCache.values()) mat.dispose();
    for (const pair of tileTexCache.values()) {
      pair.map.dispose();
      pair.normalMap.dispose();
    }
    matCache.clear();
    tileTexCache.clear();
  }

  return {
    get,
    ready,
    tileCount: Object.keys(PBR_TILE_CATALOG).length,
    atlasCount: 88,
    dispose,
  };
}
