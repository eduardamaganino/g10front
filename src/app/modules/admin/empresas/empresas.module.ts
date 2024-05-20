import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasComponent } from './empresas.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CreateEmpresasComponent } from './create-empresas/create-empresas.component';
import { EditEmpresasComponent } from './edit-empresas/edit-empresas.component';


const empresasRoutes: Route[] = [
  {
      path     : '',
      component: EmpresasComponent
  },
  {
    path     : 'edit',
    component: EditEmpresasComponent
  },
  {
    path     : 'create',
    component: CreateEmpresasComponent
  }
];

@NgModule({
  declarations: [
    EmpresasComponent,
    CreateEmpresasComponent,
    EditEmpresasComponent,
  ],
  imports: [
    RouterModule.forChild(empresasRoutes),
    SharedModule,
    
    
  ]
})
export class EmpresasModule { }
