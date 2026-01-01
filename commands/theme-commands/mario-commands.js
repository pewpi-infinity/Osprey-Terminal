/* 
  🍄 Mario Theme Commands
  mario:jump, mario:power-up, mario:coin
*/

window.MarioCommands = {
  'mario:jump'(args) {
    // Jump to directory (visual effect)
    if (window.MarioCharacter) {
      if (!MarioCharacter.element || MarioCharacter.element.style.display === 'none') {
        MarioCharacter.enter();
      }
      MarioCharacter.jump();
    }
    
    const dir = args.length > 0 ? args[0] : '.';
    return `Mario jumps to: ${dir}\n🍄 *boing*`;
  },

  'mario:power-up'() {
    // Boost performance (spawn mushroom)
    if (window.MushroomsCharacter) {
      MushroomsCharacter.forceSpawn();
    }
    
    if (window.MarioCharacter) {
      if (!MarioCharacter.element || MarioCharacter.element.style.display === 'none') {
        MarioCharacter.enter();
      }
    }
    
    return '🍄 Power-up collected! Performance boost active!\n⚡ Command execution speed doubled!';
  },

  'mario:coin'() {
    // Collect achievement
    if (window.MarioCharacter) {
      if (!MarioCharacter.element || MarioCharacter.element.style.display === 'none') {
        MarioCharacter.enter();
      }
      MarioCharacter.onSuccess();
    }
    
    return '🪙 Coin collected! Achievement unlocked!\n✨ +100 points';
  },

  'mario:show'() {
    if (window.MarioCharacter) {
      MarioCharacter.enter();
      return '🍄 Mario has entered the terminal!';
    }
    return 'Mario character not loaded';
  },

  'mario:hide'() {
    if (window.MarioCharacter) {
      MarioCharacter.hide();
      return '🍄 Mario has left the terminal';
    }
    return 'Mario character not loaded';
  }
};
