import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;


public class search {

    static String rdb_url = "jdbc:mysql://aws-us-east-1-portal.26.dblayer.com:17934/citydb";
    
    static String rdb_user = "admin";
    
    static String rdb_pwd = "citydb1234";
	
	public static Vector<String> get_city_name() throws SQLException
	{
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("Where is your MySQL JDBC Driver?");
			e.printStackTrace();
		}
		
		Connection connection = null;

		try {
			connection = DriverManager
			.getConnection(rdb_url,rdb_user, rdb_pwd);

		} catch (SQLException e) {
			System.out.println("Connection Failed! Check output console");
			e.printStackTrace();
		}
		
		
		Vector<String> str_list = new Vector<String>();
		
		
		String query = "select distinct local_name from city";

	      // create the java statement
	      Statement st = connection.createStatement();
	      
	      // execute the query, and get a java resultset
	      java.sql.ResultSet rs = st.executeQuery(query);
	      
	      
	      while(rs.next())
	      {
	    	  String name = rs.getString(1);
	    	  
	    	  if(name.contains(" "))
	    	  {
	    		  name = name.replaceAll(" ", "_");
	    	  }
	    	  
	    	  name = name.replaceAll("\r", "").replaceAll("\r", "");
	    	  
	    	  str_list.add(name);
	    	  
	    	  
	      }
	      
		return str_list;
	}
}
