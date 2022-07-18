
package passwdCRUD;

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
public class updatePassword extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try ( PrintWriter out = response.getWriter()) {
            Database bd = new Database();
            
            
            String idPass, nameSite, site, passwd, user;
            
            idPass = request.getParameter("idPass");
            nameSite = request.getParameter("nameSite");
            site = request.getParameter("site");
            passwd = request.getParameter("passwd");
            user = request.getParameter("user");
            
            bd.setConnection();
            System.out.println("\n\n\nUPDATE passwords SET nameSite = '"+nameSite+"', site = '"+site+"', passwd='"+passwd+"' WHERE idPass = "+idPass+";");
            bd.executeUpdate("UPDATE passwords SET nameSite = '"+nameSite+"', site = '"+site+"', passwd='"+passwd+"', user='"+user+"' WHERE idPass = "+idPass+";");
            bd.closeConnection();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}
