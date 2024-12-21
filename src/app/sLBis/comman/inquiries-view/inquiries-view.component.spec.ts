import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiriesViewComponent } from './inquiries-view.component';

describe('InquiriesViewComponent', () => {
  let component: InquiriesViewComponent;
  let fixture: ComponentFixture<InquiriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiriesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
