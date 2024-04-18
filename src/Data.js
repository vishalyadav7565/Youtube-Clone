export const API_KEY = 'AIzaSyApoX19du0G40e81KZC4IGtnu42odw6s84';


 export const value_converter =(value)=>{
    if(value >= 1000000){
        return Math.floor(value/100000)+"M";
    }
    else if(value >= 1000){
        return Math.floor(value/1000)+"K";
    }
    else{
       return value
    }
}