'use strict'


/***********************************************************************
 * 
 * @author Reece Birchmore
 * @publisher GitHub
 * - View more of my works at https://reecebirchmore.co.uk/
 * 
 * This is free to use, so long as it is used for terms that do not
 * go against githubs own policies. Customise the panel as you wish, 
 * I only ask this authorship be left in place. There are no markings
 * or identifying features on the panel itsel.
 * 
 * 
 *********************************************************************/

let clientYNew;
let clientY;
let newPositionY;
let oldPosition = 0;
let swipeDirection;
let snapPosition = 0; //current staged position of the element
let stage0Size, stage1Size, stage2Size;



var panelJS = function(config) {
  //------------------------------------------------------------------
  const opt = {
      elInitID: config.elementID || 'panelJS',
      transitionSpeed: config.transitionSpeed, // Transition Speed after releasing 
      // opacity: config.opacity, // Enable Background Opacity
      // scaleOut: config.scaleOut, // Enable Scaleout
      stage1: (config.stage1 === true) ? config.stage1 : false, // Enable Middle Stage
      stage2: (config.stage2 === true) ? config.stage2 : false, // Enable Top Stage
      stage0Size: (-config.stage0Size <= 0 && -config.stage0Size >= -100) ? -config.stage0Size : -10, //the size (in percent) taken by the initial stage
      stage1Size: (-config.stage1Size >= -100 && -config.stage1Size <= 0) ? -config.stage1Size : -50, //the size (in percent) taken by the middle stage
      stage2Size: (-config.stage2Size >= -100 && -config.stage2Size <= 0) ? -config.stage2Size : -100, //the size (in percent) taken by the final stage
    };
  //------------------------------------------------------------------

  const pc = document.querySelector("#pageContent"); //declare the content on the webpage
  const el = document.querySelector('#panelJS'); //declare the element in use
  startup();



  function startup() { 
    el.addEventListener("touchstart", touchStart, {passive: true});
    el.addEventListener("touchmove", touchMove, {passive: true});
    el.addEventListener("touchend", touchEnd, {passive: true});
    el.addEventListener("touchcancel", cancelTouch, {passive: true});
    stage0Size = -(opt.stage0Size / 100); //work out the size for the closed state
    stage1Size = -(opt.stage1Size / 100); //work out the size for the half state
    stage2Size = -(opt.stage2Size / 100); //work out the size for the full state
    closeFull(); //Run the initial start, make the element display as authorised by config
  }



  /*************************************************************************
   * 
  * This is the function that will sort out the sizing of elements dependant
  * on the size of the screen or configured options
  * 
  **************************************************************************/


  function coolMathGames(stageSize) {
    oldPosition = window.innerHeight * stageSize; //determine the position for snapped element
  }

  /**************************************************************************
  * This is activated whenever the user presses a finger on the screen
  * we will take the following information:
  * - The current position of the object, relative to the screen size
  * - The initial touching point (where the finger is first placed)
  *  
  * We use this information as the initial setup for the final touchend 
  * function to allow the logic to determine where the element should snap
  **************************************************************************/

  function touchStart(e) {
    el.style.webkitTransition = "0s"; //reset transition
    el.style.transition = "0s"; //reset transition
    clientY = e.touches[0].clientY; //initial touch point
  }


  function touchMove(e) {
  clientYNew = e.touches[0].clientY; //new touch position coordinates
  newPositionY = oldPosition + (clientY - clientYNew); //old position of the element + the difference in touch points
      //Define the limits of the user swiping to prevent the card coming off the screen
      if(newPositionY > -(opt.stage0Size) && newPositionY < window.innerHeight) {
        el.style.webkitTransform = 'translateY(' + -newPositionY + 'px)';
        el.style.transform = 'translateY(' + -newPositionY + 'px)';
        el.style.mozTransform = 'translateY(' + -newPositionY + 'px)';
        el.style.oTransform = 'translateY(' + -newPositionY + 'px)';
    } else {
      // Out of bounds, do not draw
    }
  }


  /**************************************************************************
  * 
  * Each stage described below
  * 
  **************************************************************************/

  //stage 2 expansion
  function expandFull() {
    snapPosition = 2;
    el.style.transform = 'translateY(' + opt.stage2Size + '%)';
    el.style.backgroundColor = (el.style.backgroundColor === 'white') ? 'red' : 'white';
    coolMathGames(stage2Size);
  }

  //stage 1 expansion
  function expandHalf() {
    snapPosition = 1;
    el.style.transform = 'translateY(' + opt.stage1Size + '%)';
    el.style.webkitTransform = 'translateY(' + opt.stage1Size + '%)';
    el.style.backgroundColor = (el.style.backgroundColor === 'white') ? 'green' : 'white';
    coolMathGames(stage1Size);
  }

  //stage 0 expansion
  function closeFull() {
    snapPosition = 0;
    el.style.transform = 'translateY(' + opt.stage0Size + '%)';
    el.style.webkitTransform = 'translateY(' + opt.stage0Size + '%)';
    el.style.backgroundColor = (el.style.backgroundColor === 'white') ? 'blue' : 'white';
    coolMathGames(stage0Size);
  }




  /**************************************************************************
  * This is where the touch ends, 
  * In here we can determine the direction, speed and distance of 
  * the position of the dropped element relative to its start point
  * which allows us to determine where the element should snap    
  **************************************************************************/

  function touchEnd(e) {
    clientYNew = e.changedTouches[0].clientY;
    el.style.webkitTransition = opt.transitionSpeed;
    el.style.transition = opt.transitionSpeed;
    let difference = clientY - clientYNew;

    if(difference === 0) {
      swipeDirection = 2;
    } else if (difference > 0) {
      swipeDirection = 0; //upward swipe
    } else if (difference < 0) {
      swipeDirection = 1; //downward swipe
    } 

    //Manage upward swipes
    if(swipeDirection == '0' && snapPosition == '1' && opt.stage2 === true) {
      expandFull();
    } else if(swipeDirection == '0' && snapPosition == '1' && opt.stage2 === false && opt.stage1 === true) {
      expandHalf();
    } 

    if(swipeDirection == '0' && snapPosition == '0') {
      if(opt.stage1 === false) {
        if(opt.stage2 === true) {
          expandFull();
        } else {
          closeFull();
        }
      } else {
        expandHalf();
      }
      if(difference > 300 && opt.stage2 === true) {
        expandFull();
      }
    }

    if(swipeDirection == '0' && snapPosition == '2') {
      expandFull();
    }

    //Manage downward swipes
    if(swipeDirection == '1' && snapPosition == '1') {
      closeFull();
    }
    if(swipeDirection == '1' && snapPosition == '2' && opt.stage1 === true) {
      expandHalf();
      if(difference < -400) {
        closeFull();
      }
    } else if(swipeDirection == '1' && snapPosition == '2' && opt.stage1 === false) {
      closeFull();
    }
    if(swipeDirection == '1' && snapPosition == '0') {
      closeFull();
      }
    }

    function cancelTouch(e) {
      // Code to do nothing
    }
}