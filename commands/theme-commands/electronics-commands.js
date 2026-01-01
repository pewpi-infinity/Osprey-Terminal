/* 
  ⚡ Electronics Theme Commands
  elec:signal, elec:scope, elec:build
*/

window.ElectronicsCommands = {
  'elec:signal'(args) {
    const frequency = args.length > 0 ? args[0] : '440';
    
    // Visual signal wave
    const output = document.getElementById('output');
    if (output) {
      const wave = document.createElement('div');
      wave.textContent = '～～～～～～～～～～';
      wave.style.color = '#00ff00';
      wave.style.animation = 'signal-wave 1s linear infinite';
      output.appendChild(wave);
      
      setTimeout(() => wave.remove(), 3000);
    }
    
    return `⚡ Generating ${frequency}Hz signal...\n📊 Waveform: Sine\n🔊 Amplitude: 1.0V`;
  },

  'elec:scope'() {
    // Open oscilloscope view
    return `⚡ Oscilloscope Mode Activated
    
╔════════════════════════════╗
║     ～～～～～～～～～     ║
║   ～         ～         ～  ║
║  ～           ～           ～║
║ ～             ～           ║
╚════════════════════════════╝

📊 Timebase: 1ms/div
📈 Voltage: 1V/div
⚡ Trigger: Rising edge`;
  },

  'elec:build'() {
    // Build circuit animation
    if (window.RoosterCharacter) {
      RoosterCharacter.enter();
      setTimeout(() => RoosterCharacter.crow(), 500);
    }
    
    if (window.OspreyCharacter) {
      OspreyCharacter.processingCommand();
    }
    
    setTimeout(() => {
      if (window.RoosterCharacter) {
        RoosterCharacter.flapWings();
      }
      if (window.OspreyCharacter) {
        OspreyCharacter.commandComplete(true);
      }
    }, 2000);
    
    return `⚡ Building circuit...
🔌 Connecting components...
🔧 Soldering joints...
✅ Circuit build complete!`;
  },

  'elec:voltage'(args) {
    const pin = args.length > 0 ? args[0] : 'A0';
    const voltage = (Math.random() * 5).toFixed(2);
    
    return `⚡ Reading voltage from ${pin}:\n📊 ${voltage}V`;
  },

  'elec:current'(args) {
    const circuit = args.length > 0 ? args[0] : 'main';
    const current = (Math.random() * 2).toFixed(3);
    
    return `⚡ Measuring current in ${circuit}:\n📊 ${current}A`;
  }
};
