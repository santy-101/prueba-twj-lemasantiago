/**
 * ItemController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearItem: function (req, res) {

    if (req.method == "POST") {

      var parametros = req.allParams();
      if (parametros.nombre && parametros.cantidad && parametros.peso && parametros.idBodega) {

        var itemCrear = {
          nombre: parametros.nombre,
          cantidad: parametros.cantidad,
          peso: parametros.peso,
          idBodega : parametros.idBodega
        };
        console.log(itemCrear);
        Item.create(itemCrear).exec(function (err, itemCreado) {

          if (err) {
            return res.view('vistas/Error', {
              error: {
                descripcion: "Fallo al crear el Item",
                rawError: err,
                url: "/CrearItem"
              }

            });
          }

          Item.find().populate("idBodega")
            .exec(function (errorIndefinido, itemsEncontrados) {

              if (errorIndefinido) {
                res.view('vistas/Error', {
                  error: {
                    descripcion: "Hubo un problema cargando los items",
                    rawError: errorIndefinido,
                    url: "/ListarItems"
                  }
                });
              }

              return res.view('Item/listarItems', {
                items: itemsEncontrados
              });
            })

        })


      } else {

        return res.view('vistas/Error', {
          error: {
            descripcion: "Envíe todos los campos",
            rawError: "Falló el envío de parámetros.",
            url: "/CrearItem"
          }

        });

      }


    } else {

      return res.view('vistas/Error', {
        error: {
          descripcion: "Error en el uso del Método HTTP",
          rawError: "HTTP Inválido",
          url: "/CrearItem"
        }
      });

    }

  },
  editarItem: function (req, res) {
    var parametros = req.allParams();

    if (parametros.idItem && (parametros.nombre || parametros.cantidad || parametros.peso)) {

      var itemAEditar = {
        nombre: parametros.nombre,
        cantidad: parametros.cantidad,
        peso: parametros.peso
      };

      Item.update({
        id: parametros.idItem
      }, itemAEditar).exec(function (errorInesperado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarItem"
            }
          });
        }
        Item.find().populate("idBodega")
          .exec(function (errorIndefinido, itemsEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  descripcion: "Hubo un problema cargando los items",
                  rawError: errorIndefinido,
                  url: "/EditarItem"
                }
              });
            }

            res.view('Item/listarItems', {
              items: itemsEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          descripcion: "Necesitamos que envíe los parámetros ",
          rawError: "No envía parámetros",
          url: "/ListarItems"
        }
      });
    }

  },
  borrarItem: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {

      Item.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, itemEliminado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarItems"
            }
          });
        }
        Item.find().populate("idBodega")
          .exec(function (errorIndefinido, itemsEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  descripcion: "Hubo un problema cargando los items",
                  rawError: errorIndefinido,
                  url: "/ListarItems"
                }
              });
            }
            res.view('Item/listarItems', {
              items: itemsEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar el item",
          rawError: "No envía ID",
          url: "/ListarItems"
        }
      });
    }
  }
};

