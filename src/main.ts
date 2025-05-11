import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;

type Level = 1 | 2;
let level: Level = 1;

let customImageUrl: string | null = null;

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function interactiveDots(n: number, idPrefix: string) {
  let html = '<div style="display:inline-flex;gap:4px;">';
  for (let i = 0; i < n; i++) {
    html += `<button type="button" class="dot-btn" id="${idPrefix}-dot-${i}" style="width:28px;height:28px;border-radius:50%;border:1px solid #1976d2;background:#e3f0ff;color:#1976d2;font-size:1.3em;cursor:pointer;outline:none;">●</button>`;
  }
  html += '</div>';
  return html;
}

function generateExercise() {
  if (level === 1) {
    // רמה 1: חיבור בלבד עד 10
    const num1 = getRandomInt(1, 10);
    const num2 = getRandomInt(1, 10 - num1);
    return {
      question: `${num1} + ${num2}`,
      answer: num1 + num2,
      num1,
      num2,
      op: '+'
    };
  } else {
    // רמות נוספות (לדוג' רמה 2: כל הארבע פעולות עד 20)
    const num1 = getRandomInt(1, 20);
    const num2 = getRandomInt(1, 20);
    const op = ['+', '-', '×', '÷'][getRandomInt(0, 3)];
    let question = '';
    let answer = 0;
    switch (op) {
      case '+':
        question = `${num1} + ${num2}`;
        answer = num1 + num2;
        break;
      case '-':
        question = `${num1} - ${num2}`;
        answer = num1 - num2;
        break;
      case '×':
        question = `${num1} × ${num2}`;
        answer = num1 * num2;
        break;
      case '÷':
        answer = num1;
        question = `${num1 * num2} ÷ ${num2}`;
        break;
    }
    return { question, answer, num1, num2, op };
  }
}

let current = generateExercise();
let score = 0;

function render() {
  let dotsHtml = '';
  if (current.op === '+' || level === 1) {
    dotsHtml = `<div style="display:flex;justify-content:center;gap:30px;margin-bottom:10px;align-items:end;">
      <div>${interactiveDots(current.num1, 'num1')}</div>
      <div style="font-size:1.5em;">+</div>
      <div>${interactiveDots(current.num2, 'num2')}</div>
    </div>`;
  }

  // קבע את טווח המספרים האפשרי (לפי רמה)
  const maxNum = level === 1 ? 20 : 40;
  let buttonsHtml = '<div style="margin: 10px 0; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">';
  for (let i = 0; i <= maxNum; i++) {
    buttonsHtml += `<button class="answer-btn" data-val="${i}" style="min-width:40px;font-size:1.1em;">${i}</button>`;
  }
  buttonsHtml += '</div>';

  // העלאת תמונה בלבד
  let imageChoiceHtml = `
    <div style="margin-bottom:12px;">
      <label style="cursor:pointer;">
        <input type="file" id="customImageInput" accept="image/*" style="display:none;">
        <span style="border:1px solid #1976d2;padding:4px 10px;border-radius:8px;background:#e3f0ff;color:#1976d2;cursor:pointer;">העלה תמונה מהמחשב</span>
      </label>
      ${customImageUrl ? `<img src="${customImageUrl}" alt="תמונה מהמחשב" style="width:48px;height:48px;object-fit:cover;border-radius:50%;border:3px solid #1976d2;margin-right:10px;vertical-align:middle;" />` : ''}
    </div>
  `;

  app.innerHTML = `
    <div style="max-width: 400px; margin: 40px auto; text-align: center; font-family: 'Arial', sans-serif;">
      ${imageChoiceHtml}
      <h1>תרגול חשבון לילדים</h1>
      <div style="margin-bottom: 16px;">
        <label for="level">בחר רמה: </label>
        <select id="level" style="font-size:1em;">
          <option value="1" ${level === 1 ? 'selected' : ''}>רמה 1: חיבור עד 10</option>
          <option value="2" ${level === 2 ? 'selected' : ''}>רמה 2: כל הפעולות עד 20</option>
        </select>
      </div>
      <div style="font-size: 2em; margin: 20px 0;">${current.question}</div>
      ${dotsHtml}
      ${buttonsHtml}
      <button id="new" style="font-size: 1.1em;">תרגיל חדש</button>
      <div id="feedback" style="margin: 20px 0; min-height: 24px;"></div>
      <div style="margin-top: 20px; font-size: 1.1em;">ניקוד: <span id="score">${score}</span></div>
    </div>
  `;

  // העלאת תמונה מהמחשב
  setTimeout(() => {
    const fileInput = document.getElementById('customImageInput') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            customImageUrl = ev.target?.result as string;
            render();
          };
          reader.readAsDataURL(file);
        }
      };
    }
  }, 0);

  (document.getElementById('level') as HTMLSelectElement).onchange = (e) => {
    level = Number((e.target as HTMLSelectElement).value) as Level;
    current = generateExercise();
    render();
  };

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const val = Number((e.target as HTMLButtonElement).dataset.val);
      const feedback = document.getElementById('feedback')!;
      if (val === current.answer) {
        // Overlay תמונה
        if (customImageUrl) {
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
          overlay.innerHTML = `
            <img src="${customImageUrl}"
                 alt="ילד שמח"
                 style="max-width:60vw;max-height:60vh;border-radius:30px;box-shadow:0 0 30px #1976d2;">
          `;
          document.body.appendChild(overlay);

          setTimeout(() => {
            overlay.remove();
          }, 2000);
        }
        feedback.innerHTML = '<span style="color: green;">כל הכבוד! תשובה נכונה 🎉</span>';
        score++;
        (document.getElementById('score') as HTMLSpanElement).textContent = score.toString();
      } else {
        feedback.innerHTML = `<span style=\"color: red;\">נסה שוב! התשובה הנכונה: ${current.answer}</span>`;
      }
    });
  });

  // הפוך את הנקודות לאינטראקטיביות
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
