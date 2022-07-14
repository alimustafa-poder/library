let addBook = document.querySelector('.addBook');
let submitBtn = document.querySelector('.submitBtn');
let cancelBtn = document.querySelector(".cancelBtn");


let libArray = [];

function getProps(elem, prop) {
    return getComputedStyle(elem).getPropertyValue(prop);
}

//form display
addBook.addEventListener('click', () => {
    let bookForm = document.querySelector('#bookForm');
    let myLibrary = document.querySelector('.library');
    if (bookForm.classList.contains('active')) {
        bookForm.classList.remove('active');
        myLibrary.style.pointerEvents = 'auto';
    }
    else{
        bookForm.classList.add('active');
        myLibrary.style.pointerEvents = 'none';
    }
})

//book object
class Library {
    constructor(bookName, author, pages, read) {
        this.bookName = bookName,
            this.authorName = author,
            this.pages = pages,
            this.read = read;
    }
}
//generating the book object and initiating the libGen

submitBtn.addEventListener('click', () => {
    let bookName = document.querySelector('#bookName').value;
    let authorName = document.querySelector('#authorName').value;
    let pages = document.querySelector("#pages").value;
    let read = sliderChange();
    if (bookName == '' || authorName == '' || pages == '') return;
    let bookDetails = new Library(bookName, authorName, pages, read);
    libArray.push(bookDetails);
    hideReset();
    libGen(libArray);
})

//reset incase the add book is canceled

function hideReset() {
    let myLibrary = document.querySelector('.library');
    bookForm.classList.remove('active');
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
            if (key === true || key === false) return;
            let newPara = document.createElement('p');
            newPara.textContent = key;
            newDiv.append(newPara);
            newPara.classList.add('elemWidth');
        })
        if (elem['read'] == false) {
            newDiv.innerHTML += `<i class="fa-solid fa-circle-xmark"></i>`;
        } else if (elem['read'] == true) {
            newDiv.innerHTML += `<i class="fa-solid fa-circle-check"></i>`;
        }
        newDiv.innerHTML += `<i class="fa-solid fa-trash-can"></i>`;
        myLibrary.append(newDiv);
    })
    delBook();
}

//cancel the book addition
cancelBtn.addEventListener('click', () => {
    hideReset();
})

//delete book and rerun the library generator func
function delBook() {
    let del = document.querySelectorAll('.fa-trash-can');
    del.forEach((elem,index) => {
        elem.addEventListener('click', (e) => {
            let bookCol = e.target.closest('div');
            let bookIndex = bookCol.getAttribute('data-column');
            if (bookIndex != libArray.indexOf(libArray[index])) return;
            libArray.splice(bookIndex, 1);
            libGen(libArray);
        })
    })
}

function sliderChange() {
    let slider = document.querySelector("input[type=checkbox]");
    if (slider.checked) {
        return true;
    } else {
        return false;
    }
}