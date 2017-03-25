package extract;

import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Literal;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.sparql.engine.http.QueryEngineHTTP;

import com.mongodb.BasicDBObject;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Vector;

//import com.hp.hpl.jena.query.Query;
//import com.hp.hpl.jena.query.QueryExecutionFactory;
//import com.hp.hpl.jena.query.QueryFactory;
//import com.hp.hpl.jena.query.QuerySolution;
//import com.hp.hpl.jena.query.ResultSet;
//import com.hp.hpl.jena.rdf.model.Literal;
//import com.hp.hpl.jena.rdf.model.RDFNode;
//import com.hp.hpl.jena.sparql.engine.http.QueryEngineHTTP;

/**
 * This is an example built on top of the Jena ARQ library.
 * See: http://jena.sourceforge.net/ARQ/documentation.html
 */
public class extract {
	
	private String service = null;
	private String apikey = null;
	
	static String[] attributes = {"http://dbpedia.org/property/owners", "http://dbpedia.org/property/leader", "http://dbpedia.org/property/website"};
	
    static String rdb_url = "jdbc:mysql://citydb.cmxfcjcooglc.us-west-2.rds.amazonaws.com:3306/citydb";
    
    static String rdb_user = "cityDB";
    
    static String rdb_pwd = "citydb1234";
	
	static HashMap<String, String> maps = new HashMap<String, String>();
	
	public static void init()
	{
		maps.put("http://dbpedia.org/property/owners", "leader");
		
		maps.put("http://dbpedia.org/property/leader", "leader");
		
		maps.put("http://dbpedia.org/ontology/abstract", "introduction");
		
		
		maps.put("http://dbpedia.org/property/website", "website");

	}
	
	
	public extract(String service, String apikey) {
		this.service = service;
		this.apikey = apikey;
	}
	public ResultSet executeQuery(String queryString) throws Exception {
		 Query query = QueryFactory.create(queryString) ;

		 QueryEngineHTTP qexec = QueryExecutionFactory.createServiceRequest(this.service, query);
//		 qexec.addParam("apikey", this.apikey);
		 ResultSet results = qexec.execSelect() ;
		 return results;

	}
	public static void main(String[] args) throws Exception {
		
		init();
		
		Insert insert = new Insert();
		
		
		Vector<String> str_list = get_city_name();
		
		insert.init();

		
		for(int i = 0; i<str_list.size(); i++)
		{
			String sparqlService = "http://dbpedia.org/sparql";
			String apikey = "YOUR API KEY";

			String name = str_list.get(i);
			/*
			 * More query examples here:
			 * http://sparql.bioontology.org/examples
			 */
			String query = "SELECT ?property ?hasValue ?isValueOf	"
					+ "		WHERE {"
//					+ "  { <http://dbpedia.org/resource/Philadelphia> <http://dbpedia.org/ontology/headquarter> ?hasValue }"
//					+ "  UNION"
					+ "  { ?isValueOf <http://dbpedia.org/ontology/headquarter> <http://dbpedia.org/resource/" + str_list.get(i) + "> }"
					+ "}";
			
			extract test = new extract(sparqlService,apikey);
			ResultSet results = test.executeQuery(query);

			boolean start = false;
			
			    for ( ; results.hasNext() ; ) {
			    	
			    	
			    	
			    	
			    	
			    	BasicDBObject b_object = Insert.init_insert();
			    	
			    	QuerySolution soln = results.nextSolution() ;
				      RDFNode ontUri = soln.get("isValueOf") ;
			    	String company_name = ontUri.toString();
			    	
			    	
			    	String sub_query = "SELECT ?property ?hasValue "
			    			+ "			    			WHERE {"
			    			+ "			    		  { <"+ company_name +"> ?property ?hasValue }"
//			    			+ "			    		  UNION"
//			    			+ "			    		  { ?isValueOf ?property <" + company_name + "> }"
			    			+ "			    		}";
			    	
			    	ResultSet rs = test.executeQuery(sub_query);
			    	
			    	
			    	List<String> vals = new ArrayList<String>();
			    	
			    	String old = new String();
			    	
			    	boolean first = false;
			    	
			    	while(rs.hasNext())
			    	{
			    		QuerySolution sol = rs.nextSolution() ;
			    		
			    		RDFNode n1 = sol.get("property");
			    		
			    		RDFNode n2 = sol.get("hasValue");
			    		
			    		String key = n1.toString();
			    		
			    		String value = n2.toString();
			    		
//			    		if(key.equals(anObject))
//			    		System.out.println(key);
			    		
//			    		for(int j = 0; j<attributes.length; j++)
			    		{
			    			
			    			String inserted_key = maps.get(key);
			    			
//			    			if(key.equals("http://dbpedia.org/property/website"))
//			    			{
//			    				int y = 0;
//			    				y++;
//			    			}
			    			
			    			if(inserted_key != null)
			    			{
			    				if(!first)
			    				{
			    					List<String> n_list = new ArrayList<String>();
			    					
			    					String[] ns = company_name.split("/");
			    					
			    					n_list.add(ns[ns.length - 1]);
			    					
			    					insert.insert(b_object, "name", n_list);
			    					
			    					
			    					n_list.clear();
			    					
			    					n_list.add(name);
			    					
			    					insert.insert(b_object, "location", n_list);
			    					
			    					
			    					first = true;
			    				}
			    				
			    				
			    				if(inserted_key.equals("introduction"))
			    				{
			    					if(!value.endsWith("@en"))
			    					{
			    						continue;
			    					}
			    					else
			    					{
			    						value = value.replace("@en", "");
			    					}
			    				}
			    				
			    				
			    				String [] vs = value.split("/");
			    				
			    				String inserted_val = new String();
			    				
			    				if(inserted_key.equals("website"))
			    				{
			    					inserted_val = value;
			    				}
			    				else
			    				{
			    					inserted_val = vs[vs.length - 1];
			    				}
			    				
			    				
			    				if(inserted_key.equals(old))
			    				{
			    					vals.add(inserted_val);
			    				}
			    				else
			    				{
//			    					String []keys = key.split("/"); 
			    					
//			    					vals.add(value);
			    					
			    					if(old != null && old.length() > 0)
			    					{
			    						insert.insert(b_object, old, vals);
			    						
			    						old = inserted_key;
					    				vals.clear();
					    				vals.add(inserted_val);
			    					}
			    					else
			    					{
					    				old = inserted_key;
					    				vals.clear();
					    				vals.add(inserted_val);
			    					}
			    				}
			    				
			    			}
			    		}
			    	}
			    	
			    	if(old != null && old.length() > 0)
					{
						insert.insert(b_object, old, vals);
					}
			    	
			    	Insert.final_insert(b_object);
			    	
			      
			      if(!start)
			      {
				      System.out.println(name);
				      start = true;
//				      break;
			      }
//			      Literal name = soln.getLiteral("name") ;
//			      Literal acr = soln.getLiteral("acr") ;
//			      System.out.println(ontUri + " ---- " + name + " ---- " + acr);
			    }
		}
		
		
		
	}
	
	
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