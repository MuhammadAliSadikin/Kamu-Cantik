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
let isPlaying = false;

// Efek ketik
function typeWriter(text, callback) {
  typing = true;
  lyricsContainer.innerHTML = '';
  let i = 0;
  const interval = setInterval(() => {
    lyricsContainer.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      typing = false;
      if (callback) callback();
    }
  }, 70);
}

// Tombol Play
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playBtn.innerText = "⏸ Pause Lagu";
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.innerText = "▶ Play Lagu";
    isPlaying = false;
  }
});

// Sinkronisasi waktu lirik
audio.addEventListener('timeupdate', () => {
  if (currentLine < lyrics.length && audio.currentTime >= lyrics[currentLine].time && !typing) {
    const line = lyrics[currentLine];
    typeWriter(line.text);
    currentLine++;
  }
});

audio.addEventListener('ended', () => {
  currentLine = 0;
  lyricsContainer.innerHTML = '';
  playBtn.innerText = "▶ Play Lagu";
  isPlaying = false;
});

const flowerTypes = ['🌸', '💐',];

function createFlower() {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flower.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
  
  flower.style.left = Math.random() * 100 + 'vw';
  flower.style.fontSize = Math.random() * 30 + 15 + 'px';
  flower.style.animationDuration = Math.random() * 4 + 4 + 's';
  flower.style.opacity = Math.random() * 0.8 + 0.4;

  document.body.appendChild(flower);
  setTimeout(() => flower.remove(), 9000);
}

setInterval(createFlower, 350);
