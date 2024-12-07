import { Controller, Get, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { ChangePasswordDto } from 'src/domain/dto/change_password.dto';
import { UserDto } from 'src/domain/dto/user.dto';
import { UserCreateDto } from 'src/domain/dto/user_create.dto';
import { User } from 'src/domain/entities/user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('authenticate')
    async getAuthToken(
        @Query('email') email: string,
        @Query('password') password: string
    ): Promise<string> {
        return this.userService.authenticate(email, password);
    }

    @Get('all')
    async getUsers(): Promise<UserDto[]> {
        return (await this.userService.findAll()).map(user => new UserDto(user));
    }

    @Post()
    async createUser(@Body() userDto: UserCreateDto): Promise<User> {
        return this.userService.createUser(userDto);
    }

    @Put("passwd")
    async updatePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<User> {
        return this.userService.updatePassword(changePasswordDto);
    }

    @Delete()
    async deleteUser(@Query('id') id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}