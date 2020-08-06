import Bluebird from 'bluebird'
// import Promise from 'bluebird'
import mongoose, { Schema } from 'mongoose'
import { IUserDocument, IUserModel } from './interfaces/IUser'
import { readUserToken, generateUserToken, HttpError } from '../helpers/helpers.helpers';
import bcrypt from 'bcrypt';


const UserSchema : Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    dob: {
        type: Date,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    _isAdmin: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date()
    },
})

UserSchema.pre('save', async function (next) {
  // Always Hash Password
  await (<IUserDocument>this).hash()
  return next()
})

UserSchema.static('decode', readUserToken)

UserSchema.methods = {
    getUser(): object {
      const user = this.toObject()
      user.token = this._generateToken()
      delete user.password
      delete user.__v
      return user
    },

    _generateToken(): string {
      return generateUserToken(this._id);
    },

    compare(password: string): Bluebird<boolean> {
      return new Bluebird(async (resolve, reject) => {
        try {
          const same = await bcrypt.compare(password, this.password);
          if (!same) throw new HttpError('Password doesnt match');
          resolve(same);
        } catch (err) {
          reject(err);
        }
      });
    },

    hash(): Bluebird<void> {
      return new Bluebird(async (resolve, reject) => {
        try {
          this.password = await bcrypt.hash(this.password, 10);
          resolve();
        } catch (err) {
          reject(err);
        }
      })
    },
    
    isAdmin(): boolean {
      return this._isAdmin
    }
  }

export const MUser = mongoose.model<IUserDocument, IUserModel>('User', UserSchema)