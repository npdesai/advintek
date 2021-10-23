import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoadingDataService {

  constructor() {}

  showLoader() {
    $('#ajax-loading').show();
  }

  hideLoader() {
    $('#ajax-loading').hide();
  }
}
