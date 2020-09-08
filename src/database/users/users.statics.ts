import { IUserDocument, IUserModel } from './users.types';

export async function findOneOrCreate(this: IUserModel, userId: string): Promise<IUserDocument> {
    const record = await this.findOne({ userId });
    if (record) {
        return record;
    } else {
        return this.create({ firstName: "firtname", lastName: "lastname", email: "email", password: "password", permission: 3, dateOfEntry: Date.now, lastUpdated: Date.now });
    }
}

export async function findByPermission(this: IUserModel, permission: number): Promise<IUserDocument[]> {
    return this.find({ permission: permission });
}