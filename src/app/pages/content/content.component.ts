import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { ActivatedRoute, Route } from '@angular/router';
import { RouterModule,RouterOutlet } from '@angular/router';
import { RetailorDetails } from '../../Models/retailor-details';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MaterialModule,RouterModule,RouterOutlet,MatDatepickerModule,MatNativeDateModule,FormsModule,DatePipe],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {
  distributorid: any;
  retailorList: RetailorDetails[] = [];
  filteredRetailorList: RetailorDetails[];
  noDataFound: boolean;
  DSRCount: number;

  constructor(
    private retailorDetailService: RetailorDetailsService,
    private activeRoute: ActivatedRoute,
    private datePipe :DatePipe
  ) {
    activeRoute.queryParams.subscribe((x: any) => this.distributorid = x.distributorId);
  }

  ngOnInit() {
    this.loadRetailorList();
  }

  loadRetailorList() {
    this.retailorDetailService.getRetailorsListById(this.distributorid).subscribe({
      next: (retailorListDetails: RetailorDetails[] | RetailorDetails) => {
        if (Array.isArray(retailorListDetails)) {
          this.retailorList = retailorListDetails;
          this.DSRCount = this.retailorList.length;
          this.filteredRetailorList = this.retailorList.slice();
          this.applyFilter('');
        }
      },
      error: (error) => {
        console.error('Error fetching retailor list:', error);
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

  onDateChanged(event: MatDatepickerInputEvent<Date>) {
    const selectedDateStr = this.datePipe.transform(event.value, 'MM-dd-yyyy');
    this.retailorDetailService.getRetailorsListByDate(this.distributorid, selectedDateStr).subscribe({
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
onInfoButtonClick(retailorDetail: RetailorDetails ) {
  this.retailorDetailService.setdetails(retailorDetail);
}
  
}