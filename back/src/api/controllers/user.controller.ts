import { Controller, Get, Post, Body, Put, Query, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { ChangePasswordDto } from 'src/domain/dto/change_password.dto';
import { UserReturnDto, UserCreateDto } from 'src/domain/dto/user.dto';
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
    async getUsers(): Promise<UserReturnDto[]> {
        return (await this.userService.findAll()).map(user => new UserReturnDto(user));
    }

    @Post()
    async createUser(@Body() userDto: UserCreateDto): Promise<User> {
        return this.userService.create(userDto);
    }

    @Put("passwd")
    async updatePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<User> {
        return this.userService.updatePassword(changePasswordDto);
    }

    @Delete()
    async deleteUser(@Query('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }

    @Get('email')
    async getUserByEmail(@Query('email') email: string): Promise<UserReturnDto> {
        const user = await this.userService.findByEmail(email);
        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
        return new UserReturnDto(user);
    }

    @Get('id')
    async getUserById(@Query('id') id: string): Promise<UserReturnDto> {
        const user = await this.userService.findById(id);
        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
        return new UserReturnDto(user);
    }
}