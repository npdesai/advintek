import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Domain } from 'src/app/ipam/models/master';
import { DomainService } from 'src/app/ipam/services/domain.service';
import { LoadingDataService } from 'src/app/ipam/services/loading-data.service';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.css']
})
export class AddDomainComponent implements OnInit {
  @Input() openWidth: number = 0;
  @Input() domain: Domain;
  @Input() isEdit: boolean;
  @Output() openWidthChange = new EventEmitter<any>();
  @Output() closeWidth = new EventEmitter<any>();
  @Output() getDomainList = new EventEmitter<any>();

  @ViewChild('f') form: NgForm;

  constructor( private loaderService: LoadingDataService, private domainService: DomainService ) { }

  ngOnInit(): void {}

  onCancel() {
    this.resetFormValues();
    this.closeWidth.emit(0);
  }
  
  resetFormValues() {
    this.form.controls['userName'].setValue(this.domain.userName);
    this.form.controls['password'].setValue(this.domain.password);
    this.form.controls['domainName'].setValue(this.domain.domainName);
    this.form.controls['domainControllerName'].setValue(this.domain.domainControllerName);
  }
  
  addDomain() {
    this.loaderService.showLoader();
    this.form.resetForm();
    this.domainService.addDomain(this.domain).subscribe((data) => {
      if(data) {
        this.loaderService.hideLoader();
        this.closeWidth.emit(0);
        this.getDomainList.emit();
      }
    });
  }

  onSubmit(values) {
    if(!this.form.valid) {
      return;
    }

    Object.assign(this.domain, values);

    if(this.isEdit) {
      this.editDomain();
    } else {
      this.addDomain();
    }
  }

  editDomain() {
    this.loaderService.showLoader();
    this.domainService.updateDomain(this.domain).subscribe((data) => {
      if(data) {
        Object.assign(this.domain, data);
        this.closeWidth.emit(0);
        this.loaderService.hideLoader();
      }
    })
  }

}
