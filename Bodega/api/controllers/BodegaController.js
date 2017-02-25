/**
 * BodegaController
 *
 * @description :: Server-side logic for managing Bodegas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearEntrenador: function (req, res) {

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

              return res.view('Bodega/ListarBodegas', {
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

  }
};
