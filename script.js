const itemFrom = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

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
    itemInput.value = ""
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


// event listner

itemFrom.addEventListener("submit", addItem)