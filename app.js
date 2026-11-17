
var SB=supabase.createClient('https://skmdfluinkkdgyzgvuph.supabase.co','sb_publishable_v4wMwbVmjPfxnf8U6VyGgA_fnOs0WMG');
var $=function(s,r){return (r||document).querySelector(s)};
var E=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var S={me:null,roster:null,cls:null,tab:'home',data:{}};
var SV='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
var ICON={home:'<svg viewBox="0 0 24 24" '+SV+'><path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/></svg>',
class:'<svg viewBox="0 0 24 24" '+SV+'><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>',
play:'<svg viewBox="0 0 24 24" '+SV+'><rect x="2" y="7" width="20" height="12" rx="5"/><path d="M7 13h4M9 11v4M16 12h.01M18 14h.01"/></svg>',
chat:'<svg viewBox="0 0 24 24" '+SV+'><path d="M21 12a8 8 0 01-11.6 7.1L3 21l1.9-5.4A8 8 0 1121 12z"/></svg>',
me:'<svg viewBox="0 0 24 24" '+SV+'><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>',
scan:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2M7 12h10"/></svg>'};
var BGS=['aurora','sunset','ocean','forest','midnight','candy'];var AVS=['🦊','🐼','🦁','🐯','🐸','🐙','🦄','🐲','🚀','⚡','🌙','🎧','🦉','🐬','🍉','👑'];var ACCS=['#8b5cf6','#4cb7a5','#f472b6','#fbbf24','#38bdf8','#fb7185'];
function toast(m,ms){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(function(){t.classList.remove('show')},ms||2600)}
function confetti(n){var cs=['#4cb7a5','#8b5cf6','#fbbf24','#f472b6','#34d399'];for(var i=0;i<(n||40);i++){var d=document.createElement('i');d.className='confetti';d.style.left=Math.random()*100+'vw';d.style.background=cs[i%5];d.style.animationDelay=Math.random()*.5+'s';d.style.borderRadius=Math.random()>.5?'50%':'2px';document.body.appendChild(d);setTimeout(function(x){x.remove()},2600,d)}}
function buzz(p){try{navigator.vibrate&&navigator.vibrate(p||15)}catch(e){}}
function snd(f,d){try{var A=snd.a||(snd.a=new (window.AudioContext||window.webkitAudioContext)());var o=A.createOscillator(),g=A.createGain();o.frequency.value=f;o.type='triangle';g.gain.value=.08;o.connect(g);g.connect(A.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,A.currentTime+(d||.18));o.stop(A.currentTime+(d||.18))}catch(e){}}
async function rpc(fn,args){var r=await SB.rpc(fn,args||{});if(r.error)throw new Error(r.error.message);return r.data}
function ava(p,sz){p=p||{};sz=sz||44;var st='width:'+sz+'px;height:'+sz+'px;border-radius:50%;display:grid;place-items:center;font-size:'+Math.round(sz*.5)+'px;background:var(--card2) center/cover;flex:none;'+(p.photo?'background-image:url('+E(p.photo)+')':'');return '<div style="'+st+'">'+(p.photo?'':E(p.avatar||'🦊'))+'</div>'}
function lvl(xp){var l=1,n=100,x=xp||0;while(x>=n){x-=n;l++;n=Math.round(n*1.25)}return {l:l,cur:x,need:n}}
function applyTheme(){var p=S.me;if(!p)return;var h=document.documentElement;h.dataset.bg=p.bg||'aurora';h.style.setProperty('--acc',p.accent||'#8b5cf6')}
function loadingDone(){var l=$('#loader');if(l)l.classList.add('gone')}
async function boot(){
  var t0=Date.now();var s=await SB.auth.getSession();
  if(s.data.session){try{await loadMe()}catch(e){S.me=null}}
  setTimeout(function(){render();loadingDone()},Math.max(0,1300-(Date.now()-t0)));
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(function(){});
}
async function loadMe(){
  var u=await SB.auth.getUser();var uid=u.data.user.id;
  var p=await SB.from('profiles').select('*').eq('user_id',uid).maybeSingle();
  if(!p.data){S.me=null;return}S.me=p.data;
  var r=await SB.from('roster').select('*').eq('student_id',S.me.student_id).maybeSingle();S.roster=r.data;
  var c=await SB.from('classes').select('*').eq('id',(S.roster||{}).class_id||'').maybeSingle();S.cls=c.data;applyTheme();
}
async function refreshMe(){var p=await SB.from('profiles').select('*').eq('user_id',S.me.user_id).maybeSingle();if(p.data){S.me=p.data;applyTheme()}}
function authView(mode){
  var act=mode==='act';$('#chrome').innerHTML='';
  $('#app').innerHTML='<div class="view stag" style="padding-top:8vh;text-align:center"><img src="icon.svg" width="92" height="92" style="border-radius:26px;animation:bob 3s ease-in-out infinite" alt=""><h1 style="font-size:34px;margin-top:14px">Excel Student</h1><p class="mut" style="margin:6px 0 22px">Your English world. Learn, play, check in.</p>'+
  '<div class="card" style="text-align:left"><span class="lbl" style="margin-top:0">Student ID</span><input id="a_id" class="inp" placeholder="e.g. DEMO-01" autocapitalize="characters" autocomplete="username">'+
  (act?'<span class="lbl">Activation code (from your teacher)</span><input id="a_code" class="inp" inputmode="numeric" placeholder="6 digits"><span class="lbl">Make a password</span>':'<span class="lbl">Password</span>')+
  '<input id="a_pw" type="password" class="inp" placeholder="'+(act?'At least 6 characters':'Your password')+'" autocomplete="'+(act?'new-password':'current-password')+'">'+
  '<button id="a_go" class="btn" style="width:100%;margin-top:18px">'+(act?'Activate my account':'Sign in')+'</button>'+
  '<div style="text-align:center;margin-top:14px"><a href="#" id="a_sw" class="sm">'+(act?'I already have an account':'First time? Activate with your code')+'</a></div></div>'+
  '<p class="mut sm" style="margin-top:18px">Excel Language Center · Ampang Park &amp; One South</p></div>';
  $('#a_sw').onclick=function(e){e.preventDefault();authView(act?'in':'act')};
  $('#a_go').onclick=function(){doAuth(act)};$('#a_pw').onkeydown=function(e){if(e.key==='Enter')doAuth(act)};
}
async function doAuth(act){
  var id=$('#a_id').value.trim().toUpperCase(),pw=$('#a_pw').value,b=$('#a_go');if(!id||!pw){toast('Fill in all the boxes');return}
  b.disabled=true;b.textContent='One moment…';var email=id.toLowerCase().replace(/[^a-z0-9]/g,'')+'@excel-student.app';
  try{
    if(act){
      var code=$('#a_code').value.trim();if(pw.length<6)throw new Error('Password needs at least 6 characters');
      var ok=await rpc('can_claim',{p_id:id,p_code:code});
      if(ok!==true&&!(ok&&ok.ok))throw new Error((ok&&ok.error)||'That ID or code is not right. Ask your teacher.');
      var su=await SB.auth.signUp({email:email,password:pw});if(su.error)throw su.error;
      if(!su.data.session){var si=await SB.auth.signInWithPassword({email:email,password:pw});if(si.error)throw si.error}
      var cl=await SB.rpc('claim_student',{p_id:id,p_code:code});if(cl.error)throw cl.error;if(cl.data&&cl.data.error)throw new Error(cl.data.error);
    }else{var si2=await SB.auth.signInWithPassword({email:email,password:pw});if(si2.error)throw new Error('Wrong ID or password')}
    await loadMe();if(!S.me)throw new Error('Account not activated yet');confetti(50);S.tab='home';render();toast('Welcome, '+(S.me.name||'').split(' ')[0]+'!');
  }catch(e){b.disabled=false;b.textContent=act?'Activate my account':'Sign in';toast(e.message||'Something went wrong');b.classList.add('shake');setTimeout(function(){b.classList.remove('shake')},500)}
}

function render(){
  if(!S.me){authView('in');return}
  var tabs=[['home','Home'],['class','Class'],['play','Play'],['chat','Chat'],['me','Me']];
  $('#chrome').innerHTML='<button class="scanfab" id="fab" aria-label="Scan">'+ICON.scan+'</button><div class="nav">'+tabs.map(function(t){return '<button data-t="'+t[0]+'" class="'+(S.tab===t[0]?'on':'')+'">'+ICON[t[0]]+t[1]+'</button>'}).join('')+'</div>';
  document.querySelectorAll('.nav button').forEach(function(b){b.onclick=function(){buzz(8);S.tab=b.dataset.t;render()}});
  $('#fab').onclick=function(){buzz(12);scanView()};
  if(S.stop)S.stop();S.stop=null;
  ({home:homeView,class:classView,play:playView,chat:chatView,me:meView})[S.tab]();window.scrollTo(0,0);
}
function wrap(html){$('#app').innerHTML='<div class="view">'+html+'</div>'}
function greet(){var h=new Date().getHours();return h<12?'Good morning':h<18?'Good afternoon':'Good evening'}
var DN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function nextClass(){var c=S.cls;if(!c||!c.days||!c.days.length)return null;var now=new Date();for(var i=0;i<8;i++){var d=new Date(now.getTime()+i*864e5);if(c.days.map(function(x){return x%7}).indexOf(d.getDay())>-1){var t=(c.start_time||'09:00').split(':');var st=new Date(d);st.setHours(+t[0],+t[1],0,0);if(st>now||i>0)return {d:d,st:st}}}return null}
async function homeView(){
  var m=S.me,L=lvl(m.xp),nc=nextClass();
  wrap('<div class="stag"><div class="row" style="margin:8px 0 14px"><div class="grow"><div class="mut sm">'+greet()+'</div><h1 style="font-size:28px">'+E((m.name||'').split(' ')[0])+' 👋</h1></div>'+ava(m,52)+'</div>'+
  '<div class="card" style="background:linear-gradient(135deg,rgba(76,183,165,.25),rgba(139,92,246,.25))"><div class="row"><div class="grow"><b style="font-family:var(--disp);font-size:18px">Level '+L.l+'</b><div class="mut sm">'+L.cur+' / '+L.need+' XP to next level</div></div><span class="chip a">🔥 '+(m.streak||0)+' streak</span></div><div class="bar" style="margin-top:10px"><i style="width:'+Math.min(100,L.cur/L.need*100)+'%"></i></div></div>'+
  '<div class="card" style="margin-top:12px"><div class="mut sm">Next class</div>'+(nc?'<b style="font-family:var(--disp);font-size:20px">'+DN[nc.d.getDay()]+' · '+(S.cls.start_time||'').slice(0,5)+'</b><div class="mut sm">'+E(S.cls.name)+(S.cls.room?' · '+E(S.cls.room):'')+'</div>':'<b>No class scheduled</b>')+
  '<div class="row" style="margin-top:10px"><button class="btn sm" id="h_scan">📷 Scan to check in</button><button class="btn sm ghost" id="h_abs">Can’t come?</button></div></div>'+
  '<div class="grid2" style="margin-top:12px"><div class="tile" id="h_hw"><span class="ic">📚</span><b>Homework</b><div class="mut sm" id="h_hwn">…</div></div><div class="tile" id="h_pl"><span class="ic">🎮</span><b>Play &amp; learn</b><div class="mut sm">Games, bosses, XP</div></div>'+
  '<div class="tile" id="h_lb"><span class="ic">🏆</span><b>Leaderboard</b><div class="mut sm">Top learners</div></div><div class="tile" id="h_pr"><span class="ic">🗣️</span><b>Say it right</b><div class="mut sm">British pronunciation</div></div></div></div>');
  $('#h_scan').onclick=scanView;$('#h_abs').onclick=absView;$('#h_hw').onclick=function(){S.tab='class';S.sub='hw';render()};$('#h_pl').onclick=function(){S.tab='play';render()};$('#h_lb').onclick=lbView;$('#h_pr').onclick=function(){S.tab='play';S.pron=1;render()};
  try{var hw=await SB.from('homework').select('id').order('due');var dn=await SB.from('homework_done').select('hw_id');var left=(hw.data||[]).filter(function(h){return !(dn.data||[]).some(function(d){return d.hw_id===h.id})}).length;var el=$('#h_hwn');if(el)el.textContent=left?left+' to do':'All done 🎉'}catch(e){}
}
async function lbView(){
  wrap('<h2>🏆 Leaderboard</h2><div id="lb" class="mut" style="margin-top:12px">Loading…</div><button class="btn ghost" style="margin-top:14px" id="bk">Back</button>');$('#bk').onclick=render;
  var r=await rpc('leaderboard');$('#lb').innerHTML=r.map(function(p,i){return '<div class="card row stag" style="margin:8px 0;padding:12px"><b style="width:26px;font-family:var(--disp)">'+(i<3?['🥇','🥈','🥉'][i]:i+1)+'</b>'+ava(p,40)+'<div class="grow"><b>'+E(p.name)+(p.student_id===S.me.student_id?' (you)':'')+'</b><div class="mut sm">🔥 '+p.streak+'</div></div><b>'+p.xp+' XP</b></div>'}).join('')||'No one yet'}
/* ---------- scan ---------- */
async function scanView(){
  wrap('<h2>Scan the class code</h2><p class="mut">Point your camera at the QR on the teacher’s screen.</p><div class="scanbox"><video id="cam" playsinline muted></video></div><div class="row" style="margin-top:14px"><input id="mt" class="inp" placeholder="Camera trouble? Paste code"><button id="mb" class="btn sm">Go</button></div><button class="btn ghost" style="margin-top:14px;width:100%" id="bk">Cancel</button>');
  var vid=$('#cam'),stream,live=true;S.stop=function(){live=false;try{stream&&stream.getTracks().forEach(function(t){t.stop()})}catch(e){}};
  $('#bk').onclick=function(){S.stop();render()};$('#mb').onclick=function(){done($('#mt').value.trim())};
  var busy=false;async function done(tok){if(busy||!tok)return;busy=true;try{var r=await rpc('scan',{p_token:tok});S.stop();scanResult(r)}catch(e){toast(e.message);setTimeout(function(){busy=false},1800)}}
  try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});vid.srcObject=stream;await vid.play();var cv=document.createElement('canvas'),cx=cv.getContext('2d',{willReadFrequently:true});
    (function tick(){if(!live)return;if(vid.readyState>=2&&vid.videoWidth){var w=480,h=Math.round(480*vid.videoHeight/vid.videoWidth);cv.width=w;cv.height=h;cx.drawImage(vid,0,0,w,h);var q=jsQR(cx.getImageData(0,0,w,h).data,w,h);if(q&&q.data&&!busy){buzz(20);done(q.data)}}setTimeout(tick,160)})();
  }catch(e){toast('Camera blocked — paste the code instead')}
}
async function scanResult(r){
  await refreshMe();var late=r.status==='late';
  if(!late&&!r.again)confetti(70);snd(late?330:660,.3);buzz(late?[40,40,40]:[30,60,30]);
  wrap('<div style="text-align:center;padding-top:9vh" class="stag"><div class="pop" style="font-size:90px">'+(r.again?'👍':late?'⏰':'✅')+'</div><h1 style="margin-top:8px">'+(r.again?'Already checked in':late?'You’re marked late':'You’re in!')+'</h1>'+
  '<p class="mut">'+(late?'Class started '+(r.late_by||0)+' min past the cut-off. Come a bit earlier next time!':r.again?'Status: '+E(r.status):'On time — nice work.')+'</p>'+
  (r.points?'<div class="card pop" style="display:inline-block;margin-top:8px"><b style="font-size:30px;font-family:var(--disp)">+'+r.points+' XP</b>'+(r.streak?'<div class="mut sm">🔥 '+r.streak+' class streak</div>':'')+'</div>':'')+
  '<div><button class="btn" style="margin-top:22px" id="ok">Awesome</button></div></div>');$('#ok').onclick=function(){S.tab='home';render()};
}
async function absView(){
  wrap('<h2>Can’t make it?</h2><p class="mut">Tell your teacher in advance (at least 1 hour before class).</p><div class="card"><span class="lbl" style="margin-top:0">Date</span><input id="ad" type="date" class="inp"><span class="lbl">Reason</span><textarea id="ar" class="inp" rows="3" placeholder="e.g. Doctor’s appointment"></textarea><button class="btn" id="as" style="width:100%;margin-top:14px">Send request</button></div><div id="al" style="margin-top:14px"></div><button class="btn ghost" id="bk" style="margin-top:8px">Back</button>');
  $('#bk').onclick=render;$('#ad').value=new Date(Date.now()+864e5).toISOString().slice(0,10);
  async function list(){var r=await SB.from('absence_requests').select('*').order('created_at',{ascending:false}).limit(8);$('#al').innerHTML=(r.data||[]).map(function(a){return '<div class="card row" style="margin:6px 0;padding:12px"><div class="grow"><b>'+E(a.on_date)+'</b><div class="mut sm">'+E(a.reason)+'</div></div><span class="chip '+(a.status==='approved'?'g':a.status==='declined'?'r':'a')+'">'+E(a.status)+'</span></div>'}).join('')}
  list();$('#as').onclick=async function(){var d=$('#ad').value,rs=$('#ar').value.trim();if(!rs){toast('Add a reason');return}
    var r=await SB.from('absence_requests').insert({student_id:S.me.student_id,class_id:S.roster.class_id,on_date:d,reason:rs});if(r.error){toast(r.error.message);return}toast('Sent to your teacher ✉️');$('#ar').value='';list()};
}

