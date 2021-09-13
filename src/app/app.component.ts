import { Component } from '@angular/core';
import { AuthUser } from './common/models/authUser';

const STORE_KEY = 'NASP-Admin-LastAction';
const MINUTES_UNITL_AUTO_LOGOUT = 15 // in mins
const CHECK_INTERVAL = 15000 // in ms

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  authUser?: AuthUser;
  dialogRef: any;

  constructor() {
  }

  ngOnInit() {

    this.initListener();
    this.initInterval();

    window.onbeforeunload = function () {
      this.authService.logout();
      this.authUser = null;
    }

  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }

  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {

      if (this.authUser != null) {
        localStorage.clear();
        this.authUser = null;
      }
    }
  }

  //logout() {
  //      this.authUser = null;
  //}

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
