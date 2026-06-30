/* Boston 2026 — rendering engine & init. Loaded AFTER data.js. */

/* =========================================================
   RENDERING
   ========================================================= */
let activeDay = 1; // default to the Fourth (themed)

function scoreClass(v){return v>=3?"v3":(v==2?"v2":"v1");}

function galleryHTML(imgs, mapsName){
  if(!imgs||!imgs.length) return "";
  let h='<div class="gallery">';
  imgs.forEach(srcs=>{
    h+='<img loading="lazy" alt="" data-srcs=\''+JSON.stringify(srcs)+'\' onerror="imgErr(this)">';
  });
  h+='</div>';
  return h;
}
function imgErr(el){
  let s=JSON.parse(el.dataset.srcs||"[]");
  let i=parseInt(el.dataset.i||"0",10);
  if(i< s.length){ el.dataset.i=i+1; el.src=s[i]; }
  else { el.style.display='none'; }
}
function initImgs(scope){
  (scope||document).querySelectorAll('img[data-srcs]').forEach(el=>{
    if(el.dataset.started) return; el.dataset.started=1;
    let s=JSON.parse(el.dataset.srcs||"[]"); el.dataset.i=1;
    if(s.length){ el.src=s[0]; } else { el.style.display='none'; }
  });
}

function transitHTML(t){
  if(!t) return "";
  return '<div class="transit"><span class="star">★</span> '+t.html+'</div>';
}

function scoresHTML(p){
  if(!p) return "";
  let h='<div class="scores">';
  PPL.forEach(who=>{
    let v=p[who];
    if(v===undefined||v===null||v==="") { h+='<div class="score-box"><div class="who">'+who+'</div><div class="val v1">–</div></div>'; }
    else h+='<div class="score-box"><div class="who">'+who+'</div><div class="val '+scoreClass(v)+'">'+v+'</div></div>';
  });
  h+='<div class="score-box total"><div class="who">Total</div><div class="val">'+(p.total||"")+'</div></div>';
  h+='</div>';
  return h;
}

function activityCard(a){
  let chips="";
  if(a.price) chips+='<span class="chip price">💲 '+a.price.replace(/\n/g,' / ')+'</span>';
  if(a.pref&&a.pref.total) chips+='<span class="chip score">★ Group score '+a.pref.total+'</span>';
  if(a.hours) chips+='<span class="chip hours">🕒 '+a.hours.replace(/\n/g,' · ')+'</span>';

  let body='';
  body+=galleryHTML(a.imgs);
  if(a.notes) body+='<div class="notes">'+a.notes+'</div>';
  if(a.address) body+='<div class="detail"><b>📍 Address:</b> '+a.address.replace(/\n/g,', ')+'</div>';
  if(a.hours) body+='<div class="detail"><b>🕒 Hours:</b> '+a.hours.replace(/\n/g,' · ')+'</div>';
  if(a.price) body+='<div class="detail"><b>💲 Price:</b> '+a.price.replace(/\n/g,' · ')+'</div>';
  body+=transitHTML(a.transit);
  if(a.pref){ body+='<div class="detail"><b>How much do we want to go?</b> (1 = ok, 2 = ooh, 3 = YASS)</div>'+scoresHTML(a.pref); }
  // links
  body+='<div>';
  let mq = a.maps || mapsQ((a.name||"")+" "+(a.address||"Boston MA"));
  body+='<a class="maps-link" target="_blank" rel="noopener" href="'+mq+'">🗺️ Open in Google Maps</a>';
  body+='<a class="btn alt" target="_blank" rel="noopener" href="'+mapsQ((a.name||"")+" "+(a.address||"")+" photos")+'">📷 See real photos</a>';
  if(a.web) body+='<a class="btn alt" target="_blank" rel="noopener" href="'+a.web+'">🔗 Website</a>';
  body+='</div>';

  let metaBits=[];
  if(a.cat) metaBits.push(a.cat);
  let head='<div class="card-head" onclick="this.parentNode.classList.toggle(\'open\')">'+
    '<div class="card-title"><div class="cat">'+(a.cat||"")+'</div>'+
    '<div class="name">'+a.name+'</div>'+
    '<div>'+chips+'</div></div>'+
    '<div class="expander">+</div></div>';
  return '<div class="card">'+head+'<div class="card-body">'+body+'</div></div>';
}

