let cart = []

//Funcion para printear el precio total
function printPriceTotal() {
    const container = document.getElementById("cartProductsContainer")
    const div = document.createElement("div")
    div.innerHTML = `
    <p id='totalBuyPrice'>Total Price = $${updateTotalCartPrice(cart)}</p>
    `
    container.append(div)
}

//Funcion para actualizar contador
function updateCartCount() {
    const cartCount = document.getElementById("cartCount")
    cartCount.innerText = cart.length
}

//Validacion de producto repetido.
const validationRepeatedProduct = async (productId) => {
    const repeatedProduct = cart.find(product => product.id == productId)
    const products = await homeController()

    if (!repeatedProduct) {
        const productFinded = products.find(product => product.id == productId)
        cart.push(productFinded)
        saveCartToStorage(cart)
        updateCart()
        updateCartCount()
    } else {
        const amountProduct = document.getElementById("amountProduct" + productId)
        amountProduct.innerText = "Amount: " + repeatedProduct.amount++
        const priceProduct = document.getElementById("priceProduct" + productId)
        priceProduct.innerText = "Price: $" + repeatedProduct.price
        saveCartToStorage(cart)
        updateCart()
    }


}

//Funcion para actualizar carrito
function updateCart() {
    document.getElementById("cartProductsContainer").innerHTML = ""
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            printCartProduct(cart[i])
        }
        printPriceTotal()
        printBuyAndDeleteAllButtons()
    } else {
        printPriceTotal()
    }
}

function printBuyAndDeleteAllButtons() {
    const hr = document.createElement("hr")
    hr.style.color = "black";
    document.getElementById("cartProductsContainer").append(hr)
    const div = document.createElement("div")
    div.setAttribute("id", "buyAndDeleteAllButtons")
    div.innerHTML = `<button class='btn btn-success' id='buyAllProductsButton'>Buy</button>
    <button class='btn btn-danger' id='deleteAllButton'>Delete All</button>
    `
    document.getElementById("cartProductsContainer").appendChild(div)

    //Evento para boton Buy
    document.getElementById("buyAllProductsButton").addEventListener("click", () => {
        if (cart.length > 0) {
            resetValuesProducts()
            cart = []
            saveCartToStorage(cart)
            updateCart()

            //ALERT
            let timerInterval
            Swal.fire({
                title: 'Buy in process!',
                html: '<b></b>',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Buy successful',
                        showConfirmButton: false,
                    })
                }
            })
        }
    })


    //Evento para boton DeleteAll
    document.getElementById("deleteAllButton").addEventListener("click", () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't delete all Products!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete all.'
        }).then((result) => {
            if (result.isConfirmed) {
                resetValuesProducts()
                cart = []
                saveCartToStorage(cart)
                updateCart()
                updateCartCount()
                Swal.fire(
                    'Deleted!',
                    'Your cart has been deleted.',
                    'success'
                )
            }
        })
    })
}


//Funcion para guardar carrito
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

//Funcion para obtener carrito del storage
const getCartToStorage = (cart) => {
    return JSON.parse(localStorage.getItem("cart"))
}

//Funcion para actualizar el contador del carrito
const updateTotalCartCount = (cart) => {
    return cart.reduce((count, item) => count + item.amount, 0)
}

const updateTotalCartPrice = (cart) => {
    return cart.reduce((count, item) => count + (item.price * item.amount), 0)
}


//Funcion para printear los productos del carrito.
const printCartProduct = (product) => {
    const cartContainer = document.getElementById("cartProductsContainer")
    const div = document.createElement("div")
    div.setAttribute("class", "divProductCart")
    div.setAttribute("id", "divProductCart" + product.id)
    div.innerHTML = `
    <h4 class='nameProductCart'> ${product.name}</h4 >
        <div class='divProductCartFlex' id='divProductCart'>
            <div class ='divProductCartLeft'>
            <img class='productCart' src='${product.urlImg}'>
            </div>
            <div class='divProductCartRight'>
            <p>Description: ${product.description}</p>
            <p id='priceProduct${product.id}'>Price: $${product.price}</p>
            <p id='amountProduct${product.id}'>Amount: ${product.amount}</p>
            <div class='interactionButtonsCart'>
            <div id='divDeleteAmount${product.id}'>
            </div>
            <button class='btn btn-light' id='addProduct${product.id}'>+</button>
            <button id='deleteProductCart${product.id}' class='btn btn-danger deleteProductCartButton' type='button'>Delete</button>
            </div>
            </div>
        </div>
        <hr style='color:black'>
            `
    cartContainer.appendChild(div)
    if (document.getElementById("deleteAmountProduct" + product.id) == null && product.amount > 1) {
        const deleteAmountProduct = document.createElement("button")
        deleteAmountProduct.setAttribute("class", "btn btn-danger")
        deleteAmountProduct.setAttribute("id", "deleteAmountProduct" + product.id)
        deleteAmountProduct.innerText = "-"
        document.getElementById("divDeleteAmount" + product.id).append(deleteAmountProduct)

        //Evento para eliminar -1 en cantidad de productos.
        document.getElementById("deleteAmountProduct" + product.id).addEventListener("click", () => {
            product.amount--
            product.totalPrice = product.price * product.amount
            saveCartToStorage(cart)
            updateCart()
        })
    }

    //Evento para el boton "+" que agrega +1 en cantidad.
    document.getElementById("addProduct" + product.id).addEventListener("click", () => {
        product.amount++
        product.totalPrice = product.price * product.amount
        saveCartToStorage(cart)
        updateCart()
    })

    //Evento delete en cada producto del carrito
    document.getElementById("deleteProductCart" + product.id).addEventListener("click", (e) => {
        resetValuesProducts()
        cart.splice(cart.indexOf(product), cart.indexOf(product) + 1)
        saveCartToStorage(cart)
        updateCart()
        updateCartCount()
    })
}




