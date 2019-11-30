import { Injectable, Output, EventEmitter } from '@angular/core';
import { Movie } from '../movie/movie-info/movie';
import { Favorites } from './favorites/favorites';
import { MovieService } from '../movie/movie.service';
import { UUID } from 'angular2-uuid';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  @Output() favoritesUpdated = new EventEmitter();
  
  movieItems:Movie[]; //temporary
  favorites: Favorites = {
    favoritesItems :null,
    noOfFavorites : 0
  };
  alreadyExists:boolean = false;
  movieItemAdded:boolean = false;
  movieItemtobeAdded:Movie =  {id:-1,title:null,boxOffice:null,active:null,dateOfLaunch:new Date('03/15/2017'),genre:null,hasTeaser:true,imageUrl:null};
  constructor(private movieService: MovieService) {


      //this is temporary to get the movieItems object
      // this.movieService.getMovies()
      // .subscribe(
      //   (movieItems:Movie[])=> {
      //     this.movieItems = movieItems;
      //     // console.log(this.movieItems[1]);
      //     this.favorites.favoritesItems=  [{ itemId: 1, movieItem: this.movieItems[0], quantity:1 }];
      //     this.favorites.favoritesItems.push({ itemId: 2, movieItem: this.movieItems[1], quantity:1 });
      //     this.favorites.noOfFavorites = this.calculateTotalPrice();
      //   });
   }

   getFavorites(){
     return this.favorites;
   }
   //SHOULD BE REPLACED WITH NO OF FAVORITES
  //  calculateTotalPrice(): number {
  //     let noOfFavorites = 0 ;
  //     for (const favoritesItem of this.favorites.favoritesItems) {
  //       noOfFavorites += favoritesItem.movieItem.price;
  //         }
  //   return noOfFavorites;
  //  }

   //INVOKED BY OUTPUT INJECTOR OF FAVORITES
  addToFavorites(itemId:number){
        this.movieService.getMovieItem(itemId)
              .subscribe((movieItemtobeAdded:Movie)=>{
                  const uniqID = UUID.UUID();
                  this.movieItemtobeAdded = movieItemtobeAdded;
                  if(this.favorites.favoritesItems === null){
                    this.favorites.favoritesItems = [{itemId: uniqID, movieItem: movieItemtobeAdded}];
                    this.favorites.noOfFavorites = 1;
                    this.movieItemAdded = true;
                    setTimeout(() => {
                      this.movieItemAdded = false;
                    }, 1000);
                  } else {
                    if(!this.favorites.favoritesItems.some(favoritesItem => favoritesItem.movieItem.id == movieItemtobeAdded.id)){
                        this.favorites.favoritesItems.push({itemId: uniqID, movieItem: movieItemtobeAdded});
                        this.favorites.noOfFavorites += 1;
                        this.movieItemAdded = true;
                        setTimeout(() => {
                          this.movieItemAdded = false;
                        }, 1000);
                       
                      }else{
                        this.alreadyExists = true;
                        setTimeout(() => {
                          this.alreadyExists = false;
                        }, 1000);
                      }
                  }
              });

  }


  RemoveFavoritesItem(favoritesItemId:string){
    let itemIndex = this.favorites.favoritesItems.findIndex(favoritesItem => favoritesItem.itemId===favoritesItemId);
    let itemToBeRemoved = this.favorites.favoritesItems.splice(itemIndex,1)[0];
    this.favorites.noOfFavorites -= 1;
  }

  clearFavorites() {
    this.favorites.favoritesItems = null;
    this.favorites.noOfFavorites = 0;
  }


  
}
