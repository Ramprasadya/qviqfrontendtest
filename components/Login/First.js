import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function First() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state && location.state.id;
  

  return (
    // <>
    //   <Link to={{ pathname: "/signup", state: { id } }}>
    //     <Button>SignUp</Button>
    //   </Link>
    //   <Link to={{ pathname: "/login", state: { id } }}>
    //     <Button>Login</Button>
    //   </Link>
    // </>
    <>
      <Button onClick={() => navigate("/signup", { state: { id } })}>
        SignUp
      </Button>
      <Button onClick={() => navigate("/login", { state: { id } })}>
        Login
      </Button>
    </>
  );
}
