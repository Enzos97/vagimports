export const PaymentList = ['EFECTIVO', 'TRANSFERENCIA'] as const;

// export type Role = (typeof roleList)[number];
export enum PaymentMethod {
    EFECTIVO = 'EFECTIVO',
    TRANSFERENCIA = 'TRANSFERENCIA'
}