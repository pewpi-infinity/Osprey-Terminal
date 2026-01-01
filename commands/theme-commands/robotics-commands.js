/* 
  🤖 Robotics Theme Commands
  robot:program, robot:auto, robot:sensors
*/

window.RoboticsCommands = {
  'robot:program'(args) {
    const program = args.length > 0 ? args.join(' ') : 'default';
    
    return `🤖 Programming robot: ${program}

📋 Loading program...
🔧 Compiling code...
📤 Uploading to robot...
✅ Program uploaded successfully!

🤖 Robot ready for execution`;
  },

  'robot:auto'() {
    // Run automation with Rooster crow
    if (window.RoosterCharacter) {
      RoosterCharacter.enter();
      setTimeout(() => RoosterCharacter.crow(), 500);
    }
    
    return `🤖 Running automation sequence...

⚙️ Step 1: Initialize systems
⚙️ Step 2: Load configuration
⚙️ Step 3: Start main loop
⚙️ Step 4: Execute tasks

📊 Status: Running
🔄 Loop count: 1000
✅ Automation active`;
  },

  'robot:sensors'() {
    // Generate random sensor data
    const temp = (20 + Math.random() * 10).toFixed(1);
    const distance = (Math.random() * 200).toFixed(0);
    const battery = (80 + Math.random() * 20).toFixed(0);
    
    return `🤖 Sensor readings:

🌡️  Temperature: ${temp}°C
📏 Distance: ${distance}cm
🔋 Battery: ${battery}%
⚡ Voltage: 12.${Math.floor(Math.random() * 9)}V
🧭 Heading: ${Math.floor(Math.random() * 360)}°

✅ All sensors operational`;
  },

  'robot:move'(args) {
    const direction = args.length > 0 ? args[0] : 'forward';
    const distance = args.length > 1 ? args[1] : '10';
    
    // Car drives across when robot moves
    if (window.CarsCharacter) {
      CarsCharacter.driveAcross('sports');
    }
    
    return `🤖 Moving ${direction} ${distance}cm...\n🚗 *whirrrr*\n✅ Movement complete`;
  },

  'robot:status'() {
    return `🤖 Robot Status:

💡 State: Active
🔋 Power: 95%
📡 Connection: Strong
⚙️  Motors: Operational
👀 Vision: Online
🧠 AI: Ready

✅ All systems nominal`;
  }
};
