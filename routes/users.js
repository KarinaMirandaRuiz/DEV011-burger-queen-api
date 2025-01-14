const bcrypt = require('bcrypt');
const mongoose = require ('mongoose');
const User = require('../models/users');

const {
  requireAuth,
  requireAdmin,
  isAdmin,
} = require('../middleware/auth');

const {
  getUsers,
  getUsersJSON,
  getUserByID,
  getUserByEmail,
  saveUser,
  patchUser,
  deleteUser
} = require('../controller/users');

const initAdminUser = (app, next) => {
  const { adminEmail, adminPassword } = app.get('config');
  if (!adminEmail || !adminPassword) {
    return next();
  }

  const adminUser = {
    email: adminEmail,
    password: bcrypt.hashSync(adminPassword, 10),
    role: 'admin',
  };

  getUsers()
  .then(users => {
    // console.log('Todas las personas:', users);
    const existsUser = users.some(user =>user.email === adminUser.email);
    if (!existsUser){
      const newAdminUserDB = new User(adminUser);
      return newAdminUserDB.save();
    } else {
    console.log(`El usuario ${adminUser.email} ya existe en la base de datos`)
    }
  })
  .catch(error => {
    // Maneja el error si ocurrió durante la búsqueda
    console.log('Error general:', error);
  })
  // .finally(() => {
    // Cierra la conexión a la base de datos después de la consulta
    // mongoose.connection.close();
  // });

  // TODO: Create admin user
  // First, check if adminUser already exists in the database
  // If it doesn't exist, it needs to be saved

  next();
};

// mongoose.connect('mongodb://127.0.0.1:27017/burger-queen-api');

/*
 * Español:
 *
 * Diagrama de flujo de una aplicación y petición en node - express :
 *
 * request  -> middleware1 -> middleware2 -> route
 *                                             |
 * response <- middleware4 <- middleware3   <---
 *
 * la gracia es que la petición va pasando por cada una de las funciones
 * intermedias o "middlewares" hasta llegar a la función de la ruta, luego esa
 * función genera la respuesta y esta pasa nuevamente por otras funciones
 * intermedias hasta responder finalmente a la usuaria.
 *
 * Un ejemplo de middleware podría ser una función que verifique que una usuaria
 * está realmente registrado en la aplicación y que tiene permisos para usar la
 * ruta. O también un middleware de traducción, que cambie la respuesta
 * dependiendo del idioma de la usuaria.
 *
 * Es por lo anterior que siempre veremos los argumentos request, response y
 * next en nuestros middlewares y rutas. Cada una de estas funciones tendrá
 * la oportunidad de acceder a la consulta (request) y hacerse cargo de enviar
 * una respuesta (rompiendo la cadena), o delegar la consulta a la siguiente
 * función en la cadena (invocando next). De esta forma, la petición (request)
 * va pasando a través de las funciones, así como también la respuesta
 * (response).
 */

/*
 * Português Brasileiro:
 *
 * Fluxo de uma aplicação e requisição em node - express:
 *
 * request  -> middleware1 -> middleware2 -> rota
 *                                             |
 * response <- middleware4 <- middleware3   <---
 *
 * A essência é que a requisição passa por cada uma das funções intermediárias
 * ou "middlewares" até chegar à função da rota; em seguida, essa função gera a
 * resposta, que passa novamente por outras funções intermediárias até finalmente
 * responder à usuária.
 *
 * Um exemplo de middleware poderia ser uma função que verifica se uma usuária
 * está realmente registrada na aplicação e tem permissões para usar a rota. Ou
 * também um middleware de tradução, que altera a resposta dependendo do idioma
 * da usuária.
 *
 * É por isso que sempre veremos os argumentos request, response e next em nossos
 * middlewares e rotas. Cada uma dessas funções terá a oportunidade de acessar a
 * requisição (request) e cuidar de enviar uma resposta (quebrando a cadeia) ou
 * delegar a requisição para a próxima função na cadeia (invocando next). Dessa
 * forma, a requisição (request) passa através das funções, assim como a resposta
 * (response).
 */

