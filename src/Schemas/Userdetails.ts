import { RxJsonSchema } from "rxdb"
import { UserDetails } from "../app/Models/user-details";

const details : RxJsonSchema<UserDetails> = {
    title: 'User Details Schema',
    version: 0,
    type: 'object',
    properties: {
        id: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        mobileNumber: { type: 'string' },
        address: { type: 'string' },
        executives: { type: 'string' },
        presignedUrl:{type:'string'}
    },
    primaryKey: 'id',
};

export default details;