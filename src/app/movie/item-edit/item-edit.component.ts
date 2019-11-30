import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Movie } from '../movie-info/movie';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

 
  editForm: FormGroup;
  newMovieItem: Movie = {id: null, title: null, boxOffice: null, active: null, dateOfLaunch:new Date('2017-02-02'), genre: null, hasTeaser: null, imageUrl: null};
  itemEditted:boolean=false;

  constructor(private movieService: MovieService , private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.editForm = new FormGroup({
      'title': new FormControl(this.newMovieItem.title, [Validators.required, Validators.maxLength(200)]),
      'imageUrl': new FormControl(null),
      'boxOffice': new FormControl(this.newMovieItem.boxOffice, [Validators.required, Validators.pattern('^[0-9]+\.[0-9]*$')]),
      'genre': new FormControl(this.newMovieItem.genre, Validators.required),
      'dateOfLaunch': new FormControl(this.newMovieItem.dateOfLaunch.toISOString().substring(0,10), Validators.required),
      'active': new FormControl(this.newMovieItem.active, Validators.required),
      'hasTeaser': new FormControl(this.newMovieItem.hasTeaser)
    });
    this.route.params.subscribe((params: Params) => {
      const movieItemId: number = params['itemId'];
      this.newMovieItem.id = +movieItemId;
      this.movieService.getMovieItem(movieItemId).subscribe((movieItem: Movie) => {
        console.log(movieItem.title);
        if (movieItem) {
          this.editForm.patchValue({
            title: movieItem.title,
            imageUrl: movieItem.imageUrl,
            boxOffice: movieItem.boxOffice,
            genre: movieItem.genre,
            dateOfLaunch: movieItem.dateOfLaunch.toISOString().substring(0, 10),
            active: movieItem.active,
            hasTeaser: movieItem.hasTeaser
          });
        } else {
          // this.router.navigate(['not-found']);
        }
      });
    });
  }
  
  get title() {
    return this.editForm.get('title');
  }

  get movieItemURL() {
    return this.editForm.get('imageUrl');
  }
  get boxOffice() {
    return this.editForm.get('boxOffice');
  }
  get active() {
    return this.editForm.get('active');
  }
  get hasTeaser() {
    return this.editForm.get('hasTeaser');
  }
  get dateOfLaunch() {
    return this.editForm.get('dateOfLaunch');
  }


  onSubmitEditForm(){
    this.newMovieItem = {
      id: this.newMovieItem.id, title: this.editForm.value['title'], boxOffice: +this.editForm.value['boxOffice'],
      active: this.editForm.value['active'], 
      dateOfLaunch: new Date(this.editForm.value['dateOfLaunch']), 
      hasTeaser: this.editForm.value['hasTeaser'],
      genre: this.editForm.value['genre'],
       imageUrl: this.editForm.value['imageUrl']
    };
      this.movieService.updateMovieItem(this.newMovieItem);
      this.itemEditted = true;
      setTimeout(() => {
        this.router.navigate(['/movieList']);
      }, 2000);
  }

}
