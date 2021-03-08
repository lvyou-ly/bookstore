/**
 * @description 图片压缩方法
 */
export const ZipImg = {  
    /**
     * @description 图片压缩的最核心的步骤——压缩
     * @param { Image } imageObj Image对象 dom
     * @param { number } largestLen 设置压缩的图片的最长边
     */
    getMinImg(imageObj, largestLen) {
      const canvas = document.createElement("canvas");
      let Cwidth = imageObj.width;
      let Cheight = imageObj.height;
      let percent;
  
      !largestLen && (largestLen = 600);
  
      if (Cwidth > Cheight) {
        percent = Cwidth / Cheight;
        Cwidth = largestLen;
        Cheight = Cwidth / percent;
      } else {
        percent = Cheight / Cwidth;
        Cheight = largestLen;
        Cwidth = Cheight / percent;
      }
  
      canvas.width = Cwidth;
      canvas.height = Cheight;
  
      const context = canvas.getContext("2d");
      context.drawImage(imageObj, 0, 0, Cwidth, Cheight);
      /**
       * @description  用canvas画图进行第一次图片压缩，转换成webp格式是进一步压缩
       * @description  imgFile是二次压缩后的图片文件
       */ 
      let imgFile = canvas.toDataURL("image/webp");
      return imgFile;

    }
  };
  