
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



/**
 * Servlet implementation class choose
 */
@WebServlet("/choose.do")
public class choose extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public choose() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Vector<String> city_names = null;
		
		try {
			city_names = search.get_city_name();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String url = "result.jsp?first=传递第一个参数&second=传递第二个参数";  
        String strRequest = "request传值";  
        String strSession = "session传值";  
        request.setAttribute("strRequest", strRequest);  
        
        request.setAttribute("list", city_names);
        request.getSession().setAttribute("strSession", strSession);  
          
        /** 
         * 客户端跳转：效率低 
         * session范围属性，url中的参数会传递下去，request范围属性不传递 
         */  
        //response.sendRedirect(url);  
          
        /** 
         * 服务器端跳转：常用，效率高 
         * request范围属性，session范围属性，url中的参数会传递 
         */  
        request.getRequestDispatcher("/WEB-INF/jsp/test.jsp").forward(request, response);  
//		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		HttpSession session = request.getSession();
//		String location = request.getParameter("location");
//		session.setAttribute("location", location);
//		request.setAttribute("url", "chat.do");
//		
//		
//		String[] character_list = get_point( location);
//		String character = character_list[0];
//		for (int i = 1; i<character_list.length - 1; i++)
//		{
//			character+="，"+character_list[i];
//		}
//		String char_list = character;
//		char_list+="，"+character_list[character_list.length - 1];
//		character+="或者"+character_list[character_list.length - 1];
//		session.setAttribute("character", character);
//		session.setAttribute("char_list", char_list);
//		System.out.println(character);
		
		
		//doGet(request, response);
	}
	
//	private  String [] get_point(String location)
//	{
//		String queryString = "select distinct ?point where {"
//				+ "<http://localhost/" + location + "> <http://localhost/要点> ?point .}";
//		System.out.println(queryString);
//		Query queryObj = QueryFactory.create(queryString);
//		String sparqlEndpoint = "http://166.111.134.166:3030/dbpedia/query";
//		QueryExecution qe = QueryExecutionFactory.sparqlService(sparqlEndpoint, queryObj);
//		
//		String [] point_list = null;
//		try{
//			ResultSet literalResults = qe.execSelect();
//			
//			while (literalResults.hasNext())
//			{
//				QuerySolution qsolution = literalResults.nextSolution();
//				RDFNode literalLabel = qsolution.get("point");
//				point_list = literalLabel.toString().split("，");
//			}
//			
//		}
//		catch (Exception e)
//		{
//			System.out.println("Exception caught: " + e.toString());
//		}
//		return point_list;
//	}

}
