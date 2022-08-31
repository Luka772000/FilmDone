import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
const APIKEY = "d6b1bc0a";
const PARAMS = new HttpParams({
  fromObject: {
    action: "opensearch",
    format: "json",
    origin: "*"
  }
});
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  movieDetails: any;
  movieList:any[];
  constructor( private http:HttpClient,
    private toastr:ToastrService) { }

  ngOnInit(

  ): void {
    let list: string[] = ["Avengers","Spiderman","Man of steel","Black Panther","Ironman"];
    let list1: string[] = ["Conjuring","Sinister","Babadook","It follows","Truth or dare"];
    let list2: string[] = ["Soul","Spiderman","Sing 2","Sausage party","Minions"];
    let list3: string[] = ["Free Guy","Cruella","Ted","Paul","Ride along"];
    let list4: string[] = ["Lord of the rings","Harry Potter","Maleficent","Red Riding Hood","Dolittle"]
  }
  getDetails(pd: any){
  
    this.http.get('http://www.omdbapi.com/?t=' + pd.ime + '&apikey=' + APIKEY, { params: PARAMS.set('search', pd.ime) })
    .subscribe(data=> {
   console.log('res', data);
    this.movieDetails=data;
  
    
    })
    }
}
