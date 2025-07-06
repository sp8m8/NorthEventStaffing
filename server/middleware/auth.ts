import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { users } from "../../shared/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.id));
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as any).user.userType)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
