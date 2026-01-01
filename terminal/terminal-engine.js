/* 
  Terminal Engine - Multi-Theme Terminal Management
  Handles theme switching, terminal styling, and command routing
*/

window.TerminalEngine = {
  currentTheme: 'electronics',
  themes: [
    'mario', 'electronics', 'chemistry', 'robotics', 
    'quantum', 'sports', 'music', 'space', 
    'nature', 'art', 'gaming'
  ],
  history: {},
  themeCommands: {},

  init() {
    console.log('⚡ Terminal Engine initialized');
    this.loadTheme(this.currentTheme);
    this.setupThemeCommands();
  },

  // Load and apply theme
  loadTheme(themeName) {
    if (!this.themes.includes(themeName)) {
      console.warn('Theme not found:', themeName);
      return;
    }

    // Remove old theme class
    document.body.classList.remove('terminal-' + this.currentTheme);
    
    // Add new theme class
    document.body.classList.add('terminal-' + themeName);
    this.currentTheme = themeName;

    // Update terminal element
    const terminal = document.getElementById('terminal');
    if (terminal) {
      terminal.className = 'terminal-' + themeName;
    }

    // Update input area
    const inputArea = document.getElementById('input-area');
    if (inputArea) {
      inputArea.className = 'input-area-' + themeName;
    }

    console.log('🎨 Theme switched to:', themeName);
    
    // Show theme switch animation with Osprey
    if (window.OspreyCore) {
      OspreyCore.enter(50, 15);
      setTimeout(() => OspreyCore.swoop(), 500);
      setTimeout(() => OspreyCore.hide(), 1500);
    }
  },

  // Switch to next theme
  nextTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.loadTheme(this.themes[nextIndex]);
  },

  // Switch to previous theme
  prevTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const prevIndex = (currentIndex - 1 + this.themes.length) % this.themes.length;
    this.loadTheme(this.themes[prevIndex]);
  },

  // Get theme prompt icon
  getPromptIcon(theme) {
    const icons = {
      mario: '🍄',
      electronics: '⚡',
      chemistry: '🧪',
      robotics: '🤖',
      quantum: '⚛️',
      sports: '⚽',
      music: '🎵',
      space: '🚀',
      nature: '🌿',
      art: '🎨',
      gaming: '🎮'
    };
    return icons[theme] || '>';
  },

  // Save command to theme history
  saveToHistory(theme, command) {
    if (!this.history[theme]) {
      this.history[theme] = [];
    }
    this.history[theme].push({
      command: command,
      timestamp: Date.now()
    });
  },

  // Get theme history
  getHistory(theme) {
    return this.history[theme] || [];
  },

  // Setup theme-specific commands
  setupThemeCommands() {
    this.themeCommands = {
      // Theme switching
      'theme': (args) => {
        if (args.length === 0) {
          return 'Current theme: ' + this.currentTheme + '\nAvailable: ' + this.themes.join(', ');
        }
        this.loadTheme(args[0]);
        return 'Theme switched to: ' + args[0];
      },
      'theme:next': () => {
        this.nextTheme();
        return 'Theme: ' + this.currentTheme;
      },
      'theme:prev': () => {
        this.prevTheme();
        return 'Theme: ' + this.currentTheme;
      },
      'theme:list': () => {
        return 'Available themes:\n' + this.themes.map((t, i) => 
          (t === this.currentTheme ? '→ ' : '  ') + t
        ).join('\n');
      }
    };
  },

  // Handle command
  handleCommand(cmd, args) {
    const handler = this.themeCommands[cmd];
    if (handler) {
      return handler(args);
    }
    return null; // Not handled by terminal engine
  },

  // Get current prompt
  getPrompt() {
    return this.getPromptIcon(this.currentTheme) + ' ';
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => TerminalEngine.init());
} else {
  TerminalEngine.init();
}
