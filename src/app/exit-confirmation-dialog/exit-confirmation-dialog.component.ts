import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exit-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './exit-confirmation-dialog.component.html',
  styleUrls: ['./exit-confirmation-dialog.component.css'],
})
export class ExitConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ExitConfirmationDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close('no'); // סגור את הדיאלוג והחזר 'no'
  }
}
