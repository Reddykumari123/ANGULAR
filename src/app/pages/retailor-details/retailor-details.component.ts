import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { ProductDetails, productDetails } from '../../Models/product-details';
import { RetailorDetails } from '../../Models/retailor-details';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-retailor-details',
  standalone: true,
  imports: [RouterModule, RouterOutlet,MatTableModule,MaterialModule],
  templateUrl: './retailor-details.component.html',
  styleUrls: ['./retailor-details.component.scss']
})
export class RetailorDetailsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['product', 'quantity', 'price'];
  dataSource = new MatTableDataSource<productDetails>();
  retailorlist: RetailorDetails;
  private subscription: Subscription;
  product: ProductDetails;

  constructor(private retailorService: RetailorDetailsService, private location: Location) {}

  ngOnInit(): void {
    this.subscription = this.retailorService.infoButtonClick.subscribe((retailorlist: RetailorDetails) => {
      if (!this.isRetailorAlreadyPresent(retailorlist)) {
        console.log(retailorlist);
        this.retailorlist = retailorlist;
        this.loadProducts(retailorlist.id);
      }
    });
  }

  private loadProducts(id: string): void {
    this.retailorService.getProductsById(id).subscribe((data: ProductDetails) => {
      this.processData(data);
    });
  }

  private processData(data: ProductDetails): void {
    this.dataSource.data = data.product;
    console.log(this.dataSource.data);
  }

  goback() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private isRetailorAlreadyPresent(retailorlist: RetailorDetails): boolean {
    return this.retailorlist && this.retailorlist.id === retailorlist.id;
  }

  deleteDsr(id: string): void {
    this.retailorService.deleteDsr(id).subscribe(
      () => console.log('DSR deleted successfully'),
      error => console.error('Error deleting DSR:', error)
    );
  }
}