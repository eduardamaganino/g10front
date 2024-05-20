import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPremiadaComponent } from './relatorio-premiada.component';

describe('RelatorioPremiadaComponent', () => {
  let component: RelatorioPremiadaComponent;
  let fixture: ComponentFixture<RelatorioPremiadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioPremiadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioPremiadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
