/* 
  🧱 Token Valuation Engine
  Real-time token value calculation based on website metrics
  Token values are NOT USD - they are separate token units
*/

window.TokenValuation = {
  // Base metrics for calculation
  metrics: {
    pageViews: 0,
    commandsExecuted: 0,
    themeSwitches: 0,
    charactersSpawned: 0,
    timeOnPage: 0,
    uniqueSessions: 0,
    filesInRepo: 11, // Initial count
    codeLines: 0,
    commits: 5 // From PR
  },

  // Valuation formula components
  baseValue: 10, // From c13b0_pricing.json
  growthMultiplier: 1.0,

  // Initialize the valuation system
  init() {
    this.loadMetrics();
    this.startTracking();
    console.log('🧱 Token Valuation Engine initialized');
  },

  // Load existing metrics from localStorage
  loadMetrics() {
    try {
      const saved = localStorage.getItem('osprey_metrics');
      if (saved) {
        const data = JSON.parse(saved);
        this.metrics = { ...this.metrics, ...data };
      }
    } catch (e) {
      console.warn('Could not load metrics:', e);
    }

    // Load from index_value.json if available
    this.loadIndexValue();
  },

  // Load index value from JSON
  async loadIndexValue() {
    try {
      const response = await fetch('index_value.json');
      const data = await response.json();
      if (data) {
        this.indexData = data;
      }
    } catch (e) {
      console.warn('Could not load index_value.json:', e);
    }
  },

  // Save metrics to localStorage
  saveMetrics() {
    try {
      localStorage.setItem('osprey_metrics', JSON.stringify(this.metrics));
      localStorage.setItem('osprey_last_update', Date.now());
    } catch (e) {
      console.warn('Could not save metrics:', e);
    }
  },

  // Start tracking page activity
  startTracking() {
    // Track time on page
    this.startTime = Date.now();
    setInterval(() => {
      this.metrics.timeOnPage = Math.floor((Date.now() - this.startTime) / 1000);
      this.saveMetrics();
    }, 10000); // Save every 10 seconds

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.metrics.pageViews++;
        this.saveMetrics();
      }
    });

    // Initial page view
    this.metrics.pageViews++;
    
    // Track unique sessions
    const sessionKey = 'osprey_session_' + Date.now();
    if (!sessionStorage.getItem('osprey_session')) {
      this.metrics.uniqueSessions++;
      sessionStorage.setItem('osprey_session', sessionKey);
    }

    this.saveMetrics();
  },

  // Record command execution
  recordCommand(command) {
    this.metrics.commandsExecuted++;
    this.saveMetrics();
  },

  // Record theme switch
  recordThemeSwitch() {
    this.metrics.themeSwitches++;
    this.saveMetrics();
  },

  // Record character spawn
  recordCharacterSpawn() {
    this.metrics.charactersSpawned++;
    this.saveMetrics();
  },

  // Calculate current token value based on metrics
  calculateTokenValue() {
    const m = this.metrics;
    
    // Base formula: each activity type contributes to token value
    const pageViewValue = m.pageViews * 0.5;
    const commandValue = m.commandsExecuted * 2;
    const themeValue = m.themeSwitches * 5;
    const characterValue = m.charactersSpawned * 3;
    const timeValue = Math.floor(m.timeOnPage / 60) * 1; // 1 token per minute
    const sessionValue = m.uniqueSessions * 10;
    const repoValue = m.filesInRepo * 2;
    const codeValue = Math.floor(m.codeLines / 100) * 5;
    const commitValue = m.commits * 15;

    // ADDITIVE: Integrate Mongoose AI growth delta
    let mongooseDelta = 0;
    if (window.MongooseOS && MongooseOS.initialized) {
      mongooseDelta = MongooseOS.calculateGrowthDelta();
    }

    // Calculate total
    const activitySum = pageViewValue + commandValue + themeValue + 
                       characterValue + timeValue + sessionValue + 
                       repoValue + codeValue + commitValue + mongooseDelta;

    // Apply growth multiplier and base value
    const totalTokens = this.baseValue + (activitySum * this.growthMultiplier);

    return Math.floor(totalTokens);
  },

  // Calculate token breakdown
  getTokenBreakdown() {
    const m = this.metrics;
    
    // ADDITIVE: Get Mongoose delta if available
    let mongooseDelta = 0;
    if (window.MongooseOS && MongooseOS.initialized) {
      mongooseDelta = MongooseOS.calculateGrowthDelta();
    }
    
    return {
      pageViews: { tokens: m.pageViews * 0.5, label: 'Page Views' },
      commands: { tokens: m.commandsExecuted * 2, label: 'Commands Executed' },
      themes: { tokens: m.themeSwitches * 5, label: 'Theme Switches' },
      characters: { tokens: m.charactersSpawned * 3, label: 'Characters Spawned' },
      timeOnPage: { tokens: Math.floor(m.timeOnPage / 60), label: 'Minutes Active' },
      sessions: { tokens: m.uniqueSessions * 10, label: 'Unique Sessions' },
      repoSize: { tokens: m.filesInRepo * 2, label: 'Repository Files' },
      codeLines: { tokens: Math.floor(m.codeLines / 100) * 5, label: 'Code Lines (per 100)' },
      commits: { tokens: m.commits * 15, label: 'Commits' },
      mongooseAI: { tokens: mongooseDelta, label: 'Mongoose AI Growth' }
    };
  },

  // Get token value with metadata
  getTokenValueDisplay() {
    const totalTokens = this.calculateTokenValue();
    const breakdown = this.getTokenBreakdown();
    
    // Calculate growth rate
    const lastUpdate = localStorage.getItem('osprey_last_update');
    let growthRate = 0;
    if (lastUpdate) {
      const timeDiff = Date.now() - parseInt(lastUpdate);
      const minutesDiff = timeDiff / (1000 * 60);
      if (minutesDiff > 0) {
        growthRate = (this.metrics.commandsExecuted / minutesDiff).toFixed(2);
      }
    }

    return {
      total: totalTokens,
      base: this.baseValue,
      growth: this.growthMultiplier,
      breakdown: breakdown,
      metrics: this.metrics,
      growthRate: growthRate,
      lastUpdate: new Date().toISOString()
    };
  },

  // Format token value for display
  formatTokenValue() {
    const data = this.getTokenValueDisplay();
    
    let output = `🧱 Token Valuation (Real-time Metrics)\n\n`;
    output += `💎 Total Token Value: ${data.total} TKN\n`;
    output += `📊 Base Value: ${data.base} TKN\n`;
    output += `📈 Growth Multiplier: ${data.growth}x\n`;
    output += `⚡ Growth Rate: ${data.growthRate} TKN/min\n\n`;
    
    output += `📋 Token Breakdown:\n`;
    for (const [key, value] of Object.entries(data.breakdown)) {
      if (value.tokens > 0) {
        output += `  • ${value.label}: ${value.tokens.toFixed(1)} TKN\n`;
      }
    }
    
    output += `\n🔢 Activity Metrics:\n`;
    output += `  • Page Views: ${data.metrics.pageViews}\n`;
    output += `  • Commands: ${data.metrics.commandsExecuted}\n`;
    output += `  • Theme Switches: ${data.metrics.themeSwitches}\n`;
    output += `  • Characters: ${data.metrics.charactersSpawned}\n`;
    output += `  • Time Active: ${Math.floor(data.metrics.timeOnPage / 60)} minutes\n`;
    output += `  • Sessions: ${data.metrics.uniqueSessions}\n`;
    
    output += `\n📍 Repository Metrics:\n`;
    output += `  • Files: ${data.metrics.filesInRepo}\n`;
    output += `  • Commits: ${data.metrics.commits}\n`;
    output += `  • Code Lines: ${data.metrics.codeLines}\n`;
    
    output += `\n⏰ Last Update: ${new Date(data.lastUpdate).toLocaleString()}\n`;
    
    output += `\n💡 Note: Token values (TKN) are not USD. They represent\n`;
    output += `   real activity and growth metrics in the terminal.\n`;
    
    return output;
  },

  // Get USD equivalent (if configured)
  getUSDEquivalent() {
    const tokens = this.calculateTokenValue();
    // Read from index_value.json if available
    if (this.indexData && this.indexData.current_index_value) {
      const ratio = this.indexData.current_index_value / tokens;
      return {
        tokens: tokens,
        usd: this.indexData.current_index_value,
        ratio: ratio.toFixed(2)
      };
    }
    return null;
  },

  // Export metrics for external use
  exportMetrics() {
    return {
      ...this.getTokenValueDisplay(),
      usdEquivalent: this.getUSDEquivalent()
    };
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => TokenValuation.init());
} else {
  TokenValuation.init();
}
