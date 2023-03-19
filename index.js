/** @format */

// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector(".todo-form");
const todoItems = document.getElementById("todo-items");
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.list-container')
const list = document.querySelector('.todo-list')
const clearBtn = document.querySelector('.clear-btn')


// edit option

let editElement;
let editFlag = false;
let editID =''


// ****** FUNCTIONS **********
// add items

// ****** SETUP ITEMS **********
const setupItems = () => {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(item => {
            createListItem(item.id, item.value)
        })
        container.classList.add('show-container')
    }
}
const createListItem =(id, value) =>  {
           const element = document.createElement("li");
      // add class
      element.classList.add("todo-item");
      // add id
      const attr = document.createAttribute("data-id");
      attr.value = id;
      element.setAttributeNode(attr);
      element.innerHTML = `<p class="title">${value}</p>
                              <div class="btn-container">
                                    <button type="button" class="edit-btn">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="delete-btn">
                                        <i class="fas fa-trash"></i>
                                    </button>
                            </div>`;

     
      // add event listeners to both buttons;
      const deleteBtn = element.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", deleteItem);
      const editBtn = element.querySelector(".edit-btn");
      editBtn.addEventListener("click", editItem);

      // append child
    // list.append(element);
    list.insertBefore(element, list.childNodes[0]);
 }




const addItem = (e) => {
    e.preventDefault();
    //   submitBtn.textContent = "submit";
    const value = todoItems.value
    const id = new Date().getTime().toString()
    if (value && !editFlag) {
        createListItem(id,value)
    //   const element = document.createElement("article");
    //   // add class
    //   element.classList.add("todo-item");
    //   // add id
    //   const attr = document.createAttribute("data-id");
    //   attr.value = id;
    //   element.setAttributeNode(attr);
    //   element.innerHTML = `<p class="title">${value}</p>
    //                           <div class="btn-container">
    //                                 <button type="button" class="edit-btn">
    //                                     <i class="fas fa-edit"></i>
    //                                 </button>
    //                                 <button type="button" class="delete-btn">
    //                                     <i class="fas fa-trash"></i>
    //                                 </button>
    //                         </div>`;

     
    //   // add event listeners to both buttons;
    //   const deleteBtn = element.querySelector(".delete-btn");
    //   deleteBtn.addEventListener("click", deleteItem);
    //   const editBtn = element.querySelector(".edit-btn");
    //   editBtn.addEventListener("click", editItem);

    //   // append child
    //   list.appendChild(element);
      // display alert
      displayAlert("item added to the list", "success");
      // show container
      container.classList.add("show-container");
      // add to local storage
        addToLocalStorage(id, value);

      // set back to default
      setBackToDefault();
    } else if(value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success')
        // edit local storage;
        editLocalStorage(editID, value)
        setBackToDefault()
    } else {
      displayAlert('please enter value', 'danger')
}
};


    // display alert
const displayAlert = (text, action) => {
    alert.textContent = text
    alert.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 2000)
}

    //  clear items
const clearItems = () => {
    const items = document.querySelectorAll('.todo-item');
    if (items.length > 0) {
        items.forEach((item) => {
            list.removeChild(item)
        })
    }
    container.classList.remove('show-container')
    displayAlert('empty list', 'danger');
    setBackToDefault();
    localStorage.removeItem('list')
}  
// delete function
    const deleteItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove('show-container')
    }
    displayAlert('item removed', 'danger')
    setBackToDefault()

    // remove local storage
  removeFromLocalStorage(id);
}
// edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  todoItems.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  //
  submitBtn.textContent = "edit";
}

// ****** EVENT LISTENERS **********

// submit form
form.addEventListener('submit', addItem)
// 
clearBtn.addEventListener("click", clearItems);
// load items
 window.addEventListener('DOMContentLoaded',setupItems )
// set input back to default 
const setBackToDefault = () => {
    todoItems.value = '';
    editID = false;
    editFlag = ''
    submitBtn.textContent = 'submit'
}
// ****** LOCAL STORAGE **********

const addToLocalStorage = (id,value) => {
// localStorage.setItem()
    const item = { id, value }
    let items = getLocalStorage()
    items.push(item);
    localStorage.setItem('list', JSON.stringify(items))
}

const removeFromLocalStorage = (id) => {
    let items = getLocalStorage();
    items = items.filter(item => {
        if (item.id !== id) {
            return item;
        }
    })
      localStorage.setItem("list", JSON.stringify(items));
}
const editLocalStorage = (id, value) => {
    let items = getLocalStorage();
    items = items.map(item => {
        if (item.id === id) {
        item.value = value
        }
        return item;
    })
    
}
const getLocalStorage = () => {
    return localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : [];
}
