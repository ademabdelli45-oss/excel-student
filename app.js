const SB=supabase.createClient('https://skmdfluinkkdgyzgvuph.supabase.co','sb_publishable_v4wMwbVmjPfxnf8U6VyGgA_fnOs0WMG');
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const S={me:null,roster:null,cls:null,tab:'home',link:null,sound:true};
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
S.sound=LS.get('snd',true);
const SV='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const ICON={home:`<svg viewBox="0 0 24 24" ${SV}><path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/></svg>`,class:`<svg viewBox="0 0 24 24" ${SV}><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>`,play:`<svg viewBox="0 0 24 24" ${SV}><rect x="2" y="7" width="20" height="12" rx="5"/><path d="M7 13h4M9 11v4M16 12h.01M18 14h.01"/></svg>`,chat:`<svg viewBox="0 0 24 24" ${SV}><path d="M21 12a8 8 0 01-11.6 7.1L3 21l1.9-5.4A8 8 0 1121 12z"/></svg>`,me:`<svg viewBox="0 0 24 24" ${SV}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>`,scan:`<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2M7 12h10"/></svg>`};
ICON.coin=`<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f59e0b"/><circle cx="12" cy="12" r="8" fill="#fbbf24"/><path d="M12 7v10M9.5 9.5h4a1.6 1.6 0 010 3.2h-3a1.6 1.6 0 000 3.2h4.2" fill="none" stroke="#b45309" stroke-width="1.7" stroke-linecap="round"/></svg>`;ICON.back=`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`;ICON.x=`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;ICON.share=`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>`;ICON.edit=`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1-4L16 5l3 3L8 19z"/></svg>`;ICON.send=`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l16-8-6 16-3-7z"/></svg>`;ICON.mail=`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/></svg>`;ICON.check=`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;ICON.heart=`<svg class="ico" viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.800-8 11-8 11z" fill="#fb7185"/></svg>`;
const BGS=['aurora','sunset','ocean','forest','midnight','candy'],AVS=['🦊','🐼','🦁','🐯','🐸','🐙','🦄','🐲','🚀','⚡','🌙','🎧','🦉','🐬','🍉','👑','🐱','🐶','🦋','🌵','🍕','⚽','🎨','📚'],ACCS=['#8b5cf6','#4cb7a5','#f472b6','#fbbf24','#38bdf8','#fb7185','#34d399','#f97316'];
const INTERESTS=['Football','Music','Movies','Gaming','Travel','Cooking','Reading','Art','Fitness','Tech','Photography','Anime','Business','Nature','Fashion','Coffee'];
const DN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
function toast(m,ms){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),ms||2600)}
function confetti(n){const cs=['#4cb7a5','#8b5cf6','#fbbf24','#f472b6','#34d399','#38bdf8'];for(let i=0;i<(n||40);i++){const d=document.createElement('i');d.className='confetti';d.style.left=Math.random()*100+'vw';d.style.background=cs[i%6];d.style.animationDelay=Math.random()*.5+'s';d.style.borderRadius=Math.random()>.5?'50%':'2px';document.body.appendChild(d);setTimeout(()=>d.remove(),2700)}}
function buzz(p){try{navigator.vibrate&&navigator.vibrate(p||15)}catch(e){}}
function snd(f,d){if(!S.sound)return;try{const A=snd.a||(snd.a=new(window.AudioContext||window.webkitAudioContext)());const o=A.createOscillator(),g=A.createGain();o.frequency.value=f;o.type='triangle';g.gain.value=.08;o.connect(g);g.connect(A.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,A.currentTime+(d||.18));o.stop(A.currentTime+(d||.18))}catch(e){}}
async function rpc(fn,args){const r=await SB.rpc(fn,args||{});if(r.error)throw new Error(r.error.message);return r.data}
function ava(p,sz){p=p||{};sz=sz||44;const fr=p.frame&&p.frame!=='none'?' fr-'+p.frame:'';return `<div class="avw${fr}" style="--s:${sz}px"><div class="avi" style="${p.photo?`background-image:url(${E(p.photo)})`:''}">${p.photo?'':E(p.avatar||'🦊')}</div></div>`}
function lvl(xp){let l=1,n=100,x=xp||0;while(x>=n){x-=n;l++;n=Math.round(n*1.25)}return{l,cur:x,need:n}}
const TIERS=[[1,'Newcomer'],[3,'Explorer'],[5,'Word Hunter'],[8,'Chatterbox'],[12,'Grammar Ninja'],[16,'Fluent Star'],[22,'Excel Legend']];
function tierName(l){let t=TIERS[0][1];TIERS.forEach(x=>{if(l>=x[0])t=x[1]});return t}
function ring(pct,size,stroke,inner){const r=(size-stroke)/2,c=2*Math.PI*r;return `<div class="ring" style="width:${size}px;height:${size}px"><svg width="${size}" height="${size}"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fe3d3"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs><circle class="tr" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"/><circle class="pr" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}" stroke-dasharray="${c}" stroke-dashoffset="${c}" data-t="${c*(1-Math.min(1,pct))}"/></svg><div class="ct">${inner||''}</div></div>`}
function animate(){requestAnimationFrame(()=>setTimeout(()=>{$$('.pr[data-t]').forEach(e=>e.style.strokeDashoffset=e.dataset.t);$$('[data-n]').forEach(e=>{const to=+e.dataset.n,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/900),v=Math.round(to*(1-Math.pow(1-k,3)));e.textContent=v.toLocaleString();if(k<1)requestAnimationFrame(f)})(t0)})},60))}
function sheet(html){const bg=document.createElement('div');bg.className='sheetbg';const sh=document.createElement('div');sh.className='sheet';sh.innerHTML='<div class="grab"></div>'+html;const close=()=>{bg.remove();sh.remove()};bg.onclick=close;document.body.append(bg,sh);sh.close=close;return sh}
const skel=n=>Array(n||3).fill('<div class="skel"></div>').join('');
const FX={sakura:'🌸',lava:'🔥',gold:'✨'};
function applyTheme(){const p=S.me;if(!p)return;if(window.Theme)Theme.apply(p);const h=document.documentElement;h.dataset.bg=p.bg||'aurora';h.style.setProperty('--acc',p.accent||'#8b5cf6');const fx=$('.bgfx .fx');fx.innerHTML='';const e=FX[p.bg];if(e)for(let i=0;i<14;i++){const s=document.createElement('s');s.textContent=e;s.style.cssText=`left:${Math.random()*100}%;font-size:${14+Math.random()*16}px;animation-duration:${9+Math.random()*10}s;animation-delay:${-Math.random()*14}s`;fx.appendChild(s)}}
function loadingDone(){const l=$('#loader');if(l)l.classList.add('gone')}
const wrap=h=>{$('#app').innerHTML='<div class="view">'+h+'</div>';window.scrollTo(0,0)};
const greet=()=>{const h=new Date().getHours();return h<12?'Good morning':h<18?'Good afternoon':'Good evening'};
const today=()=>new Date().toISOString().slice(0,10);
const localDay=d=>{d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};

