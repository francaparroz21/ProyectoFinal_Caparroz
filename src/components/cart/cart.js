let cart = []

//Validacion de producto repetido.
const validationRepeatedProduct = (productId) => {
    const repeatedProduct = cart.find(product => product.id == productId)

    if (!repeatedProduct) {
        const product = arrayProducts.find(product => product.id == productId)
        cart.push(product)
        printCartProduct(product)
    }
}

//Funcion para printear los productos del carrito.
const printCartProduct = (product) => {
    const cartContainer = document.getElementById("cartProductsContainer")
    const div = document.createElement("div")
    div.innerHTML = `
            <h4 class='nameProduct'> ${product.name}</h4 >
            <img class='imgProduct' src='${product.urlImg}'>
            <p>Description: ${product.description}</p>
            <p>Price: $${product.price}</p>
            <button id='${product.id}' class='btn btn-danger' type='button'>Delete</button>
            `
    cartContainer.appendChild(div)
}