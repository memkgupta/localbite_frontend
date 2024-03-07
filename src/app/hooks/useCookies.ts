import Cookies from 'js-cookie';
const useCookie = (cookie:string)=>{
    const cookieValue = Cookies.get(cookie);
    if(cookieValue){
        return cookieValue;
    }
    else{
        return null;
    }
}
export default useCookie;