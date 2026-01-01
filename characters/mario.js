/* 
  🍄 Mario Character - Platform Hero
  Walks from left, jumps occasionally, star collect on success
*/

window.MarioCharacter = {
  element: null,
  state: 'idle',
  position: { x: 10, y: 80 },

  init() {
    this.element = document.createElement('div');
    this.element.id = 'mario-character';
    this.element.innerHTML = '🍄';
    this.element.style.cssText = `
      position: fixed;
      font-size: 48px;
      z-index: 9998;
      pointer-events: none;
      transition: all 0.5s ease;
      display: none;
    `;
    document.body.appendChild(this.element);
    
    console.log('🍄 Mario Character initialized');
  },

  // Mario enters from left
  enter() {
    if (!this.element) this.init();
    
    this.state = 'entering';
    this.element.style.display = 'block';
    this.element.style.left = '-50px';
    this.element.style.bottom = '10%';
    
    setTimeout(() => {
      this.element.style.left = '10%';
      this.state = 'idle';
      this.startIdleAnimation();
    }, 100);
  },

  // Idle animation - jumps occasionally
  startIdleAnimation() {
    if (this.state !== 'idle') return;
    
    const jumpInterval = setInterval(() => {
      if (this.state !== 'idle') {
        clearInterval(jumpInterval);
        return;
      }
      this.jump();
    }, 3000);
  },

  // Jump animation
  jump() {
    const currentBottom = this.element.style.bottom;
    this.element.style.transition = 'bottom 0.3s ease';
    this.element.style.bottom = '20%';
    
    setTimeout(() => {
      this.element.style.bottom = currentBottom;
    }, 300);
  },

  // Star collect animation on success
  onSuccess() {
    this.state = 'success';
    this.element.innerHTML = '⭐';
    this.element.style.animation = 'mario-star-collect 1s ease';
    
    setTimeout(() => {
      this.element.innerHTML = '🍄';
      this.state = 'idle';
      this.element.style.animation = 'none';
    }, 1000);
  },

  // Trip and recover on error
  onError() {
    this.state = 'error';
    this.element.style.transform = 'rotate(90deg)';
    
    setTimeout(() => {
      this.element.style.transform = 'rotate(0deg)';
      this.state = 'idle';
    }, 500);
  },

  hide() {
    if (this.element) {
      this.element.style.display = 'none';
      this.state = 'idle';
    }
  }
};

// Add CSS animations
const marioStyle = document.createElement('style');
marioStyle.textContent = `
  @keyframes mario-star-collect {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.5) rotate(180deg); }
    100% { transform: scale(1) rotate(360deg); }
  }
`;
document.head.appendChild(marioStyle);
