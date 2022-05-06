  // Declaration of the variables from the HTML page
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
  var all = document.getElementById('all');
  var active = document.getElementById('active');
  var completed = document.getElementById('completed');
  var clear = document.getElementById('clear');
  moonIcon.addEventListener('click', darkMode);
  sunIcon.addEventListener('click', lightMode);

   // Function to turn the page to Dark Mode from Light Mode
  function darkMode() {
    moonIcon.style.cssText = "display: none;"
    sunIcon.style.cssText = "display: inline;"
    body.style.cssText = "background-color: black; color: white;"
    formInput.style.cssText = "background-color: hsl(234,23%,19%); border: 1px solid hsl(234,23%,19%); color: white;"
    main.style.cssText = "background-color: hsl(234,23%,19%);border: 1px solid hsl(234,23%,19%);color: white;"
    container.classList.replace('container-mobile-light', 'container-mobile-dark');
  }

  // Function to turn the page to Light Mode from Dark Mode
  function lightMode() {
    moonIcon.style.cssText = "display: inline;"
    sunIcon.style.cssText = "display: none;"
    body.style.cssText = "background-color: white; color: black;"
    main.style.cssText = "background-color: var(--secondaryColor); color: black; border: 1px solid var(--secondaryColor);";
    formInput.style.cssText = "background-color: var(--secondaryColor); border: 1px solid var(--secondaryColor);"
    container.classList.replace('container-mobile-dark', 'container-mobile-light');
  }
    var bigBoy = new Array();
    let text;
    var todoItem;
    formInput.addEventListener('keydown', storeFormValue);
    
