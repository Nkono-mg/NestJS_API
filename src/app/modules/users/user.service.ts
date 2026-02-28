import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    /**
     * injecting userRepository
     */
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(dataForm: UserDTO) {
    const { firstName, lastName, email, password } = dataForm;

    if (!firstName || !lastName || !email || !password) {
      return new BadRequestException(`Les champs sont obligatoires`);
    }
    try {
      //check user exists with same email
      const existingUser = await this.userRepository.findOne({
        where: { email: email },
      });
      if (existingUser) {
        throw new BadRequestException('utilisateur existe déjà');
      }
      //handle exception

      //create a new user
      const user = await this.userRepository.create(dataForm);
      if (!user) {
        throw new BadRequestException('Erreur de création de compte');
      }
      await this.userRepository.save(user);
      return {
        success: true,
        user: { email: dataForm.email, firstName: dataForm.firstName },
      };
    } catch (error) {
      throw error;
    }
  }
  async getUser(id: number, page: number) {
    return console.log(`id: ${id} et query: ${page}`);
  }

  async getAllUser(limit: number, page: number) {
    return [
      {
        firsName: 'Nkono',
        email: 'nkono209@gmail.com',
      },
      {
        firsName: 'Santiana',
        email: 'santiana@gmail.com',
      },
      {
        firsName: 'Meggy',
        email: 'meggy@gmail.com',
      },
      {
        firsName: 'Camila',
        email: 'camila@gmail.com',
      },
      {
        firsName: 'Patrick',
        email: 'patrick@gmail.com',
      },
    ];
  }
  /**
   * finding a user by ID
   */
  async findUserById(id: number) {
    return [
      {
        id: 123,
        firsName: 'Patrick',
        email: 'patrick@gmail.com',
      },
    ];
  }
}
