/* 
  🧪 Chemistry Theme Commands
  chem:mix, chem:balance, chem:react
*/

window.ChemistryCommands = {
  'chem:mix'(args) {
    if (args.length < 2) {
      return '🧪 Usage: chem:mix <compound1> <compound2>\nExample: chem:mix H2 O2';
    }
    
    const compound1 = args[0];
    const compound2 = args[1];
    
    // Simulate reaction
    return `🧪 Mixing ${compound1} + ${compound2}...
    
⚗️ Reaction in progress...
${compound1} + ${compound2} → Product

🔬 Observations:
  • Color change detected
  • Temperature: +5°C
  • pH: 7.2

✅ Mixture complete!`;
  },

  'chem:balance'(args) {
    if (args.length === 0) {
      return '🧪 Usage: chem:balance <equation>\nExample: chem:balance H2+O2->H2O';
    }
    
    const equation = args.join(' ');
    
    return `🧪 Balancing equation: ${equation}

⚗️ Analyzing reactants and products...
🔬 Calculating stoichiometry...

Balanced equation:
2H₂ + O₂ → 2H₂O

✅ Equation balanced!`;
  },

  'chem:react'() {
    // Run reaction animation
    const output = document.getElementById('output');
    if (output) {
      const flask = document.createElement('div');
      flask.textContent = '🧪💨✨';
      flask.style.animation = 'reaction-bubble 2s ease';
      output.appendChild(flask);
      
      setTimeout(() => flask.remove(), 2000);
    }
    
    return `🧪 Running chemical reaction...

⚗️ Stage 1: Mixing reactants
⚗️ Stage 2: Heating solution
⚗️ Stage 3: Cooling precipitate

📊 Results:
  • Yield: 95.3%
  • Purity: 99.1%
  • Color: Clear
  • State: Solid

✅ Reaction complete!`;
  },

  'chem:ph'(args) {
    const solution = args.length > 0 ? args.join(' ') : 'sample';
    const ph = (Math.random() * 14).toFixed(1);
    
    let type = 'neutral';
    if (ph < 7) type = 'acidic';
    else if (ph > 7) type = 'basic';
    
    return `🧪 Testing pH of ${solution}:\n📊 pH = ${ph} (${type})`;
  },

  'chem:formula'(args) {
    const compound = args.length > 0 ? args.join(' ') : 'water';
    
    const formulas = {
      'water': 'H₂O',
      'salt': 'NaCl',
      'sugar': 'C₁₂H₂₂O₁₁',
      'oxygen': 'O₂',
      'carbon dioxide': 'CO₂'
    };
    
    const formula = formulas[compound.toLowerCase()] || 'Unknown';
    
    return `🧪 Molecular formula for ${compound}:\n📊 ${formula}`;
  }
};

// Add CSS for reaction animation
const chemStyle = document.createElement('style');
chemStyle.textContent = `
  @keyframes reaction-bubble {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.2); }
    100% { opacity: 0; transform: scale(1.5) translateY(-20px); }
  }
  
  @keyframes signal-wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(-20px); }
  }
`;
document.head.appendChild(chemStyle);
