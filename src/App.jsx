import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Store from "./pages/store";
import Cart from "./pages/cart";
import Authenticate from "./pages/authenticate";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "./utils/firebaseConfig";
import { MainContext } from "./utils/context";
import { useEffect, useState } from "react";
import { fetchUserData, setupDBListener } from "./utils/firebaseFunctions";
import { products } from "./utils/products";
import AddProducts from "./pages/add-products";
function App() {
  const [user, loading] = useAuthState(auth);
  const [cartProducts, setCartProducts] = useState();
  const [username, setUsername] = useState();
  const [isAdmin,setIsAdmin]=useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    user && fetchUser();
  }, [user]);

  useEffect(() => {
    if (!loading && user) {
      setupDBListener(user, (data) => {
        const updatedProducts = products.filter((product) => {
          return !data.some((cartProduct) => cartProduct.id === product.id);
        });
        setFilteredProducts(updatedProducts);
        setCartProducts(data);
      });
    }
  }, [loading, user]);
  const fetchUser = async () => {
    const res = await fetchUserData(user);
    if (res.success) {
      console.log(res);
      setUsername(res.data.username);
      setCartProducts(res.data.cartProducts);
      setIsAdmin(res.data.isAdmin);
    }
  };

  return (
    <>
      <MainContext.Provider
        value={{ user, loading, cartProducts, username, filteredProducts,isAdmin }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Store />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/authenticate" element={<Authenticate />}></Route>
          <Route path="/addProducts" element={<AddProducts />}></Route>
        </Routes>
      </MainContext.Provider>
    </>
  );
}

export default App;