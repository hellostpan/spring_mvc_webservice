package com.stpan.controller;

import com.stpan.entites.User;
import com.stpan.service.UserService;
import org.apache.commons.io.FileUtils;
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

import javax.servlet.http.HttpServletRequest;
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
	@RequestMapping(value="/hello1", method=RequestMethod.GET)
	public String hello1(@RequestParam("name") String name, Model model) {
		return "successful";
	}
	
	//本方法将处理 /hello/hello2/stpan 形式的URL
	@ResponseBody//返回json字符串
	@RequestMapping("/hello2/{name}")
	public User hello2(@PathVariable("name") String name, Map<String, Object> model) {
		System.out.println("name: "+name);
		log.debug("debug: "+name);
		log.fatal("fatal: "+name);
		log.error("error: "+name);
		return new User("123123123",21, name);
	}

	//本方法将处理 /hello/hello3?name=stpan 形式的URL
	@RequestMapping("/hello3")
	public String hello3(HttpServletRequest request) {
		return "successful";
	}

	//返回json字符串
	@RequestMapping(value="/json/back1/{id}",method=RequestMethod.GET)
	public @ResponseBody User getCourseInJson(@PathVariable String id){
		return userService.getUserById(id);
	}

	//返回json字符串
	@RequestMapping(value="/json/back2/{id}",method=RequestMethod.GET)
	public ResponseEntity<User> getCourseInJson2(@PathVariable String id){
		User user =   userService.getUserById(id);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@RequestMapping(value="/admin", method = RequestMethod.GET, params = "add")
	public String createCourse(){
		return "course_admin/edit";
	}


	@RequestMapping(value="/save", method = RequestMethod.POST)
	public String  doSave(@ModelAttribute User user){
		log.debug(ReflectionToStringBuilder.toString(user));
		//在此进行业务操作，比如数据库持久化
		return "redirect:hello2/"+user.getName();
	}

	@RequestMapping(value="/upload", method=RequestMethod.GET)
	public String showUploadPage(@RequestParam(value= "multi", required = false) Boolean multi){
		if(multi != null && multi){
			return "success";
		}
		return "success";
	}

	@RequestMapping(value="/doUpload", method=RequestMethod.POST)
	public String doUploadFile(@RequestParam("file") MultipartFile file) throws IOException{
		if(!file.isEmpty()){
			FileUtils.copyInputStreamToFile(file.getInputStream(), new File("d:\\stpan\\", System.currentTimeMillis()+ file.getOriginalFilename()));
		}
		return "success";
	}

	@RequestMapping(value="/doUpload2", method=RequestMethod.POST)
	public String doUploadFile2(MultipartHttpServletRequest multiRequest) throws IOException{
		Iterator<String> filesNames = multiRequest.getFileNames();
		while(filesNames.hasNext()){
			String fileName =filesNames.next();
			MultipartFile file =  multiRequest.getFile(fileName);
			if(!file.isEmpty()){
				FileUtils.copyInputStreamToFile(file.getInputStream(), new File("d:\\stpan\\", System.currentTimeMillis()+ file.getOriginalFilename()));
			}

		}
		return "success";
	}


}
