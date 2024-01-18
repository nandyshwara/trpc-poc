import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../routers/user';
import { prisma } from '../dbclient';

interface AuthMiddlewareOptions {
  req: any;
  res: any;
}

export const isAuthed = async (opts: AuthMiddlewareOptions)=> {
  const { req, res } = opts;

  const notAuthenticated = {
    req,
    res,
    user: null,
  };

  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return notAuthenticated;
  }

  const decoded = Jwt.verify(token, JWT_SECRET) as { userId: string } | null;
  if (!decoded) {
    return notAuthenticated;
  }

  const id = decoded.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return {
    req,
    res,
    user: { ...user, user_id: id.toString() },
  };
};
