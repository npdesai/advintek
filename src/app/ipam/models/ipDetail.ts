export class IpDetail  {
    ipAddress: string;
    macAddress: string;
    status: string;
    deviceType: string;
    connectedSwitch: string;
    leaseExpiryDate?: Date;
    lastScan?: Date;
    subnetIPId?: string;
    reservedStatus?: string;
    aliasName?: string;
    assetTag?: string;
    systemLocation?: string;
    statusMaster: any;
    reservedStatusMaster: any;
}