import Jwt from "jsonwebtoken"
import { JWT_SECRET } from "../routers/user";
import { prisma } from "../dbclient";

export const isAdmin = async(data: string | undefined) => {
    if (!data) {
      return null;
    }
  
    const decoded = Jwt.verify(data, JWT_SECRET) as { userId: string } | null;
  
    if (!decoded) {
      return null;
    }
  
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if(user?.role === "ADMIN"){
        return true
    }
    return false;
  };
  