import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { PasswordDoesNotMatchError } from 'src/domain/erros/password_does_not_match.error';
import { UserWithSameEmailAlreadyExistsError } from 'src/domain/erros/user_with_same_email_already_exists.dto';
import { UserCreateDto } from 'src/domain/dto/user.dto';
import { ChangePasswordDto } from 'src/domain/dto/change_password.dto';
import { EntityNotFoundError } from 'src/domain/erros/entity_not_found.error';
import { ReusedPasswordError } from 'src/domain/erros/reused_password.error';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(userDto: UserCreateDto): Promise<User> {
        const { email, username, password } = userDto;
        const sameEmail = await this.userRepository.findOneBy({ email });
        if (sameEmail) throw new UserWithSameEmailAlreadyExistsError();

        const user = this.userRepository.create({ username, email, password });
        return this.userRepository.save(user);
    }

    async updatePassword(changePasswordDto: ChangePasswordDto): Promise<User> {
        const { userId, newPassword } = changePasswordDto;
        const user = await this.userRepository.findOneBy({ id: userId });

        if (!user) throw new EntityNotFoundError(User.constructor.name);
        if (user.password === newPassword) throw new ReusedPasswordError();

        user.password = newPassword;

        return this.userRepository.save(user);
    }

    async delete(id: string): Promise<void> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) throw new EntityNotFoundError(User.constructor.name);

        await this.userRepository.remove(user);
    }

    async authenticate(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findOneBy({ email });

        if (!user) throw new EntityNotFoundError(User.constructor.name);
        if (user.password !== password) throw new PasswordDoesNotMatchError();

        return user.id;
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({ email });
    }

    async findById(id: string): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }
}