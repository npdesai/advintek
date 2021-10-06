export class Subnet  {
  id: string;
  address: string;
  name: string;
  size?: number;
  usage: number;
  scanStatus: string;
  available?: number;
  used?: number;
  transient: number;
  lastScannedOn: string;
}


export class AddSubnet  {
  subnetGroupId: number;
  subnetGroup: any;
  subnetGroupName: string;
  subnetAddress: string;
  subnetMaskId: number;
  subnetMask: any;
  subnetName: string;
  subnetDescription: string;
  vlanName: string;
  location: string;  
}
