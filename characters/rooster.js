/* 
  🐓 Rooster Character - Morning Herald
  Crows at sunrise/build start, pecks at bugs, flaps on success
*/

window.RoosterCharacter = {
  element: null,
  state: 'idle',
  position: { x: 50, y: 70 },

  init() {
    this.element = document.createElement('div');
    this.element.id = 'rooster-character';
    this.element.innerHTML = '🐓';
    this.element.style.cssText = `
      position: fixed;
      font-size: 48px;
      z-index: 9998;
      pointer-events: none;
      transition: all 0.5s ease;
      display: none;
    `;
    document.body.appendChild(this.element);
    
    console.log('🐓 Rooster Character initialized');
  },

  // Rooster enters center stage
  enter() {
    if (!this.element) this.init();
    
    this.state = 'entering';
    this.element.style.display = 'block';
    this.element.style.left = '50%';
    this.element.style.transform = 'translateX(-50%)';
    this.element.style.bottom = '30%';
    this.state = 'idle';
  },

  // Crow at sunrise (build start)
  crow() {
    this.state = 'crowing';
    
    // Animation: bob up and down
    this.element.style.animation = 'rooster-crow 1s ease 3';
    
    // Show crow text
    const crowText = document.createElement('div');
    crowText.textContent = 'COCK-A-DOODLE-DOO!';
    crowText.style.cssText = `
      position: fixed;
      left: 50%;
      bottom: 40%;
      transform: translateX(-50%);
      color: #ffd700;
      font-weight: bold;
      font-size: 24px;
      z-index: 9999;
      animation: crow-text 2s ease;
      pointer-events: none;
    `;
    document.body.appendChild(crowText);
    
    setTimeout(() => {
      this.element.style.animation = 'none';
      this.state = 'idle';
      crowText.remove();
    }, 3000);
  },

  // Peck at bugs (errors/issues)
  peckAtBugs() {
    this.state = 'pecking';
    
    this.element.style.animation = 'rooster-peck 0.5s ease 5';
    
    // Show bug being pecked
    const bug = document.createElement('div');
    bug.textContent = '🐛';
    bug.style.cssText = `
      position: fixed;
      left: calc(50% + 30px);
      bottom: 25%;
      font-size: 24px;
      z-index: 9997;
      animation: bug-escape 2.5s ease;
    `;
    document.body.appendChild(bug);
    
    setTimeout(() => {
      this.element.style.animation = 'none';
      this.state = 'idle';
      bug.remove();
    }, 2500);
  },

  // Flap wings on success
  flapWings() {
    this.state = 'flapping';
    
    this.element.style.animation = 'rooster-flap 0.5s ease 3';
    
    // Show success indicator
    const success = document.createElement('div');
    success.textContent = '✨';
    success.style.cssText = `
      position: fixed;
      left: 50%;
      bottom: 40%;
      transform: translateX(-50%);
      font-size: 32px;
      z-index: 9999;
      animation: success-sparkle 1.5s ease;
      pointer-events: none;
    `;
    document.body.appendChild(success);
    
    setTimeout(() => {
      this.element.style.animation = 'none';
      this.state = 'idle';
      success.remove();
    }, 1500);
  },

  hide() {
    if (this.element) {
      this.element.style.display = 'none';
      this.state = 'idle';
    }
  }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes rooster-crow {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-10px); }
  }
  
  @keyframes rooster-peck {
    0%, 100% { transform: translateX(-50%) rotate(0deg); }
    50% { transform: translateX(-50%) rotate(-20deg); }
  }
  
  @keyframes rooster-flap {
    0%, 100% { transform: translateX(-50%) scale(1); }
    50% { transform: translateX(-50%) scale(1.2); }
  }
  
  @keyframes crow-text {
    0% { opacity: 0; transform: translateX(-50%) scale(0.5); }
    20% { opacity: 1; transform: translateX(-50%) scale(1); }
    80% { opacity: 1; }
    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  }
  
  @keyframes bug-escape {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-100px) translateX(50px); }
  }
  
  @keyframes success-sparkle {
    0% { opacity: 0; transform: translateX(-50%) scale(0); }
    50% { opacity: 1; transform: translateX(-50%) scale(1.5); }
    100% { opacity: 0; transform: translateX(-50%) scale(1); }
  }
`;
document.head.appendChild(style);
