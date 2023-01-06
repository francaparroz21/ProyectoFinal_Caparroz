//Funcion para printear productos
function printProducts() {
    for (let i = 0; i < arrayProducts.length; i++) {
        if (i == 0) {
            const div = document.createElement("div");
            div.setAttribute("id", "divProducts")
            div.setAttribute("class", "container")
            div.innerHTML = "<h2 id='h2Products'>Products</h2>";
            const products = document.createElement("div")
            products.setAttribute("id", "products")
            products.setAttribute("class", "container-fluid")
            div.append(products)
            document.getElementById("main").append(div)
        }
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
        document.getElementById("products").append(appendProduct)
    }
}