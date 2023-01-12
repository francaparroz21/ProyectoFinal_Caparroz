//Evento que se ejecuta cuando se recarga la pagina.
document.addEventListener('DOMContentLoaded', () => {
    printProducts()
    addEventsCartButtons();

    if(localStorage.getItem("cart")) {
        cart = getCartToStorage()
        updateCart()
        updateCartCount()
    }
})