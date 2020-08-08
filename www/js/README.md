##CREAR CONTACTO

```
function add(){
```

Esta función realiza una petición de tipo POST utilizando la libreria XMLHttpRequest(), de Javascript.

recibe de parametro la URL de la api para agregar contactos.

```
var url = 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal';
```

y se le envía un json con el atributo name, con el valor ingresado, y el valor 201504448, para poder listarlo.

##LISTAR CONTACTOS

Esta función lista en una tabla HTML, la lista de contactos que contengan mi número de carnet, se realiza una petición GET

```
function listar(){
```
Recibe un filtro de búsqueda por mi número de carnet: 201504448 

```
var url = 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal&filter[search]=201504448';
```

Esta función evalua el tipo de respuesta recibida de la api y muestra el mensaje en un alert.

```
function showHeaderMessage(){
```
