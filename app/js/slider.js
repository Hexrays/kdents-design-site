import Wallop from 'wallop';
import { $$, $on } from './helpers';
import swipe from './swipe';

const Slider = () => {
	const slider = document.querySelector('.Wallop');
	const wallop = new Wallop(slider);
	const totalSlildes = 6;
	const sliderBtns = $$('.slider_btn');

	let sliderInterval, sliderTimeout;

	function onSliderBtnClick(e) {
	  if(sliderInterval) clearInterval(sliderInterval);
	  if(sliderTimeout) clearTimeout(sliderTimeout);
	  
	  sliderTimeout = setTimeout(() =>{
	    startSliderInterval();
	  }, 15000);
	}

	function startSliderInterval() {
	  sliderInterval = setInterval(() => {
	    wallop.next();
	  }, 5000); 
	}

	sliderBtns.forEach((btn) => {
	  $on(btn, 'click', onSliderBtnClick);
	});

  startSliderInterval(sliderInterval);





  function onSwipeRight() {
  	console.log('swipe right');
  }
  function onSwipeLeft() {
  	console.log('swipe left');	
  }
  swipe('slider', onSwipeRight, onSwipeLeft);

}

export default Slider;