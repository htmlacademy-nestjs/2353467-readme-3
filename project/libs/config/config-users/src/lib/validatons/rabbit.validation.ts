import { IsNumber, IsString, Max, Min } from 'class-validator';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum ValidationMessage {
  RabbitHostRequired = 'Rabbit host is required',
  RabbitPortRequired = 'Rabbit port is required',
  RabbitUserRequired = 'Rabbit user is required',
  RabbitPasswordRequired = 'Rabbit password is required',
  RabbitQueuedRequired = 'Rabbit queue is required',
  RabbitExchangeRequired = 'Rabbit exchange is required',
}

export class RabbitValidation {
  @IsString({ message: ValidationMessage.RabbitHostRequired })
  public host: string;

  @IsNumber({}, {
    message: ValidationMessage.RabbitPortRequired
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsString({ message: ValidationMessage.RabbitUserRequired })
  public user: string;

  @IsString({ message: ValidationMessage.RabbitPasswordRequired })
  public password: string;

  @IsString({ message: ValidationMessage.RabbitQueuedRequired })
  public queue: string;

  @IsString({ message: ValidationMessage.RabbitExchangeRequired })
  public exchange: string;

}
