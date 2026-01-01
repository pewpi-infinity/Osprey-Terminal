/* 
  🧱 Token Machine Emitter
  Creates token pages and emits tokens based on formulas
  Implements C13B0 Phase 5 token emission system
*/

window.TokenMachine = {
  version: '5.0',
  brand: 'The Lending Giant',
  power: 'Powered by Infinity',
  contact: {
    phone: '808-342-9974',
    email: 'marvaseater@gmail.com'
  },

  // Token emission actions
  actions: [
    { name: 'synch', icon: '🎵', description: 'synch → decide' },
    { name: 'read', icon: '🟨', description: 'read → ingest' },
    { name: 'write', icon: '🟦', description: 'write → persist' },
    { name: 'thread', icon: '🧵', description: 'thread → relate' },
    { name: 'organize', icon: '🗄️', description: 'organize → structure' },
    { name: 'assemble', icon: '🪡', description: 'assemble → construct' },
    { name: 'modulate', icon: '🎛️', description: 'modulate → optimize' },
    { name: 'run', icon: '🦿', description: 'run → execute' }
  ],

  // Kris Token Formulas (9 formulas)
  formulas: {
    'crown-signal-white': { formula: '👑📶⚪', name: 'Authority Signal', power: 100 },
    'diamond-crown-mushroom': { formula: '💎👑🍄', name: 'Growth Authority', power: 150 },
    'white-crown-link': { formula: '⚪👑🔗', name: 'Connected Authority', power: 120 },
    'file-thread-signal': { formula: '🗄️🧵📶', name: 'Organized Communication', power: 90 },
    'diamond-modulator-crown': { formula: '💎🎛️👑', name: 'Optimized Authority', power: 180 },
    'white-money-sync': { formula: '⚪💰🎵', name: 'Synchronized Value', power: 200 },
    'link-pin-joystick-disk': { formula: '🖇️📍🕹️📀', name: 'Interactive Archive', power: 160 },
    'assembler-nerd-star': { formula: '🪡🤓⭐', name: 'Smart Construction', power: 140 },
    'crown-magnet-planet': { formula: '👑🧲🪐', name: 'Gravitational Authority', power: 250 }
  },

  // Emitted tokens storage
  emittedTokens: [],
  tokenPages: {},

  init() {
    console.log('🧱 Token Machine Emitter v5.0 initialized');
    this.loadEmittedTokens();
  },

  // Load previously emitted tokens
  loadEmittedTokens() {
    try {
      const saved = localStorage.getItem('token_machine_emissions');
      if (saved) {
        this.emittedTokens = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load emitted tokens:', e);
    }
  },

  // Save emitted tokens
  saveEmittedTokens() {
    try {
      localStorage.setItem('token_machine_emissions', JSON.stringify(this.emittedTokens));
    } catch (e) {
      console.warn('Could not save emitted tokens:', e);
    }
  },

  // Emit a token based on action
  emitToken(actionName) {
    const action = this.actions.find(a => a.name === actionName);
    if (!action) {
      return `Token action '${actionName}' not found`;
    }

    const timestamp = Date.now();
    const tokenId = `TKN-${actionName.toUpperCase()}-${timestamp}`;

    const token = {
      id: tokenId,
      action: action.name,
      icon: action.icon,
      description: action.description,
      timestamp: timestamp,
      emittedBy: 'Mongoose Machine',
      power: Math.floor(Math.random() * 50 + 50)
    };

    this.emittedTokens.push(token);
    this.saveEmittedTokens();

    // Create token page HTML
    this.createTokenPage(token);

    return token;
  },

  // Apply Kris formula
  applyFormula(formulaKey) {
    const formula = this.formulas[formulaKey];
    if (!formula) {
      return null;
    }

    const timestamp = Date.now();
    const tokenId = `FORMULA-${formulaKey.toUpperCase()}-${timestamp}`;

    const token = {
      id: tokenId,
      formula: formula.formula,
      name: formula.name,
      power: formula.power,
      timestamp: timestamp,
      type: 'formula',
      emittedBy: 'Kris Formula System'
    };

    this.emittedTokens.push(token);
    this.saveEmittedTokens();

    // Create formula page
    this.createFormulaPage(token);

    return token;
  },

  // Create token page HTML (in memory/localStorage)
  createTokenPage(token) {
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Infinity Token — ${token.action}</title>
<style>
body { 
  background: #0b0f14; 
  color: #eaeaea; 
  font-family: monospace; 
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
.token-card {
  background: #111;
  border: 2px solid #333;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}
.token-icon {
  font-size: 48px;
  text-align: center;
  margin: 20px 0;
}
pre { 
  background: #0a0a0a; 
  padding: 12px; 
  border: 1px solid #333;
  border-radius: 4px;
}
footer { 
  margin-top: 40px; 
  padding-top: 20px;
  border-top: 1px solid #333;
  font-size: 12px; 
  color: #aaa; 
}
a { color: #6cf; text-decoration: none; }
.power-bar {
  background: #222;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}
.power-fill {
  background: linear-gradient(90deg, #00ff41, #00d4ff);
  height: 100%;
  width: ${token.power}%;
  transition: width 0.5s ease;
}
</style>
</head>
<body>

<h1>${token.icon} Token Machine: ${token.action}</h1>

<div class="token-card">
  <div class="token-icon">${token.icon}</div>
  <p><strong>Token ID:</strong> ${token.id}</p>
  <p><strong>Action:</strong> ${token.description}</p>
  <p><strong>Generated:</strong> ${new Date(token.timestamp).toLocaleString()}</p>
  <p><strong>Emitted By:</strong> ${token.emittedBy}</p>
  <p><strong>Power Level:</strong> ${token.power}%</p>
  <div class="power-bar">
    <div class="power-fill" style="width: ${token.power}%"></div>
  </div>
</div>

<pre>
Token Machine Actions:

${this.actions.map(a => `${a.icon} ${a.description}`).join('\n')}

👑 emit → token
</pre>

<footer>
<hr>
<p><strong>${this.power}</strong></p>
<p><strong>${this.brand}</strong></p>
<p>Email: <a href="mailto:${this.contact.email}">${this.contact.email}</a></p>
<p>Phone: ${this.contact.phone}</p>
</footer>

</body>
</html>`;

    this.tokenPages[token.id] = html;
    
    // Store in localStorage
    try {
      localStorage.setItem(`token_page_${token.id}`, html);
    } catch (e) {
      console.warn('Could not store token page:', e);
    }

    return html;
  },

  // Create formula page HTML
  createFormulaPage(token) {
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>🧱 Kris Formula — ${token.name}</title>
<style>
body { 
  background: linear-gradient(135deg, #0b0f14, #1a1a2e);
  color: #eaeaea; 
  font-family: monospace; 
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
.formula-card {
  background: rgba(17, 17, 17, 0.8);
  border: 3px solid #ffd700;
  padding: 30px;
  margin: 20px 0;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}
.formula-display {
  font-size: 64px;
  text-align: center;
  margin: 30px 0;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}
.power-meter {
  background: #0a0a0a;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin: 20px 0;
  border: 2px solid #ffd700;
}
.power-level {
  background: linear-gradient(90deg, #ffd700, #ff6b6b, #4ecdc4);
  height: 100%;
  width: ${(token.power / 250 * 100)}%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
footer { 
  margin-top: 40px; 
  padding-top: 20px;
  border-top: 2px solid #ffd700;
  font-size: 12px; 
  color: #aaa; 
}
a { color: #ffd700; text-decoration: none; }
</style>
</head>
<body>

<h1>🧱 Kris Formula Token</h1>

<div class="formula-card">
  <h2>${token.name}</h2>
  <div class="formula-display">${token.formula}</div>
  
  <p><strong>Token ID:</strong> ${token.id}</p>
  <p><strong>Formula:</strong> ${token.formula}</p>
  <p><strong>Power:</strong> ${token.power}</p>
  <p><strong>Generated:</strong> ${new Date(token.timestamp).toLocaleString()}</p>
  <p><strong>Type:</strong> Kris Formula</p>
  
  <div class="power-meter">
    <div class="power-level"></div>
  </div>
</div>

<h3>🧱 All Kris Formulas:</h3>
<pre>
${Object.entries(this.formulas).map(([key, f]) => 
  `${f.formula} → ${f.name} (Power: ${f.power})`
).join('\n')}
</pre>

<footer>
<hr>
<p><strong>${this.power}</strong></p>
<p><strong>${this.brand}</strong></p>
<p>🧱 Kris 🔑</p>
<p>Email: <a href="mailto:${this.contact.email}">${this.contact.email}</a></p>
<p>Phone: ${this.contact.phone}</p>
</footer>

</body>
</html>`;

    this.tokenPages[token.id] = html;
    
    // Store in localStorage
    try {
      localStorage.setItem(`token_page_${token.id}`, html);
    } catch (e) {
      console.warn('Could not store formula page:', e);
    }

    return html;
  },

  // Create dashboard HTML
  createDashboard() {
    const tokenLinks = this.emittedTokens.map(token => {
      const icon = token.icon || token.formula;
      const name = token.action || token.name;
      return `<div class="token"><a href="#" onclick="TokenMachine.viewToken('${token.id}')">${icon} ${name}</a></div>`;
    }).join('\n');

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>🧠 Infinity Machine Dashboard</title>
<style>
body { 
  background: #0b0f14; 
  color: #eaeaea; 
  font-family: monospace;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}
h1 { 
  color: #ffd700;
  text-align: center;
  font-size: 36px;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}
.token { 
  padding: 12px; 
  margin: 8px 0; 
  border: 1px solid #333;
  background: #111;
  border-radius: 6px;
  transition: all 0.3s;
}
.token:hover {
  border-color: #ffd700;
  transform: translateX(5px);
}
a { color: #6cf; text-decoration: none; }
a:hover { color: #ffd700; }
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 30px 0;
}
.stat-card {
  background: #111;
  border: 2px solid #333;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}
.stat-value {
  font-size: 32px;
  color: #ffd700;
  font-weight: bold;
}
footer { 
  margin-top: 60px;
  padding-top: 20px;
  border-top: 2px solid #ffd700;
  font-size: 12px; 
  color: #aaa;
  text-align: center;
}
</style>
</head>
<body>

<h1>🧠 Infinity Machine Dashboard</h1>

<div class="stats">
  <div class="stat-card">
    <div class="stat-value">${this.emittedTokens.length}</div>
    <div>Tokens Emitted</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">${this.actions.length}</div>
    <div>Actions Available</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">${Object.keys(this.formulas).length}</div>
    <div>Kris Formulas</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">${this.getTotalPower()}</div>
    <div>Total Power</div>
  </div>
</div>

<h2>🧱 Emitted Tokens:</h2>
<div id="tokens">
${tokenLinks || '<p>No tokens emitted yet. Use token:emit or formula:apply commands.</p>'}
</div>

<footer>
<hr>
<p><strong>${this.power}</strong></p>
<p><strong>${this.brand}</strong></p>
<p>Email: <a href="mailto:${this.contact.email}">${this.contact.email}</a></p>
<p>Phone: ${this.contact.phone}</p>
<p>🧱 Kris 🔑</p>
</footer>

</body>
</html>`;

    return html;
  },

  // Get total power of all emitted tokens
  getTotalPower() {
    return this.emittedTokens.reduce((sum, token) => sum + (token.power || 0), 0);
  },

  // View a specific token page
  viewToken(tokenId) {
    const html = this.tokenPages[tokenId] || localStorage.getItem(`token_page_${tokenId}`);
    if (html) {
      // Open in new window/tab
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(html);
        win.document.close();
      }
      return true;
    }
    return false;
  },

  // Open dashboard
  openDashboard() {
    const html = this.createDashboard();
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  },

  // Get emission report
  getEmissionReport() {
    const totalTokens = this.emittedTokens.length;
    const totalPower = this.getTotalPower();
    const formulaTokens = this.emittedTokens.filter(t => t.type === 'formula').length;
    const actionTokens = totalTokens - formulaTokens;

    return {
      totalTokens,
      actionTokens,
      formulaTokens,
      totalPower,
      lastEmission: this.emittedTokens.length > 0 ? 
        this.emittedTokens[this.emittedTokens.length - 1].timestamp : null
    };
  },

  // Format emission report
  formatEmissionReport() {
    const report = this.getEmissionReport();
    
    let output = `🧱 Token Machine Emission Report\n\n`;
    output += `📊 Statistics:\n`;
    output += `  • Total Tokens Emitted: ${report.totalTokens}\n`;
    output += `  • Action Tokens: ${report.actionTokens}\n`;
    output += `  • Formula Tokens: ${report.formulaTokens}\n`;
    output += `  • Total Power: ${report.totalPower}\n`;
    
    if (report.lastEmission) {
      output += `  • Last Emission: ${new Date(report.lastEmission).toLocaleString()}\n`;
    }
    
    output += `\n🎯 Available Actions:\n`;
    for (const action of this.actions) {
      output += `  ${action.icon} ${action.name} — ${action.description}\n`;
    }
    
    output += `\n🧱 Kris Formulas (9 total):\n`;
    for (const [key, formula] of Object.entries(this.formulas)) {
      output += `  ${formula.formula} → ${formula.name} (${formula.power} power)\n`;
    }
    
    output += `\n💡 Use 'token:emit <action>' or 'formula:poof <formula>' to emit tokens.`;
    output += `\n💡 Use 'token:dashboard' to open the dashboard in a new tab.`;
    
    return output;
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => TokenMachine.init());
} else {
  TokenMachine.init();
}
