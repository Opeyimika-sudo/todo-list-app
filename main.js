  var container = document.querySelector('div');
  var moonIcon = document.getElementById('moon-icon');
  var sunIcon = document.getElementById('sun-icon');
  var body = document.querySelector('body'); 
  var main = document.querySelector('main');
  var formInput = document.querySelector('.form-text');
  var formIcon = document.querySelector('form-icon');
  var form = document.getElementById('form');
  var itemsUpdate = document.querySelector('.items-number');
  moonIcon.addEventListener('click', darkMode);
  sunIcon.addEventListener('click', lightMode);


  function darkMode() {
    moonIcon.style.cssText = "display: none;"
    sunIcon.style.cssText = "display: inline;"
    body.style.cssText = "background-color: black; color: white;"
    formInput.style.cssText = "background-color: hsl(234,23%,19%); border: 1px solid hsl(234,23%,19%); color: white;"
    main.style.cssText = "background-color: hsl(234,23%,19%);border: 1px solid hsl(234,23%,19%);color: white;"
    container.classList.replace('container-mobile-light', 'container-mobile-dark');
  }

  function lightMode() {
    moonIcon.style.cssText = "display: inline;"
    sunIcon.style.cssText = "display: none;"
    body.style.cssText = "background-color: white; color: black;"
    main.style.cssText = "background-color: var(--secondaryColor); color: black; border: 1px solid var(--secondaryColor);";
    formInput.style.cssText = "background-color: var(--secondaryColor);border: 1px solid var(--secondaryColor);"
    container.classList.replace('container-mobile-dark', 'container-mobile-light');
  }

    let bigBoy = [];
    formInput.addEventListener('keydown', storeFormValue);

    let i;
    function storeFormValue(event) {
      var x = event.key;
      if(x == "Enter" &&  formInput.value.length != 0){
        for (let i=0; i<form.value.length; i++){
          let aKeyName = localStorage.key(i);
        }
        let key = 'formInput'
        localStorage.setItem(aKeyName, formInput.value);
        addDiv();
        event.preventDefault();
        form.reset();
      }
      else if(x == "Enter" && formInput.value.length == 0){
        alert("No waste my time");
      }
    }

    function addDiv() {
        var todoItem;
        for (i = 0; i<localStorage.length; i++){
            todoItem = localStorage.getItem('formInput');
            bigBoy.push(todoItem);
        }
      console.log(todoItem);
      var diva = document.createElement('div');
      diva.style.outline = "3px solid orange";
      var divParagraph = document.createElement('p');
      console.log(divParagraph);
      main.append(diva);
      diva.append(divParagraph);
      divParagraph.textContent = todoItem;
    }

    if(!localStorage.getItem(`todoItem ${i}`)){
      storeFormValue();
    }
    else{
      addDiv();
    }