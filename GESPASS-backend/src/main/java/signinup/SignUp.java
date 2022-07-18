/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package signinup;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modelo.Database;

/**
 *
 * @author Mauricio Beltrán
 */
public class SignUp extends HttpServlet {

    private PrintWriter out;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        out = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        
        StringBuilder json = new StringBuilder();    
        String res = "";
        
        try ( PrintWriter out = response.getWriter()) {
            Database bd = new Database();

            String user, userPass;
            
            
            user = request.getParameter("user");
            userPass = request.getParameter("userPass");

            bd.setConnection();
            //System.out.println("\n\n\n\nINSERT INTO passwords (nameSite, site, passwd, idUser) VALUES ('"+nameSite+"', '"+site+"', '"+passwd+"', '"+idUser+"');");
            res = "[ {\"status\": \""+bd.executeUpdate("INSERT INTO users (user, userPass, type) VALUES ('"+user+"', '"+userPass+"', 0);")+"\"}]";
            json.append(res);
            bd.closeConnection();
            out.write(json.toString());

        }catch(Exception e){
            e.printStackTrace();
        }
        out.write(json.toString());
    }
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
