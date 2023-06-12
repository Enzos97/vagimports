export const StatusList = [ 'ACCEPTED' , 'DENIED' , 'PENDING'] as const;

// export type Role = (typeof roleList)[number];
export enum StatusTypes {
    ACCEPTED = 'ACCEPTED',
    DENIED = 'DENIED',
    PENDING = 'PENDING'
}