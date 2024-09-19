import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-success-or-failure-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './success-or-failure-dialog.component.html',
  styleUrl: './success-or-failure-dialog.component.css',
})
export class SuccessOrFailureDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessOrFailureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
}
