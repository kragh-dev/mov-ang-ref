import { Component, OnInit } from '@angular/core';
import { Favorites } from './favorites';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Favorites;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
      this.favorites = this.favoritesService.getFavorites();
      console.log(this.favorites);
   
    }

    onRemoveFavoritesItem(favoritesItemId:string){
      this.favoritesService.RemoveFavoritesItem(favoritesItemId);
    }

}
