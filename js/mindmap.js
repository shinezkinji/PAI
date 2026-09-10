
/* ===== mindmap.js — mind map interaktif index ===== */
(function(){
  const stage=document.getElementById('map-stage'); if(!stage) return;
  const svg=document.getElementById('map-svg');
  const nodes=[
    {id:'pengertian', emo:'📖', lbl:'Pengertian',   sub:'Apa itu penyakit sosial', color:'#22d3ee', ang:-90},
    {id:'jenis',      emo:'🎭', lbl:'Jenis-Jenis',  sub:'10 bentuk penyimpangan', color:'#ffd166', ang:-30},
    {id:'penyebab',   emo:'🧨', lbl:'Penyebab',     sub:'5 faktor pemicu',        color:'#ff4d8d', ang:30},
    {id:'dampak',     emo:'💔', lbl:'Dampak',       sub:'Individu · Keluarga · Masyarakat', color:'#a855f7', ang:90},
    {id:'islam',      emo:'🕌', lbl:'Pandangan Islam', sub:'QS. Al-Baqarah: 195', color:'#4ade80', ang:150},
    {id:'refleksi',   emo:'🪞', lbl:'Refleksi',     sub:'Aktivitas & renungan',   color:'#fb923c', ang:210},
  ];
  function build(){
    svg.innerHTML=''; stage.querySelectorAll('.mnode').forEach(n=>n.remove());
    const W=stage.clientWidth, H=stage.clientHeight, cx=W/2, cy=H/2, R=Math.min(W,H)*.38;
    nodes.forEach((n,i)=>{
      const rad=n.ang*Math.PI/180;
      n.x=cx+Math.cos(rad)*R; n.y=cy+Math.sin(rad)*R*.86;
      const p=document.createElement('div');
      p.className='mnode'; p.style.left=n.x+'px'; p.style.top=n.y+'px';
      p.style.setProperty('--fd',(i*.35)+'s');
      p.style.borderColor=n.color+'66';
      p.innerHTML=`<span class="emo">${n.emo}</span><span class="lbl">${n.lbl}</span><span class="sub">${n.sub}</span>`;
      p.addEventListener('click',()=>location.href=n.id+'.html');
      stage.appendChild(p);
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      const mx=(cx+n.x)/2, my=(cy+n.y)/2 - 40;
      path.setAttribute('d',`M ${cx} ${cy} Q ${mx} ${my} ${n.x} ${n.y}`);
      path.setAttribute('stroke',n.color); path.style.animationDelay=(.25+i*.14)+'s';
      path.style.filter=`drop-shadow(0 0 6px ${n.color})`;
      svg.appendChild(path);
      const ring=document.createElementNS('http://www.w3.org/2000/svg','circle');
      ring.setAttribute('class','pulse'); ring.setAttribute('cx',n.x); ring.setAttribute('cy',n.y);
      ring.setAttribute('stroke',n.color); ring.style.animationDelay=(i*.45)+'s';
      svg.appendChild(ring);
    });
  }
  build(); addEventListener('resize', build);
  // putar pelan-pelan biar hidup
  let t0=0;
  (function spin(t){ t0=t/9000; requestAnimationFrame(spin); })(0);
})();
