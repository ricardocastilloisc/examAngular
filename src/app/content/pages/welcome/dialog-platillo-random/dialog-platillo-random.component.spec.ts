import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlatilloRandomComponent } from './dialog-platillo-random.component';

describe('DialogPlatilloRandomComponent', () => {
  let component: DialogPlatilloRandomComponent;
  let fixture: ComponentFixture<DialogPlatilloRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPlatilloRandomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPlatilloRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
