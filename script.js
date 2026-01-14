const video = document.getElementById("bg-video");
const toggle = document.getElementById("sound-toggle");

// Force smooth looping to avoid black screen
video.addEventListener('ended', () => {
  video.currentTime = 0;
  video.play();
});

// const hoverSound = document.getElementById("hover-sound");
// const clickSound = document.getElementById("click-sound");

let muted = true;
let uiSound = true;

toggle.onclick = () => {
  muted = !muted;
  video.muted = muted;
  toggle.textContent = muted ? "🔊" : "🔇";
};

const buttons = document.querySelectorAll(".shortcuts a");

document.addEventListener("mousemove", e => {
  buttons.forEach(btn => {
    const rect = btn.getBoundingClientRect();
    const bx = rect.left + rect.width / 2;
    const by = rect.top + rect.height / 2;

    const dx = e.clientX - bx;
    const dy = e.clientY - by;
    const dist = Math.sqrt(dx*dx + dy*dy);

    const maxDist = 180;
    const strength = Math.max(0, 1 - dist / maxDist);

    btn.style.transform =
      `translateY(${-8 * strength}px) scale(${1 + strength * 0.15})`;

    btn.style.boxShadow =
      `0 ${10 * strength}px ${30 * strength}px rgba(255,255,255,${0.25 * strength})`;
  });
});

/* UI Sounds */
/*
buttons.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    if (uiSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  });

  btn.addEventListener("click", () => {
    if (uiSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });
});
*/

// Typewriter effect for search input
const input = document.querySelector('.search-box input');
const text = 'Search the void...';
let i = 0;

function typeWriter() {
  if (i < text.length) {
    input.placeholder += text.charAt(i);
    i++;
    setTimeout(typeWriter, 150);
  } else {
    // Loop: reset after a pause
    setTimeout(() => {
      input.placeholder = '';
      i = 0;
      typeWriter();
    }, 2000);
  }
}

setTimeout(typeWriter, 1000);

// Real-time date and time
const datetime = document.getElementById('datetime');

function updateDateTime() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  };
  datetime.textContent = now.toLocaleDateString('en-US', options);
}

updateDateTime();
setInterval(updateDateTime, 1000);

// DuckDuckGo suggestions
const datalist = document.getElementById('suggestions');

input.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length > 1) {
    try {
      const response = await fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      datalist.innerHTML = '';
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.phrase;
        datalist.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  } else {
    datalist.innerHTML = '';
  }
});
