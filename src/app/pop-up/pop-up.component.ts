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
  heureDep: string = '';
  heureFin: string = '';
  availableTimes: string[] = [
    '08:00 AM', '09:00 AM', '10:00 AM',
    '11:00 AM', '12:00 PM', '01:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { nom: string; prenom: string;ser: string },private dialogRef: MatDialogRef<PopUpComponent>,private userService: UsersService){}

  ngOnInit(): void {
      
  }
  // Handler for "Confirmer" button
  async onConfirm(): Promise<void> {
    if (this.selectedDate && this.heureDep && this.heureFin) {
      await this.dialogRef.close({
        date: this.selectedDate,
        startTime: this.heureDep,
        endTime: this.heureFin
      });
      
    } else {
      // Optionally, handle empty inputs
      alert('Veuillez sélectionner une date et une heure.');
    }
  }

  // Handler for "Annuler" button
  async onCancel(): Promise<void> {
    await this.dialogRef.close(null); // Close the dialog without passing data
  }

}
