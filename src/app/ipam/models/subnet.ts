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
