export class DHCPScope {
  id: string;
  address: string;
  name: string;
  totalIPs: number;
  leasedIPs: number;
  reservedIPs: number;
  addressRange: number;
  state: string;
  comments: string;
  range: string;
  excludedRange: string[];
  relatedScops: string;
  tooltip: string;
}