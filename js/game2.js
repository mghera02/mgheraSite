var currDir="right";
var beginning=1;
var bodyLength=2;
var collected=false;
var appleX;
var appleY;
var nextTimeDontBlue;
var oldOldLastX=-2;
var oldOldLastY=-2;
var score=0;

//beginning popup 1
document.getElementById("popup0").style.display= "block";
if (window.orientation==0 || window.orientation==180){
	document.getElementById("info0").innerHTML = "TO DECREASE LAG, PLEASE USE A NON-MOBILE DEVICE. Press below to start.";
}else{
	document.getElementById("info0").innerHTML = "Press below to start";
}


//creates grid and array of elements
var allBlocksArray = new Array(196);

var i;
var rowArray = new Array(14);
for(i=0;i<14;i++){
	rowArray[i]= new Array(14);
}
var j;
var k;
for(j=0;j<14;j++){
	tr=document.createElement('tr');
	gameScreen.appendChild(tr);
	for(k=0;k<14;k++){
		td=document.createElement('td');
		tr.appendChild(td);
		makeBlockEmpty(j,k);
	}
}



//creates starting body
allBlocksArray[182+14*(7)+6-1].style.backgroundColor="green";
allBlocksArray[182+14*(7)+7-1].style.backgroundColor="green";

function startGame(){
document.getElementById("popup0").style.display= "none";

//key presses
document.body.onkeydown = function(e){
	if(e.keyCode == 37){
		prevDir=currDir;
		currDir="left";
	}
	if(e.keyCode == 38){
		prevDir=currDir;
		currDir="up";
	}
	if(e.keyCode == 39){
		prevDir=currDir;
		currDir="right";
	}
	if(e.keyCode == 40){
		prevDir=currDir;
		currDir="down";
	}
}



//creates head position
var snakeX = new Array(196);
var snakeY = new Array(196);
snakeX[0]=7;
snakeY[0]=7;
snakeX[1]=6;
snakeY[1]=7;

var oldSnakeX = new Array(196);
var oldSnakeY = new Array(196);

oldSnakeX[0]=6;
oldSnakeY[0]=7;


trackBodyMovement = setInterval(function(){

	//movement of body
	var b;
	for(b=1; b<bodyLength;b++){
		if(snakeX[b]!=null){
			oldSnakeX[b]=snakeX[b];
			oldSnakeY[b]=snakeY[b];
		}
		snakeX[b]=oldSnakeX[b-1];
		snakeY[b]=oldSnakeY[b-1];
		allBlocksArray[182+14*(snakeY[b])+snakeX[b]-1].style.backgroundColor="green";

		if(b==bodyLength-1){
			allBlocksArray[182+14*(oldSnakeY[b])+oldSnakeX[b]-1].style.backgroundColor="green";
			allBlocksArray[182+14*(oldSnakeY[b])+oldSnakeX[b]-1].id = "emptyBlock";
			allBlocksArray[182+14*(oldSnakeY[b])+oldSnakeX[b]-1].id = "emptyBlock";
			try{
				allBlocksArray[182+14*(snakeY[0])+snakeX[0]-1].style.backgroundImage="url('none')";
			}catch (error){
				//off bounds death
				popup();
			}
			
		}
	}

		
	//off bounds death
	if(snakeX[0]>14){
		popup();
	}
	if(snakeY[0]>14){
		popup();
	}
	if(snakeX[0]<1){
		popup();
	}
	if(snakeY[0]<1){
		popup();
	}


	//move snake head in correct direction
	if(currDir=="left"){
		oldSnakeX[0]=snakeX[0];
		oldSnakeY[0]=snakeY[0];
		snakeX[0]--;
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].setAttribute("id","picBlock");
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].style.backgroundImage="url('gameMedia/strawberry.png')";
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].style.backgroundColor="green";
		frontPic("left");
	}
	if(currDir=="up"){
		oldSnakeX[0]=snakeX[0];
		oldSnakeY[0]=snakeY[0];
		snakeY[0]--;
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].setAttribute("id","picBlock");
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].style.backgroundImage="url('gameMedia/strawberry.png')";
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].style.backgroundColor="green";
		frontPic("up");
	}
	if(currDir=="right"){
		oldSnakeX[0]=snakeX[0];
		oldSnakeY[0]=snakeY[0];
		snakeX[0]++;
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].setAttribute("id","picBlock");
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].style.backgroundImage="url('gameMedia/strawberry.png')";
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].style.backgroundColor="green";
		frontPic("right");
	}
	if(currDir=="down"){
		oldSnakeX[0]=snakeX[0];
		oldSnakeY[0]=snakeY[0];
		snakeY[0]++;
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].setAttribute("id","picBlock");
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].style.backgroundImage="url('gameMedia/strawberry.png')";
		allBlocksArray[182+14*(oldSnakeY[0])+oldSnakeX[0]-1].style.backgroundColor="green";
		frontPic("down");
	}	

	//apple collection
		if(!collected){
			appleX=Math.floor(Math.random() * 14)+1;
			appleY=Math.floor(Math.random() * 14)+1;
			var p;
			for(p=0;p<196;p++){
				if(appleX==snakeX[p] && appleY==snakeY[p]){
					p=0;
					appleX=Math.floor(Math.random() * 14)+1;
					appleY=Math.floor(Math.random() * 14)+1;
				}
			}
			//console.log(appleX);
			//console.log(appleY);
			//allBlocksArray[182+14*(appleY)+appleX-1].style.backgroundColor="red";
			allBlocksArray[182+14*(appleY)+appleX-1].setAttribute("id","picBlock");
			allBlocksArray[182+14*(appleY)+appleX-1].style.backgroundImage="url('gameMedia/strawberryPoint.png')";
			collected=true;
		}
		if(snakeX[0]==appleX && snakeY[0]==appleY){
			bodyLength++;
			score++;
			snakeX[bodyLength-1]=oldSnakeX[bodyLength-2];
			snakeY[bodyLength-1]=oldSnakeY[bodyLength-2];
			nextTimeDontBlue=true;
			collected=false;
		}
},160);	



