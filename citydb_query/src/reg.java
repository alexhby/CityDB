
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.DocumentException;

import com.noxue.dao.user;
import com.noxue.javabean.User;

public class reg extends HttpServlet {

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		request.getRequestDispatcher("/WEB-INF/jsp/reg.jsp").forward(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String email = request.getParameter("email");
		String sex = request.getParameter("sex");
		
		boolean flag =  false;
		String msg = "";
		
		if(username.trim().isEmpty()) {
			msg = "�û�����Ϊ��";
			flag = true;
		} else if(password.trim().isEmpty()) { 
			msg = "���벻��Ϊ��";
			flag = true;
		}else if(! email.trim().matches("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*")) { 
			msg = "�����ʽ����";
			flag = true;
		}else if(sex.trim().isEmpty()) {
			msg = "�Ա���Ϊ��";
			flag = true;
		}
		
		if(flag){
			request.setAttribute("message", msg);
			request.setAttribute("url", "javascript:history.go(-1);");
			request.getRequestDispatcher("/WEB-INF/jsp/message.jsp").forward(request, response);
			return;
		}
		
		User u = new User();
		
		u.setName(username);
		u.setEmail(email);
		u.setPassword(password);
		u.setSex(sex);
		
		user user1 = new user();
		
			if(user1.exist(u)){
				request.setAttribute("message", "�û��Ѵ���");
				request.setAttribute("url", "javascript:history.go(-1);");
				request.getRequestDispatcher("/WEB-INF/jsp/message.jsp").forward(request, response);
				return;
			}else if(!user1.adduser(u)){
				request.setAttribute("message", "�û�ע��ʧ��");
				request.setAttribute("url", "javascript:history.go(-1);");
				request.getRequestDispatcher("/WEB-INF/jsp/message.jsp").forward(request, response);
				return;
			}else{
				request.setAttribute("message", "ע��ɹ�");
				request.setAttribute("url", "login.do");
				request.getRequestDispatcher("/WEB-INF/jsp/message.jsp").forward(request, response);
				return;
			}
	}

}
