package com.example.demo.models;

import java.io.Serializable;

public class Hotel implements Serializable {
    private int id;
    private String name;


    public Hotel(int id, String name) {
        this.id = id;
        this.name = name;

    }
    public  Hotel(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    @Override
    public String toString() {
        return "Hotel{" +
                "id ='"+id+'\'' +
                ", name ='" + name+ '\'' +
                '}';
    }
}
