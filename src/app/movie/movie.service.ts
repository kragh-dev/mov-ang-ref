import { Injectable } from '@angular/core';
import { Movie } from './movie-info/movie';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Observer, of } from 'rxjs';
import { AuthService } from '../site/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movie_url = '/assets/data/fooditems.json';
  fullMovieItems: Movie[]=[
    {id:1,title:"Avengers",boxOffice:356000000,active:true,dateOfLaunch:new Date('04/26/2019'),genre:"Action",hasTeaser:true,imageUrl:"https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg"},
  {id:2,title:"Aladdin",boxOffice:183000000,active:true,dateOfLaunch:new Date('05/24/2019'),genre:"Adventure",hasTeaser:false,imageUrl:"https://upload.wikimedia.org/wikipedia/en/9/9a/Aladdin_%28Official_2019_Film_Poster%29.png"},
  {id:3,title:"Captain Marvel",boxOffice:175000000,active:true,dateOfLaunch:new Date('03/08/2019'),genre:"Action",hasTeaser:false,imageUrl:"https://upload.wikimedia.org/wikipedia/en/8/85/Captain_Marvel_poster.jpg"},
  {id:4,title:"The Lion King",boxOffice:45000000,active:false,dateOfLaunch:new Date('07/17/2019'),genre:"Animation",hasTeaser:true,imageUrl:"https://www.mylionking.com/w/images/thumb/4/4e/The_Lion_King_%28comic%29_01.jpg/220px-The_Lion_King_%28comic%29_01.jpg"},
  {id:5,title:"First Man",boxOffice:70000000,active:true,dateOfLaunch:new Date('08/29/2018'),genre:"Adventure",hasTeaser:true,imageUrl:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/First_Man_%28film%29.png/220px-First_Man_%28film%29.png"}
];


  filter = new Subject();

  getFilter():Subject<Object>{
    return this.filter;
  }


  constructor(private http: HttpClient, private authService: AuthService) { }

  getMovieItems():Observable<Movie[]> {
    // return this.http.get<Movie[]>(this.movie_url);
    return of (this.fullMovieItems);
  }

  getMovieItemsForCustomer(movieItems:Movie[]):Movie[]{
    const today = new Date();
    const customerMovieItems:Movie[] = movieItems.filter(movieItem => {
        return movieItem.active && movieItem.dateOfLaunch <= today;
    });
    // console.log("customer food items: "+customerMovieItems)
    return customerMovieItems;
  }

  
  getMovieItemsFiltered(title: string,fullMovieItems:Movie[]): Movie[] {
    console.log("inside filter and isAdmin: "+ this.authService.isAdminUser());
    fullMovieItems = this.authService.isAdminUser() ? fullMovieItems: this.getMovieItemsForCustomer(fullMovieItems);
    if(title!=''){
      const result = fullMovieItems.filter(movieItem => movieItem.title.toLowerCase().includes(title.toLowerCase()));
      return result ? result : [];
    } else {
        return fullMovieItems;
    }
  }9 
  
  
  getMovieItem(itemId: number):Observable<any>{
    return Observable.create((observer: Observer<Movie>)=> {
      this.getMovieItems().subscribe((movieItems)=>{
              const movieItem = movieItems.find( mvItem => mvItem.id === +itemId);
              console.log(movieItem)
              observer.next(movieItem);

      });
    


    });
  }


  updateMovieItem(movieItem: Movie){
    //UPDATE THE TEMPORARY FOOD ITEM LIST IN THE COMPONENT
    const itemId = this.fullMovieItems.findIndex(movieItemOriginal => movieItemOriginal.id === movieItem.id);
    console.log(movieItem)
    this.fullMovieItems[itemId] = movieItem;
  }


  









  /* getMovieItems(active: boolean, launchDate: Date): MovieItem[]{
    return this.fooditems;
  } */

}
