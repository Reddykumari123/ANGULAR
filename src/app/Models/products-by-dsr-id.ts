export class ProductsByDsrId {
    product: string;
    quantity: any;
    price: any;
    constrctor(Product:string,Price:any,Quantity:any){
        this.product=Product;
        this.quantity=Quantity;
        this.price=Price;
    }
}
