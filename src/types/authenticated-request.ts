import { User } from 'src/entities/user.entity';

export type AuthenticatedRequest<T> = {
  user: User;
} & T &
  Request;
