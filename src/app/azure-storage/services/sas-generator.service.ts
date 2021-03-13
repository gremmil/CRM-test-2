import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BlobStorageRequest } from '../types/azure-storage';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SasGeneratorService {
  constructor(private http: HttpClient) {}

  getSasToken(): Observable<BlobStorageRequest> {
    return this.http.get<BlobStorageRequest>(
      `${environment.sasGeneratorUrl}`, environment.Headers)
  }
}
