const inputPrice = document.querySelector('[name="price"]');
const inputPack = document.querySelector('[name="pack"]');
const inputLighter = document.querySelector('[name="lighter"]');
const inputPricelighter = document.querySelector('[name="pricelighter"]');
const arrayInputs = document.querySelectorAll('.form__input');

let maskPrice = Maska.create(inputPrice, {
  mask: '#####'
});

let maskPack = Maska.create(inputPack, {
  mask: '##'
});

let maskLighter = Maska.create(inputLighter, {
  mask: '###'
});

let maskPricelighter = Maska.create(inputPricelighter, {
  mask: '####'
});

arrayInputs.forEach(el => [
  el.addEventListener('focus', function() {
    this.value = '';  
  })
])