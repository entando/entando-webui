import { ICreatePageRequest } from '@entando-webui/app-engine-client/src/core/pages/requests';
import { IsString, IsBoolean, IsDefined } from 'class-validator';
 
class CreatePageRequest implements ICreatePageRequest {
  @IsString()
  public code: string;

  @IsDefined()
  public titles: Map<string, string>;

  @IsString()
  public parentCode: string;

  @IsString()
  public ownerGroup: string;

  @IsString()
  public pageModel: string;

  @IsBoolean()
  public seo: boolean;
 
  @IsBoolean()
  public displayedInMenu: boolean;
 
  @IsString()
  public charset: string;

  @IsString()
  public contentType: string;
}
 
export default CreatePageRequest;
