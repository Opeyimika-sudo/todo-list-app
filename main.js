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
      bigBoy = JSON.parse(storedArray);
      todoItem = bigBoy[bigBoy.length - 1].value;
      var diva = document.createElement('div');
      var divParagraph = document.createElement('p');
      divParagraph.classList.add('icon', 'circle', 
      // 'img',
      'todoList-light');
      main.insertBefore(diva, filters);
      diva.append(divParagraph);
      divParagraph.textContent = todoItem;
      itemsUpdate.textContent = bigBoy.length + " ";
      cancelButton(divParagraph);
      baby(divParagraph);
  }

  
    function divAbsential(){
      var storedArray = localStorage.getItem('bigBoyKey');
      bigBoy = JSON.parse(storedArray);
      let i = 0;
      while (i < bigBoy.length) {
        todoItem = bigBoy[i].value;
        diva = document.createElement('div');
        diva.className = "todoList-item";
        divParagraph = document.createElement('p');
        divParagraph.classList.add('icon', 'circle', 
        // 'img', 
        'todoList-light');
        main.insertBefore(diva, filters);
        diva.append(divParagraph);
        divParagraph.textContent = todoItem;
        itemsUpdate.textContent = bigBoy.length + " ";
        cancelButton(divParagraph);
        baby(divParagraph);
        i++;
      }
}


    if(!localStorage.getItem('bigBoyKey')){
      storeFormValue();
    }
    else{
      divAbsential();
    }

    var img = document.createElement('img');
    img.src= "images/icon-cross.svg";


    function cancelButton (divParagraph) {
      divParagraph.addEventListener('mouseover', () => {
        img.style.cssText = "float: right; cursor: pointer;"
        divParagraph.append(img);
        })

      divParagraph.addEventListener('mouseout', () => {
        img.style.cssText = "display: none;"
      })
    }

    function baby(divParagraph) {
      divParagraph.addEventListener('click', () => {
        divParagraph.parentElement.remove();
        var store = localStorage.getItem('bigBoyKey');
        var hello = JSON.parse(store);
        const results = hello.filter(item => item.value != divParagraph.textContent);
        localStorage.setItem('bigBoyKey', JSON.stringify(results));
        if (results.length > 0){
          itemsUpdate.textContent = results.length + " ";
        }
        else{
          itemsUpdate.textContent = "";
        }
      })
    }
   