async function boot(){
  setTimeout(()=>{try{loadingDone()}catch(e){}},7000);
  const t0=Date.now();
  const m=(location.search.match(/[?&]c=([^&]+)/)||[])[1];
  if(m){const p=decodeURIComponent(m).split('.');S.link={id:(p[0]||'').toUpperCase(),code:p[1]||''}}
  const s=await SB.auth.getSession();
  if(s.data.session){try{await loadWho()}catch(e){S.me=null;S.t=null}if(!S.me&&!S.t){try{await SB.auth.signOut()}catch(e){}}}
  if(S.link&&!S.me&&!S.t){try{S.link.pre=await rpc('claim_preview',{p_id:S.link.id,p_code:S.link.code})}catch(e){S.link.pre={error:'x'}}}
  setTimeout(()=>{render();loadingDone()},Math.max(0,1700-(Date.now()-t0)));
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
}
async function loadWho(){const w=await rpc('t_whoami');if(w){S.t=w;S.me=null;return}S.t=null;await loadMe()}
async function loadMe(){
  const u=await SB.auth.getUser();const uid=u.data.user.id;
  const p=await SB.from('profiles').select('*').eq('user_id',uid).maybeSingle();
  if(!p.data){S.me=null;return}S.me=p.data;
  const r=await SB.from('roster').select('*').eq('student_id',S.me.student_id).maybeSingle();S.roster=r.data;
  const c=await SB.from('classes').select('*').eq('id',(S.roster||{}).class_id||'').maybeSingle();S.cls=c.data;applyTheme();
}
async function refreshMe(){const p=await SB.from('profiles').select('*').eq('user_id',S.me.user_id).maybeSingle();if(p.data){S.me=p.data;applyTheme()}}

/* ---------------- auth ---------------- */
function authView(){
  const L=S.link,pre=L&&L.pre&&!L.pre.error?L.pre:null;$('#chrome').innerHTML='';
  const hello=pre?`<div class="card pop glow" style="margin-bottom:14px;text-align:left;background:linear-gradient(135deg,rgba(76,183,165,.25),rgba(139,92,246,.25))"><div class="mut sm">Welcome to Excel</div><h2 style="font-size:26px;margin:2px 0">Hi ${E((pre.name||'').split(' ')[0])} 👋</h2><div class="row wrap" style="margin-top:6px"><span class="chip g">${ICON.check} Verified</span>${pre.class?`<span class="chip v">${E(pre.class)}</span>`:''}</div></div>`:'';
  const note=L&&L.pre&&L.pre.error?'This link or PIN is not valid any more. Type your ID and PIN below, or ask your teacher for a new card.':'';const noteH=note?`<div class="card" style="margin-bottom:12px;text-align:left;border-color:rgba(251,191,36,.5)"><span class="sm">${E(note)}</span></div>`:'';
  $('#app').innerHTML=`<div class="view stag" style="padding-top:5vh;text-align:center"><img class="logoimg" src="logo_white.png" alt="Excel Language Center" style="width:min(250px,64vw);margin:0 auto 6px"><p class="mut" style="margin:10px 0 18px">Your English world. Learn, play, check in.</p>${hello}${noteH}
  <div class="card" style="text-align:left"><h2 style="margin:0 0 4px">Sign in</h2><span class="lbl" style="margin-top:8px">Your ID</span><input id="a_id" class="inp" placeholder="e.g. EX017 or T05" value="${E(pre?L.id:(L?L.id:LS.get('lastid2','')))}" autocapitalize="characters" autocomplete="username">
  <span class="lbl">PIN or password</span><input id="a_pw" type="password" class="inp" placeholder="6-digit PIN from your teacher" value="${pre?E(L.code):''}" autocomplete="current-password">
  <button id="a_go" class="btn full" style="margin-top:18px">Sign in</button></div>
  <div class="card" style="text-align:left;margin-top:12px"><b>First time here?</b><p class="mut sm" style="margin:6px 0 10px">Your teacher or the front desk gives you an <b>ID</b> and a <b>6-digit PIN</b> — on a card with a QR code, or in a WhatsApp link. Type them above and tap Sign in, or scan your card. You can change your password later in <b>Me</b>.</p><button class="btn ghost full" id="a_scan">${ICON.scan.replace('stroke="#fff"','stroke="currentColor"')} Scan my card</button></div>
  <p class="mut sm" style="margin:14px 0 0">Forgot your PIN or password? Ask your teacher to reset it.</p><p class="mut sm" style="margin-top:14px">Excel Language Center · Ampang Park &amp; One South</p></div>`;
  $('#a_scan').onclick=scanCard;$('#a_go').onclick=doAuth;$('#a_pw').onkeydown=e=>{if(e.key==='Enter')doAuth()};$('#a_id').onkeydown=e=>{if(e.key==='Enter')$('#a_pw').focus()};
}

