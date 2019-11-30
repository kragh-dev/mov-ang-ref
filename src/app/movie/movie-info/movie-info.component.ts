import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from './movie';
import { AuthService } from 'src/app/site/auth.service';
import { FavoritesService } from 'src/app/booking/favorites.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

 
  @Input() movieItem: Movie;
  @Output() addToFavoritesRequested: EventEmitter<number> = new EventEmitter<number>();
  // movieItemAdded:boolean = false;



  constructor(private authService:AuthService,private favoritesService: FavoritesService) {
    

  }
  ngOnInit() {
    
  }

  onAddToFavorites(itemId:number){
      this.addToFavoritesRequested.emit(itemId);
      // this.movieItemAdded = true;
      // setTimeout(() => {
      //   this.movieItemAdded = false;
      // }, 1000);
  }


  isEditAllowed():boolean{
    return this.authService.loggedInUser && this.authService.isAdminUser();
  }



}
