import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren,} from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../Models/product';
import { ProductService } from '../../../Service/product.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-add-dsr',
  standalone: true,
  imports: [MaterialModule, MatDatepickerModule, MatNativeDateModule, FormsModule,MatTableModule],
  templateUrl: './add-dsr.component.html',
  styleUrl: './add-dsr.component.scss'
})
export class AddDsrComponent implements OnInit {
  displayedColumns = ['productName', 'quantity', 'price', 'productTotal'];
  dataSource = new MatTableDataSource<Product>([]);

  selectedDate: Date = new Date();
  retailers: any[] = [];
  products: any[] = [];
  areas: string[] = [];
  distributorid: any;
  ExecutiveId: any;
  retailorNames: any;
  selectedRetailer: any;
  selectedArea: string | undefined;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private retailorService: RetailorDetailsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.setupHardwareBackButton();
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.distributorid = params.get('id');
      this.ExecutiveId = params.get('Id');
      this.getProducts();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.productName && data.productName.toLowerCase().includes(filter.trim().toLowerCase());
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (allProducts: Product[] | Product) => {
        if (Array.isArray(allProducts)) {
          allProducts.forEach(x => x.quantity = '');
          this.dataSource.data = allProducts;
        }
      },
      error: (error) => {
      }
    });

    this.retailorService.getRetailorNamesbydistributor(this.distributorid).subscribe({
      next: (data) => {
        this.retailorNames = data;
        this.areas = Array.from(new Set(data.map((retailer: any) => retailer.area)));
      },
      error: (error) => {
      }
    });
  }

  filterRetailers(): any[] {
    if (!this.selectedArea || !this.retailorNames) {
      return this.retailorNames;
    } else {
      return this.retailorNames.filter(retailer => retailer.area === this.selectedArea);
    }
  }

  onAreaChange(selectedArea: string): void {
    this.selectedArea = selectedArea;
    if (!selectedArea) {
      this.selectedRetailer = undefined; 
    }
  }

  calculateSubtotal(product: any, newQuantity: string) {
    product.subtotal = product.price * parseFloat(newQuantity);
  }

  calculatePricetotal(product: any, productprice: string) {
    product.subtotal = parseFloat(productprice) * product.quantity;
  }

  calculateTotal(): number {
    let total = 0;
    this.dataSource.data.forEach(product => {
      total += product.subtotal || 0;
    });
    return total;
  }

  review() {
    const selectedProducts = this.dataSource.data.filter(product => product.quantity != 0 && product.quantity != '' && product.quantity != undefined);
    console.log(selectedProducts);
  }

  setupHardwareBackButton(): void {
    document.addEventListener('backbutton', () => {
      this.handleHardwareBackButton();
    });
  }

  handleHardwareBackButton(): void {
    this.location.back();
  }
}