/* Excel Student – theme engine: particle effects, fonts, text styles, backgrounds. */
const Theme={
  FONTS:{outfit:{n:'Excel Classic',d:"'Outfit'",b:"'Plus Jakarta Sans'",g:''},
    tech:{n:'Cyber Tech',d:"'Orbitron'",b:"'Rajdhani'",g:'family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700'},
    comic:{n:'Comic Pop',d:"'Bangers'",b:"'Comic Neue'",g:'family=Bangers&family=Comic+Neue:wght@400;700'},
    script:{n:'Smooth Script',d:"'Pacifico'",b:"'Quicksand'",g:'family=Pacifico&family=Quicksand:wght@500;600;700'},
    retro:{n:'Retro Arcade',d:"'Press Start 2P'",b:"'Space Mono'",g:'family=Press+Start+2P&family=Space+Mono:wght@400;700'},
    elegant:{n:'Elegant Serif',d:"'Playfair Display'",b:"'Lora'",g:'family=Playfair+Display:wght@600;800&family=Lora:wght@400;600'},
    marker:{n:'Street Marker',d:"'Permanent Marker'",b:"'Nunito'",g:'family=Permanent+Marker&family=Nunito:wght@500;700;800'},
    bold:{n:'Poster Bold',d:"'Anton'",b:"'Inter'",g:'family=Anton&family=Inter:wght@400;600;700'}},
  FXI:{none:'—',rain:'🌧️',storm:'⛈️',snow:'❄️',sparks:'🔥',stars:'🌠',bubbles:'🫧',fireflies:'✨',matrix:'💚',hearts:'💗',confetti:'🎊'},
  SKY:['kl','klgold','cyber','vapor'],
  SCENES:['mexico','tokyo','egypt','paris','rio','morocco','india','santorini'],
  BANNERS:['dragon','koi','warp','samurai','aztec','pharaoh','longship','excel'],
  _fl:{},_wl:0,
  worlds(){if(Theme._wl)return;Theme._wl=1;const s=document.createElement('script');s.src='worlds.js?v=20261119e';document.head.appendChild(s)},
  video(n){const sc=document.querySelector('.bgfx .scene');if(!sc)return;let v=sc.querySelector('video');
    if(!n){if(v){v.pause();v.removeAttribute('src');v.load();v.remove()}return}
    if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    if(!v){v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('muted','');v.preload='auto';sc.appendChild(v);v.addEventListener('playing',()=>v.classList.add('on'))}
    if(v.dataset.n===n)return;v.dataset.n=n;v.classList.remove('on');v.src='scene_'+n+'.mp4?v=20261119e';const pl=v.play();if(pl&&pl.catch)pl.catch(()=>{})},
  _par(){if(Theme._pp)return;Theme._pp=1;const h=document.documentElement;let raf=0;const mv=(x,y)=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;h.style.setProperty('--px',(x/innerWidth*2-1).toFixed(3));h.style.setProperty('--py',(y/innerHeight*2-1).toFixed(3))})};addEventListener('pointermove',e=>mv(e.clientX,e.clientY),{passive:true});addEventListener('pointerdown',e=>mv(e.clientX,e.clientY),{passive:true});addEventListener('deviceorientation',e=>{if(e.gamma==null)return;mv((e.gamma/45+1)/2*innerWidth,(((e.beta||45)-45)/45+1)/2*innerHeight)},{passive:true})},
  loadFont(k){const f=Theme.FONTS[k];if(!f||!f.g||Theme._fl[k])return;Theme._fl[k]=1;const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?'+f.g+'&display=swap';document.head.appendChild(l)},
  apply(p){
    p=p||{};const h=document.documentElement;
    Theme._par();h.dataset.sky=Theme.SKY.includes(p.bg)?'1':'0';if(Theme.SCENES.includes(p.bg)){h.dataset.scene=p.bg;Theme.worlds();Theme.video(p.bg)}else{delete h.dataset.scene;Theme.video(null)}if(Theme.BANNERS.includes(p.pattern))Theme.worlds();
    const fk=Theme.FONTS[p.font]?p.font:'outfit',f=Theme.FONTS[fk];Theme.loadFont(fk);
    h.dataset.font=fk;h.style.setProperty('--disp',f.d+",system-ui,sans-serif");h.style.setProperty('--body',f.b+",system-ui,sans-serif");
    [...h.classList].filter(c=>c.startsWith('tx-')).forEach(c=>h.classList.remove(c));if(p.tx&&p.tx!=='plain')h.classList.add('tx-'+p.tx);
    FXE.set(p.fx);
  }
};
const FXE={cv:null,cx:null,mode:null,P:[],raf:0,W:0,H:0,last:0,flash:0,
  set(m){m=m&&m!=='none'?m:null;if(m===FXE.mode&&FXE.raf)return;FXE.stop();FXE.mode=m;if(!m)return;
    if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    let cv=document.getElementById('fxc');if(!cv){cv=document.createElement('canvas');cv.id='fxc';const b=document.querySelector('.bgfx');if(!b)return;b.appendChild(cv)}
    FXE.cv=cv;FXE.cx=cv.getContext('2d');FXE.size();FXE.init();FXE.last=0;FXE.raf=requestAnimationFrame(FXE.loop)},
  stop(){if(FXE.raf)cancelAnimationFrame(FXE.raf);FXE.raf=0;FXE.P=[];if(FXE.cx)FXE.cx.clearRect(0,0,FXE.W,FXE.H)},
  size(){const d=Math.min(window.devicePixelRatio||1,1.5);FXE.W=innerWidth;FXE.H=innerHeight;FXE.cv.width=FXE.W*d;FXE.H&&(FXE.cv.height=FXE.H*d);FXE.cx.setTransform(d,0,0,d,0,0)},
  r(a,b){return a+Math.random()*(b-a)},
  init(){const m=FXE.mode,W=FXE.W,H=FXE.H,r=FXE.r,P=[];
    const n={rain:90,storm:130,snow:70,sparks:55,stars:40,bubbles:28,fireflies:34,matrix:0,hearts:20,confetti:60}[m]||40;
    if(m==='matrix'){const c=Math.ceil(W/16);for(let i=0;i<c;i++)P.push({x:i*16,y:r(-H,0),s:r(2,5)})}
    else for(let i=0;i<n;i++)P.push(FXE.mk(true));
    FXE.P=P},
  mk(init){const m=FXE.mode,W=FXE.W,H=FXE.H,r=FXE.r;
    switch(m){
      case'rain':case'storm':return{x:r(0,W),y:init?r(0,H):-20,v:r(11,20),l:r(10,22)};
      case'snow':return{x:r(0,W),y:init?r(0,H):-10,v:r(.6,1.8),rad:r(1,3.4),ph:r(0,6.28)};
      case'sparks':return{x:r(0,W),y:init?r(0,H):H+10,v:r(.7,2.2),rad:r(1,2.6),ph:r(0,6.28),a:r(.4,1)};
      case'stars':return{x:r(0,W),y:r(0,H*.7),rad:r(.5,1.6),ph:r(0,6.28),sh:0};
      case'bubbles':return{x:r(0,W),y:init?r(0,H):H+30,v:r(.4,1.3),rad:r(5,16),ph:r(0,6.28)};
      case'fireflies':return{x:r(0,W),y:r(0,H),vx:r(-.4,.4),vy:r(-.4,.4),ph:r(0,6.28),rad:r(1.5,3)};
      case'hearts':return{x:r(0,W),y:init?r(0,H):H+30,v:r(.6,1.6),sz:r(14,28),ph:r(0,6.28),e:['💗','💖','💜','💙'][Math.floor(r(0,4))]};
      case'confetti':return{x:r(0,W),y:init?r(0,H):-10,v:r(1,3),w:r(5,9),h:r(3,6),rot:r(0,6.28),vr:r(-.1,.1),c:['#f472b6','#fbbf24','#38bdf8','#34d399','#a78bfa'][Math.floor(r(0,5))],ph:r(0,6.28)}
    }return{}},
  loop(t){FXE.raf=requestAnimationFrame(FXE.loop);if(document.hidden)return;if(t-FXE.last<30)return;FXE.last=t;
    const c=FXE.cx,W=FXE.W,H=FXE.H,m=FXE.mode,P=FXE.P,tt=t/1000;
    if(m==='matrix'){c.fillStyle='rgba(5,10,28,.13)';c.globalCompositeOperation='destination-out';c.fillStyle='rgba(0,0,0,.12)';c.fillRect(0,0,W,H);c.globalCompositeOperation='source-over';c.font='14px monospace';
      P.forEach(p=>{const ch=String.fromCharCode(0x30A0+Math.floor(Math.random()*60));c.fillStyle='#b9ffcf';c.fillText(ch,p.x,p.y);c.fillStyle='rgba(34,211,120,.8)';c.fillText(ch,p.x,p.y-16);p.y+=p.s*3;if(p.y>H+20&&Math.random()>.96)p.y=-20});return}
    c.clearRect(0,0,W,H);
    if(m==='rain'||m==='storm'){c.strokeStyle='rgba(150,225,255,.55)';c.lineWidth=1.2;c.beginPath();P.forEach(p=>{c.moveTo(p.x,p.y);c.lineTo(p.x-p.l*.18,p.y+p.l);p.y+=p.v;p.x-=p.v*.18;if(p.y>H){p.y=-20;p.x=FXE.r(0,W+60)}});c.stroke();
      if(m==='storm'){if(Math.random()<.006)FXE.flash=1;if(FXE.flash>0){c.fillStyle='rgba(200,220,255,'+(FXE.flash*.35)+')';c.fillRect(0,0,W,H);FXE.flash-=.12}}return}
    if(m==='snow'){c.fillStyle='rgba(255,255,255,.85)';P.forEach(p=>{p.y+=p.v;p.x+=Math.sin(tt+p.ph)*.5;if(p.y>H+5){p.y=-5;p.x=FXE.r(0,W)}c.beginPath();c.arc(p.x,p.y,p.rad,0,6.283);c.fill()});return}
    if(m==='sparks'){c.globalCompositeOperation='lighter';P.forEach(p=>{p.y-=p.v;p.x+=Math.sin(tt*2+p.ph)*.6;p.a-=.002;if(p.y<-10||p.a<=0){Object.assign(p,FXE.mk(false))}const g=c.createRadialGradient(p.x,p.y,0,p.x,p.y,p.rad*5);g.addColorStop(0,'rgba(255,200,80,'+p.a+')');g.addColorStop(1,'rgba(255,90,20,0)');c.fillStyle=g;c.beginPath();c.arc(p.x,p.y,p.rad*5,0,6.283);c.fill()});c.globalCompositeOperation='source-over';return}
    if(m==='stars'){P.forEach(p=>{const a=.4+.6*Math.abs(Math.sin(tt*1.5+p.ph));c.fillStyle='rgba(255,255,255,'+a+')';c.beginPath();c.arc(p.x,p.y,p.rad,0,6.283);c.fill()});
      if(Math.random()<.02&&!FXE.sh)FXE.sh={x:FXE.r(W*.2,W),y:FXE.r(0,H*.4),l:0};
      if(FXE.sh){const s=FXE.sh;s.l+=14;const x=s.x-s.l,y=s.y+s.l*.55,g=c.createLinearGradient(x,y,x+90,y-50);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.95)');c.strokeStyle=g;c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(x+90,y-50);c.stroke();if(s.l>420)FXE.sh=null}return}
    if(m==='bubbles'){c.lineWidth=1.4;P.forEach(p=>{p.y-=p.v;p.x+=Math.sin(tt+p.ph)*.5;if(p.y<-30){p.y=H+30;p.x=FXE.r(0,W)}c.strokeStyle='rgba(180,235,255,.55)';c.beginPath();c.arc(p.x,p.y,p.rad,0,6.283);c.stroke();c.fillStyle='rgba(255,255,255,.12)';c.fill();c.fillStyle='rgba(255,255,255,.6)';c.beginPath();c.arc(p.x-p.rad*.35,p.y-p.rad*.35,p.rad*.18,0,6.283);c.fill()});return}
    if(m==='fireflies'){c.globalCompositeOperation='lighter';P.forEach(p=>{p.x+=p.vx+Math.sin(tt+p.ph)*.3;p.y+=p.vy+Math.cos(tt*.8+p.ph)*.3;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;const a=.25+.75*Math.abs(Math.sin(tt*1.2+p.ph));const g=c.createRadialGradient(p.x,p.y,0,p.x,p.y,p.rad*6);g.addColorStop(0,'rgba(220,255,120,'+a+')');g.addColorStop(1,'rgba(160,255,80,0)');c.fillStyle=g;c.beginPath();c.arc(p.x,p.y,p.rad*6,0,6.283);c.fill()});c.globalCompositeOperation='source-over';return}
    if(m==='hearts'){P.forEach(p=>{p.y-=p.v;p.x+=Math.sin(tt+p.ph)*.7;if(p.y<-30){p.y=H+30;p.x=FXE.r(0,W)}c.globalAlpha=.75;c.font=p.sz+'px serif';c.fillText(p.e,p.x,p.y)});c.globalAlpha=1;return}
    if(m==='confetti'){P.forEach(p=>{p.y+=p.v;p.x+=Math.sin(tt+p.ph)*.8;p.rot+=p.vr;if(p.y>H+10){p.y=-10;p.x=FXE.r(0,W)}c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.fillStyle=p.c;c.fillRect(-p.w/2,-p.h/2,p.w,p.h);c.restore()})}
  }
};
window.addEventListener('resize',()=>{if(FXE.cv&&FXE.raf){FXE.size();FXE.init()}});

window.Theme=Theme;window.FXE=FXE;
setTimeout(function(){try{Theme.worlds()}catch(e){}},2500);
