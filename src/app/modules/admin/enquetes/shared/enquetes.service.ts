import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enquete } from './enquetes.model';
import { BaseResourceService } from 'app/shared/services/base-resource.service';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class EnqueteService extends BaseResourceService<Enquete>{

  protected http: HttpClient;

  constructor(protected injector: Injector) { 
    super("http://localhost:8080/api/enquetes", injector, Enquete.fromJson)
  }

  findByNome(nome: any): Observable<Enquete[]> {
    return this.http.get<Enquete[]>(`${this.apiPath}?nome=${nome}`);
  }

  createPergunta(data: any, id: any): Observable<any>{
    return this.http.post(`${this.apiPath}/${id}`, data);
  }

  createTransmissao(data: any, id: any): Observable<any>{
    return this.http.post(`${this.apiPath}/transmissao/${id}`, data);
  }

  createDemografica(data: any, id: any): Observable<any>{
    return this.http.post(`${this.apiPath}/demografica/${id}`, data);
  }

  getAggregate(id: any): Observable<Enquete> {
    return this.http.get(`${this.apiPath}/aggregate${id}`);
  }

  getAggregateDemografica(id: any): Observable<Enquete> {
    return this.http.get(`${this.apiPath}/aggregateDemografica${id}`);
  }

  
  relatorioPremiadas(id: any, colocado: any): Observable<Enquete> {
    return this.http.get(`${this.apiPath}/pdfpremiada/${id}/${colocado}`); 
  }

  relatorioAllCategories(id: any): Observable<Enquete> {
    return this.http.get(`${this.apiPath}/pdfcategorias/${id}`); 
  }

  relatorioAllRespostas(id: any): Observable<Enquete> {
    return this.http.get(`${this.apiPath}/pdfallresp/${id}`); 
  }

  uploadRelatorio(file: any): Observable<any> {
    return this.http.get(`${this.apiPath}/pdfs/${file}`);
  }
}
