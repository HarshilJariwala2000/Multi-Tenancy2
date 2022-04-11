import { ClientSchema } from "src/schemas/client.schema";
import {Connection} from 'mongoose'

export const TenantModelProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('Client', ClientSchema),
        inject: ['TENANT_CONNECTION'],
    },
];