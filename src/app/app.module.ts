import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductChartComponent } from './components/product-chart/product-chart.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SettingProductComponent } from './components/setting-product/setting-product.component'
import { RouterModule } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { OrderComponent } from './components/order/order.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SideOffcanvasComponent } from './components/side-offcanvas/side-offcanvas.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { SubCatComponent } from './components/sub-cat/sub-cat.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavBarComponent,
    ProductChartComponent,
    AddProductComponent,
    LoginComponent,
    MainLayoutComponent,
    SettingProductComponent,
    AddUserComponent,
    UserStatusComponent,
    OrderComponent,
    UserProfileComponent,
    SideOffcanvasComponent,
    AddCategorieComponent,
    SubCatComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