async function scanCard(){
  wrap(`<h2>Scan your card</h2><p class="mut">Point the camera at the QR code on your Excel Student activation card.</p><div class="scanbox"><video id="cam" playsinline muted></video><i class="cn a"></i><i class="cn b"></i><i class="cn c"></i><i class="cn d"></i></div><div class="row" style="margin-top:14px"><input id="mt" class="inp" placeholder="No camera? Paste the link"><button id="mb" class="btn sm">Go</button></div><button class="btn ghost full" style="margin-top:14px" id="bk">Cancel</button>`);
  const vid=$('#cam');let stream,live=true,busy=false;const stop=()=>{live=false;try{stream&&stream.getTracks().forEach(t=>t.stop())}catch(e){}};
  async function got(txt){const m=String(txt||'').match(/[?&]c=([A-Za-z0-9._%-]+)/)||String(txt||'').match(/^([A-Za-z0-9-]+\.[0-9]{4,8})$/);if(!m||busy)return false;busy=true;const p=decodeURIComponent(m[1]).split('.');S.link={id:(p[0]||'').toUpperCase(),code:p[1]||''};
    try{S.link.pre=await rpc('claim_preview',{p_id:S.link.id,p_code:S.link.code})}catch(e){S.link.pre={error:'x'}}
    stop();if(S.link.pre&&!S.link.pre.error){buzz(25);authView()}else{S.link=null;toast('That card is not valid. Ask your teacher.');authView()}return true}
  $('#bk').onclick=()=>{stop();authView()};$('#mb').onclick=async()=>{if(!(await got($('#mt').value.trim())))toast('That does not look like an activation link')};
  try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});vid.srcObject=stream;await vid.play();const cv=document.createElement('canvas'),cx=cv.getContext('2d',{willReadFrequently:true});
    (function tick(){if(!live)return;if(vid.readyState>=2&&vid.videoWidth){const w=480,h=Math.round(480*vid.videoHeight/vid.videoWidth);cv.width=w;cv.height=h;cx.drawImage(vid,0,0,w,h);const q=jsQR(cx.getImageData(0,0,w,h).data,w,h);if(q&&q.data)got(q.data)}setTimeout(tick,160)})();
  }catch(e){toast('Camera blocked — paste your link instead')}
}
async function doAuth(){
  const id=($('#a_id').value||'').trim().toUpperCase(),pw=$('#a_pw').value,b=$('#a_go');
  if(!id||!pw){toast('Type your ID and PIN');return}
  b.disabled=true;b.textContent='One moment…';const email=id.toLowerCase().replace(/[^a-z0-9]/g,'')+'@excel-student.app';let fresh=false;
  try{
    let si=await SB.auth.signInWithPassword({email,password:pw});
    if(si.error){
      const ok=await rpc('can_claim',{p_id:id,p_code:pw});
      if(ok!==true)throw new Error('Wrong ID or PIN. Check your card, or ask your teacher.');
      const su=await SB.auth.signUp({email,password:pw});if(su.error)throw su.error;
      if(!su.data.session){const s2=await SB.auth.signInWithPassword({email,password:pw});if(s2.error)throw s2.error}
      let cl=await SB.rpc('claim_student',{p_id:id,p_code:pw});
      const nf=x=>/find that student/i.test((x.error&&x.error.message)||(x.data&&x.data.error)||'');if(nf(cl))cl=await SB.rpc('claim_teacher',{p_id:id,p_code:pw});
      if(cl.error)throw cl.error;if(cl.data&&cl.data.error)throw new Error(cl.data.error);fresh=true;
    }
    LS.set('lastid2',id);await loadWho();
    if(!S.me&&!S.t){const nf=x=>/find that student/i.test((x.error&&x.error.message)||(x.data&&x.data.error)||'');let c2=await SB.rpc('claim_student',{p_id:id,p_code:pw});if(nf(c2))c2=await SB.rpc('claim_teacher',{p_id:id,p_code:pw});if(!c2.error&&!(c2.data&&c2.data.error)){fresh=true;await loadWho()}}
    if(!S.me&&!S.t)throw new Error('This account is not ready yet. Ask your teacher.');
    history.replaceState(null,'',location.pathname);S.link=null;confetti(60);S.tab='home';
    if(S.t){T.tab='home';render();toast('Welcome, '+S.t.name.split(' ')[0]+'!')}
    else if(fresh){onboard()}else{render();toast('Welcome back, '+(S.me.nickname||(S.me.name||'').split(' ')[0])+'!')}
  }catch(e){b.disabled=false;b.textContent='Sign in';toast(e.message||'Something went wrong');b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),500)}
}
function onboard(){
  $('#chrome').innerHTML='';const draft={avatar:'🦊',nickname:'',interests:[],bg:'aurora'};
  wrap(`<div class="stag" style="padding-top:3vh"><div class="c"><div class="pop" style="font-size:52px">🎉</div><h1 style="font-size:28px">You're in, ${E((S.me.name||'').split(' ')[0])}!</h1><p class="mut">Make it yours. You can change all of this any time in Me.</p></div>
  <div class="card"><span class="lbl" style="margin-top:0">Pick your avatar</span><div class="row wrap" id="o_av">${AVS.map(a=>`<button class="pick" data-a="${a}" style="font-size:22px">${a}</button>`).join('')}</div><span class="lbl">Nickname (optional)</span><input id="o_nn" class="inp" maxlength="16" placeholder="What should friends call you?"></div>
  <div class="card" style="margin-top:12px"><span class="lbl" style="margin-top:0">What are you into?</span><div class="row wrap" id="o_in">${INTERESTS.map(a=>`<button class="pick" data-i="${a}">${a}</button>`).join('')}</div></div>
  <div class="card" style="margin-top:12px"><span class="lbl" style="margin-top:0">Pick a vibe</span><div class="row wrap" id="o_bg">${BGS.map(a=>`<button class="pick" data-b="${a}" style="text-transform:capitalize">${a}</button>`).join('')}</div></div>
  <button class="btn full" id="o_go" style="margin-top:16px">Let's go ✨</button></div>`);
  const mark=()=>{$$('#o_av .pick').forEach(b=>b.classList.toggle('on',b.dataset.a===draft.avatar));$$('#o_in .pick').forEach(b=>b.classList.toggle('on',draft.interests.includes(b.dataset.i)));$$('#o_bg .pick').forEach(b=>b.classList.toggle('on',b.dataset.b===draft.bg))};mark();
  $$('#o_av .pick').forEach(b=>b.onclick=()=>{draft.avatar=b.dataset.a;snd(600,.08);mark()});$$('#o_in .pick').forEach(b=>b.onclick=()=>{const i=draft.interests.indexOf(b.dataset.i);i>-1?draft.interests.splice(i,1):draft.interests.length<6&&draft.interests.push(b.dataset.i);mark()});
  $$('#o_bg .pick').forEach(b=>b.onclick=()=>{draft.bg=b.dataset.b;S.me.bg=b.dataset.b;applyTheme();mark()});
  $('#o_go').onclick=async()=>{draft.nickname=$('#o_nn').value.trim();await saveProf({avatar:draft.avatar,nickname:draft.nickname||null,interests:draft.interests});if(draft.bg!=='aurora')try{await rpc('equip',{p_item:'bg:'+draft.bg})}catch(e){}await refreshMe();confetti(70);S.tab='home';render()};
}

