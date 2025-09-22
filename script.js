const itemFrom = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAllButton = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemFrom.querySelector("button");
let isEditMode = false;



function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => {
        AddItemToDOM(item)
    });
    checkUI();
}

const onAddItemSubmit = function (e) {

    e.preventDefault();
    const newItem = itemInput.value;

    // validation
    if(newItem === ""){
        alert("Please insert a value not empty");
        return;
    }
    //check for edit mode
    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove("edit-mode");
        itemToEdit.remove();
        isEditMode = false;

    }

    AddItemToDOM(newItem);
    addItemToLocalStorage(newItem);
   
    checkUI();

}

const AddItemToDOM = function (item){
     // create new element
    const li =  document.createElement("li");
    const button = createButton("remove-item btn-link text-red");
    li.innerText = item
    li.appendChild(button);
    // add the new element li to list
    itemList.appendChild(li);
    itemInput.value = "";
}

function addItemToLocalStorage (item) {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);
    // stringify set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(){
        let itemsFromStorage;
    if (localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    };

    return itemsFromStorage;
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

function onClickItem(e){
     if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item){
    isEditMode = true;
    item.classList.add("edit-mode");
    itemList.querySelectorAll('li').
    forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add("edit-mode");
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.background = "#228b22"
    itemInput.value = item.textContent
}

function removeItem(item){
    if(confirm('Are You sure !')){
        // remove item from DOM
        item.remove();

        //remove item from Storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item );
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function removeItems(){
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    // clear all items from localStorage
    localStorage.removeItem("items");
checkUI();
    
}

function checkUI(){
    itemInput.value ="";
    const items = itemList.querySelectorAll("li");
    if(items.length === 0){ 
        itemFilter.style.display = "none";
        clearAllButton.style.display = "none";
    }else{
        itemFilter.style.display = "block";
        clearAllButton.style.display = "block";
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = "#333"
    isEditMode = false;
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




// init app

function init(){
itemFrom.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", onClickItem);
itemFilter.addEventListener("input", filterElement)
clearAllButton.addEventListener('click', removeItems);
document.addEventListener("DOMContentLoaded", displayItems);
checkUI();
}

init();

