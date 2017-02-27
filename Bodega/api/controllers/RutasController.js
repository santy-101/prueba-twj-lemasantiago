/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  home: function (req, res) {

    return res.view('vistas/home')
  },
  crearBodega: function (req, res) {
    return res.view('Bodega/crearBodega');
  },
  error: function (req, res) {
    return res.view('vistas/Error', {
      error: {
        descripcion: "Usted está por error en esta Ruta. Diríjase a Inicio",
        rawError: "Ruta equivocada",
        url: "/Inicio"
      }
    });
  },
  listarBodegas: function (req, res) {
    Bodega.find()
      .exec(function (errorIndefinido, bodegasEncontradas) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              descripcion: "Hubo un problema cargando las bodegas",
              rawError: errorIndefinido,
              url: "/listarBodegas"
            }
          });
        }

        res.view('Bodega/listarBodegas', {
          bodegas: bodegasEncontradas
        });
      })
  },
  editarBodega: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Bodega.findOne({
        id: parametros.id
      }).exec(function (errorInesperado, bodegaEncontrada) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarBodegas"
            }
          });
        }
        if(bodegaEncontrada){
          return res.view("Bodega/editarBodega",{
            bodegaAEditar:bodegaEncontrada
          });
        }else{
          return res.view('vistas/Error', {
            error: {
              descripcion: "La bodega con id: "+parametros.id+" no existe.",
              rawError: "No existe la bodega",
              url: "/ListarBodegas"
            }
          });
        }
      })
    } else {

      return res.view('vistas/Error', {
        error: {
          descripcion: "No ha envíado al parámetro ID",
          rawError: "Faltan Parámetros",
          url: "/ListarBodegas"
        }
      });

    }
  },
  crearItem: function (req, res) {
    Bodega.find().exec(function (error, bodegasEncontradas) {
      if (error) return res.serverError();
      return res.view('Item/crearItem', {
        title: 'Crear Items',
        bodegas: bodegasEncontradas
      });
    });

  },
  listarItems: function (req, res) {
    Item.find()
      .exec(function (errorIndefinido, itemsEncontrados) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              descripcion: "Hubo un problema cargando los items",
              rawError: errorIndefinido,
              url: "/listarItems"
            }
          });
        }

        res.view('Item/listarItems', {
          items: itemsEncontrados
        });
      })

  },
  editarItem: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Item.findOne({
        id: parametros.id
      }).exec(function (errorInesperado, itemEncontrado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              descripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarItems"
            }
          });
        }
        if(itemEncontrado){
          return res.view("Item/editarItem",{
            itemAEditar:itemEncontrado
          });
        }else{
          return res.view('vistas/Error', {
            error: {
              descripcion: "El item con id: "+parametros.id+" no existe.",
              rawError: "No existe el item",
              url: "/ListarItems"
            }
          });
        }
      })
    } else {

      return res.view('vistas/Error', {
        error: {
          descripcion: "No ha envíado al parámetro ID",
          rawError: "Faltan Parámetros",
          url: "/ListarItems"
        }
      });

    }
  }

};
