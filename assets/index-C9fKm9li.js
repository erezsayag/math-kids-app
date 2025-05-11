(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const h=document.querySelector("#app");let a=1,u=null;function p(t,n){return Math.floor(Math.random()*(n-t+1))+t}function b(t,n){let s='<div style="display:inline-flex;gap:4px;">';for(let r=0;r<t;r++)s+=`<button type="button" class="dot-btn" id="${n}-dot-${r}" style="width:28px;height:28px;border-radius:50%;border:1px solid #1976d2;background:#e3f0ff;color:#1976d2;font-size:1.3em;cursor:pointer;outline:none;">●</button>`;return s+="</div>",s}function y(){if(a===1){const t=p(1,10),n=p(1,10-t);return{question:`${t} + ${n}`,answer:t+n,num1:t,num2:n,op:"+"}}else{const t=p(1,20),n=p(1,20),s=["+","-","×","÷"][p(0,3)];let r="",e=0;switch(s){case"+":r=`${t} + ${n}`,e=t+n;break;case"-":r=`${t} - ${n}`,e=t-n;break;case"×":r=`${t} × ${n}`,e=t*n;break;case"÷":e=t,r=`${t*n} ÷ ${n}`;break}return{question:r,answer:e,num1:t,num2:n,op:s}}}let d=y(),f=0;function m(){let t="";(d.op==="+"||a===1)&&(t=`<div style="display:flex;justify-content:center;gap:30px;margin-bottom:10px;align-items:end;">
      <div>${b(d.num1,"num1")}</div>
      <div style="font-size:1.5em;">+</div>
      <div>${b(d.num2,"num2")}</div>
    </div>`);const n=a===1?20:40;let s='<div style="margin: 10px 0; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">';for(let e=0;e<=n;e++)s+=`<button class="answer-btn" data-val="${e}" style="min-width:40px;font-size:1.1em;">${e}</button>`;s+="</div>";let r=`
    <div style="margin-bottom:12px;">
      <label style="cursor:pointer;">
        <input type="file" id="customImageInput" accept="image/*" style="display:none;">
        <span style="border:1px solid #1976d2;padding:4px 10px;border-radius:8px;background:#e3f0ff;color:#1976d2;cursor:pointer;">העלה תמונה מהמחשב</span>
      </label>
      ${u?`<img src="${u}" alt="תמונה מהמחשב" style="width:48px;height:48px;object-fit:cover;border-radius:50%;border:3px solid #1976d2;margin-right:10px;vertical-align:middle;" />`:""}
    </div>
  `;h.innerHTML=`
    <div style="max-width: 400px; margin: 40px auto; text-align: center; font-family: 'Arial', sans-serif;">
      ${r}
      <h1>תרגול חשבון לילדים</h1>
      <div style="margin-bottom: 16px;">
        <label for="level">בחר רמה: </label>
        <select id="level" style="font-size:1em;">
          <option value="1" ${a===1?"selected":""}>רמה 1: חיבור עד 10</option>
          <option value="2" ${a===2?"selected":""}>רמה 2: כל הפעולות עד 20</option>
        </select>
      </div>
      <div style="font-size: 2em; margin: 20px 0;">${d.question}</div>
      ${t}
      ${s}
      <button id="new" style="font-size: 1.1em;">תרגיל חדש</button>
      <div id="feedback" style="margin: 20px 0; min-height: 24px;"></div>
      <div style="margin-top: 20px; font-size: 1.1em;">ניקוד: <span id="score">${f}</span></div>
    </div>
  `,setTimeout(()=>{const e=document.getElementById("customImageInput");e&&(e.onchange=i=>{var c;const l=(c=i.target.files)==null?void 0:c[0];if(l){const o=new FileReader;o.onload=v=>{var g;u=(g=v.target)==null?void 0:g.result,m()},o.readAsDataURL(l)}})},0),document.getElementById("level").onchange=e=>{a=Number(e.target.value),d=y(),m()},document.querySelectorAll(".answer-btn").forEach(e=>{e.addEventListener("click",i=>{const l=Number(i.target.dataset.val),c=document.getElementById("feedback");if(l===d.answer){if(u){let o=document.createElement("div");o.id="happy-overlay",o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="100vw",o.style.height="100vh",o.style.background="rgba(255,255,255,0.85)",o.style.display="flex",o.style.justifyContent="center",o.style.alignItems="center",o.style.zIndex="9999",o.innerHTML=`
            <img src="${u}"
                 alt="ילד שמח"
                 style="max-width:60vw;max-height:60vh;border-radius:30px;box-shadow:0 0 30px #1976d2;">
          `,document.body.appendChild(o),setTimeout(()=>{o.remove()},2e3)}c.innerHTML='<span style="color: green;">כל הכבוד! תשובה נכונה 🎉</span>',f++,document.getElementById("score").textContent=f.toString()}else c.innerHTML=`<span style="color: red;">נסה שוב! התשובה הנכונה: ${d.answer}</span>`})}),setTimeout(()=>{document.querySelectorAll(".dot-btn").forEach(e=>{e.addEventListener("click",function(){this.style.background==="rgb(25, 118, 210)"?(this.style.background="#e3f0ff",this.style.color="#1976d2"):(this.style.background="#1976d2",this.style.color="#fff")})})},0),document.getElementById("new").onclick=()=>{d=y(),m()}}m();
