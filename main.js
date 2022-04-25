  var container = document.querySelector('div');
  var moonIcon = document.getElementById('moon-icon');
  var sunIcon = document.getElementById('sun-icon');
  var body = document.querySelector('body'); 
  var main = document.querySelector('main');
  var formInput = document.querySelector('.form-text');
  var formIcon = document.querySelector('form-icon');
  var form = document.getElementById('form');
  var itemsUpdate = document.querySelector('.items-number');
  var filters = document.querySelector('.filters-box');
  var borderToDo = document.querySelector('.todoList');
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
    let text;
    formInput.addEventListener('keydown', storeFormValue);

    function storeFormValue(event) {
      var x = event.key;
      if(x == "Enter" &&  formInput.value.length != 0){
        text = formInput.value;
        var text1 = text.substr(0, 1).toUpperCase();
        var text2 = text.slice(1);
        var text3 = text1.concat(text2);
        bigBoy.push(text3);
        let value = JSON.stringify(bigBoy);
        localStorage.setItem("bigBoyKey", value);
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
      var storedArray = localStorage.getItem('bigBoyKey');
      bigBoy = JSON.parse(storedArray);
      todoItem = bigBoy[bigBoy.length - 1];
      var diva = document.createElement('div');
      var divParagraph = document.createElement('p');
      divParagraph.classList.add('icon', 'circle', 'todoList-light');
      main.insertBefore(diva, filters);
      diva.append(divParagraph);
      divParagraph.textContent = todoItem;
      itemsUpdate.textContent = bigBoy.length + " ";
    }

    function divAbsentia (){
      var todoItem;
      var storedArray = localStorage.getItem('bigBoyKey');
      bigBoy = JSON.parse(storedArray);
      for (i=0; i<bigBoy.length; i++){
        todoItem = bigBoy[i];
        var diva = document.createElement('div');
        var divParagraph = document.createElement('p');
        divParagraph.classList.add('icon', 'circle', 'todoList-light');
        main.insertBefore(diva, filters);
        diva.append(divParagraph);
        divParagraph.textContent = todoItem;
        itemsUpdate.textContent = bigBoy.length + " ";
      }
    }

    if(!localStorage.getItem('bigBoyKey')){
      storeFormValue();
    }
    else{
      divAbsentia();
    }

    // main.addEventListener('mouseover', (e) => {
    //   const target = e.target;

    //   if(target.matches('[todoList-light]')){
    //     var image = document.createElement('img');
    //     image.setAttribute("src", "images/icon-cross.svg");
    //     image.style.cssText = "position: absolute; top: 14px; right: 0;"
    //     target.append(image);
    //     console.log(target);
    //   }
    // })
    
    