import { createPbrAtlasBank } from './pbrAtlasMaterials.js';
import { registerPartsLibrary } from './partsLibrary.js';
import { registerToolsAndPropsLibrary } from './toolsAndPropsLibrary.js';
import { registerArchitectureAndNatureLibrary } from './architectureAndNatureLibrary.js';
import { registerLocationsLibrary } from './locationsLibrary.js';

/**
 * Unified 208+ Pre-Built Master Asset Library (`parts`, `tools`, `props`, `architecture`, `nature`, `locations`)
 * backed by the user's 15 Photographic 3x3 PBR Atlases (135 seamless tiles + Sobel normal maps).
 *
 * Any chapter (Ch.9 through Ch.16+) calls `masterLib.spawn(assetId, opts)` to summon
 * museum-grade photographic PBR objects, parts, and complete locations on demand!
 */
export function createMasterAssetLibrary(baseMats, ngMats, preloadAtlasIds = [1, 2, 3, 4, 5, 6, 7, 9, 11, 14, 15]) {
  const pbr = createPbrAtlasBank(preloadAtlasIds);
  const entries = new Map();

  const registry = {
    register(id, meta) {
      if (entries.has(id)) {
        throw new Error(`Duplicate asset ID in Master Library: ${id}`);
      }
      entries.set(id, meta);
    },
  };

  function spawn(id, opts = {}) {
    const entry = entries.get(id);
    if (!entry) {
      throw new Error(`Unknown Master Library asset ID: ${id}`);
    }
    const obj = entry.factory(opts);
    obj.userData.assetId = id;
    obj.userData.category = entry.category;
    return obj;
  }

  // Register all 4 sub-libraries (65 parts + 65 tools/props + 54 arch/nature + 24 locations = 208 assets!)
  registerPartsLibrary(registry, { baseMats, ngMats, pbr });
  registerToolsAndPropsLibrary(registry, { baseMats, ngMats, pbr });
  registerArchitectureAndNatureLibrary(registry, { baseMats, ngMats, pbr });
  registerLocationsLibrary(registry, { baseMats, ngMats, pbr, spawn });

  function getStats() {
    const byCategory = {};
    for (const meta of entries.values()) {
      byCategory[meta.category] = (byCategory[meta.category] || 0) + 1;
    }
    return {
      totalAssets: entries.size,
      pbrAtlasCount: pbr.atlasCount,
      pbrTileCount: pbr.tileCount,
      byCategory,
    };
  }

  function listAssetIds(category = null) {
    const out = [];
    for (const [id, meta] of entries.entries()) {
      if (!category || meta.category === category) out.push(id);
    }
    return out;
  }

  return {
    pbr,
    ready: pbr.ready,
    spawn,
    getStats,
    listAssetIds,
    dispose: () => pbr.dispose(),
  };
}
