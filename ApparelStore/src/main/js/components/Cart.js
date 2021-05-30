import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import CartItemService from "../services/CartItemService";


export default function Home() {
  const [items, setItems] = useState([]);
  const [sum, setSum] = useState(0);
  const history = useHistory();


  useEffect(() => {
    CartItemService.getCartItems().then((res) => {
      console.log(res);
      setItems(res.data);
      let sum = 0;
      res.data.forEach(item=>{sum += parseInt(
        item.cost * (1.0 - item.discount / 100.0))});
      setSum(sum);      
    });
  }, []);
  
  const goToHome = () => {
    history.push("/home");
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <img src={"https://d29qfl7sjqf9f5.cloudfront.net/uploads/image/image/1714518/959051a0-a502-441a-a699-b99fa49e057bphoto.jpg"} alt="" height="80" width="110" />
        <button
                  style={{ marginTop: "10px" , marginLeft:"1100px"}}
                   className="btn btn-warning"
                   onClick={goToHome}
                  >Home</button>
        </Toolbar>
      </AppBar>
      <main>
        <div >
          <Container maxWidth="md">
            
            <div style={{marginTop:"100px"}}>
              <h2>
                 Total:  ₹ {sum}
               </h2>
            </div>
          </Container>
        </div>
        <Container  maxWidth="md">
          <div className="row">
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
