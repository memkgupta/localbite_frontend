export type MenuItem = {
    id:number,
    name:string,
    price:number,
    category:string,
    availability:boolean,
    rating:number,
    preparationTime:string
}

export type Restaurant = {
    id:number|null,
    user_id:number|null,
    name:string,
    description:string,
    menuItems:MenuItem[]
}
// <option value="">Select a category</option>
// <option value="ITALIAN">Italian</option>
// <option value="INDIAN">Indian</option>
// <option value="FAST_FOOD">Fast Food</option>
// <option value="CHINESE">Chinese</option>
// <option value="SHAKES">Shakes</option>
// <option value="VEGAN">Vegan</option>
export const CATEGORIES = [
    "ITALIAN","INDIAN","FAST_FOOD","CHINESE","SHAKES","VEGAN"
]