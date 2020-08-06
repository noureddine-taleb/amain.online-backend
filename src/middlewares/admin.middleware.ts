import { RequestHandler, Response, Request } from "express";
import { HttpError } from "../helpers/helpers.helpers";
import { MUser } from "../models/User.model";

export const adminAuth = async (req: Request, res: Response, next: RequestHandler) => {
  // Get token from header
  const bearerHeader = req.headers.authorization;

  // Check if not token
  if (!bearerHeader) throw new HttpError('No token, authorization denied', 401);

  // Verify token
  const token = bearerHeader.split(' ')[1];
  if (!token) throw new HttpError('Token is not valid', 401);

  // Decrypt Token
  try {
    (req as any).auth = await MUser.decode(token);
    const user = await MUser.findOne({ _id: (req as any).auth?.userID })

    if(!user?.isAdmin())
        throw new HttpError('permission denied', 403)

  } catch (err) {
    throw new HttpError(err.message, err?.status || 401);
  }

  (next as any)();
};