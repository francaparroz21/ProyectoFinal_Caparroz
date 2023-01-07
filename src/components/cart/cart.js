let cart = []

//Validacion de producto repetido.
const validationRepeatedProduct = (productId) =>{
    const repeatedProduct = cart.find(product => product.id == productId)

    if(!repeatedProduct){
        const product = arrayProducts.find(product => product.id == productId)
        cart.push(product)
        printCartProduct(product)
    }
}

//Funcion para printar los productos del carrito.
const printCartProduct = (product) => {

}

//Funcion que agrega productos al carrito mediante un evento a un boton.
function addEventsCartButtons() {
    //Eventos para cada uno de los botonees (add to cart).Agrega un producto al carrito (localstorage)
    const addToCartButtons = document.getElementsByClassName("addToCart")

    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", (e) => {
            const idProduct = e.target.id
            const product = findById(idProduct)

            if (localStorage.getItem(idProduct) == null) {
                localStorage.setItem(idProduct, JSON.stringify(product))

                Toastify({
                    text: "Product added to cart!",
                    duration: "3000",
                    backgroundColor: "green",
                }).showToast()


                const deletAnyProduct = document.createElement("div")
                deletAnyProduct.setAttribute("class","divDeleteProduct")
                deletAnyProduct.innerHTML = `<button id='delete${idProduct}' class='deleteProductButton btn btn-danger'>Delete</button>`
                document.getElementById("product" + idProduct).append(deletAnyProduct)

                document.getElementById("delete" + idProduct).addEventListener("click", () => {
                    localStorage.removeItem(idProduct)
                    deletAnyProduct.remove()
                })
            }else{
                Toastify({
                    text: "Product already added to cart!",
                    duration: "3000",
                    backgroundColor: "red"
                }).showToast()
            }
        })
    }
}