/* ---------------- shell ---------------- */
function render(){
  if(S.t){T.render();return}
  if(!S.me){authView();return}
  const tabs=[['home','Home'],['class','Class'],['play','Play'],['chat','Chat'],['me','Me']];
  const tb=t=>`<button data-t="${t[0]}" class="${S.tab===t[0]?'on':''}">${ICON[t[0]]}<span>${t[1]}</span>${t[0]==='chat'&&S.unread?`<span class="badge">${S.unread}</span>`:''}</button>`;
  $('#chrome').innerHTML=`<div class="nav">${tabs.slice(0,2).map(tb).join('')}<button class="sc" id="fab" aria-label="Scan to check in"><i>${ICON.scan}</i><span>Scan</span></button>${tabs.slice(2).map(tb).join('')}</div>`;
  $$('.nav button[data-t]').forEach(b=>b.onclick=()=>{buzz(8);if(S.stop)S.stop();S.stop=null;S.tab=b.dataset.t;render()});
  $('#fab').onclick=()=>{buzz(12);scanView()};
  if(S.stop)S.stop();S.stop=null;
  ({home:homeView,class:classView,play:playView,chat:chatView,me:meView})[S.tab]();
  SB.rpc('my_friends').then(r=>{const n=(r.data||[]).reduce((a,f)=>a+(f.unread||0),0);if(n!==S.unread){S.unread=n;const b=$('.nav button[data-t=chat]');if(b){$('.badge',b)&&$('.badge',b).remove();if(n)b.insertAdjacentHTML('beforeend',`<span class="badge">${n}</span>`)}}}).catch(()=>{});
}
function nextClass(){const c=S.cls;if(!c||!c.days||!c.days.length)return null;const now=new Date();for(let i=0;i<8;i++){const d=new Date(now.getTime()+i*864e5);if(c.days.map(x=>x%7).includes(d.getDay())){const t=(c.start_time||'09:00').split(':');const st=new Date(d);st.setHours(+t[0],+t[1],0,0);if(st>now||i>0)return{d,st}}}return null}
function inText(st){const m=Math.round((st-new Date())/6e4);if(m<60)return'in '+m+' min';if(m<1440)return'in '+Math.floor(m/60)+'h '+(m%60)+'m';const d=Math.round(m/1440);return d===1?'tomorrow':'in '+d+' days'}

