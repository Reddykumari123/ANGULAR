import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../../Service/product.service';
import { RetailorDetailsService } from '../../../Service/retailor-details.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../Models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { selectProducts } from '../../../Store/selector';
import { addProducts, updatedProducts } from '../../../Store/actions';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-add-dsr',
  standalone: true,
  imports: [
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule
  ],
  templateUrl: './add-dsr.component.html',
  styleUrls: ['./add-dsr.component.scss']
})
export class AddDsrComponent implements OnInit {
  displayedColumns = ['productName', 'quantity', 'price', 'productTotal'];
  dataSource = new MatTableDataSource<Product>([]);
  retailers: any[] = [];
  areas: string[] = [];
  distributorid: string | null = null;
  ExecutiveId: string | null = null;
  retailorNames: any;
  selectedRetailer: any;
  selectedArea: string | undefined;
  retainedproducts: Observable<any>;

  dateForm = new FormGroup({
    selectedDate: new FormControl('', [Validators.required, this.lastThreeDaysValidator()])
  });

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private retailorService: RetailorDetailsService,
    private location: Location,
    private store: Store<Product[]>,
    private router: Router
  ) {}

  get selectedDate() {
    return this.dateForm.get('selectedDate');
  }

  lastThreeDaysValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      const threeDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);

      return selectedDate >= threeDaysAgo && selectedDate <= today
        ? null
        : { 'invalidDate': { value: control.value } };
    };
  }

  ngOnInit(): void {
    this.setupHardwareBackButton();
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.distributorid = params.get('id');
      this.ExecutiveId = params.get('id');
      this.retainedproducts = this.store.pipe(select(selectProducts));
      console.log(this.retainedproducts);
      this.getProducts();

      if (this.distributorid && this.distributorid.startsWith('NDIS')) {
        this.getRetailorNamesByDistributor();
      } else if (this.ExecutiveId && this.ExecutiveId.startsWith('NEXE')) {
        this.getRetailorNamesByExecutive();
      }
    });
  }

  applyFilter(filterValue: string): void {
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
          this.retainedproducts.subscribe((ngrxData: any[]) => {
            this.dataSource.data.forEach((product) => {
              const ngrxProduct = ngrxData.find((item) => item.id === product.id);
              if (ngrxProduct) {
                product.quantity = ngrxProduct.quantity;
                product.price = ngrxProduct.price;
                product.subtotal = ngrxProduct.subtotal;
              }
            });
          });
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getRetailorNamesByDistributor(): void {
    if (this.distributorid) {
      this.retailorService.getRetailorNamesbydistributor(this.distributorid).subscribe({
        next: (data) => {
          this.retailorNames = data;
          this.areas = Array.from(new Set(data.map((retailer: any) => retailer.area)));
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }



    getRetailorNamesByExecutive(): void {
      if (this.ExecutiveId) {
        this.retailorService.getRetailorNamesbyexecutive(this.ExecutiveId).subscribe({
          next: (data) => {
            console.log('Retailor data by executive:', data); 
            this.retailorNames = data;
            this.areas = Array.from(new Set(data.map((retailer: any) => retailer.area)));
            console.log('Areas:', this.areas); 
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
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

  calculateSubtotal(product: any, newQuantity: string): void {
    product.subtotal = product.price * parseFloat(newQuantity);
  }

  calculatePricetotal(product: any, productPrice: string): void {
    product.subtotal = parseFloat(productPrice) * product.quantity;
  }

  calculateTotal(): number {
    let total = 0;
    this.dataSource.data.forEach(product => {
      total += product.subtotal || 0;
    });
    return total;
  }

  review(): void {
    const selectedProducts = this.dataSource.data.filter(product => product.quantity != 0 && product.quantity != '' && product.quantity != undefined);
    console.log(selectedProducts);
    console.log(this.selectedRetailer);
    this.productService.DisplaySelectedProducts(selectedProducts);
    selectedProducts.forEach(products => {
      try {
        this.store.dispatch(addProducts({ products }));
        this.store.dispatch(updatedProducts({ products: [products] }));
        console.log("Inserted the values into store");
      } catch (error) {
        console.error(error);
      }
    });

    this.router.navigate(['/CreateDSR', this.distributorid, 'Review'], {
      queryParams: {
        products: JSON.stringify(selectedProducts),
        retailer: JSON.stringify(this.selectedRetailer),
        area: this.selectedArea
      }
    });
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
