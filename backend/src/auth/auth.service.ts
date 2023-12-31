import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CredentialsDto } from 'src/users/dto/credentials.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  //JwtServiceとUsersServiceをインポートして、コンストラクターでインジェクションします。
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    if (await this.userService.findOne(createUserDto.email)) {
      throw new UnauthorizedException(
        'このメールアドレスは既に登録されています',
      );
    }
    const user = await this.userService.create(createUserDto);
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      id: user.id,
      email: user.email,
      image: user.profileImageUrl,
      name: user.username,
      accessToken: accessToken,
      university: user.university,
    };
  }

  async login(credentialsDto: CredentialsDto) {
    const { email, password } = credentialsDto;
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません');
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return {
        id: user.id,
        email: user.email,
        image: user.profileImageUrl,
        name: user.username,
        accessToken: accessToken,
      };
    }
    throw new UnauthorizedException(
      'ユーザー名またはパスワードを確認してください',
    );
  }
}
