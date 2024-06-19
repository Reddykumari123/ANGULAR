import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderformEditComponent } from './orderform-edit.component';

describe('OrderformEditComponent', () => {
  let component: OrderformEditComponent;
  let fixture: ComponentFixture<OrderformEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderformEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderformEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