// Function to listen for the "Enter" button click and push the value to local Storage 
    function storeFormValue(event) {
      var x = event.key;
      if(x == "Enter" &&  formInput.value.length != 0){
        text = formInput.value;
        var text1 = text.substr(0, 1).toUpperCase();
        var text2 = text.slice(1);
        var text3 = text1.concat(text2);
        const obj = {
          "value": text3,
          "checked": false,
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
// Function to add the new value from input field into the page
    function addDiv() {
      var storedArray = localStorage.getItem('bigBoyKey');
      bigBoy = JSON.parse(storedArray);
      todoItem = bigBoy[bigBoy.length - 1].value;
      var diva = document.createElement('div');
      var divParagraph = document.createElement('p');
      var img = document.createElement('img');
      img.src= "images/icon-cross.svg";
      img.style.cssText = "display: none";
      diva.classList.add('todoList-light');
        divParagraph.style.cssText = "position: relative;left: 30px;"
      var circle = document.createElement('span');
      circle.setAttribute("class", "material-symbols-outlined");
      circle.textContent = "circle"
      circle.style.cssText = "position: absolute; top: 13px; left: 10px;";
      main.insertBefore(diva, filters);
      diva.append(divParagraph);
      diva.style.cssText = "position: relative;"
      diva.insertBefore(circle, divParagraph);
      divParagraph.textContent = todoItem;
      itemsUpdate.textContent = bigBoy.length + " ";
      cancelButton(divParagraph, img);
      baby(divParagraph, img);
      checked(circle, divParagraph, img);
      allStates(all, diva, divParagraph, circle);
      activeState(active, diva, divParagraph, circle);
      clearCompleted(clear);
      completedState(completed, diva, divParagraph, circle);
  }

  // Function to add all the items from localStorage to the page
    function divAbsential(){
      var storedArray = localStorage.getItem('bigBoyKey');
      bigBoy = JSON.parse(storedArray);
      
      let i = 0;
      while (i < bigBoy.length) {
        localStorage.setItem('bigBoyKey', JSON.stringify(bigBoy));
        todoItem = bigBoy[i].value;
        diva = document.createElement('div');
        diva.className = "todoList-item";
        divParagraph = document.createElement('p');
        diva.classList.add('todoList-light');
        divParagraph.style.cssText = "position: relative;left: 30px;"
        var img = document.createElement('img');
        img.src= "images/icon-cross.svg";
        img.style.cssText = "display: none";
        var circle = document.createElement('span');
        circle.setAttribute("class", "material-symbols-outlined");
        circle.textContent = "circle"
        circle.style.cssText = "position: absolute; cursor: pointer; overflow: hidden; border-radius: 50%; height: 21px;width: 23px; text-align: center; top: 14px; left: 10px;";
        main.insertBefore(diva, filters);
        diva.append(divParagraph);
        diva.insertBefore(circle, divParagraph);
        diva.style.cssText = "position: relative;"
        divParagraph.textContent = todoItem;
        const unticked = bigBoy.filter(item => item.checked != true);
        itemsUpdate.textContent = unticked.length + " ";
        cancelButton(divParagraph, img);
        baby(divParagraph, img);
        checked(circle, divParagraph, img);
        allStates(all, diva, divParagraph, circle);
        activeState(active, diva, divParagraph, circle);
        clearCompleted(clear);
        completedState(completed, diva, divParagraph, circle);
        if(bigBoy[i].checked == true){
          circle.classList.add('check');
          circle.classList.add('icon');
          divParagraph.classList.add('paragraph-text');
        }
        i++;
      }
}
    if(!localStorage.getItem('bigBoyKey')){
      storeFormValue();
    }
    else{
      divAbsential();
    }
   
  // Code for cancel Button to appear on hover on the to-do list item
    function cancelButton (divParagraph, img) {
      divParagraph.addEventListener('mouseover', () => {
        img.style.cssText = "float: right; cursor: pointer; position: relative; right: 30px;"
        divParagraph.append(img);
        })

      divParagraph.addEventListener('mouseout', () => {
        img.style.cssText = "display: none;"
      })
    }

    // Code to listen for a click on the cancel button and remove the to-do list item from the page and localStorage
    function baby(divParagraph, img) {
      img.addEventListener('click', () => {
        divParagraph.parentElement.remove();
        var store = localStorage.getItem('bigBoyKey');
        var hello = JSON.parse(store);
        const results = hello.filter(item => item.value != divParagraph.textContent);
        localStorage.setItem('bigBoyKey', JSON.stringify(results));
        const unticked = results.filter(item => item.checked != true);
        if (unticked.length > 0){
          itemsUpdate.textContent = unticked.length + " ";
        }
        else{
          itemsUpdate.textContent = "";
          location.reload();
        }
      })
    }

    for(i=0; i<JSON.parse(localStorage.getItem('bigBoyKey')); i++){
      if(JSON.parse(localStorage.getItem('bigBoyKey'))[i].checked == true){
        checked(circle, divParagraph, img);
      }
    }
    
    // Code for checking/ticking a todo list item and the ensuing changes
    function checked(circle, divParagraph, img) {
      circle.addEventListener('click', () => {
        var selectedFew = JSON.parse(localStorage.getItem('bigBoyKey'));
        
        for (let i=0; i <selectedFew.length; i++){
          if(circle.classList.contains('check')){
              if(divParagraph.textContent === selectedFew[i].value){
                circle.classList.remove('check');
                circle.classList.remove('icon');
                divParagraph.classList.remove('paragraph-text');
                selectedFew[i].checked = false;
                localStorage.setItem('bigBoyKey', JSON.stringify(selectedFew));
                baby(divParagraph, img);
                const unticked = selectedFew.filter(item => item.checked != true);
                itemsUpdate.textContent = unticked.length + " "
              }
            } 
          else{
            if(divParagraph.textContent === selectedFew[i].value){
              circle.classList.add('check');
              circle.classList.add('icon');
              divParagraph.classList.add('paragraph-text');
              selectedFew[i].checked = true;
              localStorage.setItem('bigBoyKey', JSON.stringify(selectedFew));
              const unticked = selectedFew.filter(item => item.checked != true);
              itemsUpdate.textContent = unticked.length + " ";
            }
          }
     
        }   
      })
    }

    //All, Active, Completed, Clear Completed States
    function allStates(all, diva, divParagraph, circle){
      all.addEventListener('click', () => {
        var localStorageContent = JSON.parse(localStorage.getItem('bigBoyKey'))
        var resulting = localStorageContent.filter(content => content.checked == true);
        var softly = localStorageContent.filter(content => content.checked == false);
        setTimeout(setColor, 1000);
          function setColor(){
            all.style.cssText = "color: #3c19ff";
          }
          function stopSetTime() {
            all.style.cssText = "color: black;"
          }
        setTimeout(stopSetTime, 5000);
        for(i=0; i<resulting.length; i++){
          if(resulting[i].value === divParagraph.textContent){
            diva.style.cssText = "display: block; position: relative;";
            divParagraph.style.cssText = "position: relative; left: 30px;";
            circle.style.cssText = "position: absolute; cursor: pointer; overflow: hidden; border-radius: 50%; height: 21px;width: 23px; text-align: center; top: 14px; left: 10px;"
          }
        }
        for(i =0; i<softly.length; i++){
          if(softly[i].value === divParagraph.textContent){
            diva.style.cssText = "display: block; position: relative;";
            divParagraph.style.cssText = "position: relative; left: 30px;";
            circle.style.cssText = "position: absolute; cursor: pointer; overflow: hidden; border-radius: 50%; height: 21px;width: 23px; text-align: center; top: 14px; left: 10px;"
          
        }
      }
      })
    }

    function activeState(active, diva, divParagraph, circle){
      active.addEventListener('click', () => {
        var localStorageContent = JSON.parse(localStorage.getItem('bigBoyKey'))
        var resulting = localStorageContent.filter(content => content.checked == true);
        var softly = localStorageContent.filter(content => content.checked == false);
        setTimeout(setColor, 1000);
          function setColor(){
            active.style.cssText = "color: #3c19ff";
          }
          function stopSetTime() {
            active.style.cssText = "color: black;"
          }
        setTimeout(stopSetTime, 5000);
        for(i=0; i<resulting.length; i++){
          if(resulting[i].value === divParagraph.textContent){
            diva.style.cssText = "display: none";
          }
        }
        for(i =0; i<softly.length; i++){
          if(softly[i].value === divParagraph.textContent){
            diva.style.cssText = "display: block; position: relative;";
            divParagraph.style.cssText = "position: relative; left: 30px;";
            circle.style.cssText = "position: absolute; cursor: pointer; overflow: hidden; border-radius: 50%; height: 21px;width: 23px; text-align: center; top: 14px; left: 10px;"
          
        }
      }
      })
    }

    function completedState(completed, diva, divParagraph, circle){
      completed.addEventListener('click', () => {
        var localStorageContent = JSON.parse(localStorage.getItem('bigBoyKey'))
        var result = localStorageContent.filter(content => content.checked == false);
        var completedItems = localStorageContent.filter(content => content.checked == true);
        setTimeout(setColor, 1000);
          function setColor(){
            completed.style.cssText = "color: #3c19ff";
          }
          function stopSetTime() {
            completed.style.cssText = "color: black;"
          }
        setTimeout(stopSetTime, 5000);
        for(i=0; i<result.length; i++){
          if(result[i].value === divParagraph.textContent){
            diva.style.cssText = "display: none;"
          }
        }
        for(i=0; i<completedItems.length; i++){
          if(completedItems[i].value === divParagraph.textContent){
            diva.style.cssText = "display: block; position: relative;";
            divParagraph.style.cssText = "position: relative;left: 30px;";
            circle.style.cssText = "position: absolute; cursor: pointer; overflow: hidden; border-radius: 50%; height: 21px;width: 23px; text-align: center; top: 14px; left: 10px;"
          }
        }
      })
    }

    
    function clearCompleted(clear) {
      clear.addEventListener('click', () => {
        var arrayToClear = JSON.parse(localStorage.getItem('bigBoyKey'));
        var activeArray = arrayToClear.filter(item => item.checked == false);
        localStorage.setItem('bigBoyKey', JSON.stringify(activeArray)); 
        location.reload();
      });
      }