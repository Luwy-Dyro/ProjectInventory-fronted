import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewCategComponent } from './modal-new-categ.component';

describe('ModalNewCategComponent', () => {
  let component: ModalNewCategComponent;
  let fixture: ComponentFixture<ModalNewCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewCategComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
