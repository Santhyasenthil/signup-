import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  // 1. DATA-AH XAMPP-LA STORE PANNA (Register)
  const handleRegister = async (e) => {
    e.preventDefault(); // Page refresh aaguratha thadukkum
    
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Backend-ku JSON data-nu sollum
        body: JSON.stringify({ username, password, email }), // Data-ah JSON string-ah mathum
      });

      if (response.ok) {
        alert("Success! Frontend data stored in XAMPP database.");
        setIsSignup(false); // Register aanathum login page-ku mathum
      } else {
        alert("Registration failed! Check if username already exists.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Backend connect aagala! mvn spring-boot:run check pannunga.");
    }
  };

  // 2. STORE AANA DATA-VA CHECK PANNI LOGIN PANNA
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const loggedInUser = await response.text(); 
        // Success aana URL-ah http://localhost:3000/username nu mathum
        window.location.href = window.location.origin + "/" + loggedInUser;
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h2>{isSignup ? "Signup (Store Data in XAMPP)" : "Login"}</h2>
      <form onSubmit={isSignup ? handleRegister : handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" placeholder="Username" 
            value={username} onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        {isSignup && (
          <div style={{ marginBottom: '10px' }}>
            <input 
              type="email" placeholder="Email" 
              value={email} onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
        )}
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password" placeholder="Password" 
            value={password} onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ padding: '5px 15px', cursor: 'pointer' }}>
          {isSignup ? "Register" : "Login"}
        </button>
      </form>

      <p onClick={() => setIsSignup(!isSignup)} style={{ marginTop: '20px', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Signup to store data"}
      </p>
    </div>
  );
}

export default App;