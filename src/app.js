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
        appendProduct.setAttribute("class","sectionProduct")
        appendProduct.setAttribute("id", "product" + idProduct)
        appendProduct.innerHTML = `<h4 class='nameProduct'>${nameProduct}</h4>
                                   <img class='imgProduct' src='${urlImg}'>
                                   <p>Description: ${descProduct}</p>
                                   <p>Price: $${priceProduct}</p>
                                   <div class='addToCartFlex'>
                                   <button id='${idProduct}' class='btn btn-outline-success addToCart' type='button'>Add to Cart</button>
                                   </div>`
        document.getElementById("divProducts").append(appendProduct)
    }
}

//Eventos para cada uno de los botonees (add to cart).Agrega un producto al carrito (localstorage)
function addEventsCartButtons() {
    const addToCartButtons = document.getElementsByClassName("addToCart")

    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", (e) => {
            const idProduct = e.target.id
            const product = findById(e.target.id)


            if(productAlreadyAdded(idProduct)){
                productAlreadyAddedToast()
            }else{
                productAddedToast()
                validationRepeatedProduct(idProduct)
            }
        })
    }
}
//Funcion para resetear valores como cantidad y precio.
function resetValuesProducts(){
    arrayProducts.forEach(element => {
        element.amount = 1
        element.totalPrice = element.price
    });
}

//Funcion booleana que nos dice si el producto ya se agrego al carrito
function productAlreadyAdded(id){
    const getCart = getCartToStorage(cart)
    const repeatedProduct = getCart.find(product => product.id == id)
    if(repeatedProduct)return true
    return false
}

//Funcion que printea un Toast, si el producto ya esta agregado al carrito.
function productAlreadyAddedToast() {
    Toastify({
        text: "Product already added to cart!",
        duration: "3000",
        backgroundColor: "red",
        offset: {
            y: 110
          },
    }).showToast()
}

//Funcion que printea un Toast, si el producto se agrego correctamente.
function productAddedToast() {
    Toastify({
        text: "Product added to cart!",
        duration: "3000",
        backgroundColor: "green",
        offset: {
            y: 110
          },
    }).showToast()
}

//Funcion para buscar productos por id. Devuelve un solo objeto ya que el id es unico e incremental.
function findById(idFind) {
    for (let i = 0; i < arrayProducts.length; i++) {
        if (arrayProducts[i].id == idFind) return arrayProducts[i];
    }
    return "Not found";
}

//Intervalo asincronico que nos va a ir diciendo la hora.
setInterval(()=>{
    if(document.getElementById("dateNow")!=null)document.getElementById("dateNow").remove()
    const dateNow = new Date()
    const hours = dateNow.getHours()
    const minutes = dateNow.getMinutes()
    const seconds = dateNow.getSeconds()

    document.getElementById("divDate").innerHTML = `<p id='pDate'>Hour: ${hours}:${minutes}:${seconds}.</p>`
},1000)
