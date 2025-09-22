const itemFrom = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAllButton = document.getElementById("clear");
const itemFilter = document.getElementById("filter")

const addItem = function (e) {

    e.preventDefault();
    const newItem = itemInput.value;

    // validation
    if(newItem === ""){
        alert("Please insert a value not empty");
        return;
    }

    // create new element
    const li =  document.createElement("li");
    const button = createButton("remove-item btn-link text-red");
    li.innerText = newItem
    li.appendChild(button);
    // add the new element li to list
    itemList.appendChild(li);
    itemInput.value = "";
    checkUI();

}


function createButton (classes){
    button = document.createElement('button');
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon)
    return button;
}

function createIcon (classes){
    icon = document.createElement('i');
    icon.className = classes;
    return icon;
}


function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        if (confirm('Are you sure  ??')){
        e.target.parentElement.parentElement.remove();
        checkUI();
        }

    }
}

function removeItems(){
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
checkUI();
    
}

function checkUI(){
    const items = itemList.querySelectorAll("li");
    if(items.length === 0){ 
        itemFilter.style.display = "none";
        clearAllButton.style.display = "none";
    }else{
        itemFilter.style.display = "block";
        clearAllButton.style.display = "block";
    }
}

// filter input function
function filterElement(e){
    const items = document.querySelectorAll("li");
    const text = e.target.value.toLowerCase();
    items.forEach((item) =>{
    const itemName = item.firstChild.textContent.toLocaleLowerCase();
    if (itemName.indexOf(text) != -1){
        item.style.display = 'flex';
    }else{
        item.style.display = 'none'
    }

    });
}




// event listner
itemFrom.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
itemFilter.addEventListener("input", filterElement)
clearAllButton.addEventListener('click', removeItems);
checkUI();
