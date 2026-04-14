import "@/styles/main.scss";


import Swiper from "swiper";
import "swiper/css";

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
  {
    id:'5',
    city:'Харків',
    place:'ArtZavod',
    seats:'5000',
    date:'16.11.2025, 12:00'
  },
];


initConcertsList(document.querySelector('.concerts__grid'));
initPopup('ticket__popup','cta__btn');
const memberSiper = new Swiper(".group__slider", {
  speed: 400,
  spaceBetween: 10,
  loop: true,
  slidesPerView: 3,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
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

const form = document.querySelectorAll(".form");
form.forEach(item=>{
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
      const email =item.querySelector('[type="EMAIL"');
      if( email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
        showError(email,'* Невірний email');
        valid=false;
      }
       if(valid){
        const data = Object.fromEntries(new FormData(item));

        console.log('Данні форми:', data);
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
  let popup = document.querySelector(`.${itmClass}`);
  let target = document.querySelectorAll(`.${triger}`);
  target.forEach(el=>{
    el.addEventListener('click',()=>{
    popup.classList.add('is-open');
    document.body.style.overflow='hidden';
    
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
    

    popup.addEventListener('click',(e)=>{
      if(e.target.closest('.close__btn')||e.target.classList.contains('ticket__popup')){
        popup.classList.remove('is-open');
        document.body.style.overflow='overlay';
      } else {
        return;
      }


    })
  })
  })
  
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
