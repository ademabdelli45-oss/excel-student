/* Friends tab: find by ID, profiles, groups, group chat, challenges (duels + group battles) */
const Social=(()=>{
const GM={words:{n:'Word Meaning',i:'📖',d:'Pick the right meaning',c:'linear-gradient(135deg,#8b5cf6,#6d28d9)'},grammar:{n:'Grammar',i:'🧠',d:'Choose the correct word',c:'linear-gradient(135deg,#f43f5e,#be123c)'},listen:{n:'Listen & Pick',i:'🎧',d:'Hear it, pick the word',c:'linear-gradient(135deg,#0ea5e9,#0369a1)'}};
const LV=['','Beginner','Intermediate','Advanced'],EMO=['🏆','🔥','⚡','🚀','🦁','🐯','🐲','🦄','🐼','🎧','👑','⚽','🌟','🎯','📚','🍕'];
let run=0,tms=[];
function stop(){run++;tms.forEach(x=>{clearInterval(x);clearTimeout(x)});tms=[]}
function begin(){if(S.stop)try{S.stop()}catch(e){}stop();S.stop=stop;return run}
function every(fn,ms){const r=run;let b=0;const id=setInterval(async()=>{if(r!==run||document.hidden||b)return;b=1;try{await fn()}catch(e){}finally{b=0}},ms);tms.push(id)}
function after(fn,ms){const r=run;const id=setTimeout(()=>{if(r===run)fn()},ms);tms.push(id)}
const first=n=>String(n||'').split(' ')[0];
const gAva=(g,s)=>`<div class="avw" style="--s:${s||48}px"><div class="avi" style="${g&&g.photo?`background-image:url(${E(g.photo)})`:''}">${g&&g.photo?'':E((g&&g.emoji)||'🏆')}</div></div>`;
const left=iso=>{const ms=new Date(iso)-Date.now();if(ms<=0)return 'ended';const h=Math.floor(ms/36e5),m=Math.floor(ms%36e5/6e4);return h?h+'h '+m+'m left':m+'m left'};
const back=(id)=>`<button class="btn sm ghost" id="${id||'bk'}" aria-label="Back">${ICON.back}</button>`;
const pending=ch=>(ch||[]).filter(c=>!c.expired&&['invited','joined','playing'].includes(c.mystatus)).length;

/* ---------- badge on the nav ---------- */
function setBadge(n){S.unread=n;const b=$('.nav button[data-t=chat]');if(!b)return;const o=$('.badge',b);if(o)o.remove();if(n)b.insertAdjacentHTML('beforeend',`<span class="badge">${n}</span>`)}
async function badge(){try{const r=await Promise.all([rpc('my_friends'),rpc('my_challenges')]);const n=(r[0]||[]).reduce((a,f)=>a+(f.unread||0)+(!f.accepted&&f.incoming?1:0),0)+pending(r[1]);if(n!==S.unread)setBadge(n)}catch(e){}}

/* ---------- Friends tab ---------- */
function show(tab){
  if(tab)S.ftab=tab;
  if(!$('#chrome .nav')){S.tab='chat';return render()}
  begin();const t=S.ftab||'chats';
  wrap(`<h2>Friends</h2><div class="mut sm" style="margin:2px 0 10px">Chat, make groups and challenge your friends</div>
  <div class="row" style="margin:6px 0 10px"><input id="fs" class="inp" placeholder="Find a friend by ID (like EX013) or name" autocomplete="off"><button id="fb" class="btn sm">Find</button></div><div id="fr"></div>
  <div class="chiprow" id="ft">${[['chats','💬 Chats'],['groups','👥 Groups'],['chal','⚔️ Challenges']].map(x=>`<button class="${t===x[0]?'on':''}" data-t="${x[0]}">${x[1]}<span class="chbadge" id="cb_${x[0]}"></span></button>`).join('')}</div><div id="fl">${skel(3)}</div>`);
  const find=async()=>{const q=$('#fs').value.trim();if(!q)return;const fb=$('#fb');fb.disabled=true;try{const r=await rpc('find_student',{p_q:q})||[];
    $('#fr').innerHTML='<div class="card" style="margin-bottom:10px">'+(r.length?r.map(p=>`<div class="row" data-u="${E(p.student_id)}" style="margin:8px 0;cursor:pointer">${ava(p,42)}<div class="grow"><b>${E(p.name)}</b><div class="mut sm">${E(p.student_id)}</div></div><span class="chip">View ›</span></div>`).join(''):`<span class="mut">No one found for “${E(q)}”. Check the ID and try again.</span>`)+'</div>';
    $$('#fr [data-u]').forEach(x=>x.onclick=()=>profile(x.dataset.u))}catch(e){toast(e.message)}finally{fb.disabled=false}};
  $('#fb').onclick=find;$('#fs').onkeydown=e=>{if(e.key==='Enter')find()};
  $$('#ft button').forEach(b=>b.onclick=()=>show(b.dataset.t));
  ({chats:chatsTab,groups:groupsTab,chal:chalTab})[t]().catch(e=>{const el=$('#fl');if(el)el.innerHTML=`<div class="card c"><div class="mut">${E(e.message||'Could not load')}</div><button class="btn sm" id="rt" style="margin-top:10px">Retry</button></div>`;const b=$('#rt');if(b)b.onclick=()=>show()});
  badge();
}
async function chatsTab(){
  const fr=await rpc('my_friends')||[],acc=fr.filter(f=>f.accepted).sort((a,b)=>(b.last_at||'').localeCompare(a.last_at||'')),inc=fr.filter(f=>!f.accepted&&f.incoming),out=fr.filter(f=>!f.accepted&&!f.incoming);
  const el=$('#fl');if(!el)return;let h='';
  const n=inc.length+acc.reduce((a,f)=>a+(f.unread||0),0);const cb=$('#cb_chats');if(cb)cb.textContent=n||'';
  if(inc.length)h+=`<div class="sec"><h3>Friend requests</h3></div>`+inc.map(f=>`<div class="card row" style="margin:8px 0;padding:12px"><span data-u="${E(f.student_id)}" style="cursor:pointer">${ava(f,44)}</span><div class="grow"><b>${E(f.name)}</b><div class="mut sm">wants to be friends</div></div><button class="btn sm" data-ok="${E(f.student_id)}">Accept</button><button class="btn sm ghost" data-no="${E(f.student_id)}" aria-label="Decline">${ICON.x}</button></div>`).join('');
  h+=`<div class="sec"><h3>Friends</h3><span class="mut sm">${acc.length}</span></div>`+(acc.map(f=>`<div class="card row stag" style="margin:8px 0;padding:12px;cursor:pointer" data-f="${E(f.student_id)}" data-n="${E(f.name)}"><span data-p="${E(f.student_id)}">${ava(f,48)}</span><div class="grow"><b>${E(f.name)}</b><div class="mut sm" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${f.last_body?E(f.last_body):(f.status?E(f.status):'Say hi 👋')}</div></div>${f.unread?`<span class="unread">${f.unread}</span>`:''}<button class="btn sm ghost" data-c="${E(f.student_id)}" data-n="${E(f.name)}" aria-label="Challenge ${E(f.name)}">⚔️</button></div>`).join('')||'<div class="card c mut"><div style="font-size:38px">🤝</div>Type a friend’s ID above (like EX013), open their profile and tap Add friend</div>');
  if(out.length)h+=`<div class="sec"><h3>Sent requests</h3></div>`+out.map(f=>`<div class="card row" style="margin:6px 0;padding:12px;opacity:.75">${ava(f,38)}<b class="grow">${E(f.name)}</b><span class="chip">pending</span></div>`).join('');
  el.innerHTML=h;
  $$('#fl [data-ok]').forEach(b=>b.onclick=async e=>{e.stopPropagation();b.disabled=true;try{await rpc('friend_respond',{p_id:b.dataset.ok,p_ok:true});confetti(30);snd(700);show('chats')}catch(x){b.disabled=false;toast(x.message)}});
  $$('#fl [data-no]').forEach(b=>b.onclick=async e=>{e.stopPropagation();b.disabled=true;try{await rpc('friend_respond',{p_id:b.dataset.no,p_ok:false});show('chats')}catch(x){b.disabled=false;toast(x.message)}});
  $$('#fl [data-u]').forEach(x=>x.onclick=()=>profile(x.dataset.u));
  $$('#fl [data-c]').forEach(b=>b.onclick=e=>{e.stopPropagation();newChallenge({friend:b.dataset.c,name:b.dataset.n})});
  $$('#fl [data-f]').forEach(c=>c.onclick=ev=>{if(ev.target.closest('[data-c]'))return;const pr=ev.target.closest('[data-p]');if(pr){profile(pr.dataset.p);return}convo(c.dataset.f,c.dataset.n)});
}

/* ---------- profile popup ---------- */
async function profile(id){
  const sh=sheet('<div class="c" style="padding:26px 0">'+skel(2)+'</div>');let p;
  try{p=await rpc('student_profile',{p_id:id})}catch(e){sh.close();return toast(e.message)}
  const L=lvl(p.xp||0),ex=p.interests||[];
  const btns=r=>r==='self'?'<div class="chip v" style="justify-content:center">This is you</div>':r==='friends'?`<div class="grid2"><button class="btn" id="pf_m">💬 Message</button><button class="btn gold" id="pf_c">⚔️ Challenge</button></div><button class="btn ghost full" id="pf_g" style="margin-top:8px">👥 Add to a group</button>`:r==='pending_out'?'<button class="btn full" disabled>Request sent ✓</button>':r==='pending_in'?`<div class="grid2"><button class="btn" id="pf_ok">Accept</button><button class="btn ghost" id="pf_no">Decline</button></div>`:'<button class="btn full" id="pf_a">➕ Add friend</button>';
  sh.innerHTML='<div class="grab"></div>'+`<div class="card hero" style="padding:0;overflow:hidden"><div class="cover" style="height:96px;${p.cover?`background-image:url(${E(p.cover)})`:`background:linear-gradient(135deg,${E(p.accent||'#8b5cf6')},#0d7f73)`};background-size:cover;background-position:center"></div><div style="padding:0 16px 16px"><div style="margin-top:-40px">${ava(p,84)}</div><h2 style="margin:8px 0 2px;font-size:23px">${E(p.name)}</h2><div class="row wrap"><span class="title-chip">🏷️ ${E(p.title||'Newcomer')}</span><span class="chip">${E(p.student_id)}</span></div>${p.status?`<p style="margin:10px 0 0"><b>💭 ${E(p.status)}</b></p>`:''}${p.bio?`<p style="margin:8px 0 0">${E(p.bio)}</p>`:''}${ex.length?`<div class="row wrap" style="margin-top:10px">${ex.map(i=>`<span class="chip v">${E(i)}</span>`).join('')}</div>`:''}${p.fav_word?`<div class="row" style="margin-top:10px"><span class="mut sm">Favourite word</span><b>${E(p.fav_word)}</b><button class="btn sm ghost" id="pf_s" aria-label="Hear it">🔊</button></div>`:''}</div></div>
  <div class="stats s4" style="margin:12px 0">${p.xp==null?'<div class="stat" style="grid-column:1/-1"><span>🔒 This student keeps their stats private</span></div>':`<div class="stat"><b>${L.l}</b><span>Level</span></div><div class="stat"><b>${(p.xp||0).toLocaleString()}</b><span>XP</span></div><div class="stat"><b>${p.streak||0}</b><span>Streak</span></div><div class="stat"><b>${p.played||0}</b><span>Duels</span></div>`}</div><div id="pf_b">${btns(p.rel)}</div>`;
  const $$s=s=>$(s,sh);const on=(s,f)=>{const e=$$s(s);if(e)e.onclick=f};
  on('#pf_s',()=>Games.say(p.fav_word));
  on('#pf_a',async function(){this.disabled=true;try{const r=await rpc('friend_request',{p_id:p.student_id});snd(600);if(r==='friends'){confetti(30);toast('You are now friends 🎉');sh.close();profile(p.student_id)}else{toast('Friend request sent 🤝');$('#pf_b',sh).innerHTML=btns('pending_out')}}catch(e){this.disabled=false;toast(e.message)}});
  on('#pf_ok',async()=>{try{await rpc('friend_respond',{p_id:p.student_id,p_ok:true});confetti(30);sh.close();profile(p.student_id)}catch(e){toast(e.message)}});
  on('#pf_no',async()=>{try{await rpc('friend_respond',{p_id:p.student_id,p_ok:false});sh.close();if(S.tab==='chat')show()}catch(e){toast(e.message)}});
  on('#pf_m',()=>{sh.close();convo(p.student_id,p.name)});
  on('#pf_c',()=>{sh.close();newChallenge({friend:p.student_id,name:p.name})});
  on('#pf_g',async()=>{try{const gs=(await rpc('my_groups')||[]).filter(g=>g.owner===S.me.student_id);if(!gs.length){toast('Create a group first, then add friends to it');return}
    $('#pf_b',sh).innerHTML='<div class="mut sm" style="margin-bottom:6px">Pick a group (you own these)</div>'+gs.map(g=>`<div class="card row" data-g="${g.id}" style="margin:6px 0;padding:10px;cursor:pointer">${gAva(g,38)}<b class="grow">${E(g.name)}</b><span class="mut sm">${g.members} 👤</span></div>`).join('');
    $$('#pf_b [data-g]',sh).forEach(x=>x.onclick=async()=>{try{await rpc('grp_add',{p_id:x.dataset.g,p_members:[p.student_id]});toast(first(p.name)+' added to the group ✅');sh.close()}catch(e){toast(e.message)}})}catch(e){toast(e.message)}});
}

/* ---------- groups ---------- */
async function groupsTab(){
  const g=await rpc('my_groups')||[],el=$('#fl');if(!el)return;
  el.innerHTML=`<button class="btn full" id="gn">＋ Create a group</button>`+(g.length?g.map(x=>`<div class="card row stag" data-g="${x.id}" style="margin:8px 0;padding:12px;cursor:pointer">${gAva(x,50)}<div class="grow" style="min-width:0"><b>${E(x.name)}</b><div class="mut sm" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${x.last_body?E((x.last_name?first(x.last_name)+': ':'')+x.last_body):'No messages yet'}</div></div><span class="chip">${x.members} 👤</span></div>`).join(''):`<div class="card c mut" style="margin-top:12px"><div style="font-size:38px">👥</div>Make a group with your friends, chat together and battle each other in games.</div>`);
  $('#gn').onclick=()=>groupForm();$$('#fl [data-g]').forEach(c=>c.onclick=()=>groupView(c.dataset.g));
}
async function groupForm(g){
  const edit=!!g;let photo=g?g.photo:null,emoji=g?g.emoji:'🏆',fr=[];
  if(!edit)try{fr=(await rpc('my_friends')||[]).filter(f=>f.accepted)}catch(e){return toast(e.message)}
  const sh=sheet(`<h2>${edit?'Edit group':'New group'}</h2><div class="c" style="margin:12px 0"><div id="gp" style="display:inline-block;cursor:pointer"></div><div class="mut sm">Tap to choose a photo</div></div><input id="gname" class="inp" maxlength="30" placeholder="Group name" value="${E(g?g.name:'')}"><span class="lbl">…or pick an emoji</span><div class="row wrap" id="ge">${EMO.map(e=>`<button class="pick ${e===emoji?'on':''}" data-e="${e}" style="font-size:22px">${e}</button>`).join('')}</div>${edit?'':`<span class="lbl">Add friends (${fr.length})</span><div id="gf" style="max-height:28vh;overflow:auto">${fr.length?fr.map(f=>`<label class="card row" style="margin:6px 0;padding:10px"><input type="checkbox" value="${E(f.student_id)}" style="width:20px;height:20px"> ${ava(f,34)}<b class="grow">${E(f.name)}</b></label>`).join(''):'<div class="mut sm">You have no friends yet. Add some first, then invite them.</div>'}</div>`}<button class="btn full" id="gsv" style="margin-top:14px">${edit?'Save changes':'Create group'}</button><input type="file" accept="image/*" id="gpf" hidden>`);
  const paint=()=>{$('#gp',sh).innerHTML=gAva({photo,emoji},84)};paint();
  $('#gp',sh).onclick=()=>$('#gpf',sh).click();
  $('#gpf',sh).onchange=async function(){const f=this.files[0];if(!f)return;const u=await upImg(f,'grp',500);if(u){photo=u;paint()}};
  $$('#ge [data-e]',sh).forEach(b=>b.onclick=()=>{emoji=b.dataset.e;photo=null;$$('#ge .pick',sh).forEach(x=>x.classList.toggle('on',x===b));paint()});
  $('#gsv',sh).onclick=async function(){const name=$('#gname',sh).value.trim();if(!name)return toast('Give your group a name');this.disabled=true;
    try{if(edit){await rpc('grp_update',{p_id:g.id,p_name:name,p_emoji:emoji,p_photo:photo});toast('Saved ✅');sh.close();groupView(g.id)}else{const ids=$$('#gf input:checked',sh).map(x=>x.value);const id=await rpc('grp_create',{p_name:name,p_emoji:emoji,p_photo:photo,p_members:ids});confetti(40);snd(740);sh.close();S.ftab='groups';groupView(id)}}catch(e){this.disabled=false;toast(e.message)}};
}
async function groupView(id){
  const r0=begin();S.ftab='groups';$('#chrome').innerHTML='';
  const me=S.me.student_id;let info=null,last=0,sending=false,lastFrom='';
  wrap(`<div class="row" style="margin-bottom:8px">${back()}<div class="row grow" id="gh" style="cursor:pointer;min-width:0"><span id="ga"></span><div class="grow" style="min-width:0"><b id="gt" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"> </b><span class="mut sm" id="gm"> </span></div></div><button class="btn sm gold" id="gc" aria-label="Challenge the group">⚔️ Battle</button></div><div id="ms" style="min-height:50vh;padding-bottom:150px"></div>
  <div style="position:fixed;left:0;right:0;bottom:calc(max(12px,env(safe-area-inset-bottom)) + 4px);padding:0 12px;z-index:30;max-width:520px;margin:0 auto"><div class="row" style="overflow:auto;padding:0 4px 8px">${['👍','😂','❤️','🔥','👏','🎉','😮','🙏'].map(e=>`<button class="btn sm ghost" data-e="${e}" style="font-size:20px;padding:4px 12px">${e}</button>`).join('')}</div><div class="card row" style="padding:8px"><button class="btn sm ghost" id="gpic" aria-label="Send a photo">🖼️</button><button class="btn sm ghost" id="ggif">GIF</button><input id="gi" maxlength="1000" class="inp" placeholder="Message the group…"><button class="btn sm" id="gsn" aria-label="Send">${ICON.send||'➤'}</button></div></div><input type="file" accept="image/*" id="gpf" hidden>`);
  $('#bk').onclick=()=>{begin();S.stop=null;show('groups')};
  const hdr=()=>{if(!info)return;$('#ga').innerHTML=gAva(info,44);$('#gt').textContent=info.name;$('#gm').textContent=info.members.length+' members · tap for info'};
  $('#gh').onclick=()=>info&&groupInfo(info,()=>groupView(id));
  $('#gc').onclick=()=>info&&newChallenge({grp:id,name:info.name,count:info.members.length});
  let day='';
  const add=m=>{if(m.id<=last)return;last=m.id;const box=$('#ms');if(!box)return;const near=window.innerHeight+window.scrollY>=document.body.scrollHeight-160;const dt=new Date(m.created_at||Date.now()),dk=localDay(dt);if(dk!==day){day=dk;lastFrom='';const s=document.createElement('div');s.className='dsep';s.textContent=dk===localDay()?'TODAY':dt.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'}).toUpperCase();box.appendChild(s)}
    const mine=m.from_id===me,d=document.createElement('div');d.className='msg '+(mine?'me':'th')+(!m.media_url&&isEmo(m.body)?' big':'');
    d.innerHTML=(!mine&&lastFrom!==m.from_id?`<span class="nm" data-u="${E(m.from_id)}">${E(first(m.name)||m.from_id)}</span>`:'')+(m.media_url?`<img src="${E(m.media_url)}" alt="">`:'')+(m.body?E(m.body):'')+`<span class="tm">${dt.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span>`;lastFrom=m.from_id;
    const u=$('[data-u]',d);if(u)u.onclick=()=>profile(u.dataset.u);box.appendChild(d);if(near||mine)window.scrollTo(0,document.body.scrollHeight)};
  try{[info]=await Promise.all([rpc('grp_info',{p_id:id})]);hdr();const ms=await rpc('grp_msgs',{p_id:id,p_after:0})||[];ms.forEach(add);window.scrollTo(0,document.body.scrollHeight)}catch(e){if(r0===run){toast(e.message);show('groups')}return}
  if(r0!==run)return;
  every(async()=>{try{const ms=await rpc('grp_msgs',{p_id:id,p_after:last})||[];ms.forEach(add)}catch(e){if(/not in this group/i.test(e.message)){toast('You are no longer in this group');begin();S.stop=null;show('groups')}}},3000);
  every(async()=>{try{info=await rpc('grp_info',{p_id:id});hdr()}catch(e){}},20000);
  async function send(o,backTxt){if(sending)return;sending=true;try{const r=await rpc('grp_send',Object.assign({p_id:id,p_body:'',p_kind:'text',p_media:null},o));add(Object.assign({name:S.me.nickname||S.me.name},r));snd(520,.1)}catch(e){if(backTxt!=null)$('#gi').value=backTxt;toast(e.message)}finally{sending=false}}
  $('#gsn').onclick=()=>{const v=$('#gi').value.trim();if(!v)return;$('#gi').value='';send({p_body:v},v)};$('#gi').onkeydown=e=>{if(e.key==='Enter')$('#gsn').click()};
  $$('[data-e]').forEach(b=>b.onclick=()=>send({p_body:b.dataset.e}));
  $('#gpic').onclick=()=>$('#gpf').click();$('#gpf').onchange=async function(){const f=this.files[0];this.value='';if(!f)return;const u=await upImg(f,'chat');if(u)send({p_kind:'image',p_media:u})};
  $('#ggif').onclick=()=>{const q=$('#gi').value.trim();if(!/^https:\/\/[^\s]+\.(gif|webp)(\?\S*)?$/i.test(q)){toast('Paste a GIF link in the box, then tap GIF');return}$('#gi').value='';send({p_kind:'gif',p_media:q})};
}
function groupInfo(info,reload){
  const me=S.me.student_id,own=info.owner===me,bd=info.board||[],nm={};info.members.forEach(m=>nm[m.student_id]=m);
  const sh=sheet(`<div class="c" style="margin:6px 0 12px">${gAva(info,84)}<h2 style="margin:8px 0 2px">${E(info.name)}</h2><div class="mut sm">${info.members.length} members</div></div>
  <div class="sec" style="margin-top:6px"><h3>🏅 Group leaderboard</h3></div>${bd.length?bd.map((b,i)=>{const m=nm[b.student_id]||{name:b.student_id};return `<div class="card row" style="margin:6px 0;padding:10px"><b class="rk" style="width:28px;text-align:center">${['🥇','🥈','🥉'][i]||i+1}</b>${ava(m,34)}<div class="grow"><b>${E(first(m.name))}</b><div class="mut sm">${b.played} played · ${b.wins} wins</div></div><b>${b.pts} pts</b></div>`}).join(''):'<div class="card c mut">No battles yet. Tap ⚔️ Battle to start one!</div>'}
  <div class="sec"><h3>Members</h3>${own?'<a href="#" id="gi_add">+ Add friends</a>':''}</div>${info.members.map(m=>`<div class="card row" data-u="${E(m.student_id)}" style="margin:6px 0;padding:10px;cursor:pointer">${ava(m,38)}<div class="grow"><b>${E(m.name)}</b><div class="mut sm">${E(m.student_id)}</div></div>${m.role==='owner'?'<span class="chip a">Owner</span>':''}${own&&m.student_id!==me?`<button class="btn sm ghost" data-k="${E(m.student_id)}" aria-label="Remove ${E(m.name)}">${ICON.x}</button>`:''}</div>`).join('')}
  <div style="margin-top:14px;display:grid;gap:8px">${own?'<button class="btn ghost" id="gi_ed">✏️ Edit name and photo</button>':''}<button class="btn ghost" id="gi_lv">🚪 Leave group</button>${own?'<button class="btn red" id="gi_dl">🗑️ Delete group</button>':''}</div>`);
  const done=()=>{sh.close();reload()};
  $$('[data-u]',sh).forEach(x=>x.onclick=e=>{if(e.target.closest('[data-k]'))return;sh.close();profile(x.dataset.u)});
  $$('[data-k]',sh).forEach(b=>b.onclick=async e=>{e.stopPropagation();if(!confirm('Remove this member from the group?'))return;try{await rpc('grp_kick',{p_id:info.id,p_member:b.dataset.k});toast('Removed');done()}catch(x){toast(x.message)}});
  const ed=$('#gi_ed',sh);if(ed)ed.onclick=()=>{sh.close();groupForm(info)};
  const ad=$('#gi_add',sh);if(ad)ad.onclick=async e=>{e.preventDefault();try{const fr=(await rpc('my_friends')||[]).filter(f=>f.accepted&&!nm[f.student_id]);if(!fr.length)return toast('All your friends are already in this group');
    sh.close();const s2=sheet(`<h2>Add friends</h2><div style="max-height:45vh;overflow:auto">${fr.map(f=>`<label class="card row" style="margin:6px 0;padding:10px"><input type="checkbox" value="${E(f.student_id)}" style="width:20px;height:20px"> ${ava(f,34)}<b class="grow">${E(f.name)}</b></label>`).join('')}</div><button class="btn full" id="ga_ok" style="margin-top:12px">Add to group</button>`);
    $('#ga_ok',s2).onclick=async function(){const ids=$$('input:checked',s2).map(x=>x.value);if(!ids.length)return toast('Tick at least one friend');this.disabled=true;try{await rpc('grp_add',{p_id:info.id,p_members:ids});toast('Added ✅');s2.close();reload()}catch(x){this.disabled=false;toast(x.message)}}}catch(x){toast(x.message)}};
  $('#gi_lv',sh).onclick=async()=>{if(!confirm('Leave this group?'))return;try{await rpc('grp_leave',{p_id:info.id});sh.close();begin();S.stop=null;show('groups')}catch(e){toast(e.message)}};
  const dl=$('#gi_dl',sh);if(dl)dl.onclick=async()=>{if(!confirm('Delete this group for everyone? Its chat and scores will be lost.'))return;try{await rpc('grp_delete',{p_id:info.id});sh.close();begin();S.stop=null;show('groups')}catch(e){toast(e.message)}};
}

/* ---------- challenges ---------- */
async function chalTab(){
  const ch=await rpc('my_challenges')||[],el=$('#fl');if(!el)return;const p=pending(ch);const cb=$('#cb_chal');if(cb)cb.textContent=p||'';
  const row=c=>{const g=GM[c.game]||GM.words,mine=!c.expired&&['invited','joined','playing'].includes(c.mystatus),done=c.mystatus==='done';
    const title=c.grp_id?`${E(c.gemoji||'🏆')} ${E(c.gname||'Group')}`:`vs ${E(first(c.opp||c.cname||'friend'))}`;
    const chip=mine?'<span class="chip a">Your turn</span>':done?`<span class="chip g">${c.myscore||0} pts</span>`:'<span class="chip">Ended</span>';
    return `<div class="card row stag" data-c="${c.id}" style="margin:8px 0;padding:12px;cursor:pointer"><span style="font-size:30px">${g.i}</span><div class="grow" style="min-width:0"><b>${title}</b><div class="mut sm">${g.n} · ${LV[c.lvl]||''} · ${c.nd}/${c.np} finished${c.expired?'':' · '+left(c.ends_at)}</div></div>${chip}</div>`};
  const yours=ch.filter(c=>!c.expired&&['invited','joined','playing'].includes(c.mystatus)),rest=ch.filter(c=>!yours.includes(c));
  el.innerHTML=`<div class="grid2" style="margin-bottom:6px"><button class="btn" id="cn1">⚔️ Duel a friend</button><button class="btn ghost" id="cn2">👥 Battle a group</button></div>`+(yours.length?`<div class="sec"><h3>Your turn</h3></div>`+yours.map(row).join(''):'')+(rest.length?`<div class="sec"><h3>Recent</h3></div>`+rest.map(row).join(''):'')+(ch.length?'':`<div class="card c mut" style="margin-top:12px"><div style="font-size:38px">⚔️</div>No challenges yet. Duel a friend, or open a group and tap ⚔️ Battle.</div>`);
  $('#cn1').onclick=pickFriend;$('#cn2').onclick=pickGroup;$$('#fl [data-c]').forEach(c=>c.onclick=()=>lobby(c.dataset.c));
}
async function pickFriend(){
  let fr;try{fr=(await rpc('my_friends')||[]).filter(f=>f.accepted)}catch(e){return toast(e.message)}
  if(!fr.length)return toast('Add a friend first: search their ID above, then tap Add friend');
  const sh=sheet(`<h2>Who do you want to challenge?</h2><div style="max-height:55vh;overflow:auto">${fr.map(f=>`<div class="card row" data-f="${E(f.student_id)}" data-n="${E(f.name)}" style="margin:8px 0;padding:12px;cursor:pointer">${ava(f,42)}<b class="grow">${E(f.name)}</b><span class="chip">⚔️ Pick</span></div>`).join('')}</div>`);
  $$('[data-f]',sh).forEach(x=>x.onclick=()=>{sh.close();newChallenge({friend:x.dataset.f,name:x.dataset.n})});
}
async function pickGroup(){
  let gs;try{gs=await rpc('my_groups')||[]}catch(e){return toast(e.message)}
  if(!gs.length)return toast('Create a group first (Groups tab)');
  const sh=sheet(`<h2>Which group?</h2><div style="max-height:55vh;overflow:auto">${gs.map(g=>`<div class="card row" data-g="${g.id}" data-n="${E(g.name)}" data-m="${g.members}" style="margin:8px 0;padding:12px;cursor:pointer">${gAva(g,42)}<b class="grow">${E(g.name)}</b><span class="mut sm">${g.members} 👤</span></div>`).join('')}</div>`);
  $$('[data-g]',sh).forEach(x=>x.onclick=()=>{sh.close();newChallenge({grp:x.dataset.g,name:x.dataset.n,count:+x.dataset.m})});
}
function newChallenge(o){
  let game='words',lv=1;
  const sh=sheet(`<h2>⚔️ ${o.grp?'Group battle':'Duel'}</h2><div class="mut sm" style="margin-bottom:8px">${o.grp?`Everyone in <b>${E(o.name)}</b> plays the same 10 questions. Faster answers score more.`:`You and <b>${E(o.name)}</b> play the same 10 questions. Faster answers score more.`}</div><span class="lbl">Pick a game</span>${Object.keys(GM).map(k=>`<div class="card row gpick" data-g="${k}" style="margin:6px 0;padding:12px;cursor:pointer;border:2px solid ${k===game?'var(--teal2)':'transparent'}"><span style="font-size:30px">${GM[k].i}</span><div class="grow"><b>${GM[k].n}</b><div class="mut sm">${GM[k].d}</div></div></div>`).join('')}<span class="lbl">Difficulty</span><div class="grid3" id="lv">${[1,2,3].map(n=>`<button class="pick ${n===1?'on':''}" data-l="${n}" style="text-align:center;padding:12px 4px">${LV[n]}</button>`).join('')}</div><div class="mut sm" style="margin-top:6px">Beginner is great for younger students. Advanced is for strong speakers.</div><button class="btn full" id="nc_go" style="margin-top:14px">Send challenge ⚔️</button>`);
  $$('.gpick',sh).forEach(x=>x.onclick=()=>{game=x.dataset.g;$$('.gpick',sh).forEach(y=>y.style.borderColor=y===x?'var(--teal2)':'transparent')});
  $$('#lv .pick',sh).forEach(x=>x.onclick=()=>{lv=+x.dataset.l;$$('#lv .pick',sh).forEach(y=>y.classList.toggle('on',y===x))});
  $('#nc_go',sh).onclick=async function(){this.disabled=true;try{const id=await rpc('chal_create',{p_game:game,p_lvl:lv,p_grp:o.grp||null,p_players:o.friend?[o.friend]:null});snd(740);confetti(25);sh.close();lobby(id)}catch(e){this.disabled=false;toast(e.message)}};
}
async function lobby(id){
  const r0=begin();S.ftab='chal';
  wrap(`<div class="row" style="margin-bottom:10px">${back()}<h3 class="grow">Challenge</h3></div><div id="lb">${skel(3)}</div>`);
  $('#bk').onclick=()=>{begin();S.stop=null;show('chal')};
  let c;try{c=await rpc('chal_get',{p_id:id})}catch(e){if(r0===run){toast(e.message);show('chal')}return}
  if(r0!==run)return;
  const draw=c=>{const el=$('#lb');if(!el)return;const g=GM[c.game]||GM.words,me=S.me.student_id,pl=c.players||[],allDone=pl.length>0&&pl.every(p=>p.status==='done'),over=c.expired||allDone,canPlay=!c.expired&&c.mystatus!=='done'&&c.mystatus!=='declined';
    const top=pl.find(p=>p.status==='done'&&(p.score||0)>0);
    const banner=over&&top?`<div class="card c pop" style="margin:12px 0;background:linear-gradient(135deg,rgba(251,191,36,.28),rgba(244,114,182,.22))"><div style="font-size:44px">🏆</div><b style="font-size:20px">${top.student_id===me?'You won!':E(first(top.name))+' wins!'}</b><div class="mut sm">${top.score} points</div></div>`:'';
    const other=pl.find(p=>p.student_id!==me);
    el.innerHTML=`<div class="chal-hd" style="background:${g.c};border-radius:24px;padding:18px;color:#fff"><div class="row"><span style="font-size:40px">${g.i}</span><div class="grow"><b style="font-family:var(--disp);font-size:20px">${g.n}</b><div style="opacity:.9;font-size:13px">${LV[c.lvl]} · ${c.n} questions · ${c.expired?'ended':left(c.ends_at)}</div></div></div></div>${banner}
    <div class="sec"><h3>Scoreboard</h3><span class="mut sm">${pl.filter(p=>p.status==='done').length}/${pl.length} finished</span></div>
    ${pl.map((p,i)=>{const dn=p.status==='done';return `<div class="card row" data-u="${E(p.student_id)}" style="margin:6px 0;padding:10px;cursor:pointer;${p.student_id===me?'outline:2px solid var(--teal2)':''}"><b class="rk" style="width:28px;text-align:center">${dn?(['🥇','🥈','🥉'][i]||i+1):'·'}</b>${ava(p,38)}<div class="grow"><b>${E(first(p.name))}${p.student_id===me?' (you)':''}</b><div class="mut sm">${dn?`${p.correct}/${c.n} correct · ${((p.time_ms||0)/1000).toFixed(1)}s`:p.status==='playing'?'⏳ playing now…':'waiting to play'}</div></div>${dn?`<b style="font-size:18px">${p.score}</b>`:''}</div>`}).join('')}
    <div style="margin-top:14px;display:grid;gap:8px">${canPlay?`<button class="btn" id="lb_p" style="padding:16px;font-size:18px">▶ Play now</button>`:''}${over||c.mystatus==='done'?`<button class="btn ghost" id="lb_r">🔁 Challenge again</button>`:''}${canPlay&&c.mystatus==='invited'&&c.created_by!==me?`<button class="btn ghost" id="lb_d">No thanks</button>`:''}</div>`;
    $$('#lb [data-u]').forEach(x=>x.onclick=()=>profile(x.dataset.u));
    const p=$('#lb_p');if(p)p.onclick=()=>play(id);
    const r=$('#lb_r');if(r)r.onclick=()=>newChallenge(c.grp_id?{grp:c.grp_id,name:'your group'}:{friend:other&&other.student_id,name:other?first(other.name):'your friend'});
    const d=$('#lb_d');if(d)d.onclick=async()=>{try{await rpc('chal_decline',{p_id:id});toast('Challenge declined');begin();S.stop=null;show('chal')}catch(e){toast(e.message)}}};
  draw(c);
  every(async()=>{draw(await rpc('chal_get',{p_id:id}))},3500);
}
async function play(id){
  const r=begin();let info;
  try{info=await rpc('chal_start',{p_id:id})}catch(e){toast(e.message);return lobby(id)}
  const qs=Games.duelQs(info.game,info.lvl,info.seed,info.n),N=qs.length,TL=12,g=GM[info.game]||GM.words;let i=0,score=0,ok=0;const t0=Date.now();
  const next=()=>{if(r!==run)return;if(i>=N)return end();const q=qs[i],tq=Date.now();let lock=false;
    wrap(`<div class="row" style="margin-bottom:10px"><button class="btn sm ghost" id="x" aria-label="Quit">${ICON.x}</button><div class="grow"><b style="font-family:var(--disp)">${g.i} ${g.n}</b><div class="mut sm">Question ${i+1} of ${N}</div></div><span class="chip a" id="sc">${score} pts</span></div><div class="bar" style="height:10px"><i id="tb" style="width:100%"></i></div>
    <div class="card c pop" style="margin:14px 0;min-height:130px"><div class="mut sm">${E(q.h)}</div>${info.game==='grammar'?`<h2 style="font-size:23px;margin-top:8px;line-height:1.3">${E(q.p).replace('___','<span style="border-bottom:3px solid var(--teal2);padding:0 18px">&nbsp;</span>')}</h2>`:info.game==='listen'?`<button id="pl" style="font-size:54px;border-radius:50%;width:96px;height:96px;background:var(--grad);margin-top:8px" aria-label="Play the word">🔊</button>`:`<h1 style="font-size:38px;margin:8px 0">${E(q.p)}</h1><button class="btn sm ghost" id="pl">🔊 Listen</button>`}</div>${q.o.map((o,k)=>`<button class="opt" data-k="${k}">${E(o)}</button>`).join('')}`);
    const say=()=>{if(q.say)Games.say(q.say,.9)};const pl=$('#pl');if(pl)pl.onclick=say;if(info.game==='listen')after(say,250);
    $('#x').onclick=()=>{begin();S.stop=null;toast('You can come back and play before it ends');lobby(id)};
    const tick=setInterval(()=>{const lf=TL-(Date.now()-tq)/1000;const b=$('#tb');if(b)b.style.width=Math.max(0,lf/TL*100)+'%';if(lf<=0)ans(-1)},100);tms.push(tick);
    function ans(k){if(lock||r!==run)return;lock=true;clearInterval(tick);const lf=Math.max(0,TL-(Date.now()-tq)/1000),good=k===q.a,pts=good?100+Math.round(lf/TL*100):0;
      $$('.opt').forEach(b=>{b.disabled=true;if(+b.dataset.k===q.a)b.classList.add('ok');if(+b.dataset.k===k&&!good)b.classList.add('no','shake')});
      if(good){ok++;score+=pts;snd(700+ok*25);buzz(15)}else{snd(220,.3);buzz([40,30,40])}
      const sc=$('#sc');if(sc)sc.textContent=score+' pts'+(good?'  +'+pts:'');i++;after(next,1000)}
    $$('.opt').forEach(b=>b.onclick=()=>ans(+b.dataset.k))};
  async function end(){wrap(`<div class="c" style="padding-top:12vh"><div style="font-size:60px" class="floaty">⏳</div><h2>Sending your score…</h2></div>`);
    const go=async()=>{try{const c=await rpc('chal_submit',{p_id:id,p_correct:ok,p_score:score,p_time_ms:Date.now()-t0});try{await refreshMe()}catch(e){}if(r!==run)return;result(c)}catch(e){if(r!==run)return;wrap(`<div class="c" style="padding-top:10vh"><div style="font-size:50px">📡</div><h2>Couldn’t send your score</h2><p class="mut">${E(e.message||'Check your connection')}</p><button class="btn" id="rt">Try again</button></div>`);$('#rt').onclick=go}};go()}
  function result(c){const pl=c.players||[],rank=pl.findIndex(p=>p.student_id===S.me.student_id)+1,done=pl.filter(p=>p.status==='done').length;const win=rank===1&&done>1;if(win)confetti(80);else confetti(25);snd(win?780:560,.4);buzz([30,50,30]);
    wrap(`<div class="c stag" style="padding-top:7vh"><div class="pop" style="font-size:80px">${win?'🏆':ok>=7?'🎉':'💪'}</div><h1>${score} points</h1><div class="mut" style="margin:4px 0 14px">${ok} of ${N} correct</div><div class="card pop" style="display:inline-block"><b style="font-size:22px;font-family:var(--disp)">${done>1?'You are #'+rank+' so far':'You are first to finish'}</b><div class="mut sm">${done}/${pl.length} players finished</div></div><div style="margin-top:18px;display:grid;gap:8px"><button class="btn" id="rs">See scoreboard</button><button class="btn ghost" id="rh">Back to Friends</button></div></div>`);
    $('#rs').onclick=()=>lobby(id);$('#rh').onclick=()=>{begin();S.stop=null;show('chal')}}
  next();
}

return{show,profile,newChallenge,badge,groupView,lobby};
})();
window.Social=Social;
