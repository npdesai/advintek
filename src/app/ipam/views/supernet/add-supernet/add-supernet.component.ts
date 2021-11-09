import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertType, Helper } from 'src/app/common/helper';
import { SubnetGroup, SubnetMask } from 'src/app/ipam/models/master';
import { MasterService } from 'src/app/ipam/services/master.service';

@Component({
  selector: 'app-add-supernet',
  templateUrl: './add-supernet.component.html',
  styleUrls: ['./add-supernet.component.css']
})
export class AddSupernetComponent implements OnInit {
  @Input() openSupernetWidth = 0;
  @Output() openSupernetWidthChange = new EventEmitter<any>();  
  @Output() closeSupernetWidth = new EventEmitter<any>();

  subnetMasks:SubnetMask[] = [];
  subnetGroups : SubnetGroup[] = [];
  isAdd: boolean = false;
  selectedIndex: number = 0;
  savebtnlabel = "Next";

  constructor(private masterService : MasterService,private helper: Helper) { }

  ngOnInit(): void {
    this.getSubnetMasks();
  }

  onCancel() {
    this.closeSupernetWidth.emit(0);
    this.isAdd = false;
    this.selectedIndex = 0;
    this.savebtnlabel = "Next";
  }

  addClick() {
    this.isAdd = !this.isAdd;
  }

  getSubnetMasks() {
    this.masterService.getSubnetMask().subscribe((data) => {
      if(data){
        this.subnetMasks = data;
      }
    });
  }

  getSubnetGroups() {
    this.masterService.getSubnetGroups().subscribe((data) => {
      if(data){
        this.subnetGroups = data;
      }
    });
  }

  nextStep() {
    if(this.savebtnlabel == "Add"){
      this.saveSupernet();
    }

    if (this.selectedIndex != 2) {
       this.selectedIndex = this.selectedIndex + 1;
    }    

    if(this.selectedIndex == 2){
      this.savebtnlabel = "Add";
    }
    else
    {
      this.savebtnlabel = "Next";
    }    
 }
 
 previousStep() {
    if (this.selectedIndex != 0) {
       this.selectedIndex = this.selectedIndex - 1;
    }
    
    this.savebtnlabel = "Next";    
 }

 saveSupernet() {
  this.helper.showMessage(Helper.getErrorMessagesText(["Incorrect Configuration"]), AlertType.Error);
}

}
