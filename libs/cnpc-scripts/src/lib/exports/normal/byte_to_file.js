var btArrOS = Java.type("java.io.ByteArrayOutputStream");
var Buffered = Java.type("java.awt.image.BufferedImage");
var File = Java.type("java.io.File");
var imgIO = Java.type("javax.imageio.ImageIO");

function saveMap(){
   var bImage = imgIO.read(new File("nazwa.jpg"));
   var bos = new btArrOS();

   imgIO.write(bImage, "jpg", bos);

   var data = bos.toByteArray();
   


}


/* 
import java.io.ByteArrayOutputStream;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;
public class ByteArrayToImage {
   public static void main(String args[]) throws Exception {
      BufferedImage bImage = ImageIO.read(new File("sample.jpg"));
      ByteArrayOutputStream bos = new ByteArrayOutputStream();
      ImageIO.write(bImage, "jpg", bos );
      byte [] data = bos.toByteArray();
      ByteArrayInputStream bis = new ByteArrayInputStream(data);
      BufferedImage bImage2 = ImageIO.read(bis);
      ImageIO.write(bImage2, "jpg", new File("output.jpg") );
      System.out.println("image created");
   }
}

*/