const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const screens = $$('.screen');
function go(id){
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  if(id!=='game') stopGame();
  if(id==='home') petals(5);
}
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));

const toastEl=$('#toast'); let toastTimer;
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),1800)}

const gifts={
 flower:{icon:'💐',title:'A flower for your day!',text:'Tumhari day mein thodi si extra softness aur bahut saari khushboo 🌷',extra:'🌸 🌼 🌷 🌻 🌺'},
 joke:{icon:'🐥',title:'Tiny silly joke!',text:'Phool ne bee se kya kaha? “Buzz-zara mere paas!” 😭😂',extra:'Officially certified: 1 tiny giggle achieved.'},
 wish:{icon:'💖',title:'A pocket full of wishes',text:'Aaj tumhe ek cute surprise, ek achhi news aur ek reason to smile mile ✨',extra:'Sending 1000 virtual sparkles your way ✨'}
};
$$('[data-gift]').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.gift-card').forEach(c=>c.classList.remove('opened'));btn.classList.add('opened');
  const g=gifts[btn.dataset.gift];$('#giftResult').innerHTML=`<div class="result-icon">${g.icon}</div><h3>${g.title}</h3><p>${g.text}</p><p style="margin-top:8px;font-size:17px">${g.extra}</p>`;
  petals(12);toast('Gift unlocked! 🎉');
}));

$('#moreLove').addEventListener('click',()=>{
 const el=$('#extraLine');el.classList.toggle('show');
 $('#moreLove').textContent=el.classList.contains('show')?'Aww, hide line 🙈':'One more cute line 💌';
 if(el.classList.contains('show'))petals(8);
});

let gameInterval=null, spawnInterval=null, timeLeft=10, score=0, playing=false;
function updateScore(){$('#score').textContent=score;$('#time').textContent=timeLeft}
function stopGame(){clearInterval(gameInterval);clearInterval(spawnInterval);gameInterval=spawnInterval=null;playing=false}
function spawnHeart(){
 if(!playing)return;
 const board=$('#gameBoard'), hint=$('#gameHint');if(hint)hint.remove();
 const heart=document.createElement('button');heart.className='heart-target';heart.type='button';heart.textContent=['💗','💖','💕','💘','🌸'][Math.floor(Math.random()*5)];heart.setAttribute('aria-label','Catch heart');
 const maxX=Math.max(0,board.clientWidth-48),maxY=Math.max(0,board.clientHeight-48);
 heart.style.left=Math.random()*maxX+'px';heart.style.top=Math.random()*maxY+'px';
 heart.addEventListener('click',()=>{if(!playing)return;score++;updateScore();heart.remove();if(score%5===0)petals(5)});
 board.appendChild(heart);setTimeout(()=>heart.remove(),950);
}
function resetGame(){
 stopGame();score=0;timeLeft=10;updateScore();
 $('#gameBoard').innerHTML='<div class="game-hint" id="gameHint">Press start and catch 💗</div>';
 $('#gameMessage').textContent='Ready? Set… cute! 🌸';$('#startGame').disabled=false;$('#startGame').textContent='▶ Start game';
}
$('#startGame').addEventListener('click',()=>{
 if(playing)return;resetGame();playing=true;$('#startGame').disabled=true;$('#startGame').textContent='💞 Go go go!';
 $('#gameMessage').textContent='Tap the floating cuties!';spawnHeart();
 spawnInterval=setInterval(spawnHeart,560);
 gameInterval=setInterval(()=>{timeLeft--;updateScore();if(timeLeft<=0){stopGame();$$('.heart-target').forEach(h=>h.remove());$('#gameMessage').textContent=`Time! You caught ${score} cutie${score===1?'':'s'}! ${score>=10?'You are a heart-catching pro! 🏆':'Cute effort — one more round? 💗'}`;$('#startGame').disabled=false;$('#startGame').textContent='▶ Play again';petals(14)}},1000);
});
$('#resetGame').addEventListener('click',resetGame);

function petals(count=8){
 const layer=$('.sparkle-layer');const symbols=['🌸','💗','✿','✨','🌷'];
 for(let i=0;i<count;i++){
  const p=document.createElement('span');p.className='petal';p.textContent=symbols[Math.floor(Math.random()*symbols.length)];
  p.style.left=Math.random()*100+'%';p.style.animationDuration=(3+Math.random()*3)+'s';p.style.animationDelay=(Math.random()*.5)+'s';p.style.fontSize=(12+Math.random()*12)+'px';
  layer.appendChild(p);setTimeout(()=>p.remove(),7000);
 }
}
let lastPetal=0;setInterval(()=>{if(Date.now()-lastPetal>2500){lastPetal=Date.now();petals(1)}},2600);
petals(9);
