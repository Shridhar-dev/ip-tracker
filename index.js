let lat=51.5;
let long=-0.09;
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: config.MAP_KEY
}).addTo(mymap);

var black_pointer = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize:     [30, 36],
    iconAnchor:   [15, 36],  
  
});

var marker = L.marker([lat, long], {icon: black_pointer}).addTo(mymap);

function fetchIp(){
  fetch(`https://geo.ipify.org/api/v1?apiKey=at_${config.IPIFY_KEY}&ipAddress=`).then((resp)=>{
    if(resp.ok){
      return resp.json();
    }
    throw new Error('Request Failed!')
  },networkError => console.log(networkError.message)
  ).then(jsonResp=>{
    document.getElementById('ipa').innerHTML = jsonResp.ip
    document.getElementById('loc').innerHTML = jsonResp.location.city + ',' + jsonResp.location.region 
    document.getElementById('timez').innerHTML = 'UTC ' + jsonResp.location.timezone
    document.getElementById('isp').innerHTML = jsonResp.isp
    var latlng = L.latLng(jsonResp.location.lat, jsonResp.location.lng);
    marker.setLatLng(latlng)
    mymap.setView([jsonResp.location.lat, jsonResp.location.lng], 13);
  })
}
document.getElementById('mapid').addEventListener('load',fetchIp())


var input_form = document.getElementById('inputer')
var search_button = document.getElementById('search_button')

search_button.addEventListener('click',()=>{
  fetch(`https://geo.ipify.org/api/v1?apiKey=at_${config.IPIFY_KEY}&ipAddress=${input_form.value}`).then((resp)=>{
    if(resp.ok){
      return resp.json();
    }
    throw alert(new Error('Request Failed!'))
  },networkError => alert(networkError.message)
  ).then(jsonResp=>{

    document.getElementById('ipa').innerHTML = jsonResp.ip
    document.getElementById('loc').innerHTML = jsonResp.location.city + ',' + jsonResp.location.region 
    document.getElementById('timez').innerHTML = jsonResp.location.timezone
    document.getElementById('isp').innerHTML = jsonResp.isp
    var latlng = L.latLng(jsonResp.location.lat, jsonResp.location.lng);
    marker.setLatLng(latlng)
    mymap.setView([jsonResp.location.lat, jsonResp.location.lng], 13);
  })
})