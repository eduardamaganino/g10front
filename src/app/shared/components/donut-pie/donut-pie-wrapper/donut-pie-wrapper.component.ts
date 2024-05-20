import { Component, Input } from '@angular/core';
import { RespostaCount } from 'app/modules/admin/dashboards/respostaCount.types';

@Component({
  selector: 'app-donut-pie-wrapper',
  template: `
    <div class="flex flex-col flex-auto h-64 bg-white rounded-md shadow-md p-4">
      <div class="flex flex-col items-center justify-center h-full">
        <h3>{{ pergunta }}</h3>
        <app-donut-pie [resp]="respostas"></app-donut-pie>
      </div>
    </div>
  `,
})
export class DonutPieWrapperComponent {
  @Input() pergunta: string;
  @Input() respostas: RespostaCount[];}