async function classView(){
  var sub=S.sub||'hw';S.sub=null;var tabs=[['hw','📚 Homework'],['tt','🗓️ Timetable'],['at','✅ Attendance'],['rp','📝 Reports']];
  wrap('<h2>My class</h2><div class="mut sm" style="margin-bottom:10px">'+E(S.cls?S.cls.name:'No class yet')+'</div><div class="row" id="ct" style="overflow:auto;padding-bottom:6px">'+tabs.map(function(t){return '<button class="btn sm '+(t[0]===sub?'':'ghost')+'" data-s="'+t[0]+'" style="white-space:nowrap">'+t[1]+'</button>'}).join('')+'</div><div id="cb" style="margin-top:12px"></div>');
  document.querySelectorAll('#ct button').forEach(function(b){b.onclick=function(){S.sub=b.dataset.s;classView()}});
  var el=$('#cb');
  if(sub==='hw'){var hw=await SB.from('homework').select('*').order('due');var dn=await SB.from('homework_done').select('hw_id');var ds=(dn.data||[]).map(function(d){return d.hw_id});
    el.innerHTML=(hw.data||[]).map(function(h){var d=ds.indexOf(h.id)>-1;return '<div class="card stag" style="margin:8px 0"><div class="row"><div class="grow"><b>'+E(h.title)+'</b><div class="mut sm">Due '+E(h.due||'—')+'</div></div><span class="chip '+(d?'g':'a')+'">'+(d?'Done':'To do')+'</span></div><p class="mut" style="margin:8px 0">'+E(h.body)+'</p>'+(h.file_url?'<a href="'+E(h.file_url)+'" target="_blank">📎 Open file</a> ':'')+(d?'':'<button class="btn sm" data-d="'+h.id+'" style="margin-top:6px">Mark done</button>')+'</div>'}).join('')||'<div class="card">No homework 🎉</div>';
    el.querySelectorAll('[data-d]').forEach(function(b){b.onclick=async function(){var r=await SB.from('homework_done').insert({hw_id:+b.dataset.d,student_id:S.me.student_id});if(r.error)return toast(r.error.message);confetti(30);snd(700);toast('Nice! Homework done ✅');S.sub='hw';classView()}})}
  if(sub==='tt'){var c=S.cls||{};var days=(c.days||[]).map(function(x){return x%7});
    var cur=new Date(),y=cur.getFullYear(),mo=cur.getMonth(),first=new Date(y,mo,1).getDay(),n=new Date(y,mo+1,0).getDate();
    var ev=await SB.from('events').select('*').order('on_date');var evd=(ev.data||[]).map(function(e){return e.on_date});
    var g='<div class="cal">'+DN.map(function(d){return '<div class="h">'+d[0]+'</div>'}).join('');for(var i=0;i<first;i++)g+='<div></div>';
    for(var d=1;d<=n;d++){var ds2=y+'-'+String(mo+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');var dw=new Date(y,mo,d).getDay();g+='<div class="d '+(d===cur.getDate()?'t ':'')+(evd.indexOf(ds2)>-1?'e':'')+'" style="'+(days.indexOf(dw)>-1&&d!==cur.getDate()?'background:rgba(76,183,165,.22)':'')+'">'+d+'</div>'}g+='</div>';
    el.innerHTML='<div class="card"><b style="font-family:var(--disp)">'+E(c.name||'')+'</b><div class="mut sm">'+(c.days||[]).map(function(x){return DN[x%7]}).join(' · ')+' · '+(c.start_time||'').slice(0,5)+'–'+(c.end_time||'').slice(0,5)+(c.room?' · '+E(c.room):'')+'</div></div><div class="card" style="margin-top:12px"><h3 style="margin-bottom:10px">'+['January','February','March','April','May','June','July','August','September','October','November','December'][mo]+' '+y+'</h3>'+g+'<div class="mut sm" style="margin-top:10px">Green = class day · yellow underline = event</div></div>'+
    '<div class="card" style="margin-top:12px"><h3 style="margin-bottom:8px">Coming up</h3>'+((ev.data||[]).filter(function(e){return e.on_date>=cur.toISOString().slice(0,10)}).map(function(e){return '<div class="row" style="margin:6px 0"><span class="chip a">'+E(e.on_date.slice(5))+'</span><b>'+E(e.title)+'</b></div>'}).join('')||'<span class="mut">Nothing yet</span>')+'</div>'}
  if(sub==='at'){var at=await SB.from('attendance').select('*').order('scanned_at',{ascending:false});var a=at.data||[];var p=a.filter(function(x){return x.status==='present'}).length,l=a.filter(function(x){return x.status==='late'}).length,ab=a.filter(function(x){return x.status==='absent'}).length;var tot=a.length||1;
    el.innerHTML='<div class="stats"><div class="stat"><b style="color:var(--green)">'+p+'</b><span>On time</span></div><div class="stat"><b style="color:var(--amber)">'+l+'</b><span>Late</span></div><div class="stat"><b style="color:var(--red)">'+ab+'</b><span>Absent</span></div></div><div class="card" style="margin:12px 0"><div class="row"><b class="grow">Attendance rate</b><b>'+Math.round((p+l)/tot*100)+'%</b></div><div class="bar" style="margin-top:8px"><i style="width:'+(p+l)/tot*100+'%"></i></div></div>'+
    a.map(function(x){return '<div class="card row" style="margin:6px 0;padding:12px"><div class="grow">'+new Date(x.scanned_at).toLocaleString('en-GB',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</div><span class="chip '+(x.status==='present'?'g':x.status==='late'?'a':'r')+'">'+E(x.status)+'</span></div>'}).join('')}
  if(sub==='rp'){var rp=await SB.from('reports').select('*').order('created_at',{ascending:false});
    el.innerHTML=(rp.data||[]).map(function(r){return '<div class="card row" style="margin:8px 0"><div class="grow"><b>'+E(r.title)+'</b><div class="mut sm">'+E(r.score||'')+'</div></div><span class="chip g" style="font-size:18px">'+E(r.grade||'')+'</span></div>'}).join('')||'<div class="card">Your academic reports and exam results will appear here once your teacher publishes them.</div>'}
}
function playView(){
  if(window.Games)Games.show();else wrap('<div class="card">Games are loading…</div>');
}
/* ---------- chat ---------- */
async function chatView(){
  wrap('<h2>Chat</h2><div class="row" style="margin:10px 0"><input id="fs" class="inp" placeholder="Find a friend by name or ID"><button id="fb" class="btn sm">Find</button></div><div id="fr"></div><div id="fl"></div>');
  $('#fb').onclick=async function(){var q=$('#fs').value.trim();if(!q)return;var r=await rpc('find_student',{p_q:q});$('#fr').innerHTML='<div class="card" style="margin-bottom:10px">'+(r.length?r.map(function(p){return '<div class="row" style="margin:6px 0">'+ava(p,40)+'<b class="grow">'+E(p.name)+'</b><button class="btn sm" data-a="'+E(p.student_id)+'">Add</button></div>'}).join(''):'<span class="mut">No one found</span>')+'</div>';
    $('#fr').querySelectorAll('[data-a]').forEach(function(b){b.onclick=async function(){var x=await SB.from('friends').insert({a:S.me.student_id,b:b.dataset.a});if(x.error)return toast(x.error.message.indexOf('duplicate')>-1?'Already requested':x.error.message);toast('Friend request sent 🤝');b.disabled=true;b.textContent='Sent'}})};
  var fr=await rpc('my_friends');
  $('#fl').innerHTML=(fr||[]).map(function(f){var pend=f.status==='pending';return '<div class="card row stag" style="margin:8px 0;padding:12px" data-f="'+E(f.student_id)+'" data-n="'+E(f.name)+'">'+ava(f,44)+'<div class="grow"><b>'+E(f.name)+'</b><div class="mut sm">'+(pend?(f.incoming?'wants to be friends':'request sent'):'tap to chat')+'</div></div>'+(pend&&f.incoming?'<button class="btn sm" data-ok="'+E(f.student_id)+'">Accept</button>':'')+'</div>'}).join('')||'<div class="card mut">Add a friend to start chatting. Search above!</div>';
  $('#fl').querySelectorAll('[data-ok]').forEach(function(b){b.onclick=async function(e){e.stopPropagation();var x=await SB.from('friends').update({status:'accepted'}).eq('a',b.dataset.ok).eq('b',S.me.student_id);if(x.error)return toast(x.error.message);confetti(25);chatView()}});
  $('#fl').querySelectorAll('[data-f]').forEach(function(c){c.onclick=function(){convo(c.dataset.f,c.dataset.n)}});
}
async function convo(id,name){
  wrap('<div class="row" style="margin-bottom:8px"><button class="btn sm ghost" id="bk">←</button><h3 class="grow">'+E(name)+'</h3></div><div id="ms" style="min-height:50vh;padding-bottom:70px"></div><div style="position:fixed;left:0;right:0;bottom:calc(max(12px,env(safe-area-inset-bottom)) + 4px);padding:0 12px;z-index:30;max-width:520px;margin:0 auto"><div class="card row" style="padding:8px"><button class="btn sm ghost" id="pic">🖼️</button><button class="btn sm ghost" id="gif">GIF</button><input id="mi" class="inp" placeholder="Message…"><button class="btn sm" id="sn">➤</button></div></div><input id="pf" type="file" accept="image/*" hidden>');
  $('#chrome').innerHTML='';var me=S.me.student_id,seen={};
  $('#bk').onclick=function(){if(S.stop)S.stop();render()};
  function add(m){if(seen[m.id])return;seen[m.id]=1;var d=document.createElement('div');d.className='msg '+(m.from_id===me?'me':'th');d.innerHTML=(m.kind==='image'||m.kind==='gif'?'<img src="'+E(m.media_url)+'" alt="">':'')+(m.body?E(m.body):'');$('#ms').appendChild(d);window.scrollTo(0,document.body.scrollHeight)}
  var r=await SB.from('messages').select('*').or('and(from_id.eq.'+me+',to_id.eq.'+id+'),and(from_id.eq.'+id+',to_id.eq.'+me+')').order('created_at');(r.data||[]).forEach(add);
  var ch=SB.channel('m'+me+id).on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'},function(p){var m=p.new;if((m.from_id===id&&m.to_id===me)||(m.from_id===me&&m.to_id===id))add(m)}).subscribe();S.stop=function(){SB.removeChannel(ch)};
  async function send(o){var x=await SB.from('messages').insert(Object.assign({from_id:me,to_id:id},o)).select().single();if(x.error)return toast(x.error.message);add(x.data);snd(520,.1)}
  $('#sn').onclick=function(){var v=$('#mi').value.trim();if(!v)return;$('#mi').value='';send({body:v})};$('#mi').onkeydown=function(e){if(e.key==='Enter')$('#sn').click()};
  $('#pic').onclick=function(){$('#pf').click()};$('#pf').onchange=async function(){var f=this.files[0];if(!f)return;var url=await upImg(f,'chat');if(url)send({kind:'image',media_url:url})};
  $('#gif').onclick=function(){var u=prompt?null:null;var q=$('#mi').value.trim();if(!/^https?:\/\/.+\.(gif|webp)/i.test(q)){toast('Paste a GIF link in the box, then tap GIF');return}$('#mi').value='';send({kind:'gif',media_url:q})};
}
async function upImg(file,kind,max){
  try{var bm=await createImageBitmap(file);var m=max||1000,s=Math.min(1,m/Math.max(bm.width,bm.height));var cv=document.createElement('canvas');cv.width=Math.round(bm.width*s);cv.height=Math.round(bm.height*s);cv.getContext('2d').drawImage(bm,0,0,cv.width,cv.height);
  var blob=await new Promise(function(r){cv.toBlob(r,'image/jpeg',.82)});var path=S.me.user_id+'/'+kind+'-'+Date.now()+'.jpg';
  var u=await SB.storage.from('media').upload(path,blob,{contentType:'image/jpeg'});if(u.error)throw u.error;return SB.storage.from('media').getPublicUrl(path).data.publicUrl}catch(e){toast('Upload failed: '+e.message);return null}
}

async function saveProf(patch){var r=await SB.from('profiles').update(patch).eq('user_id',S.me.user_id);if(r.error)return toast(r.error.message);Object.assign(S.me,patch);applyTheme()}
function meView(){
  var m=S.me,L=lvl(m.xp);
  wrap('<div class="stag"><div class="card hero"><div class="cover" id="cv" style="'+(m.cover?'background-image:url('+E(m.cover)+')':'')+'"></div><div class="in"><div class="av" id="avb" style="'+(m.photo?'background-image:url('+E(m.photo)+')':'')+'">'+(m.photo?'':E(m.avatar))+'</div><h2 style="margin-top:10px">'+E(m.name)+'</h2><div class="mut sm">'+E(m.student_id)+' · '+E(S.cls?S.cls.name:'')+'</div><p style="margin:8px 0 0">'+E(m.bio||'Tap Edit to add a bio ✨')+'</p></div></div>'+
  '<div class="stats"><div class="stat"><b>'+L.l+'</b><span>Level</span></div><div class="stat"><b>'+(m.xp||0)+'</b><span>XP</span></div><div class="stat"><b>'+(m.coins||0)+'</b><span>Coins</span></div></div>'+
  '<div class="card" style="margin-top:12px"><h3 style="margin-bottom:8px">Customize</h3><span class="lbl" style="margin-top:0">Emoji avatar</span><div class="row" style="flex-wrap:wrap">'+AVS.map(function(a){return '<button class="btn sm ghost" data-av="'+a+'" style="font-size:20px;padding:6px 10px">'+a+'</button>'}).join('')+'</div>'+
  '<span class="lbl">Background</span><div class="row" style="flex-wrap:wrap">'+BGS.map(function(b){return '<button class="btn sm ghost" data-bg="'+b+'">'+b+'</button>'}).join('')+'</div>'+
  '<span class="lbl">Accent colour</span><div class="row">'+ACCS.map(function(c){return '<button data-ac="'+c+'" style="width:34px;height:34px;border-radius:50%;background:'+c+';border:3px solid var(--line)"></button>'}).join('')+'</div>'+
  '<div class="row" style="margin-top:14px"><button class="btn sm" id="up1">📷 Profile photo</button><button class="btn sm" id="up2">🖼️ Cover image</button></div><input type="file" id="pf" accept="image/*" hidden>'+
  '<span class="lbl">Bio</span><textarea id="bio" class="inp" rows="2" maxlength="140">'+E(m.bio||'')+'</textarea><button class="btn sm" id="sb" style="margin-top:8px">Save bio</button></div>'+
  '<div class="grid2" style="margin-top:12px"><div class="tile" id="t_n"><span class="ic">🗒️</span><b>My notes</b></div><div class="tile" id="t_v"><span class="ic">📖</span><b>My words</b></div><div class="tile" id="t_r"><span class="ic">✋</span><b>Ask a teacher</b></div><div class="tile" id="t_c"><span class="ic">💡</span><b>Suggestions</b></div></div>'+
  '<button class="btn ghost" id="so" style="width:100%;margin-top:14px">Sign out</button></div>');
  document.querySelectorAll('[data-av]').forEach(function(b){b.onclick=function(){saveProf({avatar:b.dataset.av,photo:null}).then(meView)}});
  document.querySelectorAll('[data-bg]').forEach(function(b){b.onclick=function(){saveProf({bg:b.dataset.bg});toast('Background: '+b.dataset.bg)}});
  document.querySelectorAll('[data-ac]').forEach(function(b){b.onclick=function(){saveProf({accent:b.dataset.ac});toast('New accent ✨')}});
  var which='';$('#up1').onclick=function(){which='photo';$('#pf').click()};$('#up2').onclick=function(){which='cover';$('#pf').click()};
  $('#pf').onchange=async function(){var f=this.files[0];if(!f)return;toast('Uploading…');var u=await upImg(f,which,which==='cover'?1400:500);if(u){var o={};o[which]=u;await saveProf(o);meView()}};
  $('#sb').onclick=function(){saveProf({bio:$('#bio').value.trim()});toast('Saved ✅')};
  $('#t_n').onclick=function(){listPage('notes','🗒️ My notes',['title','body'],['Title','Write your note…'])};
  $('#t_v').onclick=function(){listPage('vocab','📖 My words',['word','meaning'],['New word','Meaning or example'])};
  $('#t_r').onclick=function(){formPage('requests','✋ Ask a teacher','Request',['Extra practice','Change class time','Meeting with teacher','Certificate / letter','Other'],'What do you need?')};
  $('#t_c').onclick=function(){formPage('complaints','💡 Complaints & ideas','Type',['suggestion','complaint','app idea','compliment'],'Tell us…')};
  $('#so').onclick=async function(){await SB.auth.signOut();S.me=null;document.documentElement.dataset.bg='';render()};
}
async function listPage(tbl,title,f,ph){
  wrap('<div class="row"><button class="btn sm ghost" id="bk">←</button><h2 class="grow">'+title+'</h2></div><div class="card" style="margin-top:12px"><input id="f1" class="inp" placeholder="'+ph[0]+'"><textarea id="f2" class="inp" rows="2" placeholder="'+ph[1]+'" style="margin-top:8px"></textarea><button id="fa" class="btn sm" style="margin-top:8px">Add</button></div><div id="ls" style="margin-top:12px"></div>');$('#bk').onclick=render;
  async function load(){var r=await SB.from(tbl).select('*').order('created_at',{ascending:false});$('#ls').innerHTML=(r.data||[]).map(function(x){return '<div class="card row stag" style="margin:6px 0;padding:12px"><div class="grow"><b>'+E(x[f[0]])+'</b><div class="mut sm">'+E(x[f[1]]||'')+'</div></div><button class="btn sm ghost" data-x="'+x.id+'">✕</button></div>'}).join('')||'<div class="mut">Nothing yet.</div>';$('#ls').querySelectorAll('[data-x]').forEach(function(b){b.onclick=async function(){await SB.from(tbl).delete().eq('id',+b.dataset.x);load()}})}
  load();$('#fa').onclick=async function(){var o={student_id:S.me.student_id};o[f[0]]=$('#f1').value.trim();o[f[1]]=$('#f2').value.trim();if(!o[f[0]])return toast('Write something first');var r=await SB.from(tbl).insert(o);if(r.error)return toast(r.error.message);$('#f1').value='';$('#f2').value='';snd(600,.1);load()};
}
async function formPage(tbl,title,lab,opts,ph){
  wrap('<div class="row"><button class="btn sm ghost" id="bk">←</button><h2 class="grow">'+title+'</h2></div><div class="card" style="margin-top:12px"><span class="lbl" style="margin-top:0">'+lab+'</span><select id="k" class="inp">'+opts.map(function(o){return '<option>'+o+'</option>'}).join('')+'</select><textarea id="b" class="inp" rows="4" placeholder="'+ph+'" style="margin-top:10px"></textarea><button class="btn" id="s" style="width:100%;margin-top:10px">Send</button></div><div id="h" style="margin-top:12px"></div>');$('#bk').onclick=render;
  async function load(){var r=await SB.from(tbl).select('*').order('created_at',{ascending:false}).limit(10);$('#h').innerHTML=(r.data||[]).map(function(x){return '<div class="card row" style="margin:6px 0;padding:12px"><div class="grow"><b>'+E(x.kind)+'</b><div class="mut sm">'+E(x.body)+'</div></div><span class="chip '+(x.status==='new'?'a':'g')+'">'+E(x.status)+'</span></div>'}).join('')}
  load();$('#s').onclick=async function(){var b=$('#b').value.trim();if(!b)return toast('Write something first');var r=await SB.from(tbl).insert({student_id:S.me.student_id,kind:$('#k').value,body:b});if(r.error)return toast(r.error.message);$('#b').value='';confetti(20);toast('Sent — thank you!');load()};
}
boot();
