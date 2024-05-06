export class UserDetails {
id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    address: string;
    executives:string;
    presignedUrl:any;
    constructor(Id:string,FirstName:string,LastName:string,Email:string,MobileNumber:string,Address:string,Executive:string,PesignedUrl:any){
    this.id = Id;
    this.presignedUrl = PesignedUrl;
    this.firstName=FirstName;
    this.lastName=LastName;
    this.email = Email;
    this.mobileNumber = MobileNumber;
    this.address= Address;
    this.executives = Executive;

}

}
