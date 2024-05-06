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
  filterByArea: string = '';

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

  get filteredReports() {
    return this.salesReports.filter(report =>
      report.area.toLowerCase().includes(this.filterByArea.toLowerCase())
    );
  }
}
