import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})
export class DialogConfirmationComponent implements OnInit {

  message: string;

  constructor(
    public _dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit(): void {
    this.message = this.data;
  }

  close() {
    this._dialogRef.close(true);
  }

}
