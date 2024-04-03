import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { ProductsByDsrId } from '../../Models/products-by-dsr-id';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RetailorDetails } from '../../Models/retailor-details';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-retailor-details',
  standalone: true,
  imports: [MaterialModule, RouterModule, RouterOutlet, MatTableModule],
  templateUrl: './retailor-details.component.html',
  styleUrl: './retailor-details.component.scss'
})
export class RetailorDetailsComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity', 'price'];
  dataSource = new MatTableDataSource<ProductsByDsrId>();
  products: ProductsByDsrId[];
  retailorlist: RetailorDetails;
  private subscription: Subscription;

  constructor(private retailorService: RetailorDetailsService, private location: Location) {}

  ngOnInit(): void {
    this.subscription = this.retailorService.infoButtonClick.subscribe((retailorlist: RetailorDetails) => {
      if (!this.isRetailorAlreadyPresent(retailorlist)) {
        console.log(retailorlist);
        this.retailorlist = retailorlist;
        console.log(this.retailorlist);
      }
    });

    this.retailorService.getProductsById(this.retailorlist.id).subscribe((data: ProductsByDsrId[] | ProductsByDsrId) => {
      if (Array.isArray(data)) {
        this.products = data;
        this.dataSource.data = this.products;
        console.log(this.products);
      } else {
        this.products = [data];
        this.dataSource.data = this.products;
        console.log(this.products);
      }
    });
  }

  goback(){
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private isRetailorAlreadyPresent(retailorlist: RetailorDetails): boolean {
    return this.retailorlist && this.retailorlist.id === retailorlist.id;
  }
}