module.exports = (app, next) => {
/*   app.use('/users/:test', function(req, res, next) {
    console.log('Test-Request URL:', req.originalUrl);
    next();
  }, function (req, res, next) {
    console.log('Test-Request Type:', req.method);
    next();
  }); */

  app.get('/users', requireAdmin, async(req, resp) => {
    try {
      const limit = req.query.limit || 10;
      const page = req.query.page || 1;
      const allUsers = await getUsersJSON(page,limit);
      //console.log('r/u get/:',allUsers);
    
      resp.set('Link', allUsers.linkHeader);
      resp.json(allUsers.respUsersGet)
    } catch(error) {
      resp.status(403).json({"error": "No tiene permiso de Administradora"});
    }
    /* next() */
  });

  app.get('/users/:uid', requireAuth, async(req, resp, next) => {
    const uidUser = req.params.uid;
    console.log('r/u get/:uid:',uidUser !== req.iud,!isAdmin(req));
    
    try {
      const user = (uidUser.includes('@'))? await getUserByEmail(uidUser) : await getUserByID(uidUser);
      // console.log('r/u get/:uid user:',user);
      if (user.id.toString() !== req.uid && !isAdmin(req)){
        resp.status(403).json({"error": "No tiene permiso de Administradora"});
      } else if (user){
        resp.json(user);
      }
    } catch(error) {
      resp.status(404).json({"error": "La usuaria solicitada no existe"});
    }
    
  });

  app.post('/users', requireAuth, async(req, resp, next) => {
    // TODO: Implement the route to add new users
    const newUser = req.body; // Acceder a los datos en el cuerpo de la solicitud
    // console.log('r/u post req.body: ',newUser);
    if (!newUser.email || !newUser.password || !newUser.role) {
      resp.status(400).json({"error": "Falta información"});
    } else {
      const newUserCrypted = {
      email: newUser.email,
      password: bcrypt.hashSync(newUser.password, 10),
      role: newUser.role,
    };
  
    try {
      let user = await getUserByEmail(newUser.email);
      console.log('r/u post/ user registrado:',user);
      if ( !user ){
        const savedUser = await saveUser(newUserCrypted)
        resp.json(savedUser);
      } else {
        resp.status(403).json({"error": "Email ya registrado"});
      }
    }catch (error){
      resp.status(500).json({"error": 'Error interno del servidor, no se pudo guardar el usuario'})
    }  
    }
  
  
  });

  app.patch('/users/:uid', requireAuth, async (req, resp, next) => {
    const userIdentifier = req.params.uid;
    console.log('r/u patch userIdentifier:', userIdentifier);
    const newUserData = req.body; // Acceder a los datos en el cuerpo de la solicitud
    console.log('r/u patch newUserData(1): ',newUserData);
    // const userReq = await getUserByID(req.uid);
    const userReq = (userIdentifier.includes('@'))? await getUserByEmail(userIdentifier) : await getUserByID(userIdentifier);
    if (userReq === null){
      resp.status(404).json({"error": 'Error la usuaria solicitada no existe(3)'})
    }else {
      console.log('r/u patch userReq:', userReq);
      const userAutoPut = req.uid === userReq.email || req.uid === userReq.id;
      console.log('r/u patch userAutoPut:', userAutoPut);
      if ( !isAdmin(req) && !userAutoPut ){
        resp.status(403).json({"error": 'No cuenta con permisos de Administradorxxx'})
      }else if (!newUserData ||(!newUserData.email || !newUserData.password || !newUserData.role)) {
        resp.status(400).json({"error": "Falta información"});
      } else if (userAutoPut && req.body.role !== userReq.role){
        resp.status(403).json({"error": 'No puede modificar su role'})
      } else {
        try{
          console.log('r/u patch newUserData:', newUserData);
          newUserData.password = bcrypt.hashSync(newUserData.password, 10);
          const updatedUser = await patchUser(userIdentifier, newUserData, req);
          console.log('r/u patch updatedUser: ',updatedUser);

          resp.json(updatedUser)
          
        }catch(error){
          resp.status(500).json({"error": 'Error interno del servidor, no se pudo actualizar la información'})
        }
      
      }
    }

  });

  app.delete('/users/:uid', requireAuth, async(req, resp, next) => {
    const userIdentifier = req.params.uid;
    const userReq = (userIdentifier.includes('@'))? await getUserByEmail(userIdentifier) : await getUserByID(userIdentifier);
    console.log('r/u delete userReq:', userReq);
    if ( !userReq ){
      resp.status(404).json({"error": 'Error la usuaria solicitada no existe(4)'})
    } else if ( !isAdmin(req) && !(req.uid === userReq.id) ){
      resp.status(403).json({"error": 'No cuenta con permisos de Administradora'})
    }else {
      try{
        const deletedUser = await deleteUser(userReq.id);
        console.log('r/u delete deletedUser: ',deletedUser);
        resp.json(deletedUser)
      }catch(error){
        resp.status(500).json({"error": 'Error interno del servidor, no se pudo actualizar la información'})
      }
    }
  });

  initAdminUser(app, next);
};
