/* 
  🦎 Mongoose Commands
  AI reasoning and firmware control commands
*/

window.MongooseCommands = {
  'mongoose:status'() {
    if (window.MongooseOS) {
      return MongooseOS.formatReport();
    }
    return '🦎 Mongoose.OS not loaded';
  },

  'mongoose:suggest'() {
    if (window.MongooseOS) {
      const suggestion = MongooseOS.suggestNextAction();
      
      if (suggestion.command) {
        return `🦎 AI Suggestion:

💡 Recommended Command: ${suggestion.command}
📊 Confidence: ${(suggestion.confidence * 100).toFixed(1)}%
🧠 Reasoning: ${suggestion.reasoning}

💭 Based on your usage patterns, this command
   is likely what you want to run next.

Type the command or use 'mongoose:auto' to execute it.`;
      }
      
      return `🦎 Building pattern data...

Keep using commands to train the AI.
Suggestions will improve with more usage.`;
    }
    
    return '🦎 Mongoose.OS not loaded';
  },

  'mongoose:theme'() {
    if (window.MongooseOS) {
      const rec = MongooseOS.recommendTheme();
      
      let output = `🦎 AI Theme Recommendation:

🎨 Suggested Theme: ${rec.theme}
💭 Reasoning: ${rec.reason}

`;
      
      if (window.TerminalEngine) {
        const current = TerminalEngine.currentTheme;
        if (current !== rec.theme) {
          output += `Current theme is '${current}'.\nSwitch with: theme ${rec.theme}`;
        } else {
          output += `✅ You're already using the recommended theme!`;
        }
      }
      
      return output;
    }
    
    return '🦎 Mongoose.OS not loaded';
  },

  'mongoose:patterns'() {
    if (window.MongooseOS) {
      const patterns = MongooseOS.reasoning.patterns;
      
      if (Object.keys(patterns).length === 0) {
        return `🦎 No patterns detected yet.

Start using commands to train the AI.`;
      }
      
      let output = `🦎 Detected Usage Patterns:\n\n`;
      
      // Sort by count
      const sorted = Object.entries(patterns)
        .sort(([,a], [,b]) => b.count - a.count)
        .slice(0, 10);
      
      output += `Command                    Count   Success\n`;
      output += `${'─'.repeat(45)}\n`;
      
      for (const [cmd, data] of sorted) {
        const success = (data.avgSuccess * 100).toFixed(0);
        output += `${cmd.padEnd(25)} ${String(data.count).padStart(5)}   ${success}%\n`;
      }
      
      return output;
    }
    
    return '🦎 Mongoose.OS not loaded';
  },

  'mongoose:learn'() {
    if (window.MongooseOS) {
      if (MongooseOS.mode === 'learning') {
        return `🦎 Already in learning mode.

AI is actively analyzing your patterns.`;
      }
      
      MongooseOS.mode = 'learning';
      MongooseOS.reasoning.learningRate = 0.2;
      
      return `🦎 Learning Mode Activated

📚 AI will actively learn from your commands
⚡ Learning rate increased to 0.2
🧠 Pattern detection enhanced

Mode will switch to 'active' after sufficient data.`;
    }
    
    return '🦎 Mongoose.OS not loaded';
  },

  'mongoose:metrics'() {
    if (window.MongooseOS) {
      const metrics = MongooseOS.metrics;
      
      return `🦎 Mongoose Metrics:

📊 Command Statistics:
  • Successful: ${metrics.commandSuccess}
  • Failed: ${metrics.commandFailure}
  • Success Rate: ${((metrics.commandSuccess / (metrics.commandSuccess + metrics.commandFailure || 1)) * 100).toFixed(1)}%

🧠 AI Learning:
  • Patterns Detected: ${Object.keys(MongooseOS.reasoning.patterns).length}
  • Context Buffer: ${MongooseOS.reasoning.context.length}/50
  • Learning Rate: ${MongooseOS.reasoning.learningRate}

🔢 Token Contribution:
  • Growth Delta: +${MongooseOS.calculateGrowthDelta()} tokens
  • Mode: ${MongooseOS.mode}`;
    }
    
    return '🦎 Mongoose.OS not loaded';
  },

  'mongoose:reset'() {
    if (window.MongooseOS) {
      // Reset AI patterns
      MongooseOS.reasoning.patterns = {};
      MongooseOS.reasoning.context = [];
      MongooseOS.metrics = {
        commandSuccess: 0,
        commandFailure: 0,
        userPatterns: {},
        timeOfDay: {},
        themePreferences: {},
        characterInteractions: {}
      };
      
      // Clear storage
      localStorage.removeItem('mongoose_patterns');
      localStorage.removeItem('mongoose_metrics');
      
      return `🦎 Mongoose AI Reset Complete

🧹 All patterns cleared
🔄 Metrics reset to zero
📚 Ready to learn fresh patterns

Start using commands to train the AI.`;
    }
    
    return '🦎 Mongoose.OS not loaded';
  },

  'mongoose:auto'() {
    if (window.MongooseOS) {
      const suggestion = MongooseOS.suggestNextAction();
      
      if (suggestion.command && suggestion.confidence > 0.3) {
        return `🦎 Auto-executing suggestion...

Command: ${suggestion.command}
Confidence: ${(suggestion.confidence * 100).toFixed(1)}%

[Note: Auto-execution requires user confirmation]
Type '${suggestion.command}' to run it.`;
      }
      
      return `🦎 Confidence too low for auto-execution.

Current confidence: ${(suggestion.confidence * 100).toFixed(1)}%
Required: 30%

Keep using commands to improve AI confidence.`;
    }
    
    return '🦎 Mongoose.OS not loaded';
  },

  'mongoose:help'() {
    return `🦎 Mongoose.OS Commands:

🔧 Core Commands:
  mongoose:status     - Full AI reasoning report
  mongoose:suggest    - Get AI command suggestion
  mongoose:theme      - Get AI theme recommendation
  mongoose:patterns   - View detected usage patterns
  mongoose:metrics    - View performance metrics

🧠 Learning Commands:
  mongoose:learn      - Activate learning mode
  mongoose:auto       - Auto-execute AI suggestion
  mongoose:reset      - Reset AI patterns

🔗 Multi-Repo Sync Commands:
  mongoose:sync       - View repo sync status
  mongoose:sync-now   - Force immediate sync
  mongoose:repos      - List all legend repos
  mongoose:production - View production aggregation

💡 The AI learns from your usage and provides
   intelligent suggestions based on patterns.`;
  },

  // ADDITIVE: Repo sync commands
  'mongoose:sync'() {
    if (window.MongooseSync) {
      return MongooseSync.formatStatusReport();
    }
    return '🦎 Mongoose Sync not loaded';
  },

  'mongoose:sync-now'() {
    if (window.MongooseSync) {
      MongooseSync.syncAll();
      return `🦎 Starting multi-repo sync...

📡 Syncing across all legend repos...
⏳ This may take a moment...

Use 'mongoose:sync' to check progress.`;
    }
    return '🦎 Mongoose Sync not loaded';
  },

  'mongoose:repos'() {
    if (window.MongooseSync) {
      let output = `🦎 Legend Repos in pewpi-infinity:\n\n`;
      
      for (const [name, repo] of Object.entries(MongooseSync.repos)) {
        const status = repo.lastSync ? '✅' : '⏳';
        output += `${status} ${repo.emoji} ${name}\n`;
        output += `   ${repo.description}\n`;
        if (repo.authority) {
          output += `   Authority: ${repo.authority}\n`;
        }
        output += `\n`;
      }
      
      return output;
    }
    return '🦎 Mongoose Sync not loaded';
  },

  'mongoose:production'() {
    if (window.MongooseSync) {
      const production = MongooseSync.getAggregatedProduction();
      
      let output = `🦎 Aggregated Production Report\n\n`;
      output += `💎 Total Production: ${production.total} units\n\n`;
      output += `📦 By Repository:\n\n`;
      
      const sorted = Object.entries(production.breakdown)
        .sort(([,a], [,b]) => b.production - a.production);
      
      for (const [name, data] of sorted) {
        if (data.production > 0) {
          output += `${data.emoji} ${name}: ${data.production} units\n`;
        }
      }
      
      output += `\n💡 Production contributes to token valuation.`;
      
      return output;
    }
    return '🦎 Mongoose Sync not loaded';
  }
};
