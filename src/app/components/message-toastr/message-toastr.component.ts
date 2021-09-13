import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
  selector: "message-toastr",
  templateUrl: "message-toastr.component.html",
  styleUrls: ["message-toastr.component.css"]
})
export class MessageToastrComponent {
  constructor(public sbRef: MatSnackBarRef<MessageToastrComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
