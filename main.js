(()=>{"use strict";var t,e,i;!function(t){t[t.None=0]="None",t[t.Up=1]="Up",t[t.UpLeft=2]="UpLeft",t[t.UpRight=3]="UpRight",t[t.Down=4]="Down",t[t.DownLeft=5]="DownLeft",t[t.DownRight=6]="DownRight",t[t.Left=7]="Left",t[t.Right=8]="Right"}(t||(t={})),function(t){t[t.Coin=0]="Coin",t[t.Bomb=1]="Bomb"}(e||(e={})),function(t){t[t.PowerUpSpeed=0]="PowerUpSpeed",t[t.PowerDownSpeed=1]="PowerDownSpeed",t[t.PowerUpInvincible=2]="PowerUpInvincible",t[t.PowerUpMagnet=3]="PowerUpMagnet",t[t.PowerUpTime=4]="PowerUpTime"}(i||(i={}));class s{constructor(){this.position={top:0,left:0},this.elem=document.createElement("div"),this.elem.classList.add("background"),document.getElementById("container-background").appendChild(this.elem),this.area=this.elem.getBoundingClientRect();const t=this.area.width/4,e=this.area.height/4;this.position.top=-e,this.position.left=-t,this.elem.style.transform=`translate(-${t}px, -${e}px)`}move(e){const i=this.area.width/2,s=this.area.height/2;if(e===t.UpLeft&&this.position.top<-5&&this.position.left<-5)this.position.top+=5,this.position.left+=5;else if(e===t.UpRight&&this.position.top<-5&&this.position.left-5>-1*i)this.position.top+=5,this.position.left-=5;else if(e===t.DownLeft&&this.position.top-5>-1*s&&this.position.left<-5)this.position.top-=5,this.position.left+=5;else if(e===t.DownRight&&this.position.top-5>-1*s&&this.position.left-5>-1*i)this.position.top-=5,this.position.left-=5;else if(e===t.Up&&this.position.top<-5)this.position.top+=5;else if(e===t.Down&&this.position.top-5>-1*s)this.position.top-=5;else if(e===t.Left&&this.position.left<-5)this.position.left+=5;else{if(!(e===t.Right&&this.position.left-5>-1*i))return!1;this.position.left-=5}return this.elem.style.transform=`translate(${this.position.left}px, ${this.position.top}px)`,!0}}class o{static hitDetection(t,e){const i=t.getBoundingClientRect(),s=e.getBoundingClientRect();let o=!1;const n=i.x,r=i.y,a=i.right-5,h=i.bottom-5,d=s.x,l=s.y,p=s.right,m=s.bottom;return d<=a&&p>=n&&m>=r&&l<=h&&(o=!0),o}}class n{constructor(t){this.position={top:0,left:0},this.elem=document.createElement("div");const e=t.y+80,i=t.bottom-80,s=t.x+80,o=t.right-80,n=Math.floor(Math.random()*(i-e)+e),r=Math.floor(Math.random()*(o-s)+s);this.position.top=n,this.position.left=r,this.elem.style.top=`${this.position.top}px`,this.elem.style.left=`${this.position.left}px`,this.elem.classList.add("item"),document.getElementById("container-items").appendChild(this.elem)}move(e){if(e===t.UpLeft)this.position.top+=5,this.position.left+=5;else if(e===t.UpRight)this.position.top+=5,this.position.left-=5;else if(e===t.DownLeft)this.position.top-=5,this.position.left+=5;else if(e===t.DownRight)this.position.top-=5,this.position.left-=5;else if(e===t.Up)this.position.top+=5;else if(e===t.Down)this.position.top-=5;else if(e===t.Left)this.position.left+=5;else{if(e!==t.Right)return!1;this.position.left-=5}return this.elem.style.top=`${this.position.top}px`,this.elem.style.left=`${this.position.left}px`,!0}}class r extends n{constructor(t,i,s){super(t),this.itemType=i,this.player=s,this.elem.classList.add(e[i].toLowerCase())}itemCollected(){this.addScore()}addScore(t=1){this.game.score+=t,document.getElementById("score").innerHTML=this.game.score.toString(),localStorage.setItem("score",this.game.score.toString())}moveTowardsPlayer(){const t=.3;if(this.player){const e=this.player.position,i=this.position;e.top>i.top?this.position.top+=t:e.top<i.top&&(this.position.top-=t),e.left>i.left?this.position.left+=t:e.left<i.left&&(this.position.left-=t),this.elem.style.top=`${this.position.top}px`,this.elem.style.left=`${this.position.left}px`}}}class a extends n{constructor(t,e,s){super(t),this.effectDuration=7,this.timeAdded=100,this.opacityChanged=!1,this.invincibleAnimation=[{opacity:1},{opacity:.5,offset:.05},{opacity:.5,offset:.95},{opacity:1}],this.itemType=e,this.player=s,this.elem.classList.add(i[e].toLowerCase())}speedUp(t=10){this.effectDuration>0?(this.effectDuration--,this.player.speed=t,setTimeout((()=>this.speedUp(t)),1e3)):this.player.speed=5}speedDown(t=2.5){this.effectDuration>0?(this.effectDuration--,this.player.speed=t,setTimeout((()=>this.speedDown(t)),1e3)):this.player.speed=5}invincible(){this.effectDuration>0?(this.effectDuration--,this.player.invincible=!0,this.opacityChanged||this.player.elem.animate(this.invincibleAnimation,{duration:1e3*(this.effectDuration+1)}),this.opacityChanged=!0,setTimeout((()=>this.invincible()),1e3)):(this.player.invincible=!1,this.opacityChanged=!1,this.player.elem.classList.remove("invincible"))}timeUp(t){return t+this.timeAdded}magnet(t){const e=setInterval((()=>{for(let e=0;e<t.length;e++)t[e].moveTowardsPlayer()}),10);setTimeout((()=>{clearInterval(e)}),5e3)}}const h=20,d=80;class l{constructor(){this.invincible=!1,this.position={top:300,left:550},this.speed=5,this.elem=document.getElementById("player"),this.elem.style.top=`${this.position.top}px`,this.elem.style.left=`${this.position.left}px`,document.getElementById("container-player").appendChild(this.elem)}move(e){let i=!0;return e===t.UpLeft&&(i=this.moveUpLeft()),e===t.UpRight&&(i=this.moveUpRight()),e===t.DownLeft&&(i=this.moveDownLeft()),e===t.DownRight&&(i=this.moveDownRight()),e===t.Up&&(i=this.moveUp()),e===t.Down&&(i=this.moveDown()),e===t.Left&&(i=this.moveLeft()),e===t.Right&&(i=this.moveRight()),this.elem.style.top=`${this.position.top}px`,this.elem.style.left=`${this.position.left}px`,i}moveUpLeft(){return!(this.position.top<=h||(this.position.top-=this.speed,this.position.left<=h||(this.position.left-=this.speed,0)))}moveUpRight(){return!(this.position.top<=h||(this.position.top-=this.speed,this.position.left>=window.innerWidth-h-d||(this.position.left+=this.speed,0)))}moveDownLeft(){return!(this.position.top>=window.innerHeight-h-d||(this.position.top+=this.speed,this.position.left<=h||(this.position.left-=this.speed,0)))}moveDownRight(){return!(this.position.top>=window.innerHeight-h-d||(this.position.top+=this.speed,this.position.left>=window.innerWidth-h-d||(this.position.left+=this.speed,0)))}moveUp(){return!(this.position.top<=h||(this.position.top-=this.speed,0))}moveDown(){return!(this.position.top>=window.innerHeight-h-d||(this.position.top+=this.speed,0))}moveLeft(){return!(this.position.left<=h||(this.position.left-=this.speed,0))}moveRight(){return!(this.position.left>=window.innerWidth-h-d||(this.position.left+=this.speed,0))}get getPosition(){return this.position}}class p{constructor(){this.sounds=[],this.sounds.push(new Audio("../assets/sounds/gameover.wav")),this.sounds.push(new Audio("../assets/sounds/coin.wav")),this.sounds.push(new Audio("../assets/sounds/gamewon.wav")),this.sounds.push(new Audio("../assets/sounds/background-music.mp3"))}playSound(t,e=!1,i=.5){this.sounds.forEach((s=>{s.src.includes(t)&&(s.loop=e,s.volume=i,s.play())}))}}class m{constructor(t){this.gamepad=t}update(){return{direction:this.directionGamepad(this.gamepad),start:this.gamepad.buttons[0].pressed,restart:this.gamepad.buttons[1].pressed}}directionGamepad(e){return e.axes[0]<-.5&&e.axes[1]<-.5?t.UpLeft:e.axes[0]>.5&&e.axes[1]<-.5?t.UpRight:e.axes[0]<-.5&&e.axes[1]>.5?t.DownLeft:e.axes[0]>.5&&e.axes[1]>.5?t.DownRight:e.axes[0]<-.5?t.Left:e.axes[0]>.5?t.Right:e.axes[1]<-.5?t.Up:e.axes[1]>.5?t.Down:t.None}}class c{constructor(){this.state={up:!1,down:!1,left:!1,right:!1},this.setUpListeners()}setUpListeners(){document.addEventListener("keydown",(t=>{"ArrowUp"===t.key?this.state.up=!0:"ArrowDown"===t.key?this.state.down=!0:"ArrowLeft"===t.key?this.state.left=!0:"ArrowRight"===t.key&&(this.state.right=!0)})),document.addEventListener("keyup",(t=>{"ArrowUp"===t.key?this.state.up=!1:"ArrowDown"===t.key?this.state.down=!1:"ArrowLeft"===t.key?this.state.left=!1:"ArrowRight"===t.key&&(this.state.right=!1)}))}directionKeyboard(){return this.state.up&&this.state.left?t.UpLeft:this.state.up&&this.state.right?t.UpRight:this.state.down&&this.state.left?t.DownLeft:this.state.down&&this.state.right?t.DownRight:this.state.up?t.Up:this.state.down?t.Down:this.state.left?t.Left:this.state.right?t.Right:t.None}update(){return{direction:this.directionKeyboard()}}}var u=function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function r(t){try{h(s.next(t))}catch(t){n(t)}}function a(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,a)}h((s=s.apply(t,e||[])).next())}))};class f{constructor(){this.SCORES="scores",this.DBNAME="kirby-game",this.createObjectStore()}createObjectStore(){this.request=window.indexedDB.open(this.DBNAME,1),this.request.onerror=()=>{console.log("Error creating ObjectStore")},this.request.onupgradeneeded=()=>{this.db=this.request.result;const t=this.db.createObjectStore(this.SCORES,{keyPath:"id",autoIncrement:!0});t.createIndex("name","name",{unique:!1}),t.createIndex("score","score",{unique:!1}),t.createIndex("time","time",{unique:!1}),t.createIndex("date","date",{unique:!1})}}addScore(t,e,i){return u(this,void 0,void 0,(function*(){try{yield this.addScoreToDatabase(t,e,i)}catch(t){console.log("Error adding score")}}))}addScoreToDatabase(t,e,i){return new Promise(((s,o)=>{this.db=this.request.result;const n=this.db.transaction([this.SCORES],"readwrite").objectStore(this.SCORES),r=new Date,a=n.add({name:t,score:e,time:i,date:r});a.onsuccess=()=>{console.log("Score added"),s()},a.onerror=()=>{console.log("Error adding score"),o()}}))}getTop10Scores(){return u(this,void 0,void 0,(function*(){try{return yield this.getTop10ScoresFromDatabase()}catch(t){return console.log("Error getting top 10 scores"),[]}}))}getTop10ScoresFromDatabase(){return new Promise(((t,e)=>{this.db=this.request.result;const i=this.db.transaction([this.SCORES],"readonly").objectStore(this.SCORES).index("score").getAll(15);i.onsuccess=()=>{const e=i.result;e.sort(((t,e)=>t.time-e.time)),t(e.slice(0,10))},i.onerror=()=>{console.log("Error getting top 10 scores"),e([])}}))}}var g=function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function r(t){try{h(s.next(t))}catch(t){n(t)}}function a(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,a)}h((s=s.apply(t,e||[])).next())}))};class y{constructor(){this.hasAddedScore=!1,this.indexedDb=new f}addScoreToLeaderboard(t,e){return g(this,void 0,void 0,(function*(){const i=document.getElementById("btn-add-score"),s=document.getElementById("name").value;""!==s&&(this.hasAddedScore||(yield this.indexedDb.addScore(s,15,t-e),this.hasAddedScore=!0,yield this.displayLeaderboard(".leaderboard-table-body-won"),i.disabled=!0,i.style.backgroundColor="grey"))}))}displayLeaderboard(t){return g(this,void 0,void 0,(function*(){const e=yield this.indexedDb.getTop10Scores();this.insertIntoTable(e,t)}))}insertIntoTable(t,e){const i=document.querySelector(e);i.innerHTML="";for(let e=0;e<t.length;e++){const s=i.insertRow(e),o=s.insertCell(0),n=s.insertCell(1),r=s.insertCell(2),a=s.insertCell(3);o.innerHTML=(e+1).toString(),n.innerHTML=t[e].name,r.innerHTML=(t[e].time/10).toString(),a.innerHTML=t[e].date.toLocaleDateString("da-DK",{month:"2-digit",year:"numeric",day:"2-digit"})}i.insertRow(0).innerHTML="<th></th><th>Name</th><th>Time (s)</th><th>Date</th>"}}var w=function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function r(t){try{h(s.next(t))}catch(t){n(t)}}function a(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,a)}h((s=s.apply(t,e||[])).next())}))};class v{constructor(){this.gameFinished=!0,this.timer=600,this.timeLeft=this.timer,this.score=0,this.isMusicPlaying=!1,this.initGame(),this.spawnItems(this.playerObject),this.setUpListeners(),this.update()}initGame(){var t;this.playerObject=new l,this.player=this.playerObject,this.background=new s,this.itemsArea=null===(t=this.background.elem)||void 0===t?void 0:t.getBoundingClientRect(),this.keyboardNavigation=new c,this.leaderboard=new y,this.defaultItems=new Array,this.randomItems=new Array,this.audioManager=new p}updateStartScreen(){this.navigation.update().start&&this.startGame()}update(){const t=this.getGamepad();this.navigation=t?new m(t):this.keyboardNavigation,this.gameFinished&&this.updateStartScreen(),this.navigation.update().restart&&this.restartGame(),this.gameFinished||(this.checkCollision(),this.checkIfItemsAreCollected(),this.movePlayerItemsAndBackground(this.navigation.update().direction)),window.requestAnimationFrame((()=>this.update()))}spawnItems(t){if(this.itemsArea){for(let i=0;i<15;i++)this.defaultItems.push(new r(this.itemsArea,e.Coin,t)),this.defaultItems[i].game=this;for(let t=15;t<20;t++)this.defaultItems.push(new r(this.itemsArea,e.Bomb)),this.defaultItems[t].game=this;for(let e=0;e<5;e++){const i=Math.floor(5*Math.random());this.randomItems.push(new a(this.itemsArea,i,t)),this.randomItems[e].game=this}}}setUpListeners(){const t=document.getElementById("btn-add-score");null==t||t.addEventListener("click",(()=>this.leaderboard.addScoreToLeaderboard(this.timer,this.timeLeft)));const e=document.querySelector(".btn-game-start");null==e||e.addEventListener("click",(()=>this.startGame()))}startGame(){const t=document.querySelector(".start-screen"),e=document.querySelector(".score-display");t.style.display="none",e.style.display="flex",this.isMusicPlaying||(this.audioManager.playSound("background-music",!0,.5),this.isMusicPlaying=!0),this.gameFinished=!1,this.update(),this.timerUpdate()}timerUpdate(){if(!this.gameFinished){this.timeLeft--;const t=document.getElementById("timer");if(t.innerHTML=(this.timeLeft/10).toString(),this.timeLeft<=100&&(t.style.color="red"),this.timeLeft<=0)return void this.gameOver();setTimeout((()=>this.timerUpdate()),100)}}movePlayerItemsAndBackground(e){let i=!0;if(e!==t.None){if(!this.player.move(e)){i=this.background.move(e);for(let t=0;t<this.defaultItems.length;t++)this.defaultItems[t].move(e);for(let t=0;t<this.randomItems.length;t++)this.randomItems[t].move(e)}i||this.gameOver()}}checkIfItemsAreCollected(){0===this.defaultItems.filter((t=>t.itemType===e.Coin)).length&&this.gameWon()}checkCollision(){for(let t=0;t<this.randomItems.length;t++)o.hitDetection(this.player.elem,this.randomItems[t].elem)&&(this.randomItems[t].itemType===i.PowerUpSpeed?this.randomItems[t].speedUp():this.randomItems[t].itemType===i.PowerUpInvincible?this.randomItems[t].invincible():this.randomItems[t].itemType===i.PowerDownSpeed?this.randomItems[t].speedDown():this.randomItems[t].itemType===i.PowerUpTime?this.timeLeft=this.randomItems[t].timeUp(this.timeLeft):this.randomItems[t].itemType===i.PowerUpMagnet&&this.randomItems[t].magnet(this.defaultItems),this.itemRemove(this.randomItems,t));for(let t=0;t<this.defaultItems.length;t++)o.hitDetection(this.player.elem,this.defaultItems[t].elem)&&(this.defaultItems[t].itemType===e.Bomb?this.playerObject.invincible?this.itemRemove(this.defaultItems,t):(this.audioManager.playSound("gameover"),this.gameOver()):this.defaultItems[t].itemType===e.Coin&&(this.audioManager.playSound("coin",!1,.2),this.defaultItems[t].itemCollected(),this.itemRemove(this.defaultItems,t)))}itemRemove(t,e){t[e].elem.remove(),t.splice(e,1)}gameOver(){return w(this,void 0,void 0,(function*(){const t=document.getElementById("game-over");this.gameFinished=!0,t.style.display="flex",this.audioManager.playSound("gameover"),yield this.leaderboard.displayLeaderboard(".leaderboard-table-body-lost")}))}gameWon(){return w(this,void 0,void 0,(function*(){document.getElementById("game-won").style.display="flex",this.gameFinished=!0,this.audioManager.playSound("gamewon",!1,1),this.displayScore(),yield this.leaderboard.displayLeaderboard(".leaderboard-table-body-won")}))}restartGame(){console.log("restart"),window.location.reload()}displayScore(){document.querySelector(".winner-time").innerHTML=`Your time: ${(this.timer-this.timeLeft)/10}s`}getGamepad(){const t=navigator.getGamepads();return t.some((t=>null!==t))?t.find((t=>null!==t)):null}}document.addEventListener("DOMContentLoaded",(()=>{new v}))})();