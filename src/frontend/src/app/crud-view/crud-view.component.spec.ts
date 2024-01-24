import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDViewComponent } from './crud-view.component';

describe('CRUDViewComponent', () => {
  let component: CRUDViewComponent;
  let fixture: ComponentFixture<CRUDViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRUDViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CRUDViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
