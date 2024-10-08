import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MAIN_URL } from "../URLS/URLS";
import "./AllProuducts.css";
import axios from "axios";
import { ContextApi } from "../../Context/AuthContext";
import { handeMessage } from "../SweetAlert/SweetAlert";
import Swal from "sweetalert2";
function AllProuducts() {
  const [products, setProducts] = useState([]);
  const { currentUser } = useContext(ContextApi);
  const cat = useLocation().search;
  const navigate = useNavigate();
  const deleteProduct = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${MAIN_URL}/product/${id}`);
          handeMessage("success", "Delete Produt Successfully!");

          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      });
    } catch (error) {
      handeMessage("error", error.response.data);
    }
  };
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`${MAIN_URL}/product${cat}`);
        setProducts(res.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllProducts();
  }, [cat]);
  return (
    <div className="AllProducts">
      {products?.length ? (
        products.map((prod) => {
          return (
            <div key={prod.product_id}>
              <div className="card_all">
                <div className="header-product">
                  <p className="card-title">{prod.title}</p>
                </div>
                {prod?.users_id === currentUser?.id && (
                  <div className="button-contetn">
                    <button
                      onClick={() => deleteProduct(prod.product_id)}
                      className="btn btn-danger button"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/add?edit=${prod.users_id}`}
                      state={prod}
                      className="btn btn-primary button"
                    >
                      Edit
                    </Link>
                  </div>
                )}

                <div className="image-content">
                  <img
                    className="card-img-top"
                    src={`../upload/${prod.images}`}
                    alt="Card "
                    draggable="false"
                    style={{
                      width: "100%",
                      height: "90%",
                      marginTop: "20px",
                    }}
                  />
                </div>
                <Link
                  to={`/details/${prod.product_id}`}
                  className="btn btn-dark btn_all"
                >
                  Show Details
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ width: "100%", background: "blue" }}>
          <h2
            style={{
              width: "50%",
              background: "red",
              margin: "auto",
            }}
          >
            There Is No Product To Show
          </h2>
        </div>
      )}
    </div>
  );
}

export default AllProuducts;
// export default AllProducts;
