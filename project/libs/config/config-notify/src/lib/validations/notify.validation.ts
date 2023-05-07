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
  PasswordRequired = 'Password Rabbit is required',
  QueueRequired = 'Queue Rabbit is required',
  ExchangeRequired = 'Exchange Rabbit is required',
}

export enum ValidationMessageMail {
  HostRequired = 'Host Mail is required',
  PortRequired = 'Port Mail is required',
  UserRequired = 'User Mail is required',
  PasswordRequired = 'Password Mail is required',
  FromRequired = 'From Mail is required',
}

class DBValidation {
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

class RabbitValidation {
  @IsString({ message: ValidationMessageRabbit.HostRequired })
  public host: string;

  @IsNumber({}, { message: ValidationMessageRabbit.PortRequired })
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

class MailValidation {
  @IsString({ message: ValidationMessageMail.HostRequired })
  public host: string;

  @IsNumber({}, { message: ValidationMessageMail.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsString({ message: ValidationMessageMail.UserRequired })
  public user: string;

  @IsString({ message: ValidationMessageMail.PasswordRequired })
  public password: string;

  @IsString({ message: ValidationMessageMail.FromRequired })
  public from: string;
}

export class NotifyValidation {

  @IsString({ message: ValidationMessage.EnvironmentRequired })
  public environment: string;

  @IsNumber({}, { message: ValidationMessage.PortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @ValidateNested()
  public db: DBValidation;

  @ValidateNested()
  public mail: MailValidation;

  @ValidateNested()
  public rabbit: RabbitValidation;


}
