/* Excel Student – teacher & principal mode (same app, different screens). Loaded before app.js. */
const SLINK='https://ademabdelli45-oss.github.io/excel-student/';
const T={
  tab:'home',timers:[],
  stop(){T.timers.forEach(clearInterval);T.timers=[]},
  link(id,pin){return SLINK+'?c='+encodeURIComponent(id)+'.'+pin},
  msg(name,id,pin){return `Hi ${String(name||'').split(' ')[0]}! Your Excel account is ready.\nID: ${id}\nPIN: ${pin}\nOpen: ${T.link(id,pin)}`},
  wa(text){window.open('https://wa.me/?text='+encodeURIComponent(text),'_blank')},
  copy(text,ok){try{navigator.clipboard.writeText(text).then(()=>toast(ok||'Copied'),()=>toast('Copy not allowed here'))}catch(e){toast('Copy not allowed here')}},
  needQR(){return new Promise(res=>{if(window.qrcode)return res();const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js';s.onload=res;s.onerror=res;document.head.appendChild(s)})},
  async refresh(){try{const w=await rpc('t_whoami');if(w)S.t=w}catch(e){}},

  render(){
    T.stop();document.documentElement.dataset.bg='aurora';document.documentElement.style.setProperty('--acc','#8b5cf6');$('.bgfx .fx').innerHTML='';
    const tabs=[['home','Home',ICON.home],['classes','Classes',ICON.class],['tools','Tools',ICON.chat],['me','Me',ICON.me]];
    const tb=t=>`<button data-t="${t[0]}" class="${T.tab===t[0]?'on':''}">${t[2]}<span>${t[1]}</span></button>`;
    $('#chrome').innerHTML=`<div class="nav">${tb(tabs[0])}${tb(tabs[1])}<button class="sc" id="fab" aria-label="Class QR"><i>${ICON.scan}</i><span>QR</span></button>${tb(tabs[2])}${tb(tabs[3])}</div>`;
    $$('.nav button[data-t]').forEach(b=>b.onclick=()=>{buzz(8);T.tab=b.dataset.t;T.render()});
    $('#fab').onclick=()=>{buzz(12);T.qr()};
    ({home:T.home,classes:T.classes,tools:T.tools,me:T.me})[T.tab]();
  },

  /* ---------- home ---------- */
  home(){
    const t=S.t,cs=t.classes||[],dow=new Date().getDay();
    const today=cs.filter(c=>c.days&&c.days.length&&c.days.map(x=>x%7).includes(dow));
    const list=(today.length?today:cs.slice(0,6));
    const stu=cs.reduce((a,c)=>a+(c.n||0),0);
    wrap(`<div class="card glow" style="background:linear-gradient(135deg,rgba(76,183,165,.25),rgba(139,92,246,.25));margin-bottom:12px"><div class="mut sm">${greet()}</div><h1 style="font-size:26px;margin:2px 0">${E(t.name)}</h1><div class="row wrap" style="margin-top:6px"><span class="chip ${t.role==='admin'?'v':'g'}">${t.role==='admin'?'Principal':'Teacher'}</span><span class="chip">ID ${E(t.id)}</span></div></div>
    <div class="stats" style="margin-bottom:14px"><div class="stat"><b>${cs.length}</b><span>Classes</span></div><div class="stat"><b>${stu}</b><span>Students</span></div><div class="stat"><b>${DN[dow]}</b><span>Today</span></div></div>
    <div class="row" style="margin-bottom:14px"><button class="btn grow" id="h_att">Take attendance</button><button class="btn ghost grow" id="h_qr">Open class QR</button></div>
    <h3 style="margin:6px 2px 8px">${today.length?'Today’s classes':'Your classes'}</h3>`+
    (list.map(c=>`<div class="card row" data-c="${E(c.id)}" style="margin:8px 0;cursor:pointer"><div class="grow"><b>${E(c.name)}</b><div class="mut sm">${c.n||0} students${c.start?' · '+E(String(c.start).slice(0,5)):''}${t.role==='admin'&&c.teacher?' · '+E(c.teacher):''}</div></div><span class="chip">Open</span></div>`).join('')||'<div class="card c">No classes assigned to you yet.</div>'));
    $$('[data-c]').forEach(b=>b.onclick=()=>T.classPage(b.dataset.c,'reg'));
    $('#h_att').onclick=()=>{T.tab='classes';T.render()};$('#h_qr').onclick=T.qr;
  },

  /* ---------- classes ---------- */
  classes(){
    const cs=S.t.classes||[];
    wrap(`<h2 style="margin:6px 2px 10px">${S.t.role==='admin'?'All classes':'My classes'}</h2><input id="cq" class="inp" placeholder="Search class" style="margin-bottom:10px"><div id="cl"></div>`);
    const draw=()=>{const q=$('#cq').value.toLowerCase();$('#cl').innerHTML=cs.filter(c=>!q||(c.name+' '+(c.teacher||'')).toLowerCase().includes(q)).map(c=>`<div class="card row" data-c="${E(c.id)}" style="margin:8px 0;cursor:pointer"><div class="grow"><b>${E(c.name)}</b><div class="mut sm">${c.n||0} students${S.t.role==='admin'&&c.teacher?' · Teacher '+E(c.teacher):''}</div></div><span class="chip">${c.n||0}</span></div>`).join('')||'<div class="card c">No classes found.</div>';$$('[data-c]').forEach(b=>b.onclick=()=>T.classPage(b.dataset.c,'reg'))};
    $('#cq').oninput=draw;draw();
  },

  async classPage(id,sub){
    T.stop();const c=(S.t.classes||[]).find(x=>x.id===id)||{id,name:'Class'};T.cur=id;T.sub=sub||'reg';
    wrap(`<div class="row" style="margin:6px 0 10px"><button class="btn sm ghost" id="bk" aria-label="Back">${ICON.back}</button><div class="grow"><h2 style="font-size:20px">${E(c.name)}</h2><div class="mut sm">${S.t.role==='admin'&&c.teacher?'Teacher '+E(c.teacher)+' · ':''}${c.n||0} students</div></div></div>
    <div class="row" style="background:var(--card);border:1px solid var(--line);border-radius:18px;padding:5px;margin-bottom:12px"><button class="btn sm grow ${T.sub==='reg'?'':'ghost'}" id="s_reg" style="${T.sub==='reg'?'':'background:none;border:0'}">Register</button><button class="btn sm grow ${T.sub==='stu'?'':'ghost'}" id="s_stu" style="${T.sub==='stu'?'':'background:none;border:0'}">Students & PINs</button></div><div id="cb">${skel(4)}</div>`);
    $('#bk').onclick=()=>{T.tab='classes';T.render()};$('#s_reg').onclick=()=>T.classPage(id,'reg');$('#s_stu').onclick=()=>T.classPage(id,'stu');
    if(T.sub==='reg')T.register(id);else T.students(id,c);
  },

  async register(id){
    const el=$('#cb');let date=localDay(),rows=[],dirty=false;
    const load=async()=>{el.innerHTML=skel(4);try{rows=await rpc('t_att_get',{p_class:id,p_date:date})}catch(e){el.innerHTML='<div class="card">'+E(e.message)+'</div>';return}dirty=false;draw()};
    const cnt=()=>{const c={P:0,L:0,A:0,E:0,x:0};rows.forEach(r=>{if(r.s)c[r.s]++;else c.x++});return c};
    const draw=()=>{const c=cnt();
      el.innerHTML=`<div class="card"><div class="row"><input id="rd" type="date" class="inp" value="${date}" style="max-width:190px"><div class="grow"></div><button class="btn sm ghost" id="rp">All present</button><button class="btn sm ghost" id="rc">Clear</button></div><div class="row wrap" style="margin-top:10px"><span class="chip g">${c.P} on time</span><span class="chip a">${c.L} late</span><span class="chip r">${c.A} absent</span><span class="chip v">${c.E} excused</span>${c.x?`<span class="chip">${c.x} not marked</span>`:''}</div></div>
      <div id="rl">${rows.map((r,i)=>`<div class="card" style="margin:8px 0;padding:12px"><div class="row"><div class="grow"><b>${E(r.name)}</b><div class="mut sm">${E(r.id)}${r.n?' · '+E(r.n):''}</div></div></div><div class="seg" data-i="${i}">${[['P','On time','g'],['L','Late','a'],['A','Absent','r'],['E','Excused','v']].map(x=>`<button data-s="${x[0]}" class="${r.s===x[0]?'on '+x[2]:''}">${x[1]}</button>`).join('')}</div></div>`).join('')||'<div class="card c">No students in this class.</div>'}</div>
      <button class="btn full" id="rs" style="margin:10px 0 4px;position:sticky;bottom:92px">${dirty?'Save attendance':'Saved ✓'}</button>`;
      $('#rd').onchange=()=>{if(dirty&&!confirm_('Discard unsaved changes?'))return;date=$('#rd').value||localDay();load()};
      $$('.seg button').forEach(b=>b.onclick=()=>{const r=rows[+b.parentNode.dataset.i];r.s=r.s===b.dataset.s?null:b.dataset.s;dirty=true;buzz(8);draw()});
      $('#rp').onclick=()=>{rows.forEach(r=>r.s='P');dirty=true;draw()};$('#rc').onclick=()=>{rows.forEach(r=>r.s=null);dirty=true;draw()};
      $('#rs').onclick=async()=>{if(!dirty)return;const b=$('#rs');b.disabled=true;b.textContent='Saving…';try{await rpc('t_att_set',{p_class:id,p_date:date,p_rows:rows.map(r=>({id:r.id,s:r.s||'',n:r.n||''}))});dirty=false;toast('Attendance saved ✅');confetti(25);draw()}catch(e){b.disabled=false;b.textContent='Save attendance';toast(e.message)}};
    };
    const confirm_=m=>window.confirm(m);
    load();
  },

  async students(id,c){
    const el=$('#cb');let L=[];
    try{L=await rpc('t_class',{p_class:id})}catch(e){el.innerHTML='<div class="card">'+E(e.message)+'</div>';return}
    const draw=()=>{const q=($('#sq')||{}).value||'';const F=L.filter(s=>!q||(s.name+' '+s.id).toLowerCase().includes(q.toLowerCase()));
      $('#sl').innerHTML=F.map(s=>`<div class="card row" data-s="${E(s.id)}" style="margin:8px 0;padding:12px;cursor:pointer"><div class="grow"><b>${E(s.name)}</b><div class="mut sm">${E(s.id)} · PIN ${s.changed?'changed by student':E(s.pin)}</div></div>${s.pct!=null?`<span class="chip ${s.pct>=85?'g':s.pct>=70?'a':'r'}">${s.pct}%</span>`:''}<span class="chip ${s.claimed?'g':'a'}">${s.claimed?'active':'not yet'}</span></div>`).join('')||'<div class="card c">No students.</div>';
      $$('#sl [data-s]').forEach(b=>b.onclick=()=>T.student(b.dataset.s))};
    el.innerHTML=`<div class="card"><input id="sq" class="inp" placeholder="Search name or ID"><div class="row wrap" style="margin-top:10px"><span class="chip">${L.length} students · ${L.filter(s=>s.claimed).length} signed in</span></div><div class="row wrap" style="margin-top:10px"><button class="btn sm" id="pc">Print login cards</button><button class="btn sm ghost" id="cp">Copy ID & PIN list</button></div><div class="mut sm" style="margin-top:8px">Tap a student for their full profile, WhatsApp login message and PIN reset.</div></div><div id="sl" style="margin-top:8px"></div>`;
    $('#sq').oninput=draw;draw();
    $('#cp').onclick=()=>T.copy(L.map(s=>[s.name,s.id,s.changed?'(changed)':s.pin].join('\t')).join('\n'),'List copied — paste into Sheets');
    $('#pc').onclick=async()=>{await T.needQR();T.cards(L,c.name)};
  },

  cards(L,title){
    wrap(`<div class="row noprint" style="margin:6px 0 10px"><button class="btn sm ghost" id="bk">${ICON.back}</button><h2 class="grow">Login cards · ${E(title||'')}</h2><button class="btn sm" id="pr">Print</button></div><div class="mut sm noprint" style="margin-bottom:10px">Students who changed their password are skipped — reset their PIN first if they need a new card.</div><div class="pcards">${L.filter(s=>!s.changed).map(s=>{let q='';try{const z=qrcode(0,'M');z.addData(T.link(s.id,s.pin));z.make();q=z.createSvgTag({cellSize:4,margin:0,scalable:true})}catch(e){}return `<div class="card pcard" style="padding:14px;text-align:center;margin-bottom:10px"><img src="logo_navy.png" style="width:150px;display:block;margin:0 auto 8px"><b style="font-size:16px">${E(s.name)}</b><div class="mut sm">${E(title||'')}</div><div style="width:130px;margin:8px auto">${q}</div><div class="sm">Scan to sign in to Excel Student</div><div class="sm"><b>ID ${E(s.id)}</b> · PIN <b>${E(s.pin)}</b></div></div>`}).join('')}</div>`);
    $('#bk').onclick=()=>T.classPage(T.cur,'stu');$('#pr').onclick=()=>window.print();
  },

  async student(id){
    T.stop();wrap(`<div class="row" style="margin:6px 0 10px"><button class="btn sm ghost" id="bk">${ICON.back}</button><h2 class="grow">Student</h2></div>${skel(3)}`);$('#bk').onclick=()=>T.classPage(T.cur,'stu');
    let d;try{d=await rpc('t_student',{p_id:id})}catch(e){wrap(`<div class="card">${E(e.message)}</div><button class="btn full" id="bk2" style="margin-top:12px">Back</button>`);$('#bk2').onclick=()=>T.classPage(T.cur,'stu');return}
    const sub=T.ssub||'at';
    const tabs=[['at','Attendance'],['tr','Trackers'],['rp','Exams'],['hi','History'],['bh','Behaviour']];
    const pinH=d.changed?`<span class="chip a">Student changed the password</span>`:`<span class="chip">PIN <b style="font-family:var(--disp);letter-spacing:2px">${E(d.pin)}</b></span>`;
    const att=d.att||{};
    wrap(`<div class="row" style="margin:6px 0 10px"><button class="btn sm ghost" id="bk">${ICON.back}</button><h2 class="grow" style="font-size:20px">${E(d.name)}</h2></div>
    <div class="card glow" style="margin-bottom:12px;background:linear-gradient(135deg,rgba(76,183,165,.22),rgba(139,92,246,.22))"><div class="mut sm">${E(d.class||'')}${d.teacher?' · Teacher '+E(d.teacher):''}</div><div class="row wrap" style="margin:8px 0"><span class="chip">ID <b>${E(d.id)}</b></span>${pinH}<span class="chip ${d.claimed?'g':'a'}">${d.claimed?'signed in before':'not signed in yet'}</span></div>
    <div class="row wrap"><button class="btn sm" id="wa">WhatsApp login</button><button class="btn sm ghost" id="cl">Copy login</button><button class="btn sm ghost red" id="rs">Reset PIN</button></div></div>
    <div class="stats s4" style="margin-bottom:12px"><div class="stat"><b style="color:${Prog.pctc(att.pct)}">${att.pct==null?'—':att.pct+'%'}</b><span>Attendance</span></div><div class="stat"><b>${Prog.examAvg(d)==null?'—':Prog.examAvg(d)+'%'}</b><span>Exam avg</span></div><div class="stat"><b>${Prog.trkPct(d)==null?'—':Prog.trkPct(d)+'%'}</b><span>Trackers</span></div><div class="stat"><b>${(d.strikes||[]).length}</b><span>Strikes</span></div></div>
    <div class="row" id="ct" style="overflow:auto;padding-bottom:6px">${tabs.map(t=>`<button class="btn sm ${t[0]===sub?'':'ghost'}" data-s="${t[0]}" style="white-space:nowrap">${t[1]}</button>`).join('')}</div><div id="sb" style="margin-top:10px"></div>`);
    $('#bk').onclick=()=>T.classPage(T.cur,'stu');
    $$('#ct button').forEach(b=>b.onclick=()=>{T.ssub=b.dataset.s;T.student(id)});
    const body={at:()=>Prog.attH(d),tr:()=>Prog.trkH(d),rp:()=>Prog.rpH(d),hi:()=>Prog.hiH(d),bh:()=>T.behH(d)}[sub]();$('#sb').innerHTML=body;animate();
    $('#wa').onclick=()=>T.wa(T.msg(d.name,d.id,d.pin));$('#cl').onclick=()=>T.copy(T.msg(d.name,d.id,d.pin),'Login message copied');
    $('#rs').onclick=async()=>{const b=$('#rs');if(b.dataset.arm!=='1'){b.dataset.arm='1';b.textContent='Tap again to confirm';setTimeout(()=>{b.dataset.arm='';b.textContent='Reset PIN'},4000);return}
      try{const pw=await rpc('t_reset_pin',{p_id:id});toast('New PIN '+pw);T.student(id)}catch(e){toast(e.message)}};
  },
  behH(d){
    const s=d.strikes||[],w=d.warns||[];const K={late:'Late',absent:'Absent',behaviour:'Behaviour',homework:'Homework'};
    return (w.length?`<h3 style="margin:2px 2px 6px">Warnings</h3>`+w.map(x=>`<div class="card row" style="margin:6px 0;padding:12px"><div class="grow"><b>${E(K[x.r]||x.r||'Warning')}</b><div class="mut sm">${E(x.d?Prog.fd(x.d):'')}${x.c?' · '+x.c+' strikes':''}</div></div><span class="chip r">Warning</span></div>`).join(''):'')+
    `<h3 style="margin:14px 2px 6px">Strikes · ${s.length}</h3>`+(s.map(x=>`<div class="card row" style="margin:6px 0;padding:12px"><div class="grow"><b>${E(K[x.k]||x.k||'Strike')}</b><div class="mut sm">${E(x.d?Prog.fd(x.d):'')}${x.n?' · '+E(x.n):''}</div></div></div>`).join('')||'<div class="card c">No strikes. 🎉</div>');
  },

  /* ---------- class QR (live attendance) ---------- */
  async qr(){
    T.stop();T.tab='qr';const cs=S.t.classes||[];$('#chrome').querySelectorAll('.nav button[data-t]').forEach(b=>b.classList.remove('on'));
    wrap(`<h2 style="margin:6px 2px 10px">Class QR attendance</h2><div class="card"><span class="lbl" style="margin-top:0">Class</span><select id="cl" class="inp">${cs.map(c=>`<option value="${E(c.id)}">${E(c.name)}</option>`).join('')}</select><span class="lbl">Late after (minutes)</span><input id="lt" type="number" class="inp" value="10" min="1" max="60"><button id="op" class="btn full" style="margin-top:14px">Open class & show QR</button><div class="mut sm" style="margin-top:10px">Students scan this code inside their Excel app. It changes every 30 seconds so it can’t be shared. Scans are saved straight into the register.</div></div>`);
    $('#op').onclick=async()=>{try{const sid=await rpc('staff_open',{p_pin:'',p_class:$('#cl').value,p_late:+$('#lt').value||10});await T.needQR();T.live(sid,$('#cl').selectedOptions[0].textContent)}catch(e){toast(e.message)}};
  },
  live(sid,name){
    T.stop();wrap(`<div class="row" style="margin:6px 0 10px"><div class="grow"><h2 style="font-size:20px">${E(name)}</h2><div class="mut sm">Live attendance</div></div><button class="btn sm red" id="cx">Close class</button></div>
    <div class="card c"><div class="qrw" id="qr" style="margin:0 auto"></div><div class="mut sm" style="margin-top:10px">Refreshes every 30s · scan inside the Excel app</div><div class="big" id="cd" style="font-family:var(--disp);font-size:30px">30</div><button class="btn sm ghost" id="fs">Fullscreen</button></div>
    <div class="row" style="margin:14px 0 6px"><h3 class="grow">Students</h3><span class="chip" id="cnt"></span></div><div id="lv"></div>`);
    let lastTok='',left=0;
    $('#cx').onclick=async()=>{try{await rpc('staff_close',{p_pin:'',p_sid:sid});toast('Class closed');T.stop();T.qr()}catch(e){toast(e.message)}};
    $('#fs').onclick=()=>{const e=$('#qr');(e.requestFullscreen||function(){}).call(e)};
    const q=async()=>{try{const r=await rpc('staff_qr',{p_pin:'',p_sid:sid});left=r.left;if(r.token!==lastTok){lastTok=r.token;const z=qrcode(0,'M');z.addData(r.token);z.make();$('#qr').innerHTML=z.createSvgTag({cellSize:7,margin:0,scalable:true});const sv=$('#qr svg');if(sv){sv.style.width='min(72vw,320px)';sv.style.height='auto'}}}catch(e){}};
    const lv=async()=>{try{const r=await rpc('staff_live',{p_pin:'',p_sid:sid});const p=r.filter(x=>x.status==='present').length,l=r.filter(x=>x.status==='late').length;$('#cnt').textContent=p+' on time · '+l+' late · '+(r.length-p-l)+' waiting';
      $('#lv').innerHTML=r.map(s=>{const c=s.status==='present'?'g':s.status==='late'?'a':s.status==='absent'?'r':'';return `<div class="card row" style="margin:6px 0;padding:10px"><div class="grow"><b>${E(s.name)}</b><div class="mut sm">${E(s.id)}${s.absent_ok?' · excused':''}${s.joined?'':' · not signed in yet'}</div></div><span class="chip ${c}">${E(s.status)}</span><select data-m="${E(s.id)}" class="inp" style="width:auto;padding:6px"><option value="">mark…</option><option>present</option><option>late</option><option>absent</option><option value="waiting">clear</option></select></div>`}).join('');
      $$('#lv [data-m]').forEach(s=>s.onchange=async()=>{if(!s.value)return;try{await rpc('staff_mark',{p_pin:'',p_sid:sid,p_student:s.dataset.m,p_status:s.value});lv()}catch(e){toast(e.message)}})}catch(e){}};
    q();lv();T.timers.push(setInterval(()=>{left=Math.max(0,left-1);const c=$('#cd');if(c)c.textContent=left;if(left<=1)setTimeout(q,1100)},1000),setInterval(q,8000),setInterval(lv,4000));S.stop=T.stop;
  },

  /* ---------- tools ---------- */
  tools(){
    const tabs=[['ab','Absences'],['hw','Homework'],['ib','Inbox'],['ev','Events'],['fd','Find student']];const sub=T.tsub||'ab';
    wrap(`<h2 style="margin:6px 2px 10px">Tools</h2><div class="row" id="tt" style="overflow:auto;padding-bottom:6px">${tabs.map(t=>`<button class="btn sm ${t[0]===sub?'':'ghost'}" data-s="${t[0]}" style="white-space:nowrap">${t[1]}</button>`).join('')}</div><div id="bd" style="margin-top:10px">${skel(3)}</div>`);
    $$('#tt button').forEach(b=>b.onclick=()=>{T.tsub=b.dataset.s;T.tools()});
    T.tk=(T.tk||0)+1;$('#bd').dataset.k=T.tk;
    ({ab:T.absTab,hw:T.hwTab,ib:T.inboxTab,ev:T.evTab,fd:T.findTab})[sub]();
  },
  async absTab(){const k=T.tk;const r=await rpc('staff_absences',{p_pin:''}).catch(e=>{$('#bd').innerHTML='<div class="card">'+E(e.message)+'</div>';return null});if(!r||$('#bd').dataset.k!=String(k))return;
    $('#bd').innerHTML=(r||[]).map(a=>`<div class="card" style="margin:8px 0"><div class="row"><div class="grow"><b>${E(a.student||a.sid)}</b> · ${E(a.date||a.on_date)}<div class="mut sm">${E(a.reason)}</div></div><span class="chip ${a.status==='approved'?'g':a.status==='declined'?'r':'a'}">${E(a.status)}</span></div>${a.status==='pending'?`<div class="row" style="margin-top:8px"><button class="btn sm" data-y="${a.id}">Approve</button><button class="btn sm red" data-n="${a.id}">Decline</button></div>`:''}</div>`).join('')||'<div class="card c">No absence requests.</div>';
    $$('[data-y],[data-n]').forEach(b=>b.onclick=async()=>{await rpc('staff_decide',{p_pin:'',p_id:+(b.dataset.y||b.dataset.n),p_status:b.dataset.y?'approved':'declined'});T.absTab()})},
  async hwTab(){const cs=S.t.classes||[];
    $('#bd').innerHTML=`<div class="card"><select id="hc" class="inp">${cs.map(c=>`<option value="${E(c.id)}">${E(c.name)}</option>`).join('')}</select><input id="ht" class="inp" placeholder="Title" style="margin-top:8px"><textarea id="hb" class="inp" rows="3" placeholder="Instructions" style="margin-top:8px"></textarea><input id="hd" type="date" class="inp" style="margin-top:8px"><button id="ha" class="btn full" style="margin-top:10px">Post homework</button></div><div id="hl" style="margin-top:10px"></div>`;
    const ls=async()=>{let r=await rpc('staff_hw_list',{p_pin:''}).catch(()=>[]);if(S.t.role!=='admin'){const ids=(S.t.classes||[]).map(c=>c.id);r=(r||[]).filter(h=>ids.includes(h.class||h.class_id))}$('#hl').innerHTML=(r||[]).map(h=>`<div class="card row" style="margin:6px 0"><div class="grow"><b>${E(h.title)}</b><div class="mut sm">${E(h.class||h.class_id)} · due ${E(h.due||'-')}${h.done!=null?' · '+h.done+' done':''}</div></div><button class="btn sm red" data-d="${h.id}">Delete</button></div>`).join('');$$('[data-d]').forEach(b=>b.onclick=async()=>{await rpc('staff_hw_del',{p_pin:'',p_id:+b.dataset.d});ls()})};
    $('#ha').onclick=async()=>{if(!$('#ht').value.trim()){toast('Add a title');return}try{await rpc('staff_hw_add',{p_pin:'',p_class:$('#hc').value,p_title:$('#ht').value,p_body:$('#hb').value,p_due:$('#hd').value||null,p_file:null});toast('Posted ✅');$('#ht').value='';$('#hb').value='';ls()}catch(e){toast(e.message)}};ls()},
  async inboxTab(){const k=T.tk;const r=await rpc('staff_inbox',{p_pin:''}).catch(e=>{$('#bd').innerHTML='<div class="card">'+E(e.message)+'</div>';return null});if(!r||$('#bd').dataset.k!=String(k))return;
    $('#bd').innerHTML=(r||[]).map(x=>`<div class="card" style="margin:8px 0"><div class="row"><b class="grow">${E(x.student)} · ${E(x.kind)}</b><span class="chip ${x.status==='new'?'a':'g'}">${E(x.status)}</span></div><p style="margin:6px 0">${E(x.body)}</p>${x.status==='new'?`<button class="btn sm" data-s="${E(x.src)}" data-i="${x.id}">Mark handled</button>`:''}</div>`).join('')||'<div class="card c">Inbox empty. 🎉</div>';
    $$('[data-s]').forEach(b=>b.onclick=async()=>{await rpc('staff_inbox_set',{p_pin:'',p_src:b.dataset.s,p_id:+b.dataset.i,p_status:'done'});T.inboxTab()})},
  evTab(){const cs=S.t.classes||[];
    $('#bd').innerHTML=`<div class="card"><select id="ec" class="inp"><option value="all">All classes</option>${cs.map(c=>`<option value="${E(c.id)}">${E(c.name)}</option>`).join('')}</select><input id="et" class="inp" placeholder="Event title" style="margin-top:8px"><input id="ed" type="date" class="inp" style="margin-top:8px"><select id="ek" class="inp" style="margin-top:8px"><option>event</option><option>exam</option><option>holiday</option></select><button id="ea" class="btn full" style="margin-top:10px">Add to calendar</button></div>`;
    $('#ea').onclick=async()=>{if(!$('#et').value.trim()||!$('#ed').value){toast('Add a title and date');return}try{await rpc('staff_event_add',{p_pin:'',p_class:$('#ec').value,p_title:$('#et').value,p_date:$('#ed').value,p_kind:$('#ek').value});toast('Added 🗓️');$('#et').value=''}catch(e){toast(e.message)}}},
  findTab(){
    $('#bd').innerHTML=`<input id="fq" class="inp" placeholder="Type a name or ID (e.g. EX017)"><div id="fl" style="margin-top:10px"></div>`;let tm;
    $('#fq').oninput=()=>{clearTimeout(tm);tm=setTimeout(async()=>{const q=$('#fq').value.trim();if(q.length<2){$('#fl').innerHTML='';return}
      try{const r=await rpc('t_find',{p_q:q});$('#fl').innerHTML=r.map(s=>`<div class="card row" data-s="${E(s.id)}" data-c="${E(s.class_id||'')}" style="margin:6px 0;padding:12px;cursor:pointer"><div class="grow"><b>${E(s.name)}</b><div class="mut sm">${E(s.id)} · ${E(s.class||'')}</div></div><span class="chip">Open</span></div>`).join('')||'<div class="card c">Nobody found.</div>';
        $$('#fl [data-s]').forEach(b=>b.onclick=()=>{T.cur=null;T.cur=(S.t.classes.find(c=>c.name===(r.find(x=>x.id===b.dataset.s)||{}).class)||{}).id||(S.t.classes[0]||{}).id;T.ssub='at';T.student(b.dataset.s)})}catch(e){$('#fl').innerHTML='<div class="card">'+E(e.message)+'</div>'}},300)};
  },

  /* ---------- me ---------- */
  me(){
    const t=S.t;
    wrap(`<div class="card c" style="margin-bottom:12px"><div style="width:84px;height:84px;margin:0 auto 10px;border-radius:50%;background:var(--grad);display:grid;place-items:center;font-family:var(--disp);font-size:34px;color:#fff">${E(t.name.slice(0,1))}</div><h2>${E(t.name)}</h2><div class="mut">${t.role==='admin'?'Principal':'Teacher'} · ID ${E(t.id)}</div></div>
    ${t.role==='admin'?`<button class="btn full" id="tp" style="margin-bottom:10px">Teachers & PINs</button>`:''}<button class="btn ghost full" id="pw">Change password</button><button class="btn ghost full" id="so" style="margin-top:10px">Sign out</button><p class="mut sm c" style="margin-top:16px">Excel Language Center · teacher mode. The Hub stays available for manual attendance.</p>`);
    if($('#tp'))$('#tp').onclick=T.teachers;
    $('#pw').onclick=()=>{const sh=sheet(`<h3 style="margin:0 0 10px">Change password</h3><input id="np" type="password" class="inp" placeholder="New password (6+ characters)" autocomplete="new-password"><button class="btn full" id="npg" style="margin-top:12px">Save password</button>`);sh.querySelector('#npg').onclick=async()=>{const v=sh.querySelector('#np').value;if(v.length<6){toast('At least 6 characters');return}const r=await SB.auth.updateUser({password:v});if(r.error){toast(r.error.message);return}try{await SB.rpc('i_changed_pw')}catch(e){}toast('Password changed');sh.close()}};
    $('#so').onclick=async()=>{T.stop();await SB.auth.signOut();S.t=null;S.me=null;$('#chrome').innerHTML='';render()};
  },
  async teachers(){
    wrap(`<div class="row" style="margin:6px 0 10px"><button class="btn sm ghost" id="bk">${ICON.back}</button><h2 class="grow">Teachers & PINs</h2></div><div class="mut sm" style="margin-bottom:10px">Give each teacher their ID and PIN. They sign in to the same app and see their own classes.</div><div id="tl">${skel(4)}</div>`);
    $('#bk').onclick=()=>{T.tab='me';T.render()};
    let L;try{L=await rpc('t_teachers')}catch(e){$('#tl').innerHTML='<div class="card">'+E(e.message)+'</div>';return}
    $('#tl').innerHTML=L.map(t=>`<div class="card" style="margin:8px 0"><div class="row"><div class="grow"><b>${E(t.name)}</b><div class="mut sm">${t.role==='admin'?'Principal':'Teacher'} · ${t.classes} classes</div></div><span class="chip ${t.claimed?'g':'a'}">${t.claimed?'signed in':'not yet'}</span></div><div class="row wrap" style="margin-top:8px"><span class="chip">ID <b>${E(t.id)}</b></span><span class="chip ${t.changed?'a':''}">${t.changed?'password changed':'PIN <b>'+E(t.pin)+'</b>'}</span></div><div class="row wrap" style="margin-top:8px"><button class="btn sm" data-wa="${E(t.id)}">WhatsApp login</button><button class="btn sm ghost" data-cp="${E(t.id)}">Copy login</button><button class="btn sm ghost red" data-rs="${E(t.id)}">Reset PIN</button></div></div>`).join('');
    const msg=t=>`Hi ${t.name.split(' ')[0]}! Your Excel teacher account is ready.\nID: ${t.id}\nPIN: ${t.pin}\nOpen the Excel Student app and sign in: ${SLINK}`;
    $$('[data-wa]').forEach(b=>b.onclick=()=>T.wa(msg(L.find(x=>x.id===b.dataset.wa))));$$('[data-cp]').forEach(b=>b.onclick=()=>T.copy(msg(L.find(x=>x.id===b.dataset.cp)),'Login message copied'));
    $$('[data-rs]').forEach(b=>b.onclick=async()=>{if(b.dataset.arm!=='1'){b.dataset.arm='1';b.textContent='Tap again to confirm';setTimeout(()=>{b.dataset.arm='';b.textContent='Reset PIN'},4000);return}try{const pw=await rpc('t_reset_teacher_pin',{p_id:b.dataset.rs});toast('New PIN '+pw);T.teachers()}catch(e){toast(e.message)}});
  }
};
