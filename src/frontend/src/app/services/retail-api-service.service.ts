import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { PersonalDataService } from './personal-data.service';
import { Observable } from 'rxjs';
import { PersonalData } from '../classes/personal-data';


@Injectable({
  providedIn: 'root'
})
export class RetailApiServiceService {
  

  constructor(private http: HttpClient, private pDataService: PersonalDataService) { }
  
  getPersonalData(): Observable<PersonalData[]> {
    return this.pDataService.getPersonalData();
  }
  getPersonalDataById(id: number): Observable<PersonalData> {
    return this.pDataService.getPersonalDataById(id);
  }

  // A method that updates PersonalData
  updatePersonalData(personalData: PersonalData): Observable<PersonalData> {
    return this.pDataService.updatePersonalData(personalData);
  }

  // A method that deletes PersonalData by id
  deletePersonalData(id: number): Observable<{}> {
    return this.pDataService.deletePersonalData(id);
  }
  


}

