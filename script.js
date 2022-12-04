// DOM vars
const library = document.getElementById("library");
const popUpForm = document.getElementById("popup-form");
const closePopUp = document.getElementById("close");

// Event Listener for AddBookToLibrary
const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", addBookToLibrary);

// Event Listener to open Popup
const newBookBtn = document.querySelector("#new-book");
newBookBtn.addEventListener("click", () => (popUpForm.style.display = "block"));

// Event Listener to close Popup
closePopUp.addEventListener("click", () => (popUpForm.style.display = "none"));

// JS Library Vars
let myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 304,
    status: "read",
  },
];
let newBook;

// Object

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// Add Book Function

function addBookToLibrary() {
  event.preventDefault();
  popUpForm.style.display = "none";

  const title = form.title.value;
  const author = form.author.value;
  const pages = form.pages.value;
  const status = form.status.value;

  newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  setData(); // localStorage
  render();
  form.reset();
}

// Creation
//Creates book visual in browser
function render() {
  const display = document.getElementById("books");
  const books = document.querySelectorAll(".book");
  books.forEach((book) => display.removeChild(book));

  for (let i = 0; i < myLibrary.length; i++) {
    printBook(myLibrary[i]);
  }
}

// Create DOM elements to add to Library
function printBook(item) {
  const library = document.getElementById("library");
  const libraryList = document.getElementById("books");
  const book = document.createElement("li");
  const removeBtn = document.createElement("button");
  const readBtn = document.createElement("button");

  book.classList.add("book");
  book.setAttribute("id", myLibrary.indexOf(item));

  console.log(item.status);
  if (item.status === "read") {
    book.textContent = `I have read "${item.title}" from ${item.author}, all ${item.pages} pages of it!`;
  } else {
    book.textContent = `I really want to read "${item.title}" from ${item.author}, which is ${item.pages} pages!`;
  }

  // library.appendChild(libraryList);
  libraryList.appendChild(book);

  readBtn.classList.add("readBtn");
  book.appendChild(readBtn);
  if (item.status === false) {
    readBtn.textContent = "Not Read";
    readBtn.style.backgroundColor = "#e04f63";
  } else {
    readBtn.textContent = "Read";
    readBtn.style.backgroundColor = "#63da63";
  }

  removeBtn.textContent = "Remove";
  removeBtn.setAttribute("id", "removeBtn");
  book.appendChild(removeBtn);

  // library.appendChild(libraryList);
  libraryList.appendChild(book);

  removeBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(item), 1);
    setData();
    render();
  });

  readBtn.addEventListener("click", () => {
    item.status = !item.status;
    setData();
    render();
  });
}

// Local Storage
// setting Library Storage
function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

// Loads Books
function restore() {
  if (!localStorage.myLibrary) {
    render();
  } else {
    let objects = localStorage.getItem("myLibrary"); // gets information from local storage to use in below loop to create DOM/display
    objects = JSON.parse(objects);
    myLibrary = objects;
    render();
  }
}

restore();
