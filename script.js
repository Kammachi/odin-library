const myLibrary = [];

function Book(title, author, pages, read, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
}

function addBooktoLibrary(title, author, pages, read, rating) {
    let bookToAdd = new Book(title, author, pages, read, rating)
    myLibrary.push(bookToAdd);
}


addBooktoLibrary("Title1", "Author1", 0, true, 8);
addBooktoLibrary("Title2", "Author2", 122, false, "-");
addBooktoLibrary("Title3", "Author3", 900, true, 3);
addBooktoLibrary("The Brothers Karamazov", "Fyodor Dostoevsky", 
                960, true, 9);


const tableBody = document.querySelector('tbody')


function displayLibrary() {

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


const newBook = document.querySelector('.newBookButton');
const dialog = document.querySelector('#dialog');

newBook.addEventListener('click', () => {
    dialog.show();
});



function discardTable() {
    for (let book of myLibrary) {
        tableBody.removeChild(document.querySelector('tbody tr'));
    }
}


const form = document.querySelector('form');
const cancel = document.querySelector('#cancel');

form.addEventListener('submit', (event) => {

    const newTitle = document.querySelector('#title');
    const newAuthor = document.querySelector('#author');
    const newPages = document.querySelector('#pages');
    const newRead = document.querySelector('input[name="read"]:checked');
    const newRating = document.querySelector('#rating');

    discardTable();

    addBooktoLibrary(newTitle.value, newAuthor.value, newPages.value, 
                    newRead.value, newRating.value)

    displayLibrary();

    event.preventDefault();
});

cancel.addEventListener('click', () => {
    dialog.close();
});


displayLibrary();