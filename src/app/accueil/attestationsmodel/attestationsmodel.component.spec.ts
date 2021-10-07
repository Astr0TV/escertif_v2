import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationsmodelComponent } from './attestationsmodel.component';

describe('AttestationsmodelComponent', () => {
  let component: AttestationsmodelComponent;
  let fixture: ComponentFixture<AttestationsmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttestationsmodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationsmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
