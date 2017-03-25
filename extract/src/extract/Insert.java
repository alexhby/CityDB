package extract;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;

/**
 * Java + MongoDB Hello world Example
 *
 */
public class Insert {
	
	
	static MongoClient mongo;
	
	static DB db;
	
	static DBCollection table;
	
	static String URL = "204.236.248.210"; 
	
	public static void init() throws UnknownHostException
	{
		mongo = new MongoClient(URL, 27017);

		/**** Get database ****/
		// if database doesn't exists, MongoDB will create it for you
		db = mongo.getDB("citydb");
		
		char [] pwd = {'c','i','t','y','d','b','1','2','3','4'};
		
		db.authenticate("citydb", pwd);

		/**** Get collection / table from 'testdb' ****/
		// if collection doesn't exists, MongoDB will create it for you
		table = db.getCollection("user");
	}
	
	public static BasicDBObject init_insert()
	{
		BasicDBObject document = new BasicDBObject();
		
		return document;
	}
	
	
	public static void insert(BasicDBObject document, String key, List<String> values)
	{
		
//		document.put("name", "mkyong");
//		document.put("age", 30);
//		document.put("createdDate", new Date());
		
		if(values.size() > 1)
		{
			document.put(key, values);

		}
		else
		{
			document.put(key, values.get(0));
		}
		
//		table.insert(document);

	}
	
	public static void final_insert(BasicDBObject document)
	{
		
		if(!document.isEmpty())
			table.insert(document);
	}
	
	
  public static void main(String[] args) {

    try {

	/**** Connect to MongoDB ****/
	// Since 2.10.0, uses MongoClient
	MongoClient mongo = new MongoClient("localhost", 27017);

	/**** Get database ****/
	// if database doesn't exists, MongoDB will create it for you
	DB db = mongo.getDB("testdb");

	/**** Get collection / table from 'testdb' ****/
	// if collection doesn't exists, MongoDB will create it for you
	DBCollection table = db.getCollection("user");

	/**** Insert ****/
	// create a document to store key and value
	BasicDBObject document = new BasicDBObject();
	document.put("name", "mkyong");
	List<Integer> array = new ArrayList<Integer>();
	
	array.add(30);
	array.add(20);
	document.put("age", array);
//	document.append("age", 20);
	document.put("createdDate", new Date());
	table.insert(document);

//	/**** Find and display ****/
//	BasicDBObject searchQuery = new BasicDBObject();
//	searchQuery.put("name", "mkyong");
//
//	DBCursor cursor = table.find(searchQuery);
//
//	while (cursor.hasNext()) {
//		System.out.println(cursor.next());
//	}
//
//	/**** Update ****/
//	// search document where name="mkyong" and update it with new values
//	BasicDBObject query = new BasicDBObject();
//	query.put("name", "mkyong");
//
//	BasicDBObject newDocument = new BasicDBObject();
//	newDocument.put("name", "mkyong-updated");
//
//	BasicDBObject updateObj = new BasicDBObject();
//	updateObj.put("$set", newDocument);
//
//	table.update(query, updateObj);
//
//	/**** Find and display ****/
//	BasicDBObject searchQuery2
//	    = new BasicDBObject().append("name", "mkyong-updated");
//
//	DBCursor cursor2 = table.find(searchQuery2);
//
//	while (cursor2.hasNext()) {
//		System.out.println(cursor2.next());
//	}

	/**** Done ****/
	System.out.println("Done");

    } catch (UnknownHostException e) {
	e.printStackTrace();
    } catch (MongoException e) {
	e.printStackTrace();
    }

  }
}