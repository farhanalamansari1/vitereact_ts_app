import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import CartItem from "./CartItem";
import StoreItem from "../data/items.json";
import currencyFormat from "../utilities/currencyFormat";
type ShoppingCartProps={
    isOpen: boolean
}

export default function ShoppingCart({isOpen}:ShoppingCartProps) {
    const {closeCart,cartItems}=useShoppingCart();
  return (
  <Offcanvas show={isOpen} onHide={closeCart} placement="end">
    <Offcanvas.Header closeButton>
        <Offcanvas.Title></Offcanvas.Title>
        <Offcanvas.Body>
            <Stack gap={3}>{cartItems.map(item=>(
                <CartItem key={item.id} {...item} />
            ))}
             <div className="ms-auto fw-bold fs-5">
            Total {" "}
            {currencyFormat(cartItems.reduce( (total,CartItem)=>{
            const item=StoreItem.find(i=>i.id===CartItem.id)
            return total+ (item?.price ||0 )* CartItem.quantity
            },0))}
        </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas.Header>
  </Offcanvas>
  )
}
