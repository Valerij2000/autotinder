const App = document.querySelector('#app');
const form = document.querySelector('#form-range');
const pristineten = new Pristine(form);
const output = document.querySelector('[data-output]');
const dataObject = {};
const scenes = {
  calculator: document.querySelector('[data-scene="calculator"]'),
  land: document.querySelector('[data-scene="land"]'),
  shortcut: document.querySelector('[data-scene="shortcut"]')
}

function calculate() {
  const result = Math.round(((dataObject.price * dataObject.pack) * 30.5) + (dataObject.lighter * dataObject.pricelighter));
  return result;
}

function adjustScenes() {
  scenes.calculator.classList.remove('active');
  scenes.shortcut.classList.add('active');
}

function scrollTop() {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 1);
}

function handleScenes() {
  adjustScenes();
  App.innerHTML = renderScene(calculate);
  scrollTop();
  sliderInit();
}
  sliderInit();

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  let valid = pristineten.validate();
  if (valid) {
    const formData = new FormData();
    pristineten.fields.forEach(el => {
      let inputNameField = el.input.name;
      let inputFieldValue = el.input.value ? el.input.value : el.input.placeholder;
      dataObject[inputNameField];
      dataObject[inputNameField] = inputFieldValue;
    });
    handleScenes();
    // var ip = '';
    // await fetch('https://ipapi.co/json/')
    // .then(d => d.json())
    // .then(ip = d.ip);
    //formData.append("ip", ip);
    formData.append("price", dataObject.price);
    formData.append("pack", dataObject.pack);
    formData.append("lighter", dataObject.lighter);
    formData.append("pricelighter", dataObject.pricelighter);

    await fetch('https://script.google.com/macros/s/AKfycbyqjBc3R73zyo-s_IGX55aNMKLH476guHKJalWmlf2U7FhXAaw3mAbaZyqJCKGgqCQxBQ/exec', {
        method: 'POST',
        body: formData
      })
      .then(d => d.json())
      .then(res => {
        console.log(res);
      })
      .catch((e) => {
        // console.log('error');
      })
  }
})