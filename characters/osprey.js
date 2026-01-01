/* 
  🦅 Osprey Character - Main Flying Messenger
  Already implemented in terminal/osprey-core.js
  This file provides additional integration and commands
*/

window.OspreyCharacter = {
  // Extended Osprey functionality
  
  // Interact with Mario
  messageToMario(message) {
    if (window.OspreyCore && window.MarioCharacter) {
      // Show Mario if not visible
      if (!MarioCharacter.element || MarioCharacter.element.style.display === 'none') {
        MarioCharacter.enter();
      }
      
      // Osprey carries message to Mario
      OspreyCore.enter(50, 20);
      setTimeout(() => {
        OspreyCore.carryMessage(message, 50, 20, 10, 80);
      }, 500);
    }
  },

  // Interact with Luigi
  messageToLuigi(message) {
    if (window.OspreyCore && window.LuigiCharacter) {
      // Show Luigi if not visible
      if (!LuigiCharacter.element || LuigiCharacter.element.style.display === 'none') {
        LuigiCharacter.enter();
      }
      
      // Osprey carries message to Luigi
      OspreyCore.enter(50, 20);
      setTimeout(() => {
        OspreyCore.carryMessage(message, 50, 20, 80, 80);
      }, 500);
    }
  },

  // Interact with Rooster
  messageToRooster(message) {
    if (window.OspreyCore && window.RoosterCharacter) {
      // Show Rooster if not visible
      if (!RoosterCharacter.element || RoosterCharacter.element.style.display === 'none') {
        RoosterCharacter.enter();
      }
      
      // Osprey carries message to Rooster
      OspreyCore.enter(50, 20);
      setTimeout(() => {
        OspreyCore.carryMessage(message, 50, 20, 50, 70);
      }, 500);
    }
  },

  // Command processing animation
  processingCommand() {
    if (window.OspreyCore) {
      OspreyCore.enter(50, 30);
      OspreyCore.circle();
    }
  },

  // Command complete animation
  commandComplete(success = true) {
    if (window.OspreyCore) {
      if (success) {
        OspreyCore.swoop();
        setTimeout(() => OspreyCore.land(), 300);
      } else {
        // On error, just land
        OspreyCore.land();
      }
      
      // Hide after a moment
      setTimeout(() => OspreyCore.hide(), 2000);
    }
  }
};

// Expose commands
window.OspreyCommands = {
  'osprey:fly'() {
    if (window.OspreyCore) {
      OspreyCore.enter(50, 30);
      return 'Osprey flying...';
    }
    return 'Osprey not available';
  },
  
  'osprey:message-mario'(message) {
    OspreyCharacter.messageToMario(message || 'Hello Mario!');
    return 'Osprey delivering message to Mario...';
  },
  
  'osprey:message-luigi'(message) {
    OspreyCharacter.messageToLuigi(message || 'Hello Luigi!');
    return 'Osprey delivering message to Luigi...';
  },
  
  'osprey:land'() {
    if (window.OspreyCore) {
      OspreyCore.land();
      return 'Osprey landing...';
    }
    return 'Osprey not available';
  }
};
