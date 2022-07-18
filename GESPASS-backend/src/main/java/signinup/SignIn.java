package signinup;

import modelo.Database;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class SignIn extends HttpServlet {

    private PrintWriter outter;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        outter = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
      
        String usr = request.getParameter("User");
        PrintWriter out = response.getWriter();
              
         boolean b = true;
         
        try{
            
            Database bd= new Database();
            bd.setConnection();
            ResultSet rs=bd.executeQuery("select * from users where user='"+usr+"';");
            
            if(rs.next()){
                String idUser=rs.getString("idUser");
                String user=rs.getString("user");
                String userPass=rs.getString("userPass");
                b = false;
                outter.write(devolverJSON(idUser, user, userPass));
            }
            if(b){
                out.write(devolverJSONError());
            }
            
            bd.closeConnection();
            
        }catch(Exception e){
            e.printStackTrace();
        }
        
    }

    private String devolverJSON(String idUser, String user, String userPass) {
        StringBuilder json = new StringBuilder();
        
        json.append("[");
        json.append("{");
        json.append(jsonValue("idUser", idUser));
        json.append(",");
        json.append(jsonValue("user", user));
        json.append(",");
        json.append(jsonValue("userPass", userPass));
        json.append("}");
        json.append("]");
        return json.toString();
    }
    
    private String devolverJSONError() {
        StringBuilder json = new StringBuilder();
        json.append("[");
        json.append("{");
        json.append(jsonValue("user", "error"));
        json.append("}");
        json.append("]");
        return json.toString();
    }

    private String jsonValue(String key, Object value) {
        return new StringBuilder()
                .append("\"")
                .append(key)
                .append("\" : \"")
                .append(value)
                .append("\"")
                .toString();
    }

}
