import { Component, OnInit } from '@angular/core';
import { RetailorDetails } from '../../Models/retailor-details';
import { ExecutiveService } from '../../../Service/executive.service';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute } from '@angular/router';
import { RouterModule,RouterOutlet } from '@angular/router';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-executive-content',
  standalone: true,
  imports: [MaterialModule,RouterModule,RouterOutlet,DatePipe],
  templateUrl: './executive-content.component.html',
  styleUrl: './executive-content.component.scss'
})
export class ExecutiveContentComponent implements OnInit {
  retailorlist: RetailorDetails[] = [];
  executiveid: any;
  DSRCount: number;


  constructor(
    private executiveService: ExecutiveService,
    private retailorDetailService: RetailorDetailsService,
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe

  ) {
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.executiveid = params.ExecutiveId;
    });
  }
  ngOnInit(): void {
    console.log(this.executiveid);
    this.executiveService.getRetailorsListById(this.executiveid).subscribe({
      next: (data: RetailorDetails[] | RetailorDetails) => {
        if (Array.isArray(data)) {
          this.retailorlist = data;
          this.DSRCount = this.retailorlist.length;

        }
      },
      error: (error) => {
        console.error('Error fetching retailor details:', error);
      }
    });
  }
 
  onInfoButtonClick(retailorDetail: RetailorDetails ) {
    this.retailorDetailService.setdetails(retailorDetail);
  }
 

}