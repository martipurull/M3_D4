window.onload = () => {

    const loadBooks = () => fetch('https://striveschool-api.herokuapp.com/books')
        .then((response) => response.json())
        .then(receivedData => {
            receivedData.forEach(book => {
                const bookCardRow = document.querySelector('.col-9 .row')
                const bookCardCol = document.createElement('div')
                bookCardCol.classList.add('col-6')
                bookCardCol.classList.add('col-md-4')
                bookCardCol.classList.add('col-lg-3')
                bookCardCol.classList.add('my-3')
                bookCardRow.appendChild(bookCardCol)
                const bookCard = document.createElement('div')
                bookCard.classList.add('card')
                bookCard.classList.add('h-100')
                bookCard.classList.add('text-dark')
                bookCard.innerHTML = `
                    <a href="https://striveschool-api.herokuapp.com/books/${ book.asin }">
                    <img src="${ book.img }" class="card-img-top" alt="...">
                    </a>
                    <div class="card-body">
                    <h6 class="card-text">${ book.title }</h6>
                    <p class="card-text">£${ book.price }</p>
                    <small class="card-text">${ book.category }</small>
                    </div>
                `
                bookCardCol.appendChild(bookCard)
                const addToCartBtn = document.createElement('button')
                addToCartBtn.classList.add('btn')
                addToCartBtn.classList.add('btn-success')
                addToCartBtn.innerText = 'add to cart'
                addToCartBtn.addEventListener('click', addToCart)
                bookCard.appendChild(addToCartBtn)
                const skipBtn = document.createElement('button')
                skipBtn.classList.add('btn')
                skipBtn.classList.add('btn-secondary')
                skipBtn.classList.add('btn-sm')
                skipBtn.classList.add('my-1')
                skipBtn.innerText = 'hide book'
                skipBtn.addEventListener('click', function () {
                    bookCard.classList.add('d-none')
                })
                bookCard.appendChild(skipBtn)
            })
        })

    loadBooks()

    const addToCart = (event) => {
        const selectedCardTitle = event.target.parentNode.children[1].children[0]
        const cartList = document.querySelector('.list-group .text-dark')
        const cartItem = document.createElement('li')
        cartItem.classList.add('list-group-item')
        cartItem.innerText = selectedCardTitle.innerText
        const removeBtn = document.createElement('span')
        removeBtn.classList.add('btn')
        removeBtn.classList.add('btn-sm')
        removeBtn.classList.add('btn-danger')
        removeBtn.innerText = 'x'
        removeBtn.addEventListener('click', function (e) {
            e.target.parentNode.remove()
            emptyBasketMessage.classList.toggle('d-none')
        })
        cartItem.appendChild(removeBtn)
        cartList.appendChild(cartItem)
        const emptyBasketMessage = document.querySelector('.list-group .text-dark>li')
        emptyBasketMessage.classList.add('d-none')
        const selectedCard = event.target.parentNode
        const inCartBadge = document.createElement('span')
        inCartBadge.classList.add('badge')
        inCartBadge.classList.add('badge-warning')
        inCartBadge.innerText = 'already in your cart!'
        selectedCard.prepend(inCartBadge)
        const deleteAllBtn = document.getElementById('deleteAllBtn')
        deleteAllBtn.classList.remove('d-none')
        deleteAllBtn.addEventListener('click', emptyCart)
    }



    const filterBooks = () => fetch('https://striveschool-api.herokuapp.com/books')
        .then((response) => response.json())
        .then(receivedData => {
            const searchInputValue = document.querySelector('form input').value
            console.log(searchInputValue)
            return receivedData.filter(book => book.title.includes(searchInputValue))
        })
        .then(filteredData => {
            filteredData.forEach(book => {
                const bookCardRow = document.querySelector('.col-9 .row')
                const bookCardCol = document.createElement('div')
                bookCardCol.classList.add('col-6')
                bookCardCol.classList.add('col-md-4')
                bookCardCol.classList.add('col-lg-3')
                bookCardCol.classList.add('my-3')
                bookCardRow.appendChild(bookCardCol)
                const bookCard = document.createElement('div')
                bookCard.classList.add('card')
                bookCard.classList.add('h-100')
                bookCard.classList.add('text-dark')
                bookCard.innerHTML = `
                    <a href="https://striveschool-api.herokuapp.com/books/${ book.asin }"><img src="${ book.img }" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                    <h6 class="card-text">${ book.title }</h6>
                    <p class="card-text">£${ book.price }</p>
                    <small class="card-text">${ book.category }</small>
                    </div>
                `
                bookCardCol.appendChild(bookCard)
                const addToCartBtn = document.createElement('button')
                addToCartBtn.classList.add('btn')
                addToCartBtn.classList.add('btn-success')
                addToCartBtn.innerText = 'add to cart'
                addToCartBtn.addEventListener('click', addToCart)
                bookCard.appendChild(addToCartBtn)
                const skipBtn = document.createElement('button')
                skipBtn.classList.add('btn')
                skipBtn.classList.add('btn-secondary')
                skipBtn.classList.add('btn-sm')
                skipBtn.classList.add('my-1')
                skipBtn.innerText = 'hide book'
                skipBtn.addEventListener('click', function () {
                    bookCard.classList.add('d-none')
                })
                bookCard.appendChild(skipBtn)
            })
        })


    const makeSearchBtn = () => {
        const searchBtn = document.getElementById('searchBtn')
        searchBtn.addEventListener('click', filterBooks)
    }
    makeSearchBtn()

    const emptyCart = () => {
        const cartList = document.querySelector('.list-group .text-dark')
        cartList.innerHTML = ''
        cartList.innerHTML = `<li class="list-group-item">Your basket is empty! <i class="bi bi-emoji-frown"></i>`
        const deleteAllBtn = document.getElementById('deleteAllBtn')
        deleteAllBtn.classList.add('d-none')
        const addedToCartBadges = document.querySelectorAll('.badge-warning')
        addedToCartBadges.forEach(badge => badge.remove())
    }

}