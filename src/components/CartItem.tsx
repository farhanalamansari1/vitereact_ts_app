import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"
import StoreItem from "../data/items.json";
import currencyFormat from "../utilities/currencyFormat";

type CartItemProps={
    id:number,
    quantity: number
}
export default function CartItem({id,quantity}: CartItemProps) {
 const {removeFromCart}=useShoppingCart();
 const item=StoreItem.find(i=>i.id===id)
 if(item==null)
 return null

  

 return(
    <Stack direction="horizontal" gap={2} className="d-flex align-item-center">
        <img src={item.imgUrl} style={{width:"125px", height:"75px",objectFit:"cover"} }/> 
        <div className="me-auto">
            <div>
                {item.name}{" "} {quantity > 1 && <span
                 className="text-muted"
                  style={{fontSize: ".65rem"}}>
                    x{quantity}
                    </span>}
            </div>
            <div className="text-muted"  style={{fontSize: ".65rem"}}>{currencyFormat(item.price)}</div>
        </div>
        <div>{currencyFormat(item.price * quantity)}</div>
        <Button variant="outline-danger" size="sm" onClick={()=> removeFromCart(item.id)}>&times;</Button>
       
    </Stack>
 )
}
