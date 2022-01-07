var power=getCookie("power");
var playing=false;
var mouseClicks=0;

document.click = () => {
    mouseClicks++;
}

if(power=="on"){
  playMusic();
}

function togglePower(){
  mouseClicks++;
  if(power=="on"){
    //document.cookie = "power=off; expires=0; path=/";
    power="off";
    //make power button red
    document.getElementById("power").style.boxShadow = "0px 0px 1.5vw rgb(255,0,0,.65)";
    document.getElementById("power-inner").style.boxShadow = "0px 0px 1.5vw rgb(255,0,0,.65)";
    location.reload();
  }else{
    //document.cookie = "power=on; expires=0; path=/";
    power="on";
    //makes power button green
    document.getElementById("power").style.boxShadow = "0px 0px 1.5vw rgb(0,255,0,.65)";
    document.getElementById("power-inner").style.boxShadow = "0px 0px 1.5vw rgb(0,255,0,.65)";
    playMusic();
    }
}

/*function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}*/

function playMusic(){
  if(mouseClicks==0){
    //document.cookie = "power=off; expires=0; path=/";
    location.reload();
  }
  //background music
  playing=true;
  var audio0 = new Audio("otherMaterials/v3.mp3");
  audio0.play(); 
}
            
//declare class for hover over sound
let specifics = document.querySelectorAll(".nav__btn");

//array of sounds for each nav button
let audios = ["http://www.foxysite.de/StarWars/LUKE04.WAV","http://www.foxysite.de/StarWars/LUKE04.WAV","http://www.foxysite.de/StarWars/LUKE04.WAV","http://www.foxysite.de/StarWars/LUKE04.WAV"];

//plays sound on hover
for(i = 0; i < specifics.length; i++){
  let specific = specifics[i];
  let audio = document.createElement("audio");
  audio.src = audios[i];
  document.body.appendChild(audio);

  specific.onmouseover = () => {
    //console.log(playing);
    if(playing==true){
      audio.play();
    }
  }
  specific.onmouseout = () => {
    audio.pause();
    audio.currentTime = 0;
  }
}