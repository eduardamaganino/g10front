import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transmissao } from './transmissoes.model';
import { BaseResourceService } from 'app/shared/services/base-resource.service';


@Injectable({
  providedIn: 'root'
})
export class TransmissaoService extends BaseResourceService<Transmissao>{

  protected http: HttpClient;
  
  constructor(protected override injector: Injector) { 
    super("http://localhost:8080/api/transmissoes", injector, Transmissao.fromJson)
  }

  findByNome(nome: any): Observable<Transmissao[]> {
    return this.http.get<Transmissao[]>(`${this.apiPath}?nome=${nome}`);
  }

  createContato(data: any, id: any): Observable<any>{
    return this.http.post(`${this.apiPath}/${id}`, data);
  }

  

  sendEmails(data: any, id: any): Observable<any>{
    return this.http.post(`${this.apiPath}/emails/${id}`, data);
  }

  upload(data:any, id: any): Observable<any> {
    return this.http.post(`${this.apiPath}/uploadTransmissao/${id}`, data);
  }
  
}
