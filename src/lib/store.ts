import { MenuItem, Restaurant } from "@/types"
import {create} from "zustand"

export type RestaurantState = {
    data:Restaurant
}
export type Actions = {
    setData : (data:Restaurant)=>void,
    addMenuItem:(item:MenuItem)=>void
    updateMenuItem:(id:number,item:MenuItem)=>void
    removeMenuItem:(id:number)=>void
}
export const useRestaurantStore = create<RestaurantState & Actions>()((set)=>({
data:{id:null,name:'',description:'',user_id:null,menuItems:[]},
setData:(data:Restaurant)=>set((state)=>(
   {...state,data:data}
)),
addMenuItem:(item:MenuItem)=>set((state)=>(
{data:{...state.data,menuItems:[...state.data.menuItems,item]}}
)),
removeMenuItem:(id:number)=>set((state)=>{
 
   return {data:{...state.data,menuItems:state.data.menuItems.filter((menu_item)=>menu_item.id!==id)}}
    
}),
updateMenuItem:(id:number,item:MenuItem)=>set((state)=>{
    // var menuItemsFiltered = ;
   return {data:{...state.data,menuItems:state.data.menuItems.map((menu_item)=>menu_item.id=== id ?item:menu_item)}}
    
})

}))