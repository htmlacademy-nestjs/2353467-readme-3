import {IsNumber, IsString, Max, Min} from 'class-validator';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum ValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
}

export class DbValidation {
  @IsString({
    message: ValidationMessage.DBNameRequired
  })
  public name: string;

  @IsString({
    message: ValidationMessage.DBHostRequired
  })
  public host: string;

  @IsNumber({}, {
    message: ValidationMessage.DBPortRequired
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsString({
    message: ValidationMessage.DBUserRequired
  })
  public user: string;

  @IsString({
    message: ValidationMessage.DBPasswordRequired
  })
  public password: string;

  @IsString({
    message: ValidationMessage.DBBaseAuthRequired
  })
  public authBase: string;
}
