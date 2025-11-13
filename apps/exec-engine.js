/*  
   Infinity EXECUTION ENGINE — Hybrid Runtime v1
   ----------------------------------------------
   - JS Runtime (Node-lite)
   - Python Runtime (Pyodide)
   - Virtual Linux-style filesystem
   - POSIX commands: ls, cat, mkdir, rm, run, python, node
   - GitHub Repo Loader
   - Auto-restore points
   - Rogers + IntelligenceCore integrated
   - Designed for Osprey Terminal × Kris Watson Infinity OS
*/

window.Exec = {
  
  fs: {}, // Virtual filesystem
  pyReady: false,
  jsContext: {},

  async init() {
    Rogers.say("[minor] Initializing Exec Engine…");

    // --- Load Pyodide (Python runtime) ---
    try {
      this.pyodide = await loadPyodide();
      this.pyReady = true;
      Rogers.say("Python engine ready.");
    } catch (e) {
      Rogers.say("Python load error: " + e);
    }

    Rogers.say("Exec Engine active.");
  },

  /* ----------------------------
        FILESYSTEM LAYER
  ----------------------------*/
  writeFile(path, content) {
    this.fs[path] = content;
    IntelligenceCore.saveRestorePoint();
  },

  readFile(path) {
    return this.fs[path] || null;
  },

  deleteFile(path) {
    delete this.fs[path];
    IntelligenceCore.saveRestorePoint();
  },

  /* ----------------------------
     JS EXECUTION (Node-lite)
  ----------------------------*/
  execJS(code) {
    try {
      const result = Function("ctx", code)(this.jsContext);
      return result === undefined ? "(ok)" : result.toString();
    } catch (e) {
      return "JS Error: " + e;
    }
  },

  /* ----------------------------
     PYTHON EXECUTION (Pyodide)
  ----------------------------*/
  async execPython(code) {
    if (!this.pyReady) return "Python not ready.";
    try {
      return await this.pyodide.runPythonAsync(code);
    } catch (e) {
      return "Python Error: " + e;
    }
  },

  /* ----------------------------
        GITHUB LOADER
  ----------------------------*/
  async loadGithub(url) {
    Rogers.say("Loading repo: " + url);

    try {
      const res = await fetch(url);
      const txt = await res.text();
      const fileName = url.split("/").pop();
      this.writeFile(fileName, txt);
      return `Loaded ${fileName}`;
    } catch (e) {
      return "GitHub load error: " + e;
    }
  },

  /* ----------------------------
        COMMAND HANDLER
  ----------------------------*/
  async handle(cmd, args) {
    switch (cmd) {
      
      case "ls":
        return Object.keys(this.fs).join("<br>");

      case "cat":
        return this.readFile(args[0]) || "File not found.";

      case "write":
        this.writeFile(args[0], args.slice(1).join(" "));
        return "Written.";

      case "rm":
        this.deleteFile(args[0]);
        return "Removed.";

      case "mkdir":
        this.writeFile(args[0] + "/", "(dir)");
        return "Directory created.";

      case "python":
        return await this.execPython(this.readFile(args[0]) || args.join(" "));

      case "node":
        return this.execJS(this.readFile(args[0]) || args.join(" "));

      case "run":
        return this.execJS(this.readFile(args[0]) || "No such script.");

      case "install":
        return await this.loadGithub(args[0]);

      default:
        return "Exec: Command not recognized.";
    }
  }
};

/* Make Exec available after load */
document.addEventListener("DOMContentLoaded", () => {
  try {
    Exec.init();
  } catch (e) {
    Rogers.say("Exec Init Error: " + e);
  }
});
