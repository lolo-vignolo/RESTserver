**al server lo pueso hacer tipo classes o sin**

**middlewares** se ejecutan antes de las Rutas.
_this.app.use(express.static('public'))_ lo utilizamos para que lea los archivos HTML (generalmente) de la carpeta "public".
como puedo observar tengo varios, el "cors" que es para el manejo de rutas, luego el "json" para avisarle al servidor que va a recibir info formato json. Todos estos middleware se ejecutan antes de que vaya a cualquier ruta o method (get, put, push, etc)

**cors** permite proteguer nuestro servidor, podes cancelar o restringir las rutas

**routes** de esa forma puede separar las rutas en un folder independiente, para que me quede ams acomodado
lo primero es llamar al metodo Router de express. Luego reemplazo el this.app por router. Finalmente voy a la carpeta
servidor y hago las modificaciones correspondientes.
En la carpeta servidor para "importar las rutas" usaré un middleware, por eso uso la palabra "use".

**controllers** aqui definire funciones, las cuales son los callback de las rutas.

**query params ?** estos son los que vienen en los URL luego del signo ? .
ejemplo. www.localhost:3000/api/usuarios?q=hole&nombre=Lorenzo
como no son obligatorios, como sería el caso del ID que veo en el put o el delete. A estos los puedo extraer del REQ directamente sin necesidad de agregar por ejemplo :id.
