import { IsNumber, IsString, Max, Min, ValidateNested } from "class-validator";

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum ValidationMessage {
  EnvironmentRequired = 'Environment is required',
  PortRequired = 'Port is required',
}

export enum ValidationMessageDB {
  HostRequired = 'Host DB is required',
  PortRequired = 'Port DB is required',
  UserRequired = 'User DB is required',
  NameRequired = 'Name DB is required',
  PasswordRequired = 'Password DB is required',
  AuthRequired = 'Auth DB is required',
}

export enum ValidationMessageRabbit {
  HostRequired = 'Host Rabbit is required',
  PortRequired = 'Port Rabbit is required',
  UserRequired = 'User Rabbit is required',
  PasswordRequired = 'Password DB is required',
  QueueRequired = 'Queue DB is required',
  ExchangeRequired = 'Exchange DB is required',
}

export class DB {
  @IsString({ message: ValidationMessageDB.HostRequired })
  public host: string;

  @IsNumber({}, { message: ValidationMessageDB.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsString({ message: ValidationMessageDB.UserRequired })
  public user: string;

  @IsString({ message: ValidationMessageDB.NameRequired })
  public name: string;

  @IsString({ message: ValidationMessageDB.PasswordRequired })
  public password: string;

  @IsString({ message: ValidationMessageDB.AuthRequired })
  public authBase: string;
}

export class Rabbit {
  @IsString({ message: ValidationMessageRabbit.HostRequired })
  public host: string;

  @IsString({ message: ValidationMessageRabbit.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsString({ message: ValidationMessageRabbit.UserRequired })
  public user: string;

  @IsString({ message: ValidationMessageRabbit.PasswordRequired })
  public password: string;

  @IsString({ message: ValidationMessageRabbit.QueueRequired })
  public queue: string;

  @IsString({ message: ValidationMessageRabbit.ExchangeRequired })
  public exchange: string;
}

export class NotifyValidation {

  @IsString({ message: ValidationMessage.EnvironmentRequired })
  public environment: string;

  @IsNumber({}, { message: ValidationMessage.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @ValidateNested()
  public db: DB;

  @ValidateNested()
  public rabit: Rabbit;
}
