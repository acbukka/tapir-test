'use strict'

const linkItems = document.querySelectorAll('.tapir-item');
const inputBox = document.querySelector(".card__digits");

linkItems.forEach((link) => {
  link.addEventListener('click', () => {
    linkItems.forEach((linkItem) => {
      linkItem.classList.remove('active');
    })
    link.classList.add('active');
    console.log('bam');
  })
})

// Добавим слушатель на инпуты в card__digits и настроим правила ввода, чтобы не принималось ничего кроме цифр
// Также добавим переключение инпута ввода при полном заполнении поля инпута
inputBox.addEventListener("input", function(e){
  if (e.target.value.length > 4) {
    e.target.value = e.target.value.slice(0, 4);
    if ( e.target.value !== "" && e.target.nextElementSibling && e.target.nextElementSibling.nodeName === "INPUT" ){
      e.target.nextElementSibling.focus();
    }
  }
});

