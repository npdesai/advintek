import { Component, Input } from '@angular/core';
import { AuthUser } from '../../common/models/authUser';

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.html'
})
export class AppMenuComponent {

  @Input() public showToggleMenu: boolean = true;
  @Input() public mode: string;

  authUser?: AuthUser;

  constructor() {
  }

  ngOnInit() {

  }

  logout() {
    this.authUser = null;
  }

  toggleNavMenu() {
    $('#mainNavMenu').toggleClass('sidebar-collapse');

    if ($('#ContentWrapper').hasClass("content-wrapper-expand")) {
      $('#ContentWrapper').removeClass("content-wrapper-expand");
      $('#ContentWrapper').addClass("content-wrapper");
    }
    else {
      $('#ContentWrapper').removeClass("content-wrapper");
      $('#ContentWrapper').addClass("content-wrapper-expand");
    }
  }
}
