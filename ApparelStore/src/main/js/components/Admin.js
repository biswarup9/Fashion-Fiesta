import React, { useState, useEffect } from "react";
import ItemService from "../services/ItemService";
import { useHistory } from "react-router-dom";

export default function Admin() {
  const [items, setItems] = useState([]);
  const history = useHistory();
  useEffect(() => {
    ItemService.getItems().then((res) => {
      console.log(res);
      setItems(res.data);
    });
  }, []);

  const addItem = () => {
    history.push("/admin/addItem/_add");
  };

  const editItem = (id) => {
    history.push(`/admin/addItem/${id}`);
  };

  const deleteItem = (id) => {
    ItemService.deleteItem(id).then((res) => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

  const goToHome = () => {
    history.push("/home");
  }
  
  return (
    <div>
      <h2 className="text-center">Admin Update Site</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={addItem}>
          {" "}
          Add Item
        </button>
         <button className="btn btn-warning" onClick={goToHome}
         style={{marginLeft:"10px"}}>
          {" "}
          Home
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Discount %</th>
              <th>Latest</th>
              <th> Actions</th>
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
                <td> {item.cost}</td>
                <td> {item.discount}</td>
                <td> {item.latest}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => editItem(item.id)}
                  >
                    Edit{" "}
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-danger"
                    onClick={() => deleteItem(item.id)}
                  >
                    Remove{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
