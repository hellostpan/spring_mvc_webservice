package com.stpan.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stpan.entites.BusinessCard;
import com.sun.org.apache.bcel.internal.generic.PUSH;

import java.io.IOException;

/**
 * Created by stpan on 2016/10/31 17:56.
 */
public class JsonUtil {
    private static ObjectMapper mapper = new ObjectMapper();

    public static String toJsonStr(Object o){
        try {
            return mapper.writeValueAsString(o);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "";
    }

    public static BusinessCard toObject(String jsonStr){
        try {
            return mapper.readValue(jsonStr,BusinessCard.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new BusinessCard();
    }
}
