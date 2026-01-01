/* 
  🕹️ Joystick Terminal Navigation
  Gamepad/keyboard controls for terminal navigation
*/

window.JoystickControls = {
  enabled: false,
  gamepad: null,
  historyIndex: -1,
  commandHistory: [],

  init() {
    console.log('🕹️ Joystick Controls initialized');
    this.setupKeyboardControls();
    this.setupGamepadControls();
    this.loadHistory();
  },

  // Setup keyboard controls (arrow keys, etc.)
  setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      if (!this.enabled) return;

      const inputLine = document.getElementById('input-line');
      if (!inputLine) return;

      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          this.scrollHistoryUp(inputLine);
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.scrollHistoryDown(inputLine);
          break;
        case 'ArrowLeft':
          // Default browser behavior for text navigation
          break;
        case 'ArrowRight':
          // Default browser behavior for text navigation
          break;
        case 'Escape':
          e.preventDefault();
          this.cancel(inputLine);
          break;
      }
    });
  },

  // Setup gamepad controls
  setupGamepadControls() {
    window.addEventListener('gamepadconnected', (e) => {
      console.log('🎮 Gamepad connected:', e.gamepad.id);
      this.gamepad = e.gamepad;
      this.enabled = true;
      this.startGamepadPolling();
    });

    window.addEventListener('gamepaddisconnected', (e) => {
      console.log('🎮 Gamepad disconnected');
      this.gamepad = null;
    });
  },

  // Poll gamepad state
  startGamepadPolling() {
    const pollGamepad = () => {
      if (!this.gamepad) return;

      const gamepads = navigator.getGamepads();
      const gp = gamepads[this.gamepad.index];
      
      if (!gp) return;

      const inputLine = document.getElementById('input-line');
      if (!inputLine) return;

      // D-pad or left stick
      if (gp.axes[1] < -0.5 || gp.buttons[12]?.pressed) {
        // Up - scroll history up
        this.scrollHistoryUp(inputLine);
      } else if (gp.axes[1] > 0.5 || gp.buttons[13]?.pressed) {
        // Down - scroll history down
        this.scrollHistoryDown(inputLine);
      }

      // Buttons
      if (gp.buttons[0]?.pressed) {
        // A button - execute command
        this.execute(inputLine);
      } else if (gp.buttons[1]?.pressed) {
        // B button - cancel/clear
        this.cancel(inputLine);
      } else if (gp.buttons[2]?.pressed) {
        // X button - open menu
        this.openMenu();
      } else if (gp.buttons[3]?.pressed) {
        // Y button - paste
        this.paste(inputLine);
      } else if (gp.buttons[9]?.pressed) {
        // START - pause
        this.pause();
      } else if (gp.buttons[8]?.pressed) {
        // SELECT - switch theme
        this.switchTheme();
      }

      requestAnimationFrame(pollGamepad);
    };

    requestAnimationFrame(pollGamepad);
  },

  // Navigation actions
  scrollHistoryUp(inputLine) {
    if (this.commandHistory.length === 0) return;
    
    if (this.historyIndex < this.commandHistory.length - 1) {
      this.historyIndex++;
      inputLine.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
    }
  },

  scrollHistoryDown(inputLine) {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      inputLine.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
    } else if (this.historyIndex === 0) {
      this.historyIndex = -1;
      inputLine.value = '';
    }
  },

  execute(inputLine) {
    // Trigger Enter key event
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      keyCode: 13,
      bubbles: true
    });
    inputLine.dispatchEvent(event);
  },

  cancel(inputLine) {
    inputLine.value = '';
    this.historyIndex = -1;
  },

  paste(inputLine) {
    navigator.clipboard.readText().then(text => {
      inputLine.value += text;
    }).catch(err => {
      console.warn('Paste failed:', err);
    });
  },

  openMenu() {
    if (window.TerminalEngine) {
      const output = document.getElementById('output');
      if (output) {
        output.innerHTML += '<br>🎮 Joystick Menu:<br>';
        output.innerHTML += ' ↑/↓ - History navigation<br>';
        output.innerHTML += ' A - Execute<br>';
        output.innerHTML += ' B - Cancel<br>';
        output.innerHTML += ' X - Menu<br>';
        output.innerHTML += ' Y - Paste<br>';
        output.innerHTML += ' START - Pause<br>';
        output.innerHTML += ' SELECT - Theme<br>';
      }
    }
  },

  pause() {
    console.log('⏸️ Pause requested');
    // Could pause animations or other processes
  },

  switchTheme() {
    if (window.TerminalEngine) {
      TerminalEngine.nextTheme();
    }
  },

  // History management
  addToHistory(command) {
    if (!command || command.trim() === '') return;
    
    this.commandHistory.push(command);
    this.historyIndex = -1;
    this.saveHistory();
  },

  loadHistory() {
    try {
      const saved = localStorage.getItem('osprey_command_history');
      if (saved) {
        this.commandHistory = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load history:', e);
    }
  },

  saveHistory() {
    try {
      // Keep last 100 commands
      const toSave = this.commandHistory.slice(-100);
      localStorage.setItem('osprey_command_history', JSON.stringify(toSave));
    } catch (e) {
      console.warn('Failed to save history:', e);
    }
  },

  // Enable/disable controls
  enable() {
    this.enabled = true;
  },

  disable() {
    this.enabled = false;
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    JoystickControls.init();
    // Enable by default for keyboard controls
    JoystickControls.enable();
  });
} else {
  JoystickControls.init();
  JoystickControls.enable();
}
