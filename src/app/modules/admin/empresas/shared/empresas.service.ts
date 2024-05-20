import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from './empresas.model';
import { BaseResourceService } from 'app/shared/services/base-resource.service';

const baseUrl = 'http://localhost:8080/api/empresas';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService extends BaseResourceService<Empresa>{

  protected http: HttpClient;

  constructor(protected override injector: Injector) { 
    super("http://localhost:8080/api/empresas", injector, Empresa.fromJson)
  }
  
}
