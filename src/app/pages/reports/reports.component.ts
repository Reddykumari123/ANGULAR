import { Component, OnInit } from '@angular/core';
import { Reports } from '../../Models/reports';
import { ReportsService } from '../../../Service/reports.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { Areas } from '../../Models/areas';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  salesReports: Reports[] = [];
  areas: Areas[] = [];
  area: string = 'arn28';
  endDate: string = '2024-02-24';
  searchText: string = ''; // Property to store search text
  selectedAreaName: string = ''; // Property to store selected area name
  selectedArea: string = ''; // Property to store selected area ID

  constructor(private salesReportService: ReportsService) { }

  ngOnInit(): void {
    this.fetchSalesReport();
    this.fetchAreas();
  }

  fetchSalesReport() {
    this.salesReportService.getSalesReport(this.area, this.endDate)
      .subscribe((data: Reports[]) => {
        this.salesReports = data;
      });
  }

  fetchAreas() {
    this.salesReportService.getAreas()
      .subscribe((data: Areas[]) => {
        this.areas = data;
      });
  }

  // Getter for filtered areas based on search text
  get filteredAreas(): Areas[] {
    return this.areas.filter(area =>
      area.areaName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Method to update selected area's name
  updateSelectedAreaName() {
    const selectedArea = this.areas.find(area => area.id === this.selectedArea);
    this.selectedAreaName = selectedArea ? selectedArea.areaName : '';
  }

  // Method to handle area selection
  selectArea(areaId: string) {
    this.selectedArea = areaId;
    this.updateSelectedAreaName();
  }

  // Custom comparison function for mat-select
  compareAreas(area1: any, area2: any): boolean {
    return area1 && area2 ? area1.id === area2.id : area1 === area2;
  }
}