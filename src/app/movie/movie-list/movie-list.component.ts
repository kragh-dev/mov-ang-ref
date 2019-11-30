import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie-info/movie';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/site/auth.service';
import { FavoritesService } from 'src/app/booking/favorites.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  fullMovieItems:Movie[]=[];
  filteredMovieItems:Movie[]=[];
   
  
    constructor(private movieService: MovieService,
       private router:Router,
       private authService: AuthService,
       private favoritesService: FavoritesService ) { }

    moviename:string;
  
    ngOnInit() {
      //TO GET ALL THE FOOD ITEMS INTO THE MENU COMPONENT
      this.movieService.getMovieItems()
        .subscribe(
          (data:Movie[]) =>  {
          this.fullMovieItems = [...data];
          this.filteredMovieItems = this.authService.isAdminUser() ? 
                            this.fullMovieItems: this.movieService.getMovieItemsForCustomer(this.fullMovieItems);
          
        }
        );
  
        this.movieService.getFilter().subscribe(
          (title: string) => {
            console.log("filter cheythu")
           
            this.filteredMovieItems = this.movieService.getMovieItemsFiltered(title,this.fullMovieItems);
        }
        );
  

  
      }

  
      addToFavorites(itemId:number){
        this.favoritesService.addToFavorites(itemId);    
        if(!this.authService.loggedInUser){
            this.router.navigate(['/favorites']);
        }
      }
  
      
  
  
  
}
