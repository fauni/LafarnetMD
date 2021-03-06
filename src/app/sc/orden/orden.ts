export class OCOrdenCompra {
    public id_orden_compra: number;
    public codigo_orden: string;
    public tipo_orden: string;
    public estado: string;
    public estado_transferencia: string;
    public fecha_orden: Date;
    public codigo_proveedor: string;
    public nombre_proveedor: string;
    public direccion_proveedor: string;
    public empid: number;
    public solicitante: string;
    public nombre_solicitante: string;
    public autorizador_sub: string;
    public autorizador_gerencia: string;
    public monto_total: number;
    public motivo_orden: string;
    public fecha_entrega: Date;
    public estado_autorizacion_subgerencia: string;
    public motivo_autorizacion_subgerencia: string;
    public fecha_autorizacion_subgerencia: Date;
    public estado_autorizacion_gerencia: string;
    public motivo_autorizacion_gerencia: string;
    public fecha_autorizacion_gerencia: Date;
    public tipo_compra: string;
    public encargado_compra: string;
    public nombre_encargado_compra: string;
    public incoterms: string;
    public usuario_creacion: string;
    public fecha_creacion: Date;
    public usuario_modificacion: string;
    public fecha_modificacion: Date;
}

export class OCTipoCompraEncargado {
    public id_tipo: number;
    public codigo_tipo_compra: string;
    public descripcion: string;
    public username: string;
    public nombre_encargado: string;
}


export class OrdenCompraListAbastecimiento {
    public codigo_orden: string;
    public conversacion: number;
    public fecha_orden: Date;
    public titular: string;
    public tipo_orden: string;
    public motivo_orden: string;
    public estado_autorizacion_gerencia: string;
    public estado_transferencia: string;
}
