const tableBody = document.querySelector('tbody');

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


addBooktoLibrary("Title2", "Author2", 122, "No", "-");
addBooktoLibrary("Title1", "Author1", 0, "Yes", 8);
addBooktoLibrary("Title3", "Author3", 900, "Yes", 3);
addBooktoLibrary("The Brothers Karamazov", "Fyodor Dostoevsky", 
                960, "Yes", 9);


function displayLibrary() {
    /* setting a counter to associate buttons with books */
    let count = 0;

    /* generating rows for the table */
    for (let book of myLibrary) {
        const row = document.createElement('tr');
        const deleteButton = document.createElement('button');
        const toggleButton = document.createElement('button');

        /* creating an svg element and adding it to the button */
        const svg = `<svg xmlns="http://www.w3.org/2000/svg"  width="24" 
                    height="24"  viewBox="0 0 24 24"  fill="#663526"  
                    stroke="#EEE"  stroke-width="2"  
                    stroke-linecap="round"  stroke-linejoin="round"  
                    class="icon icon-tabler icons-tabler-outline icon-tabler-square-x" 
                    fill="white"><path stroke="none" d="M0 0h24v24H0z" 
                    fill="none"/><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
                    <path d="M9 9l6 6m0 -6l-6 6" /></svg>`;

        deleteButton.innerHTML = svg;


        deleteButton.classList.add('deleteButton')
        deleteButton.setAttribute("data-id", count);
        
        toggleButton.textContent = "Toggle";
        toggleButton.classList.add('toggleButton')
        toggleButton.setAttribute("data-id", count);
        count++;

        /* generating a row */
        for (const key of Object.keys(book)) {
            let bookInfo;

            if (key === "title")  {
                bookInfo = document.createElement('th');
                bookInfo.setAttribute('scope', 'row')
            } else {
                bookInfo = document.createElement('td');
            }

            bookInfo.textContent = book[key];

            /* adding a toggle button between data */
            if (key === "read") {
                bookInfo.appendChild(toggleButton);
            }

            row.appendChild(bookInfo);
        }

        row.appendChild(deleteButton);

        tableBody.appendChild(row);
    }

    /* delete buttons listeners */
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

    /* toggle buttons listeners */
    let toggleButtons = document.querySelectorAll('.toggleButton');

    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            let id = parseInt(button.getAttribute('data-id'));

            myLibrary[id].read = myLibrary[id].read === "Yes" ? "No" : "Yes";

            discardTable()
            displayLibrary();
        });
    });
}


displayLibrary();


function discardTable() {
    for (let book of myLibrary) {
        tableBody.removeChild(document.querySelector('tbody tr'));
    }
}

/* sorting */

const headers = document.querySelectorAll('thead th');

headers.forEach((header) => {
    const thingToSort = header.querySelector('span')

    header.addEventListener('click', (e) => {
        sortTable(thingToSort.textContent.toLowerCase());
        e.stopPropagation();
    });
});

let criteriaList = {
    "title": false,
    "author": false,
    "pages": false,
    "read": false,
    "rating": false,
}

function sortTable(criteria) {

    myLibrary.sort((book1, book2) => {
        let criteria1 = book1[criteria] === "-" ? "0" : book1[criteria];
        let criteria2 = book2[criteria] === "-" ? "0" : book2[criteria];

        let statement = criteriaList[criteria] === true ?
                 criteria1 > criteria2 : criteria1 < criteria2;

        if (statement) {
            return -1;
        } else if (criteria1 === criteria2) {
            return 0;
        }

        return 1;
    });

    criteriaList[criteria] = !criteriaList[criteria];

    discardTable()
    displayLibrary();
}



/* form */


const newBook = document.querySelector('.newBookButton');
const dialog = document.querySelector('#dialog');
const form = document.querySelector('form');
const cancel = document.querySelector('#cancel');

/* opens the form */
newBook.addEventListener('click', () => {
    dialog.show();
});


form.addEventListener('submit', (event) => {

    const newTitle = document.querySelector('#title');
    const newAuthor = document.querySelector('#author');
    const newPages = document.querySelector('#pages');
    const newRead = document.querySelector('input[name="read"]:checked');
    const newRating = document.querySelector('#rating');

    discardTable();

    addBooktoLibrary(newTitle.value, 
            !newAuthor.value ? "-" :newAuthor.value,
            !newPages.value  ? "-" :newPages.value, 
            newRead.value, 
            !newRating.value ? "-" :newRating.value)

   
    displayLibrary();

    event.preventDefault();
});

/* closes the form */
cancel.addEventListener('click', () => {
    dialog.close();
});