/* ---------------- home ---------------- */
async function homeView(){
  const m=S.me,L=lvl(m.xp),nc=nextClass(),name=m.nickname||(m.name||'').split(' ')[0],wd=window.Games?Games.wotd():['hello','a greeting'];
  const gotGift=m.last_bonus&&(String(m.last_bonus).slice(0,10)===today()||String(m.last_bonus).slice(0,10)===localDay());
  wrap(`<div class="stag"><div class="row" style="margin:8px 0 16px"><div class="grow"><div class="mut sm">${greet()}</div><h1 style="font-size:30px">${E(name)} 👋</h1></div><div id="h_av" style="cursor:pointer">${ava(m,54)}</div></div>
  <div class="card glow" style="background:linear-gradient(135deg,rgba(76,183,165,.22),rgba(139,92,246,.25));position:relative;overflow:hidden"><div class="row">${ring(L.cur/L.need,92,9,`<div><div class="mut" style="font-size:10px;font-weight:800;letter-spacing:.1em">LEVEL</div><b style="font-size:30px;line-height:1" data-n="${L.l}">0</b></div>`)}<div class="grow"><b style="font-family:var(--disp);font-size:19px">${tierName(L.l)}</b><div class="mut sm">${L.cur} / ${L.need} XP to Level ${L.l+1}</div><div class="row wrap" style="margin-top:8px"><span class="chip a">🔥 ${m.streak||0} streak</span><span class="chip v">⭐ ${(m.xp||0).toLocaleString()} XP</span><span class="chip g">${ICON.coin} ${m.coins||0}</span></div></div></div></div>
  ${gotGift?'':`<div class="card pop" id="h_gift" style="margin-top:12px;border-radius:24px;background:linear-gradient(135deg,rgba(251,191,36,.25),rgba(244,114,182,.22))"><div class="row"><span class="floaty" style="font-size:38px">🎁</span><div class="grow"><b style="font-family:var(--disp);font-size:17px">Daily gift is ready</b><div class="mut sm">Free coins and XP, every day you open the app</div></div><button class="btn gold sm" id="h_claim">Claim</button></div></div>`}
  <div class="card" style="margin-top:12px"><div class="row"><div class="grow"><div class="mut sm">Next class</div>${nc?`<b style="font-family:var(--disp);font-size:21px">${DN[nc.d.getDay()]} · ${(S.cls.start_time||'').slice(0,5)}</b><div class="mut sm">${E(S.cls.name)}${S.cls.room?' · '+E(S.cls.room):''}</div>`:`<b style="font-size:17px">${S.cls?E(S.cls.name):'No class yet'}</b><div class="mut sm">Timetable coming from your teacher</div>`}</div>${nc?`<span class="chip g">${inText(nc.st)}</span>`:''}</div>
  <div class="row" style="margin-top:12px"><button class="btn sm grow" id="h_scan">📷 Scan to check in</button><button class="btn sm ghost grow" id="h_abs">Can’t come?</button></div></div>
  <div class="sec"><h3>This week</h3><span class="mut sm" id="h_wk"></span></div><div class="dots" id="h_dots">${['M','T','W','T','F','S','S'].map(d=>`<i>${d}</i>`).join('')}</div>
  <div class="sec"><h3>Word of the day</h3></div><div class="card row" id="h_w"><div class="grow"><b style="font-family:var(--disp);font-size:24px">${E(wd[0])}</b><div class="mut sm">${E(wd[1])}</div></div><button class="btn sm" id="h_say">🔊 Listen</button></div>
  <div class="sec"><h3>Jump in</h3></div><div class="grid2"><div class="tile" id="h_hw"><span class="ic">📚</span><b>Homework</b><div class="mut sm" id="h_hwn">…</div></div><div class="tile" id="h_pl"><span class="ic">🎮</span><b>Play &amp; learn</b><div class="mut sm">9 games · bosses · XP</div></div><div class="tile" id="h_lb"><span class="ic">🏆</span><b>Leaderboard</b><div class="mut sm">Where do you rank?</div></div><div class="tile" id="h_sh"><span class="ic">🛍️</span><b>Shop</b><div class="mut sm">Spend your coins</div></div></div>
  <div class="sec"><h3>Top learners</h3><a href="#" id="h_all">See all</a></div><div id="h_top">${skel(3)}</div></div>`);
  animate();
  $('#h_av').onclick=()=>{S.tab='me';render()};$('#h_scan').onclick=scanView;$('#h_abs').onclick=absView;$('#h_hw').onclick=()=>{S.tab='class';S.sub='hw';render()};$('#h_pl').onclick=()=>{S.tab='play';render()};$('#h_lb').onclick=lbView;$('#h_all').onclick=e=>{e.preventDefault();lbView()};$('#h_sh').onclick=()=>{S.tab='me';S.shop=1;render()};
  $('#h_say').onclick=()=>Games.say(wd[0]);
  const gb=$('#h_claim');if(gb)gb.onclick=async()=>{gb.disabled=true;try{const r=await rpc('daily_bonus');if(r&&r.error)throw new Error(r.error);await refreshMe();confetti(60);snd(780,.3);buzz([20,40,20]);toast('🎁 Gift claimed! +'+((r&&(r.coins||r.coin))||10)+' coins, +'+((r&&r.xp)||5)+' XP');homeView()}catch(e){toast(/already|once|today/i.test(e.message)?'Come back tomorrow for the next gift 🎁':e.message);const g=$('#h_gift');g&&g.remove()}};
  try{const hw=await SB.from('homework').select('id').order('due'),dn=await SB.from('homework_done').select('hw_id');const left=(hw.data||[]).filter(h=>!(dn.data||[]).some(d=>d.hw_id===h.id)).length;const el=$('#h_hwn');if(el)el.textContent=left?left+' to do':'All done 🎉'}catch(e){}
  try{const at=await SB.from('attendance').select('scanned_at,status').order('scanned_at',{ascending:false}).limit(60);const days={};(at.data||[]).forEach(a=>{if(a.status==='present'||a.status==='late')days[localDay(new Date(a.scanned_at))]=1});const now=new Date(),dow=(now.getDay()+6)%7;let c=0;$$('#h_dots i').forEach((el,i)=>{const d=new Date(now.getTime()+(i-dow)*864e5);if(days[localDay(d)]){el.classList.add('on');el.innerHTML=ICON.check;c++}else if(i===dow)el.style.borderColor='var(--teal)'});const w=$('#h_wk');if(w)w.textContent=c+' check-in'+(c===1?'':'s')}catch(e){}
  try{const r=await rpc('leaderboard');const el=$('#h_top');if(el)el.innerHTML=r.slice(0,3).map((p,i)=>lbRow(p,i)).join('')||'<div class="card mut">No one yet — be the first!</div>'}catch(e){}
}
function lbRow(p,i){const me=p.student_id===S.me.student_id;return `<div class="card row" style="margin:8px 0;padding:12px;${me?'border-color:var(--teal)':''}"><b style="width:28px;font-family:var(--disp);font-size:17px;text-align:center">${i<3?['🥇','🥈','🥉'][i]:i+1}</b>${ava(p,42)}<div class="grow"><b>${E(p.name)}${me?' (you)':''}</b><div class="mut sm">${p.title&&p.title!=='Newcomer'?E(p.title)+' · ':''}🔥 ${p.streak}</div></div><b style="font-family:var(--disp)">${(p.xp||0).toLocaleString()}<span class="mut sm"> XP</span></b></div>`}
async function lbView(){
  wrap(`<div class="row" style="margin:6px 0 10px"><button class="btn sm ghost" id="bk" aria-label="Back">${ICON.back}</button><h2 class="grow">🏆 Leaderboard</h2></div><div id="lb">${skel(5)}</div>`);$('#bk').onclick=render;
  const r=await rpc('leaderboard'),t=r.slice(0,3),pc=(p,k)=>p?`<div class="pc p${k}"><div style="display:grid;place-items:center">${ava(p,k===1?64:52)}</div><b style="display:block;margin-top:8px;font-size:13px">${E(p.name.split(' ')[0])}</b><div style="font-size:${k===1?30:24}px">${['','🥇','🥈','🥉'][k]}</div><div class="mut sm">${(p.xp||0).toLocaleString()} XP</div></div>`:'<div class="pc"></div>';
  $('#lb').innerHTML=`<div class="podium stag">${pc(t[1],2)}${pc(t[0],1)}${pc(t[2],3)}</div>`+r.slice(3).map((p,i)=>lbRow(p,i+3)).join('');
}

