import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from 'src/api/controllers/user.controller';
import { UserService } from 'src/application/services/user.service';
import { User } from 'src/domain/entities/user.entity';
import { UserReturnDto, UserCreateDto } from 'src/domain/dto/user.dto';
import { ChangePasswordDto } from 'src/domain/dto/change_password.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    authenticate: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    updatePassword: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getAuthToken', () => {
    it('should return an auth token when valid credentials are provided', async () => {
      const email = 'user@example.com';
      const password = 'password';
      const token = 'valid-token';

      mockUserService.authenticate.mockResolvedValue(token);

      // Corrigindo a chamada para passar os parâmetros diretamente
      const result = await userController.getAuthToken(email, password);

      expect(result).toBe(token);
      expect(mockUserService.authenticate).toHaveBeenCalledWith(email, password);
    });
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        new UserReturnDto(new User()),
        new UserReturnDto(new User()),
      ];

      mockUserService.findAll.mockResolvedValue(mockUsers);

      const result = await userController.getUsers();

      expect(result).toEqual(mockUsers);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a new user and return the user entity', async () => {
      const userCreateDto: UserCreateDto = {
        email: 'user@example.com',
        password: 'password',
        username: 'newuser', // Adicionando o campo 'username'
      };
      const mockUser = new User();
      mockUser.email = 'user@example.com';
      mockUser.password = 'hashedpassword';
      mockUser.username = 'newuser';

      mockUserService.create.mockResolvedValue(mockUser);

      const result = await userController.createUser(userCreateDto);

      expect(result).toEqual(mockUser);
      expect(mockUserService.create).toHaveBeenCalledWith(userCreateDto);
    });
  });

  describe('updatePassword', () => {
    it('should update the user password', async () => {
      const changePasswordDto: ChangePasswordDto = { userId: 'user-id', newPassword: 'new-password' };
      const mockUser = new User();
      mockUser.id = 'user-id';
      mockUser.password = 'hashed-new-password';

      mockUserService.updatePassword.mockResolvedValue(mockUser);

      const result = await userController.updatePassword(changePasswordDto);

      expect(result).toEqual(mockUser);
      expect(mockUserService.updatePassword).toHaveBeenCalledWith(changePasswordDto);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 'user-id';

      mockUserService.delete.mockResolvedValue(undefined);

      // Corrigindo a chamada para passar diretamente o 'userId' como string
      await userController.deleteUser(userId);

      expect(mockUserService.delete).toHaveBeenCalledWith(userId);
    });
  });
});
