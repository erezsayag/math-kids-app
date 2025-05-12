import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// מיכל הנקודות עם הגבלת רוחב וירידת שורה
function interactiveDots(n: number, idPrefix: string) {
  // max-width קטן יותר, gap קטן יותר
  let html = '<div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:80px;margin:auto;">';
  for (let i = 0; i < n; i++) {
    html += `<button type="button" class="dot-btn" id="${idPrefix}-dot-${i}">●</button>`;
  }
  html += '</div>';
  return html;
}

function generateExercise() {
  // חיבור בלבד עד סכום 20
  const num1 = getRandomInt(1, 10);
  const num2 = getRandomInt(1, 10);
  return {
    question: `${num1} + ${num2}`,
    answer: num1 + num2,
    num1,
    num2,
    op: '+'
  };
}

let current = generateExercise();
let score = 0;

function render() {
  let dotsHtml = '';
  dotsHtml = `<div style="display:flex;justify-content:center;gap:30px;margin-bottom:10px;align-items:end;">
    <div>${interactiveDots(current.num1, 'num1')}</div>
    <div style="font-size:1.5em;">+</div>
    <div>${interactiveDots(current.num2, 'num2')}</div>
  </div>`;

  const maxNum = 20;
  let buttonsHtml = '<div style="margin: 10px 0; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 100vw; padding-bottom: 8px;">';
  for (let i = 0; i <= maxNum; i++) {
    buttonsHtml += `<button class="answer-btn" data-val="${i}" style="min-width:40px;font-size:1.1em;">${i}</button>`;
  }
  buttonsHtml += '</div>';

  app.innerHTML = `
    <div style="max-width: 400px; margin: 40px auto; text-align: center; font-family: 'Arial', sans-serif;">
      <h1>תרגול חיבור עד 20</h1>
      <div style="font-size: 2em; margin: 20px 0;">${current.question}</div>
      ${dotsHtml}
      ${buttonsHtml}
      <button id="new" style="font-size: 1.1em;">תרגיל חדש</button>
      <div id="feedback" style="margin: 20px 0; min-height: 24px;"></div>
      <div style="margin-top: 20px; font-size: 1.1em;">ניקוד: <span id="score">${score}</span></div>
    </div>
  `;

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const val = Number((e.target as HTMLButtonElement).dataset.val);
      const feedback = document.getElementById('feedback')!;
      if (val === current.answer) {
        // Overlay סמיילי גדול
        let overlay = document.createElement('div');
        overlay.id = 'happy-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(255,255,255,0.85)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '9999';
        overlay.innerHTML = `<span style="font-size:10vw;">😃</span>`;
        document.body.appendChild(overlay);

        setTimeout(() => {
          overlay.remove();
        }, 2000);
        feedback.innerHTML = '<span style="color: green;">כל הכבוד! תשובה נכונה 🎉</span>';
        score++;
        (document.getElementById('score') as HTMLSpanElement).textContent = score.toString();
      } else {
        feedback.innerHTML = `<span style="color: red;">נסה שוב! התשובה הנכונה: ${current.answer}</span>`;
      }
    });
  });

  setTimeout(() => {
    document.querySelectorAll('.dot-btn').forEach(btn => {
      btn.addEventListener('click', function(this: HTMLButtonElement) {
        if (this.style.background === 'rgb(25, 118, 210)') {
          this.style.background = '#e3f0ff';
          this.style.color = '#1976d2';
        } else {
          this.style.background = '#1976d2';
          this.style.color = '#fff';
        }
      });
    });
  }, 0);

  (document.getElementById('new') as HTMLButtonElement).onclick = () => {
    current = generateExercise();
    render();
  };
}

render();