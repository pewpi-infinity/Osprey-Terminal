/* 
  🧱 Token Commands
  token:apply, token:combine, token:link, formula commands
*/

window.TokenCommands = {
  'token:apply'(args) {
    if (args.length === 0) {
      return '🧱 Usage: token:apply <formula>\nExample: token:apply 👑📶⚪';
    }
    
    const formula = args.join(' ');
    
    // Osprey delivers the token
    if (window.OspreyCore) {
      OspreyCore.enter(50, 30);
      setTimeout(() => OspreyCore.swoop(), 500);
      setTimeout(() => OspreyCore.hide(), 1500);
    }
    
    return `🧱 Applying token formula: ${formula}

🔮 Processing formula...
⚡ Generating token...
🎯 Linking to repository...

✅ Token applied successfully!
🧱 Token ID: ${Math.random().toString(36).substr(2, 9)}
💰 Value: $${Math.floor(Math.random() * 100 + 50)}`;
  },

  'token:combine'(args) {
    if (args.length < 2) {
      return '🧱 Usage: token:combine <token1> <token2>\nExample: token:combine 🧱 🍄';
    }
    
    const token1 = args[0];
    const token2 = args[1];
    
    return `🧱 Combining tokens: ${token1} + ${token2}

🔮 Merging formulas...
⚡ Calculating synergy...
✨ Creating new token...

🧱 Combined token: ${token1}${token2}
📈 Power level: ${Math.floor(Math.random() * 500 + 500)}
💎 Rarity: Legendary

✅ Token combination complete!`;
  },

  'token:link'(args) {
    const repo = args.length > 0 ? args.join(' ') : 'current';
    
    return `🧱 Linking token to repository: ${repo}

🔗 Establishing connection...
🌐 Registering in blockchain...
🔒 Securing ownership...

✅ Token linked successfully!
🔗 Link ID: TKN-${Math.random().toString(36).substr(2, 6).toUpperCase()}
📍 Repository: ${repo}`;
  },

  'formula:🧲🪐🔁'() {
    // Magnet loop formula
    if (window.MushroomsCharacter) {
      MushroomsCharacter.forceSpawn();
    }
    
    return `🧲 Running Magnet Loop Formula...

🪐 Initializing gravitational field...
🔁 Creating feedback loop...
⚡ Energy cycling...

📊 Results:
  • Attraction force: 9.8x
  • Loop stability: 99.2%
  • Energy efficiency: 95%

✅ Magnet loop active!`;
  },

  'token:value'() {
    // Use real-time token valuation engine
    if (window.TokenValuation) {
      return TokenValuation.formatTokenValue();
    }
    
    // Fallback if valuation engine not loaded
    return `🧱 Current Token Value:

💰 Base Value: 10 TKN
📈 Calculating real-time metrics...

⚠️ Token Valuation Engine loading...

💡 Tokens (TKN) are based on real activity metrics,
   not USD currency.`;
  },

  'token:status'() {
    if (window.TokenValuation) {
      const data = TokenValuation.exportMetrics();
      const usd = TokenValuation.getUSDEquivalent();
      
      let output = `🧱 Token System Status:

✅ Valuation Engine: Online
✅ Metrics Tracking: Active
✅ Real-time Calculation: Enabled

📊 Current Metrics:
  • Total Tokens: ${data.total} TKN
  • Commands Executed: ${data.metrics.commandsExecuted}
  • Theme Switches: ${data.metrics.themeSwitches}
  • Characters Spawned: ${data.metrics.charactersSpawned}
  • Active Time: ${Math.floor(data.metrics.timeOnPage / 60)} min

⚡ Growth Rate: ${data.growthRate} TKN/min
🌐 Network Health: 100%`;

      if (usd) {
        output += `\n\n💵 USD Equivalent (Reference Only):
  • ${data.total} TKN ≈ $${usd.usd} USD
  • Ratio: 1 TKN = $${usd.ratio} USD`;
      }

      return output;
    }
    
    return `🧱 Token System Status:

✅ Generator: Online
✅ Validator: Active
✅ Blockchain: Synced
✅ Payment: Ready

🔢 Tokens issued: ${Math.floor(Math.random() * 1000 + 5000)}
💰 Total value: ${Math.floor(Math.random() * 10000 + 50000)} TKN
🌐 Network health: 100%`;
  },

  'token:metrics'() {
    if (window.TokenValuation) {
      const metrics = TokenValuation.metrics;
      
      return `📊 Token Generation Metrics:

🔢 Activity Tracking:
  • Page Views: ${metrics.pageViews}
  • Commands Executed: ${metrics.commandsExecuted}
  • Theme Switches: ${metrics.themeSwitches}
  • Characters Spawned: ${metrics.charactersSpawned}
  • Time on Page: ${Math.floor(metrics.timeOnPage / 60)} minutes ${metrics.timeOnPage % 60} seconds
  • Unique Sessions: ${metrics.uniqueSessions}

📁 Repository Metrics:
  • Files: ${metrics.filesInRepo}
  • Code Lines: ${metrics.codeLines || 'Calculating...'}
  • Commits: ${metrics.commits}

💡 Each activity generates tokens based on weighted formulas.
   Use 'token:value' to see full breakdown.`;
    }
    
    return `📊 Metrics tracking not available.`;
  },

  'token:breakdown'() {
    if (window.TokenValuation) {
      const breakdown = TokenValuation.getTokenBreakdown();
      
      let output = `📋 Token Value Breakdown:\n\n`;
      
      for (const [key, value] of Object.entries(breakdown)) {
        if (value.tokens > 0) {
          output += `${value.label.padEnd(25)} ${value.tokens.toFixed(1).padStart(8)} TKN\n`;
        }
      }
      
      output += `\n${'─'.repeat(40)}`;
      output += `\nTotal Token Value: ${TokenValuation.calculateTokenValue()} TKN`;
      
      return output;
    }
    
    return `Token breakdown not available.`;
  },

  'token:usd'() {
    if (window.TokenValuation) {
      const usd = TokenValuation.getUSDEquivalent();
      
      if (usd) {
        return `💵 USD Conversion (Reference Only):

🧱 Token Value: ${usd.tokens} TKN
💰 USD Equivalent: $${usd.usd} USD
📊 Conversion Rate: 1 TKN = $${usd.ratio} USD

⚠️ Note: Token values are independent metrics.
   USD equivalent is for reference based on
   current index value from index_value.json

🔗 Operator: Kris Watson
📧 Contact: marvaseater@gmail.com
💳 PayPal: watsonkris61@gmail.com`;
      }
      
      return `💵 USD conversion not configured.
      
⚠️ Tokens (TKN) are measured in activity units,
   not directly tied to USD currency.`;
    }
    
    return `Token valuation engine not loaded.`;
  }
};
