import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Domain } from '../../models/master';
import { DomainService } from '../../services/domain.service';
import { LoadingDataService } from '../../services/loading-data.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
  @ViewChild ('closeDeleteDomainModal') closeDeleteDomainModal: ElementRef;

  statusMessage: string = "";
  domains: Domain[] = [];
  isEditDomain: boolean = false;

  selectedDomain = new Domain();
  width = 100;

  constructor( private domainService: DomainService, private loaderService: LoadingDataService ) { 
    this.getDomainList();
  }
  
  ngOnInit(): void {
  }

  onAddDomainClick() {
    this.width = 100;
    this.isEditDomain = false;
    this.selectedDomain = new Domain();
  }

  getDomainList() {
    if(this.domains.length > 0) {
      this.statusMessage = "Loading Data...";
    } else {
      this.statusMessage = "No Data Found!";
    }
    this.loaderService.showLoader();
    this.domainService.getDomainList().subscribe((data) => {
      if(data) {
        this.domains = data;
        this.loaderService.hideLoader();
      }
    });
  }

  closeAddDomain(width) {
    this.width = width;
  }

  onDelete(domain) {
    this.selectedDomain = domain;
  }

  onConfirm(e) {
    this.closeDeleteDomainModal.nativeElement.click();
    this.loaderService.showLoader();
    this.domainService.deleteDomain(this.selectedDomain.domainId).subscribe(data => {
      if(data) {
        this.domains.splice(this.domains.indexOf(this.domains.find(d => { return d.domainId === this.selectedDomain.domainId })), 1);
        this.loaderService.hideLoader();
      }
    });
  }

  editDomainHandler(domain) {
    this.width = 100;
    this.isEditDomain = true;
    this.selectedDomain = domain;
  }

}
