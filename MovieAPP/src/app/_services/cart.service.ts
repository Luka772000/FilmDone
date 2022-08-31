import { Injectable } from '@angular/core';
import { Movie } from '../_models/movie';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Movie[] = [];
  constructor() { }
  addToCart(movie: Movie) {
    this.items.push(movie);
  }

  getItems() {
    return this.items;
  }
  removeItem(movie: Movie) {
    this.items.splice(this.items.indexOf(movie), 1);
  }
  clearCart() {
    this.items = [];
    return this.items;
  }
}
