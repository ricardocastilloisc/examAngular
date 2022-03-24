import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatilloDetallComponent } from './platillo-detall.component';

describe('PlatilloDetallComponent', () => {
  let component: PlatilloDetallComponent;
  let fixture: ComponentFixture<PlatilloDetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatilloDetallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatilloDetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
