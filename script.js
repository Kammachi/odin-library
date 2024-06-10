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
    let count = 0;

    for (let book of myLibrary) {
        const row = document.createElement('tr');
        const deleteButton = document.createElement('button');
        
        deleteButton.textContent = "DEL";

        deleteButton.setAttribute('class', 'deleteButton')
        deleteButton.setAttribute("data-id", count);
        count++;

        for (const key of Object.keys(book)) {
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

        row.appendChild(deleteButton);

        tableBody.appendChild(row);
    }

    let deleteButtons = document.querySelectorAll('.deleteButton');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            let id = parseInt(button.getAttribute('data-id'));

            myLibrary.splice(id, 1);

            let deletedRow = tableBody.querySelector(`tr:nth-child(${id+1})`);
            tableBody.removeChild(deletedRow);
            

            discardTable();
            displayLibrary();
        });
    });
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


