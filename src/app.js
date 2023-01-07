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