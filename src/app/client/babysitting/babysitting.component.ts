import { Component,OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { ServiceP } from '../../models/serviceP.model';



@Component({
  selector: 'app-babysitting',
  templateUrl: './babysitting.component.html',
  styleUrl: './babysitting.component.css'
})
export class BabysittingComponent {

  listOfData: ServiceP[] = [];
  
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.fetchServices();
  }

  async fetchServices() {
    const token = localStorage.getItem('token') || '';
    try {
      this.listOfData = await this.userService.getServicesByType('babysitting', token);
      console.log('listOfData:', this.listOfData);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }
}
