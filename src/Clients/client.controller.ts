import { Controller, Get, Post } from '@nestjs/common';
import { TenantConnection } from 'src/Tenants/tenant.connection';
import { ClientService } from './client.service';

@Controller()
export class ClientController{
    constructor(private readonly tenantConnection: TenantConnection) {}

    @Get('find')
    getHello() {
    return this.tenantConnection.findAll();
    }

    @Post('update')
    updatemany(){
        return this.tenantConnection.updatemany();
    }

    @Post('insert')
    insertmany(){
        return this.tenantConnection.insertmany();
    }
}
