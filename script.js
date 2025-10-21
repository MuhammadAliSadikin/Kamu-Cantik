const lyricsContainer = document.getElementById('lyrics');
const audio = document.getElementById('song');
const playBtn = document.getElementById('playBtn');

const lyrics = [
  { text: "Sempurnalah Duniaku", time: 0.5 },
  { text: "Saat Kau Disisiku", time: 2.9 },
  { text: "Karna kamu cantik", time: 4.9 },
  { text: "Kan kuberi segalanya apa yang kupunya", time: 7.8 },
  { text: "Dan hatimu baik", time: 11.4 },
  { text: "Sempurnalah duniaku saat kau di sisiku", time: 14.5 },
  { text: "Bukan karna make up di wajahmu", time: 18.7 },
  { text: "Atau lipstik merah itu", time: 22.0 },
  { text: "Lembut hati tutur kata", time: 25.9 },
  { text: "Terciptalah cinta yang kupuja", time: 26.0 }
];

let currentLine = 0;
let typing = false;
let interval = null; 
let paused = false;

function typeWriter(text, callback) {
  typing = true;
  lyricsContainer.innerHTML = '';
  let i = 0;
  interval = setInterval(() => {
    if (paused) return; 
    lyricsContainer.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      typing = false;
      if (callback) callback();
    }
  }, 70);
}

audio.addEventListener('timeupdate', () => {
  if (paused) return;

  if (currentLine < lyrics.length && audio.currentTime >= lyrics[currentLine].time && !typing) {
    const line = lyrics[currentLine];
    typeWriter(line.text);
    currentLine++;
  }
});

audio.addEventListener('ended', () => {
  currentLine = 0;
  lyricsContainer.innerHTML = '';
  playBtn.textContent = '▶️ Play Lagu';
});

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    paused = false;
    playBtn.textContent = '⏸️ Pause Lagu';
  } else {
    audio.pause();
    paused = true;
    playBtn.textContent = '▶️ Play Lagu';
  }
});

function createFlower() {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  const flowers = ['🌸', '💐']; // dua jenis bunga
  flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
  flower.style.left = Math.random() * 100 + 'vw';
  flower.style.fontSize = Math.random() * 20 + 15 + 'px';
  flower.style.animationDuration = Math.random() * 3 + 3 + 's';
  document.body.appendChild(flower);
  setTimeout(() => flower.remove(), 6000);
}
setInterval(createFlower, 300);
