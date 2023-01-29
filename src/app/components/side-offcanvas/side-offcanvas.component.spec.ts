import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideOffcanvasComponent } from './side-offcanvas.component';

describe('SideOffcanvasComponent', () => {
  let component: SideOffcanvasComponent;
  let fixture: ComponentFixture<SideOffcanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideOffcanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
