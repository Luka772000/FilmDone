import { Pipe, PipeTransform } from '@angular/core';
import { MovieWithRole } from 'src/app/_models/movie';



@Pipe({ name: 'appFilter' })

export class SearchFilter1 implements PipeTransform {

  transform(items: MovieWithRole[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }

}
