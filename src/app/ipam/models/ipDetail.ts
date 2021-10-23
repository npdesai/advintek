export class IpDetail  {
    ipAddress: string;
    macAddress: string;
    // ipDNS?: string;
    // dnsIp?: string;
    dnsStatus: string;
    status: string;
    deviceType: string;
    connectedSwitch: string;
    // connectedPort: number;
    dnsName?: string;    
    leaseExpiryDate?: Date;
    lastScan?: Date;
    subnetIPId?: string;
}