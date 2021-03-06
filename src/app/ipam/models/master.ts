export class SubnetGroup  {
    groupId: number;
    groupName: string;
    groupAddress: string;
  }


export class SubnetMask  {
    maskId: string;
    class: string;
    addresses: number;
    cidr: string;
    hosts: number;
    netMask : string;
    displaySubnetMask: string;
  }

export class ServerType {
  serverTypeId: string;
  name: string
}

export class Domain {
  domainId: string;
  userName: string;
  password: string;
  domainName: string;
  domainControllerName: string;
}
