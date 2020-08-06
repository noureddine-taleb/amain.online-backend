import { verify, sign } from 'jsonwebtoken'
import Promise from 'bluebird'
import { Response, Request } from 'express'
import fs from 'fs'
import path from 'path'

export class HttpError extends Error {
    constructor(
        public message: string,
        public status: number = 422
    ){
      super(message)
    }
}

export const readUserToken = (token: string): Promise<object> =>
  new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET as string, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const generateUserToken = (userID: string) => sign({ userID }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_TIME })

export const renameUploadedFile = (req: Request, res: Response) => {
  fs.rename(req.file.path, path.join(req.file.destination, req.file.originalname), error => {
    if (error) throw new HttpError(error.message, 500);
    return res.status(204).json({});
  });
};