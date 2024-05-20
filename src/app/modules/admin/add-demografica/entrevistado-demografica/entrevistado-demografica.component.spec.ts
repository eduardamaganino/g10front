import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistadoDemograficaComponent } from './entrevistado-demografica.component';

describe('EntrevistadoDemograficaComponent', () => {
  let component: EntrevistadoDemograficaComponent;
  let fixture: ComponentFixture<EntrevistadoDemograficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrevistadoDemograficaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrevistadoDemograficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
