import "@/styles/main.scss";


import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { EffectCoverflow, Keyboard, Pagination } from "swiper/modules";

let concerts=[
  {
    id:'1',
    city:'Київ',
    place:'Docker-G-Pub',
    seats:'250',
    date:'25.10.2025, 19:00'
  },
  {
    id:'2',
    city:'Львів',
    place:'IFESTrepublic',
    seats:'400',
    date:'01.11.2025, 20:00'
  },
  {
    id:'3',
    city:'Одеса',
    place:'Зелен театр',
    seats:'700',
    date:'09.11.2025, 19:30'
  },
  {
    id:'4',
    city:'Харків',
    place:'ArtZavod',
    seats:'500',
    date:'16.11.2025, 19:00'
  },
];

const form = document.querySelectorAll(".form");
const ticketForm = document.querySelectorAll(".ticket-form")
initConcertsList(document.querySelector('.concerts__grid'));
initPopup('.ticket__popup','.cta__btn');
validationForm(form);
validationForm(ticketForm);
initBurger();
const memberSwiper = new Swiper(".group__slider", {
  modules: [EffectCoverflow, Keyboard, Pagination],

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  initialSlide: 1,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
  breakpoints:{
    414:{
      spaceBetween: 50,
    },
    532:{
      spaceBetween: 100,
    },
    882:{
       spaceBetween: 100,
        enabled: false,
    }
  }
});

const links = document.querySelectorAll(".nav-link");
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth" });

    // убираем хеш из URL без перезагрузки страницы
    history.replaceState(null, "", window.location.pathname);
  });
});
 
const numberPhone=document.querySelector("#number");
numberPhone.addEventListener('input',()=>{
  numberPhone.value= numberPhone.value
  .replace(/\D/g,'')
  .slice(0,10);
})


function validationForm(form){
  let sel = document.querySelector('#cityPlaceSelect');
  
  form.forEach(item=>{
    let popup =item.closest('.popup')
    item.addEventListener('submit', e=>{
        e.preventDefault();
        let valid=true;
        item.querySelectorAll('[data-required]').forEach(field=>{

          if(!field.value.trim()){
            console.log(field)
            
            showError(field,"* Поле обов'язкове для заповнення")
            valid=false;
          } else {
            clearError(field);
          }
        })
      const email =item.querySelector('[type="EMAIL"]');
      if( email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
        showError(email,'* Невірний email');
        valid=false;
      }
      const age = item.querySelector('#age');
      if(age&& !age.value.trim()){
        return
      } else if( age&&age.value< 16){
        showError(age,'* Вам ще невиповнилось 16');
        valid=false;
      }
       if(valid){
        if(item.classList.contains('ticket-form')){
          const data ={};
          item.querySelectorAll('input').forEach(input=>{
            data[input.name]=input.value;
          })
          if(sel.style.display=='block'){
            
            data[sel.name]= sel.options[sel.selectedIndex].text;

          }
          

          console.log(`${data.fullName} ${data.age} років, тел. +380${data.phone} замовив квиток на ${data.date} у ${data.place}.`)
          item.closest('.ticket__popup').classList.remove('is-open');
          document.body.style.overflow='overlay';
          sel.style.display='none';
        popup.querySelector('#cityPlace').style.display='block'
          
        } else{
          const data = Object.fromEntries(new FormData(item));

        console.log('Данні форми:', data);
        }
        
        item.querySelectorAll('input').forEach(i=>{
          if (i.value.trim() &&i.type!=='submit'){
            i.value= '';
          }
        })
        

        setTimeout(()=>{
          let message = document.createElement('div');
          message.classList.add('success');
          let content = document.createElement('div');
          content.classList.add('content');
          content.innerHTML=  `<p> Дякую! Заявку відправленно.</p>
                              <p> Ми зв'яжимось з вами</p>`;
          message.append(content);
          document.body.append(message);
          
          setTimeout(()=>{
            message.classList.add('is-open-success');
          },10)
          setTimeout(()=>{
            message.classList.remove('is-open-success');
          },3000)
        },10)
       }

    })
    
})
}


