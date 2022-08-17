import '../../../node_modules/swiper/swiper-bundle.min.css';
import { Navigation, Pagination, Swiper } from 'swiper';

export const initSliders = () => {
  new Swiper('.hall-photo__slider', {
    modules: [Navigation],
    autoHeight: true,
    slidesPerView: 2,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1250: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      300: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    },
  });

  new Swiper('.banquet-menu__slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      renderFraction: (currentClass, totalClass) => {
        return `
          <span class="${currentClass}"></span>
           из 
          <span class="${totalClass}"></span>
        `;
      }
    }
  });
}