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

    deleteBook(target){
        if(target.className==="delete"){
            target.parentElement.parentElement.remove()
        }
    }

}

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
        // Show success
        ui.showAlert(`Book Added`, "success")

        // clear fields
        ui.clearFieldsAfterAdd()
    }

    e.preventDefault()
})

document.querySelector("#book-list").addEventListener("click",function(e){
    const ui = new UI()
    ui.deleteBook(e.target)

    ui.showAlert("Book removed","success")
    e.preventDefault()
})