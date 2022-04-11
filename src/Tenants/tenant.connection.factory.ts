import { Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import mongoose from "mongoose";
import { ClientSchema } from "src/schemas/client.schema";
import { TenantConnection } from "./tenant.connection";

export const TenantConnectionFactory = [
    // {
    //     provide: 'TENANT_CONTEXT',
    //     scope: Scope.REQUEST,
    //     inject: [REQUEST],
    //     useFactory: (req: Request) => {
    //         const  tenantId  = req.headers['X-TENANT-ID'];
    //         return tenantId;
    //     },
    // },
    {   
        provide: 'TENANT_CONNECTION',
        scope: Scope.REQUEST,
        inject: [REQUEST, TenantConnection],
        useFactory: async (req: Request, connection: TenantConnection): Promise<any>  => {

            // Set tenant context
            //connection.tenantId = req.headers['tenantid'];

            // Return the connection
            return await connection.getConnection();
        },
    },
];