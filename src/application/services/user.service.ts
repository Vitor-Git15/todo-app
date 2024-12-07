import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { UserNotFoundError } from 'src/domain/erros/user_not_found.error';
import { PasswordDoesNotMatchError } from 'src/domain/erros/password_does_not_match.error';
import { UserWithSameEmailAlreadyExistsError } from 'src/domain/erros/user_with_same_email_already_exists.dto';
import { UserCreateDto } from 'src/domain/dto/user_create.dto';
import { ChangePasswordDto } from 'src/domain/dto/change_password.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async createUser(userDto: UserCreateDto): Promise<User> {
        const { email, username, password } = userDto;
        const sameEmail = await this.userRepository.findOneBy({ email });
        if (sameEmail) throw new UserWithSameEmailAlreadyExistsError();

        const user = this.userRepository.create({ username, email, password });
        return this.userRepository.save(user);
    }

    async updatePassword(changePasswordDto: ChangePasswordDto): Promise<User> {
        const { userId, newPassword } = changePasswordDto;
        const user = await this.userRepository.findOneBy({ id: userId });

        if (!user) throw new UserNotFoundError();
        user.password = newPassword;

        return this.userRepository.save(user);
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) throw new UserNotFoundError();

        await this.userRepository
    }

    async authenticate(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findOneBy({ email });

        if (!user) throw new UserNotFoundError();
        if (user.password !== password) throw new PasswordDoesNotMatchError();

        return user.id;
    }
}