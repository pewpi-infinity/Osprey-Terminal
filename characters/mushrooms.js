/* 
  🍄 Mushrooms Character - Power-Up System
  Floats down, doubles command speed on click, code compression effect
*/

window.MushroomsCharacter = {
  mushrooms: [],
  spawnInterval: null,

  init() {
    console.log('🍄 Mushrooms Character System initialized');
    this.startSpawning();
  },

  // Start spawning mushrooms periodically
  startSpawning() {
    this.spawnInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        this.spawn();
      }
    }, 10000);
  },

  stopSpawning() {
    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
    }
  },

  // Spawn a mushroom
  spawn() {
    const mushroom = document.createElement('div');
    mushroom.className = 'mushroom-powerup';
    mushroom.innerHTML = '🍄';
    mushroom.style.cssText = `
      position: fixed;
      font-size: 32px;
      z-index: 9999;
      cursor: pointer;
      left: ${Math.random() * 80 + 10}%;
      top: -50px;
      animation: mushroom-float-down 3s ease-out forwards;
    `;
    
    // Click handler - doubles charge
    mushroom.addEventListener('click', () => {
      this.onMushroomClick(mushroom);
    });
    
    document.body.appendChild(mushroom);
    this.mushrooms.push(mushroom);
    
    // Remove after animation
    setTimeout(() => {
      if (mushroom.parentNode) {
        mushroom.remove();
      }
      const index = this.mushrooms.indexOf(mushroom);
      if (index > -1) {
        this.mushrooms.splice(index, 1);
      }
    }, 3000);
  },

  // Handle mushroom click
  onMushroomClick(mushroom) {
    // Trigger physics system mushroom effect
    if (window.TerminalPhysics) {
      TerminalPhysics.onMushroomClick();
    }
    
    // Visual effect
    mushroom.style.animation = 'mushroom-collect 0.5s ease';
    
    // Show power-up text
    const powerText = document.createElement('div');
    powerText.textContent = '2X SPEED!';
    powerText.style.cssText = `
      position: fixed;
      left: ${mushroom.style.left};
      top: ${mushroom.getBoundingClientRect().top}px;
      color: #ffff00;
      font-weight: bold;
      font-size: 20px;
      z-index: 10000;
      animation: powerup-text 1s ease;
      pointer-events: none;
    `;
    document.body.appendChild(powerText);
    
    setTimeout(() => {
      powerText.remove();
      mushroom.remove();
    }, 1000);
  },

  // Force spawn a mushroom (for commands)
  forceSpawn() {
    this.spawn();
  },

  // Clear all mushrooms
  clearAll() {
    this.mushrooms.forEach(m => {
      if (m.parentNode) {
        m.remove();
      }
    });
    this.mushrooms = [];
  }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes mushroom-float-down {
    0% { top: -50px; opacity: 1; }
    80% { opacity: 1; }
    100% { top: calc(100vh - 100px); opacity: 0.5; }
  }
  
  @keyframes mushroom-collect {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }
  
  @keyframes powerup-text {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-30px); }
  }
`;
document.head.appendChild(style);

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MushroomsCharacter.init());
} else {
  MushroomsCharacter.init();
}
