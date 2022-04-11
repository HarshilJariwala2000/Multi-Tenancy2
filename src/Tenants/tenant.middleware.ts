import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class TenantAwareMiddleware implements NestMiddleware {
    async use(req: Request, res: Response/*, next: NextFunction*/) {
        // Extract from the request object
        const { headers } = req;

        // Get the tenant id from header
        const tenantId = headers['X-TENANT-ID'] || headers['x-tenant-id'];

        if (!tenantId) {
            throw new HttpException('`X-TENANT-ID` not provided', HttpStatus.NOT_FOUND);
        }

        // Set the tenant id in the header
        req['tenantId'] = tenantId.toString();

        //next();
    }
}