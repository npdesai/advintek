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

export class SubnetGroupDetail {
  subnetId: string;
  subnetGroupId: string;
  subnetGroupName: string;
  subnetAddress: string;
  subnetMaskId: string;
  subnetMask:string;
  subnetName: string;
  subnetSize: number;
  subnetUsage: number;
  scanStatus: string;
  available: number;
  notReachable:number;
  used: number;
  transient: number;
  lastScanTime: string;
  vlanName: string;
  location: string;
  description: string;
}


export class AddIpv4Subnet  {
  subnetGroupId?: string;
  subnetGroup: any;
  subnetGroupName: string;
  subnetAddress: string;
  subnetMaskId: string;
  subnetMask: any;
  subnetName: string;
  subnetDescription: string;
  vlanName: string;
  vlanId: string;
  location: string;
  accessMode: string;
  alert:number;
  warning:number;
  critical:number;
  email:string;
}

export class AddIpv6Subnet {
  prefixName: string;
  prefixAddress: string;
  subnetPrefixLength: any;
  prefixLength: number;
  prefixDescription: string;
  subnetCompany: any;
  companyId: string;
  companyName: string
}
