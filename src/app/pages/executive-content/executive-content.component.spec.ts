import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveContentComponent } from './executive-content.component';

describe('ExecutiveContentComponent', () => {
  let component: ExecutiveContentComponent;
  let fixture: ComponentFixture<ExecutiveContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExecutiveContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
