import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        
        // Calculate the expiration time (5 minutes from the current time)
        const expirationTime = new Date().getTime() + 5 * 60 * 1000;
        
        // Save the token and expiration time in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", expirationTime);
        
        window.location.href = "/dashboard"; // Redirect to dashboard page after successful login
      } else {
        const data = await response.json();
        console.log(data.message); // Display the error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{" "}
        <span onClick={() => (window.location.href = "/register")}>Register</span>
      </p>
    </div>
  );
};

export default Login;
