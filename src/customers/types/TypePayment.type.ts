export const PaymentList = ['EFECTIVO', 'TRANSFERENCIA','MERCADOPAGO','DEPOSITO'] as const;

// export type Role = (typeof roleList)[number];
export enum PaymentMethod {
    EFECTIVO = 'EFECTIVO',
    TRANSFERENCIA = 'TRANSFERENCIA',
    MERCADOPAGO='MERCADOPAGO',
    DEPOSITO='DEPOSITO'
}