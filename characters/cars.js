/* 
  🚗 Cars Character System - Vehicle Fleet
  Sports car, truck, taxi - drives across screen, carries output, honks on completion
*/

window.CarsCharacter = {
  types: {
    sports: '🏎️',
    truck: '🚚',
    taxi: '🚕'
  },
  element: null,
  currentType: 'sports',

  init() {
    this.element = document.createElement('div');
    this.element.id = 'car-character';
    this.element.innerHTML = this.types[this.currentType];
    this.element.style.cssText = `
      position: fixed;
      font-size: 48px;
      z-index: 9998;
      pointer-events: none;
      transition: left 2s linear;
      display: none;
    `;
    document.body.appendChild(this.element);
    
    console.log('🚗 Cars Character System initialized');
  },

  // Drive across screen
  driveAcross(type = 'sports', withOutput = null) {
    if (!this.element) this.init();
    
    this.currentType = type;
    this.element.innerHTML = this.types[type];
    this.element.style.display = 'block';
    this.element.style.left = '-60px';
    this.element.style.bottom = '15%';
    
    // Add output cargo if provided
    if (withOutput) {
      const cargo = document.createElement('span');
      cargo.textContent = ' 📦';
      cargo.style.fontSize = '24px';
      this.element.appendChild(cargo);
    }
    
    // Drive across
    setTimeout(() => {
      this.element.style.left = 'calc(100% + 60px)';
    }, 100);
    
    // Honk on completion
    setTimeout(() => {
      this.honk();
    }, 2000);
    
    // Hide after animation
    setTimeout(() => {
      this.hide();
    }, 2500);
  },

  // Honk sound effect (visual)
  honk() {
    const horn = document.createElement('div');
    horn.textContent = '📢';
    horn.style.cssText = `
      position: fixed;
      left: ${this.element.style.left};
      bottom: 20%;
      font-size: 24px;
      z-index: 9999;
      animation: honk-fade 0.5s ease;
    `;
    document.body.appendChild(horn);
    
    setTimeout(() => horn.remove(), 500);
  },

  // Carry command output
  carryOutput(output) {
    this.driveAcross('truck', output);
  },

  hide() {
    if (this.element) {
      this.element.style.display = 'none';
      this.element.innerHTML = this.types[this.currentType];
    }
  }
};

// Add CSS animations
const carsStyle = document.createElement('style');
carsStyle.textContent = `
  @keyframes honk-fade {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.5) translateY(-20px); }
  }
`;
document.head.appendChild(carsStyle);
