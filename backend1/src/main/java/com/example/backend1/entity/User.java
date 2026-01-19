package com.example.backend1.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // XAMPP-la intha name-la thaan table create aagum
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    // Default Constructor (Hibernate-ku ithu romba mukkiyam)
    public User() {
    }

    // Parametrized Constructor (Oru vellai neenga use panna ninaicha)
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Getters and Setters (Manual-ah ezhuthiyachu, ippo compilation error varathu)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}