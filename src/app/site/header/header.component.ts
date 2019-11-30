import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MovieService } from 'src/app/movie/movie.service';
import { FavoritesService } from 'src/app/booking/favorites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  

  constructor(private router: Router,
    private authService: AuthService,
    private movieService: MovieService,
    private favoritesService: FavoritesService
    
    ) { }

    isAuthenticated() {
      return this.authService.loggedInUser;
    }
  
    isAdmin() {
      return this.authService.isAdmin;
    }
  
    getUser() {
      return this.authService.userAuthenticated;
    }
  
    onLogOut() {
      this.favoritesService.clearFavorites();
      this.authService.logOut();

      this.router.navigate([this.authService.redirectUrl]);
    }

  ngOnInit() {
  }

}
