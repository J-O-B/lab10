// Initialize Grocery List & Elements
let groceries = []
let init = document.getElementById('init');
let feedback = document.getElementById('feedback');
let formAdd = document.getElementById('addToList');
let formRem = document.getElementById('remFromList');

// Form Shouldn't Submit But Some Basic Defensive Programming.
formAdd.addEventListener('submit', function(e){
    e.preventDefault();
});
formRem.addEventListener('submit', function(e){
    e.preventDefault();
});

// Adding Items To List:
let addButton = document.getElementById('addItemButton');
addButton.addEventListener('click', function(){
    init.innerHTML = '';
    // Grab the input
    let addInput = document.getElementById('addItem');
    let inputValue = addInput.value.toLowerCase();
    // Push item into array
    groceries.push(inputValue);
    // Feedback
    let feed = `<span class='text-capitalize text-success fw-bold'>INFO: Added ${inputValue} To List</span>`;
    display(feed);
    // Reset the form field
    addInput.value = '';
});


// Deleting Items From List:
let remButton = document.getElementById('remItemButton');
remButton.addEventListener('click', function(){
    // Grab the input
    let remInput = document.getElementById('remItem');
    let remInputValue = remInput.value.toLowerCase();
    // Feedback
    let feed = `<span class='text-capitalize text-warning fst-italic'>INFO: Couldn't Find ${remInputValue} In Your List!</span>`;
    // Get item index to splice from list.
    let itemIndex = groceries.indexOf(remInputValue);
    for (i=0; i < groceries.length; i++){
        if (groceries[i] == remInputValue){
            groceries.splice(itemIndex, 1);
            feed = `<span class='text-capitalize text-danger fw-bold'>INFO: Removed ${remInputValue} From List</span>`;
        }
    }
    display(feed);
    
    // Reset the form field
    remInput.value = '';
});


// Display Groceries
function display(info){
    let domList = document.getElementById('groceryList');
    let qwyList = document.getElementById('listCount');
    // Remove old items
    domList.innerHTML = '';
    qwyList.innerHTML = '';

    // Create new list, only containing the item name
    let items = [];
    let final = [];

    // Append items
    for (i=0; i<groceries.length; i++){
        if (items.includes(groceries[i])){
            //pass
        }else{
            items.push(groceries[i]);
        }
    }
    // Get items and the quantity
    for (i=0; i<items.length; i++){
        let itemName = items[i];
        counter = 0;
        for (it=0; it<groceries.length; it++){
            if (groceries[it] == itemName){
                counter++;
            }
        }
        final.push(itemName, counter);
    }
    // Print Item To Dom
    for (i=0; i<final.length; i += 2){
        domList.innerHTML += `<li class='text-capitalize h4'>${final[i]}</li>`;
        qwyList.innerHTML += `<li class='text-capitalize h4'>${final[i+1]}</li>`;
    }
    // Give Feedback
    feedback.innerHTML = info;
}

function removeAll(){
    groceries = [];
    feedback.innerHTML = `<span class='text-capitalize text-danger'>Removed All Items From List</span>`;
    display();
}