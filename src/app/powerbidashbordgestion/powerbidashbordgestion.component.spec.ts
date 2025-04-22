import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerbidashbordgestionComponent } from './powerbidashbordgestion.component';

describe('PowerbidashbordgestionComponent', () => {
  let component: PowerbidashbordgestionComponent;
  let fixture: ComponentFixture<PowerbidashbordgestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerbidashbordgestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerbidashbordgestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
