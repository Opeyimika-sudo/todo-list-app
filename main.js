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
    var diva;
    var divParagraph;
    var todoItem;
    formInput.addEventListener('keydown', storeFormValue);

    function storeFormValue(event) {
      var x = event.key;
      if(x == "Enter" &&  formInput.value.length != 0){
        text = formInput.value;
        var text1 = text.substr(0, 1).toUpperCase();
        var text2 = text.slice(1);
        var text3 = text1.concat(text2);
        const obj = {
          "value": text3,
          "checked": "false",
        }
        bigBoy.push(obj);
        localStorage.setItem("bigBoyKey", JSON.stringify(bigBoy));
        addDiv();
        event.preventDefault();
        form.reset();
      }
      else if(x == "Enter" && formInput.value.length == 0){
        alert("No waste my time");
      }
    }

    function addDiv() {
      var storedArray = localStorage.getItem('bigBoyKey');
      console.log(storedArray);
      bigBoy = JSON.parse(storedArray);
      console.log(bigBoy);
      todoItem = bigBoy[bigBoy.length - 1].value;
      var diva = document.createElement('div');
      var divParagraph = document.createElement('p');
      divParagraph.classList.add('icon', 'circle', 'img','todoList-light');
      main.insertBefore(diva, filters);
      diva.append(divParagraph);
      divParagraph.textContent = todoItem;
      itemsUpdate.textContent = bigBoy.length + " ";
  }

    function divAbsential(){
      var storedArray = localStorage.getItem('bigBoyKey');
      bigBoy = JSON.parse(storedArray);
      for (i=0; i < bigBoy.length; i++){
      todoItem = bigBoy[i].value;
      diva = document.createElement('div');
      diva.className = "todoList-item";
      divParagraph = document.createElement('p');
      divParagraph.classList.add('icon', 'circle', 'img', 'todoList-light');
      main.insertBefore(diva, filters);
      diva.append(divParagraph);
      divParagraph.textContent = todoItem;
      itemsUpdate.textContent = bigBoy.length + " ";
      baby(diva, divParagraph,bigBoy, main);
  }
}

    if(!localStorage.getItem('bigBoyKey')){
      storeFormValue();
    }
    else{
      divAbsential();
    }

    function baby(diva, divParagraph,bigBoy, main) {
      // if (divParagraph.classList.contains('img')) {
      divParagraph.addEventListener('click', () => {
        for (i =0; i < bigBoy.length; i++){
          main.removeChild(diva);
          bigBoy = bigBoy.splice(i, 1);
          localStorage.setItem('bigBoyKey', JSON.stringify(bigBoy));
          itemsUpdate.textContent = bigBoy.length + " ";
          divAbsential();
        }
        
        
      })
    }
