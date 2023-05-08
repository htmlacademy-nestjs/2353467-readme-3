import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export class LocalAuthGuard extends AuthGuard('local') {}