function showError(field, msg) {
  clearError(field);
  field.style.borderColor = "red";
  const err = document.createElement("span");
  err.className = "form__error";
  err.textContent = msg;
  field.after(err);
  err.closest('.form__group').classList.add('contain-error')
}

function clearError(field) {
  field.style.borderColor = "";
  field.nextElementSibling?.classList.contains("form__error") &&
    field.nextElementSibling.remove();
}

function initPopup(itmClass, triger){
  let popup = document.querySelector(`${itmClass}`);
  let target = document.querySelectorAll(`${triger}`);
  let sel = document.querySelector('#cityPlaceSelect');
  target.forEach(el=>{
    el.addEventListener('click',()=>{
    popup.classList.add('is-open');
    document.body.style.overflow='hidden';
    if(el&& el.classList.contains('btn-primary')){
      
      let concertInput= document.querySelectorAll('.check-concert input');
      concertInput?.forEach(input=>{
        if(input.id=='cityPlace'){
          sel.style.display='block';
          const update = () => {
    const concert = concerts.find(c => c.id === sel.value);
    if (!concert) return;

    popup.querySelector('#date').value = concert.date;
  };
          input.style.display='none';
          
          document.querySelector('.check-concert .form__group').append(sel);
          update();
          sel.addEventListener('change',update)
          concerts.forEach(concert=>{
            let option=document.createElement('option');
            option.value=concert.id;
            option.textContent= `${concert.city} ${concert.place}`;
            sel.append(option);
            update();
          })
          


        }
      })

    } else {
      let id =el.closest('.concerts__row').dataset.concertId;
    let concert = concerts.find(i=>i.id===id);
    console.log(concert)
    let concertInput= document.querySelectorAll('.check-concert input');

    concertInput.forEach(input=>{
      if(input.id=='cityPlace'){
        input.value =`${concert.city}–${concert.place}`;
      } else if(input.id=='date'){
        
        input.value=`${concert.date}`;
      }else{return}
    })
    }
    
    
    

    popup.addEventListener('click',(e)=>{
      if(e.target.closest('.close__btn')||e.target.classList.contains('ticket__popup')){
        popup.classList.remove('is-open');
        sel.style.display='none';
        popup.querySelector('#cityPlace').style.display='block'
        document.body.style.overflow='overlay';


      } else {
        return;
      }


    })
  })
  })
  
}

function initBurger() {
  if (window.innerWidth > 775) return;

  const menu = document.querySelector('.burger');
  const menuWrapper=menu.querySelector('.burger__wrapper')
  const burgerIcon = document.querySelector('.burger-icon');
  const body = document.body;

  if (!menu || !burgerIcon) return;

  burgerIcon.addEventListener('click', () => {
    menu.style.opacity= '1';
    menu.style.visibility='visible';
    
    menuWrapper.style.opacity='1';
    menuWrapper.style.visibility='visible';
    menuWrapper.style.transform='translateX(0%)';
    body.style.overflow = 'hidden';
  });

  menu.addEventListener('click', (e) => {
    const isCloseBtn = e.target.closest('.close__btn');
    const isOverlay = e.target === menu;
    const isLink = e.target.closest('a');

    if (isCloseBtn || isOverlay || isLink) {
      menu.style.opacity= '0';
    menu.style.visibility='hidden';
    
    menuWrapper.style.transform='translateX(-150%)';
    menuWrapper.style.opacity='0';
    menuWrapper.style.visibility='hidden';
    

      // ждём окончания анимации
      setTimeout(() => {
        body.style.overflow = '';
      }, 300); // должно совпадать с CSS transition
    }
  });
}

function initConcertsList(el){
  concerts.forEach(concert=>{
    let div = document.createElement('div');
    div.classList.add('concerts__row');
    div.dataset.concertId=`${concert.id}`;
    div.innerHTML=`<span>${concert.city} — ${concert.place}</span>
                   <span>${concert.seats}</span>
                    <span>${concert.date}</span>
                   <button class="cta__btn btn-red">Замовити квиток</button>`;
    el.append(div);
  })
}
