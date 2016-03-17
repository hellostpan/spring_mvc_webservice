package com.stpan.controller.webservice;

import com.stpan.entites.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2016/1/14.
 */
@RestController
public class WebServiceController {

    @RequestMapping("/user1")
    public String greeting(@RequestParam(value="name", defaultValue="World") String name) {
        System.out.println(name);
        return "hello: "+name;
    }

    @RequestMapping("/user")
    public Map<String,Object> getUser(@RequestParam(value="name", defaultValue="World") String name) {
        System.out.println(name);
        Map<String,Object> map = new HashMap<String, Object>();
        map.put("code","1");
        map.put("message","success");
        map.put("result",new User("123",21,name));
        return map;
    }

    @RequestMapping("/user1/{name}")
    public User getUser1(@PathVariable(value="name") String name) {
        System.out.println(name);
        return new User("456",21,name);
    }
}
