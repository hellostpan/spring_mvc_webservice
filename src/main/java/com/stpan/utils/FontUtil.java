package com.stpan.utils;

import java.awt.*;
import java.io.*;
import java.util.ArrayList;

/**
 * Created by stpan on 2016/11/3 11:30.
 */
public class FontUtil {
    private static ArrayList<Font> fonts ;
    private static ArrayList<String> names ;

    public static ArrayList<Font> getFonts() {
        if (fonts==null){
            initFontFamily();
        }
        return fonts;
    }

    public static ArrayList<String> getNames() {
        if (names==null){
            initFontFamily();
        }
        return names;
    }

    private static void initFontFamily(){
        String path = "D:/apache-tomcat-8.0.35/webapps/cn_fangzheng";
        File dir = new File(path);
        fonts = new ArrayList<Font>();
        names = new ArrayList<String>();
        if (dir.isDirectory()){
            File files[] = dir.listFiles();
            if (files!=null){
                for (File file:files){
                    Font font = getFontFamily(file);
                    System.out.println(file.getName()+": "+font.getName());
                    if (font!=null){
                        fonts.add(font);
                        names.add(font.getName());
                    }
                }
            }
        }


    }

    public static void main(String[] args) {
        initFontFamily();
        /*for (Font font:fonts){
            System.out.println(font.getFontName()+": "+font.getName());
        }*/
    }

    private static Font getFontFamily(File file) {
        FileInputStream fileInputStream = null;
        BufferedInputStream bufferedInputStream = null;
        try {
            fileInputStream = new FileInputStream(file);
            bufferedInputStream = new BufferedInputStream(fileInputStream);
            return Font.createFont(Font.TRUETYPE_FONT, bufferedInputStream);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (FontFormatException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bufferedInputStream != null) {
                    bufferedInputStream.close();
                }
                if (fileInputStream != null) {
                    fileInputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
