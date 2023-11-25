import { User } from 'src/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
export function notFoundUser(user: User) {
  if (user!) {
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
export function notRowsAffected(result: number) {
  if (result == 0) {
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
