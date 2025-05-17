import { Link, useLocation,useNavigate } from "react-router-dom";//USE LOCATION L E3REF L PATH LE ANA 3LE
import { isStoreSelected, isCartSelected,isAddProductsSelected} from "../../../utils/checkRoutes";
import { useContext } from "react";
import { MainContext } from "../../../utils/context";
import React from "react";
import { signOutUser } from "../../../utils/firebaseFunctions";
import { TailSpin } from "react-loader-spinner";
import { count } from "firebase/firestore";
function DesktopMenu() {
  const { user, loading, cartProducts,isAdmin } = useContext(MainContext);
  const loc = useLocation();
  const navigate = useNavigate();
  const signOut = async () => {
    await signOutUser();
  };

  return (
    <>
      <Link
        to="/"
        className={`navbar__right-side__item
              ${
                isStoreSelected(loc.pathname) &&
                "navbar__right-side__item--selected"
              }`}
      >
        Store
      </Link>
      <div className="navbar__right-side__item">
        <Link
          to="/cart"
          className={`navbar__right-side__item navbar__right-side__item--cart-count
              ${
                isCartSelected(loc.pathname) &&
                "navbar__right-side__item--selected"
              }`}
        >
          Cart
        </Link>
        
        {user && cartProducts && (
          <div className="navbar__right-side__cart-count">
            {cartProducts.length}
          </div>
        )}
        {user && isAdmin && (
        <Link
          to="/addProducts"
          className={` navbar__right-side__item ${
            isAddProductsSelected(loc.pathname)
              ? 'navbar__right-side__item--selected'
              : ''
          }`}
        >
          <p>Add Products</p>
        </Link>
      )}
      </div>
      {loading ? (
        <TailSpin
          height="30"
          width="30"
          color="#3b4142"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : user ? (
        <button onClick={signOut} className="navbar__right-side__btn primary">
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => navigate("/authenticate")}
          className="navbar__right-side__btn primary"
        >
          Login
        </button>
      )}
    </>
  );
}
export default DesktopMenu;