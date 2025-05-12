import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// סוג תרגיל: חיבור או חיסור
let opType: '+' | '-' = '+';

// מיכל הנקודות עם הגבלת רוחב וירידת שורה
function interactiveDots(n: number, idPrefix: string) {
  let html = '<div style="display:flex;flex-wrap:wrap;gap:3px;justify-content:center;width:90%;max-width:320px;margin:auto;">';
  for (let i = 0; i < n; i++) {
    html += `<button type="button" class="dot-btn" id="${idPrefix}-dot-${i}">●</button>`;
  }
  html += '</div>';
  return html;
}

function generateExercise() {
  if (opType === '+') {
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
  } else {
    // חיסור: num1 >= num2
    const num1 = getRandomInt(1, 10);
    const num2 = getRandomInt(1, num1);
    return {
      question: `<span dir="ltr">${num1} - ${num2}</span>`,
      answer: num1 - num2,
      num1,
      num2,
      op: '-'
    };
  }
}

let current = generateExercise();
let score = 0;

function render() {
  let dotsHtml = '';
  if (current.op === '+') {
    // חיבור: שתי קבוצות נקודות
    dotsHtml = `<div style="display:flex;justify-content:center;gap:30px;margin-bottom:10px;align-items:end;">
      <div>${interactiveDots(current.num1, 'num1')}</div>
      <div style="font-size:1.5em;">+</div>
      <div>${interactiveDots(current.num2, 'num2')}</div>
    </div>`;
  } else {
    // חיסור: המספר הגדול (num1) משמאל, רק קבוצה אחת של נקודות
    dotsHtml = `<div style="display:flex;justify-content:center;gap:30px;margin-bottom:10px;align-items:end;">
      <div>${interactiveDots(current.num1, 'num1')}</div>
    </div>`;
  }

  const maxNum = 20;
  let buttonsHtml = '<div style="margin: 10px 0; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 100vw; padding-bottom: 8px;">';
  for (let i = 0; i <= maxNum; i++) {
    buttonsHtml += `<button class="answer-btn" data-val="${i}" style="min-width:40px;font-size:1.1em;">${i}</button>`;
  }
  buttonsHtml += '</div>';

  app.innerHTML = `
    <div style="max-width: 400px; margin: 40px auto; text-align: center; font-family: 'Arial', sans-serif;">
      <div style="margin-bottom: 16px;">
        <label for="opType">סוג תרגיל: </label>
        <select id="opType">
          <option value="+" ${opType === '+' ? 'selected' : ''}>חיבור</option>
          <option value="-" ${opType === '-' ? 'selected' : ''}>חיסור</option>
        </select>
      </div>
      <h1>תרגול ${opType === '+' ? 'חיבור' : 'חיסור'} עד 20</h1>
      <div style="font-size: 2em; margin: 20px 0;">${current.question}</div>
      ${dotsHtml}
      ${buttonsHtml}
      <button id="new" style="font-size: 1.1em;">תרגיל חדש</button>
      <div id="feedback" style="margin: 20px 0; min-height: 24px;"></div>
      <div style="margin-top: 20px; font-size: 1.1em;">ניקוד: <span id="score">${score}</span></div>
    </div>
  `;

  (document.getElementById('opType') as HTMLSelectElement).onchange = (e) => {
    opType = (e.target as HTMLSelectElement).value as ('+' | '-');
    current = generateExercise();
    render();
  };

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
        feedback.innerHTML = `<span style="color: red;">נסה שוב!</span>`;
      }
    });
  });

  // הפוך את הנקודות לאינטראקטיביות
  setTimeout(() => {
    document.querySelectorAll('.dot-btn').forEach(btn => {
      btn.addEventListener('click', function(this: HTMLButtonElement) {
        if (this.classList.contains('dot-removed')) return;
        if (this.style.background === 'rgb(25, 118, 210)') {
          this.style.background = '#e3f0ff';
          this.style.color = '#1976d2';
        } else {
          this.style.background = '#1976d2';
          this.style.color = '#fff';
        }
      });
      btn.addEventListener('dblclick', function(this: HTMLButtonElement) {
        this.classList.toggle('dot-removed');
      });
    });
  }, 0);

  (document.getElementById('new') as HTMLButtonElement).onclick = () => {
    current = generateExercise();
    render();
  };
}

render();