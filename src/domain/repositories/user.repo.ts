import type { UserEntity } from '../entities/user.entity';

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
}
