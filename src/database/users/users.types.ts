import { Document, Model } from 'mongoose';

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    permission: number,
    dateOfEntry: Date,
    lastUpdated: Date,
}

export interface IUserDocument extends IUser, Document {
    setLastUpdated: (this: IUserDocument) => Promise<void>;
    sameLastName: (this: IUserDocument) => Promise<Document[]>
}

export interface IUserModel extends IUser, Model<IUserDocument> {
    findOneOrCreate: (
        this: IUserModel,
        {
            firstName,
            lastName,
            permission,
        }: { firstName: string, lastName: string, email: string, permission: number }
    ) => Promise<IUserDocument>;
    findByPermission: (
        this: IUserModel,
        permission: number,
    ) => Promise<IUserDocument[]>
}