function eatHTML(e){
  let walkClass = e.far ? "walk far" : "walk";
  let loc = e.loc || "Boston, MA";
  let h='<div class="eat">';
  h+='<div class="en">'+e.n+(e.seafood?' <span class="seafood-tag">🦞 Seafood</span>':'')+(e.nonsea?' <span class="nonsea-tag">🍗 Non-seafood</span>':'')+'</div>';
  if(e.walk) h+='<div class="ed"><span class="'+walkClass+'">🚶 '+e.walk+'</span>'+(e.price?' &bull; <b style="color:var(--green)">'+e.price+'</b>':'')+'</div>';
  if(e.d) h+='<div class="ed">'+e.d+'</div>';
  if(e.transit) h+='<div class="transit" style="margin:4px 0"><span class="star">★</span> '+e.transit+'</div>';
  // real photos you uploaded (food + ambiance); none shown if you haven't added any
  h+=galleryHTML(e.imgs||eatPhotos(e));
  h+='<div class="eat-links">';
  h+='<a class="maps-link" style="font-size:14px;padding:5px 11px" target="_blank" rel="noopener" href="'+(e.maps||mapsQ(e.n+" "+loc))+'">🗺️ Map</a>';
  h+='<a class="btn alt" style="font-size:14px;padding:5px 11px" target="_blank" rel="noopener" href="'+mapsQ(e.n+" "+loc+" photos")+'">📷 Google photos</a>';
  h+='<a class="btn alt" style="font-size:14px;padding:5px 11px;border-color:#d32323;color:#d32323" target="_blank" rel="noopener" href="'+yelpQ(e.n,loc)+'">⭐ Yelp photos</a>';
  h+='</div>';
  h+='</div>';
  return h;
}

function renderDay(d){
  let h='';
  h+='<div class="day-banner"><span class="lob-emoji">'+(d.emoji||'🦞')+'</span>';
  h+='<h2>'+d.theme+'</h2>';
  h+='<div class="sub">'+d.dow+', '+d.date+(d.tagline?' &mdash; '+d.tagline:'')+'</div></div>';

  d.blocks.forEach(b=>{
    let meal = (b.slot==="Lunch"||b.slot==="Dinner");
    h+='<div class="slot"><span class="slot-label'+(meal?' meal':'')+'">'+b.icon+' '+b.slot+'</span>';
    if(b.activities){ b.activities.forEach(a=> h+=activityCard(a)); }
    if(b.eatsIntro) h+='<div class="eats-intro">'+b.eatsIntro+'</div>';
    if(b.eats){ b.eats.forEach(e=> h+=eatHTML(e)); }
    h+='</div>';
  });

  if(d.optional){
    h+='<div class="optional"><h3>✨ Optional &amp; Nearby — worth a look</h3>';
    h+='<div class="ointro">Extra tourist &amp; historical stops near today’s plan (architecture · science · art · food · FIFA).</div>';
    d.optional.forEach(o=>{
      h+='<div class="opt">• <b>'+o.n+'</b> — '+o.d+' <a class="src-link" target="_blank" rel="noopener" href="'+(o.maps||mapsQ(o.n+" "+(o.loc||"")))+'">map ↗</a></div>';
    });
    h+='</div>';
  }
  if(d.egg){
    h+='<div class="egg" title="🥚 Easter egg — you found the word of the day! Try the other themed days too.">🥚 Word of the day: <span class="bigword">'+d.egg.word+'</span> — '+d.egg.joke+'</div>';
  }
  return h;
}

