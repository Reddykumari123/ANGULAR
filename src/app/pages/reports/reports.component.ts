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
  searchText: string = ''; 
  selectedAreaName: string = ''; 
  selectedArea: string = ''; 

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

  get filteredAreas(): Areas[] {
    return this.areas.filter(area =>
      area.areaName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  updateSelectedAreaName() {
    const selectedArea = this.areas.find(area => area.id === this.selectedArea);
    this.selectedAreaName = selectedArea ? selectedArea.areaName : '';
  }

  selectArea(areaId: string) {
    this.selectedArea = areaId;
    this.updateSelectedAreaName();
  }



  filterAreas(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.areas = this.areas.filter(area =>
      area.areaName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

}