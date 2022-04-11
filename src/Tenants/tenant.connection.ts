import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import {Connection,Model} from "mongoose";
import mongoose from "mongoose";
import { TenantService } from "./tenants.service";
import { TenantDocument } from "src/schemas/tenants.schema";
import { ClientDocument, ClientSchema } from "src/schemas/client.schema";
import { InjectConnection } from "@nestjs/mongoose";
import { REQUEST } from "@nestjs/core";
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TenantConnection {
    private _tenantId: string | string[];

    constructor(
        private tenantService: TenantService,
        @Inject(REQUEST) private request: Request
    ) {}
    
    async getConnection(): Promise<Connection> {
        //Get TenantID from Header
        this._tenantId = this.request.headers['tenantid'];

        // Get the tenant details from the database
        const tenant = await this.tenantService.findByName(this._tenantId);
        console.log(tenant);

        // Validation check if tenant exist
        if (!tenant) {
            throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
        }

        //Get the underlying mongoose connections
        const connections: Connection[] = mongoose.connections;

        // Find existing connection
        const foundConn = connections.find((con: Connection) => {
            return con.name === `${tenant.alias}`;
        });

        // Check if connection exist and is ready to execute
        if (foundConn && foundConn.readyState === 1) {
            console.log('found connection'); 
            return foundConn;
        }

        // Create a new connection
        console.log('new connection');
        return await this.createConnection(tenant);
    }

    private async createConnection(tenant: TenantDocument): Promise<Connection> {
        // Create or Return a mongo connection
        const db = mongoose.createConnection(`mongodb://${tenant.host}:${tenant.port}/${tenant.alias}`);
        console.log('created connection');
        return db;

    }

    private async modelProvider(){
        const db = await this.getConnection();
        const session = await db.startSession();

        return {
            "database": db.model('Client', ClientSchema),
            "session":session
        }
        
    }

    async findAll() {
        const model1 = (await this.modelProvider()).database;
        return model1.find({});        
    }

    async updatemany(){
        const model1 = (await this.modelProvider()).database;
        const session = (await this.modelProvider()).session;

        try{
        session.withTransaction(async()=>{
            return model1.updateMany(
                {},
                {$set:{"name":"changed23"}},
            )
        })
    }catch(e){
        console.log('Failed')
    }finally{
        console.log('closing transaction')
        await session.endSession();
    }
    }

    async insertmany(){
        const model1 =  (await this.modelProvider()).database;
        const session =  (await this.modelProvider()).session;

        try{
        session.withTransaction(async()=>{
            return model1.insertMany([
                {"name":"123"},
                {"name":"dfg"}
            ]                
            )
        })
    }catch(e){
        console.log('Failed')
    }finally{
        console.log('closing transaction')
        await session.endSession();
    }
    }


    // transactions initiation with error handling //
}

//mongodb://localhost:27017/MasterDB/