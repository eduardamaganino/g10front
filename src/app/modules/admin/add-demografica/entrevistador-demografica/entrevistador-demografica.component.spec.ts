import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistadorDemograficaComponent } from './entrevistador-demografica.component';

describe('EntrevistadorDemograficaComponent', () => {
  let component: EntrevistadorDemograficaComponent;
  let fixture: ComponentFixture<EntrevistadorDemograficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrevistadorDemograficaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrevistadorDemograficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
