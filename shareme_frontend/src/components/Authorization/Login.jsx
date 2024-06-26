import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../../assets/share.mp4";
import logo from "../../assets/logowhite.png";
import { GoogleLogin } from "@react-oauth/google";

import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { client } from "../../client";
const Login = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (codeResponse) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${codeResponse.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            const { name, id, picture } = res.data;
            if (id) {

              const doc = {
                _id: id,
                _type: "user",
                userName: name,
                image: picture,
              };
              client.createIfNotExists(doc).then(() => {
                navigate("/");
              });
            }
          })
          .catch((err) => console.log(err));
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div className="flex justify-start item-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop={true}
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 backdrop-brightness-50">
          <div className="p-5">
            <img src={logo} width="130px" alt="Logo" />
          </div>
          <div className="shadow-2xl">
            <button
              className="bg-white flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={login}
            >
              <FcGoogle className="mr-4" />
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
