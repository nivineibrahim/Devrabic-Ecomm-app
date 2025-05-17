import React from "react";
import { useState } from "react";
import {collection,doc,setDoc} from "firebase/firestore";
import {database} from "../utils/firebaseConfig";
function AddProducts(){
    const [inputs, setInputs] = useState({
        image:null,
        title: "",
        price: "",
        wasPrice:"",
        description:""
      });
      const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleAdd=async(e)=>{
    e.preventDefault();
    try{
      const productRef=collection(database,"products");
      const docRef=doc(productRef);
      await setDoc(docRef,{
        image:inputs.image,
        title:inputs.title,
        price:inputs.price,
       // wasPrice:inputs.wasPrice,
        description:inputs.description
      })
      alert("product added usung setDoc");
      setInputs({image:"",title:"",price:"",wasPrice:"",description:""});
    }catch(error){
      alert(error);
    }

  }
    return(
        <div className="authenticate">
            <form onSubmit={handleAdd} className="form">
      <h2 className="form__title">Add a product</h2>
      <div className="form__group">
        <label className="form__label" htmlFor="file">
          Image
        </label>
        <input
          className="form__input"
          onChange={handleInputChange}
          value={inputs.image}
          type="file"
          name=" "
          required
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="title">
          Title
        </label>
        <input
          className="form__input"
          onChange={handleInputChange}
          value={inputs.title}
          type="text"
          name="title"
          required
          placeholder="Enter your title"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="price">
          Price
        </label>
        <input
          className="form__input"
          onChange={handleInputChange}
          value={inputs.price}
          type="number"
          name="price"
          required
          placeholder="Enter your price"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="wasprice">
          Was Price
        </label>
        <input
          className="form__input"
          onChange={handleInputChange}
          value={inputs.wasPrice}
          type="number"
          name="wasprice"
          required
          placeholder="Enter your 'was price' "
        />
      </div>
      <div className="form__group">
        <label htmlFor="description" className="form__label">Description</label>
        <textarea id="description" name="description" className="form__input" value={inputs.description} onChange={handleInputChange}/>
      </div>
      
      
      <button className="form__button primary" type="submit">
        Add
      </button>
    </form>
        </div>
    
    )
}
export default AddProducts;