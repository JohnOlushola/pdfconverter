import { Document } from "mongoose";
import { IUserDocument } from "./users.types";
import bcrypt from 'bcrypt';

export async function setLastUpdated(this: IUserDocument): Promise<void> {
    const now = new Date();
    if (this.lastUpdated || this.lastUpdated < now) {
        this.lastUpdated = now;
        await this.save();
    }
}

export async function sameLastName(this: IUserDocument): Promise<Document[]> {
    return this.model("user").find({ lastName: this.lastName });
}

export function validatePassword(this: IUserDocument, password: string): boolean {
    return bcrypt.compareSync(password, this.password);
}