/* ---------------- scan ---------------- */
async function scanView(){
  wrap(`<h2>Scan the class code</h2><p class="mut">Point your camera at the QR on the teacher’s screen.</p><div class="scanbox"><video id="cam" playsinline muted></video><i class="cn a"></i><i class="cn b"></i><i class="cn c"></i><i class="cn d"></i></div><div class="row" style="margin-top:14px"><input id="mt" class="inp" placeholder="Camera trouble? Paste code"><button id="mb" class="btn sm">Go</button></div><button class="btn ghost full" style="margin-top:14px" id="bk">Cancel</button>`);
  const vid=$('#cam');let stream,live=true;S.stop=()=>{live=false;try{stream&&stream.getTracks().forEach(t=>t.stop())}catch(e){}};
  $('#bk').onclick=()=>{S.stop();render()};$('#mb').onclick=()=>done($('#mt').value.trim());
  let busy=false;async function done(tok){if(busy||!tok)return;busy=true;try{const r=await rpc('scan',{p_token:tok});S.stop();scanResult(r)}catch(e){toast(e.message);setTimeout(()=>busy=false,1800)}}
  try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});vid.srcObject=stream;await vid.play();const cv=document.createElement('canvas'),cx=cv.getContext('2d',{willReadFrequently:true});
    (function tick(){if(!live)return;if(vid.readyState>=2&&vid.videoWidth){const w=480,h=Math.round(480*vid.videoHeight/vid.videoWidth);cv.width=w;cv.height=h;cx.drawImage(vid,0,0,w,h);const q=jsQR(cx.getImageData(0,0,w,h).data,w,h);if(q&&q.data&&!busy){buzz(20);done(q.data)}}setTimeout(tick,160)})();
  }catch(e){toast('Camera blocked — paste the code instead')}
}
async function scanResult(r){
  await refreshMe();const late=r.status==='late';
  if(!late&&!r.again)confetti(80);snd(late?330:660,.3);buzz(late?[40,40,40]:[30,60,30]);
  wrap(`<div style="text-align:center;padding-top:9vh" class="stag"><div class="pop" style="font-size:96px">${r.again?'👍':late?'🕘':'✅'}</div><h1 style="margin-top:8px">${r.again?'Already checked in':late?'You’re marked late':'You’re in!'}</h1><p class="mut">${late?'Class started '+(r.late_by||0)+' min past the cut-off. Come a bit earlier next time!':r.again?'Status: '+E(r.status):'On time — nice work.'}</p>${r.points?`<div class="card pop" style="display:inline-block;margin-top:8px"><b style="font-size:32px;font-family:var(--disp)">+${r.points} XP</b>${r.streak?`<div class="mut sm">🔥 ${r.streak} class streak</div>`:''}</div>`:''}<div><button class="btn" style="margin-top:22px" id="ok">Awesome</button></div></div>`);$('#ok').onclick=()=>{S.tab='home';render()};
}
async function absView(){
  wrap(`<div class="row" style="margin:6px 0 10px"><button class="btn sm ghost" id="bk" aria-label="Back">${ICON.back}</button><h2 class="grow">Can’t make it?</h2></div><p class="mut">Tell your teacher in advance (at least 1 hour before class).</p><div class="card"><span class="lbl" style="margin-top:0">Date</span><input id="ad" type="date" class="inp"><span class="lbl">Reason</span><textarea id="ar" class="inp" rows="3" placeholder="e.g. Doctor’s appointment"></textarea><button class="btn full" id="as" style="margin-top:14px">Send request</button></div><div id="al" style="margin-top:14px"></div>`);
  $('#bk').onclick=render;$('#ad').value=new Date(Date.now()+864e5).toISOString().slice(0,10);
  async function list(){const r=await SB.from('absence_requests').select('*').order('created_at',{ascending:false}).limit(8);$('#al').innerHTML=(r.data||[]).map(a=>`<div class="card row" style="margin:6px 0;padding:12px"><div class="grow"><b>${E(a.on_date)}</b><div class="mut sm">${E(a.reason)}</div></div><span class="chip ${a.status==='approved'?'g':a.status==='declined'?'r':'a'}">${E(a.status)}</span></div>`).join('')}
  list();$('#as').onclick=async()=>{const d=$('#ad').value,rs=$('#ar').value.trim();if(!rs){toast('Add a reason');return}const r=await SB.from('absence_requests').insert({student_id:S.me.student_id,class_id:S.roster.class_id,on_date:d,reason:rs});if(r.error){toast(r.error.message);return}toast('Sent to your teacher');$('#ar').value='';list()};
}

