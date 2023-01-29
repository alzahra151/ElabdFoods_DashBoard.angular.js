import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OrderComponent } from './components/order/order.component';
import { ProductChartComponent } from './components/product-chart/product-chart.component';
import { SettingProductComponent } from './components/setting-product/setting-product.component';
import { SubCatComponent } from './components/sub-cat/sub-cat.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { AuthGuard } from './gaurds/auth.guard';

const routes: Routes = [
  {path:"" ,component:LoginComponent,  },
  {path:"Elabd" ,component:MainLayoutComponent,

  children:[
    {path:"" ,component:ProductChartComponent,canActivate:[AuthGuard]},
    {path:"home" ,component:ProductChartComponent, canActivate:[AuthGuard]},
    {path:"products" ,component:AddProductComponent,canActivate:[AuthGuard] },
    {path:"settingProduct" ,component:SettingProductComponent, canActivate:[AuthGuard] },
    {path:"AddUser" ,component:AddUserComponent, canActivate:[AuthGuard] },
     {path:"orders" ,component:OrderComponent, canActivate:[AuthGuard] },
     {path:"userProfile" ,component:UserProfileComponent,canActivate:[AuthGuard]  },
    {path:"userinfo" ,component:UserStatusComponent,canActivate:[AuthGuard]  },
    {path:"Categorie" ,component:AddCategorieComponent,canActivate:[AuthGuard]  },
    {path:"SubCategorie" ,component:SubCatComponent, canActivate:[AuthGuard]  },

  ]
},
 {path:"login" ,component:LoginComponent},
 {path:"**" ,component:NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
