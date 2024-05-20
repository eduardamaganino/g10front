import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from './contatos.model';
import { BaseResourceService } from 'app/shared/services/base-resource.service';


@Injectable({
  providedIn: 'root'
})
export class ContatoService extends BaseResourceService<Contato>{

  protected http: HttpClient;

  constructor(protected override injector: Injector) {
    super("http://localhost:8080/api/contatos", injector, Contato.fromJson)
   }

  upload(data:any, id: any): Observable<any> {
    return this.http.post(`${this.apiPath}/upload/${id}`, data);
  }
}
