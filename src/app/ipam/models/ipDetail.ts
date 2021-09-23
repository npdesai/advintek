export class IpDetail  {
    id: string;
    ipAddress: string;
    macAddress: string;
    ipDNS: string;
    dnsIp: string;
    dnsStatus: string;
    status: string;
    deviceType: string;
    connectedSwitch: string;
    connectedPort: number;
    dnsName: string;    
    leaseExpiryDate: Date;
    isSelected: boolean;
}