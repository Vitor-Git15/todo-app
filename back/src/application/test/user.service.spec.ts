import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { EntityNotFoundError } from 'src/domain/erros/entity_not_found.error';
import { PasswordDoesNotMatchError } from 'src/domain/erros/password_does_not_match.error';
import { UserWithSameEmailAlreadyExistsError } from 'src/domain/erros/user_with_same_email_already_exists.dto';
import { UserCreateDto } from 'src/domain/dto/user.dto';
import { ChangePasswordDto } from 'src/domain/dto/change_password.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepositoryMock: any;

  beforeEach(async () => {
    userRepositoryMock = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: '1', username: 'user1', email: 'user1@example.com' }];
      userRepositoryMock.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('create', () => {

    it('should throw an error if email already exists', async () => {
      const userDto: UserCreateDto = {
        email: 'existinguser@example.com',
        username: 'existinguser',
        password: 'password123',
      };
      const existingUser = { id: '1', email: 'existinguser@example.com' };
      userRepositoryMock.findOneBy.mockResolvedValue(existingUser); // Simula que o email já existe

      await expect(service.create(userDto)).rejects.toThrow(UserWithSameEmailAlreadyExistsError);
    });
  });

  describe('updatePassword', () => {
    it('should update the user password', async () => {
      const changePasswordDto: ChangePasswordDto = {
        userId: '1',
        newPassword: 'newpassword123',
      };
      const user = { id: '1', username: 'user1', email: 'user1@example.com', password: 'oldpassword123' };
      userRepositoryMock.findOneBy.mockResolvedValue(user); // Simula que o usuário existe
      userRepositoryMock.save.mockResolvedValue({ ...user, password: changePasswordDto.newPassword });

      const result = await service.updatePassword(changePasswordDto);
      expect(result.password).toEqual(changePasswordDto.newPassword);
      expect(userRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({ password: changePasswordDto.newPassword }));
    });

    it('should throw an error if user not found', async () => {
      const changePasswordDto: ChangePasswordDto = {
        userId: '1',
        newPassword: 'newpassword123',
      };
      userRepositoryMock.findOneBy.mockResolvedValue(null); // Simula que o usuário não foi encontrado

      await expect(service.updatePassword(changePasswordDto)).rejects.toThrow(EntityNotFoundError);
    });
  });

  describe('authenticate', () => {
    it('should return user id if email and password match', async () => {
      const email = 'user1@example.com';
      const password = 'password123';
      const user = { id: '1', email, password };
      userRepositoryMock.findOneBy.mockResolvedValue(user);

      const result = await service.authenticate(email, password);
      expect(result).toEqual(user.id);
    });

    it('should throw an error if email does not exist', async () => {
      const email = 'user1@example.com';
      const password = 'password123';
      userRepositoryMock.findOneBy.mockResolvedValue(null);

      await expect(service.authenticate(email, password)).rejects.toThrow(EntityNotFoundError);
    });

    it('should throw an error if password does not match', async () => {
      const email = 'user1@example.com';
      const password = 'wrongpassword';
      const user = { id: '1', email, password: 'password123' };
      userRepositoryMock.findOneBy.mockResolvedValue(user);

      await expect(service.authenticate(email, password)).rejects.toThrow(PasswordDoesNotMatchError);
    });
  });
});
