let cart = []

//Validacion de producto repetido.
const validationRepeatedProduct = (productId) => {
    const repeatedProduct = cart.find(product => product.id == productId)

    if (!repeatedProduct) {
        const product = arrayProducts.find(product => product.id == productId)
        cart.push(product)
        printCartProduct(product)
    } else {
        repeatedProduct.amount++
        const amountProduct = document.getElementById("amountProduct" + productId)
        amountProduct.innerText = "Amount: " + repeatedProduct.amount
    }
}

//Funcion para printear los productos del carrito.
const printCartProduct = (product) => {
    const cartContainer = document.getElementById("cartProductsContainer")
    const div = document.createElement("div")
    div.setAttribute("class", "divProductCart")
    div.setAttribute("id","divProductCart"+product.id)
    div.innerHTML = `
    <h4 class='nameProductCart'> ${product.name}</h4 >
        <div class='divProductCartFlex'>
            <div class ='divProductCartLeft'>
            <img class='productCart' src='${product.urlImg}'>
            </div>
            <div class='divProductCartRight'>
            <p>Description: ${product.description}</p>
            <p>Price: $${product.price}</p>
            <p id='amountProduct${product.id}'>Amount: ${product.amount}</p>
            <div class='divDeleteCartProduct' ><button id='deleteProductCart${product.id}' class='btn btn-danger' type='button'>Delete</button></div>
            </div>
        </div>
            `
    cartContainer.appendChild(div)
    //Evento delete en cada producto del carrito
    document.getElementById("deleteProductCart"+product.id).addEventListener("click", (e) =>{
        cart.splice(cart.indexOf(product), cart.indexOf(product)+1)
        document.getElementById("divProductCart"+product.id).remove()
        localStorage.removeItem(product.id)
    })

    document.getElementById("cartProductsContainer").setAttribute("scroll",true)


}

