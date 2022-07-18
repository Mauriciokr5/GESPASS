/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package passwdCRUD;


import modelo.Database;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Mauricio Beltrán
 */
public class newPassword extends HttpServlet {

    
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

            String nameSite, site, passwd, idUser, user;
            
                    

            nameSite = request.getParameter("nameSite");
            site = request.getParameter("site");
            passwd = request.getParameter("passwd");
            idUser = request.getParameter("idUser");
            user = request.getParameter("user");
            

            bd.setConnection();
            System.out.println("\n\n\n\nINSERT INTO passwords (nameSite, site, passwd, idUser) VALUES ('"+nameSite+"', '"+site+"', '"+passwd+"', '"+idUser+"');");
            res = "[ {\"status\": \""+bd.executeUpdate("INSERT INTO passwords (nameSite, site, passwd, user, idUser) VALUES ('"+nameSite+"', '"+site+"', '"+passwd+"','"+user+"', '"+idUser+"');")+"\"}]";
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
    }

}
