import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
import { CartService } from 'src/app/_services/cart.service';
const APIKEY = "d6b1bc0a";
const PARAMS = new HttpParams({
  fromObject: {
    action: "opensearch",
    format: "json",
    origin: "*"
  }
});






@Component({
  selector: '[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() movie: Movie;
  private httpClient: HttpClient;
  constructor(public CartService: CartService, private http: HttpClient,httpBackend: HttpBackend) {this.httpClient = new HttpClient(httpBackend); }
  movieDetails: any;
  ngOnInit(): void {
    this.getDetails();
    console.log(this.movie)
  }
  getDetails() {
    var name = this.movie.name;
    this.httpClient.get('http://www.omdbapi.com/?t=' + name + '&apikey=' + APIKEY, { params: PARAMS.set('search', name) })
      .subscribe(data => {
        this.movieDetails = data;
      })
  }
}
