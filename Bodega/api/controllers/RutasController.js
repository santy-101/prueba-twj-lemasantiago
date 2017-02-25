module.exports = {

  home: function (req, res) {

    return res.view('vistas/home')
  },
  crearBodega: function (req, res) {
    return res.view('Bodega/crearBodega');
  },
  error: function (req, res) {
    return res.view('vistas/error', {
      error: {
        desripcion: "Usted está por error en esta Ruta. Diríjase a Inicio",
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
              desripcion: "Hubo un problema cargando las bodegas",
              rawError: errorIndefinido,
              url: "/ListarBodegas"
            }
          });
        }

        return res.view('Bodega/listarBodegas', {
          bodegas: bodegasEncontradas
        });
      })
  }
};
