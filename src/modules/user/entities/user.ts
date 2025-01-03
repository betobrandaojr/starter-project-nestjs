export interface UserProps {
  id?: number;
  customerId: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class User {
  constructor(private readonly userProps: UserProps) {
    this.validateUsername(userProps.username);
    this.validateEmail(userProps.email);
    // this.validatePassword(userProps.password);
  }

  public static create(
    customerId: number,
    username: string,
    email: string,
    password: string,
  ) {
    return new User({
      customerId,
      username,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }

  public update(
    customerId?: number,
    username?: string,
    email?: string,
    password?: string,
  ) {
    if (customerId !== undefined) {
      this.userProps.customerId = customerId;
    }
    if (username !== undefined) {
      this.userProps.username = username;
    }
    if (email !== undefined) {
      this.userProps.email = email;
    }
    if (password !== undefined) {
      this.userProps.password = password;
    }
    this.userProps.updatedAt = new Date();
  }

  get id(): number {
    return this.userProps.id;
  }

  get customerId(): number {
    return this.userProps.customerId;
  }

  get username(): string {
    return this.userProps.username;
  }

  get email(): string {
    return this.userProps.email;
  }

  get password(): string {
    return this.userProps.password;
  }

  get createdAt(): Date {
    return this.userProps.createdAt;
  }

  get updatedAt(): Date {
    return this.userProps.updatedAt;
  }

  get deletedAt(): Date | null {
    return this.userProps.deletedAt;
  }

  private validateUsername(username: string) {
    if (username.length < 5 || username.length > 20) {
      throw new Error('Username is invalid');
    }
  }

  private validateEmail(email: string) {
    if (!email.includes('@')) {
      throw new Error('Email is invalid');
    }
  }

  // private validatePassword(password: string) {
  //   if (password.length < 8 || password.length > 20) {
  //     throw new Error('Password is invalid');
  //   }
  // }
}
