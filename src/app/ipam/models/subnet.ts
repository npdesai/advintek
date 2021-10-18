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
  subnetGroupId?: string;
  subnetGroup: any;
  subnetGroupName: string;
  subnetAddress: string;
  subnetMaskId: string;
  subnetMask: any;
  subnetName: string;
  subnetDescription: string;
  vlanName: string;
  location: string;
}
