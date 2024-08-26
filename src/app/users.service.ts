import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import {jwtDecode} from 'jwt-decode'; // Use this for JWT decoding
import { firstValueFrom } from 'rxjs';
import { ServicePResponse } from './models/serviceP.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private base_url = 'http://localhost:8081';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
  }

  async login(mail: string, mdp: string): Promise<any> {
    const url = `${this.base_url}/auth/login`;
    try {
      const response = await firstValueFrom(this.http.post<any>(url, { mail, mdp }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async registerClient(clientData: any): Promise<any> {
    const url = `${this.base_url}/auth/registerClient`;
    
    try {
      const response = await firstValueFrom(this.http.post<any>(url, clientData));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async registerPrestataire(presData: any): Promise<any> {
    const url = `${this.base_url}/auth/registerPrestataire`;
    
    try {
      const response = await firstValueFrom(this.http.post<any>(url, presData));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Client Methods

  async getAllClients(token: string): Promise<any> {
    const url = `${this.base_url}/client`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.get<any>(url, { headers }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getClientById(id_user: number, token: string): Promise<any> {
    const url = `${this.base_url}/client/${id_user}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.get<any>(url, { headers }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteClient(id_user: string, token: string): Promise<any> {
    const url = `${this.base_url}/client/${id_user}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.delete<any>(url, { headers }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateClient(id_user: string, clientData: any, token: string): Promise<any> {
    const url = `${this.base_url}/client/${id_user}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.put<any>(url, clientData, { headers }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getGouvernoratFromToken(): Promise<string | null> {
    const token = this.getToken();
    console.log("Token retrieved:", token);
    if (token) {
        const decodedToken: any = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        const user_id = decodedToken ? decodedToken.user_id : null;

        if (user_id) {
            try {
                const clientData = await this.getClientById(user_id, token);
                console.log("Client data retrieved:", clientData);
                //console.log("Client gouvernorat:", clientData.client.gouvernorat);
                return clientData ? clientData.client.gouvernorat : null;
            } catch (error) {
                console.error("Error fetching client data:", error);
                return null;
            }
        }
    }
    console.log("Token not found or userId is null");
    return null;
}


  // Prestataire Methods

  async getAllPrestataires(token: string): Promise<any> {
    const url = `${this.base_url}/prestataire`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.get<any>(url, { headers }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPrestataireById(id_user: number, token: string): Promise<any> {
    const url = `${this.base_url}/prestataire/${id_user}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.get<any>(url, { headers }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deletePrestataire(id_user: string, token: string): Promise<any> {
    const url = `${this.base_url}/prestataire/${id_user}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.delete<any>(url, { headers }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updatePrestataire(id_user: string, presData: any, token: string): Promise<any> {
    const url = `${this.base_url}/prestataire/${id_user}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.put<any>(url, presData, { headers }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addServiceToPrestataire(id_user: string, serviceData: any, token: string): Promise<any> {
    const url = `${this.base_url}/${id_user}/prestataire`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.post<any>(url, serviceData, { headers }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateServicePForPrestataire(id_user: string, id_ser: string, serviceData: any, token: string): Promise<any> {
    const url = `${this.base_url}/${id_user}/services/${id_ser}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.put<any>(url, serviceData, { headers }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Service Methods

  async getServicesByType(type: string, token: string): Promise<ServicePResponse> {
    const url = `${this.base_url}/service/type/${type}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      const response = await firstValueFrom(this.http.get<ServicePResponse>(url, { headers }));
      return response || { statusCode: 500, message: 'No data', servicePs: [] };
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  // Authentication Methods

  logOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  isAuthenticated(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return isPlatformBrowser(this.platformId) && localStorage.getItem('role') === 'admin';
  }

  isClient(): boolean {
    return isPlatformBrowser(this.platformId) && localStorage.getItem('role') === 'client';
  }

  isPrestataire(): boolean {
    return isPlatformBrowser(this.platformId) && localStorage.getItem('role') === 'prestataire';
  }
}
