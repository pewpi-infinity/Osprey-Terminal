/* Infinity Shell — Osprey Terminal v2
   Complete Unified Command Engine
   Natural-Language Ready
   Kris Watson Architecture
*/

const output = document.getElementById("output");
const inputLine = document.getElementById("input-line");

function print(text) {
  output.innerHTML += text + "<br>";
  output.scrollTop = output.scrollHeight;
}

function loadApp(path) {
  const script = document.createElement("script");
  script.src = path + "?v=" + Date.now(); // cache-bust
  document.body.appendChild(script);
}

const commands = {
  help() {
    print("Available commands:");
    print(" • help — list commands");
    print(" • ls — list directory");
    print(" • clear — clear terminal");
    print(" • rogers — open Rogers AI panel");
    print(" • about — system info");
    print(" • open apps — list installed apps");
    print(" • run quantum — launch Quantum Visualizer");
    print(" • intelligent — activate Intelligence Core");
  },

  ls() {
    print("os/  apps/  assets/  index.html  shell.js  rogers.js");
  },

  clear() {
    output.innerHTML = "";
  },

  rogers() {
    document.getElementById("rogers-panel").style.display = "block";
    print("Opening Rogers AI panel…");
  },

  about() {
    print("Infinity Shell — Osprey Terminal v2");
    print("Self-writing architecture enabled.");
    print("Quantum-ready. PewPi-ready.");
    print("Powered by Kris Watson × Infinity OS.");
  },

  "open apps"() {
    print("Installed apps:");
    print(" • quantum.js — Quantum Field Visualizer");
  },

  "run quantum"() {
    print("Launching Quantum Visualizer…");
    loadApp("apps/quantum.js");
  },

  intelligent() {
    print("Intelligence Core activated. Speak your update.");
    IntelligenceCore.speak("Listening for natural-language instructions…");
  }
};

inputLine.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = inputLine.value.trim();
    print(`<span style="color:#00eaff;">$</span> ${cmd}`);

    // Command handler
    if (commands[cmd]) {
      commands[cmd]();
    } 
    
    // Language routing
    else if (window.IntelligenceCore) {
      IntelligenceCore.interpret(cmd);
    }
    
    else {
      print(`Command not found: ${cmd}`);
    }

    inputLine.value = "";
  }
});
