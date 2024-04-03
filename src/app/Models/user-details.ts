export class UserDetails {
id: string;
    FirstName: string;
    LastName: string;
    email: string;
    mobileNumber: string;
    address: string;
    executive:string;
    presignedUrl:any;
    constructor(Id:string,FirstName:string,LastName:string,Email:string,MobileNumber:string,Address:string,Executive:string,PesignedUrl:any){
    this.id = Id;
    this.presignedUrl = PesignedUrl;
    this.FirstName=FirstName;
    this.LastName=LastName;
    this.email = Email;
    this.mobileNumber = MobileNumber;
    this.address= Address;
    this.executive = Executive;

}

}
