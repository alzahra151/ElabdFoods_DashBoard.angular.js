export interface User {
    
        _id?:Number,
        FirstName?: String, 
        LastName?:  String, 
        Email?:  String, 
        MobileNumber?:  String, 
        Password?:  String,
        Gender?:  String,
        IsAdmin?:  Boolean,
        NumberOFLogin?:Number , 
        NumberOFFav?:Number , 
        NumberOFCart?:Number , 
        IsActive?:  Boolean,
        Active?:boolean
    
    AccessToken?:string
}
