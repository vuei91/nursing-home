import React from "react";

const data = await fetch("http://localhost:8080/member/");

const Login = (props) => {
  console.log(props);

  return <div>{props.children}</div>;
};

export default Login;
