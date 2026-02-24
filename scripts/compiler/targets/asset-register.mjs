/**
 * Compilation Target: Asset Register
 *
 * Generates facilities management artifacts:
 * - Asset inventory (CMMS-ready)
 * - Maintenance schedules
 * - Equipment lifecycle data
 * - Spare parts inventory
 */

/**
 * Derive asset status from available entity data
 */
function deriveAssetStatus(asset) {
  if (asset.lifecycleState) return asset.lifecycleState;
  if (asset.installationData?.commissioningDate) return 'operational';
  if (asset.installationData?.installationDate) return 'installed';
  return 'planned';
}

/**
 * Estimate maintenance duration from system category
 */
function estimateMaintenanceDuration(systemCategory) {
  const durations = {
    'hvac': '3-4 hours',
    'electrical': '1-2 hours',
    'plumbing': '1-2 hours',
    'fire_safety': '2-3 hours',
    'elevator': '4-6 hours',
    'security': '1-2 hours',
    'medical_gas': '2-3 hours',
    'nurse_call': '1-2 hours',
    'it_network': '1-2 hours'
  };
  return durations[systemCategory] || 'TBD';
}

/**
 * Generate asset inventory
 */
function generateAssetInventory(assets, systems, spaces, logger) {
  const inventory = [];

  for (const asset of assets) {
    // Find parent system
    const parentSystem = systems.find(s => s.id === asset.systemId);

    // Find location space
    const locationSpace = spaces.find(s => s.id === asset.locatedInSpaceId);

    const inventoryItem = {
      assetId: asset.id,
      assetName: asset.assetName || asset.identifiers?.assetTag || asset.id,
      assetType: asset.assetTypeId || 'Unknown',

      // System context
      systemId: asset.systemId,
      systemName: parentSystem?.systemName || 'Unknown System',
      systemCategory: parentSystem?.systemCategory || 'Unknown',

      // Location
      locationSpaceId: asset.locatedInSpaceId,
      locationSpaceName: locationSpace?.spaceName || 'Unknown Location',
      locationLevel: locationSpace?.levelId || 'Unknown',

      // Identification
      identifiers: {
        tag: asset.identifiers?.tag || asset.id,
        serial: asset.identifiers?.serial || '',
        barcode: asset.identifiers?.barcode || '',
        qrCode: `SBM-QR-${asset.id}` // Generate QR code identifier
      },

      // Equipment details
      manufacturer: asset.manufacturer || 'TBD',
      model: asset.model || 'TBD',
      productCode: asset.productCode || '',

      // Maintenance data
      maintenance: {
        serviceIntervalMonths: asset.maintenanceData?.serviceIntervalMonths || 12,
        nextServiceDate: calculateNextServiceDate(
          asset.maintenanceData?.serviceIntervalMonths || 12,
          asset.installationData?.installationDate
        ),
        expectedLifetimeYears: asset.maintenanceData?.expectedLifetimeYears || 15,
        endOfLifeDate: calculateEndOfLifeDate(
          asset.maintenanceData?.expectedLifetimeYears || 15,
          asset.installationData?.installationDate
        ),
        warrantyYears: asset.maintenanceData?.warrantyYears || 2,
        warrantyExpiryDate: calculateWarrantyExpiry(
          asset.maintenanceData?.warrantyYears || 2,
          asset.installationData?.installationDate
        ),
        sparePartsRequired: asset.maintenanceData?.sparePartsRequired || []
      },

      // Status
      status: deriveAssetStatus(asset),
      installationDate: asset.installationData?.installationDate || null,
      commissioningDate: asset.installationData?.commissioningDate || null,

      // Requirements
      requirements: asset.requirements || [],

      // BIM reference
      ifcGlobalId: asset.ifcMapping?.globalId || '',
      ifcEntity: asset.ifcMapping?.ifcEntity || '',

      // Metadata
      version: asset.version,
      tags: asset.tags || []
    };

    inventory.push(inventoryItem);
  }

  logger.debug(`Generated inventory for ${inventory.length} assets`);
  return inventory;
}

/**
 * Calculate next service date from a base date
 */
function calculateNextServiceDate(intervalMonths, baseDate) {
  const base = baseDate ? new Date(baseDate) : new Date();
  const nextService = new Date(base);
  nextService.setMonth(nextService.getMonth() + intervalMonths);
  // If calculated date is in the past, advance to next interval from now
  const now = new Date();
  while (nextService < now) {
    nextService.setMonth(nextService.getMonth() + intervalMonths);
  }
  return nextService.toISOString().split('T')[0];
}

/**
 * Calculate end of life date from a base date
 */
function calculateEndOfLifeDate(lifetimeYears, baseDate) {
  const base = baseDate ? new Date(baseDate) : new Date();
  const endOfLife = new Date(base);
  endOfLife.setFullYear(endOfLife.getFullYear() + lifetimeYears);
  return endOfLife.toISOString().split('T')[0];
}

/**
 * Calculate warranty expiry date from a base date
 */
