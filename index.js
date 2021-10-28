window.onload = () => {

    const addBooks = () => fetch('https://striveschool-api.herokuapp.com/books')
        .then((response) => response.json())
        .then(receivedData => {
            console.log(receivedData)
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
                    <img src="${ book.img }" class="card-img-top" alt="...">
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

    addBooks()

    const addToCart = (event) => {
        const selectedCardTitle = event.target.parentNode.children[1].children[0]
        const cartList = document.querySelector('.list-group .text-dark')
        const cartItem = document.createElement('li')
        cartItem.classList.add('list-group-item')
        cartItem.innerText = selectedCardTitle.innerText
        cartList.appendChild(cartItem)
        const emptyBasketMessage = document.querySelector('.list-group .text-dark>li')
        emptyBasketMessage.classList.add('d-none')
        const selectedCard = event.target.parentNode
        const inCartBadge = document.createElement('span')
        inCartBadge.classList.add('badge')
        inCartBadge.classList.add('badge-warning')
        inCartBadge.innerText = 'already in your cart!'
        selectedCard.prepend(inCartBadge)
    }























}