import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import ItemService from "../services/ItemService";
import CartItemService from "../services/CartItemService";
import axios from 'axios';
import { useHistory } from "react-router-dom";




export default function Home() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [clothing, setClothing] = useState("All");
  const [type, setType] = useState("All");  
  const history = useHistory();


  useEffect(() => {
    ItemService.getItems().then((res) => {
      console.log(res);
      setItems(res.data);
    });
  }, []);
  const handleChangeCategory = (event) => {
    const name = event.target.name;
    setCategory(event.target.value);
  };
  
  const handleChangeType = (event) => {
    const name = event.target.name;
    setType(event.target.value);
  };
  const onSearch = () => {
    ItemService.getItems().then((res) => {
      console.log(res);
      let r = res.data
        .filter((item) => {
          if (category === "All") return true;
          else return item.category === category;
        })
        .filter((item) => {
          if (clothing === "All") return true;
          else return item.category === category;
        })
        .filter((item) => {
          if (type === "All") return true;
          else if (type === "Discounted items") return item.discount > 0;
          else if (type === "New arrivals") return item.latest === "Yes";
        });
      setItems(r);
    });
  };

  const onAddToCart = (cartItem) => {
    let { name, category, latest, image_url, cost, discount } = cartItem;
    alert("Item successfully added to cart")
    console.log(cartItem);
    CartItemService.addCartItem({ name, category, latest, image_url, cost, discount }).then((res) => console.log(res));
   
  };
  const goToCart = () => {
    history.push("/cart");
  }
  
    const goTolog = () => {
    history.push("/logout");
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <img src={"https://d29qfl7sjqf9f5.cloudfront.net/uploads/image/image/1714518/959051a0-a502-441a-a699-b99fa49e057bphoto.jpg"} alt="" height="80" width="110" />
        	<button
                  style={{ marginTop: "5px" , marginLeft:"1100px"}}
                   className="btn btn-primary"
                   onClick={goToCart}
                  >
                    Cart
            </button>
            <button
                  style={{ marginTop: "5px" , marginLeft:"10px"}}
                   className="btn btn-danger"
                   onClick={goTolog}
                  >
                    Logout
            </button>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container maxWidth="md">
            <div style={{marginTop:"100px"}}>
            <img src={"https://thumbs.dreamstime.com/b/family-shopping-bags-against-blurry-blue-abstract-background-digital-composite-94951450.jpg"} alt="" height="500" width="900" />
                  <FormControl >
                    <InputLabel htmlFor="age-native-simple">
                      Gender
                    </InputLabel>
                    <Select
                      native
                      value={category}
                      onChange={handleChangeCategory}
                      inputProps={{
                        name: "age",
                        id: "age-native-simple",
                      }}
                    >
                      <option value={"All"}>All</option>
                      <option value={"Menswear"}>Menswear</option>
                      <option value={"Womenswear"}>Womenswear</option>
                    </Select>
                  </FormControl>
                
                
               
                  <FormControl >
                    <InputLabel htmlFor="age-native-simple">Preference</InputLabel>
                    <Select
                      native
                      value={type}
                      onChange={handleChangeType}
                      inputProps={{
                        name: "age",
                        id: "age-native-simple",
                      }}
                    >
                      <option value={"All"}>All</option>
                      <option value={"Discounted items"}>
                        Discounted items
                      </option>
                      <option value={"New arrivals"}>New arrivals</option>
                    </Select>
                  </FormControl>
               
                  <button
                  style={{ marginTop: "5px" }}
                   className="btn btn-success"
                   onClick={onSearch}
                  >
                    Filter
                  </button>
            
            </div>
          </Container>
        </div>
        <Container  maxWidth="md">
          <div className="row" style={{
        backgroundColor: 'rgb(175, 251, 255)',
      }}>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Original Cost</th>
              <th>Discount %</th>
              <th>Latest</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  {" "}
                  <img src={item.image_url} alt="" height="80" width="80" />
                </td>
                <td> {item.name} </td>
                <td> {item.category}</td>
                <td> ₹ {item.cost}</td>
                <td> {item.discount}</td>
                <td> {item.latest}</td>
                <td>
                ₹ {parseInt(item.cost-item.cost*item.discount/100.0)}
                  <button
                    style={{marginLeft:"20px"}}
                    className="btn btn-primary"
                    onClick={()=>{axios.post("http://localhost:8080/api/v1/preferences", item); onAddToCart(item);}}
                  >
                    Add to Cart
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </Container>
      </main>
    
    </React.Fragment>
  );
}
