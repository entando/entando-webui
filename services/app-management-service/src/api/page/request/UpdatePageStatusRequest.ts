import { IUpdatePageStatusRequest } from '@entando-webui/app-engine-client/src/core/pages/requests';
import { IsString, IsIn } from 'class-validator';
 
class UpdatePageStatusRequest implements IUpdatePageStatusRequest {
  @IsString()
  @IsIn(['draft', 'published'])
  public status: string;
}
 
export default UpdatePageStatusRequest;
