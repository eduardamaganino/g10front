import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DemograficaComponent } from './demografica.component';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';
import {MatStepperModule} from '@angular/material/stepper';
import { EditDemograficasComponent } from './edit-demograficas/edit-demograficas.component';
import { CreateDemograficasComponent } from './create-demograficas/create-demograficas.component';
import { AlternativasDemograficasComponent } from './alternativas-demograficas/alternativas-demograficas.component';
import { CreateAlterDemograficasComponent } from './alternativas-demograficas/create-alter-demograficas/create-alter-demograficas.component';


const demograficasRoutes: Route[] = [
  {
      path     : ':id',
      component: DemograficaComponent
  },
  {
    path     : ':id/create',
    component: CreateDemograficasComponent,
  },
  {
    path     : ':id/edit',
    component: EditDemograficasComponent,
  },
  {
    path     : 'alternativaDemografica/:id',
    component: CreateAlterDemograficasComponent,
  },
];

@NgModule({
  declarations: [
    DemograficaComponent,
    EditDemograficasComponent,
    CreateDemograficasComponent,
    AlternativasDemograficasComponent,
    CreateAlterDemograficasComponent
  ],
  imports: [
    RouterModule.forChild(demograficasRoutes),
    SharedModule,
    MatSelectModule,
    MatStepperModule
  ]
})
export class DemograficaModule { }