/* ---------------- class ---------------- */
async function classView(){
  const sub=S.sub||'hw';S.sub=null;const tabs=[['hw','📚 Homework'],['tt','🗓️ Timetable'],['at','✅ Attendance'],['tr','🎯 Trackers'],['rp','📝 Exams & report'],['hi','🕘 History']];const c=S.cls||{};
  wrap(`<div class="card glow" style="background:linear-gradient(135deg,${c.color||'#8b5cf6'}55,rgba(76,183,165,.2));margin-bottom:12px"><div class="mut sm">My class</div><h2 style="font-size:22px">${E(c.name||'No class yet')}</h2><div class="mut sm">${c.teacher?'Teacher '+E(c.teacher)+' · ':''}${E(c.branch||'')}</div></div><div class="row" id="ct" style="overflow:auto;padding-bottom:6px">${tabs.map(t=>`<button class="btn sm ${t[0]===sub?'':'ghost'}" data-s="${t[0]}" style="white-space:nowrap">${t[1]}</button>`).join('')}</div><div id="cb" style="margin-top:12px">${skel(3)}</div>`);
  $$('#ct button').forEach(b=>b.onclick=()=>{S.sub=b.dataset.s;classView()});const el=$('#cb');
  if(sub==='hw'){const hw=await SB.from('homework').select('*').order('due'),dn=await SB.from('homework_done').select('hw_id'),ds=(dn.data||[]).map(d=>d.hw_id);
    el.innerHTML=(hw.data||[]).map(h=>{const d=ds.includes(h.id);return `<div class="card stag" style="margin:8px 0"><div class="row"><div class="grow"><b>${E(h.title)}</b><div class="mut sm">Due ${E(h.due||'—')}</div></div><span class="chip ${d?'g':'a'}">${d?'Done':'To do'}</span></div><p class="mut" style="margin:8px 0">${E(h.body)}</p>${h.file_url?`<a href="${E(h.file_url)}" target="_blank">📎 Open file</a> `:''}${d?'':`<button class="btn sm" data-d="${h.id}" style="margin-top:6px">Mark done</button>`}</div>`}).join('')||'<div class="card c"><div style="font-size:40px">🎉</div>No homework right now</div>';
    $$('[data-d]',el).forEach(b=>b.onclick=async()=>{const r=await SB.from('homework_done').insert({hw_id:+b.dataset.d,student_id:S.me.student_id});if(r.error)return toast(r.error.message);confetti(35);snd(700);toast('Nice! Homework done ✅');S.sub='hw';classView()})}
  if(sub==='tt'){const days=(c.days||[]).map(x=>x%7),cur=new Date(),y=cur.getFullYear(),mo=cur.getMonth(),first=new Date(y,mo,1).getDay(),n=new Date(y,mo+1,0).getDate();
    const ev=await SB.from('events').select('*').order('on_date'),evd=(ev.data||[]).map(e=>e.on_date);let g='<div class="cal">'+DN.map(d=>`<div class="h">${d[0]}</div>`).join('');for(let i=0;i<first;i++)g+='<div></div>';
    for(let d=1;d<=n;d++){const ds2=y+'-'+String(mo+1).padStart(2,'0')+'-'+String(d).padStart(2,'0'),dw=new Date(y,mo,d).getDay();g+=`<div class="d ${d===cur.getDate()?'t ':''}${evd.includes(ds2)?'e':''}" style="${days.includes(dw)&&d!==cur.getDate()?'background:rgba(76,183,165,.24)':''}">${d}</div>`}g+='</div>';
    el.innerHTML=`<div class="card"><b style="font-family:var(--disp)">${E(c.name||'')}</b><div class="mut sm">${(c.days||[]).map(x=>DN[x%7]).join(' · ')||'Days not set yet'} ${c.start_time?' · '+c.start_time.slice(0,5)+'–'+(c.end_time||'').slice(0,5):''}${c.room?' · '+E(c.room):''}</div></div><div class="card" style="margin-top:12px"><h3 style="margin-bottom:10px">${MONTHS[mo]} ${y}</h3>${g}<div class="mut sm" style="margin-top:10px">Green = class day · yellow line = event</div></div><div class="card" style="margin-top:12px"><h3 style="margin-bottom:8px">Coming up</h3>${(ev.data||[]).filter(e=>e.on_date>=today()).map(e=>`<div class="row" style="margin:6px 0"><span class="chip a">${E(e.on_date.slice(5))}</span><b>${E(e.title)}</b></div>`).join('')||'<span class="mut">Nothing yet</span>'}</div>`}
  if(['at','tr','rp','hi'].includes(sub)){let d;try{d=await Prog.load(true)}catch(e){el.innerHTML='<div class="card">'+E(e.message)+'</div>';return}
    if(sub==='at')el.innerHTML=Prog.attH(d);
    if(sub==='tr')el.innerHTML=Prog.trkH(d);
    if(sub==='hi')el.innerHTML=Prog.hiH(d);
    if(sub==='rp'){const rp=await SB.from('reports').select('*').order('created_at',{ascending:false});el.innerHTML=Prog.rpH(d)+(rp.data||[]).map(r=>`<div class="card row" style="margin:8px 0"><div class="grow"><b>${E(r.title)}</b><div class="mut sm">${E(r.score||'')}</div></div><span class="chip g" style="font-size:18px">${E(r.grade||'')}</span></div>`).join('')}
    animate()}
}
function playView(){if(typeof Games!=="undefined")Games.show();else wrap('<div class="card">Games are loading…</div>')}

