/* Infinity Shell — Osprey Terminal v3
   Now aware of:
   - Exec Engine
   - Intelligence Core
   - Rogers AI
*/

document.addEventListener("DOMContentLoaded", async () => {
  // Wait for Exec to initialize if possible (avoid race conditions on mobile)
  if (window.Exec && Exec.readyPromise) {
    try { await Exec.readyPromise; } catch (_) { /* continue even if Exec init failed */ }
  }

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
      print(" • ls — filesystem list");
      print(" • exec — run hybrid engine");
      print(" • clear — clear screen");
      print(" • rogers — open Rogers AI panel");
      print(" • intelligent — activate AI brain");
      print(" • run quantum — launch Quantum Visualizer");
      print(" • open apps — list installed apps");
      print("");
      print("🎨 Theme Commands:");
      print(" • theme [name] — switch theme");
      print(" • theme:next — next theme");
      print(" • theme:prev — previous theme");
      print(" • theme:list — list all themes");
      print("");
      print("🍄 Mario Commands:");
      print(" • mario:jump [dir] — jump to directory");
      print(" • mario:power-up — boost performance");
      print(" • mario:coin — collect achievement");
      print("");
      print("⚡ Electronics Commands:");
      print(" • elec:signal [freq] — generate signal");
      print(" • elec:scope — oscilloscope view");
      print(" • elec:build — build circuit");
      print("");
      print("🧪 Chemistry Commands:");
      print(" • chem:mix <A> <B> — mix compounds");
      print(" • chem:balance <eq> — balance equation");
      print(" • chem:react — run reaction");
      print("");
      print("🤖 Robotics Commands:");
      print(" • robot:program — program robot");
      print(" • robot:auto — run automation");
      print(" • robot:sensors — check sensors");
      print("");
      print("🧱 Token Commands:");
      print(" • token:apply <formula> — apply token");
      print(" • token:combine <A> <B> — combine tokens");
      print(" • token:value — show token value");
      print("");
      print("🦅 Osprey Commands:");
      print(" • osprey:fly — make osprey fly");
      print(" • osprey:message-mario — send message to Mario");
      print("");
      print("🧱 Token Commands:");
      print(" • token:value — show real-time token value");
      print(" • token:metrics — view activity metrics");
      print(" • token:breakdown — detailed value breakdown");
      print(" • token:usd — USD conversion reference");
      print("");
      print("🦎 Mongoose AI Commands:");
      print(" • mongoose:status — AI reasoning report");
      print(" • mongoose:suggest — get AI suggestion");
      print(" • mongoose:theme — AI theme recommendation");
      print(" • mongoose:help — full mongoose commands");
    },

    ls() {
      if (window.Exec && Exec.fs) {
        const keys = Object.keys(Exec.fs);
        print(keys.length ? keys.join("<br>") : "(empty)");
      } else {
        print("(filesystem not initialized)");
      }
    },

    clear() {
      output.innerHTML = "";
    },

    rogers() {
      const panel = document.getElementById("rogers-panel");
      if (panel) panel.style.display = "block";
      print("Opening Rogers AI panel…");
    },

    intelligent() {
      if (window.IntelligenceCore) {
        print("Activating Intelligence Core…");
        IntelligenceCore.active = true;
        if (IntelligenceCore.speak) IntelligenceCore.speak("Ready.");
      } else {
        print("Intelligence Core not loaded.");
      }
    },

    "run quantum"() {
      print("Launching Quantum Visualizer…");
      loadApp("apps/quantum.js");
    },

    exec() {
      if (!window.Exec) {
        print("Exec Engine not loaded yet.");
        return;
      }
      print("Exec Engine ready. Use commands like:");
      print(" • write file.txt Hello");
      print(" • cat file.txt");
      print(" • python print(42)");
      print(" • node console.log(\"hi\")");
    },

    "open apps"() {
      print("Installed apps:");
      print(" • intelligence-core.js — AI Brain");
      print(" • exec-engine.js — Hybrid Execution Layer");
      print(" • quantum.js — Quantum Visualizer");
    }
  };

  inputLine.addEventListener("keydown", async e => {
    if (e.key === "Enter") {
      const cmd = inputLine.value.trim();
      if (!cmd) return;
      
      // Get theme-specific prompt
      const prompt = window.TerminalEngine ? TerminalEngine.getPrompt() : '$';
      print(`<span style="color:#00eaff;">${prompt}</span> ${cmd}`);

      // Add to joystick history
      if (window.JoystickControls) {
        JoystickControls.addToHistory(cmd);
      }

      // Add to terminal engine history
      if (window.TerminalEngine) {
        TerminalEngine.saveToHistory(TerminalEngine.currentTheme, cmd);
      }

      // Parse command
      const parts = cmd.split(" ");
      const base = parts[0];
      const args = parts.slice(1);

      // Check Terminal Engine commands first (theme switching)
      if (window.TerminalEngine) {
        const result = TerminalEngine.handleCommand(base, args);
        if (result !== null) {
          print(result);
          inputLine.value = "";
          return;
        }
      }

      // Check theme-specific commands
      if (window.MarioCommands && MarioCommands[base]) {
        print(MarioCommands[base](args));
        inputLine.value = "";
        return;
      }
      if (window.ElectronicsCommands && ElectronicsCommands[base]) {
        print(ElectronicsCommands[base](args));
        inputLine.value = "";
        return;
      }
      if (window.ChemistryCommands && ChemistryCommands[base]) {
        print(ChemistryCommands[base](args));
        inputLine.value = "";
        return;
      }
      if (window.RoboticsCommands && RoboticsCommands[base]) {
        print(RoboticsCommands[base](args));
        inputLine.value = "";
        return;
      }
      if (window.TokenCommands && TokenCommands[base]) {
        print(TokenCommands[base](args));
        inputLine.value = "";
        return;
      }
      if (window.OspreyCommands && OspreyCommands[base]) {
        print(OspreyCommands[base](args));
        inputLine.value = "";
        return;
      }
      // ADDITIVE: Mongoose AI commands
      if (window.MongooseCommands && MongooseCommands[base]) {
        // Record command in Mongoose AI for pattern learning
        if (window.MongooseOS) {
          MongooseOS.analyzeCommand(base, args);
        }
        print(MongooseCommands[base](args));
        inputLine.value = "";
        return;
      }

      // ADDITIVE: Record command execution for token valuation and AI learning
      if (window.TokenValuation) {
        TokenValuation.recordCommand(base);
      }
      if (window.MongooseOS) {
        MongooseOS.analyzeCommand(base, args);
      }

      // Check Exec Engine for Linux-style commands
      if (window.Exec && Exec.handle) {
        try {
          const result = await Exec.handle(base, args);
          if (result !== "Unknown command. Try 'help'") {
            print(result);
            inputLine.value = "";
            return;
          }
        } catch (err) {
          print("Exec call error: " + (err && err.message ? err.message : err));
          inputLine.value = "";
          return;
        }
      }

      // Fallback to built-in commands
      if (commands[cmd]) {
        commands[cmd]();
      } 
      else if (window.RogersCommands && RogersCommands[cmd]) {
        RogersCommands[cmd]();
      }
      else if (window.IntelligenceCore) {
        IntelligenceCore.interpret(cmd);
      } 
      else {
        print(`Command not found: ${cmd}`);
      }

      inputLine.value = "";
    }
  });

  // If Rogers exists, ensure it initializes its panel display text (rogers.js will call init on DOMContentLoaded itself)
  if (window.Rogers && Rogers.init) {
    try { Rogers.init(); } catch (_) { /* ignore */ }
  }
});