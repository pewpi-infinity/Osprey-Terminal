/* 
  Physics System - Capacitor-Based Command Execution
  Typing charges capacitor, Enter discharges and executes
  Mushrooms double charge
*/

window.TerminalPhysics = {
  capacitor: {
    charge: 0,
    maxCharge: 100,
    dischargeRate: 0.5
  },
  chargeIndicator: null,
  multiplier: 1,

  init() {
    // Create charge indicator
    this.chargeIndicator = document.createElement('div');
    this.chargeIndicator.id = 'charge-indicator';
    this.chargeIndicator.innerHTML = `
      <div id="charge-label">⚡ Charge</div>
      <div id="charge-bar-container">
        <div id="charge-bar"></div>
      </div>
      <div id="charge-value">0%</div>
    `;
    this.chargeIndicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      padding: 10px;
      border-radius: 8px;
      border: 2px solid #00eaff;
      color: #00eaff;
      font-family: monospace;
      z-index: 9999;
      min-width: 150px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      #charge-label {
        font-size: 12px;
        margin-bottom: 5px;
        text-align: center;
      }
      #charge-bar-container {
        width: 100%;
        height: 10px;
        background: rgba(0, 234, 255, 0.2);
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 5px;
      }
      #charge-bar {
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #00eaff, #00ff00);
        transition: width 0.2s ease;
      }
      #charge-value {
        font-size: 11px;
        text-align: center;
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(this.chargeIndicator);
    
    // Setup keyboard listeners
    this.setupListeners();
    
    // Start discharge loop
    this.startDischargeLoop();
    
    console.log('⚡ Physics System initialized');
  },

  setupListeners() {
    const inputLine = document.getElementById('input-line');
    if (!inputLine) return;

    // Charge on keydown
    inputLine.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.onEnter(inputLine.value);
      } else {
        this.onKeyDown(e.key);
      }
    });
  },

  // Typing charges capacitor
  onKeyDown(key) {
    // Calculate key energy based on key type
    let energy = 1;
    if (key.length === 1) {
      // Letters and numbers
      energy = 2;
    } else if (['Shift', 'Control', 'Alt', 'Meta'].includes(key)) {
      // Modifier keys
      energy = 0;
    } else if (['Backspace', 'Delete'].includes(key)) {
      // Destructive keys reduce charge
      energy = -1;
    }

    this.capacitor.charge = Math.min(
      this.capacitor.maxCharge,
      Math.max(0, this.capacitor.charge + energy)
    );

    this.updateChargeIndicator();
  },

  // Enter discharges and executes
  onEnter(command) {
    const spark = this.discharge();
    const executionSpeed = spark * this.multiplier;
    
    // Visual spark effect
    this.showSpark();
    
    // Reset for next command
    this.multiplier = 1;
    this.updateChargeIndicator();
    
    return executionSpeed;
  },

  // Discharge capacitor
  discharge() {
    const spark = this.capacitor.charge;
    this.capacitor.charge = 0;
    return spark;
  },

  // Mushroom doubles charge
  onMushroomClick() {
    this.capacitor.charge = Math.min(
      this.capacitor.maxCharge,
      this.capacitor.charge * 2
    );
    this.multiplier = 2;
    this.updateChargeIndicator();
    
    // Show mushroom effect
    this.showMushroomEffect();
  },

  // Update charge indicator
  updateChargeIndicator() {
    if (!this.chargeIndicator) return;

    const percentage = Math.round((this.capacitor.charge / this.capacitor.maxCharge) * 100);
    const chargeBar = document.getElementById('charge-bar');
    const chargeValue = document.getElementById('charge-value');
    
    if (chargeBar) {
      chargeBar.style.width = percentage + '%';
    }
    if (chargeValue) {
      chargeValue.textContent = percentage + '%' + (this.multiplier > 1 ? ' x' + this.multiplier : '');
    }
  },

  // Passive discharge over time
  startDischargeLoop() {
    setInterval(() => {
      if (this.capacitor.charge > 0) {
        this.capacitor.charge = Math.max(0, this.capacitor.charge - this.capacitor.dischargeRate);
        this.updateChargeIndicator();
      }
    }, 1000);
  },

  // Visual effects
  showSpark() {
    const spark = document.createElement('div');
    spark.textContent = '⚡';
    spark.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      font-size: 48px;
      z-index: 10001;
      pointer-events: none;
      animation: spark-flash 0.5s ease-out;
    `;
    document.body.appendChild(spark);
    
    setTimeout(() => spark.remove(), 500);
  },

  showMushroomEffect() {
    const mushroom = document.createElement('div');
    mushroom.textContent = '🍄';
    mushroom.style.cssText = `
      position: fixed;
      top: 20%;
      right: 10px;
      font-size: 32px;
      z-index: 10001;
      pointer-events: none;
      animation: mushroom-float 1s ease-out;
    `;
    document.body.appendChild(mushroom);
    
    setTimeout(() => mushroom.remove(), 1000);
  }
};

// Add animations
const physicsStyle = document.createElement('style');
physicsStyle.textContent = `
  @keyframes spark-flash {
    0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
  }
  
  @keyframes mushroom-float {
    0% { opacity: 0; transform: translateY(20px); }
    50% { opacity: 1; transform: translateY(-10px); }
    100% { opacity: 0; transform: translateY(-20px); }
  }
`;
document.head.appendChild(physicsStyle);

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => TerminalPhysics.init());
} else {
  TerminalPhysics.init();
}
