const collections=[
{name:"Research Papers",description:"Published and selected research papers, essays, and longer-form studies.",type:"Publication",years:["2026"],keywords:["Research","Papers","Publications"]},
{name:"Datasets",description:"Structured datasets developed from original research and documented source material.",type:"Dataset",years:["2026"],keywords:["Data","Coding","Evidence"]},
{name:"Signals + Futures",description:"Signals, observations, hypotheses, and futures research developed through ongoing study.",type:"Futures",years:["2026"],keywords:["Signals","Futures","Foresight"]},
{name:"Methods",description:"Research methods, coding approaches, source structures, and documentation systems used across projects.",type:"Method",years:["2026"],keywords:["Methods","Coding","Sources"]}
];

const els={search:document.querySelector("#search"),type:document.querySelector("#type"),keyword:document.querySelector("#keyword"),list:document.querySelector("#list"),count:document.querySelector("#resultCount"),empty:document.querySelector("#empty"),clear:document.querySelector("#clear")};
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const uniq=a=>[...new Set(a)].sort((a,b)=>a.localeCompare(b));
function addOption(el,v){const o=document.createElement("option");o.value=v;o.textContent=v;el.appendChild(o)}
uniq(collections.map(x=>x.type)).forEach(v=>addOption(els.type,v));
uniq(collections.flatMap(x=>x.keywords)).forEach(v=>addOption(els.keyword,v));
function render(){
  const q=els.search.value.trim().toLowerCase(),type=els.type.value,keyword=els.keyword.value;
  const rows=collections.filter(r=>{
    const hay=[r.name,r.description,r.type,...r.keywords].join(" ").toLowerCase();
    return(!q||hay.includes(q))&&(!type||r.type===type)&&(!keyword||r.keywords.includes(keyword));
  });
  els.list.innerHTML=rows.map(r=>'<article class="resource"><h2>'+esc(r.name)+'</h2><p class="description">'+esc(r.description)+'</p><div class="taxonomy"><span><strong>'+esc(r.type)+'</strong></span><span>'+esc(r.keywords.join(" · "))+'</span></div></article>').join("");
  els.count.textContent=rows.length+" of "+collections.length+" collections";
  els.empty.hidden=rows.length!==0;
}
[els.search,els.type,els.keyword].forEach(el=>el.addEventListener("input",render));
els.clear.addEventListener("click",()=>{els.search.value="";els.type.value="";els.keyword.value="";render();els.search.focus()});
render();