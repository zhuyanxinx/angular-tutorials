import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing-location/housing.service';
import { HousingLocation } from '../housing-location/housinglocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);//parseInt(this.route.snapshot.params['id'], 10)
    this.housingService.getHousingLocationById(housingLocationId)
      .then(
        (housingLocation) => {
          this.housingLocation = housingLocation;
        });
  }
}
