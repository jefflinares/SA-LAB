1.  [Crear Contacto](#CrearContacto)
2.  [Oauth](#Oauth)

<h2 align="center">Crear Contacto</h2>

```javascript
function add(){
```

Esta función realiza una petición de tipo POST utilizando la libreria XMLHttpRequest(), de Javascript.

recibe de parametro la URL de la api para agregar contactos.

```javascript
var url = 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal';
```

y se le envía un json con el atributo name, con el valor ingresado, y el valor 201504448, para poder listarlo, y tambien un token de autorización del tipo  Baerer Token, con el cuál se le permite o no el acceso a un recurso.

##LISTAR CONTACTOS

Esta función lista en una tabla HTML, la lista de contactos que contengan mi número de carnet, se realiza una petición GET

```
function listar(){
```
Recibe un filtro de búsqueda por mi número de carnet: 201504448, y tambien un token de autorización del tipo 
Baerer Token, con el cuál se le permite o no el acceso a un recurso.

```javascript
var url = 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal&filter[search]=201504448';
```

Esta función evalua el tipo de respuesta recibida de la api y muestra el mensaje en un alert.

```javascript
function showHeaderMessage(){
```
<h2 align="center">Oauth</h2>

Este archivo contiene el metodo getToken.

```javascript
function getToken(){
```

El cual es el que solicita el access_token al oauth2.0, a traves de una petición POST, que recibe las siguientes credenciales para poder realizar la petición:

```javascript
    const grant_type = 'client_credentials';
    const client_id = 'sa'
    const client_secret = 'fb5089840031449f1a4bf2c91c2bd2261d5b2f122bd8754ffe23be17b107b8eb103b441de3771745'
```


y así acceder a los recursos disponibles para crear y listar contactos, el mismo tiene un tiempo en el cuál expira, este metodo guarda este token de acceso en el localStorage para darle posterior uso.

Tambien cuenta con el método isValidToken

```javascript
function isValidToken(){
```

Este metodo retorna un valor verdadero si el token de acceso previamente guardado es aún valido de lo contrario es falso, con lo cual se solicita nuevamente un nuevo token de acceso con el fin que se mantenga valido el acceso siempre.