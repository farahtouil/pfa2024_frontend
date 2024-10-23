import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})

export class PopUpComponent implements OnInit{

  // Variables to store selected date and time
  selectedDate: Date | null = null;
  inputDate: string = '';

  heureDep: string = '';
  heureFin: string = '';
  availableTimes: string[] = [
    '08:00 AM', '09:00 AM', '10:00 AM',
    '11:00 AM', '12:00 PM', '01:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];
   
  // Method to parse the input string and convert it to a Date object
 /* parseDate(dateString: string): Date | null {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JS
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null; // Return null if the format is incorrect
  }*/


  constructor(@Inject(MAT_DIALOG_DATA) public data: { nom: string; prenom: string;ser: number,clientId: number },private dialogRef: MatDialogRef<PopUpComponent>,private userService: UsersService){}

  ngOnInit(): void {}

  async onConfirm(): Promise<void> {
    //this.selectedDate = this.parseDate(this.inputDate);
    if (this.selectedDate && this.heureDep && this.heureFin) {

      // Convert heureDep and heureFin to 24-hour format
    const convertedHeureDep = this.convertTo24HourFormat(this.heureDep);
    const convertedHeureFin = this.convertTo24HourFormat(this.heureFin);

    // Combine selectedDate with heureDep and heureFin
    const dateWithHeureDep = new Date(this.selectedDate);
    dateWithHeureDep.setHours(convertedHeureDep.hours, convertedHeureDep.minutes);

    const dateWithHeureFin = new Date(this.selectedDate);
    dateWithHeureFin.setHours(convertedHeureFin.hours, convertedHeureFin.minutes);

    const heureDepTime = this.formatTime(dateWithHeureDep);
    const heureFinTime = this.formatTime(dateWithHeureFin);



      const reservationData = {
        client: { id_user: this.data.clientId },
        service: { id_ser: this.data.ser },
        statut: 'en_attente',
        heure_dep: heureDepTime,
        heure_fin: heureFinTime,
        date_unique: this.selectedDate.toISOString().split('T')[0]
      };

      try {
        const token = this.userService.getToken(); // Get the token for authorization
        if (token) {
          const response = await this.userService.createReservation(reservationData, token);
          console.log('Reservation created successfully', response);
          alert('Réservation crée avec succées.');
           this.dialogRef.close({
            success: true,
            reservation: response.reservation
          });
        }
      } catch (error) {
        console.error('Error creating reservation:', error);
        alert('Failed to create reservation. Please try again.');
      }
    } else {
      alert('Veuillez sélectionner une date et une heure.');
    }
    console.log(this.selectedDate);

  }

  // Handler for "Annuler" button
  async onCancel(): Promise<void> {
   this.dialogRef.close(null); // Close the dialog without passing data
  }

  convertTo24HourFormat(time: string): { hours: number, minutes: number } {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
  
    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
  
    return { hours, minutes };
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = '00';  // Optional: Adjust seconds if needed
    return `${hours}:${minutes}:${seconds}`;
  }

}
