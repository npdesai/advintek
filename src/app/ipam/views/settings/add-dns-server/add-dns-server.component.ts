import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-dns-server',
  templateUrl: './add-dns-server.component.html',
  styleUrls: ['./add-dns-server.component.css']
})
export class AddDnsServerComponent implements OnInit {

  @Input() openDNSWidth = 0;
  @Output() openDNSWidthChange = new EventEmitter<any>();
  @Output() closeDNSWidth = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    this.closeDNSWidth.emit(0);
  }

}
