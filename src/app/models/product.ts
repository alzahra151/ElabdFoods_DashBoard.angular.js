export interface Product {
    EnName:string;
    ArName:string;
    Image:{
        url:string
    },
    Amount:number
    Price:number;
    CategorieID:any
    SubCategID:any
    NumberOfFav:number
    NumberOfCarts:number
    _id?:string
}
