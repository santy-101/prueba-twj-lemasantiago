/**
 * Bodega.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
   nombre:
     {
       type: 'string',
       required: true,
       unique: true
     },
    direccion:
      {
        type: 'string',
        required: true
      },
    capacidadEnToneladas:
      {
        type: 'integer',
        required: true
      },
    items:
      {
        collection: 'Item',
        via: 'idBodega'
      }
  }
};

