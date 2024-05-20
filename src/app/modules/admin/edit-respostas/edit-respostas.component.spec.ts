import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRespostasComponent } from './edit-respostas.component';

describe('EditRespostasComponent', () => {
  let component: EditRespostasComponent;
  let fixture: ComponentFixture<EditRespostasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRespostasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRespostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
