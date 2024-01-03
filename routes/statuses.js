const {
  requireAuth,
} = require('../middleware/auth');
const { Status } = require('../models/statuses')

module.exports = (app, nextMain) => {
  app.get('/statuses', requireAuth, async (req, resp, next) => {
    try {
      // Consulta todos los documentos en la colección 'people'
      const statusModel = await new Status();
      const status = statusModel.find();
  
      // Renderiza la plantilla con los datos
      res.render('visualizar', { status });
    } catch (error) {
      console.log('Error al obtener status:', error);
      res.status(500).send('Error interno del servidor (route/statuses)');
    }
  });

/*   app.get('/statuses/:statusesId', requireAuth, (req, resp, next) => {
  });

  app.post('/statuses', requireAuth, (req, resp, next) => {
  });

  app.patch('/statuses/:statusesId', requireAuth, (req, resp, next) => {
  });

  app.delete('/statuses/:statusesId', requireAuth, (req, resp, next) => {
  }); */

  nextMain();
};
