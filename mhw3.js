function onClick(event){
    const elemento =event.currentTarget.parentNode.querySelector('.hidden');
    // elemento = primo elemento con classe hidden all'interno del div che contiene l'elemento
    // 'a' che ha generato l'evento
    elemento.classList.remove('hidden');
    console.log("rimosso");
}

function remove(event){
    event.currentTarget.parentNode.parentNode.classList.add('hidden');
}

function showLogin(){

    const elem = document.querySelector('#loginPage');
    if(elem.classList.contains('hidden')){
        elem.classList.remove('hidden');
    }else{
        elem.classList.add('hidden');
    }
}

// codice relativo al cambio delle immagini relative al programma fedeltà
const imgUrls =[
    "media/connoiss.png",
    "media/ambasci.png",
    "media/expert.png"
];
let index=0;

function changeImg() {
    const container = document.querySelector('#dinamico');
    const img = container.querySelector('img');
    img.src=imgUrls[index];
    index++;
    if(index>= imgUrls.length)
        index=0;
}
// per invocare ogni 5 secondi la funzione che cambia immagine
setInterval(changeImg,5000);

// 

function accesso(event){
    console.log("Ho inviato")
    event.preventDefault();
    console.log("Sono dentro la funzione");
    const username = currentTarget.querySelector('#mail');
    const passw = currentTarget.querySelector('#password');

    console.log("Hai inserito "+ username + passw +" come dati");
}


const buttons = document.querySelectorAll('.onClick');
// mi restituisce una lista, per ogni elemento creo un listener sul click del link "scopri di più"
for(let button of buttons)
    button.addEventListener('click',onClick);

const closes = document.querySelectorAll('.close');
for(let close of closes)
    close.addEventListener('click', remove);

// per la comparsa della pagina di login
const account = document.querySelector('#accountLogin');
    account.addEventListener('click',showLogin);

    // per creare un listener sull'inserimento delle informazioni di login
const form = document.querySelector("#userData");
form.addEventListener('submit', accesso);
console.log("listener creato sul submit di login");




// chiave per accweather
const  key= 'eRzOUAGG87J6ainXjANtAYpp7OuK9aXr'

const forecast_form = document.querySelector("#forecast_form");
forecast_form.addEventListener('submit', forecast_finder);
forecast_form.addEventListener('submit',spotify);


function forecast_finder(event){
    event.preventDefault();
    const value = document.querySelector("#city").value;
    const city =encodeURIComponent(value);
    console.log("Dentro "+ city);
    const city_search = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey="+key+"&q="+city+'&language=it-it';
    console.log("sto cercando "+city_search);
    fetch(city_search).then(onResponse).then(oncityJSON);
}

function onResponse(response){
    return response.json();
}

function oncityJSON(json){
    console.log(json);
    console.log(json[0].Key);
    const location_id= json[0].Key;
    const forecast_endpoint = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/"+location_id+'?apikey='+key+'&language=it-it';
    fetch(forecast_endpoint).then(onResponse).then(onlocationJSON);
}

function onlocationJSON(json){
    console.log("Ho trasmesso l'id: ");
    const previsione = json.DailyForecasts[0].Day.IconPhrase;
    console.log("Il tempo previsto è: "+ previsione);
    // ho recuperato la previsione, adesso la inserisco
    
    const mostra = document.querySelector('#mostra');
    // svuoto il contenitore
    mostra.innerHTML='';

    const elemento = document.createElement('span');
    elemento.innerHTML=previsione;
    
    mostra.appendChild(elemento);
    mostra.classList.remove('hidden');

}





// Per aggiungere le icone relative al meteo
// const icon_key= "134017e497894b0d954f43c1d5e31150";
// const icon_sec= "c3a24bfc84ae4bba9e4ceb164353da6b";


// API SPOTIFY

const spotify_id= "5263fc2a7e644de1b98d43e7df43ce13";
const spotify_secret = "1ad470fcbc7f4a9b8c3bbfb9a9111b12";

let token;

fetch("https://accounts.spotify.com/api/token",
    {
        method: "post",
        body: 'grant_type=client_credentials',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':'Basic '+btoa(spotify_id +':'+spotify_secret)
        }
    }
).then(onTokenResp).then(onTokenJSON);

function onTokenResp(response){
    return response.json();
}

function onTokenJSON(json){
    console.log(json);
    token=json.access_token;
}

function spotify(event){
    event.preventDefault();
    const scelta = document.querySelector("#city").value;
    console.log("ho scelto "+ scelta);

    let paese;
    if(scelta==="Brasilia")
        paese = "37i9dQZEVXbMXbN3EUUhlg";
    else if(scelta ==="El Salvador")
        paese = "37i9dQZEVXbLxoIml4MYkT";
    else if(scelta ==="Hanoi")
        paese = "37i9dQZEVXbLdGSmz6xilI";
    else if(scelta ==="Bogotà")
        paese = "37i9dQZEVXbOa2lmxNORXQ";

    fetch("https://api.spotify.com/v1/playlists/"+paese,
    {
        headers:
        {
            'Authorization': 'Bearer '+ token
        }
        }
    ).then(onResponse).then(topMusic);
   

}

function topMusic(json){
    const showcase= document.querySelector('#show');
    if(!showcase.classList.contains('hidden'))
        showcase.classList.add('hidden');
    showcase.innerHTML='';
    // Per il titolo della playlist
    const title = json.name;
    const head = document.createElement('h4');
    head.innerHTML = title;
    showcase.appendChild(head);
    const results = json.tracks.total;

    for(let i=0; i<10 ;i++){
        const trackName = json.tracks.items[i].track.name;
        const artistName = json.tracks.items[i].track.artists[0].name;
        const link = json.tracks.items[i].track.external_urls.spotify;

        const elemento = document.createElement('div');
        elemento.innerHTML = trackName +' di ' + artistName;
        const rif = document.createElement('a');
        rif.href=link;
        rif.innerHTML="  Ascolta";
        rif.target="blank";
        console.log(elemento.innerHTML);
        elemento.appendChild(rif);
        showcase.appendChild(elemento);
        showcase.classList.remove('hidden');
    }

    

}



