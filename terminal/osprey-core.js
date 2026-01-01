/* 
  🦅 Osprey Core - Main Terminal Character System
  Osprey flies across terminal, carries messages, swoops on command completion
*/

window.OspreyCore = {
  initialized: false,
  position: { x: 0, y: 0 },
  state: 'idle', // idle, flying, carrying, landing
  message: null,
  element: null,

  init() {
    if (this.initialized) return;
    
    // Create Osprey element
    this.element = document.createElement('div');
    this.element.id = 'osprey-character';
    this.element.innerHTML = '🦅';
    this.element.style.cssText = `
      position: fixed;
      font-size: 32px;
      z-index: 10000;
      pointer-events: none;
      transition: all 0.3s ease;
      display: none;
    `;
    document.body.appendChild(this.element);
    
    this.initialized = true;
    console.log('🦅 Osprey Core initialized');
  },

  // Osprey enters from top
  enter(targetX = 50, targetY = 10) {
    if (!this.element) this.init();
    
    this.state = 'flying';
    this.element.style.display = 'block';
    this.element.style.left = targetX + '%';
    this.element.style.top = '-50px';
    
    // Fly down
    setTimeout(() => {
      this.element.style.top = targetY + '%';
      this.position = { x: targetX, y: targetY };
    }, 50);
  },

  // Circle while processing
  circle() {
    if (!this.element || this.state !== 'flying') return;
    
    this.element.style.animation = 'osprey-circle 2s linear infinite';
  },

  // Carry message between characters
  carryMessage(message, fromX, fromY, toX, toY) {
    this.message = message;
    this.state = 'carrying';
    
    // Move Osprey from start to end position
    this.element.style.left = fromX + '%';
    this.element.style.top = fromY + '%';
    
    setTimeout(() => {
      this.element.style.left = toX + '%';
      this.element.style.top = toY + '%';
    }, 100);
    
    // Clear message after delivery
    setTimeout(() => {
      this.message = null;
      this.state = 'flying';
    }, 1500);
  },

  // Land on completion
  land() {
    this.state = 'landing';
    this.element.style.animation = 'osprey-land 1s ease-out';
    
    setTimeout(() => {
      this.state = 'idle';
      this.element.style.animation = 'none';
    }, 1000);
  },

  // Swoop on command completion
  swoop() {
    const startY = this.position.y;
    this.element.style.top = (startY + 10) + '%';
    
    setTimeout(() => {
      this.element.style.top = startY + '%';
    }, 300);
  },

  // Hide Osprey
  hide() {
    if (this.element) {
      this.element.style.display = 'none';
      this.state = 'idle';
    }
  }
};

// Add CSS animations
const ospreyStyle = document.createElement('style');
ospreyStyle.textContent = `
  @keyframes osprey-circle {
    0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
  }
  
  @keyframes osprey-land {
    0% { transform: translateY(0); }
    50% { transform: translateY(20px); }
    100% { transform: translateY(0); }
  }
`;
document.head.appendChild(ospreyStyle);

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => OspreyCore.init());
} else {
  OspreyCore.init();
}
