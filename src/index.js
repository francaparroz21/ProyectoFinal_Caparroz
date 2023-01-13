//Evento que se ejecuta cuando se recarga la pagina.
document.addEventListener('DOMContentLoaded', () => {
    //Agregamos scrollbar al modal offcanvas
    document.getElementById("cartProductsContainer").setAttribute("scroll", true)
    printProducts()
    addEventsCartButtons();

    if(localStorage.getItem("cart")) {
        cart = getCartToStorage()
        updateCart()
        updateCartCount()
    }
})