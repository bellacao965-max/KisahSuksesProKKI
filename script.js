// --- Basic tab system ---
const menu = document.getElementById('menu');
menu.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-tab]');
  if (!btn) return;
  const tab = btn.getAttribute('data-tab');
  showTab(tab);
});

function showTab(id){
  // buttons active state
  document.querySelectorAll('#menu button').forEach(b=>{
    b.classList.toggle('active', b.getAttribute('data-tab')===id);
  });
  // show tab content
  document.querySelectorAll('.tab').forEach(t=>{
    t.classList.toggle('active', t.id===id);
  });
}

// --- AI basic (echo demo) ---
document.getElementById('sendBtn').addEventListener('click', sendMessage);
function sendMessage(){
  const txt = document.getElementById('userInput').value.trim();
  const out = document.getElementById('response');
  if(!txt){ out.innerText = 'Tulis pesan terlebih dahulu.'; return; }
  // simple echo reply — replace this with API call when ready
  out.innerHTML = `<div style="background:#eef2ff;padding:8px;border-radius:6px">Halo! Saya bersedia membantu. Response (demo): <strong>${escapeHtml(txt)}</strong></div>`;
  document.getElementById('userInput').value = '';
}

// escape helper
function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

// --- YouTube feature ---
const ytArea = document.getElementById('ytArea');
ytArea.innerHTML = `
  <input id="ytQuery" placeholder="Cari YouTube...">
  <button id="ytSearchBtn" class="primary">Cari</button>
  <div id="ytResult" style="margin-top:12px"></div>
`;
document.getElementById('ytSearchBtn').addEventListener('click', ()=>{
  const q = document.getElementById('ytQuery').value.trim();
  if(!q) return;
  // embed search list
  const src = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(q)}`;
  document.getElementById('ytResult').innerHTML = `<iframe width="100%" height="360" src="${src}" frameborder="0" allowfullscreen></iframe>`;
});

// --- TikTok feature (opens search) ---
const ttArea = document.getElementById('ttArea');
ttArea.innerHTML = `
  <input id="ttQuery" placeholder="Cari TikTok...">
  <button id="ttSearchBtn" class="primary">Buka Pencarian</button>
`;
document.getElementById('ttSearchBtn').addEventListener('click', ()=>{
  const q = document.getElementById('ttQuery').value.trim();
  if(!q) return;
  window.open(`https://www.tiktok.com/search?q=${encodeURIComponent(q)}`, '_blank');
});

// --- Instagram feature (open profile) ---
const igArea = document.getElementById('igArea');
igArea.innerHTML = `
  <input id="igUser" placeholder="Username Instagram...">
  <button id="igOpenBtn" class="primary">Buka Profil</button>
`;
document.getElementById('igOpenBtn').addEventListener('click', ()=>{
  const u = document.getElementById('igUser').value.trim();
  if(!u) return;
  window.open(`https://instagram.com/${encodeURIComponent(u)}`, '_blank');
});

// --- Facebook feature ---
const fbArea = document.getElementById('fbArea');
fbArea.innerHTML = `
  <input id="fbUser" placeholder="Profil/Halaman Facebook...">
  <button id="fbOpenBtn" class="primary">Buka Facebook</button>
`;
document.getElementById('fbOpenBtn').addEventListener('click', ()=>{
  const u = document.getElementById('fbUser').value.trim();
  if(!u) return;
  window.open(`https://facebook.com/${encodeURIComponent(u)}`, '_blank');
});

// --- Weather (simple open-google demo) ---
const weatherArea = document.getElementById('weatherArea');
weatherArea.innerHTML = `
  <input id="city" placeholder="Masukkan kota...">
  <button id="cityBtn" class="primary">Cek Cuaca</button>
`;
document.getElementById('cityBtn').addEventListener('click', ()=>{
  const c = document.getElementById('city').value.trim();
  if(!c) return;
  window.open(`https://www.google.com/search?q=cuaca+${encodeURIComponent(c)}`, '_blank');
});

// --- Quote generator ---
const quoteArea = document.getElementById('quoteArea');
const quotes = [
  "Tetap semangat!",
  "Kesuksesan datang dari usaha.",
  "Jangan menyerah!",
  "Hari ini lebih baik dari kemarin.",
  "Kerja keras mengalahkan bakat."
];
quoteArea.innerHTML = `<div id="qText" style="font-style:italic;margin-bottom:8px">${quotes[0]}</div><button id="qBtn" class="primary">Ambil Quote Lain</button>`;
document.getElementById('qBtn').addEventListener('click', ()=> {
  document.getElementById('qText').innerText = quotes[Math.floor(Math.random()*quotes.length)];
});

// --- Game (tebak angka) ---
const gameArea = document.getElementById('gameArea');
gameArea.innerHTML = `
  <div class="small">Tebak angka 1-10</div>
  <input id="guess" placeholder="Masukkan tebakan (1-10)">
  <button id="guessBtn" class="primary">Cek</button>
  <div id="gameRes" style="margin-top:8px"></div>
`;
document.getElementById('guessBtn').addEventListener('click', ()=>{
  const g = Number(document.getElementById('guess').value);
  if(!g || g<1 || g>10){ document.getElementById('gameRes').innerText='Masukkan angka 1-10'; return; }
  const r = Math.floor(Math.random()*10)+1;
  document.getElementById('gameRes').innerText = g===r ? `Benar! (${r})` : `Salah — angka: ${r}`;
});

// --- Google search ---
const googleArea = document.getElementById('googleArea');
googleArea.innerHTML = `<input id="gq" placeholder="Cari di Google..."><button id="gBtn" class="primary">Cari</button>`;
document.getElementById('gBtn').addEventListener('click', ()=>{
  const q = document.getElementById('gq').value.trim();
  if(!q) return;
  window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank');
});

// Ensure initial tab shown
showTab('ai');
