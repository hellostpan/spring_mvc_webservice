package com.stpan.service;

import com.stpan.entites.User;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2016/1/15.
 */
@Service
public interface UserService {
    User getUserById(String id);
}
