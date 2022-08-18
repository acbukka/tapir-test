'use strict'

//
const linkItems = document.querySelectorAll('.tapir-item');
const inputBox = document.querySelector(".card__digits");
const cardCVC = document.querySelector('.card__cvc-input');
const cardOwnerInput = document.querySelector('.card__owner-input');
const cardInputs = document.querySelectorAll('.card__digits-input');
const submitBtn = document.querySelector('.card__submit-btn');
const validMessage = document.querySelector('.validation__success');
const errorMessage = document.querySelector('.validation__error');


linkItems.forEach((link) => {
  link.addEventListener('click', () => {
    linkItems.forEach((linkItem) => {
      linkItem.classList.remove('active');
    })
    link.classList.add('active');
  })
})

// Добавим слушатель на инпуты в card__digits и настроим правила ввода, чтобы не принималось ничего кроме цифр
// Также добавим переключение инпута ввода при полном заполнении поля инпута
inputBox.addEventListener("input", function(e){
  let cardsInputsValue = '';
  let cardInput = e.target;
  if (cardInput.value.length > 4) {
    cardInput.value = cardInput.value.slice(0, 4);
    if ( cardInput.value !== "" && cardInput.nextElementSibling && cardInput.nextElementSibling.nodeName === "INPUT" ){
      cardInput.nextElementSibling.focus();
    }
  }
  // будем обновлять счетчик каждый раз когда вводится инпут и вводить в него новые значения
  cardInputs.forEach((input) => {
    cardsInputsValue += input.value;
  })
  // если счетчик не будет равен 16 знакам - подсвечиваем инпут красным
  if (cardsInputsValue.length < 16) {
    cardInputs.forEach((input) => {
      input.style.background = '#ff5047';
    })
  } else {
    cardInputs.forEach((input) => {
      input.style.background = '#F0F0F0';
    })
  }
});

// Аналогично поступим с CVC, обрезав инпут до 3 символов и выводим подсветку если символов меньше чем 3
cardCVC.addEventListener("input", function (e){
  if (e.target.value.length >= 3) {
    e.target.value = e.target.value.slice(0, 3);
    cardCVC.style.background = '#F0F0F0';
  } else {
    cardCVC.style.background = '#ff5047';
  }
})

// Добавим обработку инпута владельца карты (латиница, минимальное кол-во символов и подсветку если символов меньше чем 4)
cardOwnerInput.addEventListener('input', function (e) {
  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g,'');
  if (e.target.value.length < 4) {
    cardOwnerInput.style.background = '#ff5047';
  } else {
    cardOwnerInput.style.background = '#F0F0F0';
  }
})


class checkDataMethods {

  checkOwner() {
    return cardOwnerInput.value.length > 4;
  }

  checkCard() {
    let cardsInputsValue = '';
    cardInputs.forEach((input) => {
      cardsInputsValue += input.value;
    })
    return cardsInputsValue.length === 16;
  }

  checkCVC() {
    return cardCVC.value.length === 3;
  }

  deleteMessage() {
    setTimeout(() => {
      validMessage.style.display = 'none';
      errorMessage.style.display = 'none';
    }, 3000)
  }

}

const checkData = new checkDataMethods();


const submitData = function () {
  let isValid = false;
  if (checkData.checkCard() &&
      checkData.checkOwner() &&
      checkData.checkCVC()
      ) {
    isValid = true;
  }
  if (isValid) {
    validMessage.style.display = 'block';
    checkData.deleteMessage();
  } else {
    errorMessage.style.display = 'block';
    checkData.deleteMessage();
  }
}

submitBtn.addEventListener('click', submitData);
