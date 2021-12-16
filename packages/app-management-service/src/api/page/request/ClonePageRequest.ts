import { IClonePageRequest } from '@entando-webui/app-engine-client/src/core/pages/requests';
import { IsString, IsDefined } from 'class-validator';
 
class ClonePageRequest implements IClonePageRequest {
  @IsString()
  public newPageCode: string;

  @IsString()
  public parentCode: string;

  @IsDefined()
  public titles: Map<string, string>;
}
 
export default ClonePageRequest;
