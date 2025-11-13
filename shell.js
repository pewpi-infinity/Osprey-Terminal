const output = document.getElementById("output");
const inputLine = document.getElementById("input-line");

function print(text) {
  output.innerHTML += text + "<br>";
  output.scrollTop = output.scrollHeight;
}

const commands = {
  help() {
    print("Available commands:");
    print(" • help — show commands");
    print(" • ls — list directories");
    print(" • clear — clear terminal");
    print(" • rogers — open Rogers AI");
    print(" • about — system info");
    print(" • open apps — list installed apps");
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
    print("Infinity Shell — Osprey Terminal v1");
    print("Powered by browser JS, Cloudflare Pages, Kris Watson architecture.");
  },

  "open apps"() {
    print("Installed apps:");
    print(" → (none yet) — you can add JS modules into /apps/");
  },
};

inputLine.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = inputLine.value.trim();
    print(`<span style="color:#00eaff;">$</span> ${cmd}`);

    if (commands[cmd]) {
      commands[cmd]();
    } else {
      print(`Command not found: ${cmd}`);
    }

    inputLine.value = "";
  }
});
    
