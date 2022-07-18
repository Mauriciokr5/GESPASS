/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package passwdCRUD;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modelo.Database;

/**
 *
 * @author Mauricio Beltrán
 */
public class searchPassword extends HttpServlet {
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
            String busqueda = request.getParameter("busqueda");

            Database bd = new Database();
            bd.setConnection();
            ResultSet rs = bd.executeQuery("SELECT * FROM passwords WHERE idUser="+idUser+" and nameSite LIKE '%"+busqueda+"%';");


            while(rs.next()){ 
                String cadena = "{";
                cadena+="\"idPass\": \"" + rs.getString("idPass")+"\",";
                cadena+="\"nameSite\": \"" + rs.getString("nameSite")+"\",";
                cadena+="\"site\": \"" + rs.getString("site")+"\",";
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
