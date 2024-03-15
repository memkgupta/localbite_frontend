import { Restaurant } from "@/types";
import { createContext, useContext } from "react";
// "id","name","price","category","availability","category","rating","preparationTime"


interface RestaurantContextProps {
    data:Restaurant,
    setData:(data:Restaurant)=>void
}
export const RestaurantContext = createContext<RestaurantContextProps>({
    data:{id:null,menuItems:[],name:'',description:'',user_id:null},
    setData:(data:Restaurant)=>{}
});

export const RestaurantContextProvider = 
RestaurantContext.Provider;

