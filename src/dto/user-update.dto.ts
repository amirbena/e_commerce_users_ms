export interface UserUpdate {
    id: string
    userToUpdate: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        street?: string;
        building?: number;
        phone?: string;
        city?: string;
        country?: string;
    }
}