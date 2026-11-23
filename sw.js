const C='xs-v2';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  if(/\.(jpg|png|svg)$/.test(u.pathname)||(/\.(js|css)$/.test(u.pathname)&&u.search.includes('v='))){
    e.respondWith(caches.open(C).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{if(n.ok&&n.status===200)c.put(r,n.clone());return n}))))}});
