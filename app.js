const bookWrapper = document.querySelector('#bookDisplayRow')
const cartList = document.querySelector('#cartList')

window.onload = () => {

    loadBooks()
}

let loadedBooks = []

let shoppingCartList = []

let filteredBooks = []

function loadBooks() {
    fetch('https://striveschool-api.herokuapp.com/books')
        .then((response) => response.json())
        .then((receivedData) => {
            loadedBooks = receivedData
            console.log(loadedBooks)
            displayBooks()
        })
        .catch((error) => console.log(error.message))
}

function displayBooks(receivedData = loadedBooks) {
    bookWrapper.innerHTML = ''
    receivedData.forEach((book) => {
        bookWrapper.innerHTML +=
            `<div class="col-6 col-md-4 col-lg-3 my-3">
                <div class="card h-100 text-dark">
                    <img src="${ book.img }" class="card-img-top"
                    <div class="card-body d-flex">
                        <h6 class="card-text">${ book.title }</h6>
                        <p class="card-text">£${ book.price }</p>
                        <small class="card-text">${ book.category }</small>
                        <button class="btn btn-success" onclick="addToCart('${ String(book.asin) }', this)">add to cart</button>
                        <button class="btn btn-secondary btn-sm my-1" onclick="hideBook(this)">hide book</button>
                    </div>
                </div>
            </div>`
    })
}



function addToCart(asin, clickedBtn) {
    const addedBook = loadedBooks.find((book) => book.asin == asin)
    shoppingCartList.push(addedBook)
    refreshCartList()
    const inCartBadge = document.createElement('span')
    inCartBadge.classList.add('badge')
    inCartBadge.classList.add('badge-warning')
    inCartBadge.innerText = 'already in your cart!'
    clickedBtn.closest('.card').prepend(inCartBadge)
    const deleteAllBtn = document.getElementById('deleteAllBtn')
    deleteAllBtn.classList.remove('d-none')
    deleteAllBtn.addEventListener('click', emptyCart)
}

function refreshCartList() {
    cartList.innerHTML = ''
    shoppingCartList.forEach((book) => {
        cartList.innerHTML += `
        <li class="list-group-item">${ book.title }</li>
        <span class="btn btn-sm btn-danger" onclick="removeFromCart('${ String(book.asin) }')">x</span>
        `
    })
}



function hideBook(clickedBtn) {
    clickedBtn.closest('.col-6').remove()
}

function removeFromCart(asin) {
    const indexOfBookToDelete = shoppingCartList.findIndex((book) => book.asin === asin)
    if (indexOfBookToDelete !== -1) {
        shoppingCartList.splice(indexOfBookToDelete, 1)
    }
    refreshCartList()
    if (shoppingCartList.length === 0) {
        const deleteAllBtn = document.getElementById('deleteAllBtn')
        deleteAllBtn.classList.add('d-none')
        cartList.innerHTML = `
    <li class="list-group-item">Your basket is empty! <i class="bi bi-emoji-frown"></i></li>
    `
    }
}

function emptyCart() {
    shoppingCartList = []
    refreshCartList()
    cartList.innerHTML = `
    <li class="list-group-item">Your basket is empty! <i class="bi bi-emoji-frown"></i></li>
    `
    const deleteAllBtn = document.getElementById('deleteAllBtn')
    deleteAllBtn.classList.add('d-none')

}

function searchBooks(query) {
    if (query.length < 3) {
        filteredBooks = loadedBooks
        displayBooks()
        return
    }
    filteredBooks = loadedBooks.filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
    console.log(filteredBooks)
    displayBooks(filteredBooks)
}