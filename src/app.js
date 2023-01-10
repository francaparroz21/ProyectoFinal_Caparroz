//Funcion para printear productos
function printProducts() {
    const div = document.createElement("div");
    div.setAttribute("id", "divProducts")
    div.setAttribute("class", "container")
    document.getElementById("main").append(div)
    for (let i = 0; i < arrayProducts.length; i++) {

        const idProduct = arrayProducts[i].id
        const nameProduct = arrayProducts[i].name
        const descProduct = arrayProducts[i].description
        const priceProduct = arrayProducts[i].price
        const urlImg = arrayProducts[i].urlImg

        const appendProduct = document.createElement("div")
        appendProduct.setAttribute("id", "product" + idProduct)
        appendProduct.innerHTML = `<h4 class='nameProduct'>${nameProduct}</h4>
                                   <img class='imgProduct' src='${urlImg}'>
                                   <p>Description: ${descProduct}</p>
                                   <p>Price: $${priceProduct}</p>
                                   <button id='${idProduct}' class='addToCart btn btn-light' type='button'>Add to Cart</button>`
        document.getElementById("divProducts").append(appendProduct)
    }
}

//Eventos para cada uno de los botonees (add to cart).Agrega un producto al carrito (localstorage)
function addEventsCartButtons() {
    const addToCartButtons = document.getElementsByClassName("addToCart")

    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", (e) => {
            const idProduct = e.target.id
            const product = findById(idProduct)

            if (localStorage.getItem(idProduct) == null) {
                localStorage.setItem(idProduct, JSON.stringify(product))

                productAddedToast()

                //Boton eliminar que se agrega en el DOM
                const deletAnyProduct = document.createElement("div")
                deletAnyProduct.setAttribute("class", "divDeleteProduct")
                deletAnyProduct.innerHTML = `<button id='delete${idProduct}' class='deleteProductButton btn btn-danger'>Delete</button>`
                document.getElementById("product" + idProduct).append(deletAnyProduct)

                //Evento para el boton de eliminar, que si se toca, se elimina dicho boton y el producto del localstorage
                document.getElementById("delete" + idProduct).addEventListener("click", () => {
                    localStorage.removeItem(idProduct)
                    deletAnyProduct.remove()
                })

            } else {
                productAlreadyAddedToast()
            }
        })
    }
}

//Funcion que printea un Toast, si el producto ya esta agregado al carrito.
function productAlreadyAddedToast() {
    Toastify({
        text: "Product already added to cart!",
        duration: "3000",
        backgroundColor: "red"
    }).showToast()
}

//Funcion que printea un Toast, si el producto se agrego correctamente.
function productAddedToast() {
    Toastify({
        text: "Product added to cart!",
        duration: "3000",
        backgroundColor: "green",
    }).showToast()
}

//Funcion para buscar productos por id. Devuelve un solo objeto ya que el id es unico e incremental.
function findById(idFind) {
    for (let i = 0; i < arrayProducts.length; i++) {
        if (arrayProducts[i].id == idFind) return arrayProducts[i];
    }
    return "Not found";
}