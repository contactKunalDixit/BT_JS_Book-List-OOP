# BT_JS_Book-List-OOP

appES5.js : Prototype based solution
appES6.js: Class based solution

Comprises of the common structure stated below:

1.  2 constructors + class Storage:

a) BOOK: all instances of user inputs added as an object instance. (title,author,isbn)
b) UI: all methods added as prototype objects

        addBook()
        showAlert() :the alert should auto go away after 3 seconds
        clearFieldsafterAdd(): the inputs should auto remove itself after getting added to the list


        deleteBook(): when the user removes the element by clicking icon "X"

c) Class Storage : to persist data to local storage.
All methods will be static so there's no need to instantiate an object to use these methods but rather methods can be called directly from reference to classes

        fetch
        display
        push to local storage
        remove from local storage



2.  3 Event Listners:

a)  1st event is DOM upload and executes Store.displaybooks (uploads books from local storage)

b) focussed on submit
validation if the user input is "" in any of the fields>showAlert()
/else/
addBook() >>
addToLocalStorage()
showAlert() >>
clearFieldsAfterAdd()

c) Focussed on click (X for delete)
deleteBook()
removeBookfromLocalStorage()


