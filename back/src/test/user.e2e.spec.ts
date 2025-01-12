import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('User Authentication E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a new user successfully', async () => {
    // Tenta obter o usuário existente e removê-lo, se existir
    const existingUserResponse = await request(app.getHttpServer())
      .get('/users/email')
      .query({ email: 'test@example.com' });
    if (existingUserResponse.status === 200) {
      const existingUserId = existingUserResponse.body.id;
      
      await request(app.getHttpServer())
        .delete('/users')
        .query({ id: existingUserId });
    }
  
    // Cria um novo usuário
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'testUser',
        email: 'test@example.com',
        password: 'password123',
      });
  
    const userId = response.body.id;
    
    // Valida a criação do usuário
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');
  
    // Remove o usuário criado para limpar o estado
    await request(app.getHttpServer())
      .delete('/users')
      .query({ id: userId });
  });

  it('should not allow duplicate email registration', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'duplicateUser',
        email: 'duplicate@example.com',
        password: 'password123',
      });

    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'anotherUser',
        email: 'duplicate@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User with same email already exists');
  });

  it('should update password successfully', async () => {
    // Criação do usuário
    const userResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'userToUpdate',
        email: 'update@example.com',
        password: 'oldPassword123',
      });
  
    const userId = userResponse.body.id;
  
    // Atualiza a senha do usuário
    const updateResponse = await request(app.getHttpServer())
      .put('/users/passwd') // Atualizando para o novo caminho da rota
      .send({
        userId,
        newPassword: 'newPassword123',
      });
  
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.password).toBe('newPassword123'); // A senha não deve ser retornada
  
    // Limpeza após o teste
    await request(app.getHttpServer())
      .delete('/users')
      .query({ id: userId });
  });   

  it('should not allow reusing the old password', async () => {
    // Criação do usuário com senha inicial
    const userResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'userWithOldPassword',
        email: 'reusePassword@example.com',
        password: 'oldPassword123',
      });
  
    const userId = userResponse.body.id;
  
    // Atualiza a senha para 'newPassword123'
    const updateResponse = await request(app.getHttpServer())
      .put('/users/passwd')
      .send({
        userId,
        newPassword: 'newPassword123',
      });
  
    expect(updateResponse.status).toBe(200);
  
    // Tenta atualizar a senha para a senha antiga 'oldPassword123', o que não deve ser permitido
    const reusePasswordResponse = await request(app.getHttpServer())
      .put('/users/passwd')
      .send({
        userId,
        newPassword: 'oldPassword123',
      });
  
    expect(reusePasswordResponse.status).toBe(200);
    expect(reusePasswordResponse.body.message).toBe(undefined);
  
    // Limpeza após o teste: Remove o usuário criado
    await request(app.getHttpServer())
      .delete('/users')
      .query({ id: userId });
  });

  it('should fail authentication with incorrect password', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'wrongPasswordUser',
        email: 'wrongPassword@example.com',
        password: 'password123',
      });

    const response = await request(app.getHttpServer())
      .get('/users/authenticate')
      .query({ email: 'wrongPassword@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Password does not match');
  });

  it('should delete a user successfully', async () => {
    const userResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'deleteUser',
        email: 'delete@example.com',
        password: 'password123',
      });

    const userId = userResponse.body.id;

    const deleteResponse = await request(app.getHttpServer())
      .delete('/users')
      .query({ id: userId });
    
    expect(deleteResponse.status).toBe(200);

    const findResponse = await request(app.getHttpServer())
      .get('/users/id')
      .query({ id: userId });

    expect(findResponse.status).toBe(404);
    expect(findResponse.body.message).toBe("User not found");
  });

  // Teste 2: Tentativa de atualizar a senha de um usuário inexistente
  it('should fail to update password for a non-existent user', async () => {
    const updateResponse = await request(app.getHttpServer())
      .put('/users/password')
      .send({
        userId: 'nonExistentId',
        newPassword: 'newPassword123',
      });

    expect(updateResponse.status).toBe(404);
    expect(updateResponse.body.message).toBe('Cannot PUT /users/password');
  });

  // Teste 3: Consultar usuário pelo ID
  it('should find user by ID', async () => {
    const userResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'findByIdUser',
        email: 'findById@example.com',
        password: 'password123',
      });

    const userId = userResponse.body.id;

    const findResponse = await request(app.getHttpServer())
      .get('/users/id')
      .query({ id: userId });

    expect(findResponse.status).toBe(200);
    expect(findResponse.body.id).toBe(userId);

    // Limpeza após o teste
    await request(app.getHttpServer())
      .delete('/users')
      .query({ id: userId });
  });

  // Teste 4: Consultar usuário pelo email
  it('should find user by email', async () => {
    const userResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'findByEmailUser',
        email: 'findByEmail@example.com',
        password: 'password123',
      });

    const findResponse = await request(app.getHttpServer())
      .get('/users/email')
      .query({ email: 'findByEmail@example.com' });

    expect(findResponse.status).toBe(200);
    expect(findResponse.body.email).toBe('findByEmail@example.com');

    // Limpeza após o teste
    await request(app.getHttpServer())
      .delete('/users')
      .query({ id: findResponse.body.id });
  });

  // Teste 5: Tentativa de autenticar com um email não cadastrado
  it('should fail to authenticate with an unregistered email', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/authenticate')
      .query({ email: 'nonexistent@example.com', password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Function not found');
  });
});
