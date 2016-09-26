/* jshint devel:true */
import Wallop from 'wallop';


const slider = document.querySelector('.Wallop');
const wallop = new Wallop(slider);

console.log(wallop);

const totalSlildes = 6;
let currentSlide = 0;

setInterval(() => {
  wallop.next();
}, 5000);
