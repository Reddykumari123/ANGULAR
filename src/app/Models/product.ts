export class Product {
    id: string;
    productName: string;
    weight:any;
    price:any;
    subtotal:any;
    quantity:any;
    presignedUrl :any;
    constructor(Id:string,ProductName:string,Weight:any,Price:any,Subtotal:any,Quantity:any,Presignedurl:any){
        this.id = Id;
        this.productName = ProductName;
        this.weight = Weight;
        this.price = Price;
        this.subtotal= Subtotal;
        this.quantity = Quantity;
        this.presignedUrl = Presignedurl;

    }
}
