**al server lo pueso hacer tipo classes o sin**

**middlewares** se ejecutan antes de las Rutas.
_this.app.use(express.static('public'))_ lo utilizamos para que lea los archivos HTML (generalmente) de la carpeta "public".
como puedo observar tengo varios, el "cors" que es para el manejo de rutas, luego el "json" para avisarle al servidor que va a recibir info formato json. Todos estos middleware se ejecutan antes de que vaya a cualquier ruta o method (get, put, push, etc)

**cors** permite proteguer nuestro servidor, podes cancelar o restringir las rutas

**routes** de esa forma puede separar las rutas en un folder independiente, para que me quede mas acomodado
lo primero es llamar al metodo Router de express. Luego reemplazo el this.app por router. Finalmente voy a la carpeta
servidor y hago las modificaciones correspondientes.
En la carpeta servidor para "importar las rutas" usaré un middleware, por eso uso la palabra "use".

route.elMethod -> recibe dos argumentos, primero la ruta y luego un callback donde trabajara la información.

**controllers** aqui definire funciones, las cuales son los callback de las rutas.

**query params ?** estos son los que vienen en los URL luego del signo ? .
ejemplo. www.localhost:3000/api/usuarios?q=hole&nombre=Lorenzo
como no son obligatorios, como sería el caso del ID que veo en el put o el delete. A estos los puedo extraer del REQ directamente sin necesidad de agregar por ejemplo :id.

**la coneccion con la db la hicimos con compas** usa compas para manejar los JSON que llagan con las request

**la coneccion app y DB** la hizo con mongoose. sigue la documentacion de mongoose. solo agrega un objeto con algunos booleanos. Luego va al server, donde establecera la coneccion con un method.

**usuario.model** sigue los pasos indicados en mongoose. La unica dif, son las validaciones.

**POST nuevo usuario** el beneficio que me da mongoose es que cuando recibo la indo del req.body paso directamente el boddy a la instancia del Schema y mongoose se encarga de validar la info. De otra forma yo debería utilizar un if. Ejemplo:

```
if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 6
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
```

**encriptar password** usa el paquete bcrypt.js. sigue los pasos del enctypt. Sync

**validaciones**usa el npm express-validator.

- Las validaciones la hago a forma de middleware en las rutas.

**check** todos los valores que vienen luego de check por ejemplo check('nombre', 'El n...., ese nombre es el valor ingresado por el customer cuando completa el form.

**validationResult en este caso "controlCampos"** Es de suma importancia por que si bien todos los check los hago con los middlewares, necesito poner el _validationResult_ al final de los middlewares para o bien terminar con el error que agarro algun check, o bien con el next() para seguir corriendo la app.

**.custom()** si bien express validator tiene muchas validaciones, yo puedo crear la mia propia.
es practicamente siempre igual, poner lo que quiero validar, luego un callback y si no pasa throw new error ....
En este caso si fija si lo que el usuario quiere poner como "rol" entra dentro de los schemas del modelo user.rol.

Te permite enchufarle una función en la cual se pase como argumento el valor a chequear, luego la funcion la hago y checkeo como quiero.

**toObject toJson virtuals**

```
UsuarioSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

```

Lo que me permite esto es modificar la informacón que se enviara en la respuesta. Por eso a la funcion que creo, se la suelle llamar fauncion virtual. Por que es una funcion que quedaría establecida en la base de datos. tl toObject y el toJSON me permiten modificar la informacion que ingresa el usuario, o sea modificar el schema que yo cree y el usuario ocmpleto.

**PUT actualizar datos** ver en el usuario.controllers como funciona. es muy basico. 1) agarrar la info que viene en el body (info que el usuario quiere actualizar), desestructuro. Luego separo password , google , ...resto. Todo lo que extraigo aparte del ... resto, son cosas que no pueden actualizarse o sea quedan fuera de la bolsa. La unica forma de actualizarlos es por separados como hago con el password, pero password la necesito separar por que de cambiarla debo hacer el hash de nuevo. luego ...resto se actualizara practicamente solo, creo una constante usuario, luego utilizo con await un metodo "findByIdAndUpdate" donde el primer argumento es el parametro para encontrar el usuario a modificar y el segundo que quiero modificar, basicamente machea la info existente con la ingresada y la actualiza.

```
 const usuarioActualizado = await Usuario.findByIdAndUpdate(id, resto);
```

**req.params** params es toda la info que hay en el URL que previo tiene "/"

**req.query** query son los argumentos que estan en el endpoint o URL que estan despues de un "?"

**limit and skip** son dos methods de express que nos permites a traves de querys organizar el contenido a recibir a traves de un GET. El limit limita el numero de usuarios a recibir, y el skip desde que numero en la lista quiero arrancar. Importante agregarle el metodo "Number", por ejemplo Number(limit) por que estos methods esperan numeros y por defecto desde el query vienen como strings.

**method find() y countDocuments()** el find lo ustilizo para traer la lista que tengo en la coleccion, miesntras que el countDocumetns me dice el numero de registros que tengo. A ambos le puedo pasar un parametro en forma de objeto , como restriccion que debe tener para ser llamado. De esta forma puedo evitar traer algun usuario específico por ejemplo.

**method DELETE** antes se eliminaba directamente por ejemplo el usuario de la base de datos, para lo cual tomando el "ID" enviado se llamaba al metodo .findByIdAndDelete(id) , ahora lo que se hace es dejarlo pero cambiarle el estado. Como se ve en el GET, para que un usuario sea llamado debe tener un estado "true", por lo cual para "eliminarlo" de la vista del customer pasamos el estado a "false" pero sigue dentro de la base de datos.
