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
 * Creates a Photographic PBR Material Bank backed by the 15 uploaded 3x3 Atlases (135 Tiles).
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
   * Returns a photorealistic PBR MeshStandardMaterial for any of the 135 catalog tile keys!
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
    atlasCount: 15,
    dispose,
  };
}
