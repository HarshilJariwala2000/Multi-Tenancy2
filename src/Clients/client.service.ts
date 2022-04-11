import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Model } from 'mongoose';
import { ClientDocument } from "src/schemas/client.schema";
import { TenantConnection } from "src/Tenants/tenant.connection";

@Injectable()
export class ClientService{
    constructor(
        @Inject('USER_MODEL') private userModel: Model<ClientDocument>,
        private tenantConnection:TenantConnection
    ) {}

    
    

    async findAll() {
        return await this.userModel.find({});
    }

    // async updatemany(){
    //     const session = this.tenantConnection.Transaction();
    //     try{
    //     (await session).withTransaction(async()=>{
    //         return this.userModel.updateMany(
    //             {},
    //             {$set:{"name":"changed21"}},
    //             //{session:session}
    //         )
    //     })
    // }catch(e){
    //     console.log('Failed')
    // }finally{
    //     console.log('closing transaction')
    //     await (await session).endSession();
    // }
    // }

}