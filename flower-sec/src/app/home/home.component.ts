import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location/housinglocation';
import { HousingService } from '../housing-location/housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // readonly baseUrl = 'https://angular.dev/assets/tutorials/common';
  housingService: HousingService = inject(HousingService);
  housingLocationList: HousingLocation[] = [];
  filterLocatonList: HousingLocation[] = [];
  constructor() {
    this.housingService.getAllHousingLocations().then(
      (locationList: HousingLocation[]) => {
        this.housingLocationList = locationList;
        this.filterLocatonList = locationList;
      }
    );
  }

  filterResults(text: string) {
    if (!text) {
      this.filterLocatonList = this.housingLocationList;
      return;
    }
    console.log('filter text:', text);
    this.filterLocatonList = this.housingLocationList.filter(
      (housingLocation) => housingLocation?.city.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
  }
}
