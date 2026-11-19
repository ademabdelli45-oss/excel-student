/* Excel Student – progress views (attendance, trackers, exams & reports, history).
   Pure renderers: take the object returned by my_progress() / t_student(). Used by students and by teachers. */
const Prog={
  d:null,t:0,
  async load(force){if(!force&&Prog.d&&Date.now()-Prog.t<20000)return Prog.d;Prog.d=await rpc('my_progress');Prog.t=Date.now();return Prog.d},
  KIND:{passport:['Passport','🛂'],present:['Presentation','🎤'],sim:['Simulation Street','🏙️'],hw:['Homework','📚']},
  fd(s){if(!s)return'—';const d=new Date(String(s).slice(0,10)+'T12:00:00');return isNaN(d)?String(s):d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})},
  fm(m){const p=String(m||'').split('-');return p.length<2?m:MONTHS[+p[1]-1].slice(0,3)+' '+p[0]},
  st:{P:['On time','g'],L:['Late','a'],A:['Absent','r'],E:['Excused','v']},
  pctc(p){return p==null?'':p>=85?'var(--green)':p>=70?'var(--teal)':p>=60?'var(--amber)':'var(--red)'},
  trkStats(d){const out={};(d.trk||[]).forEach(r=>{const o=out[r.k]=out[r.k]||{n:0,done:0,stars:0,sn:0,list:[]};o.n++;if(r.done)o.done++;if(r.s>0){o.stars+=r.s;o.sn++}o.list.push(r)});return out},
  trkPct(d){const t=Prog.trkStats(d);let n=0,k=0;Object.values(t).forEach(o=>{n+=o.n;k+=o.done});return n?Math.round(k/n*100):null},
  examAvg(d){const x=(d.exams||[]).filter(e=>e.pct!=null&&Number.isFinite(Number(e.pct)));return x.length?Math.round(x.reduce((a,e)=>a+Number(e.pct),0)/x.length):null},

  attH(d){
    const a=d.att||{},tot=(a.P||0)+(a.L||0)+(a.A||0)+(a.E||0);
    if(!tot)return '<div class="card c"><div style="font-size:40px">🗓️</div><b>No attendance yet</b><div class="mut sm" style="margin-top:4px">Your attendance will show up here after your first classes.</div></div>';
    const pct=(a.pct||0)/100;
    const months=(d.att_months||[]).slice(-6).map(m=>`<div class="row" style="margin:7px 0;gap:10px"><span class="mut sm" style="width:58px">${E(Prog.fm(m.m))}</span><div class="grow" style="height:10px;border-radius:6px;background:var(--card2);overflow:hidden"><i style="display:block;height:100%;width:${m.pct||0}%;background:var(--grad);border-radius:6px"></i></div><b class="sm" style="width:40px;text-align:right">${m.pct==null?'—':m.pct+'%'}</b></div>`).join('');
    return `<div class="card row">${ring(pct,86,9,`<b style="font-size:20px">${a.pct==null?'—':a.pct+'%'}</b>`)}<div class="grow"><b style="font-family:var(--disp);font-size:18px">Attendance rate</b><div class="mut sm">${(a.P||0)+(a.L||0)+(a.A||0)} classes counted${a.E?` · ${a.E} excused (not counted)`:''}</div></div></div>
    <div class="stats s4" style="margin:12px 0"><div class="stat"><b style="color:var(--green)">${a.P||0}</b><span>On time</span></div><div class="stat"><b style="color:var(--amber)">${a.L||0}</b><span>Late</span></div><div class="stat"><b style="color:var(--red)">${a.A||0}</b><span>Absent</span></div><div class="stat"><b style="color:var(--violet,#a78bfa)">${a.E||0}</b><span>Excused</span></div></div>
    ${months?`<div class="card" style="margin-bottom:12px"><h3 style="margin-bottom:6px">By month</h3>${months}</div>`:''}
    <h3 style="margin:14px 2px 6px">Recent days</h3>`+(d.att_recent||[]).map(x=>{const s=Prog.st[x.s]||[x.s,''];return `<div class="card row" style="margin:6px 0;padding:12px"><div class="grow"><b>${E(Prog.fd(x.d))}</b>${x.n?`<div class="mut sm">${E(x.n)}</div>`:''}</div><span class="chip ${s[1]}">${E(s[0])}</span></div>`}).join('');
  },

  trkH(d){
    const t=Prog.trkStats(d),keys=Object.keys(Prog.KIND).filter(k=>t[k]).concat(Object.keys(t).filter(k=>!Prog.KIND[k]));
    if(!keys.length)return '<div class="card c"><div style="font-size:40px">🎯</div><b>No tracker entries yet</b><div class="mut sm" style="margin-top:4px">Passport, presentations, Simulation Street and homework appear here as your teacher records them.</div></div>';
    return keys.map(k=>{const o=t[k],nm=Prog.KIND[k]||[k,'⭐'],p=Math.round(o.done/o.n*100),avg=o.sn?(o.stars/o.sn):null;
      const dots=o.list.slice(0,14).map(r=>`<span title="${E(Prog.fd(r.d))}" style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;font-size:10px;color:var(--mut)"><i style="width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-weight:800;font-size:11px;color:#fff;background:${r.done?'var(--green)':'rgba(248,113,113,.7)'}">${r.done?'✓':'✕'}</i>${r.s>0?'★'+r.s:''}</span>`).join('');
      return `<div class="card" style="margin:10px 0"><div class="row"><span style="font-size:24px">${nm[1]}</span><div class="grow"><b style="font-family:var(--disp);font-size:17px">${E(nm[0])}</b><div class="mut sm">${o.done} of ${o.n} completed${avg!=null?` · average ★ ${avg.toFixed(1)}`:''}</div></div><b style="font-family:var(--disp);font-size:20px;color:${Prog.pctc(p)}">${p}%</b></div><div style="height:9px;border-radius:6px;background:var(--card2);overflow:hidden;margin:10px 0"><i style="display:block;height:100%;width:${p}%;background:var(--grad)"></i></div><div class="row wrap" style="gap:8px">${dots}</div></div>`}).join('');
  },

  rpH(d){
    const ex=d.exams||[],avg=Prog.examAvg(d),tp=Prog.trkPct(d),ap=(d.att||{}).pct;
    const sum=`<div class="card glow" style="background:linear-gradient(135deg,rgba(76,183,165,.22),rgba(139,92,246,.22));margin-bottom:12px"><div class="mut sm">Academic report</div><h2 style="font-size:20px;margin:2px 0 10px">${E(d.name||'')}</h2><div class="stats s4"><div class="stat"><b style="color:${Prog.pctc(avg)}">${avg==null?'—':avg+'%'}</b><span>Exam avg</span></div><div class="stat"><b style="color:${Prog.pctc(ap)}">${ap==null?'—':ap+'%'}</b><span>Attendance</span></div><div class="stat"><b style="color:${Prog.pctc(tp)}">${tp==null?'—':tp+'%'}</b><span>Trackers</span></div><div class="stat"><b>${d.points||0}</b><span>Points</span></div></div><div class="mut sm" style="margin-top:10px">${E([d.class,d.teacher?'Teacher '+d.teacher:''].filter(Boolean).join(' · '))}</div></div>`;
    const exH=ex.length?`<h3 style="margin:14px 2px 6px">Exam results</h3>`+ex.map(e=>`<div class="card" style="margin:8px 0"><div class="row"><div class="grow"><b>${E(e.exam||'Exam')}</b><div class="mut sm">${E(e.d?Prog.fd(e.d):Prog.fm(e.month))}${e.raw!=null&&e.max?` · ${e.raw}/${e.max}`:''}</div></div><span class="chip ${e.pct>=70?'g':e.pct>=60?'a':'r'}" style="font-size:16px">${e.grade||''}</span><b style="font-family:var(--disp);font-size:20px;min-width:52px;text-align:right;color:${Prog.pctc(e.pct)}">${e.pct==null?'—':Math.round(e.pct)+'%'}</b></div><div style="height:8px;border-radius:5px;background:var(--card2);overflow:hidden;margin-top:8px"><i style="display:block;height:100%;width:${Math.min(100,e.pct||0)}%;background:var(--grad)"></i></div></div>`).join(''):'<div class="card c" style="margin-top:12px"><div style="font-size:40px">📝</div><b>No exam results yet</b><div class="mut sm" style="margin-top:4px">Midterm and final results appear here after marking.</div></div>';
    const ce=(d.certs||[]).length?`<h3 style="margin:16px 2px 6px">Certificates</h3>`+d.certs.map(c=>`<div class="card row" style="margin:8px 0"><span style="font-size:26px">🎓</span><div class="grow"><b>${E(c.kind||'Certificate')}${c.level?' · '+E(c.level):''}</b><div class="mut sm">${E(c.d?Prog.fd(c.d):'')}${c.score?' · '+E(c.score):''}</div></div>${c.grade?`<span class="chip g">${E(c.grade)}</span>`:''}</div>`).join(''):'';
    return sum+exH+ce;
  },

  hiH(d){
    const mv=d.moves||[],pl=d.points_log||[];
    const m=mv.length?`<h3 style="margin:2px 2px 6px">Class history</h3>`+mv.map(x=>`<div class="card" style="margin:8px 0"><b>${E(x.from||'?')} → ${E(x.to||'?')}</b><div class="mut sm">${E(x.d?Prog.fd(x.d):'')}${x.why?' · '+E(x.why):''}</div></div>`).join(''):`<div class="card" style="margin-bottom:12px"><h3 style="margin-bottom:4px">Class history</h3><div class="mut sm">Current class: <b>${E(d.class||'—')}</b>${d.level?' · '+E(d.level):''}. No class changes recorded.</div></div>`;
    const p=pl.length?`<h3 style="margin:16px 2px 6px">Points earned · ${d.points||0} total</h3>`+pl.map(x=>`<div class="card row" style="margin:6px 0;padding:12px"><div class="grow"><b>${E(x.a||'Activity')}</b><div class="mut sm">${E(x.d?Prog.fd(x.d):'')}${x.n?' · '+E(x.n):''}</div></div><span class="chip g">+${x.p||0}</span></div>`).join(''):'';
    return m+p;
  }
};
