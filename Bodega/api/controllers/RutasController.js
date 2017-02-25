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
  }
};
