/* ===========================================================
   MENU TAB HANDLER
   =========================================================== */
document.querySelectorAll("#menu button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#menu button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.getAttribute("data-tab");
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(tab).classList.add("active");
  });
});

/* ===========================================================
   AI ASSISTANT
   =========================================================== */
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  document.getElementById("response").innerHTML = "⏳ Sedang memproses...";

  try {
    const r = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });

    const d = await r.json();
    document.getElementById("response").innerText = d.reply || "Tidak ada response";
  } catch (e) {
    document.getElementById("response").innerText = "⚠ Error: " + e.message;
  }
});

/* ===========================================================
   YOUTUBE PLAYER + SEARCH (100% FIX)
   =========================================================== */
const defaultVideos = [
  "dQw4w9WgXcQ",
  "3JZ_D3ELwOQ",
  "kXYiU_JCYtU",
  "9bZkp7q19f0",
  "fJ9rUzIMcZQ"
];

function loadVideo(id) {
  const iframe = document.getElementById("ytPlayer");
  iframe.src = "https://www.youtube.com/embed/" + id + "?rel=0&modestbranding=1";
}

function randomVideo() {
  const id = defaultVideos[Math.floor(Math.random() * defaultVideos.length)];
  loadVideo(id);
}

function searchYouTube() {
  const q = document.getElementById("ytSearch").value.trim();
  if (!q) return randomVideo();

  // noembed API (gratis, tanpa API key)
  fetch("https://noembed.com/embed?url=https://www.youtube.com/watch?v=" + q)
    .then(r => r.json())
    .then(d => {
      if (d.video_id) loadVideo(d.video_id);
      else window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(q));
    })
    .catch(() => {
      window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(q));
    });
}

// Load video pertama setelah 1 detik
setTimeout(randomVideo, 1000);

/* ===========================================================
   TIKTOK VIEWER
   =========================================================== */
function loadTiktok(query) {
  if (!query) query = "viral";
  document.getElementById("ttArea").innerHTML = `
    <iframe width="100%" height="400" 
      src="https://www.tiktok.com/search?q=${encodeURIComponent(query)}"
      style="border-radius:10px;border:none">
    </iframe>`;
}

/* ===========================================================
   INSTAGRAM VIEWER
   =========================================================== */
function loadIG() {
  document.getElementById("igArea").innerHTML = `
    <iframe width="100%" height="400"
      src="https://www.instagram.com"
      style="border:none;border-radius:10px"></iframe>`;
}

/* ===========================================================
   FACEBOOK VIEWER
   =========================================================== */
function loadFB() {
  document.getElementById("fbArea").innerHTML = `
    <iframe width="100%" height="400"
      src="https://www.facebook.com"
      style="border:none;border-radius:10px"></iframe>`;
}

/* ===========================================================
   QUOTE GENERATOR
   =========================================================== */
function loadQuote() {
  fetch("/api/quote")
    .then(r => r.json())
    .then(d => document.getElementById("quoteArea").innerText = d.quote)
    .catch(() => document.getElementById("quoteArea").innerText = "Gagal mengambil quote");
}
loadQuote();

/* ===========================================================
   CUACA (tanpa API key, auto lokasi)
   =========================================================== */
function loadWeather() {
  if (!navigator.geolocation) {
    document.getElementById("weatherArea").innerText = "GPS tidak didukung.";
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    fetch(`https://wttr.in/${latitude},${longitude}?format=3`)
      .then(r => r.text())
      .then(t => document.getElementById("weatherArea").innerText = t)
      .catch(() => document.getElementById("weatherArea").innerText = "Gagal memuat cuaca.");
  });
}
loadWeather();

/* ===========================================================
   GAME LOADER
   =========================================================== */
function loadGame() {
  document.getElementById("gameArea").innerHTML = `
    <button onclick="playGame('flappy')">Flappy Bird</button><br><br>
    <button onclick="playGame('snake')">Snake</button><br><br>
    <button onclick="playGame('tetris')">Tetris</button><br><br>
    <button onclick="playGame('tictactoe')">TicTacToe</button>
  `;
}

function playGame(name) {
  document.getElementById("gameArea").innerHTML = `
    <iframe src="${name}.html" width="100%" height="400" style="border:none;border-radius:10px"></iframe>
  `;
}

loadGame();

/* ===========================================================
   GOOGLE SEARCH
   =========================================================== */
function loadGoogle(query) {
  if (!query) query = "Tutorial sukses";
  document.getElementById("googleArea").innerHTML = `
    <iframe width="100%" height="400" 
      src="https://www.google.com/search?q=${encodeURIComponent(query)}"
      style="border:none;border-radius:10px"></iframe>`;
}
