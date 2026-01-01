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
    // Show current token value from index_value.json
    return `🧱 Current Token Value:

💰 Base Value: $34 USD
🍄 Growth Factor: 1.2x
⭐ Star Power: +15
📈 Trending: ↑ 5%

💎 Total Value: $110 USD

🔗 PayPal: watsonkris61@gmail.com
📧 Contact: marvaseater@gmail.com`;
  },

  'token:status'() {
    return `🧱 Token System Status:

✅ Generator: Online
✅ Validator: Active
✅ Blockchain: Synced
✅ Payment: Ready

🔢 Tokens issued: ${Math.floor(Math.random() * 1000 + 5000)}
💰 Total value: $${Math.floor(Math.random() * 10000 + 50000)}
🌐 Network health: 100%`;
  }
};
