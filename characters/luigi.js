/* 
  Luigi Character - Support Hero
  Waves from right, looks around nervously, thumbs up on success
*/

window.LuigiCharacter = {
  element: null,
  state: 'idle',
  position: { x: 80, y: 80 },

  init() {
    this.element = document.createElement('div');
    this.element.id = 'luigi-character';
    this.element.innerHTML = '🟢';
    this.element.style.cssText = `
      position: fixed;
      font-size: 48px;
      z-index: 9998;
      pointer-events: none;
      transition: all 0.5s ease;
      display: none;
    `;
    document.body.appendChild(this.element);
    
    console.log('🟢 Luigi Character initialized');
  },

  // Luigi enters from right, waving
  enter() {
    if (!this.element) this.init();
    
    this.state = 'entering';
    this.element.style.display = 'block';
    this.element.style.right = '-50px';
    this.element.style.bottom = '10%';
    
    setTimeout(() => {
      this.element.style.right = '10%';
      this.state = 'idle';
      this.startIdleAnimation();
    }, 100);
  },

  // Idle animation - looks around nervously
  startIdleAnimation() {
    if (this.state !== 'idle') return;
    
    const lookInterval = setInterval(() => {
      if (this.state !== 'idle') {
        clearInterval(lookInterval);
        return;
      }
      this.lookAround();
    }, 2500);
  },

  // Look around animation
  lookAround() {
    this.element.style.transform = 'rotate(-15deg)';
    setTimeout(() => {
      this.element.style.transform = 'rotate(15deg)';
    }, 250);
    setTimeout(() => {
      this.element.style.transform = 'rotate(0deg)';
    }, 500);
  },

  // Thumbs up on success
  onSuccess() {
    this.state = 'success';
    this.element.innerHTML = '👍';
    
    setTimeout(() => {
      this.element.innerHTML = '🟢';
      this.state = 'idle';
    }, 1000);
  },

  // Shrug on error
  onError() {
    this.state = 'error';
    this.element.innerHTML = '🤷';
    
    setTimeout(() => {
      this.element.innerHTML = '🟢';
      this.state = 'idle';
    }, 1000);
  },

  hide() {
    if (this.element) {
      this.element.style.display = 'none';
      this.state = 'idle';
    }
  }
};
