import { Body, Controller, Post, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Services } from './aplication-service';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  public async login(@Body() credential) {
    const { data } = await this.httpService.axiosRef.post(
      `${Services.Users}/login`,
      credential
    );
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${Services.Users}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }
}
