import { Component, OnInit } from '@angular/core';
import { Reports } from '../../Models/reports';
import { ReportsService } from '../../../Service/reports.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { Areas } from '../../Models/areas';
import { ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'] 
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatSelect) select: MatSelect;

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
        this.sortAreas(); 
      });
  }

  sortAreas() {
    this.areas.sort((a, b) => a.areaName.localeCompare(b.areaName));
  }

  get filteredAreas(): Areas[] {
    return this.areas.filter(area =>
      this.isMatch(area.areaName.toLowerCase(), this.searchText.toLowerCase())
    );
  }

  isMatch(areaName: string, searchText: string): boolean {
    return areaName.replace(/\s/g, '').includes(searchText.replace(/\s/g, ''));
  }

  isHighlighted(areaName: string): boolean {
    return this.isMatch(areaName, this.searchText);
  }

  updateSelectedAreaName() {
    const selectedArea = this.areas.find(area => area.id === this.selectedArea);
    this.selectedAreaName = selectedArea ? selectedArea.areaName : '';
  }

  selectArea(areaId: string) {
    this.selectedArea = areaId;
    this.updateSelectedAreaName();
  }

  onSearchChange(event: any) {
    this.searchText = event.target.value;
  }
  openDropdown() {
    this.select.open();
  }
  
}

