import { Controller, Get, Post } from '@nestjs/common';
import { TenantConnection } from 'src/Tenants/tenant.connection';
import { ClientService } from './client.service';
//import { AppService } from './app.service';

@Controller()
export class ClientController{
    constructor(private readonly clientService: TenantConnection) {}

    @Get('find')
    getHello() {
    return this.clientService.findAll();
    }

    @Post('update')
    updatemany(){
        return this.clientService.updatemany();
    }

    @Post('insert')
    insertmany(){
        return this.clientService.insertmany();
    }
}