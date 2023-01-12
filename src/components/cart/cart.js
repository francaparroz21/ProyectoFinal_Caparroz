let cart = []

function addProductsInLocalStorageInCart() {
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++)cart.push(JSON.parse(localStorage.getItem(i + 1)))
    }
}

function printPriceTotal() {
    const container = document.getElementById("cartProductsContainer")
    const div = document.createElement("div")
    div.innerHTML = `
    <p id='totalBuyPrice'>Total Price = $${updateTotalCartPrice(cart)}</p>
    `
    container.append(div)
}

function updateCartCount() {
    const cartCount = document.getElementById("cartCount")
    cartCount.innerText = cart.length
}

//Validacion de producto repetido.
const validationRepeatedProduct = (productId) => {
    const repeatedProduct = cart.find(product => product.id == productId)

    if (!repeatedProduct) {
        const product = arrayProducts.find(product => product.id == productId)
        cart.push(product)
        updateCart()
        updateCartCount()
        saveCartToStorage(cart)
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
    cart.forEach(element => {
        printCartProduct(element)
    });
    printPriceTotal()
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

const printTotalCart = (totalCart, totalBuyPrice) => {

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
            saveCartToStorage(cart)
            updateCart()
            if(product.amount == 1)document.getElementById("deleteAmountProduct"+product.id).remove()
        })
    }

    //Evento para el boton "+" que agrega +1 en cantidad.
    document.getElementById("addProduct" + product.id).addEventListener("click", () => {
        product.amount++
        saveCartToStorage(cart)
        updateCart()
    })

    //Evento delete en cada producto del carrito
    document.getElementById("deleteProductCart" + product.id).addEventListener("click", (e) => {
        cart.splice(cart.indexOf(product), cart.indexOf(product) + 1)
        saveCartToStorage(cart)
        updateCart()
        updateCartCount()

    })

    //Agregamos scrollbar al modal offcanvas
    document.getElementById("cartProductsContainer").setAttribute("scroll", true)
}




