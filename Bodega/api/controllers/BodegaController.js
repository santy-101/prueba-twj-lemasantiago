/**
 * BodegaController
 *
 * @description :: Server-side logic for managing Bodegas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearBodega: function (req, res) {

    if (req.method == "POST") {

      var parametros = req.allParams();
      if (parametros.nombre && parametros.direccion && parametros.capacidad) {

        var bodegaCrear = {
          nombre: parametros.nombre,
          direccion: parametros.direccion,
          capacidad: parametros.capacidad
        };
        console.log(bodegaCrear);
        Bodega.create(bodegaCrear).exec(function (err, bodegaCreada) {

          if (err) {
            return res.view('vistas/Error', {
              error: {
                descripcion: "Fallo al crear la Bodega",
                rawError: err,
                url: "/CrearBodega"
              }

            });
          }

          Bodega.find()
            .exec(function (errorIndefinido, bodegasEncontradas) {

              if (errorIndefinido) {
                res.view('vistas/Error', {
                  error: {
                    descripcion: "Hubo un problema cargando las bodegas",
                    rawError: errorIndefinido,
                    url: "/ListarBodegas"
                  }
                });
              }

              return res.view('Bodega/listarBodegas', {
                bodegas: bodegasEncontradas
              });
            })

        })


      } else {

        return res.view('vistas/Error', {
          error: {
            descripcion: "Envíe todos los campos",
            rawError: "Falló el envío de parámetros.",
            url: "/CrearBodega"
          }

        });

      }


    } else {

      return res.view('vistas/Error', {
        error: {
          descripcion: "Error en el uso del Método HTTP",
          rawError: "HTTP Inválido",
          url: "/CrearBodega"
        }
      });

    }

  },
  editarBodega: function (req, res) {
    var parametros = req.allParams();

    if (parametros.idBodega && (parametros.nombre || parametros.direccion || parametros.capacidad)) {


      var bodegaAEditar = {
        nombre: parametros.nombre,
        direccion: parametros.direccion,
        capacidad: parametros.capacidad
      };

      Bodega.update({
        id: parametros.idBodega
      }, bodegaAEditar).exec(function (errorInesperado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarBodegas"
            }
          });
        }
        Bodega.find()
          .exec(function (errorIndefinido, bodegasEncontradas) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  descripcion: "Hubo un problema cargando las bodegas",
                  rawError: errorIndefinido,
                  url: "/EditarBodega"
                }
              });
            }

            res.view('Bodega/listarBodegas', {
              bodegas: bodegasEncontradas
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          descripcion: "Necesitamos que envíe los parámetros ",
          rawError: "No envía parámetros",
          url: "/ListarBodegas"
        }
      });
    }

  },
  borrarBodega: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {

      Bodega.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, BodegaEliminada) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarBodegas"
            }
          });
        }
        Bodega.find()
          .exec(function (errorIndefinido, bodegasEncontradas) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  descripcion: "Hubo un problema cargando las bodegas",
                  rawError: errorIndefinido,
                  url: "/ListarBodegas"
                }
              });
            }
            res.view('Bodega/listarBodegas', {
              bodegas: bodegasEncontradas
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar la bodegar",
          rawError: "No envía ID",
          url: "/ListarBodegas"
        }
      });
    }
}
};
