package com.stpan.entites;

import java.io.Serializable;

/**
 * Created by stpan on 2016/10/28 9:21.
 */
public class BusinessCard implements Serializable {
    private String id;
    private String parentId;
    private float left;
    private float top;
    private String word;
    private boolean bold;
    private boolean italic;
    private String fontFamily;
    private String fontColor;
    private int fontSize;
    private boolean front;
    private String path;
    private float width;
    private float height;
    private boolean img;
    private String tid;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public float getLeft() {
        return left;
    }

    public void setLeft(float left) {
        this.left = left;
    }

    public float getTop() {
        return top;
    }

    public void setTop(float top) {
        this.top = top;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public boolean isBold() {
        return bold;
    }

    public void setBold(boolean bold) {
        this.bold = bold;
    }

    public boolean isItalic() {
        return italic;
    }

    public void setItalic(boolean italic) {
        this.italic = italic;
    }

    public String getFontFamily() {
        return fontFamily;
    }

    public void setFontFamily(String fontFamily) {
        this.fontFamily = fontFamily;
    }

    public String getFontColor() {
        return fontColor;
    }

    public void setFontColor(String fontColor) {
        this.fontColor = fontColor;
    }

    public int getFontSize() {
        return fontSize;
    }

    public void setFontSize(int fontSize) {
        this.fontSize = fontSize;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public boolean isFront() {
        return front;
    }

    public void setFront(boolean front) {
        this.front = front;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public float getWidth() {
        return width;
    }

    public void setWidth(float width) {
        this.width = width;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public boolean isImg() {
        return img;
    }

    public void setImg(boolean img) {
        this.img = img;
    }

    public String getTid() {
        return tid;
    }

    public void setTid(String tid) {
        this.tid = tid;
    }
}
