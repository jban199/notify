document.getElementById("openMenu").addEventListener("click", () => {
    fetch("menu.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("menuContainer").innerHTML = html;
            attachMenuEvents();
        });
});

function attachMenuEvents() {
    document.getElementById("closeMenu").addEventListener("click", () => {
        document.getElementById("menuContainer").innerHTML = "";
    });

    document.getElementById("fullscreenBtn").addEventListener("click", () => {
        document.documentElement.requestFullscreen();
    });
}