/* ---------------- chat ---------------- */
const isEmo=s=>s&&s.length<=8&&!/[A-Za-z0-9]/.test(s);
async function chatView(){
  wrap(`<h2>Chat</h2><div class="row" style="margin:10px 0"><input id="fs" class="inp" placeholder="Find a friend by name or ID"><button id="fb" class="btn sm">Find</button></div><div id="fr"></div><div id="fl">${skel(3)}</div>`);
  const find=async()=>{const q=$('#fs').value.trim();if(!q)return;const r=await rpc('find_student',{p_q:q});$('#fr').innerHTML='<div class="card" style="margin-bottom:10px">'+(r.length?r.map(p=>`<div class="row" style="margin:8px 0">${ava(p,42)}<b class="grow">${E(p.name)}</b><button class="btn sm" data-a="${E(p.student_id)}">Add</button></div>`).join(''):'<span class="mut">No one found</span>')+'</div>';
    $$('#fr [data-a]').forEach(b=>b.onclick=async()=>{const x=await SB.from('friends').insert({a:S.me.student_id,b:b.dataset.a});if(x.error)return toast(x.error.message.includes('duplicate')?'Already requested':x.error.message);toast('Friend request sent 🤝');b.disabled=true;b.textContent='Sent'})};
  $('#fb').onclick=find;$('#fs').onkeydown=e=>{if(e.key==='Enter')find()};
  const fr=await rpc('my_friends')||[],acc=fr.filter(f=>f.accepted).sort((a,b)=>(b.last_at||'').localeCompare(a.last_at||'')),inc=fr.filter(f=>!f.accepted&&f.incoming),out=fr.filter(f=>!f.accepted&&!f.incoming);
  let h='';
  if(inc.length)h+=`<div class="sec"><h3>Friend requests</h3></div>`+inc.map(f=>`<div class="card row" style="margin:8px 0;padding:12px">${ava(f,44)}<div class="grow"><b>${E(f.name)}</b><div class="mut sm">wants to be friends</div></div><button class="btn sm" data-ok="${E(f.student_id)}">Accept</button></div>`).join('');
  h+=`<div class="sec"><h3>Friends</h3></div>`+(acc.map(f=>`<div class="card row stag" style="margin:8px 0;padding:12px;cursor:pointer" data-f="${E(f.student_id)}" data-n="${E(f.name)}"><span data-p="${E(f.student_id)}">${ava(f,48)}</span><div class="grow"><b>${E(f.name)}</b><div class="mut sm" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${f.last_body?E(f.last_body):(f.status?E(f.status):'Say hi 👋')}</div></div>${f.unread?`<span class="unread">${f.unread}</span>`:''}</div>`).join('')||'<div class="card c mut"><div style="font-size:38px">🤝</div>Add a friend above to start chatting</div>');
  if(out.length)h+=`<div class="sec"><h3>Sent</h3></div>`+out.map(f=>`<div class="card row" style="margin:6px 0;padding:12px;opacity:.7">${ava(f,38)}<b class="grow">${E(f.name)}</b><span class="chip">pending</span></div>`).join('');
  $('#fl').innerHTML=h;
  $$('#fl [data-ok]').forEach(b=>b.onclick=async e=>{e.stopPropagation();const x=await SB.from('friends').update({status:'accepted'}).eq('a',b.dataset.ok).eq('b',S.me.student_id);if(x.error)return toast(x.error.message);confetti(30);chatView()});
  $$('#fl [data-f]').forEach(c=>c.onclick=ev=>{const pr=ev.target.closest('[data-p]');if(pr){friendCard(acc.find(f=>f.student_id===pr.dataset.p));return}convo(c.dataset.f,c.dataset.n)});
}
function friendCard(f){const sh=sheet(`<div class="c">${'<div style="display:grid;place-items:center;margin:12px 0 18px">'+ava(f,92)+'</div>'}<h2>${E(f.name)}</h2><div class="mut" style="margin:4px 0 12px">${f.status?'“'+E(f.status)+'”':'Excel Language Center'}</div><button class="btn full" id="fc_c">💬 Message</button></div>`);$('#fc_c',sh).onclick=()=>{sh.close();convo(f.student_id,f.name)}}
async function convo(id,name){
  wrap(`<div class="row" style="margin-bottom:8px"><button class="btn sm ghost" id="bk" aria-label="Back">${ICON.back}</button><h3 class="grow">${E(name)}</h3></div><div id="ms" style="min-height:50vh;padding-bottom:130px"></div><div style="position:fixed;left:0;right:0;bottom:calc(max(12px,env(safe-area-inset-bottom)) + 4px);padding:0 12px;z-index:30;max-width:520px;margin:0 auto"><div class="row" id="st" style="overflow:auto;padding:0 4px 8px">${['👍','😂','❤️','🔥','👏','🎉','😮','🙏'].map(e=>`<button class="btn sm ghost" data-e="${e}" style="font-size:20px;padding:4px 12px">${e}</button>`).join('')}</div><div class="card row" style="padding:8px"><button class="btn sm ghost" id="pic">🖼️</button><button class="btn sm ghost" id="gif">GIF</button><input id="mi" maxlength="1000" class="inp" placeholder="Message…"><button class="btn sm" id="sn" aria-label="Send">${ICON.send}</button></div></div><input id="pf" type="file" accept="image/*" hidden>`);
  $('#chrome').innerHTML='';const me=S.me.student_id,seen={};$('#bk').onclick=()=>{if(S.stop)S.stop();S.stop=null;render()};
  let lastDay='';const add=m=>{if(seen[m.id])return;seen[m.id]=1;const dt=new Date(m.created_at||Date.now()),dk=localDay(dt);if(dk!==lastDay){lastDay=dk;const s=document.createElement('div');s.className='dsep';s.textContent=dk===localDay()?'TODAY':dt.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'}).toUpperCase();$('#ms').appendChild(s)}const d=document.createElement('div');d.className='msg '+(m.from_id===me?'me':'th')+(!m.media_url&&isEmo(m.body)?' big':'');d.innerHTML=(m.kind==='image'||m.kind==='gif'?`<img src="${E(m.media_url)}" alt="">`:'')+(m.body?E(m.body):'')+`<span class="tm">${dt.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}${m.from_id===me?` <span class="ck">${m.read_at?'✓✓':'✓'}</span>`:''}</span>`;$('#ms').appendChild(d);window.scrollTo(0,document.body.scrollHeight)};
  const r=await SB.from('messages').select('*').or(`and(from_id.eq.${me},to_id.eq.${id}),and(from_id.eq.${id},to_id.eq.${me})`).order('created_at');(r.data||[]).forEach(add);
  SB.from('messages').update({read_at:new Date().toISOString()}).eq('to_id',me).eq('from_id',id).is('read_at',null).then(()=>{},()=>{});
  const ch=SB.channel('m'+me+id).on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'},p=>{const m=p.new;if((m.from_id===id&&m.to_id===me)||(m.from_id===me&&m.to_id===id))add(m)}).subscribe();S.stop=()=>SB.removeChannel(ch);
  async function send(o){const x=await SB.from('messages').insert(Object.assign({from_id:me,to_id:id},o)).select().single();if(x.error)return toast(x.error.message);add(x.data);snd(520,.1)}
  $('#sn').onclick=()=>{const v=$('#mi').value.trim();if(!v)return;$('#mi').value='';send({body:v})};$('#mi').onkeydown=e=>{if(e.key==='Enter')$('#sn').click()};
  $$('#st [data-e]').forEach(b=>b.onclick=()=>send({body:b.dataset.e}));
  $('#pic').onclick=()=>$('#pf').click();$('#pf').onchange=async function(){const f=this.files[0];if(!f)return;const url=await upImg(f,'chat');if(url)send({kind:'image',media_url:url})};
  $('#gif').onclick=()=>{const q=$('#mi').value.trim();if(!/^https?:\/\/.+\.(gif|webp)/i.test(q)){toast('Paste a GIF link in the box, then tap GIF');return}$('#mi').value='';send({kind:'gif',media_url:q})};
}
async function upImg(file,kind,max){
  try{const bm=await createImageBitmap(file),m=max||1000,s=Math.min(1,m/Math.max(bm.width,bm.height)),cv=document.createElement('canvas');cv.width=Math.round(bm.width*s);cv.height=Math.round(bm.height*s);cv.getContext('2d').drawImage(bm,0,0,cv.width,cv.height);
  const blob=await new Promise(r=>cv.toBlob(r,'image/jpeg',.82)),path=S.me.user_id+'/'+kind+'-'+Date.now()+'.jpg',u=await SB.storage.from('media').upload(path,blob,{contentType:'image/jpeg'});if(u.error)throw u.error;return SB.storage.from('media').getPublicUrl(path).data.publicUrl}catch(e){toast('Upload failed: '+e.message);return null}
}
async function saveProf(patch){const r=await SB.from('profiles').update(patch).eq('user_id',S.me.user_id);if(r.error){toast(r.error.message);return false}Object.assign(S.me,patch);applyTheme();return true}
boot();

document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('still',document.hidden));
