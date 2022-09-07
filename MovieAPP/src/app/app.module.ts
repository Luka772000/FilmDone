import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DASHBOARDComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { BoughtmoviesComponent } from './MyProfile/boughtmovies/boughtmovies.component';
import { UpdateProfileComponent } from './MyProfile/update-profile/update-profile.component';
import { ProfilePictureComponent } from './MyProfile/profile-picture/profile-picture.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UploadMovieComponent } from './upload-movie/upload-movie.component';
import { BuyMovieComponent } from './buy-movie/buy-movie.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { SharedModule } from './_modules/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './home/carousel/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './contact/contact.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { BuyMovieCardComponent } from './buy-movie/buy-movie-card/buy-movie-card.component';
import { CartComponent } from './buy-movie/cart/cart.component';
import { CartItemComponent } from './buy-movie/cart/cart-item/cart-item.component';
import { BoughtMovieComponent } from './MyProfile/boughtmovies/bought-movie-row/bought-movie.component';
import { UpdateMovieDialogComponent } from './MyProfile/boughtmovies/bought-movie-row/update-movie-dialog/update-movie-dialog.component';
import { MovieInfoModalComponent } from './buy-movie/movie-info-modal/movie-info-modal.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { DeleteUserDialogComponent } from './admin-control/delete-user-dialog/delete-user-dialog.component';
import { RolesModalComponent } from './admin-control/roles-modal/roles-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SearchFilter } from './admin-control/search-filter/search-filter.component';
import { FormsModule }   from '@angular/forms';
import { AddActorDialogComponent } from './MyProfile/boughtmovies/bought-movie-row/add-actor-dialog/add-actor-dialog.component';
import { SearchFilter1 } from './buy-movie/search-filter/search-filter.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptors';
import { ErrorInterceptor } from './_interceptors/error.interceptors';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DASHBOARDComponent,
    BoughtmoviesComponent,
    UpdateProfileComponent,
    ProfilePictureComponent,
    RegisterComponent,
    HomeComponent,
    UploadMovieComponent,
    BuyMovieComponent,
    HasRoleDirective,
    LoginComponent,
    CarouselComponent,
    ContactComponent,
    BuyMovieCardComponent,
    CartComponent,
    CartItemComponent,
    BoughtMovieComponent,
    UpdateMovieDialogComponent,
    MovieInfoModalComponent,
    AdminControlComponent,
    DeleteUserDialogComponent,
    RolesModalComponent,
    SearchFilter,
    AddActorDialogComponent,
    SearchFilter1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    SharedModule,
    MatInputModule,
    ReactiveFormsModule,
    NgbModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatDialogModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi : true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
