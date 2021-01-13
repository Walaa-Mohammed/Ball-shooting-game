
var startBtnEl = document.getElementById( 'start-game' );
var container = document.getElementById( 'container' );
var scoreEl = document.getElementById( 'score' );
var missedScoreEl = document.getElementById( 'missed-score' );
var shootingAudio = document.getElementById( 'shooting-audio' );
var missedAudio = document.getElementById( 'missed-audio' );
var backgroundMusic = document.getElementById( 'background-music' );

	
var score = 0;
var  missedCount = 0;
var ballCount = 1000;
var dropBallSpeed = 0.5; // At what speed the balls should drop.
var dropBallFrequency=500; // At what intervals next ball should drop after the previous one.

var containerHeight = container.offsetHeight;
		/*
		this.containerHeight = this.container.offsetHeight;*/

		startBtnEl.addEventListener( "click", function startGame() {
			
		backgroundMusic.play();
	   startBtnEl.removeEventListener( 'click', startGame );
		startBtnEl.remove();

		for( var i = 0; i < ballCount; i++  ) {

			const leftPos = getRandomNo( 1000 );
			const endPos = containerHeight + 50;
			var intervalTime = getRandomNo( 100 ) + ( i * dropBallFrequency );


			const interval = setInterval( () => 
			{
				const ballEl = createBall();
				dropBall( ballEl, leftPos, endPos );
				clearInterval( interval );
			}, intervalTime )

		}
	});

		function createBall() {
		const ballEl = document.createElement( 'div' );
		const points = getRandomNo( 100 );

		ballEl.classList.add( 'ball' );
		ballEl.textContent = points.toString();
		ballEl.setAttribute( 'data-points', points );

		ballEl.addEventListener( "mouseover", function shootBall( event ) {

			const targetEl = event.target;
			const points = targetEl.getAttribute( 'data-points' );
			const intervalId = parseInt( targetEl.getAttribute( 'data-interval-id' ) );
			clearInterval( intervalId );

			addScore( points );
		

			shootingAudio.play();
	
			targetEl.remove();
		});

		container.appendChild( ballEl );

		return ballEl;

	}

	function dropBall( ballEl, leftPos, endPos ) {
		let currentTop = 0;

		ballEl.style.left = leftPos + 'px';
		ballEl.style.backgroundColor = '#' + getRandomNo( 1000 );

		const interval = setInterval( function()  {
			if ( endPos === currentTop ) {
				clearInterval( interval );
				missedAudio.play();
				ballEl.remove();
				missedCount += 1;	
				missedScoreEl.textContent = missedCount.toString();
				if(missedCount ==10)
				{
					alert("Game Over");
					document.location.reload();
					clearInterval( interval );
				}
			

			} else {
				currentTop++;
				ballEl.style.top = currentTop + 'px';
			}
		},dropBallSpeed );

		ballEl.setAttribute( 'data-interval-id', interval );

	}


	

	

	function addScore( points ) {
		score += parseInt( points );
		
		scoreEl.textContent = score;
	//	scoreEl.textContent = score.toString();
		//console.log(scoreEl.textContent);

		/*var x = scoreEl.textContent.valueOf();
		if(x>200)
		{dropBallFrequency = 50;}*/
		return score;
		
		
	}

function getRandomNo( range ) {
		return Math.floor( Math.random() * range );
	}

	
	