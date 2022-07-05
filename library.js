let addBook = document.querySelector('.addBook');
let bookForm = document.querySelector('#bookForm');
let submitBtn = document.querySelector('.submitBtn');
let cancelBtn = document.querySelector(".cancelBtn");
let libArray = [];

function getProps(elem, prop) {
    return getComputedStyle(elem).getPropertyValue(prop);
}

//form display
addBook.addEventListener('click', () => {
    let myLibrary = document.querySelector('.library');
    let displayProp = getProps(bookForm, 'display');
    if (displayProp == 'none') {
        bookForm.style.display = 'flex';
        myLibrary.style.pointerEvents = 'none';
    } else {
        bookForm.style.display = 'none';
        myLibrary.style.pointerEvents = 'auto';
    }
})

//book object
class Library {
    constructor(bookName, author, pages) {
        this.bookName = bookName,
            this.authorName = author,
            this.pages = pages;
    }
}
//generating the book object and initiating the libGen

submitBtn.addEventListener('click', () => {
    let bookName = document.querySelector('#bookName').value;
    let authorName = document.querySelector('#authorName').value;
    let pages = document.querySelector("#pages").value;
    if (bookName == '' || authorName == '' || pages == '') return;
    let bookDetails = new Library(bookName, authorName, pages);
    libArray.push(bookDetails);
    hideReset();
    libGen(libArray);
})

//reset incase the add book is canceled

function hideReset() {
    let myLibrary = document.querySelector('.library');
    bookForm.style.display = 'none';
    document.querySelector('#bookName').value = '';
    document.querySelector('#authorName').value = '';
    document.querySelector("#pages").value = '';
    myLibrary.style.pointerEvents = 'auto';
}
//lib generator, looping through the array,creating HTML elems 

function libGen(arr) {
    let myLibrary = document.querySelector('.library');
    myLibrary.innerHTML = '';
    arr.forEach((elem, index) => {
        let newDiv = document.createElement('div');
        newDiv.setAttribute("data-column", `${index}`);
        newDiv.classList.add('myStyle');
        let keys = Object.values(elem);
        keys.forEach(key => {
            let newPara = document.createElement('p');
            newPara.textContent = key;
            newDiv.append(newPara);
        })
        newDiv.innerHTML += `<i class="fa-solid fa-circle-xmark"></i>`;
        newDiv.innerHTML += `<i class="fa-solid fa-trash-can"></i>`;
        myLibrary.append(newDiv);
    })
    delBook();
    readBook();
}

//cancel the book addition
cancelBtn.addEventListener('click', () => {
    hideReset();
})

//delete book and rerun the library generator func
function delBook() {
    let del = document.querySelectorAll('.fa-trash-can');
    del.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            let bookCol = e.target.closest('div');
            let bookIndex = bookCol.getAttribute('data-column');
            libArray.splice(bookIndex, bookIndex + 1);
            libGen(libArray);
        })
    })
}

function readBook() {
    let del = document.querySelectorAll('.fa-circle-xmark');
    del.forEach((elem) => {
        elem.addEventListener('click', () => {
                if (elem.classList.contains('fa-circle-xmark')) {
                    elem.classList.remove('fa-circle-xmark');
                    elem.classList.add('fa-circle-check');
                } else {
                    elem.classList.add('fa-circle-xmark');
                    elem.classList.remove('fa-circle-check');
                }
            })
    })
}