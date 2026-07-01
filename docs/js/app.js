/* Boston 2026 — rendering engine & init. Loaded AFTER data.js. */

/* =========================================================
   RENDERING
   ========================================================= */
let activeDay = 0; // default to Arrival Day (Fri)

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

/* photo file base-name for an experience (strip emoji, parentheticals, and trailing " — ...") */
function placeName(s){
  return (s||"")
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu,"")
    .replace(/\s*[—–]\s.*$/,"")          // cut at em/en-dash subtitle
    .replace(/\s*\([^)]*\)\s*/g," ")      // drop (parentheticals)
    .replace(/\s{2,}/g," ").trim();
}
/* gallery for an experience: try your real photos in images/places/<name>-1.png …,
   then fall back to the existing stand-in image for that slot. Drop files in to use. */
function placePhotos(a){
  if(a.noPhotos) return [];
  // keep explicit REAL local photos (e.g., the bakery crawl pulls from images/food/…)
  if(a.imgs && a.imgs.length){
    var first=a.imgs[0], s=Array.isArray(first)?first[0]:first;
    if(typeof s==='string' && s.indexOf('images/')===0) return a.imgs;
  }
  // otherwise show ONLY the photos uploaded to images/places/ (no stock/stand-ins)
  var arr = PLACE_PHOTOS[a.pl || pkey(placeName(a.name))];
  return (arr && arr.length) ? arr.map(function(p){return [p];}) : [];
}

