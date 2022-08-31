import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/_services/cart.service';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserManagementServiceService } from 'src/app/_services/user-management-service.service';
import { ToastrService } from 'ngx-toastr';
import { Movie, RentMovieClass } from 'src/app/_models/movie';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  movieDetails: any
  constructor(private accService: AccountService, private toastr: ToastrService, private http: HttpClient, private umService: UserManagementServiceService, private CartService: CartService, private modalService: BsModalService) { }
  total: number = 0;
  movie: Movie;
  prikaz:boolean=false;
  movies = this.CartService.getItems();
  bsModalRef: BsModalRef;
  ngOnInit(): void {
    this.findSUm(this.movies);
    if (this.total>0) {
      this.prikaz=true;
    }

  }
  buyMovies() {
    for (let i = 0; i < this.movies.length; i++) {
      this.umService.removformData.id = this.movies[i].id;
      const user: User = JSON.parse(localStorage.getItem('user'));
      this.umService.removformData.renterId = this.accService.getId(user);
      this.umService.rentMovie().subscribe(res => {
        this.umService.removformData = new RentMovieClass();
        this.toastr.success("You have successfully rented a movie!");
        this.CartService.removeItem(this.movies[i]);
      },
        err => {
          if (err.status == 200) {
            this.toastr.success("You have successfully rented a movie!");
            
          }
          else this.toastr.error("You have already rented this movie");
        })
    }
  }
  findSUm(movies) {
    var value = movies
    console.log(value);
    for (let j = 0; j < movies.length; j++) {
      console.log(value[j].price)
      // var total:number=0
      this.total = this.total + value[j].price
      console.log(this.total)
    }
  }
}
