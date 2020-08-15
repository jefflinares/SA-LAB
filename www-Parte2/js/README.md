##CREAR CONTACTO

Se utilizo este WSDL para definir las peticiones que serían enviadas: https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap&wsdl y el uso del programa SoapUI, para recoger el cuerpo para enviar la petición, en el lenguaje javascript.

```javascript
function add(){
```

Esta función realiza una petición de tipo POST utilizando la libreria XMLHttpRequest(), de Javascript.

recibe de parametro la URL de la api para agregar contactos, y utiliza un proxy para permitir la configuración
segura de este cliente para llegar al endpoint de esa API, utilizando un xml para envíar la data.

```javascript
    const url_cors = "https://cors-anywhere.herokuapp.com/";
    const url = url_cors+'https://api.softwareavanzado.world/administrator/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap';
```

y se le envía un json con el atributo name, con el valor ingresado, y el valor 201504448, para poder listarlo.

##LISTAR CONTACTOS

Esta función lista en una tabla HTML, la lista de contactos que contengan mi número de carnet, se realiza una petición POST, y se recibe de respuesta el XML con los contactos que contengan este número de carnet.

```
function listar(){
```
Recibe un filtro de búsqueda por mi número de carnet: 201504448 

```javascript
    const url_cors = "https://cors-anywhere.herokuapp.com/";
    const url = url_cors+'https://api.softwareavanzado.world/administrator/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap';

```

Esta función evalua el tipo de respuesta recibida de la api y muestra el mensaje en un alert.

```javascript
function showHeaderMessage(){
```
