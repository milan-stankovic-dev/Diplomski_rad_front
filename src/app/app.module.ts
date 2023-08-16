import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { ProductModule } from './product/product.module';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteComponent } from './goods-received-note/note/note.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BillOfLadingComponent } from './bill-of-lading/bill-of-lading.component';
import { ProductDisplayComponent } from './product/product-display/product-display.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NoteComponent,
    ProductDisplayComponent,
    BillOfLadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [{
    useClass: AuthInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true
  }],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
