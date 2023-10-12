package com.example.demo.DAO;

import com.example.demo.models.Hotel;

import java.util.ArrayList;
import java.util.List;

public class HotelsDAO {

    private static  int HOTELS_COUNT;
    private static List<Hotel> hotelList=new ArrayList<>();

    {
        hotelList.add(new Hotel(++HOTELS_COUNT,"The Holidays"));
        hotelList.add(new Hotel(++HOTELS_COUNT,"The River Side"));
        hotelList.add(new Hotel(++HOTELS_COUNT,"The Paradise"));
    }


    public List<Hotel> index(){
        return hotelList;
    }
    public static Hotel show(int id){
        return hotelList.stream().filter(hotel -> hotel.getId()==id).findAny().orElse(null);
    }
    public static void save(Hotel hotel){
        hotel.setId((++HOTELS_COUNT));
        hotelList.add(hotel);
    }
    public static void update(int id,Hotel hotel){
        Hotel hotelToUpdate=show(id);
        hotelToUpdate.setName(hotel.getName());
    }
    public static void delete(int id){
        hotelList.removeIf(hotel -> hotel.getId()==id);
    }
}
