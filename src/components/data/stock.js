//Clase Product
class Product {
    //Funcion constructora de la clase Product 
    constructor(name, description, price, url) {
        this.id = generateId()
        this.name = name;
        this.description = description;
        this.price = price;
        this.urlImg = url;
        this.amount = 1;
    }
}

//Arrow function que genera un id unico e incremental para cada producto.
const generateId = (() => (id = 1, () => id++))();

const arrayProducts = [
    new Product("Idraet Breast Volume 95+", "TRATAMIENTO VOLUMINIZADOR IDRAET BREAST VOLUME 95+.AUMENTO DEL BUSTO.", 3000.00, "./public/images/breastvolume95.png"),
    new Product("Gel Flat Abs", "Gel acuoso de rápida absorción, formulado para reducción de adiposidad abdominal.", 2000.00, "./public/images/gel_flat_abs.png"),
    new Product("Alpine Roses Mask", "Máscara reparadora y calmante. Revitaliza y regenera la piel mejorando su elasticidad y suavidad.", 2000.00, "./public/images/mask_alpineroses.png"),
    new Product("Serum PersonalTrainer", "Imita los efectos del ejercicio físico, reafirmando brazos, piernas y abdomen.", 4700.00, "./public/images/serum_personaltrainer.png"),
    new Product("Celulitis Cellu Control", "Quema grasa almacenada y reduce Celulitis, mejora la elasticidad y firmeza de la piel.", 2600.00, "./public/images/caps_cellucontrol.png")
];