/* 
  🦎 Mongoose Multi-Repo Sync Engine
  Syncs across all pewpi-infinity legend repos
  Creates production from reading and interacting with other repos
*/

window.MongooseSync = {
  version: '1.0',
  
  // Legend repos in pewpi-infinity organization
  repos: {
    'legend-core': { 
      emoji: '👑🧱🇯🇵', 
      authority: 'read-only',
      description: 'Core authority repo',
      lastSync: null,
      productionData: {}
    },
    'legend-🦾-robot-core': { 
      emoji: '🦾', 
      description: 'Robot core systems',
      lastSync: null,
      productionData: {}
    },
    'legend-🪐-memory': { 
      emoji: '🪐', 
      description: 'Memory storage',
      lastSync: null,
      productionData: {}
    },
    'legend-⭐-runtime': { 
      emoji: '⭐', 
      description: 'Runtime execution',
      lastSync: null,
      productionData: {}
    },
    'legend-🕹️-mario-exit': { 
      emoji: '🕹️', 
      description: 'Mario exit interface',
      lastSync: null,
      productionData: {}
    },
    'legend-🧱-encode': { 
      emoji: '🧱', 
      description: 'Token encoding',
      lastSync: null,
      productionData: {}
    },
    'legend-👁️-token-viewer': { 
      emoji: '👁️‍🗨️', 
      description: 'Token viewer',
      lastSync: null,
      productionData: {}
    },
    'legend-🎵-sync': { 
      emoji: '🎵', 
      description: 'Synchronization core',
      lastSync: null,
      productionData: {}
    },
    'legend-🪡-assembler': { 
      emoji: '🪡', 
      description: 'Code assembler',
      lastSync: null,
      productionData: {}
    },
    'legend-🔀-flow': { 
      emoji: '🔀', 
      description: 'Flow control',
      lastSync: null,
      productionData: {}
    },
    'legend-🔗-semantic': { 
      emoji: '🔗', 
      description: 'Semantic linking',
      lastSync: null,
      productionData: {}
    },
    'legend-🍄-auditor': { 
      emoji: '🍄', 
      description: 'Audit system',
      lastSync: null,
      productionData: {}
    },
    'legend-🎛️-modulator': { 
      emoji: '🎛️', 
      description: 'Signal modulator',
      lastSync: null,
      productionData: {}
    },
    'legend-💫-star': { 
      emoji: '💫', 
      description: 'Star system',
      lastSync: null,
      productionData: {}
    },
    'legend-✨-multistar': { 
      emoji: '✨', 
      description: 'Multi-star system',
      lastSync: null,
      productionData: {}
    },
    'legend-⛓️-chain': { 
      emoji: '⛓️', 
      description: 'Blockchain',
      lastSync: null,
      productionData: {}
    },
    'legend-spine-index': { 
      emoji: '👑🔀🎛️', 
      description: 'Spine index aggregator',
      lastSync: null,
      productionData: {}
    },
    'Osprey-Terminal': {
      emoji: '🦅',
      description: 'Current terminal',
      authority: 'local',
      lastSync: Date.now(),
      productionData: {}
    }
  },

  // GitHub API base
  githubAPI: 'https://api.github.com',
  owner: 'pewpi-infinity',

  // Sync state
  syncStatus: {
    active: false,
    lastFullSync: null,
    totalProduction: 0,
    repoCount: 0,
    errors: []
  },

  init() {
    console.log('🦎 Mongoose Multi-Repo Sync Engine initialized');
    console.log(`📦 Monitoring ${Object.keys(this.repos).length} repos`);
    
    // Load cached sync data
    this.loadSyncCache();
    
    // Start background sync
    this.startBackgroundSync();
  },

  // Load cached sync data from localStorage
  loadSyncCache() {
    try {
      const cached = localStorage.getItem('mongoose_repo_sync');
      if (cached) {
        const data = JSON.parse(cached);
        this.syncStatus = data.syncStatus || this.syncStatus;
        
        // Restore production data
        for (const [repo, repoData] of Object.entries(data.repos || {})) {
          if (this.repos[repo]) {
            this.repos[repo].lastSync = repoData.lastSync;
            this.repos[repo].productionData = repoData.productionData;
          }
        }
      }
    } catch (e) {
      console.warn('Could not load sync cache:', e);
    }
  },

  // Save sync data to localStorage
  saveSyncCache() {
    try {
      const data = {
        syncStatus: this.syncStatus,
        repos: {}
      };
      
      for (const [name, repo] of Object.entries(this.repos)) {
        data.repos[name] = {
          lastSync: repo.lastSync,
          productionData: repo.productionData
        };
      }
      
      localStorage.setItem('mongoose_repo_sync', JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save sync cache:', e);
    }
  },

  // Start background sync (every 5 minutes)
  startBackgroundSync() {
    // Initial sync after 10 seconds
    setTimeout(() => this.syncAll(), 10000);
    
    // Then sync every 5 minutes
    setInterval(() => this.syncAll(), 300000);
  },

  // Sync all repos
  async syncAll() {
    if (this.syncStatus.active) {
      console.log('🦎 Sync already in progress...');
      return;
    }

    console.log('🦎 Starting multi-repo sync...');
    this.syncStatus.active = true;
    this.syncStatus.errors = [];

    let successCount = 0;
    let totalProduction = 0;

    for (const [repoName, repoInfo] of Object.entries(this.repos)) {
      if (repoInfo.authority === 'local') continue; // Skip local repo
      if (repoInfo.authority === 'read-only') {
        // Special handling for authority repo
        await this.readAuthorityRepo(repoName);
        continue;
      }

      try {
        const production = await this.syncRepo(repoName);
        totalProduction += production;
        successCount++;
      } catch (e) {
        this.syncStatus.errors.push({ repo: repoName, error: e.message });
        console.warn(`Failed to sync ${repoName}:`, e);
      }
    }

    this.syncStatus.active = false;
    this.syncStatus.lastFullSync = Date.now();
    this.syncStatus.totalProduction = totalProduction;
    this.syncStatus.repoCount = successCount;

    this.saveSyncCache();
    
    console.log(`🦎 Sync complete: ${successCount} repos, ${totalProduction} production units`);
  },

  // Read from authority repo (legend-core)
  async readAuthorityRepo(repoName) {
    try {
      const url = `${this.githubAPI}/repos/${this.owner}/${repoName}/contents`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const files = await response.json();
      
      // Extract production data from authority repo
      this.repos[repoName].productionData = {
        fileCount: Array.isArray(files) ? files.length : 0,
        timestamp: Date.now(),
        authority: true
      };
      
      this.repos[repoName].lastSync = Date.now();
      
      console.log(`🦎 Read authority from ${repoName}`);
    } catch (e) {
      console.warn(`Could not read authority repo ${repoName}:`, e.message);
      // Use cached data if available
    }
  },

  // Sync individual repo
  async syncRepo(repoName) {
    try {
      // Fetch repo info
      const repoUrl = `${this.githubAPI}/repos/${this.owner}/${repoName}`;
      const repoResponse = await fetch(repoUrl);
      
      if (!repoResponse.ok) {
        throw new Error(`HTTP ${repoResponse.status}`);
      }

      const repoData = await repoResponse.json();
      
      // Fetch contents
      const contentsUrl = `${this.githubAPI}/repos/${this.owner}/${repoName}/contents`;
      const contentsResponse = await fetch(contentsUrl);
      
      let fileCount = 0;
      if (contentsResponse.ok) {
        const contents = await contentsResponse.json();
        fileCount = Array.isArray(contents) ? contents.length : 0;
      }

      // Calculate production value
      const production = this.calculateProduction(repoData, fileCount);

      // Store production data
      this.repos[repoName].productionData = {
        size: repoData.size || 0,
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        fileCount: fileCount,
        production: production,
        timestamp: Date.now()
      };
      
      this.repos[repoName].lastSync = Date.now();

      return production;
    } catch (e) {
      throw new Error(`Sync failed: ${e.message}`);
    }
  },

  // Calculate production value from repo data
  calculateProduction(repoData, fileCount) {
    let production = 0;
    
    // Size contribution (1 production per KB)
    production += (repoData.size || 0) / 10;
    
    // Star contribution (10 production per star)
    production += (repoData.stargazers_count || 0) * 10;
    
    // Fork contribution (20 production per fork)
    production += (repoData.forks_count || 0) * 20;
    
    // File contribution (5 production per file)
    production += fileCount * 5;
    
    return Math.floor(production);
  },

  // Get aggregated production across all repos
  getAggregatedProduction() {
    let total = 0;
    const breakdown = {};

    for (const [name, repo] of Object.entries(this.repos)) {
      const production = repo.productionData.production || 0;
      total += production;
      breakdown[name] = {
        emoji: repo.emoji,
        production: production,
        lastSync: repo.lastSync
      };
    }

    return { total, breakdown };
  },

  // Get sync status report
  getStatusReport() {
    const synced = Object.values(this.repos).filter(r => r.lastSync).length;
    const total = Object.keys(this.repos).length;
    const production = this.getAggregatedProduction();

    return {
      synced: synced,
      total: total,
      syncPercentage: (synced / total * 100).toFixed(1),
      lastFullSync: this.syncStatus.lastFullSync,
      totalProduction: production.total,
      productionBreakdown: production.breakdown,
      active: this.syncStatus.active,
      errors: this.syncStatus.errors
    };
  },

  // Format status report for display
  formatStatusReport() {
    const status = this.getStatusReport();
    
    let output = `🦎 Mongoose Multi-Repo Sync Status\n\n`;
    output += `📊 Overview:\n`;
    output += `  • Repos Synced: ${status.synced}/${status.total} (${status.syncPercentage}%)\n`;
    output += `  • Total Production: ${status.totalProduction} units\n`;
    output += `  • Sync Active: ${status.active ? 'YES' : 'NO'}\n`;
    
    if (status.lastFullSync) {
      const lastSync = new Date(status.lastFullSync);
      output += `  • Last Full Sync: ${lastSync.toLocaleString()}\n`;
    }
    
    output += `\n📦 Repository Production:\n\n`;
    
    // Sort by production
    const sorted = Object.entries(status.productionBreakdown)
      .sort(([,a], [,b]) => b.production - a.production);
    
    for (const [name, data] of sorted) {
      const syncStatus = data.lastSync ? '✅' : '⏳';
      const shortName = name.length > 25 ? name.substring(0, 22) + '...' : name;
      output += `${syncStatus} ${data.emoji} ${shortName.padEnd(25)} ${String(data.production).padStart(6)} units\n`;
    }

    if (status.errors.length > 0) {
      output += `\n⚠️ Errors (${status.errors.length}):\n`;
      for (const error of status.errors.slice(0, 3)) {
        output += `  • ${error.repo}: ${error.error}\n`;
      }
    }

    output += `\n💡 Mongoose reads and aggregates production from all legend repos.`;

    return output;
  },

  // Contribute to token valuation
  contributeToTokenValue() {
    const production = this.getAggregatedProduction();
    // Convert production to token contribution (1 production = 0.1 tokens)
    return Math.floor(production.total * 0.1);
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MongooseSync.init());
} else {
  MongooseSync.init();
}