//collision
setTimeout(() => {  

	trackCollision = setInterval(function(){

		var q;
		for(q=1;q<196;q++){
			if(snakeX[0]==snakeX[q] && snakeY[0]==snakeY[q]){
				popup();
			}
		}

	},50);		


 }, 3000);


//animate head
function frontPic(dir){
	allBlocksArray[182+14*(snakeY[0])+snakeX[0]-1].setAttribute("id","picBlock");
	if(dir=="left"){
		allBlocksArray[182+14*(snakeY[0])+snakeX[0]-1].style.backgroundImage="url('gameMedia/walkleft.png')";
	}
	else if(dir=="up"){
		allBlocksArray[182+14*(snakeY[0])+snakeX[0]-1].style.backgroundImage="url('gameMedia/upAnim.gif')";
	}
	else if(dir=="right"){
		allBlocksArray[182+14*(snakeY[0])+snakeX[0]-1].style.backgroundImage="url('gameMedia/walkright.png')";
	}
	else if(dir=="down"){
		allBlocksArray[182+14*(snakeY[0])+snakeX[0]-1].style.backgroundImage="url('gameMedia/downAnim.gif')";
	}
}

function makeBlockOcc(j,k){
	rowArray[j][k]=1;
}



function popup(){
	var currHigh=localStorage.getItem('highscoreSnake');
	if(currHigh<score){
		localStorage.setItem('highscoreSnake', score);
	}
	clearInterval(trackBodyMovement);
	document.getElementById("content").innerHTML="Your Score was "+score; 
	document.getElementById("content2").innerHTML="High score:"+currHigh; 
	document.getElementById("popup").style.display="block";
	document.getElementById("greyBackground").style.display="block";
}
}

function makeBlockEmpty(j,k){
	temp=document.createElement('div');
	temp.setAttribute("id","emptyBlock")
	td.appendChild(temp);
	rowArray[j][k]=0;
	allBlocksArray.push(temp);
}


function goUp(){
	prevDir=currDir;
	currDir="up";
}
function goRight(){
	prevDir=currDir;
	currDir="right";
}
function goDown(){
	prevDir=currDir;
	currDir="down";
}
function goLeft(){
	prevDir=currDir;
	currDir="left";
}