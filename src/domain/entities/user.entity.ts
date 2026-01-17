export class UserEntity {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
