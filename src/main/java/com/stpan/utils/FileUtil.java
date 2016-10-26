package com.stpan.utils;

import javax.servlet.http.HttpServletRequest;
import java.io.File;

/**
 * Created by stpan on 2016/10/25 15:58.
 */
public class FileUtil {

    public static File getFileDir(HttpServletRequest request){
        String path1 = new File(request.getSession().getServletContext().getRealPath("")).getParent();
        File file = new File(path1 + "/temp_file");
        if (!file.exists()) {
            file.mkdirs();
        }
        return file;
    }
}
