package com.example.demo.controllers;

import com.example.demo.DAO.HotelsDAO;
import com.example.demo.models.Hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/hotelList")
public class HotelsController {
   private final HotelsDAO hotelsDAO=new HotelsDAO();

    @GetMapping()
    public String index(Model model){
        model.addAttribute("hotelList",hotelsDAO.index());
        return "hotelList/index";
    }
    @GetMapping("/{id}")
    public String show(@PathVariable("id") int id, Model model){
            model.addAttribute("hotel",hotelsDAO.show(id));
            return "hotelList/show";
    }
    @GetMapping("/new")
    public String newHotel( Model model){
        model.addAttribute("hotel",new Hotel());
        return "hotelList/new";
    }
    @PostMapping()
    public String create(@ModelAttribute("hotel")Hotel hotel){
        hotelsDAO.save(hotel);
        return "redirect:/hotelList";
    }
    @GetMapping("/{id}/edit")
    public  String edit(Model model,@PathVariable("id") int id){
        model.addAttribute("hotel",hotelsDAO.show(id));
        return "hotelList/edit";
    }
    @PostMapping("/{id}")
    public String update(@ModelAttribute("hotel") Hotel hotel,@PathVariable("id") int id){
        hotelsDAO.update(id, hotel);
        return "redirect:/hotelList";
    }
    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") int id){
        hotelsDAO.delete(id);
        return "redirect:/hotelList";
    }
}
