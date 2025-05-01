import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalementAdminComponent } from './signalement-admin.component';

describe('SignalementAdminComponent', () => {
  let component: SignalementAdminComponent;
  let fixture: ComponentFixture<SignalementAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalementAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
