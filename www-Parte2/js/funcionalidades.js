

function add(){
    const url_cors = "https://cors-anywhere.herokuapp.com/";
    const url = url_cors+'https://api.softwareavanzado.world/administrator/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap';

    var req = new XMLHttpRequest();
    req.open("POST",url);
    req.setRequestHeader('Authorization', 'Basic ' + btoa("sa:usac"));
    req.setRequestHeader('Content-Type', 'text/xml',true);
    
    var contac_name = document.getElementById('contact_name').value

    if(!contac_name)
    {
        alert('Por favor ingrese un nombre válido');
        return;
    }
    var xml = '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:adm="https://api.softwareavanzado.world/media/redcore/webservices/joomla/administrator.contact.1.0.0.wsdl">'+
        '<soap:Header/>'+
            '<soap:Body>'+
                '<adm:create>'+
                    '<name>'+contac_name+'</name>'+
                '</adm:create>'+
            '</soap:Body>'+
        '</soap:Envelope>';
    
    
        var respuesta;
    
    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) { 
            //req.responseText;
            try{
                respuesta =req.responseXML;
                alert('Contacto creado');
                console.log(respuesta);
                document.getElementById('contact_name').value = ""
            }catch(err){
                console.log(err);
            }
            return;
        }
        showHeaderMessage(req.status);
        
    }
    req.send(xml);

}

function showHeaderMessage(status)
{
    switch(status)
    {
        case 400: alert('No se logró realizar la petición error 400, error del cliente'); return;
        case 404: alert('No se logró realizar la petición error 404, error del cliente'); return;
        case 405: alert('No se logró realizar la petición metodo no permitido 405'); return;
        case 406: alert('No se logró realizar la petición error 406, No aceptable'); return;
        case 500: alert('Error del servidor, 500'); return;
    }
}

function listar()
{
    const url_cors = "https://cors-anywhere.herokuapp.com/";
    const url = url_cors+'https://api.softwareavanzado.world/administrator/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap';

    var req = new XMLHttpRequest();
    req.open("POST",url);
    req.setRequestHeader('Authorization', 'Basic ' + btoa("sa:usac"));
    req.setRequestHeader('Content-Type', 'text/xml',true);
    
    var xml  = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:adm="https://api.softwareavanzado.world/media/redcore/webservices/joomla/administrator.contact.1.0.0.wsdl">'+
                '<soap:Header/>'+
                    '<soap:Body>'+
                        '<adm:readList>'+
                            '<limit>50</limit>'+
                            '<filterSearch>201504448</filterSearch>'+
                       '</adm:readList>'+
                    '</soap:Body>'+
                '</soap:Envelope>';
    req.onreadystatechange = function() {
        if(req.readyState == req.DONE && req.status === 200) { 
            //req.responseText;
            try{
                respuesta = req.responseXML;
                let lista_contactos = respuesta.getElementsByTagName("list")[0];
                //console.log(lista_contactos)
                if(lista_contactos)
                {
                    //console.log('entrara a la lista de contactos: '+lista_contactos.childNodes.length)
                    
                    for(let i = 0; i < lista_contactos.childNodes.length; i++)
                    {
                        let contacto = lista_contactos.childNodes[i];    
                       // console.log(contacto)
                        let id = contacto.getElementsByTagName('id')[0].firstChild.nodeValue;
                        let name_ = contacto.getElementsByTagName('name')[0].firstChild.nodeValue
                        list_table.innerHTML +='<tr>';
                        
                        list_table.innerHTML += '<td>'+id+'</td>' +
                                                '<td>'+name_+'</td>';
                        list_table.innerHTML += '</tr>\n';
                        
                    }

                }
               
            }catch(err){
                console.log(err);
            }
            return;
        }
        showHeaderMessage(req.status);
        
    }
    req.send(xml);


    
}