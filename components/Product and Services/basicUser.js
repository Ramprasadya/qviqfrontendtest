import react, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Switch from "react-switch";
import { Button, Modal } from "reactstrap";
import axios from "axios";
import { serverUrl } from "../../config";

const BasicUser = () => {
  const [product, setProduct] = useState(true);
  const [services, setServices] = useState(false);
  const [label, setLabel] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDescription, setProductDescription] = useState();
  const [serviceName, setServiceName] = useState();
  const [serviceDescription, setServiceDescription] = useState();
  const [productData, setProductData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [proCount, setProCount] = useState();
  const [userData, setUserData] = useState([]);
  const [serCount, setSerCount] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [img, setImg] = useState();

  const profile = useParams();

  const handleProduct = () => {
    setProduct(true);
    setServices(false);
  };

  const handleServices = () => {
    setServices(true);
    setProduct(false);
  };

  const handleLabel = async () => {};

  const handleAddProduct = () => {
    setProductModal(true);
  };

  const handleAddService = () => {
    setServiceModal(true);
  };

  const [fieldRequired, setFieldRequired] = useState(false);

  const handleProductSubmit = () => {
    var formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("image", img);

    const { data } = fetch(
      `${serverUrl}/productsandservices/addproduct/basic/${profile.profile}`,
      {
        method: "POST",
        body: formData,
        profile: profile.profile,
      }
    )
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => console.error(error));

    // const { data } = axios.post(
    // `${serverUrl}/productsandservices/addproduct/basic/${profile.profile}`,
    // {
    //     productName:productName,
    //     productDescription:productDescription,
    //     productPrice:productPrice,
    //     profile:profile.profile
    // });
    setProductName(" ");
    setProductDescription(" ");
    setProductPrice(" ");
    setProductModal(false);
  };

  const handleServiceSubmit = () => {
    var formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("serviceDescription", serviceDescription);
    formData.append("image", img);

    const { data } = fetch(
      `${serverUrl}/productsandservices/addservice/basic/${profile.profile}`,
      {
        method: "POST",
        body: formData,
        profile: profile.profile,
      }
    )
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => console.error(error));
    // const { data } = axios.post(
    // `${serverUrl}/productsandservices/addservice/basic/${profile.profile}`,
    // {
    //     serviceName:serviceName,
    //     serviceDescription:serviceDescription,
    //     profile:profile.profile
    // });
    setServiceModal(false);
  };

  const productInfo = async () => {
    const { data } = await axios.get(
      `${serverUrl}/productsandservices/getproduct/basic/${profile.profile}`
    );

    setProductData(data);
  };

  // useEffect(() => {
  //     productInfo();
  //     console.log(productData);
  //   }, []);

  //get product and service count
  // const count = async () => {
  //     const res = await axios.get(
  //         `${serverUrl}/productsandservices/getcount/${profile.profile}`,
  //     );
  //     // console.log(data);
  //     // console.log(data[0]);
  //     // setUserData(data);
  //     // console.log(userData);
  //     // console.log(userData.productCount);
  //     // console.log(userData.serviceCount);
  //     // setProCount(userData[0].productCount);
  //     // console.log(proCount);
  //     // setSerCount(userData[0].serviceCount);
  //     // console.log(serCount);
  //     console.log(res.data);
  //     console.log(res.data.productCount);
  //     setProCount(res.data.productCount);
  //     console.log(proCount);
  // }

  // useEffect(() => {
  //     count();
  //   }, []);

  const serviceInfo = async () => {
    const { data } = await axios.get(
      `${serverUrl}/productsandservices/getservice/basic/${profile.profile}`
    );

    setServiceData(data);
  };

  useEffect(() => {
    // Fetch data from backend API and set it to the state
    const fetchData = async () => {
      const response = await fetch(
        `${serverUrl}/productsandservices/getcount/${profile.profile}`
      );
      const result = await response.json();
      setUserData(result);
      setProCount(result[0].productCount);
      setSerCount(result[0].serviceCount);
    };
    fetchData();
    serviceInfo();
    productInfo();
  }, []);

  // useEffect(() => {
  //     serviceInfo();
  //     console.log(serviceData);
  //   }, []);

  const handleProDelete = (id) => {
    try {
      const res = fetch(
        `${serverUrl}/productsandservices/deleteproduct/${profile.profile}/${id}`,
        {
          method: "DELETE",
          body: id,
          profile: profile.profile,
        }
      );
    } catch (err) {
      // console.log(err);
    }
  };

  const handleSerDelete = (id) => {
    try {
      const res = fetch(
        `${serverUrl}/productsandservices/deleteservice/${profile.profile}/${id}`,
        {
          method: "DELETE",
          body: id,
          profile: profile.profile,
        }
      );
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="content-center">
      <div>
        <h1>Product and Services</h1>
      </div>
      <div>
        <button className="btn" onClick={handleProduct}>
          Products
        </button>
        <button className="btn" onClick={handleServices}>
          {" "}
          Services
        </button>
      </div>

      {/* Show products */}
      {product && (
        /* productPage */
        <div className="products">
          <div>
            <h3>Select a label for your products</h3>
            <button className="btn rounded-full" onClick={handleLabel}>
              My store
            </button>
            <button className="btn rounded-full" onClick={handleLabel}>
              Products
            </button>
            <button className="btn rounded-full" onClick={handleLabel}>
              Resources and assets
            </button>
            <button
              className="btn-secondary rounded-full"
              onClick={handleLabel}
            >
              Add new label
            </button>
          </div>
          <div>
            <h3>My store</h3>
          </div>

          <div>
            <Switch
              onColor="#52c41a"
              offColor="#f5222d"
              checkedIcon={false}
              uncheckedIcon={false}
              width={50}
            />
          </div>

          <div>
            <button
              className="btn-secondary"
              onClick={handleAddProduct}
              disabled={proCount >= 4 || serCount >= 1}
            >
              Add Products
            </button>
          </div>
          {/* displaying products */}
          <div>
            {productData.length != 0 ? (
              <>
                {productData.map((obj, index) => (
                  <div className="flex first-container" key={index}>
                    <div className="card">
                      <div>
                        {/* <img src={require(`../Tapop-Project-frontend/src/components/uploads/img-1678874318100. Catexe.jpg`)} alt={obj.imageName} /> */}
                      </div>
                      <div>
                        <h3>{obj.productName}</h3>
                      </div>
                      <div>
                        <p>{obj.productDescription}</p>
                      </div>
                      <div>
                        <h2>{obj.productPrice}</h2>
                      </div>
                      <div>
                        <button
                          className="btn"
                          onClick={() => setDeleteModal(!deleteModal)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <Modal isOpen={deleteModal}>
                      <div>
                        <div>Delete Product</div>
                        <h2>
                          Are you sure you want to delete the product {} from
                          your profile?
                        </h2>
                        <button
                          className="btn"
                          onclick={() => setDeleteModal(!deleteModal)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn"
                          onclick={() => {
                            handleProDelete(obj._id);
                          }}
                        >
                          {" "}
                          Delete
                        </button>
                      </div>
                    </Modal>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div>
                  <h2>You don't have any products yet</h2>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Product Modal */}
      <Modal isOpen={productModal}>
        <div>
          <h2>Add Product</h2>
        </div>
        <div>
          <h3>Product Name</h3>
          <input
            placeholder="Product name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <h3>Price</h3>
          <input
            type="number"
            placeholder=""
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <select></select>
        </div>
        <div>
          <h3>Product Description</h3>
          <textarea
            placeholder="Type or paste product description here..."
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <p>Type or paste up to 100 words</p>
        </div>
        <div>
          <h3>Product Image</h3>
          <input
            type="file"
            alt="Upload or Drag & drop a product image"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div>
          <button
            className="btn-secondary rounded-full"
            onClick={() => setProductModal(!productModal)}
          >
            Cancel
          </button>
          <button
            className="btn-secondary rounded-full"
            onClick={handleProductSubmit}
            disabled={true}
          >
            Save
          </button>
        </div>
      </Modal>

      {/* show services */}
      {services && (
        /* ServicePage */
        <div className="services">
          <div>
            <h3>Select a label for your services</h3>
            <button className="btn rounded-full">My offerings</button>
            <button className="btn rounded-full">Services we Provide</button>
            <button className="btn rounded-full">Speciality</button>
            <button
              className="btn-secondary rounded-full"
              onClick={handleLabel}
            >
              Add new label
            </button>
          </div>
          <div>
            <h3>My Offerings</h3>
          </div>
          <div>
            <Switch
              // checked={off.isOn}
              // onChange={(value) => handleToggle(index, value)}
              onColor="#52c41a"
              offColor="#f5222d"
              checkedIcon={false}
              uncheckedIcon={false}
              width={50}
            />
          </div>
          <div>
            <button
              className="btn-secondary"
              onClick={handleAddService}
              disabled={serCount >= 4 || proCount >= 1}
            >
              Add Services
            </button>
          </div>
          {/* displaying services  */}
          <div>
            {serviceData.length != 0 ? (
              <>
                {serviceData.map((obj, index) => (
                  <div className="flex first-container" key={index}>
                    <div className="card">
                      <div>
                        <img src={obj.imagePath} alt={obj.imageName} />
                      </div>
                      <div>
                        <h3>{obj.serviceName}</h3>
                      </div>
                      <div>
                        <p>{obj.serviceDescription}</p>
                      </div>
                      <div>
                        <button
                          className="btn"
                          onClick={() => {
                            handleSerDelete(obj._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div>
                <h1>You don't have any services added yet!</h1>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Service Modal */}
      <Modal isOpen={serviceModal}>
        <div className="header">
          <h3>Add Services</h3>
        </div>
        <div>
          <h3>Service Name</h3>
          <input
            placeholder=""
            onChange={(e) => setServiceName(e.target.value)}
          />
        </div>
        <div>
          <h3>Service Description</h3>
          <textarea
            placeholder="Type or paste product description here..."
            onChange={(e) => setServiceDescription(e.target.value)}
          />
          <p>Type or paste upto 100 words</p>
        </div>
        <div>
          <h3>Product Image or Icon</h3>
          <input
            type="file"
            alt="Upload or Drag and drop an image"
            name=""
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div>
          <button
            className="btn-secondary rounded-full"
            onClick={() => setServiceModal(!serviceModal)}
          >
            Cancel
          </button>
          <button
            className="btn-secondary rounded-full"
            onClick={handleServiceSubmit}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BasicUser;
