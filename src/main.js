import '@/styles/main.scss'

import Swiper from 'swiper';
import 'swiper/css';


const memberSiper= new Swiper('.group__slider',{
    speed:400,
    spaceBetween:10,
    loop: true, 
    slidesPerView: 3,
    keyboard:{
        enabled:true,
        onlyInViewport:true,

    }
});