//construcción de clase
class Productmanager{
    constructor(){
        this.products = [];
    }

    static id = 0 //static utilizado para ID.

    addProduct(title, description, price, image, code, stock){
        for(let i = 0; i<this.products.length; i++){
            if(this.products[i].code===code){
                console.log(`Error. El código ${code} está repetido. Revise su producto.`);
                return;
            }
        }

        const newProduct = {
            title, description, price, image, code, stock
        }

        if(!Object.values(newProduct).includes(undefined)){
            Productmanager.id++ //cada producto suma un nuevo ID.
            this.products.push({
                ...newProduct,
                id:Productmanager.id,
            });
        }else{
            console.log("Se necesitan rellenar todos los datos.");
        }


        
    }

    getProduct(){
        return this.products;
    }

    comprobador(id){
        return this.products.find((producto) => producto.id ===id );
    }

    getProductById(id){
        !this.comprobador(id) ? console.log("not found") : console.log(this.comprobador(id));
        
    }

}   

const productos = new Productmanager(); 
//primera llamada = arreglo vacio
console.log(productos.getProduct());
//agregamos producto
productos.addProduct('titulo1', 'descripcion1', 1000, 'image1', 'abc123', 5);
productos.addProduct('titulo2', 'descripcion2', 1000, 'image2', 'abc124', 6);

//validación de código
productos.addProduct('titulo2', 'descripcion2', 1000, 'image2', 'abc125', 7);
//segunda llamada = arreglo con producto
console.log(productos.getProduct());

//buscar por id
productos.getProductById(2);

//si falta id
productos.getProductById(4);
