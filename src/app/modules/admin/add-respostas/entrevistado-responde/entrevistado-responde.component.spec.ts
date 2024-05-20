import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrevistadoRespondeComponent } from './entrevistado-responde.component';



describe('EntrevistadoRespondeComponent', () => {
  let component: EntrevistadoRespondeComponent;
  let fixture: ComponentFixture<EntrevistadoRespondeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrevistadoRespondeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrevistadoRespondeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});