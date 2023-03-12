import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BaseModel } from '../model/base.model';
import { BaseService } from '../service/base.service';

@ApiBearerAuth('accessToken-auth')
export class BaseController<T extends BaseModel> {
  constructor(private readonly service: BaseService<T>) {}

  // @UseGuards(AuthGuard('accessToken'))
  @Get()
  getAll(): Promise<T[]> {
    return this.service.getAll();
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get(':id')
  get(@Param('id') id: string): Promise<T> {
    return this.service.get(id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @ApiBody({ required: true })
  @Post()
  create(@Body() entity: T): Promise<T> {
    return this.service.create(entity);
  }

  @UseGuards(AuthGuard('accessToken'))
  @ApiBody({ required: true })
  @Put(':id')
  update(@Body() entity: T, @Param('id') id: string): Promise<T> {
    return this.service.update(id, entity);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Delete(':id')
  delete(@Param('id') id: string): Promise<T> {
    return this.service.delete(id);
  }
}
