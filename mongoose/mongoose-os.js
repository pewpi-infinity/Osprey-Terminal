/* 
  🦎 Mongoose.OS Firmware - AI Logic Reasoning Engine
  Integrates with Osprey Terminal for intelligent decision making
  Kris Watson × Mongoose Growth Architecture
*/

window.MongooseOS = {
  version: '1.0',
  mode: 'passive', // passive | active | learning
  operator: 'Kris Watson',
  initialized: false,

  // AI reasoning state
  reasoning: {
    context: [],
    decisions: [],
    patterns: {},
    learningRate: 0.1
  },

  // Metrics for reasoning
  metrics: {
    commandSuccess: 0,
    commandFailure: 0,
    userPatterns: {},
    timeOfDay: {},
    themePreferences: {},
    characterInteractions: {}
  },

  init() {
    if (this.initialized) return;
    
    // Load mongoose configuration
    this.loadConfig();
    
    // Initialize reasoning engine
    this.initReasoningEngine();
    
    // Hook into terminal events
    this.hookTerminalEvents();
    
    // Start passive monitoring
    this.startMonitoring();
    
    this.initialized = true;
    console.log('🦎 Mongoose.OS Firmware initialized - AI Logic Reasoning active');
  },

  // Load configuration from mongoose.json
  async loadConfig() {
    try {
      const response = await fetch('mongoose/mongoose.json');
      const config = await response.json();
      if (config) {
        this.operator = config.operator || this.operator;
        this.mode = config.mode || this.mode;
        console.log(`🦎 Mongoose config loaded: ${this.mode} mode`);
      }
    } catch (e) {
      console.warn('Could not load mongoose.json:', e);
    }
  },

  // Initialize AI reasoning engine
  initReasoningEngine() {
    // Load previous patterns from storage
    try {
      const saved = localStorage.getItem('mongoose_patterns');
      if (saved) {
        this.reasoning.patterns = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load patterns:', e);
    }
  },

  // Hook into terminal command events
  hookTerminalEvents() {
    // Store original print function
    if (window.terminalPrint) {
      const originalPrint = window.terminalPrint;
      window.terminalPrint = (text) => {
        this.analyzeOutput(text);
        return originalPrint(text);
      };
    }
  },

  // Start passive monitoring
  startMonitoring() {
    // Monitor every 30 seconds
    setInterval(() => {
      this.analyzeContext();
      this.updatePatterns();
      this.saveState();
    }, 30000);
  },

  // AI Logic: Analyze command context
  analyzeCommand(command, args) {
    const context = {
      command: command,
      args: args,
      timestamp: Date.now(),
      hour: new Date().getHours(),
      theme: window.TerminalEngine ? window.TerminalEngine.currentTheme : 'unknown'
    };

    // Add to reasoning context
    this.reasoning.context.push(context);
    
    // Keep only last 50 commands
    if (this.reasoning.context.length > 50) {
      this.reasoning.context.shift();
    }

    // Analyze patterns
    this.detectPatterns(context);

    return context;
  },

  // AI Logic: Detect user patterns
  detectPatterns(context) {
    const { command, hour, theme } = context;

    // Track command frequency
    if (!this.reasoning.patterns[command]) {
      this.reasoning.patterns[command] = {
        count: 0,
        hours: {},
        themes: {},
        avgSuccess: 0
      };
    }

    const pattern = this.reasoning.patterns[command];
    pattern.count++;
    pattern.hours[hour] = (pattern.hours[hour] || 0) + 1;
    pattern.themes[theme] = (pattern.themes[theme] || 0) + 1;

    // Update metrics
    this.metrics.commandSuccess++;
  },

  // AI Logic: Suggest next action based on patterns
  suggestNextAction() {
    const patterns = this.reasoning.patterns;
    const currentHour = new Date().getHours();
    const currentTheme = window.TerminalEngine ? window.TerminalEngine.currentTheme : 'unknown';

    // Find most likely next command
    let bestCommand = null;
    let bestScore = 0;

    for (const [cmd, data] of Object.entries(patterns)) {
      // Score based on frequency, time, and theme
      let score = data.count * 0.4;
      score += (data.hours[currentHour] || 0) * 0.3;
      score += (data.themes[currentTheme] || 0) * 0.3;

      if (score > bestScore) {
        bestScore = score;
        bestCommand = cmd;
      }
    }

    return {
      command: bestCommand,
      confidence: Math.min(bestScore / 100, 1.0),
      reasoning: 'Based on usage patterns'
    };
  },

  // AI Logic: Recommend theme based on context
  recommendTheme() {
    const hour = new Date().getHours();
    const recentCommands = this.reasoning.context.slice(-10);

    // Time-based recommendations
    if (hour >= 9 && hour < 17) {
      // Work hours - productivity themes
      return { theme: 'electronics', reason: 'Work hours - technical focus' };
    } else if (hour >= 17 && hour < 22) {
      // Evening - creative themes
      return { theme: 'art', reason: 'Evening - creative time' };
    } else {
      // Night - relaxing themes
      return { theme: 'space', reason: 'Night - exploration mode' };
    }
  },

  // AI Logic: Analyze output for success/failure
  analyzeOutput(text) {
    const lowerText = text.toLowerCase();
    
    // Detect success indicators
    if (lowerText.includes('success') || lowerText.includes('✅') || 
        lowerText.includes('complete') || lowerText.includes('done')) {
      this.recordSuccess();
    }
    
    // Detect failure indicators
    if (lowerText.includes('error') || lowerText.includes('fail') || 
        lowerText.includes('❌') || lowerText.includes('not found')) {
      this.recordFailure();
    }
  },

  // Record successful command
  recordSuccess() {
    this.metrics.commandSuccess++;
    
    // Update pattern success rate
    const lastCommand = this.reasoning.context[this.reasoning.context.length - 1];
    if (lastCommand && this.reasoning.patterns[lastCommand.command]) {
      const pattern = this.reasoning.patterns[lastCommand.command];
      pattern.avgSuccess = (pattern.avgSuccess + 1) / 2; // Moving average
    }
  },

  // Record failed command
  recordFailure() {
    this.metrics.commandFailure++;
    
    // Update pattern failure tracking
    const lastCommand = this.reasoning.context[this.reasoning.context.length - 1];
    if (lastCommand && this.reasoning.patterns[lastCommand.command]) {
      const pattern = this.reasoning.patterns[lastCommand.command];
      pattern.avgSuccess = pattern.avgSuccess * 0.9; // Decrease success rate
    }
  },

  // AI Logic: Calculate growth delta for token valuation
  calculateGrowthDelta() {
    const total = this.metrics.commandSuccess + this.metrics.commandFailure;
    if (total === 0) return 0;

    const successRate = this.metrics.commandSuccess / total;
    const activityLevel = Math.min(this.reasoning.context.length / 50, 1.0);
    const delta = successRate * activityLevel * 100;

    return Math.floor(delta);
  },

  // AI Logic: Analyze context for decision making
  analyzeContext() {
    const recentCommands = this.reasoning.context.slice(-10);
    const commandTypes = recentCommands.map(c => c.command.split(':')[0]);
    const uniqueTypes = [...new Set(commandTypes)];

    return {
      recentActivity: recentCommands.length,
      diversity: uniqueTypes.length,
      focus: commandTypes.length > 0 ? this.getMostCommon(commandTypes) : null,
      timestamp: Date.now()
    };
  },

  // Helper: Get most common element in array
  getMostCommon(arr) {
    const counts = {};
    arr.forEach(item => counts[item] = (counts[item] || 0) + 1);
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  },

  // Update patterns with learning
  updatePatterns() {
    // Apply learning rate to smooth patterns
    for (const pattern of Object.values(this.reasoning.patterns)) {
      if (pattern.count > 10) {
        // Stabilize patterns that have enough data
        pattern.weight = 1.0;
      }
    }
  },

  // Save AI state
  saveState() {
    try {
      localStorage.setItem('mongoose_patterns', JSON.stringify(this.reasoning.patterns));
      localStorage.setItem('mongoose_metrics', JSON.stringify(this.metrics));
      localStorage.setItem('mongoose_last_update', Date.now());
    } catch (e) {
      console.warn('Could not save mongoose state:', e);
    }
  },

  // Get AI reasoning report
  getReasoningReport() {
    const suggestion = this.suggestNextAction();
    const themeRec = this.recommendTheme();
    const context = this.analyzeContext();
    const growthDelta = this.calculateGrowthDelta();

    return {
      suggestion: suggestion,
      themeRecommendation: themeRec,
      contextAnalysis: context,
      growthDelta: growthDelta,
      metrics: this.metrics,
      patterns: Object.keys(this.reasoning.patterns).length,
      mode: this.mode
    };
  },

  // Format reasoning report for display
  formatReport() {
    const report = this.getReasoningReport();
    
    let output = `🦎 Mongoose.OS AI Reasoning Report\n\n`;
    output += `📊 Firmware Version: ${this.version}\n`;
    output += `🔧 Mode: ${this.mode.toUpperCase()}\n`;
    output += `👤 Operator: ${this.operator}\n\n`;
    
    output += `🧠 AI Analysis:\n`;
    output += `  • Patterns Detected: ${report.patterns}\n`;
    output += `  • Recent Activity: ${report.contextAnalysis.recentActivity} commands\n`;
    output += `  • Activity Diversity: ${report.contextAnalysis.diversity} types\n`;
    output += `  • Current Focus: ${report.contextAnalysis.focus || 'none'}\n\n`;
    
    output += `💡 AI Suggestions:\n`;
    if (report.suggestion.command) {
      output += `  • Next Command: ${report.suggestion.command}\n`;
      output += `  • Confidence: ${(report.suggestion.confidence * 100).toFixed(1)}%\n`;
      output += `  • Reasoning: ${report.suggestion.reasoning}\n`;
    } else {
      output += `  • Building pattern data...\n`;
    }
    output += `\n`;
    
    output += `🎨 Theme Recommendation:\n`;
    output += `  • Suggested: ${report.themeRecommendation.theme}\n`;
    output += `  • Reason: ${report.themeRecommendation.reason}\n\n`;
    
    output += `📈 Performance Metrics:\n`;
    output += `  • Successful Commands: ${report.metrics.commandSuccess}\n`;
    output += `  • Failed Commands: ${report.metrics.commandFailure}\n`;
    output += `  • Success Rate: ${((report.metrics.commandSuccess / (report.metrics.commandSuccess + report.metrics.commandFailure || 1)) * 100).toFixed(1)}%\n\n`;
    
    output += `🔢 Growth Delta: +${report.growthDelta} tokens\n`;
    
    return output;
  },

  // Hook into token valuation
  contributeToTokenValue() {
    if (window.TokenValuation) {
      const delta = this.calculateGrowthDelta();
      TokenValuation.metrics.mongoose_delta = delta;
      return delta;
    }
    return 0;
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MongooseOS.init());
} else {
  MongooseOS.init();
}
