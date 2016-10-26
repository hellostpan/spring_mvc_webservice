package com.stpan.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stpan.entites.User;
import com.stpan.service.UserService;
import com.stpan.utils.FileUtil;
import com.sun.javafx.css.converters.FontConverter;
import com.sun.javafx.tk.*;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.SystemUtils;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import sun.font.FontDesignMetrics;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.FontMetrics;
import java.awt.font.FontRenderContext;
import java.awt.geom.AffineTransform;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;


@Controller
@RequestMapping("/hello")
public class CourseController {

    private UserService userService;
    private Logger log = Logger.getLogger(CourseController.class);

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    //本方法将处理 /hello/hello1?name=stpan 形式的URL
    @RequestMapping(value = "/hello1", method = RequestMethod.GET)
    public String hello1(@RequestParam("name") String name, Model model) {
        return "successful";
    }

    //本方法将处理 /hello/hello2/stpan 形式的URL
    @ResponseBody//返回json字符串
    @RequestMapping("/hello2/{name}")
    public User hello2(@PathVariable("name") String name, Map<String, Object> model) {
        System.out.println("name: " + name);
        log.debug("debug: " + name);
        log.fatal("fatal: " + name);
        log.error("error: " + name);
        return new User("123123123", 21, name);
    }

    //本方法将处理 /hello/hello3?name=stpan 形式的URL
    @RequestMapping("/hello3")
    public String hello3(HttpServletRequest request) {
        return "successful";
    }

    //返回json字符串
    @RequestMapping(value = "/json/back1/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    User getCourseInJson(@PathVariable String id) {
        return userService.getUserById(id);
    }

    //返回json字符串
    @RequestMapping(value = "/json/back2/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getCourseInJson2(@PathVariable String id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET, params = "add")
    public String createCourse() {
        return "course_admin/edit";
    }


    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String doSave(@ModelAttribute User user) {
        log.debug(ReflectionToStringBuilder.toString(user));
        //在此进行业务操作，比如数据库持久化
        return "redirect:hello2/" + user.getName();
    }

    @RequestMapping(value = "/upload", method = RequestMethod.GET)
    public String showUploadPage(@RequestParam(value = "multi", required = false) Boolean multi) {
        if (multi != null && multi) {
            return "success";
        }
        return "success";
    }

    @ResponseBody
    @RequestMapping(value = "/upload/img", method = RequestMethod.POST)
    public String doUploadFile(@RequestParam("file") MultipartFile file,HttpServletRequest request) throws IOException {
        if (!file.isEmpty()) {
            FileUtils.copyInputStreamToFile(file.getInputStream(), new File(FileUtil.getFileDir(request), System.currentTimeMillis() + file.getOriginalFilename()));
        }
        return "success";
    }

    @RequestMapping(value = "/doUpload2", method = RequestMethod.POST)
    public String doUploadFile2(MultipartHttpServletRequest multiRequest) throws IOException {
        Iterator<String> filesNames = multiRequest.getFileNames();
        while (filesNames.hasNext()) {
            String fileName = filesNames.next();
            MultipartFile file = multiRequest.getFile(fileName);
            if (!file.isEmpty()) {
                FileUtils.copyInputStreamToFile(file.getInputStream(), new File("d:\\stpan\\", System.currentTimeMillis() + file.getOriginalFilename()));
            }

        }
        return "success";
    }

    @ResponseBody
    @RequestMapping(value = "/findFontFamilyNames",method = RequestMethod.POST)
    public String findFontFamilyNames(){
        GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
        String[] fontNames = ge.getAvailableFontFamilyNames();
		ObjectMapper om = new ObjectMapper();
        String fonts = null;
        try {
            fonts = om.writeValueAsString(fontNames);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        //System.out.println(fonts);
        return fonts;
    }

    @ResponseBody
    @RequestMapping(value = "/getTextPng", method = RequestMethod.POST)
    public String getTextPng( String word,int fontColorR,int fontColorG,int fontColorB,int fontSize,boolean isBold,boolean isItalic,String fontFamilyName, HttpServletRequest request) throws IOException {
        /*System.out.println("word: "+word);
        System.out.println("fontColorR: "+fontColorR);
        System.out.println("fontColorG: "+fontColorG);
        System.out.println("fontColorB: "+fontColorB);
        System.out.println("fontSize: "+fontSize);
        System.out.println("isBold: "+isBold);
        System.out.println("isItalic: "+isItalic);
        System.out.println("fontFamilyName: "+fontFamilyName);*/
        File file = FileUtil.getFileDir(request);
        int fontStyle = Font.PLAIN;
        if (isBold){
            fontStyle+=Font.BOLD;
        }
        if (isItalic){
            fontStyle+=Font.ITALIC;
        }

        String imageName = System.currentTimeMillis()+".png";
        File image = new File(file.getAbsolutePath()+"/"+imageName);
        getPng(word,image,new Color(fontColorR,fontColorG,fontColorB),fontStyle,fontSize,fontFamilyName);
        String result = "http://192.168.1.113/temp_file/"+imageName;
        System.out.println(result);
        return result;
    }

    private void getPng(String str,File file,Color fontColor,int fontStyle,int fontSize,String fontFamilyName) throws IOException {
        Font font = new Font(fontFamilyName, fontStyle, fontSize);

        Rectangle2D r = font.getStringBounds(str, new FontRenderContext(AffineTransform.getScaleInstance(1, 1), false, false));

        int unitHeight = (int) Math.floor(r.getHeight()+3);//获取单个字符的高度
        //获取整个str用了font样式的宽度这里用四舍五入后+1保证宽度绝对能容纳这个字符串作为图片的宽度
        int width = (int) Math.round(r.getWidth())+3;
        int height = unitHeight;//把单个字符的高度+3保证高度绝对能容纳字符串作为图片的高度
        //创建图片
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_BGR);

        Graphics2D g = image.createGraphics();
        image = g.getDeviceConfiguration().createCompatibleImage(width, height, Transparency.TRANSLUCENT);
        g.dispose();
        g = image.createGraphics();
        g.setColor(fontColor);//在换成黑色
        g.setFont(font);//设置画笔字体
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);//抗锯齿
        g.drawString(str, 0, font.getSize());//画出字符串
        g.dispose();
        ImageIO.write(image, "png", file);//输出png图片
    }
}
