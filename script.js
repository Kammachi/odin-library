const myLibrary = [];

function Book(title, author, pages, year, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = read;
}

function addBooktoLibrary(bookToAdd) {
    myLibrary.push(bookToAdd);
}

const book1 = new Book("Title1", "Author1", 0, 2000, true);
const book2 = new Book("Title2", "Author2", 122, 1992, false);
const book3 = new Book("Title3", "Author3", 900, 1094, true);


addBooktoLibrary(book1);
addBooktoLibrary(book2);
addBooktoLibrary(book3);


function displayLibrary() {
    const tableBody = document.querySelector('tbody')

    for (let book of myLibrary) {
        let row = document.createElement('tr');

        for (let value of Object.values(book)) {
            let bookInfo = document.createElement('td');
            bookInfo.textContent = value;


            row.appendChild(bookInfo);
        }

        tableBody.appendChild(row);
    }
}

displayLibrary();
