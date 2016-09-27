const swipe = (el, swipeRightCb, swipeLeftCb) => {
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  const element = document.getElementById(el);

  element.addEventListener('touchstart', function(event) {
    touchstartX = event.screenX;
    touchstartY = event.screenY;
  }, false);

  element.addEventListener('touchend', function(event) {
    touchendX = event.screenX;
    touchendY = event.screenY;
    handleGesure();
  }, false); 

  function handleGesure() {
    console.log('what?')
    // Swipe left
    if (touchendX < touchstartX) {
      console.log('left');
      swipeLeftCb();
    }
    // Swipe right
    if (touchendX > touchstartX) {
      console.log('right');
      swipeRightCb();
    }
    // if (touchendY < touchstartY) {
    //   alert(swiped + 'down!');
    // }
    // if (touchendY > touchstartY) {
    //   alert(swiped + 'left!');
    // }
    // if (touchendY == touchstartY) {
    //   alert('tap!');
    // }
  }
} 

export default swipe;