import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demografica } from './demografica.model';
import { BaseResourceService } from 'app/shared/services/base-resource.service';


@Injectable({
  providedIn: 'root'
})
export class DemograficaService extends BaseResourceService<Demografica>{

  protected http: HttpClient;
  
  constructor(protected override injector: Injector) { 
    super("http://localhost:8080/api/demograficas", injector, Demografica.fromJson)
  }

  createResposta(id: any, data: any): Observable<any> {
    return this.http.post(`${this.apiPath}/respostaDemografica/${id}`, data);
  }

  createAlternativa(id: any, data: any): Observable<any> {
    return this.http.post(`${this.apiPath}/alternativaDemografica/${id}`, data);
  }

  uploadDemografica(data:any, id: any): Observable<any> {
    return this.http.post(`${this.apiPath}/uploadDemografica/${id}`, data);
  }

  groupRespostas(id: any): Observable<Demografica> {
    return this.http.get(`${this.apiPath}/groupDemo/${id}`);
  }
  
  
}
