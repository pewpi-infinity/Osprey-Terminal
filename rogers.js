const rogersPanel = document.getElementById("rogers-panel");
const rogersOpen = document.getElementById("rogers-open");

rogersOpen.addEventListener("click", () => {
  rogersPanel.style.display =
    rogersPanel.style.display === "block" ? "none" : "block";
});

function rogersSay(text) {
  rogersPanel.innerHTML += text + "<br>";
  rogersPanel.scrollTop = rogersPanel.scrollHeight;
}

// Initial greeting
rogersSay("<b>Rogers AI Ready.</b>");
rogersSay("Say a command in the terminal: help, ls, rogers, etc.");

