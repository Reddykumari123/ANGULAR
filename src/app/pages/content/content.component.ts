import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { ActivatedRoute, Route } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RetailorDetails } from '../../Models/retailor-details';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GpsService } from '../../../Service/gps.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MaterialModule, RouterModule, RouterOutlet, MatDatepickerModule, MatNativeDateModule, FormsModule, DatePipe],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {

  id: any;
  retailorList: RetailorDetails[] = [];
  filteredRetailorList: RetailorDetails[] = [];
  filteredRetailorListByArea: RetailorDetails[] = []; // New property for filtered list by area
  noDataFound: boolean;
  DSRCount: number;
  Id: any;

  constructor(
    private retailorDetailService: RetailorDetailsService,
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private gpsservice: GpsService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params: any) => {
      console.log('Route Params:', params);

      this.Id = params.ExecutiveId;
      this.id = params.distributorId;

    });

    this.loadRetailorList();

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude.toString();
        const longitude = position.coords.longitude.toString();
        this.gpsservice.startPostingPosition(latitude, longitude);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  loadRetailorList() {
    if (this.id) {
      this.loadRetailorListByDistributorId();
    } else if (this.Id) {
      this.loadRetailorListByExecutiveId();
    } else {
      console.error('Missing distributorId or executiveId');
    }
  }

  loadRetailorListByDistributorId() {
    this.retailorDetailService.getRetailorsListByDistributorId(this.id).subscribe({
      next: (data: RetailorDetails[] | RetailorDetails) => {
        if (Array.isArray(data)) {
          this.retailorList = data;
          this.DSRCount = this.retailorList.length;
          this.filteredRetailorList = this.retailorList.slice();
          this.applyFilter('');
        }
      },
      error: (error) => {
        console.error('Error fetching retailer details by distributor ID:', error);
      }
    });
  }

  loadRetailorListByExecutiveId() {
    this.retailorDetailService.getRetailorsListByExecutiveId(this.Id).subscribe({
      next: (data: RetailorDetails[] | RetailorDetails) => {
        if (Array.isArray(data)) {
          this.retailorList = data;
          this.DSRCount = this.retailorList.length;
          this.filteredRetailorList = this.retailorList.slice();
          this.applyFilter('');
        }
      },
      error: (error) => {
        console.error('Error fetching retailer details by executive ID:', error);
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    if (filterValue) {
      this.filteredRetailorList = this.retailorList.filter(retailor =>
        retailor.retailor.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredRetailorList = this.retailorList.slice();
    }
    this.noDataFound = this.filteredRetailorList.length === 0;
  }

  applyFilterByArea(area: string) {
    if (area) {
      this.filteredRetailorListByArea = this.retailorList.filter(retailor =>
        retailor.area && retailor.area.toLowerCase().includes(area.toLowerCase())
      );
    } else {
      this.filteredRetailorListByArea = this.retailorList.slice();
    }
    this.applyCombinedFilter();
  }
  

  applyCombinedFilter() {
    if (this.filteredRetailorListByArea.length > 0) {
      this.filteredRetailorList = this.filteredRetailorList.filter(retailor =>
        this.filteredRetailorListByArea.includes(retailor)
      );
    }
    this.noDataFound = this.filteredRetailorList.length === 0;
  }

  onDateChanged(event: MatDatepickerInputEvent<Date>) {
    const selectedDateStr = this.datePipe.transform(event.value, 'MM-dd-yyyy');
    const id = this.id ? this.id : this.Id;
    this.retailorDetailService.getRetailorsListByDate(id, selectedDateStr).subscribe({
      next: (retailorListDetails: RetailorDetails[] | RetailorDetails) => {
        if (Array.isArray(retailorListDetails)) {
          this.retailorList = retailorListDetails;
          this.filteredRetailorList = this.retailorList.slice();
          this.applyFilter('');
        }
      },
      error: (error) => {
        console.error('Error fetching retailor list by date:', error);
      }
    });
  }

  onInfoButtonClick(retailorDetail: RetailorDetails) {
    this.retailorDetailService.setdetails(retailorDetail);
  }
}
