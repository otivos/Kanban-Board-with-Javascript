let order = 1;
let adding = false;

const error = document.querySelector('.error');
const message = 'Please add a description.';

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => {
  const target = document.querySelector('#requested');
  if (adding == false) {
    adding = true;
    target.appendChild(create_item());
  } else {
    error.innerHTML = message;
  }
});

const create_item = () => {
  // create and item.
  const item = document.createElement('div');

  // set 'Item' attribute.
  item.classList.add('item');
  
  item.id = 'item-' + order;
  item.draggable = true;

  // dragstart event listener.
  item.addEventListener('dragstart', (event) => {event.dataTransfer.setData('text', event.target.id)})

  // dragend event listener.
  item.addEventListener('dragend', (event) => {event.dataTransfer.clearData(); })

  // create an input element.
  const input = document.createElement('input');
  item.appendChild(input);

  // create save button
  const save_btn = document.createElement('button');
  save_btn.innerHTML = "Save"

  // save button event listener
  save_btn.addEventListener('click', () => {
    error.innerHTML = "";
    if(input.value !== "") {
      order += 1;
      item.innerHTML = input.value;
      adding = false;
    }else {
      error.innerHTML = message;
    }
  })

  // append the save button
  item.appendChild(save_btn);

  return item;

};


document.querySelectorAll('.drop').forEach(element => {
  element.addEventListener('drop', (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(id));
  });

  element.addEventListener('dragover', (event) => event.preventDefault());
});