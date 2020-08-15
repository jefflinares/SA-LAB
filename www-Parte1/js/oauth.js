function getToken(){

    let oauth = localStorage.getItem('access_token');
    if(oauth && tokenIsValid())
    {
        console.log('aun vive el localstorage: '+ oauth)
        return oauth;
    }
    const grant_type = 'client_credentials';
    const client_id = 'sa'
    const client_secret = 'fb5089840031449f1a4bf2c91c2bd2261d5b2f122bd8754ffe23be17b107b8eb103b441de3771745'
    const url = "https://cors-anywhere.herokuapp.com/https://api.softwareavanzado.world/index.php?option=token&api=oauth2";


    var req = new XMLHttpRequest();
    req.open("POST",url);
    //req.withCredentials = true;
    req.setRequestHeader('Content-Type', 'application/json',true);

    var text = JSON.stringify({"grant_type":grant_type, "client_id":client_id, "client_secret":client_secret});
    var respuesta;
    
    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) { 
            //req.responseText;
            try{
                var fecha = new Date();
                respuesta = JSON.parse(req.responseText);
                console.log('Acces_Token: '+respuesta.access_token);
                localStorage.setItem('access_token',respuesta.access_token);
                localStorage.setItem('dia',fecha.getDay());
                localStorage.setItem('mes',fecha.getMonth());
                localStorage.setItem('anio',fecha.getFullYear());
                //vamos a calcular el tiempo en el que expira la hora a partir de aca
                try {
                    var expira_en = Number(respuesta.expires_in);
                    if(expira_en)
                    {
                        expira_en /= (60*60);
                        if(expira_en % 1 === 0)
                        {
                            //entero
                            expira_en += fecha.getHours();
                            localStorage.setItem('expire_hour',expira_en);
                            localStorage.setItem('expire_minute', fecha.getMinutes());
                            
                        }else{
                            //decimales 1.5 horas por ejemplo
                            let horas = expira_en - (expira_en % 1) + fecha.getHours()
                            let minutos = ((expira_en % 1) * 60) + fecha.getMinutes();

                            if(minutos > 60)
                            {
                                minutos -= 60;
                                horas += 1;
                            }
                            
                            localStorage.setItem('expire_hour',horas);
                            localStorage.setItem('expire_minute', minutos);
                        }
                        
                    }
                    

                } catch (error) {
                    console.log('fallo el parseo catch ');
                }
                
            }catch(err){
                console.log(err);
            }
            return respuesta;
        }
        showHeaderMessage(req.status);
        
    }
    req.send(text);
}



function tokenIsValid()
{
    
    let fecha_actual = new Date();
    try{
        let dia = Number(localStorage.getItem('dia'));
        let mes = Number(localStorage.getItem('mes'));
        let anio = Number(localStorage.getItem('anio'));
        if(!dia)
        {
            console.log('Token vencido')
            return false;
        }
        console.log(dia);
        
        if( ( dia < fecha_actual.getDay() && mes < fecha_actual.getMonth() && anio < fecha_actual.getFullYear() ) || (fecha_actual.getHours() > Number(localStorage.getItem('expire_hour')) ) || ( fecha_actual.getHours() == Number(localStorage.getItem('expire_hour'))  && fecha_actual.getMinutes() > Number(localStorage.getItem('expire_minute'))) )
        {
            console.log('Token inválido');
            return false;
        }
        console.log('Token Valido:\nHora Actual: '+fecha_actual.getHours()+":"+fecha_actual.getMinutes()+"\n");
        console.log('Hora Vencimiento: '+localStorage.getItem('expire_hour')+":"+localStorage.getItem('expire_minute'));
        return true;
    }
    catch(exception){
        console.log(exception);
        return false;
    }
   

}