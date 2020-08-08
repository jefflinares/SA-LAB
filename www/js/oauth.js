function getToken(){

    const url = "https://api.softwareavanzado.world/index.php?option=token&api=oauth2";
    const grant_type = 'client_credentials';
    const client_id = 'sa'
    const client_secret = 'fb5089840031449f1a4bf2c91c2bd2261d5b2f122bd8754ffe23be17b107b8eb103b441de3771745'



    var req = new XMLHttpRequest();
    req.open("POST",url);
    req.withCredentials = true;
    req.setRequestHeader('Content-Type', 'application/json',true);
    
    

    var text = JSON.stringify({"grant_type":grant_type, "client_id":client_id, "client_secret":client_secret});
    var respuesta;
    
    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) { 
            //req.responseText;
            try{
                respuesta = JSON.parse(req.responseText);
                console.log('Acces_Token: '+respuesta.access_token);
            }catch(err){
                console.log(err);
            }
            return respuesta;
        }
        showHeaderMessage(req.status);
        
    }
    req.send(text);
}