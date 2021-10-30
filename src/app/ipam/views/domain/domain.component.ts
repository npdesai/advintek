import { Component, OnInit } from '@angular/core';
import { Domain } from '../../models/master';
import { DomainService } from '../../services/domain.service';
import { LoadingDataService } from '../../services/loading-data.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
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

  onDelete(e, domain) {
    e.preventDefault();
    this.loaderService.showLoader();
    this.domainService.deleteDomain(domain.domainId).subscribe(data => {
      if(data) {
        this.domains.splice(this.domains.indexOf(this.domains.find(d => { return d.domainId === domain.domainId })), 1);
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
