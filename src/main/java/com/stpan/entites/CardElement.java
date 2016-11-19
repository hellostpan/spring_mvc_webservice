package com.stpan.entites;

import java.io.Serializable;

/**
 * Created by stpan on 2016/10/28 9:21.
 */
public class CardElement implements Serializable {
    private String id;
    private String cardId;
    private float left;
    private float top;
    private String content;
    private boolean bold;
    private boolean italic;
    private String fontFamily;
    private String fontColor;
    private int fontSize;
    private boolean front;
    private String path;
    private float width;
    private float height;
    private int type;//1 文字 2 普通图片 3 svg图片
    private float lineHeight;
    private float scaleSize;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public float getLineHeight() {
        return lineHeight;
    }

    public void setLineHeight(float lineHeight) {
        this.lineHeight = lineHeight;
    }

    public float getScaleSize() {
        return scaleSize;
    }

    public void setScaleSize(float scaleSize) {
        this.scaleSize = scaleSize;
    }
}
