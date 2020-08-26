/*the 2 functions which were constructor functions in appES5.js will be classes 
here*/

// Classes Defined

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// for all the UI oriented actions
class UI {
    constructor() {
        // Nothing to be added here    
    }
    addBookToList(book) {
        const list = document.querySelector("#book-list")
        const row = document.createElement("tr")
        // insert cols into row
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        list.appendChild(row)
    }
    showAlert(message, className) {
        let div = document.createElement("div")
        div.className = `alert ${className}`

        div.appendChild(document.createTextNode(message))

        let container = document.querySelector(".container")
        let form = document.querySelector("#book-form")
        container.insertBefore(div, form)
        // TimeOut after 3 Seconds
        setTimeout(function () {
            document.querySelector(".alert").remove()
        }, 3000)
    }
    clearFieldsAfterAdd() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = ""
    }

    deleteBook(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove()
        }
    }

}

// Local Storage Class

class Store {

    // fetch books from local storage
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books;
    }


    // load it to the display 
    static displayBooks() {
        const books = Store.getBooks()

        books.forEach(function(book){       /*The parameter is a requirement for the method being used - "addBookTo List" associated with object ui*/
            const ui = new UI() /*Instantiating in order to use access below method*/
            // Add book to UI
            ui.addBookToList(book)/*calling this method to display all books stored in local storage */
        })
    }

    // add to local storage
    static addBook(book) {
        const books = Store.getBooks() /*using actual class name 'Store' bcoz its a static method, and since has not been in existance as a result of instantiation of an object, would always be used with reference to the class itself, the class in which it resides */
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books))


    }
    // remove from local storage
    static removeBook(isbn,index) {
const books=Store.getBooks();

books.forEach(function (book){
   
    if(book.isbn===isbn){
        books.splice(index,1)
    }
});
localStorage.setItem("books",JSON.stringify(books))

    }


}

//  DOM load event - 1st event to happen when DOM loads - this calls Store.displayBooks when the DOM uploads

document.addEventListener("DOMContentLoaded",Store.displayBooks)

document.querySelector("#book-form").addEventListener("submit", function (e) {
    let titleV = document.querySelector("#title").value,
        authorV = document.querySelector("#author").value;
    isbnV = document.querySelector("#isbn").value;


    let book = new Book(titleV, authorV, isbnV)
    // console.log(book)
    let ui = new UI()

    // Validate
    if (titleV === "" || authorV === "" || isbnV === "") {
        // Error alert
        ui.showAlert(`Please fill in all fields`, `error`)
    } else {
        // add book to list
        ui.addBookToList(book)

        //  Add to local storage
        // We dont need to instantiate any object since this is an static method. We can use the method straightaway without instantiaing any object
        Store.addBook(book)

        // Show success
        ui.showAlert(`Book Added`, "success")

        // clear fields
        ui.clearFieldsAfterAdd()
    }

    e.preventDefault()
})

document.querySelector("#book-list").addEventListener("click", function (e) {
    const ui = new UI()
    ui.deleteBook(e.target) /*Delete book */
   
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent) /*Remove from Local storage**Bcoz there's no usage of ID to identify and relate to uniqueness, we are opting for unique isbn*/


    ui.showAlert("Book removed", "success")
    e.preventDefault()
})
