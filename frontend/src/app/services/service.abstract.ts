import { environment } from '../../environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export abstract class Service {
  api: string = environment.api;

  prepareAuthHeaders(headers = new HttpHeaders): HttpHeaders {
    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return headers;
  }

  prepareParams(key, value: string, params = new HttpParams): HttpParams {
    params = params.append(key, value);
    return params;
  }
}
