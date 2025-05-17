import { useContext ,React} from "react";
import { MainContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { updateArrayData } from "../../utils/firebaseFunctions";
import { AiFillDelete } from "react-icons/ai";
function ProductCard({ product }) {
  const { id,name, description, wasPrice, price, imageUrl } = product;
  const navigate = useNavigate();
  const { user,isAdmin } = useContext(MainContext);

  const redirectToLogin = () => {
    navigate("/authenticate");
  };

  const addToCart = async () => {
    await updateArrayData(product);
  };
  const handleDelete=()=>{

  }
  return (
    <div className="product-card">
      <div className="product-card__content">
        <img
          src={imageUrl}
          alt={name}
          className="product-card__content__image"
        ></img>
        <span className="product-card__content__title">{name}</span>
        <div className="product-card__content__price">
          {price}
          <span className="product-card__content__price__slash">
            {wasPrice}
          </span>
        </div>
        
        <span className="product-card__content__description">
          {description}
        </span>
        {user && isAdmin && <div className="product-card__content__icon"><AiFillDelete className="product-card__content__icon" onClick={handleDelete} /></div> }
        
        
      </div>

      <button
        onClick={user ? addToCart : redirectToLogin}
        className="product-card__btn"
      >
        Add to cart
      </button>
    </div>
  );
}
export default ProductCard;