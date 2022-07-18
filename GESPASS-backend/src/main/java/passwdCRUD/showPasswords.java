
package passwdCRUD;

import modelo.Database;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Mauricio Beltrán
 */
public class showPasswords extends HttpServlet {
    private PrintWriter out;
    

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        out = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
            StringBuilder json = new StringBuilder();
            json.append("[");            
        try{
            String idUser = request.getParameter("idUser");

            Database bd = new Database();
            bd.setConnection();
            ResultSet rs = bd.executeQuery("SELECT * FROM passwords WHERE idUser="+idUser+";");


            while(rs.next()){ 
                String cadena = "{";
                cadena+="\"idPass\": \"" + rs.getString("idPass")+"\",";
                cadena+="\"nameSite\": \"" + rs.getString("nameSite")+"\",";
                cadena+="\"site\": \"" + rs.getString("site")+"\",";
                cadena+="\"user\": \"" + rs.getString("user")+"\",";
                cadena+="\"passwd\": \"" + rs.getString("passwd")+"\"},";
                json.append(cadena);
            }

            bd.closeConnection();
        }catch(Exception e){
            e.printStackTrace();
        }
        json.deleteCharAt(json.lastIndexOf(","));
        json.append("]");
        out.write(json.toString());

    }

}