function renderPills(){
  let h='';
  DATA.days.forEach((d,i)=>{
    h+='<div class="day-pill'+(i===activeDay?' active':'')+'" onclick="selectDay('+i+')">'+
       '<div class="dow">'+d.dow+'</div><div class="dt">'+d.date+'</div>'+
       '<div class="th">'+(d.short||d.theme)+'</div></div>';
  });
  document.getElementById('dayPills').innerHTML=h;
}
function selectDay(i){
  activeDay=i; renderPills();
  document.getElementById('dayContent').innerHTML=renderDay(DATA.days[i]);
  initImgs(document.getElementById('dayContent'));
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ---- FIFA view ---- */
function renderFifa(){
  let f=DATA.fifa;
  let h='<div class="panel"><h2>⚽ FIFA World Cup 2026 — Boston</h2>';
  h+='<p class="lead">'+f.intro+'</p>';
  h+='<div class="hero-match"><div class="big">'+f.hero.title+'</div><div class="when">'+f.hero.when+'</div><div style="margin-top:6px">'+f.hero.detail+'</div></div>';
  h+='<h3 style="color:var(--ocean-deep);margin:6px 0">Events &amp; matches during your trip (7/3 – 7/9)</h3>';
  h+='<table class="fifa"><thead><tr><th>Event / Match</th><th>Location (address &amp; neighborhood)</th><th>Details</th></tr></thead><tbody>';
  f.events.forEach(e=>{
    h+='<tr><td class="ev">'+e.name+'</td><td>'+e.loc+'</td><td>'+e.details+'</td></tr>';
  });
  h+='</tbody></table>';
  f.notes.forEach(n=> h+='<div class="note-box">'+n+'</div>');
  h+='<p style="font-size:13px;color:#667;margin-top:14px">Sources: FIFA.com, Gillette Stadium, MeetBoston, CBS Boston, WBUR. Knockout match-ups (and the July 9 quarter-final teams) depend on earlier-round results.</p>';
  h+='</div>';
  document.getElementById('view-fifa').innerHTML=h;
}

/* ---- Info view ---- */
function renderInfo(){
  document.getElementById('view-info').innerHTML=DATA.info;
}

function showView(v){
  ['itin','fifa','info'].forEach(x=>{
    document.getElementById('view-'+x).classList.toggle('hidden', x!==v);
    document.getElementById('tab-'+x).classList.toggle('active', x===v);
  });
  if(v==='fifa') initImgs(document.getElementById('view-fifa'));
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ---- Background photo loader (Wollaston Beach, Quincy) ---- */
function loadBackground(){
  const candidates = DATA.bg;
  let i=0;
  (function tryNext(){
    if(i>=candidates.length) return; // keep gradient
    let url=candidates[i++];
    let im=new Image();
    im.onload=function(){
      let bg=document.getElementById('bg');
      bg.style.backgroundImage="url('"+url+"')";
      bg.classList.add('has-photo');
    };
    im.onerror=tryNext;
    im.src=url;
  })();
}

/* ---- Lightbox: tap any photo to enlarge, with prev/next ---- */
let _lb={list:[],i:0,cap:""};
function buildLightbox(){
  if(document.getElementById('lightbox')) return;
  let lb=document.createElement('div');
  lb.id='lightbox'; lb.className='lightbox';
  lb.innerHTML='<span class="lb-close" title="Close (Esc)">&times;</span>'+
    '<span class="lb-nav lb-prev" title="Previous (←)">&#8249;</span>'+
    '<img alt="">'+
    '<span class="lb-nav lb-next" title="Next (→)">&#8250;</span>'+
    '<div class="lb-cap"></div>';
  document.body.appendChild(lb);
  lb.querySelector('.lb-close').onclick=closeLightbox;
  lb.querySelector('.lb-prev').onclick=function(e){e.stopPropagation(); lbStep(-1);};
  lb.querySelector('.lb-next').onclick=function(e){e.stopPropagation(); lbStep(1);};
  lb.onclick=function(e){ if(e.target===lb) closeLightbox(); };
}
function lbShow(){
  let lb=document.getElementById('lightbox');
  lb.querySelector('img').src=_lb.list[_lb.i];
  let multi=_lb.list.length>1;
  lb.querySelector('.lb-prev').style.display=multi?'block':'none';
  lb.querySelector('.lb-next').style.display=multi?'block':'none';
  lb.querySelector('.lb-cap').innerHTML=(_lb.cap||"")+(multi?' <span class="count">'+(_lb.i+1)+' / '+_lb.list.length+'</span>':'');
}
function lbStep(d){ if(!_lb.list.length) return; _lb.i=(_lb.i+d+_lb.list.length)%_lb.list.length; lbShow(); }
function openLightbox(list,i,cap){ buildLightbox(); _lb.list=list; _lb.i=i; _lb.cap=cap||""; lbShow(); document.getElementById('lightbox').classList.add('open'); }
function closeLightbox(){ let lb=document.getElementById('lightbox'); if(lb) lb.classList.remove('open'); }
document.addEventListener('keydown',function(e){
  let lb=document.getElementById('lightbox'); if(!lb||!lb.classList.contains('open')) return;
  if(e.key==='Escape') closeLightbox();
  else if(e.key==='ArrowLeft') lbStep(-1);
  else if(e.key==='ArrowRight') lbStep(1);
});
document.addEventListener('click',function(e){
  let img=e.target.closest ? e.target.closest('.gallery img') : null;
  if(!img) return;
  let gal=img.closest('.gallery');
  let imgs=[].slice.call(gal.querySelectorAll('img')).filter(function(x){return x.style.display!=='none' && x.getAttribute('src');});
  let list=imgs.map(function(x){return x.getAttribute('src');});
  let idx=imgs.indexOf(img); if(idx<0) idx=0;
  let cap=""; let host=img.closest('.eat')||img.closest('.card');
  if(host){ let n=host.querySelector('.en')||host.querySelector('.card-title .name'); if(n) cap=n.textContent.trim(); }
  openLightbox(list, idx, cap);
});

/* ---- lobster decals ---- */
const LOBSTER_SVG = '<svg viewBox="0 0 120 152" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+
'<g fill="#c0392b" stroke="#7d1f17" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">'+
'<path d="M52 30 Q34 6 18 9" fill="none"/><path d="M68 30 Q86 6 102 9" fill="none"/>'+
'<path d="M44 54 L26 50" stroke-width="5"/><path d="M76 54 L94 50" stroke-width="5"/>'+
'<ellipse cx="24" cy="48" rx="16" ry="11" transform="rotate(-28 24 48)"/>'+
'<path d="M12 41 l-9 -7 M16 55 l-10 4" stroke-width="3" fill="none"/>'+
'<ellipse cx="96" cy="48" rx="16" ry="11" transform="rotate(28 96 48)"/>'+
'<path d="M108 41 l9 -7 M104 55 l10 4" stroke-width="3" fill="none"/>'+
'<ellipse cx="60" cy="50" rx="14" ry="16"/><ellipse cx="60" cy="70" rx="13" ry="14"/>'+
'<ellipse cx="60" cy="88" rx="11" ry="12"/><ellipse cx="60" cy="104" rx="9" ry="10"/>'+
'<path d="M49 66 l-18 6 M49 78 l-18 11 M49 90 l-16 12 M71 66 l18 6 M71 78 l18 11 M71 90 l16 12" stroke-width="3" fill="none"/>'+
'<path d="M60 113 q-20 17 -11 32 q11 -9 11 -9 q0 0 11 9 q9 -15 -11 -32 Z"/>'+
'<circle cx="54" cy="46" r="2.4" fill="#7d1f17" stroke="none"/><circle cx="66" cy="46" r="2.4" fill="#7d1f17" stroke="none"/>'+
'</g></svg>';
document.querySelectorAll('.lobster-decal').forEach(d=> d.innerHTML=LOBSTER_SVG);

/* ---- init ---- */
renderPills();
selectDay(activeDay);
renderFifa();
renderInfo();
loadBackground();
