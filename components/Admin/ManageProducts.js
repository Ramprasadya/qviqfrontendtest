"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter,useParams } from "next/navigation";
import Link from "next/link";
import { SafeLocalStorage, getCookie } from "../utils";
import { UserContext } from "../Contexts/context";

const ManageProducts = ({params}) => {
  const {adminSignOut} = useContext(UserContext);
  const material = params.productType;

  const [products, setProducts] = useState([]);
  const navigate = useRouter();
  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin")?true:false;
    if (!isAdmin) {
      navigate.push("/");
    }

    axios
      .get(`${serverUrl}/product/getProductsbyMaterial/${material}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token_admin"),
    },
  };
  const handleDelete = (productId) => {
    axios
    .delete(`${serverUrl}/product/delete/${productId}`, config)
    .then(() => {
      setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
      );
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      if(error?.response?.data?.error == "INVALID_ADMIN_TOKEN"){
        adminSignOut();
        navigate.push("/admin");
      }
    });
  };

  return (
    <div>
      <h1>Product List {material}</h1>
      {products.map((product) => (
        <Card key={product._id} sx={{ marginBottom: "16px" }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Coupons Applicable:{" "}
              {product.productCoupons
                ? product.productCoupons.join(", ")
                : "No coupons available"}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Price: ₹{product.price}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Images:
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap", // Ensure images stay in a single row
                  overflowX: "auto", // Enable horizontal scrolling if necessary
                }}
              >
                {product.images ? (
                  product.images.map((imageUrl, index) => (
                    <div
                      key={index}
                      style={{
                        flex: "0 0 auto",
                        width: "200px", // Set a fixed width for the images
                        height: "150px", // Set a fixed height for the images
                        marginRight: "8px", // Adjust spacing
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={`Preview ${index + 1}`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%", // Ensure the image fits within the fixed dimensions
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <>No Images</>
                )}
              </div>
            </Typography>

            <Link href={`/editProduct/${product._id}`}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ marginRight: "8px" }}
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
      <Link href="/addProduct" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Add Product
        </Button>
      </Link>
    </div>
  );
};

export default ManageProducts;
