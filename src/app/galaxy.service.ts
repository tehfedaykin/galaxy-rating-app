import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalaxyService {

  constructor() { }

  getGalaxies() {
    return of([
      {
        name: 'Milky Way',
        id: 1
      },
      {
        name: 'LMC',
        id: 2
      },
      {
        name: 'Andromeda',
        id: 3
      },
      {
        name: 'Cigar Galaxy',
        id: 4
      },
      {
        name: 'Pinwheel Galaxy',
        id: 5
      },
      {
        name: 'Sombrero Galaxy',
        id: 6
      },
      {
        name: 'Whirlpool Galaxy',
        id: 7
      },
      {
        name: 'NGC 1300',
        id: 8
      },
      {
        name: 'Tadpole Galaxy',
        id: 9
      },
      {
        name: 'Hoag\'s Object',
        id: 10
      }
    ])
  }
}