function calculateWarrantyExpiry(warrantyYears, baseDate) {
  const base = baseDate ? new Date(baseDate) : new Date();
  const expiry = new Date(base);
  expiry.setFullYear(expiry.getFullYear() + warrantyYears);
  return expiry.toISOString().split('T')[0];
}

/**
 * Generate maintenance calendar
 */
function generateMaintenanceCalendar(inventory, logger) {
  const calendar = [];
  const now = new Date();
  const monthsAhead = 24; // 2-year calendar

  for (let month = 0; month < monthsAhead; month++) {
    const targetDate = new Date(now);
    targetDate.setMonth(targetDate.getMonth() + month);
    const monthKey = targetDate.toISOString().slice(0, 7); // YYYY-MM

    const assetsForMaintenance = inventory.filter(asset => {
      const nextServiceDate = new Date(asset.maintenance.nextServiceDate);
      const serviceMonth = nextServiceDate.toISOString().slice(0, 7);
      return serviceMonth === monthKey;
    });

    if (assetsForMaintenance.length > 0) {
      calendar.push({
        month: monthKey,
        monthName: targetDate.toLocaleString('en', { year: 'numeric', month: 'long' }),
        maintenanceCount: assetsForMaintenance.length,
        assets: assetsForMaintenance.map(a => ({
          assetId: a.assetId,
          assetName: a.assetName,
          systemName: a.systemName,
          locationSpaceName: a.locationSpaceName,
          serviceType: 'routine_maintenance',
          estimatedDuration: estimateMaintenanceDuration(a.systemCategory),
          priority: 'normal'
        }))
      });
    }
  }

  logger.debug(`Generated maintenance calendar with ${calendar.length} months having scheduled maintenance`);
  return calendar;
}

/**
 * Generate spare parts inventory
 */
function generateSparePartsInventory(inventory, logger) {
  const sparePartsMap = new Map();

  for (const asset of inventory) {
    if (asset.maintenance.sparePartsRequired && asset.maintenance.sparePartsRequired.length > 0) {
      for (const part of asset.maintenance.sparePartsRequired) {
        if (!sparePartsMap.has(part)) {
          sparePartsMap.set(part, {
            partName: part,
            requiredBy: [],
            recommendedStockQuantity: 1
          });
        }

        const partEntry = sparePartsMap.get(part);
        partEntry.requiredBy.push({
          assetId: asset.assetId,
          assetName: asset.assetName
        });
        partEntry.recommendedStockQuantity = Math.max(
          partEntry.recommendedStockQuantity,
          Math.ceil(partEntry.requiredBy.length * 0.5) // 50% of asset count
        );
      }
    }
  }

  const sparePartsInventory = Array.from(sparePartsMap.values()).map(part => ({
    partName: part.partName,
    requiredByAssetCount: part.requiredBy.length,
    requiredByAssets: part.requiredBy,
    recommendedStockQuantity: part.recommendedStockQuantity,
    currentStockQuantity: 0, // To be filled by FM team
    reorderLevel: Math.ceil(part.recommendedStockQuantity * 0.3),
    status: 'to_be_ordered'
  }));

  logger.debug(`Generated spare parts inventory: ${sparePartsInventory.length} unique parts`);
  return sparePartsInventory;
}

/**
 * Generate CMMS export format
 */
function generateCMMSExport(inventory, logger) {
  // CSV-compatible format for CMMS import
  const cmmsRecords = inventory.map(asset => ({
    // Standard CMMS fields
    AssetID: asset.assetId,
    AssetName: asset.assetName,
    AssetType: asset.assetType,
    Category: asset.systemCategory,
    Location: asset.locationSpaceName,
    Level: asset.locationLevel,

    // Identification
    TagNumber: asset.identifiers.tag,
    SerialNumber: asset.identifiers.serial,
    Barcode: asset.identifiers.barcode,
    QRCode: asset.identifiers.qrCode,

    // Equipment details
    Manufacturer: asset.manufacturer,
    Model: asset.model,
    ProductCode: asset.productCode,

    // Maintenance
    ServiceIntervalMonths: asset.maintenance.serviceIntervalMonths,
    NextServiceDate: asset.maintenance.nextServiceDate,
    ExpectedLifetimeYears: asset.maintenance.expectedLifetimeYears,
    EndOfLifeDate: asset.maintenance.endOfLifeDate,
    WarrantyYears: asset.maintenance.warrantyYears,
    WarrantyExpiryDate: asset.maintenance.warrantyExpiryDate,

    // Status
    Status: asset.status,
    InstallationDate: asset.installationDate || '',
    CommissioningDate: asset.commissioningDate || '',

    // References
    SystemID: asset.systemId,
    IFC_GlobalID: asset.ifcGlobalId
  }));

  logger.debug(`Generated CMMS export with ${cmmsRecords.length} records`);
  return cmmsRecords;
}

/**
 * Generate system summaries
 */
