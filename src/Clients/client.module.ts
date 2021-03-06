import { Module, NestModule } from "@nestjs/common";
import { TenantConnection } from "src/Tenants/tenant.connection";
import { TenantsModule } from "src/Tenants/tenants.module";
import { TenantService } from "src/Tenants/tenants.service";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";

@Module({
    imports: [
      TenantsModule
    ],
    providers: [
      TenantConnection
    ],
    controllers: [ClientController],
  })

  export class ClientModule {}
  }
