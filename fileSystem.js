import {promises as fs} from "fs"

class ProductManager{
    constructor(){
        this.patch = "./productos.txt";
        this.products = [];
    }

    static id = 0

    addProduct = async (title, description, price, image, code, stock) =>{

        ProductManager.id++

        let newProduct = { title, description, price, image, code, stock, id:ProductManager.id};

        this.products.push(newProduct);

        await fs.writeFile(this.patch, JSON.stringify(this.products));

        
    }

    readProducts = async ()=>{
        let respuesta = await fs.readFile(this.patch,"utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta1 = await this.readProducts()
        return console.log(respuesta1)
    }

    getProductsById = async (id)=>{
        let respuesta2 = await this.readProducts()
        if(!respuesta2.find(product => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(respuesta2.find(product => product.id === id))
        }
       
    }

    deleteProductsById = async (id) =>{
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto eliminado");
        
    };

    updateProducts = async(id, ...producto) =>{
        await this.deleteProductsById(id);
        let productsOld = await this.readProducts();
        let productsModif = [{ ...producto, id },...productsOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModif));
    };
}



const productos = new ProductManager;

//productos.getProducts()

productos.addProduct("Titulo1", "Description1", 1000, "Image1", "abc123", 5 );
productos.addProduct("Titulo2", "Description2", 1000, "Image2", "abc124", 5 );

//productos.getProductsById(4)

//productos.deleteProductsById(2);

productos.updateProducts(
    {
        title: 'Titulo1',
        description: 'Description1',
        price: 3500,
        image: 'Image1',
        code: 'abc123',
        stock: 5,
        id: 1
    }
)

