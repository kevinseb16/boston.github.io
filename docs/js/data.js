/* Boston 2026 — trip CONTENT & data.
   Edit this file to change days, restaurants, photos, FIFA info, etc. */


/* =========================================================
   IMAGE HELPERS — reliable, self-healing photo sources.
   Each <img> gets a data-srcs list; if one fails it tries the
   next, finally hiding gracefully (the gradient card remains).
   ========================================================= */
function wm(file,w){return "https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(file)+"?width="+(w||800);}
function lf(keys,lock){return "https://loremflickr.com/800/520/"+keys+"?lock="+lock;}
function mapsQ(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q);}
function yelpQ(name,loc){return "https://www.yelp.com/search?find_desc="+encodeURIComponent(name)+"&find_loc="+encodeURIComponent(loc||"Boston, MA");}

/* =========================================================
   FOOD PHOTOS — real photos you placed in images/food/.
   Only spots present here show a gallery; others show none.
   Keyed by restaurant name (letters+digits only, lowercased).
   ========================================================= */
const FOOD_PHOTOS = {
  "carmelinas":["images/food/Carmelina_s-1.png","images/food/Carmelina_s-2.png","images/food/Carmelina_s-3.png","images/food/Carmelina_s-4.png","images/food/Carmelina_s-5.png","images/food/Carmelina_s-6.png","images/food/Carmelina_s-7.png","images/food/Carmelina_s-8.png","images/food/Carmelina_s-9.png","images/food/Carmelina_s-10.png"],
  "daveshotchicken":["images/food/Dave_s%20Hot%20Chicken-1.png","images/food/Dave_s%20Hot%20Chicken-2.png"],
  "gordonramsey":["images/food/Gordon%20Ramsey-1.png","images/food/Gordon%20Ramsey-2.png","images/food/Gordon%20Ramsey-3.png","images/food/Gordon%20Ramsey-4.png"],
  "jirossushi":["images/food/Jiro%E2%80%98s%20Sushi-1.png","images/food/Jiro%E2%80%98s%20Sushi-2.png","images/food/Jiro%E2%80%98s%20Sushi-3.png","images/food/Jiro%E2%80%98s%20Sushi-4.png","images/food/Jiro%E2%80%98s%20Sushi-5.png"],
  "manaescondidocafe":["images/food/Mana%CC%80%20Escondido%20Cafe-1.png","images/food/Mana%CC%80%20Escondido%20Cafe-2.png","images/food/Mana%CC%80%20Escondido%20Cafe-4.png","images/food/Mana%CC%80%20Escondido%20Cafe-5.png"],
  "mikespastry":["images/food/Mike_s%20Pastry-1.png","images/food/Mike_s%20Pastry-2.png","images/food/Mike_s%20Pastry-3.png","images/food/Mike_s%20Pastry-4.png","images/food/Mike_s%20Pastry-6.png"],
  "modernpastryshop":["images/food/Modern%20Pastry%20Shop-1.png","images/food/Modern%20Pastry%20Shop-2.png","images/food/Modern%20Pastry%20Shop-3.png"],
  "monicasmercato":["images/food/Monica_s%20Mercato-1.png","images/food/Monica_s%20Mercato-2.png","images/food/Monica_s%20Mercato-3.png","images/food/Monica_s%20Mercato-4.png","images/food/Monica_s%20Mercato-5.png"],
  "neptuneoyster":["images/food/Neptune%20Oyster-1.png","images/food/Neptune%20Oyster-2.png","images/food/Neptune%20Oyster-3.png","images/food/Neptune%20Oyster-4.png","images/food/Neptune%20Oyster-5.png"],
  "quincymarket":["images/food/Quincy%20Market-1.png","images/food/Quincy%20Market-2.png","images/food/Quincy%20Market-3.png","images/food/Quincy%20Market-4.png","images/food/Quincy%20Market-5.png"],
  "saltiegirl":["images/food/Saltie%20Girl-1.png","images/food/Saltie%20Girl-2.png","images/food/Saltie%20Girl-3.png","images/food/Saltie%20Girl-4.png","images/food/Saltie%20Girl-5.png","images/food/Saltie%20Girl-6.png"],
  "sarvaindiancuisine":["images/food/Sarva%20Indian%20Cuisine-1.png","images/food/Sarva%20Indian%20Cuisine-2.png","images/food/Sarva%20Indian%20Cuisine-3.png","images/food/Sarva%20Indian%20Cuisine-4.png","images/food/Sarva%20Indian%20Cuisine-5.png","images/food/Sarva%20Indian%20Cuisine-6.png","images/food/Sarva%20Indian%20Cuisine-7.png","images/food/Sarva%20Indian%20Cuisine-8.png","images/food/Sarva%20Indian%20Cuisine-9.png"],
  "sweetcheeksq":["images/food/Sweet%20Cheeks%20Q-1.png","images/food/Sweet%20Cheeks%20Q-2.png","images/food/Sweet%20Cheeks%20Q-3.png","images/food/Sweet%20Cheeks%20Q-4.png","images/food/Sweet%20Cheeks%20Q-5.png"],
  "tattebakerycafe":["images/food/Tatte%20Bakery%20&%20Cafe-1.png","images/food/Tatte%20Bakery%20&%20Cafe-2.png","images/food/Tatte%20Bakery%20&%20Cafe-3.png","images/food/Tatte%20Bakery%20&%20Cafe-4.png","images/food/Tatte%20Bakery%20&%20Cafe-5.png","images/food/Tatte%20Bakery%20&%20Cafe-6.png","images/food/Tatte%20Bakery%20&%20Cafe-7.png","images/food/Tatte%20Bakery%20&%20Cafe-8.png"],
  "triplescraftbbq":["images/food/Triple%20S%20Craft%20BBQ-1.png","images/food/Triple%20S%20Craft%20BBQ-2.png","images/food/Triple%20S%20Craft%20BBQ-3.png","images/food/Triple%20S%20Craft%20BBQ-4.png"],
  "vejigantesrestaurant":["images/food/Vejigantes%20Restaurant-1.png","images/food/Vejigantes%20Restaurant-2.png","images/food/Vejigantes%20Restaurant-3.png","images/food/Vejigantes%20Restaurant-4.png","images/food/Vejigantes%20Restaurant-5.png","images/food/Vejigantes%20Restaurant-6.png","images/food/Vejigantes%20Restaurant-7.png","images/food/Vejigantes%20Restaurant-8.png"]
};
function pkey(s){return (s||"").toLowerCase().replace(/[^a-z0-9]+/g,"");}
function eatPhotos(e){
  let arr = FOOD_PHOTOS[e.pk || pkey(e.n)];
  if(!arr || !arr.length) return [];
  return arr.slice(0,5).map(p=>[p]);   // cap at 5 per spot (matches the 4–5 guideline)
}
/* first n photos for a key, as gallery chains (used by the North End bakery crawl card) */
function pics(key,n){
  let arr=FOOD_PHOTOS[key]||[];
  return arr.slice(0,n||arr.length).map(p=>[p]);
}

/* =========================================================
   PEOPLE: M=Mom, Jo=Johnny, D=David, Ji=Jillene, K=Kevin, A=Amanda
   Preference scale: 1 = ok, 2 = ooh, 3 = YASS
   ========================================================= */
