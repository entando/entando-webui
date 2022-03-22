import { IsOptional, IsString } from 'class-validator';
 
class DeployAppRequest {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public email: string;

  @IsOptional()
  @IsString()
  public tag: string;
}
 
export default DeployAppRequest;
