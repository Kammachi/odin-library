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
const book4 = new Book("The Brothers Karamazov", "Fyodor Dostoevsky", 
960, 1880, true);


addBooktoLibrary(book1);
addBooktoLibrary(book2);
addBooktoLibrary(book3);
addBooktoLibrary(book4);


function displayLibrary() {
    const tableBody = document.querySelector('tbody')

    for (let book of myLibrary) {
        let row = document.createElement('tr');

        for (let key of Object.keys(book)) {
            let bookInfo;

            if (key == "title")  {
                bookInfo = document.createElement('th');
                bookInfo.setAttribute('scope', 'row')
            } else {
                bookInfo = document.createElement('td');
            }

            bookInfo.textContent = book[key];


            row.appendChild(bookInfo);
        }

        tableBody.appendChild(row);
    }
}

displayLibrary();
