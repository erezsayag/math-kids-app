(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&t(d)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const y=document.querySelector("#app");function c(e,n){return Math.floor(Math.random()*(n-e+1))+e}let a="+";function u(e,n){let r='<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;width:100%;max-width:100vw;margin:auto;">';for(let t=0;t<e;t++)r+=`<button type="button" class="dot-btn" id="${n}-dot-${t}">●</button>`;return r+="</div>",r}function m(){if(a==="+"){const e=c(1,10),n=c(1,10);return{question:`${e} + ${n}`,answer:e+n,num1:e,num2:n,op:"+"}}else{const e=c(1,10),n=c(1,e);return{question:`<span dir="ltr">${e} - ${n}</span>`,answer:e-n,num1:e,num2:n,op:"-"}}}let l=m(),p=0;function f(){let e="";l.op==="+"?e=`<div style="display:flex;justify-content:center;gap:30px;margin-bottom:10px;align-items:end;">
      <div>${u(l.num1,"num1")}</div>
      <div style="font-size:1.5em;">+</div>
      <div>${u(l.num2,"num2")}</div>
    </div>`:e=`<div style="display:flex;justify-content:center;gap:30px;margin-bottom:10px;align-items:end;">
      <div>${u(l.num1,"num1")}</div>
    </div>`;const n=20;let r='<div style="margin: 10px 0; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 100vw; padding-bottom: 8px;">';for(let t=0;t<=n;t++)r+=`<button class="answer-btn" data-val="${t}" style="min-width:40px;font-size:1.1em;">${t}</button>`;r+="</div>",y.innerHTML=`
    <div style="max-width: 400px; margin: 40px auto; text-align: center; font-family: 'Arial', sans-serif;">
      <div style="margin-bottom: 16px;">
        <label for="opType">סוג תרגיל: </label>
        <select id="opType">
          <option value="+" ${a==="+"?"selected":""}>חיבור</option>
          <option value="-" ${a==="-"?"selected":""}>חיסור</option>
        </select>
      </div>
      <h1>תרגול ${a==="+"?"חיבור":"חיסור"} עד 20</h1>
      <div style="font-size: 2em; margin: 20px 0;">${l.question}</div>
      ${e}
      ${r}
      <button id="new" style="font-size: 1.1em;">תרגיל חדש</button>
      <div id="feedback" style="margin: 20px 0; min-height: 24px;"></div>
      <div style="margin-top: 20px; font-size: 1.1em;">ניקוד: <span id="score">${p}</span></div>
    </div>
  `,document.getElementById("opType").onchange=t=>{a=t.target.value,l=m(),f()},document.querySelectorAll(".answer-btn").forEach(t=>{t.addEventListener("click",o=>{const s=Number(o.target.dataset.val),d=document.getElementById("feedback");if(s===l.answer){let i=document.createElement("div");i.id="happy-overlay",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100vw",i.style.height="100vh",i.style.background="rgba(255,255,255,0.85)",i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center",i.style.zIndex="9999",i.innerHTML='<span style="font-size:10vw;">😃</span>',document.body.appendChild(i),setTimeout(()=>{i.remove()},2e3),d.innerHTML='<span style="color: green;">כל הכבוד! תשובה נכונה 🎉</span>',p++,document.getElementById("score").textContent=p.toString()}else d.innerHTML='<span style="color: red;">נסה שוב!</span>'})}),setTimeout(()=>{document.querySelectorAll(".dot-btn").forEach(t=>{t.addEventListener("click",function(){this.classList.contains("dot-removed")||(this.style.background==="rgb(25, 118, 210)"?(this.style.background="#e3f0ff",this.style.color="#1976d2"):(this.style.background="#1976d2",this.style.color="#fff"))}),t.addEventListener("dblclick",function(){this.classList.toggle("dot-removed")})})},0),document.getElementById("new").onclick=()=>{l=m(),f()}}f();
