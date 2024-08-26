import { Component,OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { ServicePResponse ,ServiceP} from '../../models/serviceP.model';



@Component({
  selector: 'app-babysitting',
  templateUrl: './babysitting.component.html',
  styleUrl: './babysitting.component.css'
})


export class BabysittingComponent implements OnInit{
  

  listOfData: ServiceP[] = [];
  gouvernorat: string | null = '';
  
  constructor(private userService: UsersService) {}

  async ngOnInit(): Promise<void> {
    try {
      // Fetch and assign the gouvernorat asynchronously
      this.gouvernorat = await this.userService.getGouvernoratFromToken();
      console.log('gouvernorat:', this.gouvernorat);
  
      // You can now use this.gouvernorat for further processing, e.g., fetching services
      //if (this.gouvernorat) {
        //this.fetchServices();
      //}
    } catch (error) {
      console.error('Error fetching gouvernorat:', error);
    }
    this.fetchServices();
  }
  

  async fetchServices() {
    const token = localStorage.getItem('token') || '';
    try {
      // Adjusting based on the assumption that getServicesByType returns an object with servicePs
      const response: ServicePResponse = await this.userService.getServicesByType('babysitting', token);
      
      // Checking if the response is in the correct format
      if (response && Array.isArray(response.servicePs)) {
        this.listOfData = response.servicePs.filter(service => service.prestataire.gouvernorat === this.gouvernorat); // Assign the array to listOfData
      } else {
        console.error('Unexpected response format:', response);
      }

      console.log('listOfData:', this.listOfData);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }
}
