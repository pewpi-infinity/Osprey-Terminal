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
  pyodide: null,
  ready: false,
  readyPromise: null,

  _log(msg) {
    if (typeof Rogers !== "undefined" && Rogers.say) {
      try { Rogers.say(msg); } catch (e) { console.log("Rogers.say error:", e, msg); }
    } else {
      console.log(msg);
    }
  },

  _saveRestorePoint() {
    if (typeof IntelligenceCore !== "undefined" && IntelligenceCore.saveRestorePoint) {
      try { IntelligenceCore.saveRestorePoint(); } catch (e) { this._log("Save restore error: " + e); }
    }
  },

  async init() {
    this._log("[minor] Initializing Exec Engine…");

    // --- Load Pyodide (Python runtime) if available ---
    if (typeof loadPyodide === "function") {
      try {
        this.pyodide = await loadPyodide();
        this.pyReady = true;
        this._log("Python engine ready.");
      } catch (e) {
        this._log("Python load error: " + e);
      }
    } else {
      this._log("loadPyodide() is not available; Python disabled.");
    }

    this.ready = true;
    this._log("Exec Engine active.");
  },

  /* ----------------------------
        FILESYSTEM LAYER
  ----------------------------*/
  writeFile(path, content) {
    this.fs[path] = content;
    this._saveRestorePoint();
  },

  readFile(path) {
    return Object.prototype.hasOwnProperty.call(this.fs, path) ? this.fs[path] : null;
  },

  deleteFile(path) {
    if (Object.prototype.hasOwnProperty.call(this.fs, path)) {
      delete this.fs[path];
      this._saveRestorePoint();
    }
  },

  /* ----------------------------
     JS EXECUTION (Node-lite)
  ----------------------------*/
  execJS(code) {
    try {
      const result = Function("ctx", code)(this.jsContext);
      if (result === undefined) return "(ok)";
      if (result === null) return "null";
      if (typeof result === "object" || typeof result === "function") {
        try { return JSON.stringify(result, null, 2); } catch (_) { return String(result); }
      }
      return String(result);
    } catch (e) {
      // return stack if available for better debugging
      return "JS Error: " + (e && e.stack ? e.stack : e);
    }
  },

  /* ----------------------------
     PYTHON EXECUTION (Pyodide)
  ----------------------------*/
  async execPython(code) {
    if (!this.pyReady || !this.pyodide) return "Python not ready.";
    if (!code) return "No Python code provided.";
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
    this._log("Loading repo/file: " + url);

    try {
      // Convert GitHub blob URLs to raw content URLs
      let fetchUrl = url;
      if (fetchUrl.startsWith("https://github.com/") && fetchUrl.includes("/blob/")) {
        fetchUrl = fetchUrl.replace("https://github.com/", "https://raw.githubusercontent.com/").replace("/blob/", "/");
      }

      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error(res.status + " " + res.statusText);
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
    args = args || [];

    switch (cmd) {
      case "ls":
        return Object.keys(this.fs).length ? Object.keys(this.fs).join("<br>") : "(empty)";

      case "cat":
        return this.readFile(args[0]) || "File not found.";

      case "write":
        if (!args[0]) return "Usage: write <filename> <content>";
        this.writeFile(args[0], args.slice(1).join(" "));
        return "Written.";

      case "rm":
        if (!args[0]) return "Usage: rm <filename>";
        this.deleteFile(args[0]);
        return "Removed.";

      case "mkdir":
        if (!args[0]) return "Usage: mkdir <dirname>";
        this.writeFile(args[0] + "/", "(dir)");
        return "Directory created.";

      case "python":
        return await this.execPython(this.readFile(args[0]) || args.join(" "));

      case "node":
        return this.execJS(this.readFile(args[0]) || args.join(" "));

      case "run":
        const script = this.readFile(args[0]);
        if (!script) return "No such script.";
        return this.execJS(script);

      case "install":
        if (!args[0]) return "Usage: install <github-url>";
        return await this.loadGithub(args[0]);

      default:
        return "Exec: Command not recognized.";
    }
  }
};

/* Make Exec available after load */
document.addEventListener("DOMContentLoaded", () => {
  try {
    Exec.readyPromise = Exec.init();
  } catch (e) {
    if (typeof Rogers !== "undefined" && Rogers.say) {
      Rogers.say("Exec Init Error: " + e);
    } else {
      console.error("Exec Init Error:", e);
    }
  }
});
