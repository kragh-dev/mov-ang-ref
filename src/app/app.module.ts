import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { BannerComponent } from './site/banner/banner.component';
import { HeaderComponent } from './site/header/header.component';
import { FooterComponent } from './site/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './site/signup/signup.component';
import { LoginComponent } from './site/login/login.component';
import { NotFoundComponent } from './site/not-found/not-found.component';
import { MovieInfoComponent } from './movie/movie-info/movie-info.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieService } from './movie/movie.service';
import { SearchComponent } from './movie/search/search.component';
import { ItemEditComponent } from './movie/item-edit/item-edit.component';
import { FavoritesComponent } from './booking/favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    NotFoundComponent,
    MovieInfoComponent,
    MovieListComponent,
    SearchComponent,
    ItemEditComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
