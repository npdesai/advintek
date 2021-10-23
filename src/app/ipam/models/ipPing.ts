export class  IpPing  {
    address: string;
    macAddress: string;
    options:PingOptions;
    roundtripTime: number;
    status: string;   
}

export class PingOptions  {
    ttl: number;
    dontFragment: any; 
}