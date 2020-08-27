/* The approach adopted here: constructors and prototypes */

// TODO: Book Constructor: this will handle creating the actual book object;

// ToDo: UI Constructor: will handle certain prototype methods like adding book to the list,delete the book, show the alert and other actions that have to do with the UI

// Book Constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor : we are passing it as an empty function because everything else is going to go inside prototype, which then be eventually used by object instance ui
function UI() {}

// Methods to be added in prototype of UI constructor defined below:

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert cols/ tabledata into tr
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#"class="delete">X<a></td>
    `;

    list.appendChild(row);
};


UI.prototype.showAlert = function (message, className) {
    // create div
    const div = document.createElement("div");
    // Add classes: 2 classes being added : alert and the ${className}
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");
    // insert alert - insertBefore(what we want to insert, and before what)
    container.insertBefore(div, form);
    // Timeout after 3 seconds
    setTimeout(function () {
        document.querySelector(".alert").remove();
    }, 3000);
};


UI.prototype.clearFieldsAfterAdd = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
};

UI.prototype.deleteBook=function(target){
    if(target.className ==="delete"){
        target.parentElement.parentElement.remove();
    }
}


// Event Listeners


// Event listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
    //  Get form values
    let title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;

    console.log(title, author, isbn);

    // instantiaing a book
    const book = new Book(title, author, isbn);

    // Instantiating a UI
    const ui = new UI();
  

    // Validate
    if (title === "" || author === "" || isbn === "") {
        // Error Alert
        ui.showAlert(`Please fill in all fields`, `error`);
    } else {
        // add book to list
        ui.addBookToList(book);

        // Show Success
        ui.showAlert("Book Added", "success");

        // clear fields
        ui.clearFieldsAfterAdd();
    }

    e.preventDefault();
});
//  Event listener for delete element
document.getElementById("book-list").addEventListener("click",function(e){
   console.log(e)
//    Instantiate the UI
    const ui = new UI();
    ui.deleteBook(e.target)

    // Show alert
    ui.showAlert("Book removed!", "success")


    e.preventDefault()
})


// ?????????????????????????????????????????????????????????????????????????
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// /**                            PRACTICE                */
// * Creating a Book constructor
// let Book = function(title, author, isbn){
//     this.title=title;
//     this.author = author;
//     this.isbn = isbn
// }

// // * creating a UI constructor
// let UI = function(){} /* Leaving it blank as its prime role is to accumulate and store all methods in its prototypes*/

// UI.prototype.addBookToList = function(book){
// let list = document.getElementById("book-list");
// let row = document.createElement("tr")
// row.innerHTML = `
// <td>${book.title}</td>
// <td>${book.author}</td>
// <td>${book.isbn}</td>
// <td><a href="#"class="delete">X</a></td>`
// list.appendChild(row)
// }


// UI.prototype.showAlert = function(message,className){
//     let div = document.createElement("div")
//     div.classList = `alert ${className}`;
//     div.appendChild(document.createTextNode(message));
//     let container= document.querySelector(".container");
//     let form = document.querySelector("#book-form")
//     container.insertBefore(div,form)
//     setTimeout(function(){
//         document.querySelector(".alert").remove()
//     },3000
//     )
// }

// UI.prototype.deleteBook = function(target){
//     if(target.className==="delete"){
//         document.querySelector(".delete").parentElement.parentElement.remove()
// }}



// UI.prototype.clearELementsAfterAddingList = function(){
//     document.getElementById("title").value = "";
//     document.getElementById("author").value = "";
//     document.getElementById("isbn").value = "";
// }

// document.getElementById("book-form").addEventListener("submit",function(e){
//     let titleV = document.getElementById("title").value,
//     authorV= document.getElementById("author").value,
//     isbnV = document.getElementById("isbn").value

//     let book = new Book(titleV,authorV,isbnV)

//     let ui = new UI()

// if(titleV===""||authorV===""||isbnV===""){
// ui.showAlert(`Please fill in all columns`,"error")
// }else{
//     ui.addBookToList(book);
//     ui.showAlert(`Book succesfully added`,"success")
//         ui.clearELementsAfterAddingList()
// }

//     e.preventDefault()
// })

// /*on dynamically added or amended elements, always choose parent element rahter than specific element, otherwise, you'll have to add a class on each element to manage its control */
// document.getElementById("book-list").addEventListener("click",function(e){
//     let ui = new UI()
//     ui.deleteBook(e.target)
//     ui.showAlert("Book Deleted!","success")

//     e.preventDefault()
// })