
				var character=document.getElementById("character");
				var gameScreen=document.getElementById("gameScreen");
				var points=0;
				var array=[];
				var i;
				var x;
				var pos=650;
				var time = 1;
				var animationNum=0;
				var pointsCreator= window.setInterval(addPoints, 100);
				var animationBackgroundNum=1;

				//makes obstacles randomly
				timeout();
				function timeout() {
				    createBlock=setTimeout(function () {
				        if(time<9){
					        console.log(time-1);
					   	  	x=time-1;
							x=document.createElement('div');
							x.setAttribute("id","normalBlock")
							gameScreen.appendChild(x);
							array.push(x);
							//make obstacle image inside block
							y=document.createElement('img');
							y.setAttribute("id","obstacleImage");
							x.appendChild(y);
							y.src="gameMedia/obstacle.png";
					      	time++;
					      	//makes sure blocks are far away from each other
					      	checkCloseOuter();
					        // Then recall the parent function to
					        // create a recursive loop.
					        timeout();
				    	}
				    }, Math.floor(Math.random() * (3000 - 900) ) + 900);
				}


				function checkCloseOuter(){
				checkClose = setInterval(function(){
					var i;
					for(i=0;i<time-1;i++){
						var blockLeft= array[i].getBoundingClientRect();
							for(a=0;a<time-1;a++){
								if(
									(blockLeft.left-array[a].getBoundingClientRect().left<250 && blockLeft.left-array[a].getBoundingClientRect().left>0) 
									|| 
									(blockLeft.left-array[a].getBoundingClientRect().left>-250 && blockLeft.left-array[a].getBoundingClientRect().left<0) 
									){
									var temp=a;
									console.log("i should move: "+ (temp));
									console.log("array before:"+array);
									array[a].remove();
									array.splice(temp, 1);
									console.log("array after:"+array);
									temp=document.createElement('div');
									temp.setAttribute("id","normalBlock")
									gameScreen.appendChild(temp);
									array.push(temp);
									//make obstacle image inside block
									y=document.createElement('img');
									y.setAttribute("id","obstacleImage");
									temp.appendChild(y);
									y.src="gameMedia/obstacle.png";
								}
							}
					}
				},1);
			}


			
				//jumping
				document.body.onkeydown = function(e){
				    if(e.keyCode == 32){
				        jump();
				    }
				}

				function jump(){
					if(character.classList != "animate"){
						document.getElementById('jumpSound').play();
						character.classList.add("animate");

						setTimeout(function(){
							character.classList.remove("animate");
						},450);
					}
				}


				//game over
				checkDead = setInterval(function(){
					var characterTop=parseInt(window.getComputedStyle(character).getPropertyValue("top"));
					if(time>1){
						var block1=array[0].getBoundingClientRect();
						if((block1.left<59 && block1.left>-20 && characterTop>180)){
							loser();
						}
					}
					if(time>2){
						var block2=array[1].getBoundingClientRect();
						if((block2.left<59 && block2.left>-20 && characterTop>180)){
							loser();
						}
					}
					if(time>3){
						var block3=array[2].getBoundingClientRect();
						if((block3.left<59 && block3.left>-20 && characterTop>180)){
							loser();
						}
					}
					if(time>4){
						var block4=array[3].getBoundingClientRect();
						if((block4.left<59 && block4.left>-20 && characterTop>180)){
							loser();
						}
					}
					if(time>5){
						var block5=array[4].getBoundingClientRect();
						if((block5.left<59 && block5.left>-20 && characterTop>180)){
							loser();
						}
					}
					if(time>6){
						var block6=array[5].getBoundingClientRect();
						if((block6.left<59 && block6.left>-20 && characterTop>180)){
							loser();
						}
					}	
					if(time>7){
						var block7=array[6].getBoundingClientRect();
						if((block7.left<59 && block7.left>-20 && characterTop>180)){
							loser();
						}
					}
					if(time>8){
						var block8=array[7].getBoundingClientRect();
						if((block8.left<59 && block8.left>-20 && characterTop>180)){
							loser();
						}
					}
				},1);

				function loser(){
					clearInterval(pointsCreator);
					var currHigh=localStorage.getItem('highscore');
					if(currHigh<points){
						localStorage.setItem('highscore', points);
					}
					clearInterval(changeBackground);
					clearInterval(changeCharacter);
					clearInterval(createBlock);
					clearInterval(checkDead);
					for(a=0;a<time-1;a++){
						array[a].style.animation="none";
					}	
					document.getElementById('dieSound').play();
					setTimeout(function(){ 
						document.getElementById("popup").style.display="block";
						document.getElementById("darkBackground").style.display="block";
						document.getElementById("info").innerHTML="You lost! Your score was:"+points; 
					}, 500);
					
				}

				//points
				function addPoints(){
					points++;
					document.getElementById("points").innerHTML = "Points:"+points;
				}


				//make character animate
				changeCharacter();
				function changeCharacter(){
					changeCharacter=setInterval(function(){
						if(animationNum==1){
							document.getElementById("characterInside").src="gameMedia/character3.png";
							animationNum++;
						}else if (animationNum==2){
							document.getElementById("characterInside").src="gameMedia/character2.png";
							animationNum++;
						}else{
							document.getElementById("characterInside").src="gameMedia/character1.png";
							animationNum=1;
						}
					}, 125);
				}

				//make background animate
				changeBackground();
				function changeBackground(){
					changeBackground=setInterval(function(){
						if(animationBackgroundNum==1){
							document.getElementById("gameScreenBackground").src="gameMedia/background1.png";
							animationBackgroundNum++;
						}else if (animationBackgroundNum==2){
							document.getElementById("gameScreenBackground").src="gameMedia/background2.png";
							animationBackgroundNum++;
						}else{
							document.getElementById("gameScreenBackground").src="gameMedia/background3.png";
							animationBackgroundNum=1;
						}
					}, 200);
				}

				document.getElementById("highScore").innerHTML="High Score: "+ localStorage.getItem('highscore');

				

				//make obstacles onlu visible in gamescreen
				checkVisible = setInterval(function(){
					if(time>1){
						var block1=array[0].getBoundingClientRect();
						if((block1.left<650 && block1.left>-20)){
							array[0].style.visibility="visible";
						}else{
							array[0].style.visibility="hidden";
						}
					}
					if(time>2){
						var block2=array[1].getBoundingClientRect();
						if((block2.left<650 && block2.left>-20)){
							array[1].style.visibility="visible";
						}else{
							array[1].style.visibility="hidden";
						}
					}
					if(time>3){
						var block3=array[2].getBoundingClientRect();
						if((block3.left<650 && block3.left>-20)){
							array[2].style.visibility="visible";
						}else{
							array[2].style.visibility="hidden";
						}
					}
					if(time>4){
						var block4=array[3].getBoundingClientRect();
						if((block4.left<650 && block4.left>-20)){
							array[3].style.visibility="visible";
						}else{
							array[3].style.visibility="hidden";
						}
					}
					if(time>5){
						var block5=array[4].getBoundingClientRect();
						if((block5.left<650 && block5.left>-20)){
							array[4].style.visibility="visible";
						}else{
							array[4].style.visibility="hidden";
						}
					}
					if(time>6){
						var block6=array[5].getBoundingClientRect();
						if((block6.left<650 && block6.left>-20)){
							array[5].style.visibility="visible";
						}else{
							array[5].style.visibility="hidden";
						}
					}	
					if(time>7){
						var block7=array[6].getBoundingClientRect();
						if((block7.left<650 && block7.left>-20)){
							array[6].style.visibility="visible";
						}else{
							array[6].style.visibility="hidden";
						}
					}
					if(time>8){
						var block8=array[7].getBoundingClientRect();
						if((block8.left<650 && block8.left>-20)){
							array[7].style.visibility="visible";
						}else{
							array[7].style.visibility="hidden";
						}
					}
				},1);

				/*var speed=0;
				increaseSpeed = setInterval(function(){
					var i;
					for(i=1;i<8;i++){
						if(time>8){
							if(array[i].getBoundingClientRect()>650){
								array[i].style.animation="block "+3.7-speed+"s linear infinite";
							}
						}
					}
					if(time>8){
						speed=speed-.1;
						//console.log=""
					}
					
				},5000);*/

			