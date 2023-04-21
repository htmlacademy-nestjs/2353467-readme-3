import {IsNumber, IsString, Max, Min} from "class-validator";

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum ValidationMessage {
  EnvironmentRequired = 'Environment is required',
  PortRequired = 'Port is required',
}

export class AppValidation {
  @IsString({
    message: ValidationMessage.EnvironmentRequired
  })
  public environment: string;

  @IsNumber({}, {
    message: ValidationMessage.PortRequired
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;
}
