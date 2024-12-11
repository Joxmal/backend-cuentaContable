import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class FileSizeGuard implements CanActivate {
    
  constructor(private readonly maxTotalSize: number) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const files: Express.Multer.File[] = request.files;


    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > this.maxTotalSize) {
      return false;
    }
    return true;
  }
}