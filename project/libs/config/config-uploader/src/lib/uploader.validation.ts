import {IsNumber, IsString, Max, Min} from "class-validator";

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum ValidationMessage {
  ServerRootRequired = 'Server Root is required',
  EnvironmentRequired = 'Environment is required',
  PortRequired = 'Port is required',
  UploadDirRequired = 'Port is required',
}

export class UploaderValidation {
  @IsString({ message: ValidationMessage.ServerRootRequired  })
  public serveRoot: string;

  @IsString({ message: ValidationMessage.EnvironmentRequired })
  public environment: string;

  @IsNumber({}, { message: ValidationMessage.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsString({ message: ValidationMessage.UploadDirRequired })
  public uploadDirectory: string;
}
