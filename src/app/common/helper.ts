import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageToastrComponent } from '../components/message-toastr/message-toastr.component';

declare var $: any;

@Injectable()
export class Helper {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, alertType: AlertType) {

    let style = 'success-dialog';
    let duration = 3000;

    switch (alertType) {
      case AlertType.Error:
        style = "error-dialog";
        duration = null;
        break;
      case AlertType.Info:
        style = "info-dialog";
        break;
      default:
        style = "success-dialog";
    }

    this.snackBar.openFromComponent(MessageToastrComponent, { data: message, duration: duration, verticalPosition: "top", panelClass: [style] });
  }

  static getErrorMessagesText(errorMessages: string[]) {

    var li = "";

    for (let message of errorMessages) {
      li += "<li>" + message + "</li>";
    }

    return "<ul>" + li + "</ul>";
  }

  static uuid() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }


}


export enum AlertType {
  Error = 1,
  Success,
  Info
}
