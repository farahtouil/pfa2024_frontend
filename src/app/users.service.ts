import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ServiceP } from './models/serviceP.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private base_url ="http://localhost:8081";
  private allServices: ServiceP[] = [];

  constructor(private http: HttpClient) { }


  async login(mail:string,mdp:string): Promise<any>{
    const url =`${this.base_url}/auth/login`;
    try{
      const response = await this.http.post<any>(url,{mail,mdp}).toPromise()
      //const response = await firstValueFrom(this.http.post<any>(url, { mail, mdp }));
      return response;

    }catch(error){
      throw error;
    }
  }

  async registerClient(clientData:any, token:string):Promise<any>{
    const url = `${this.base_url}/auth/registerClient`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.post<any>(url, clientData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async registerPrestataire(presData:any, token:string):Promise<any>{
    const url = `${this.base_url}/auth/registerPrestataire`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.post<any>(url, presData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  //clients methods

  async getAllClients(token:string):Promise<any>{
    const url = `${this.base_url}/client`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async getClientById(id_user: string, token:string):Promise<any>{
    const url = `${this.base_url}/client/${id_user}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async deleteClient(id_user: string, token:string):Promise<any>{
    const url = `${this.base_url}/client/${id_user}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.delete<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  async updateClient(id_user: string, clientData: any, token:string):Promise<any>{
    const url = `${this.base_url}/client/${id_user}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.put<any>(url, clientData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

//prestataire methods

async getAllPrestataires(token:string):Promise<any>{
  const url = `${this.base_url}/prestataire`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  try{
    const response =  this.http.get<any>(url, {headers}).toPromise()
    return response;
  }catch(error){
    throw error;
  }
}

async getPrestataireById(id_user: string, token:string):Promise<any>{
  const url = `${this.base_url}/prestataire/${id_user}`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  try{
    const response =  this.http.get<any>(url, {headers}).toPromise()
    return response;
  }catch(error){
    throw error;
  }
}

async deletePrestataire(id_user: string, token:string):Promise<any>{
  const url = `${this.base_url}/prestataire/${id_user}`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  try{
    const response =  this.http.delete<any>(url, {headers}).toPromise()
    return response;
  }catch(error){
    throw error;
  }
}

async updatePrestataire(id_user: string, presData: any, token:string):Promise<any>{
  const url = `${this.base_url}/prestataire/${id_user}`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  try{
    const response =  this.http.put<any>(url, presData, {headers}).toPromise()
    return response;
  }catch(error){
    throw error;
  }
}

async addServiceToPrestataire(id_user: string, serviceData: any, token:string):Promise<any>{
  const url = `${this.base_url}/${id_user}/prestataire`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  try{
    const response =  this.http.post<any>(url, serviceData, {headers}).toPromise()
    return response;
  }catch(error){
    throw error;
  }
}

async updateServicePForPrestataire(id_user: string,id_ser: string ,serviceData: any, token:string):Promise<any>{
  const url = `${this.base_url}/${id_user}/services/${id_ser}`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  try{
    const response =  this.http.post<any>(url, serviceData, {headers}).toPromise()
    return response;
  }catch(error){
    throw error;
  }
}

//service methods
async getServicesByType(type: string, token: string): Promise<ServiceP[]> {
  const url = `${this.base_url}/service?type=${type}`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  try {
    const response = await this.http.get<ServiceP[]>(url, { headers }).toPromise();
    return response || [];
  } catch (error) {
    throw error;
  }
}



  /***AUTHEMNTICATION METHODS */
  logOut():void{
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }

  isAuthenticated(): boolean {
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;

  }

  isAdmin(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'admin'
    }
    return false;

  }

  isClient(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'client'
    }
    return false;

  }

  isPrestataire(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'prestataire'
    }
    return false;

  }
}