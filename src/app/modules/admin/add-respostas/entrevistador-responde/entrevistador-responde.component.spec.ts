import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistadorRespondeComponent } from './entrevistador-responde.component';

describe('EntrevistadorRespondeComponent', () => {
  let component: EntrevistadorRespondeComponent;
  let fixture: ComponentFixture<EntrevistadorRespondeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrevistadorRespondeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrevistadorRespondeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
