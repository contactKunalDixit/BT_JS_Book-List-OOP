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

UI.prototype.deleteBook = function (target) {
    if (target.className === "delete") {
        target.parentElement.parentElement.remove();
    }
}


// !OBSERVATION:
// !        WHETHER TO USE Storage.call(this,getBooks())    OR
// !                TO USE storage.getBooks()
// !    @ ITS NOT WORKING EITHER WAYS AT THE MOMENT
// !    @ USER ENTRIES TRANSITIONING INTO OBJECTS GETTING ADDED TO LOCAL STORAGE BUT NOT UPLOADING BY THEMSELVES ON DOMContentLoaded event below


function Storage() {}
var storage = new Storage() /*Instantiating a global object "storage" */

Storage.prototype.getBooks = function () {
    let books;
    if (localStorage.getItem("books") === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem("books"))
    }
    return books;
}
Storage.prototype.displayBooks = function () {
    // const books = storage.getBooks();
    const books = Storage.call(this,getBooks())
    books.forEach(function (book) {
        const ui = new UI();
        ui.addBookToList(book);
    });
}

Storage.prototype.addBook = function (book) {
    const books = storage.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books))
};
Storage.prototype.deleteBook = function (isbn, index) {
    const books = storage.getBooks();
    books.forEach(function (book) {
        if (book.isbn === isbn) {
            books.splice(index, 1)
        };
    });
    localStorage.setItem("books", JSON.stringify(books))
}


// Event Listeners



// Event listener for DOM load and fetching data from local storage

// ! CHECK FOR AN ISSUE HERE
document.addEventListener("DOMContentLoaded", storage.getBooks()) 
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
    const storage = new Storage();

    // Validate
    if (title === "" || author === "" || isbn === "") {
        // Error Alert
        ui.showAlert(`Please fill in all fields`, `error`);
    } else {
        // add book to list
        ui.addBookToList(book);
        storage.addBook(book) /*adding to local storage */

        // Show Success
        ui.showAlert("Book Added", "success");

        // clear fields
        ui.clearFieldsAfterAdd();
    }

    e.preventDefault();
});
//  Event listener for delete element
document.getElementById("book-list").addEventListener("click", function (e) {
    console.log(e)
    //    Instantiate the UI and storage objects in order to access and use prototype methods
    const ui = new UI();
    const storage = new Storage();

    ui.deleteBook(e.target)
    storage.deleteBook(e.target.parentElement.previousElementSibling.textContent) /* trying to target the element through unique isbn no. */

    // Show alert
    ui.showAlert("Book removed!", "success")


    e.preventDefault()
})