const PPL = ["M","Jo","D","Ji","K","A"];

/* Transit helper objects use: {star:true, html:"..."} */
function T(html){return {star:true, html:html};}

/* =========================================================
   DATA
   ========================================================= */
const DATA = {
  /* Wollaston Beach (Quincy, MA) background — tries real photos, else keeps the beach gradient */
  bg:[
    "images/wollaston-beach.jpg",
    "wollaston-beach.jpg",
    wm("Wollaston Beach, Quincy MA.jpg",1600),
    lf("wollaston,beach,quincy",901),
    lf("quincy,massachusetts,beach,ocean",902),
    lf("new,england,beach,coast,ocean",903)
  ],

  days:[
    /* ===================== FRI 7/3 — ARRIVAL ===================== */
    {
      dow:"Friday", date:"July 3", short:"Arrival Day", emoji:"🛬",
      theme:"Arrival Day — Cambridge & South Shore", tagline:"The family assembles, one delayed flight at a time. 🛬",
      blocks:[
        {slot:"Morning", icon:"🌅", activities:[
          {name:"MIT & Cambridge stroll", cat:"Boston (read with accent)",
           notes:"Amanda, Kevin & Johnny kick things off at MIT. Cambridge has more walking to get around — Harvard is close to Johnny's apartment. A relaxed start while the rest of the family travels in.",
           address:"MIT, 314 Main St, Cambridge, MA 02142",
           pref:{M:2,Jo:1,D:1,Ji:1,K:3,A:3,total:11},
           web:"http://mitmuseum.mit.edu/",
           transit:T('Right on the <span class="line-tag L-red">Red Line</span> — Kendall/MIT &amp; Harvard stops.'),
           imgs:[[wm("MIT Building 10 and the Great Dome, Cambridge MA.jpg"),lf("mit,campus,university",101)],[lf("harvard,cambridge,university",102)],[lf("cambridge,massachusetts,architecture",103)]]}
        ]},
        {slot:"Lunch", icon:"🍛", meal:true,
         eatsIntro:"Lunch near the morning at MIT — the sheet calls for Indian food, and Kendall/Central Square in Cambridge is full of great options.",
         eats:[
          {n:"Indian food near Kendall / Central Sq", d:"Group favorite (score 13). Several well-rated Indian spots a short walk from MIT.", walk:"5–12 min walk from MIT", price:"$12–25 pp",
           transit:'<span class="line-tag L-red">Red Line</span> — Kendall/MIT or Central.', maps:mapsQ("Indian restaurant near Kendall Square Cambridge MA")},
          {n:"Tatte Bakery & Cafe (Kendall Sq)", pk:"tattebakerycafe", nonsea:true, d:"Boston classic — fancy sandwiches, salads & pastries if you want something quick and pretty. (Zero lobsters were harmed.)", walk:"On campus / Kendall", price:"$12–20 pp",
           maps:mapsQ("Tatte Bakery Kendall Square Cambridge")}
        ]},
        {slot:"Afternoon", icon:"🏠", activities:[
          {name:"Check into the AirBnB", cat:"Logistics",
           notes:"6:00 PM — David & Jillene arrive. Get settled, unpack, regroup before dinner. Bring the card games (Johnny's got Clue!).",
           transit:T('Quincy base is on the <span class="line-tag L-red">Red Line</span> (Wollaston / Quincy Center).')}
        ]},
        {slot:"Dinner", icon:"🦞", meal:true,
         eatsIntro:"Welcome-to-New-England seafood dinner — the plan is Legal Sea Foods in Braintree, close to the South Shore base.",
         eats:[
          {n:"Legal Sea Foods — Braintree", seafood:true, d:"New England seafood institution. Clam chowder, lobster, fresh fish — easy, reliable first night.", walk:"Drive · South Shore Plaza", price:"$20–40 pp",
           transit:'<span class="line-tag L-red">Red Line</span> — Braintree (terminus).', maps:mapsQ("Legal Sea Foods Braintree MA")},
          {n:"Lobster — all day, every day 🦞", seafood:true, d:"Family motto (score 13). Wherever you land, get the lobster.", walk:"—", maps:mapsQ("lobster restaurant Braintree Quincy MA")}
        ]}
      ],
      optional:[
        {n:"Harvard Square & Harvard Yard", d:"Historic campus, bookshops & street performers — architecture + people-watching.", loc:"Cambridge, MA", maps:mapsQ("Harvard Yard Cambridge MA")},
        {n:"MIT Museum", d:"Robots, holography & AI — perfect for the science lovers.", loc:"314 Main St, Cambridge", maps:mapsQ("MIT Museum Cambridge MA")},
        {n:"Charles River Esplanade", d:"Walk or sit by the river with skyline views.", loc:"Boston, MA", maps:mapsQ("Charles River Esplanade Boston")}
      ]
    },

    /* ===================== SAT 7/4 — FOURTH OF JULY ===================== */
    {
      dow:"Saturday", date:"July 4", short:"Fourth of July", emoji:"🎆",
      theme:"Fourth of July — Downtown Boston", tagline:"Fireworks, freedom &amp; finding parking — you only get to pick two. 🎆",
      egg:{word:"Semiquincentennial", joke:"the word for a 250th anniversary — which is exactly how old the USA turns this year. Try saying it after the fireworks."},
      blocks:[
        {slot:"Morning", icon:"📜", activities:[
          {name:"Independence Reading at the Old State House", cat:"The Fourth",
           notes:"6:30 AM — Mumsy arrives! 9–11 AM: the Declaration of Independence is read from the balcony of the Old State House, just as it was in 1776. A top group pick (score 17) and the most Boston way to spend the Fourth.",
           hours:"9a–11a, July 4",
           address:"206 Washington St, Boston, MA 02109",
           pref:{M:3,Jo:2,D:3,Ji:3,K:3,A:3,total:17},
           transit:T('<span class="line-tag L-orange">Orange</span>/<span class="line-tag L-blue">Blue</span> — State St. station is at the door.'),
           imgs:[[wm("Old State House Boston Massachusetts.jpg"),lf("old,state,house,boston",201)],[lf("boston,colonial,history",202)],[lf("july,4th,parade,flag",203)]]}
        ]},
        {slot:"Lunch", icon:"🍴", meal:true,
         eatsIntro:"Lunch near the Old State House — Faneuil Hall & Quincy Market are a 3-minute walk, packed with options.",
         eats:[
          {n:"Quincy Market / Faneuil Hall Marketplace", pk:"quincymarket", nonsea:true, d:"Historic food hall with everything — pizza, burgers, mac & cheese AND chowder & lobster rolls (score 8). Something for every picky eater in the family.", walk:"3–4 min walk ★", price:"$20–30 pp",
           transit:'<span class="line-tag L-green">Green</span>/<span class="line-tag L-blue">Blue</span> — Government Center.', maps:"https://maps.app.goo.gl/UoZEiJfuEoFTuNy78"},
          {n:"Union Oyster House", seafood:true, d:"America's oldest restaurant (1826) — oysters & chowder right on the Freedom Trail. Toothpicks were basically invented here.", walk:"4 min walk", price:"$20–40 pp",
           maps:mapsQ("Union Oyster House Boston")},
          {n:"Raising Cane's (Solid Gold Edition)", nonsea:true, d:"Everything inside is literally gold. Fun, fast chicken fingers in Downtown Crossing — the non-seafood, kid-approved pick.", walk:"10–12 min walk", price:"$10–15 pp",
           transit:'<span class="line-tag L-red">Red</span>/<span class="line-tag L-orange">Orange</span> — Downtown Crossing.', maps:"https://maps.app.goo.gl/szvw2TFFBJzkA8N99"},
          {n:"Jiro's Sushi", seafood:true, pk:"jirossushi", d:"Chinatown sushi spot the group rated well (score 12) — a ~10-min walk if you want something different downtown.", walk:"Chinatown · 10–12 min", price:"$15–30 pp",
           transit:'<span class="line-tag L-orange">Orange</span> — Chinatown.', maps:mapsQ("Jiro's Sushi 32 Kneeland St Boston")}
        ]},
        {slot:"Afternoon", icon:"🏛️", activities:[
          {name:"Boston Tea Party Ships & Museum", cat:"The Fourth",
           notes:"Especially fitting for the Fourth. Pretty waterfront area — fun to walk around, see the Federal Reserve, South Station, Chinatown, walk by the river and the tall buildings.",
           price:"36",
           address:"306 Congress St, Boston, MA 02210",
           pref:{M:3,Jo:1,D:2,Ji:2,K:2,A:2,total:12},
           transit:T('<span class="line-tag L-red">Red</span>/<span class="line-tag L-silver">Silver</span> — South Station, 6-min walk.'),
           imgs:[[wm("Boston Tea Party Ships and Museum.jpg"),lf("boston,tea,party,ship",204)],[lf("tall,ship,harbor",205)],[lf("boston,waterfront,skyline",206)]]}
        ]},
        {slot:"Dinner", icon:"🍽️", meal:true,
         eatsIntro:"Grab an early dinner before staking out fireworks spots. Beacon Hill / Charles Street is close to the Esplanade.",
         eats:[
          {n:"Charles Street, Beacon Hill", nonsea:true, d:"Cozy pubs, burger joints & bistros a short walk from the Esplanade — eat before the crowds for the 7 PM concert.", walk:"By the Esplanade", price:"$15–35 pp",
           transit:'<span class="line-tag L-red">Red</span> — Charles/MGH.', maps:mapsQ("restaurants Charles Street Beacon Hill Boston")},
          {n:"Pack a picnic for the Esplanade", nonsea:true, d:"Many families bring blankets + sandwiches to the Hatch Shell lawn. The only dinner where saving your spot matters more than the menu.", walk:"—", maps:mapsQ("sandwich shop downtown Boston")}
        ]},
        {slot:"Evening", icon:"🎆", activities:[
          {name:"July 4th Concert & Fireworks at the Charles River", cat:"The Fourth",
           notes:"The big one — top score of the whole trip (18/18!). Venue opens to the public at 12 PM, concert at 7 PM, fireworks at 9:15 PM over the Charles. You can also watch from the MIT/Cambridge side of the river if the Esplanade is packed.",
           hours:"Venue open 12p · Concert 7p · Fireworks 9:15p",
           address:"DCR Hatch Shell, Esplanade, Boston, MA",
           pref:{M:3,Jo:3,D:3,Ji:3,K:3,A:3,total:18},
           transit:T('<span class="line-tag L-red">Red</span> — Charles/MGH · <span class="line-tag L-green">Green</span> — Arlington. (Expect closures & crowds — go early.)'),
           imgs:[[wm("Boston Pops Fireworks Spectacular.jpg"),lf("boston,fireworks,july,4th",207)],[lf("fireworks,river,city,night",208)],[lf("boston,esplanade,charles,river",209)]]}
        ]}
      ],
      optional:[
        {n:"Freedom Trail", d:"2.5-mile red-brick path linking 16 Revolutionary sites — from Boston Common to Bunker Hill. Self-guided & free.", loc:"Boston", maps:mapsQ("Freedom Trail Boston")},
        {n:"Faneuil Hall", d:"The 'Cradle of Liberty' — historic meeting hall & marketplace.", loc:"4 S Market St, Boston", maps:mapsQ("Faneuil Hall Boston")},
        {n:"Paul Revere House & Old North Church", d:"Two of the most famous Revolution-era sites, both in the North End.", loc:"North End, Boston", maps:mapsQ("Old North Church Boston")},
        {n:"New England Aquarium", d:"On the waterfront near the Tea Party Museum — penguins & the giant ocean tank.", loc:"1 Central Wharf, Boston", maps:mapsQ("New England Aquarium Boston")},
        {n:"Rose Kennedy Greenway", d:"Linear park with art, fountains & food trucks connecting downtown to the waterfront.", loc:"Boston", maps:mapsQ("Rose Kennedy Greenway Boston")}
      ]
    },

    /* ===================== SUN 7/5 — BEACH DAY ===================== */
    {
      dow:"Sunday", date:"July 5", short:"Beach Day!", emoji:"🏖️",
      theme:"Beach Day! — Quincy & Family Time", tagline:"You will be finding sand in your bag until roughly Labor Day. 🏖️",
      egg:{word:"Sphenopalatineganglioneuralgia", joke:"the actual medical term for a brain freeze — guaranteed if you inhale that beach ice cream too fast."},
      blocks:[
        {slot:"Morning", icon:"🏖️", activities:[
          {name:"Wollaston Beach — family beach morning", cat:"Local experience",
           notes:"The whole vibe of the trip (score 17). Walking, swimming & relaxing on Quincy's Wollaston Beach — the longest beach in Boston Harbor, with skyline views across the bay. Pack a swimsuit (water may be chilly!). Walkable clam shop + taco shop right across Quincy Shore Drive.",
           address:"Quincy Shore Dr, Quincy, MA 02170",
           pref:{M:3,Jo:2,D:3,Ji:3,K:3,A:3,total:17},
           transit:T('<span class="line-tag L-red">Red Line</span> — Wollaston station, ~12-min walk to the sand.'),
           imgs:[[wm("Wollaston Beach, Quincy MA.jpg"),lf("wollaston,beach,quincy",211)],[lf("beach,ocean,summer,sand",212)],[lf("boston,harbor,beach,skyline",213)]]}
        ]},
        {slot:"Lunch", icon:"🌮", meal:true,
         eatsIntro:"Lunch right across from the beach — the classic Quincy combo of a clam shack and a taco spot.",
         eats:[
          {n:"Tony's Clam Shop", seafood:true, d:"Wollaston Beach institution since 1964 — fried clams, lobster rolls & chowder, steps from the sand.", walk:"1–3 min walk ★", price:"$12–30 pp",
           transit:'On Quincy Shore Dr, across from the beach.', maps:mapsQ("Tony's Clam Shop Quincy MA")},
          {n:"Taco shop near Wollaston Beach", nonsea:true, d:"Casual tacos & burritos a short walk from the beach — easy, cheap and family-friendly. The non-seafood half of the classic beach-day combo.", walk:"5–10 min walk", price:"$10–18 pp",
           maps:mapsQ("tacos near Wollaston Beach Quincy MA")}
        ]},
        {slot:"Afternoon", icon:"☀️", activities:[
          {name:"More beach / family relax time", cat:"Local experience",
           notes:"Keep the beach day going — walk the 2+ mile shoreline, swim, or just relax. A low-key afternoon before the evening movie.",
           pref:{M:3,Jo:2,D:3,Ji:3,K:3,A:3,total:17},
           transit:T('<span class="line-tag L-red">Red Line</span> — Wollaston / Quincy Center.')}
        ]},
        {slot:"Evening", icon:"🎬", activities:[
          {name:"Supergirl — movie night", cat:"Local experience",
           notes:"A fun group outing (score 13). Showtimes from the sheet:\nAMC South Bay Center 12 — 1:45p (20% off), 2:30p (20% off), 5:15p, 7:00p.\nAMC Braintree 10 — 10:30a (20% off), 7:30p, 10:30p.\nNote: Costco — AG to buy AMC tickets for a free gift card.",
           address:"AMC South Bay Center 12, Boston / AMC Braintree 10",
           pref:{M:3,Jo:1,D:3,Ji:3,K:1,A:2,total:13},
           transit:T('AMC South Bay — near <span class="line-tag L-red">Red Line</span> Andrew + bus.'),
           imgs:[[lf("movie,theater,cinema",214)],[lf("popcorn,cinema,seats",215)]]}
        ]},
        {slot:"Dinner", icon:"🍔", meal:true,
         eatsIntro:"Dinner near the movie — South Bay Center (Dorchester) has plenty of casual spots.",
         eats:[
          {n:"South Bay Center dining (by AMC)", nonsea:true, d:"Cluster of casual restaurants right at the theater — burgers, tacos, ramen & more, easy before/after the film.", walk:"At the theater ★", price:"$12–30 pp",
           transit:'<span class="line-tag L-red">Red Line</span> — Andrew.', maps:mapsQ("South Bay Center restaurants Boston")},
          {n:"Dave's Hot Chicken", pk:"daveshotchicken", nonsea:true, d:"Really good, crispy & spicy — by the AMC, multiple locations (score 8). Pick your heat level wisely; 'Reaper' is not a dare to win.", walk:"Near AMC", price:"$10–18 pp",
           maps:mapsQ("Dave's Hot Chicken Boston")}
        ]}
      ],
      optional:[
        {n:"Adams National Historical Park", d:"Birthplaces & home of Presidents John & John Quincy Adams — major history, right in Quincy.", loc:"1250 Hancock St, Quincy", maps:mapsQ("Adams National Historical Park Quincy MA")},
        {n:"Thomas Crane Public Library", d:"H. H. Richardson Romanesque landmark — a gem for the architecture lovers.", loc:"40 Washington St, Quincy", maps:mapsQ("Thomas Crane Public Library Quincy MA")},
        {n:"Marina Bay", d:"Waterfront boardwalk with restaurants & sunset views over the harbor.", loc:"Quincy, MA", maps:mapsQ("Marina Bay Quincy MA")},
        {n:"Whale Watching (alt. big-day idea)", d:"2–4 hr boat trip to see whales & sea life (est. $70–90). Mom says: either whale watch OR the river tour — not both.", loc:"Boston Harbor", maps:mapsQ("whale watching Boston")}
      ]
    },

    /* ===================== MON 7/6 — LIL' ITALY ===================== */
    {
      dow:"Monday", date:"July 6", short:"Lil' Italy", emoji:"🇮🇹",
      theme:"Welcome to Lil' Italy — North End", tagline:"Come hungry, leave rolling. Stretchy pants strongly encouraged. 🇮🇹",
      egg:{word:"Precipitevolissimevolmente", joke:"the longest word in Italian (\"very hastily\") — also how fast that third cannoli will disappear."},
      blocks:[
        {slot:"Morning", icon:"🔬", activities:[
          {name:"Museum of Science (+ Planetarium / IMAX / Boat Tour)", cat:"Boston (read with accent)",
           notes:"James Webb telescope documentary at the IMAX Dome, the planetarium, and an incredible museum of science & natural history — dinosaurs and mammoths! A high pick for the science crew (score 14). Check times and consider pairing with the Charles River sightseeing boat tour nearby (more affordable than the duck boat).\n\n🎟️ Free museum pass via library: https://bpl.libcal.com/passes/25815fed11ec",
           price:"Gen admission $30 · IMAX Dome $10 ($6 w/ admission) · Planetarium $10 ($6 w/ admission)",
           hours:"Museum 9a–5p · IMAX Dome 11a, 3p · Planetarium 1:30p",
           address:"1 Museum of Science Driveway, Boston, MA 02114",
           pref:{M:2,Jo:2,D:2,Ji:2,K:3,A:3,total:14},
           transit:T('<span class="line-tag L-green">Green Line</span> — Science Park/West End is right outside.'),
           imgs:[[wm("Museum of Science, Boston, Massachusetts.jpg"),lf("museum,science,dinosaur",301)],[lf("planetarium,space,stars",302)],[lf("charles,river,boat,boston",303)]]}
        ]},
        {slot:"Lunch", icon:"🍝", meal:true,
         eatsIntro:"Lunch in the North End — the plan is Carmelinas. Italian heaven within a couple blocks of every afternoon stop.",
         eats:[
          {n:"Carmelinas", pk:"carmelinas", nonsea:true, d:"Possible birthday lunch for David! Beloved North End Italian (score 15) — pastas & pizzas, no seafood required. No reservations, so channel your patience.", walk:"North End · 5 min from Paul Revere House", price:"$20–40 pp",
           transit:'<span class="line-tag L-orange">Orange</span>/<span class="line-tag L-green">Green</span> — Haymarket.', maps:"https://www.google.com/maps/search/?api=1&query=Carmelina%27s%20307%20Hanover%20St%20Boston"},
          {n:"Monica's Mercato", pk:"monicasmercato", nonsea:true, d:"North End Italian deli & grocery (score 8) — knockout sub sandwiches stacked with imported meats & cheeses. Grab-and-go done right.", walk:"North End · 4 min", price:"$12–20 pp",
           transit:'<span class="line-tag L-orange">Orange</span>/<span class="line-tag L-green">Green</span> — Haymarket.', maps:mapsQ("Monica's Mercato 130 Salem St Boston")},
          {n:"Antico Forno", nonsea:true, d:"Brick-oven Italian recommended by Andy's family — great pizzas & pastas blistered in the wood oven.", walk:"North End", price:"$18–35 pp",
           maps:mapsQ("Antico Forno North End Boston")},
          {n:"Neptune Oyster", seafood:true, pk:"neptuneoyster", d:"Tiny, famous — oysters & a hot-buttered lobster roll, by the Paul Revere House (score 10). The wait is long; the lobster roll is longer.", walk:"3 min walk", price:"$25–40 pp",
           maps:mapsQ("Neptune Oyster 63 Salem St Boston")}
        ]},
        {slot:"Afternoon", icon:"🥐", activities:[
          {name:"North End Bakery Crawl 🥐", cat:"Fooood",
           notes:"Tour the Lil' Italy bakeries: Mike's Pastry (cannoli, score 17!), Modern Pastry Shop (pistachio cannoli & Napoleon, score 16), and Tatte's Cafe. Cannoli showdown — get one from each and compare.",
           address:"Mike's: 300 Hanover St · Modern: 257 Hanover St",
           hours:"Mike's 8a–10p · Modern 7a–11p",
           pref:{M:4,Jo:1,D:3,Ji:3,K:3,A:3,total:17},
           transit:T('<span class="line-tag L-orange">Orange</span>/<span class="line-tag L-green">Green</span> — Haymarket, 5–8 min walk.'),
           imgs:[].concat(pics("mikespastry",2),pics("modernpastryshop",2),pics("tattebakerycafe",1))},
          {name:"Paul Revere House", cat:"Boston (read with accent)",
           notes:"The oldest building in downtown Boston (c. 1680) and Paul Revere's colonial home. Close to Gordon Ramsay's restaurant and the Quincy Market area.",
           price:"6",
           address:"19 N Square, Boston, MA 02113",
           pref:{M:2,Jo:1,D:1,Ji:1,K:1,A:2,total:8},
           web:"https://www.paulreverehouse.org/",
           transit:T('<span class="line-tag L-orange">Orange</span>/<span class="line-tag L-green">Green</span> — Haymarket.'),
           imgs:[[wm("Paul Revere House, Boston.jpg"),lf("paul,revere,house,boston",307)],[lf("north,end,boston,street",308)]]}
        ]},
        {slot:"Evening + Dinner", icon:"⚽", meal:true,
         eatsIntro:"5 PM: FIFA match — watch in a pub! Dinner at Gordon Ramsay or a sports bar to catch the game. (Round of 16 runs this week — see the FIFA tab.)",
         eats:[
          {n:"Gordon Ramsay restaurant", pk:"gordonramsey", nonsea:true, d:"Near the Paul Revere House / Quincy Market (score 12). Burgers & beef Wellington — lively spot to eat & watch the match without anyone yelling 'it's RAW!'", walk:"North End edge · 8 min", price:"$25–40 pp",
           transit:'<span class="line-tag L-green">Green</span>/<span class="line-tag L-orange">Orange</span> — Haymarket.', maps:"https://maps.app.goo.gl/UPpu8Dx7wyF8BRNe9"},
          {n:"The Greatest Bar", nonsea:true, d:"Multi-floor sports bar by TD Garden with one of Boston's biggest HDTVs — wings, burgers & nachos for the FIFA game.", walk:"By North Station", price:"$15–30 pp",
           transit:'<span class="line-tag L-green">Green</span>/<span class="line-tag L-orange">Orange</span> — North Station. ★', maps:mapsQ("The Greatest Bar 262 Friend St Boston")},
          {n:"Warehouse Kitchen + Sports Bar", nonsea:true, d:"20 TVs showing every World Cup match, walkable from downtown. Pub grub central.", walk:"Financial District", price:"$15–30 pp",
           maps:mapsQ("Warehouse Bar 40 Broad St Boston")}
        ]}
      ],
      optional:[
        {n:"Old North Church", d:"'One if by land, two if by sea' — the famous 1723 church of Revere's midnight ride.", loc:"193 Salem St, Boston", maps:mapsQ("Old North Church Boston")},
        {n:"Copp's Hill Burying Ground", d:"Historic North End cemetery with harbor views.", loc:"Hull St, Boston", maps:mapsQ("Copp's Hill Burying Ground Boston")},
        {n:"Hanover Street", d:"The main drag of Lil' Italy — espresso bars, gelato & people-watching.", loc:"North End, Boston", maps:mapsQ("Hanover Street North End Boston")},
        {n:"Monica's Mercato", d:"Italian grocery & deli for sandwiches and imported goodies.", loc:"130 Salem St, Boston", maps:mapsQ("Monica's Mercato Boston")}
      ]
    },

    /* ===================== TUE 7/7 — NEWPORT ===================== */
    {
      dow:"Tuesday", date:"July 7", short:"Newport", emoji:"⛵",
      theme:"Visit Newport — The Gilded Age", tagline:"Touring 70-room \"summer cottages\" we will absolutely never afford. 🤑",
      egg:{word:"Floccinaucinihilipilification", joke:"the act of judging something as worthless — which is NOT what the Vanderbilts did with their spare gold leaf."},
      blocks:[
        {slot:"Morning", icon:"🏰", activities:[
          {name:"Newport Mansions — The Breakers & Marble House", cat:"A nice trip",
           notes:"BEAUTIFUL and LARGE estates — The Breakers, Marble House & more. About 1.5 hr south to Rhode Island. The TV show The Gilded Age was filmed here! A great group day (score 14). Architecture + art + ocean all at once.",
           price:"$32 – 1 house · $45 – 2 houses · $57 – 3 houses",
           address:"Bellevue Ave, Newport, RI 02840",
           pref:{M:3,Jo:3,D:1,Ji:1,K:3,A:3,total:14},
           web:"https://www.newportmansions.org/plan-a-visit/mansions-gardens/",
           transit:T('No subway — this is a drive (~1.5 hr). Free parking at most mansions.'),
           imgs:[[wm("The Breakers Newport.jpg"),lf("newport,mansion,gilded,age",401)],[wm("Marble House, Newport, Rhode Island.jpg"),lf("mansion,estate,architecture",402)],[lf("newport,rhode,island,ocean,cliff",403)]]}
        ]},
        {slot:"Lunch", icon:"🍖", meal:true,
         eatsIntro:"Lunch on the way down — Triple S Craft BBQ in Seekonk is right off the route to Newport.",
         eats:[
          {n:"Triple S Craft BBQ", pk:"triplescraftbbq", nonsea:true, d:"On the way to Newport (from the sheet). Craft barbecue — brisket, ribs & smoked meats to fuel the day. Fully non-seafood, fully worth the pit stop.", walk:"Drive · Seekonk, MA", price:"$15–30 pp",
           maps:mapsQ("Triple S Craft BBQ 68 Mink St Seekonk MA")},
          {n:"Or grab lunch in Newport", d:"If you'd rather push straight through, eat near the mansions — see the dinner picks below (seafood + burgers + tacos).", walk:"Newport", maps:mapsQ("lunch near Newport Mansions Bellevue Ave")}
        ]},
        {slot:"Afternoon", icon:"🌊", activities:[
          {name:"Cliff Walk & Newport Harbor", cat:"A nice trip",
           notes:"After the mansions, walk part of the famous 3.5-mile Cliff Walk — mansions on one side, crashing Atlantic on the other. Then wander the harbor and Thames Street shops before dinner.",
           address:"Cliff Walk, Newport, RI 02840",
           pref:{M:3,Jo:3,D:1,Ji:1,K:3,A:3,total:14},
           transit:T('Walkable from Bellevue Ave; free street parking around the wharves.'),
           imgs:[[wm("Newport Cliff Walk.jpg"),lf("cliff,walk,newport,ocean",404)],[lf("newport,harbor,sailboat",405)],[lf("rhode,island,coast,atlantic",406)]]}
        ]},
        {slot:"Dinner", icon:"🦞", meal:true,
         eatsIntro:"Dinner in Newport near the mansions/harbor — seafood standouts PLUS non-seafood options (burgers & tacos) so everyone's happy. All roughly $10–40 pp.",
         eats:[
          {n:"The Mooring Seafood Kitchen & Bar", seafood:true, d:"Frequently rated Newport's best lobster roll — lemon-chive aioli on toasted brioche, right on the harbor.", walk:"Harborfront · ~6 min drive from mansions", price:"$18–40 pp",
           maps:mapsQ("The Mooring Seafood Kitchen Newport RI")},
          {n:"Midtown Oyster Bar", seafood:true, d:"Trendy multi-level spot on Thames St — oysters, fresh fish & a lively crowd.", walk:"Thames St", price:"$15–38 pp",
           maps:mapsQ("Midtown Oyster Bar Newport RI")},
          {n:"Mission", nonsea:true, d:"Tiny, wildly popular burger joint on Lower Thames — top-rated, cheap and quick. The non-seafood MVP of Newport.", walk:"Lower Thames St", price:"$10–15 pp",
           maps:mapsQ("Mission Burgers Newport RI")},
          {n:"Tito's Cantina", nonsea:true, d:"Newport Mexican — tacos, burritos & margaritas for anyone who's officially seafood'd-out.", walk:"Broadway, Newport", price:"$12–22 pp",
           maps:mapsQ("Tito's Cantina Newport RI")},
          {n:"Easton's Beach Snack Bar", seafood:true, d:"Locals' budget pick — a famously generous, well-priced lobster roll right by the beach.", walk:"Easton's Beach", price:"$12–22 pp",
           maps:mapsQ("Easton's Beach Snack Bar Newport RI")}
        ]}
      ],
      optional:[
        {n:"Fort Adams State Park", d:"Massive 19th-century fort with sweeping bay views; home of the Newport Jazz/Folk festivals.", loc:"90 Fort Adams Dr, Newport", maps:mapsQ("Fort Adams State Park Newport RI")},
        {n:"International Tennis Hall of Fame", d:"Victorian-era casino & grass courts — sports + stunning architecture.", loc:"194 Bellevue Ave, Newport", maps:mapsQ("International Tennis Hall of Fame Newport")},
        {n:"Ocean Drive (10-Mile Scenic Loop)", d:"Jaw-dropping coastal drive past Brenton Point — perfect at sunset.", loc:"Newport, RI", maps:mapsQ("Ocean Drive Newport RI")},
        {n:"Touro Synagogue", d:"Oldest synagogue building in the U.S. (1763) — National Historic Site.", loc:"85 Touro St, Newport", maps:mapsQ("Touro Synagogue Newport RI")},
        {n:"Bowen's & Bannister's Wharf", d:"Cobblestone wharves packed with shops, ice cream & boat-watching.", loc:"Newport, RI", maps:mapsQ("Bowens Wharf Newport RI")}
      ]
    },

    /* ===================== WED 7/8 — BACK BAY ===================== */
    {
      dow:"Wednesday", date:"July 8", short:"Back Bay", emoji:"⛪",
      theme:"Back Bay Day — towards Boston Common", tagline:"Culture today, calories optional (lol, never optional). ⛪",
      egg:{word:"Antidisestablishmentarianism", joke:"opposition to separating church and state — fittingly long for a day with two giant churches and the world's grandest library."},
      blocks:[
        {slot:"Morning", icon:"🎨", activities:[
          {name:"Isabella Stewart Gardner Museum", cat:"Boston (read with accent)",
           notes:"A fabulous Venetian-style palace full of fine art — looks like Downton Abbey and The Gilded Age. The trip's joint top pick (score 18!). Timed entry; free Thursday nights 5–9 PM (sign up 2 days ahead). Somerville library discount may apply.\n\n🎟️ Library pass: https://bpl.libcal.com/passes/3f1a0abfb37f",
           price:"$22 timed entry · FREE Thu 5–9p (register 2 days ahead)",
           hours:"Mon/Wed/Fri 11a–5p · Thu 11a–9p · Sat/Sun 10a–5p (Closed Tue)",
           address:"25 Evans Way, Boston, MA 02115",
           pref:{M:3,Jo:3,D:3,Ji:3,K:3,A:3,total:18},
           web:"https://www.gardnermuseum.org/",
           transit:T('<span class="line-tag L-green">Green Line E</span> — Museum of Fine Arts stop · <span class="line-tag L-commuter">Ruggles</span> nearby.'),
           imgs:[[wm("Isabella Stewart Gardner Museum - courtyard.jpg"),lf("venetian,courtyard,museum,art",501)],[lf("fine,art,gallery,painting",502)],[lf("palace,garden,flowers",503)]]}
        ]},
        {slot:"Lunch", icon:"🍽️", meal:true,
         eatsIntro:"Lunch near the Gardner/MFA — these Puerto Rican favorites are a short walk and score well with the group.",
         eats:[
          {n:"Manà Escondido Cafe", pk:"manaescondidocafe", nonsea:true, d:"Puerto Rican — great chicken & pork, near the museums (score 13). Mofongo over mussels, always.", walk:"8–15 min walk", price:"$12–25 pp",
           maps:mapsQ("Mana Escondido Cafe 68 Aguadilla St Boston")},
          {n:"Vejigantes Restaurant", pk:"vejigantesrestaurant", nonsea:true, d:"Marinated, home-style Puerto Rican food near MFA/Isabella (score 10).", walk:"10–15 min walk", price:"$12–28 pp",
           maps:mapsQ("Vejigantes Restaurant 57 W Dedham St Boston")},
          {n:"MFA / Gardner café", nonsea:true, d:"If you'd rather not leave — both museums have nice cafés (sandwiches, salads) for a quick bite.", walk:"On-site ★", price:"$12–22 pp",
           transit:'<span class="line-tag L-green">Green E</span> — Museum of Fine Arts.', maps:mapsQ("Museum of Fine Arts Boston cafe")}
        ]},
        {slot:"Afternoon", icon:"⛪", activities:[
          {name:"Cathedral of the Holy Cross", cat:"Boston (read with accent)",
           notes:"Really pretty Gothic architecture in the South End / Back Bay — the largest Catholic church in New England.",
           hours:"9a–6p daily",
           address:"1400 Washington St, Boston, MA 02118",
           pref:{M:3,Jo:1,D:2,Ji:2,K:2,A:2,total:12},
           transit:T('<span class="line-tag L-orange">Orange Line</span> — Back Bay or Tufts Medical Center.'),
           imgs:[[wm("Cathedral of the Holy Cross, Boston, Massachusetts.jpg"),lf("gothic,cathedral,church",504)],[lf("cathedral,stained,glass,interior",505)]]},
          {name:"Mary Baker Eddy Library & the Mapparium", cat:"Boston (read with accent)",
           notes:"Step inside a three-story stained-glass globe you can walk through — the Mapparium — at the Christian Science Plaza. Stunning reflecting pool & architecture outside.\n\n🎟️ Library pass: https://bpl.libcal.com/passes/ee42fe43a508",
           address:"200 Massachusetts Ave, Boston, MA 02115",
           pref:{M:2,Jo:1,D:2,Ji:2,K:3,A:3,total:13},
           transit:T('<span class="line-tag L-green">Green Line E</span> — Symphony or Prudential.'),
           imgs:[[wm("Christian Science Center Boston.jpg"),lf("reflecting,pool,plaza,architecture",506)],[lf("stained,glass,globe,map",507)]]},
          {name:"Boston Public Library (Central / Copley)", cat:"Boston (read with accent)",
           notes:"Historic library with grand Renaissance-style architecture and murals by John Singer Sargent. Close to Newbury St and the SW corner of Boston Common. Don't miss the Bates Hall reading room and the courtyard.",
           address:"700 Boylston St, Boston, MA 02116",
           pref:{M:2,Jo:1,D:2,Ji:2,K:3,A:3,total:13},
           transit:T('<span class="line-tag L-green">Green Line</span> — Copley is across the square.'),
           imgs:[[wm("Boston Public Library McKim Building.jpg"),lf("library,reading,room,architecture",508)],[lf("library,books,mural",509)],[lf("boston,copley,square",510)]]}
        ]},
        {slot:"Dinner", icon:"🍽️", meal:true,
         eatsIntro:"Dinner in Back Bay near the library — Newbury Street is a block away and full of options.",
         eats:[
          {n:"Saltie Girl", seafood:true, pk:"saltiegirl", d:"Stylish seafood bar — lobster rolls & pistachio tiramisu, near Back Bay (score 8).", walk:"5–8 min walk", price:"$20–40 pp",
           transit:'<span class="line-tag L-green">Green</span> — Copley/Arlington.', maps:mapsQ("Saltie Girl 281 Dartmouth St Boston")},
          {n:"Sarva Indian Cuisine", pk:"sarvaindiancuisine", nonsea:true, d:"Newbury St Indian with great ambiance (score 11) — curries, tandoori & naan a block off Copley.", walk:"On Newbury St", price:"$15–30 pp",
           maps:mapsQ("Sarva Indian Cuisine 279 Newbury St Boston")},
          {n:"Sweet Cheeks Q", pk:"sweetcheeksq", nonsea:true, d:"Tim Love's Fenway barbecue (Diners, Drive-Ins & Dives favorite, score 12) — brisket, ribs & buckets of scratch-made biscuits.", walk:"Fenway · short ride", price:"$15–30 pp",
           transit:'<span class="line-tag L-green">Green</span> — Kenmore/Fenway.', maps:mapsQ("Sweet Cheeks Q 1381 Boylston St Boston")},
          {n:"Wahlburgers", nonsea:true, d:"Yes, THAT Wahlberg family — burgers & tots near Fenway/MFA (score 10). Say hi to Paul for us.", walk:"Fenway", price:"$12–20 pp",
           maps:"https://maps.app.goo.gl/TsGp2LR9ppATwL679"},
          {n:"Newbury Street restaurants", nonsea:true, d:"50+ cafés & restaurants along the brownstones — pizza, sushi, French, you name it. Pick your cuisine.", walk:"1–5 min walk ★", price:"$15–40 pp",
           transit:'<span class="line-tag L-green">Green</span> — Copley.', maps:mapsQ("Newbury Street restaurants Boston")}
        ]}
      ],
      optional:[
        {n:"Trinity Church", d:"Massive 1877 Richardsonian Romanesque masterpiece on Copley Square ($10 to enter).", loc:"206 Clarendon St, Boston", maps:mapsQ("Trinity Church Boston Copley")},
        {n:"Newbury Street & Public Garden", d:"Boston's premier shopping mile, ending at the Public Garden swan boats.", loc:"Back Bay, Boston", maps:mapsQ("Newbury Street Boston")},
        {n:"Prudential Skywalk Observatory", d:"360° views of Boston from the 50th floor.", loc:"800 Boylston St, Boston", maps:mapsQ("Prudential Skywalk Observatory Boston")},
        {n:"Beacon Hill → Boston Common", d:"Fancy gas-lit streets to the oldest public park in the U.S. (free).", loc:"Boston", maps:mapsQ("Beacon Hill Boston Common")},
        {n:"Museum of Fine Arts (MFA)", d:"One of the world's great art museums, next to the Gardner ($30).", loc:"465 Huntington Ave, Boston", maps:mapsQ("Museum of Fine Arts Boston")}
      ]
    },

    /* ===================== THU 7/9 — DEPARTURE + FIFA QF ===================== */
    {
      dow:"Thursday", date:"July 9", short:"Departure", emoji:"🛫",
      theme:"Go Home — & a World Cup Quarter-Final", tagline:"Detox from lobster begins tomorrow. Today: one more lobster. 🦞",
      blocks:[
        {slot:"Morning", icon:"☕", activities:[
          {name:"Pack up & final breakfast", cat:"Logistics",
           notes:"Travel day. Grab one last pastry or breakfast, do a final beach walk if there's time, and head out. Don't forget allergy meds & the card games!",
           transit:T('<span class="line-tag L-red">Red Line</span> connects Quincy to South Station & the airport (via Silver Line).')}
        ]},
        {slot:"Optional — for anyone staying", icon:"⚽", activities:[
          {name:"World Cup Quarter-Final at Gillette Stadium", cat:"FIFA 2026",
           notes:"If anyone extends the trip: Boston hosts a FIFA World Cup 2026 QUARTER-FINAL today at Gillette Stadium (Foxborough), 4:00 PM ET — one of only four quarter-finals in North America. See the FIFA tab for the full week of matches & watch-party spots.",
           hours:"4:00 PM ET, July 9",
           address:"Gillette Stadium, 1 Patriot Pl, Foxborough, MA 02035",
           pref:{M:3,Jo:1,D:2,Ji:2,K:3,A:2,total:13},
           transit:T('Special <span class="line-tag L-commuter">Commuter Rail</span> service to Foxboro Station on match days.'),
           imgs:[[wm("Gillette Stadium.jpg"),lf("soccer,stadium,crowd",601)],[lf("world,cup,soccer,fans",602)],[lf("football,match,stadium,night",603)]]}
        ]}
      ],
      optional:[
        {n:"Last lobster roll", d:"One for the road — you can't have too many. 🦞", loc:"Boston / Quincy", maps:mapsQ("lobster roll near Boston Logan Airport")},
        {n:"Tatte Bakery (airport-friendly)", d:"Grab pastries & coffee for the trip home.", loc:"Multiple Boston locations", maps:mapsQ("Tatte Bakery Boston")}
      ]
    }
  ],

  /* ===================== FIFA TAB ===================== */
  fifa:{
    intro:"Boston is a 2026 World Cup host city! The official FIFA Fan Festival at City Hall Plaza ran June 12–27, so it has wrapped up before your trip — but the tournament is in full swing all week, a quarter-final lands in Boston on your departure day, and the city's soccer bars are showing every match.",
    hero:{
      title:"⚽ Quarter-Final — Boston (Gillette Stadium)",
      when:"Thursday, July 9, 2026 · 4:00 PM ET",
      detail:"Gillette Stadium, Foxborough, MA — one of only four World Cup quarter-finals in North America. Teams TBD by the bracket. Falls on your 'go home' day, but a bucket-list option if anyone stays."
    },
    events:[
      {name:"Round of 32 — final matches <span class='nb'>knockout</span>", loc:"Various host cities (TV) · watch in Boston", details:"The Round of 32 concludes <b>Fri, July 3</b>. Catch the day's matches at a Boston soccer bar."},
      {name:"Round of 16 — Match day <span class='nb'>knockout</span>", loc:"Philadelphia &amp; Houston stadiums (TV)", details:"<b>Sat, July 4</b> — Houston ~1:30 PM ET; Philadelphia ~9:00 PM ET. Good late game after the fireworks."},
      {name:"Round of 16 — Match day <span class='nb'>knockout</span>", loc:"New York/New Jersey Stadium (TV)", details:"<b>Sun, July 5</b> — ~8:00 PM ET (Brazil in action). Beach day → bar to watch."},
      {name:"Round of 16 — Match day <span class='nb'>knockout</span>", loc:"Dallas Stadium (TV)", details:"<b>Mon, July 6</b> — ~7:00 PM ET. Lines up with the sheet's North End FIFA night — watch at Gordon Ramsay or a sports bar."},
      {name:"Round of 16 — Match day <span class='nb'>knockout</span>", loc:"Atlanta &amp; Vancouver stadiums (TV)", details:"<b>Tue, July 7</b> — Atlanta ~4:00 PM ET; Vancouver ~8:00 PM ET. (Newport day — catch highlights after.)"},
      {name:"Rest day — no matches", loc:"—", details:"<b>Wed, July 8</b> — A break between the Round of 16 and quarter-finals. Perfect Back Bay day."},
      {name:"★ Quarter-Final — BOSTON <span class='nb'>Gillette</span>", loc:"<b>Gillette Stadium</b>, 1 Patriot Pl, Foxborough, MA 02035 · <i>Foxborough / Patriot Place</i>", details:"<b>Thu, July 9 · 4:00 PM ET.</b> Boston's marquee match. Special Commuter Rail to Foxboro on match days. Tickets via FIFA/Gillette Stadium."},
      {name:"The Greatest Bar <span class='nb'>watch party</span>", loc:"262 Friend St, Boston · <i>West End / North Station</i>", details:"Multi-floor sports bar by TD Garden with one of Boston's largest HDTVs. Home bar for local Liverpool supporters. ★ North Station."},
      {name:"Warehouse Kitchen + Bar <span class='nb'>watch party</span>", loc:"40 Broad St, Boston · <i>Financial District</i>", details:"20 TVs broadcasting every match; the home bar for France (Les Bleus) fans. Walkable downtown."},
      {name:"High Street Place Food Hall <span class='nb'>watch party</span>", loc:"100 High St, Boston · <i>Financial District</i>", details:"Extended hours showing every match on a 28-foot video wall — many food vendors, great for groups."},
      {name:"The Banshee <span class='nb'>watch party</span>", loc:"934 Dorchester Ave, Boston · <i>Dorchester</i>", details:"Home bar of a dozen+ international supporter clubs — every match, full sound, big-game energy."},
      {name:"The Dubliner <span class='nb'>watch party</span>", loc:"Near Government Center, Boston · <i>Downtown</i>", details:"Downtown Irish pub with a great match-day atmosphere near City Hall Plaza."}
    ],
    notes:[
      "🗓️ <b>Heads-up:</b> the official FIFA Fan Festival (City Hall Plaza) ran <b>June 12–27, 2026</b> and is closed before your July 3 arrival — the sheet's note about the 'World Cup experience' running only through June is correct.",
      "🎟️ <b>Tickets:</b> the July 9 Boston quarter-final is a hot ticket — buy through official FIFA / Gillette Stadium channels and beware resale scams.",
      "📺 <b>Easiest plan:</b> most matches are best enjoyed at a Boston soccer bar — reserve for big games, as popular spots hit standing-room-only."
    ]
  },

  /* ===================== INFO TAB ===================== */
  info:'<div class="panel"><h2>ℹ️ Trip Notes &amp; Cheat-Sheet</h2>'+
    '<div class="legend"><b>Who\'s who (preference scores):</b> M = Mom · Jo = Johnny · D = David · Ji = Jillene · K = Kevin · A = Amanda.<br>'+
    '<b>Scale:</b> 1 = ok · 2 = ooh · 3 = YASS. Each activity card shows everyone\'s scores + the group total.</div>'+
    '<h3 style="color:var(--ocean-deep)">📌 From the planning sheet</h3>'+
    '<div class="opt">• <b>David</b> chooses a birthday restaurant for a lunch/dinner (Carmelina\'s in the North End is teed up!).</div>'+
    '<div class="opt">• Maybe invite <b>Andy / Naomi</b> to join some plans (they\'re around Mon 7/6 &amp; Thu 7/9).</div>'+
    '<div class="opt">• Bring 1–2 fun card games &amp; <b>Johnny bring Clue</b>.</div>'+
    '<div class="opt">• <b>Pack a swimsuit</b> (water may be chilly) for Wollaston Beach.</div>'+
    '<div class="opt">• <b>Bring allergy medicine</b> — Claritin / Zyrtec.</div>'+
    '<div class="opt">• Home movies: Enola 3, Life Larry, The Pursuit of Unhappiness.</div>'+
    '<h3 style="color:var(--ocean-deep)">🚇 Getting around (MBTA)</h3>'+
    '<div class="opt">The <span class="line-tag L-red">Red Line</span> links your Quincy base to downtown. Grab a <b>CharlieCard</b>; a 7-day LinkPass gives unlimited subway + bus. ★ on any card means it\'s a short walk from a subway/bus stop.</div>'+
    '<h3 style="color:var(--ocean-deep)">🦞 Food themes the group loves</h3>'+
    '<div class="opt">Lobster (all day, every day), North End Italian + cannoli, Puerto Rican (Manà, Vejigantes), Brazilian, Peruvian (Machu Picchu in Somerville, score 17), seafood &amp; oysters. Lots of \'YASS\' on pastries — pace yourselves!</div>'+
    '<h3 style="color:var(--ocean-deep)">💡 Big-ticket ideas not yet scheduled</h3>'+
    '<div class="opt">• <b>Whale Watching</b> ($70–90, 2–4 hr) — Mom says whale watch OR the Charles River tour, not both.</div>'+
    '<div class="opt">• <b>Salem</b> (1.5 hr north) — best chance to see the most of Andy\'s family; weekend is best.</div>'+
    '<div class="opt">• <b>Middlesex Fells + Stone Zoo</b> (Stoneham) — pair with a whale-watch day.</div>'+
    '<div class="opt">• <b>Trapology Escape Room</b> at Boston Common · <b>Charles River sightseeing boat</b> by the Museum of Science.</div>'+
    '<p style="font-size:13px;color:#667;margin-top:14px">Built from your "Boston 2026" planning sheet (Preference Score + Itinerary tabs). Photos are illustrative and self-healing; tap "See real photos" on any card for live Google Maps galleries.</p>'+
    '</div>'
};
