import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobDescriptionRequest } from '../payload/JobDescriptionRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobDescriptionService {

  private apiUrl = 'http://localhost:8091/api/job-descriptions';  // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }

  // Méthode pour créer une description de poste
  createJobDescription(jobDescription: JobDescriptionRequest): Observable<JobDescriptionRequest> {
   // const params = new HttpParams().set('publicatorUsername', "amelki");
    return this.http.post<JobDescriptionRequest>(`${this.apiUrl}`, jobDescription);
  }


  

  // Méthode pour récupérer une description de poste spécifique par son ID
  
  }