function generateSystemSummaries(systems, inventory, logger) {
  const summaries = [];

  for (const system of systems) {
    const systemAssets = inventory.filter(a => a.systemId === system.id);

    const summary = {
      systemId: system.id,
      systemName: system.systemName,
      systemType: system.systemType,
      systemCategory: system.systemCategory,

      assetCount: systemAssets.length,
      assetList: systemAssets.map(a => ({
        id: a.assetId,
        name: a.assetName,
        location: a.locationSpaceName
      })),

      maintenanceOverview: {
        totalAnnualMaintenanceEvents: systemAssets.reduce((sum, a) =>
          sum + (12 / a.maintenance.serviceIntervalMonths), 0
        ),
        averageServiceInterval: systemAssets.length > 0
          ? (systemAssets.reduce((sum, a) => sum + a.maintenance.serviceIntervalMonths, 0) / systemAssets.length).toFixed(1)
          : 0,
        nextServiceDate: systemAssets.length > 0
          ? systemAssets.reduce((earliest, a) =>
            a.maintenance.nextServiceDate < earliest ? a.maintenance.nextServiceDate : earliest,
            systemAssets[0].maintenance.nextServiceDate
          )
          : null
      },

      lifecycleOverview: {
        averageExpectedLifetime: systemAssets.length > 0
          ? (systemAssets.reduce((sum, a) => sum + a.maintenance.expectedLifetimeYears, 0) / systemAssets.length).toFixed(1)
          : 0,
        earliestEndOfLife: systemAssets.length > 0
          ? systemAssets.reduce((earliest, a) =>
            a.maintenance.endOfLifeDate < earliest ? a.maintenance.endOfLifeDate : earliest,
            systemAssets[0].maintenance.endOfLifeDate
          )
          : null
      },

      requirements: system.requirements || []
    };

    summaries.push(summary);
  }

  logger.debug(`Generated summaries for ${summaries.length} systems`);
  return summaries;
}

/**
 * Main asset register generator
 *
 * @param {object} sbm - Semantic Building Model
 * @param {object} logger - Logger instance
 * @returns {object} - Asset register
 */
export function generateAssetRegister(sbm, logger) {
  logger.debug('Generating asset register...');

  const assets = sbm.entities.asset_instances || [];
  const systems = sbm.entities.systems || [];
  const spaces = sbm.entities.spaces || [];

  if (assets.length === 0) {
    logger.debug('No assets found - generating placeholder asset register');
    return {
      version: "0.1",
      generatedAt: new Date().toISOString(),
      projectId: sbm.project.id,
      projectName: sbm.project.name,
      status: 'no_assets',
      message: 'No asset instances found in semantic model. Asset register will be populated when equipment is specified.',
      placeholderData: true
    };
  }

  const inventory = generateAssetInventory(assets, systems, spaces, logger);
  const maintenanceCalendar = generateMaintenanceCalendar(inventory, logger);
  const sparePartsInventory = generateSparePartsInventory(inventory, logger);
  const cmmsExport = generateCMMSExport(inventory, logger);
  const systemSummaries = generateSystemSummaries(systems, inventory, logger);

  const assetRegister = {
    version: "0.1",
    generatedAt: new Date().toISOString(),
    projectId: sbm.project.id,
    projectName: sbm.project.name,

    summary: {
      totalAssets: inventory.length,
      assetsBySystem: systems.map(s => ({
        systemId: s.id,
        systemName: s.systemName,
        assetCount: inventory.filter(a => a.systemId === s.id).length
      })),
      assetsByStatus: {
        planned: inventory.filter(a => a.status === 'planned').length,
        installed: inventory.filter(a => a.status === 'installed').length,
        operational: inventory.filter(a => a.status === 'operational').length,
        maintenance: inventory.filter(a => a.status === 'maintenance').length,
        decommissioned: inventory.filter(a => a.status === 'decommissioned').length
      }
    },

    inventory,
    systemSummaries,
    maintenanceCalendar,
    sparePartsInventory,

    cmmsExport: {
      format: 'csv',
      records: cmmsExport,
      instructions: [
        "1. Export cmmsExport.records to CSV format",
        "2. Import CSV into CMMS system (e.g., Maximo, SAP PM, Maintenance Connection)",
        "3. Map CSV columns to CMMS fields as needed",
        "4. Verify asset hierarchy and location assignments",
        "5. Configure maintenance work orders based on service intervals"
      ]
    },

    recommendations: [
      {
        priority: 'high',
        category: 'data-completion',
        message: 'Asset identifiers (serial numbers, barcodes) should be added during installation',
        action: 'Create data collection template for commissioning team'
      },
      {
        priority: 'medium',
        category: 'maintenance-planning',
        message: `${maintenanceCalendar.length} months have scheduled maintenance`,
        action: 'Review maintenance calendar and allocate FM resources'
      },
      {
        priority: 'medium',
        category: 'spare-parts',
        message: `${sparePartsInventory.length} spare parts identified`,
        action: 'Order critical spare parts before commissioning'
      }
    ]
  };

  logger.debug('✓ Asset register complete');
  return assetRegister;
}