function activityCard(a){
  let chips="";
  if(a.leg) chips+='<span class="chip leg">'+a.leg+'</span>';
  if(a.price) chips+='<span class="chip price">💲 '+a.price.replace(/\n/g,' / ')+'</span>';
  if(a.pref&&a.pref.total) chips+='<span class="chip score">★ Group score '+a.pref.total+'</span>';
  if(a.hours) chips+='<span class="chip hours">🕒 '+a.hours.replace(/\n/g,' · ')+'</span>';

  let body='';
  body+=galleryHTML(placePhotos(a));
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

/* auto cuisine label from the spot's name + description */
function cuisineTag(e){
  if(e.cuisine===false) return "";
  if(e.cuisine) return ' <span class="cuisine-tag">'+e.cuisine+'</span>';
  const name=(e.n||"").toLowerCase();
  const s=(name+" "+(e.d||"")).toLowerCase();
  const hasN=a=>a.some(w=>name.indexOf(w)>=0);   // name only — for "area / explore" entries
  const has=a=>a.some(w=>s.indexOf(w)>=0);        // name + description
  let c=null;
  if(hasN(["pack a picnic","charles street","more near","center dining","newbury street restaurants","grab lunch","quincy market","north quincy","food hall"])) c="🍽️ Varied";
  else if(has(["carmelina","antico","forno","giacomo","ristorante","trattoria","mercato"])) c="🍝 Italian";
  else if(has(["pizzeria","pizza","regina"])) c="🍕 Pizza";
  else if(has(["cannoli","pastry","bakery","tatte","mike's","modern pastry","croissant","flour"])) c="🥐 Bakery";
  else if(has(["churrascaria","brazilian","midwest grill","rodizio"])) c="🥩 Brazilian";
  else if(has(["peruvian","machu picchu","lomo saltado"])) c="🇵🇪 Peruvian";
  else if(has(["puerto rican","mofongo","vejigantes","escondido"])) c="🇵🇷 Puerto Rican";
  else if(has(["taqueria","taco","burrito","mexican","chilacates","tito","pelon","cantina"])) c="🌮 Mexican";
  else if(has(["indian","curry","sarva","tandoori","naan"])) c="🍛 Indian";
  else if(has(["sushi","jiro","sashimi"])) c="🍣 Sushi";
  else if(has(["dim sum","hot pot","chinatown","cantonese","korean","pho"])) c="🥟 Asian";
  else if(has(["bbq","barbecue","brisket","triple s","sweet cheeks"])) c="🍖 BBQ";
  else if(has(["italian","pasta"])) c="🍝 Italian";
  else if(has(["hot chicken","fried chicken","cane","chicken finger","chicken tender"])) c="🍗 Chicken";
  else if(has(["pub","sports bar","greatest bar","warehouse","banshee","dubliner","brick alley"])) c="🍺 Pub";
  else if(has(["burger","wahlburgers","bartley","mission","paramount"])) c="🍔 Burgers";
  else if(has(["deli","sandwich","sam lagrassa","stephanie"])) c="🥪 Sandwiches";
  else if(has(["oyster","clam","lobster","seafood","mooring","neptune","saltie","legal sea","sail loft","flo's","atlantic fish","yankee","tony"])) c="🦞 Seafood";
  return c ? ' <span class="cuisine-tag">'+c+'</span>' : "";
}

/* typical opening hours by spot/type (approximate — Map button has live hours).
   An explicit e.hours always wins. */
function eatHours(e){
  if(e.hours) return e.hours;
  const s=((e.n||"")+" "+(e.d||"")).toLowerCase();
  const has=a=>a.some(w=>s.indexOf(w)>=0);
  if(has(["pack a picnic"])) return null;
  if(has(["mike's pastry"])) return "8 AM–10 PM";
  if(has(["modern pastry"])) return "7 AM–11 PM";
  if(has(["neptune"])) return "11 AM–9:30 PM (Fri/Sat to 10:30)";
  if(has(["quincy market","faneuil"])) return "10 AM–9 PM (Sun 12–6)";
  if(has(["sam lagrassa"])) return "Mon–Fri 11 AM–3:30 PM (lunch only)";
  if(has(["clam shop","clam shack","easton","flo's","tony's"])) return "≈ 11 AM–8 PM (seasonal)";
  if(has(["bakery","cafe","café","tatte","flour","pastry","cannoli","mercato"])) return "≈ 7 AM–8 PM";
  if(has(["pub","sports bar","greatest bar","warehouse","dubliner","brick alley"])) return "≈ 11 AM–1 AM";
  if(has(["food hall","market","high street","center dining","newbury street restaurants","more near","grab lunch","quincy center","north quincy","dim sum","hot pot","chinatown"])) return "Varies by venue";
  if(has(["cane","dave's hot","chilacates","pelon","taqueria","taco","burrito"])) return "≈ 11 AM–10 PM";
  return "≈ 11:30 AM–10 PM";   // default sit-down restaurant
}

function eatHTML(e){
  let walkClass = e.far ? "walk far" : "walk";
  let loc = e.loc || "Boston, MA";
  let photos = e.imgs||eatPhotos(e);
  let tags = cuisineTag(e);   // cuisine label already conveys seafood vs non-seafood

  // collapsed summary line (hours · walk · price · photos) — shown right under the name
  let hrs=eatHours(e);
  let summary='';
  let hasWalk = e.walk && e.walk!=="—" && e.walk!=="-";
  if(hrs) summary+='<span class="hrs-chip">🕒 '+hrs+'</span>';
  if(hasWalk) summary+=(summary?' &bull; ':'')+'<span class="'+walkClass+'">🚶 '+e.walk+'</span>';
  if(e.price) summary+=(summary?' &bull; ':'')+'<b style="color:var(--green)">'+e.price+'</b>';
  if(photos.length) summary+=(summary?' &bull; ':'')+'<span class="photo-count">📷 '+photos.length+'</span>';

  let head='<div class="eat-head" onclick="this.parentNode.classList.toggle(\'open\')">'+
    '<div class="eat-title"><div class="en">'+e.n+tags+'</div>'+
    (summary?'<div class="ed eat-summary">'+summary+'</div>':'')+'</div>'+
    '<div class="expander">+</div></div>';

  let body='<div class="eat-body">';
  if(e.d) body+='<div class="ed eat-desc">'+e.d+'</div>';
  if(e.transit) body+='<div class="transit" style="margin:6px 0"><span class="star">★</span> '+e.transit+'</div>';
  body+=galleryHTML(photos);   // your real photos (none shown if you have none for this spot)
  body+='<div class="eat-links">';
  body+='<a class="maps-link" style="font-size:14px;padding:5px 11px" target="_blank" rel="noopener" href="'+(e.maps||mapsQ(e.n+" "+loc))+'">🗺️ Map</a>';
  body+='<a class="btn alt" style="font-size:14px;padding:5px 11px" target="_blank" rel="noopener" href="'+mapsQ(e.n+" "+loc+" photos")+'">📷 Google photos</a>';
  body+='<a class="btn alt" style="font-size:14px;padding:5px 11px;border-color:#d32323;color:#d32323" target="_blank" rel="noopener" href="'+yelpQ(e.n,loc)+'">⭐ Yelp photos</a>';
  body+='</div></div>';

  return '<div class="eat">'+head+body+'</div>';
}

/* tongue-in-cheek "forecast" per day (by index) */
const FORECASTS=[
  "Forecast: scattered hugs at the airport, 100% chance of lobster 🦞",
  "Forecast: sunny &amp; patriotic, with a fireworks finale after dark 🎆",
  "Forecast: sandy everything, rogue seagulls, SPF strongly advised 🏖️",
  "Forecast: heavy cannoli, low visibility through the pasta steam 🍝",
  "Forecast: gusts of Gilded-Age envy with passing seafood showers ⛵",
  "Forecast: highly cultured, with a late chance of museum-feet 🎨",
  "Forecast: bittersweet skies, 100% chance of 'just one more pastry' 🥐"
];
function surpriseMe(){
  let d=DATA.days[activeDay], names=[];
  d.blocks.forEach(b=>(b.eats||[]).forEach(e=>{ if(!/^More near|^Or grab|picnic/i.test(e.n)) names.push(e.n); }));
  let out=document.getElementById('surpriseOut');
  if(!out) return;
  if(!names.length){ out.innerHTML="🧺 No spots listed today — picnic it is!"; return; }
  let pick=names[Math.floor(Math.random()*names.length)];
  out.innerHTML='🍽️ The dice says: <b>'+pick+'</b>!';
}

function renderDay(d){
  let h='';
  let di=DATA.days.indexOf(d);
  h+='<div class="day-banner"><span class="lob-emoji" style="cursor:pointer" title="tap to celebrate!" onclick="emojiRain([\''+(d.emoji||'🦞')+'\'])">'+(d.emoji||'🦞')+'</span>';
  h+='<h2>'+d.theme+'</h2>';
  h+='<div class="sub">'+d.dow+', '+d.date+(d.tagline?' &mdash; '+d.tagline:'')+'</div>';
  h+='<div class="forecast">📡 '+(FORECASTS[di]||"Forecast: 100% chance of lobster 🦞")+'</div>';
  h+='</div>';
  h+='<div class="surprise-bar"><button class="surprise-btn" onclick="surpriseMe()">🎲 Surprise me — where do we eat?</button> <span id="surpriseOut" class="surprise-out"></span></div>';

  d.blocks.forEach(b=>{
    let meal = (b.slot==="Lunch"||b.slot==="Dinner");
    h+='<div class="slot"><span class="slot-label'+(meal?' meal':'')+'">'+b.icon+' '+b.slot+'</span>';
    if(b.note) h+='<div class="slot-note">'+b.note+'</div>';
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
  // wavy "road" drawn as a smooth SVG curve passing through every milestone dot
  const n=DATA.days.length, UP=34, DOWN=66;
  let nodes=[[0,(0%2===0)?UP:DOWN]];
  DATA.days.forEach((d,i)=>nodes.push([(i+0.5)/n*100, (i%2===0)?UP:DOWN]));
  nodes.push([100, nodes[nodes.length-1][1]]);
  let path="M"+nodes[0][0].toFixed(1)+","+nodes[0][1].toFixed(1), prev=nodes[0];
  for(let k=1;k<nodes.length;k++){ let p=nodes[k], mx=((prev[0]+p[0])/2).toFixed(1);
    path+=" C"+mx+","+prev[1].toFixed(1)+" "+mx+","+p[1].toFixed(1)+" "+p[0].toFixed(1)+","+p[1].toFixed(1); prev=p; }
  h+='<svg class="road-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="'+path+'"/></svg>';

  DATA.days.forEach((d,i)=>{
    let dow=(d.dow||"").slice(0,3);
    let dir=(i%2===0)?'up':'down';
    h+='<button class="milestone '+dir+(i===activeDay?' active':'')+'" onclick="selectDay('+i+')" title="'+(d.theme||"")+'">'+
       '<span class="ms-dot">'+(d.emoji||'📍')+'</span>'+
       '<span class="ms-label"><span class="ms-dow">'+dow+'</span><span class="ms-date">'+d.date+'</span><span class="ms-theme">'+(d.short||d.theme)+'</span></span>'+
       '</button>';
  });
  document.getElementById('dayPills').innerHTML='<div class="road-track">'+h+'</div>';
}
function selectDay(i){
  activeDay=i; renderPills();
  document.getElementById('dayContent').innerHTML=renderDay(DATA.days[i]);
  initImgs(document.getElementById('dayContent'));
  if(/Fourth of July/.test(DATA.days[i].theme||"")) setTimeout(function(){ emojiRain(['🎆','🎇','✨','🎉'],55); }, 300);
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

/* ---- inline goofy cartoon "monster" avatar (no external images) ---- */
function monsterSVG(o){
  o=o||{}; const c=o.c||"#ff7eb6";
  let g='<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">';
  if(o.dino) g+='<g fill="#3f8f3f"><path d="M30 22 l6 -15 l6 15 Z"/><path d="M44 18 l6 -16 l6 16 Z"/><path d="M58 22 l6 -15 l6 15 Z"/></g>';
  if(o.acc==="antennae") g+='<g stroke="'+c+'" stroke-width="3"><line x1="38" y1="22" x2="31" y2="7"/><line x1="62" y1="22" x2="69" y2="7"/></g><circle cx="31" cy="6" r="4" fill="'+c+'"/><circle cx="69" cy="6" r="4" fill="'+c+'"/>';
  g+='<ellipse cx="50" cy="55" rx="33" ry="35" fill="'+c+'"/>';
  g+='<ellipse cx="50" cy="62" rx="19" ry="20" fill="#ffffff" opacity="0.16"/>';
  // eyes
  g+='<circle cx="39" cy="48" r="11" fill="#fff"/><circle cx="61" cy="48" r="11" fill="#fff"/>';
  g+='<circle cx="41" cy="50" r="5" fill="#241c16"/><circle cx="59" cy="50" r="5" fill="#241c16"/>';
  g+='<circle cx="43" cy="48" r="1.7" fill="#fff"/><circle cx="61" cy="48" r="1.7" fill="#fff"/>';
  // cheeks
  g+='<circle cx="28" cy="60" r="5" fill="#ff9aae" opacity="0.55"/><circle cx="72" cy="60" r="5" fill="#ff9aae" opacity="0.55"/>';
  // big grin (mouth, tongue, teeth)
  g+='<path d="M36 66 Q50 82 64 66 Q50 74 36 66 Z" fill="#3a1620"/>';
  g+='<path d="M44 72 Q50 77 56 72 Z" fill="#ff7d97"/>';
  g+='<rect x="41" y="65.5" width="18" height="3.4" rx="1" fill="#fff"/>';
  if(o.dino) g+='<circle cx="46" cy="60" r="1.6" fill="#2f6f2f"/><circle cx="54" cy="60" r="1.6" fill="#2f6f2f"/>';
  if(o.acc==="glasses") g+='<g fill="none" stroke="#241c16" stroke-width="2.6"><circle cx="39" cy="48" r="13"/><circle cx="61" cy="48" r="13"/><line x1="52" y1="48" x2="48" y2="48"/></g>';
  if(o.acc==="sun") g+='<g fill="#241c16"><rect x="26" y="40" width="22" height="14" rx="6"/><rect x="52" y="40" width="22" height="14" rx="6"/><rect x="46" y="45" width="8" height="3"/></g>';
  if(o.acc==="party") g+='<path d="M50 0 L38 20 L62 20 Z" fill="#ffd23f" stroke="#e0a800"/><circle cx="50" cy="1" r="3.5" fill="#ff5a5f"/><circle cx="45" cy="12" r="1.6" fill="#ff5a5f"/><circle cx="56" cy="15" r="1.6" fill="#36c98d"/>';
  if(o.acc==="bow") g+='<g fill="#ff4f81"><path d="M50 16 L36 8 L36 24 Z"/><path d="M50 16 L64 8 L64 24 Z"/></g><circle cx="50" cy="16" r="4" fill="#ff4f81"/>';
  g+='</svg>';
  return g;
}

/* ---- Crew view (cartoon avatars; Amanda is a dino) ---- */
const AWARDS={Mom:"🏅 Cannoli Connoisseur", Johnny:"🛋️ Most Chill", David:"🎂 Birthday VIP", Jillene:"🦪 Oyster Whisperer", Kevin:"🗺️ Chief Itinerary Officer", Amanda:"🦖 Resident Dinosaur"};
function renderMembers(){
  let h='<div class="panel"><h2>👥 Ocean Six</h2><p class="lead">'+DATA.membersIntro+'</p>';
  if(DATA.photosUrl) h+='<div class="photos-cta"><a class="photos-btn" href="'+DATA.photosUrl+'" target="_blank" rel="noopener">📸 Open the Shared Trip Photo Album</a><div class="photos-sub">Tap to view everyone’s pics — and add your own! 📲</div></div>';
  h+='<div class="crew">';
  (DATA.members||[]).forEach(p=>{
    let av = '<span class="avatar" style="background:'+p.color+'">'+(p.toon?monsterSVG(p.toon):(p.emoji||p.code))+'</span>';
    h+='<div class="crew-card">'+av+
       '<div class="crew-name">'+p.name+' <span class="crew-code">'+p.code+'</span></div>'+
       '<div class="crew-blurb">'+p.blurb+'</div>'+
       (p.fav?'<div class="crew-fav">❤️ '+p.fav+'</div>':'')+
       (AWARDS[p.name]?'<div class="crew-award">'+AWARDS[p.name]+'</div>':'')+
       '</div>';
  });
  h+='</div><p style="font-size:13px;color:#667;margin-top:14px">Andy &amp; Naomi join just for the <b>Newport day trip (Tue 7/7)</b>. The letters (M · Jo · D · Ji · K · A) match the scores on each activity.</p></div>';
  document.getElementById('view-crew').innerHTML=h;
}

function showView(v){
  ['itin','crew','fifa','info'].forEach(x=>{
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
  // phone swipe: left = next photo, right = previous
  let tsX=0, tsY=0;
  lb.addEventListener('touchstart',function(e){ if(e.touches&&e.touches.length===1){ tsX=e.touches[0].clientX; tsY=e.touches[0].clientY; } },{passive:true});
  lb.addEventListener('touchend',function(e){
    if(!e.changedTouches||!e.changedTouches.length) return;
    let dx=e.changedTouches[0].clientX-tsX, dy=e.changedTouches[0].clientY-tsY;
    if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)) lbStep(dx<0?1:-1);
  },{passive:true});
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
'<g fill="#ff8a8a" stroke="#e76b6b" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">'+
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
'<circle cx="54" cy="46" r="2.4" fill="#d65a5a" stroke="none"/><circle cx="66" cy="46" r="2.4" fill="#d65a5a" stroke="none"/>'+
'</g></svg>';
document.querySelectorAll('.lobster-decal').forEach(d=> d.innerHTML=LOBSTER_SVG);

/* ---- init ---- */
renderPills();
selectDay(activeDay);
renderFifa();
renderInfo();
renderMembers();
showView('crew');   // open on the Crew page
(function(){ var u=DATA.photosUrl; if(!u) return;
  var f=document.getElementById('fab-photos'); if(f) f.href=u;
})();
loadBackground();

/* ---- just-for-fun extras ---- */
const LOB_PUNS=[
  "Pinch me — we’re really in Boston! 🦞",
  "Shell yeah, vacation! 🦞",
  "We came for the lobster. We stayed for the lobster.",
  "Feeling shellfish? Order two lobster rolls.",
  "Wicked good, as they say ’round here.",
  "Keep calm and cannoli on. 🥐",
  "Today’s plan: snack accordingly.",
  "In butter we trust.",
  "Resistance is feudal — we’re touring mansions. 🏰",
  "Eat. Beach. Repeat."
];
function newPun(){ var el=document.getElementById('lobPun'); if(el) el.textContent=LOB_PUNS[Math.floor(Math.random()*LOB_PUNS.length)]; }
function emojiRain(chars, count){
  if(typeof chars==='string') chars=[chars];
  if(!chars||!chars.length) chars=['🦞'];
  count=count||70;
  for(var i=0;i<count;i++){ (function(){
    var s=document.createElement('div'); s.className='lobdrop';
    s.textContent=chars[Math.floor(Math.random()*chars.length)];
    s.style.left=(Math.random()*98)+'vw';
    var size=14+Math.random()*52;                       // ~14–66px
    var dur=2.4 + ((size-14)/52)*3.4 + Math.random()*0.4; // bigger = slower (depth)
    s.style.fontSize=size+'px';
    s.style.opacity=(0.6 + (size-14)/52*0.4).toFixed(2);  // bigger = a touch bolder
    s.style.animationDuration=dur+'s';
    s.style.animationDelay=(Math.random()*0.6)+'s';
    document.body.appendChild(s);
    setTimeout(function(){ s.remove(); }, (dur+0.8)*1000);
  })(); }
}
function lobsterRain(){ emojiRain(['🦞'],70); }
/* countdown: "X sleeps until lobster" */
(function(){
  var el=document.getElementById('countdown'); if(!el) return;
  var start=new Date(2026,6,3), end=new Date(2026,6,9,23,59,59), now=new Date();
  var msg;
  if(now>end) msg="🦞 Hope the trip was wicked good!";
  else if(now>=start) msg="🦞 We’re on the trip — eat accordingly!";
  else { var days=Math.ceil((start-now)/86400000); msg="🦞 "+days+" sleep"+(days===1?"":"s")+" until lobster!"; }
  el.textContent=msg;
})();

(function(){
  newPun();
  var lob=document.querySelector('footer .lob');
  if(lob) lob.addEventListener('click', function(){ lobsterRain(); newPun(); });
  var orig=document.title;
  document.addEventListener('visibilitychange', function(){
    document.title = document.hidden ? '🦞 come baaack — the cannoli’s getting cold!' : orig;
  });
})();
