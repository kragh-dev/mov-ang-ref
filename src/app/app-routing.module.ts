import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './site/signup/signup.component';
import { LoginComponent } from './site/login/login.component';
import { AuthGuardService } from './site/auth-guard.service';
import { NotFoundComponent } from './site/not-found/not-found.component';
import { ItemEditComponent } from './movie/item-edit/item-edit.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { FavoritesComponent } from './booking/favorites/favorites.component';


const routes: Routes = [
  { path: '', redirectTo: 'movieList', pathMatch: 'full' },
  { path: 'movieList', component: MovieListComponent },
  {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuardService]},
  {path: 'edit-movie-item/:itemId', component: ItemEditComponent, canActivate: [AuthGuardService]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
