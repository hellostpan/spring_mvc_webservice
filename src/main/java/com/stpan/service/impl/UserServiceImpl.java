package com.stpan.service.impl;

import com.stpan.entites.User;
import com.stpan.service.UserService;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2016/1/15.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    public User getUserById(String id) {
        return new User(id,20,"stpan");
    }
}
