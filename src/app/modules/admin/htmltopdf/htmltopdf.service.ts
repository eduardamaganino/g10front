import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResourceService } from 'app/shared/services/base-resource.service';


@Injectable({
  providedIn: 'root'
})
export class HtmltopdfService {

  protected http: HttpClient;
  apiPath = "http://localhost:8080/api/htmltopdf";
  
  transformar( data: any): Observable<any> {
    return this.http.post(`${this.apiPath}/transformarhtml/`, data);
  }
  
  
}
