import { Component , OnInit } from '@angular/core';
import { Reservation } from '../../models/serviceP.model';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-res-accept',
  templateUrl: './res-accept.component.html',
  styleUrl: './res-accept.component.css'
})
export class ResAcceptComponent implements OnInit{

  listOfData: Reservation[] = [];
  id_user: number | null = null;

  constructor(private usersService: UsersService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.id_user = await this.usersService.getPrestataireIdFromToken(); // Get prestataire ID from the token
    if (this.id_user) {
      
      try {
        const token = localStorage.getItem('token') || '';
        const response = await this.usersService.getReservationsByPrestataire(this.id_user, token);
        console.log("response",response)
        console.log("response.reservationDTOs",response.reservationDTOs)


        if (response && Array.isArray(response.reservationDTOs)) {
          this.listOfData = [];

          const pendingReservations = response.reservationDTOs.filter((res:Reservation)=> res.statut === 'confirmee');

          for (const res of pendingReservations) {
           
            const reservationData = {
            id_res: res.id_res,
            service: res.service.type, // Type of the service
            client: `${res.client.nom} ${res.client.prenom}`, // Assuming the response contains client data
            date_unique: res.date_unique, // Ensure this field matches your API response
            heures: `de ${res.heure_dep} jusqu'à ${res.heure_fin}`, // Combine start and end hours
            prix: res.prix, // Price of the service
            statut: res.statut, // Status of the reservation

          };
          this.listOfData.push(reservationData);

        }
          

        } else {
          console.error('Failed to load reservations:', response.message);
        }
      } catch (error) {
        console.error('Error loading reservations:', error);
      }

    } else {
      console.error('Prestataire ID could not be retrieved');
    }
  }

}
