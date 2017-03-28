#include <iostream>
#include <fstream>
#include <sstream>
using namespace std;

//FID,IPEDSID,NAME,ADDRESS,ZIP,TELEPHONE,LATITUDE,LONGITUDE,TOT_ENROLL,HOUSING,DORM_CAP

int main(){
	ofstream myfile;
	myfile.open("college1Result.sql");

	ifstream input("college1.csv");
	string line1 = "insert into college1(UNITID,OPEID,OPEID6,INSTNM,CITY,STABBR,INSTURL,NPCURL,UGDS,GRAD_DEBT_MDN_SUPP) values ";
	myfile << line1 << "\n";
	string line;

	getline(input, line);

	while(getline(input, line)){
		istringstream iStr(line);

		string IPEDSID;
		getline(iStr, IPEDSID, ',');

		string NAME = "";
		string tempName;
		getline(iStr, tempName, ',');

		for(int i=0; i<tempName.length(); ++i){
			if(tempName[i] == '\''){
				NAME += '\\';
				NAME += '\'';
				//NAME += " ";
				//cout << "detected!!!!!!!!!!!" << endl;
			}
			else if((tempName[i] >= 'a' && tempName[i] <= 'z') || (tempName[i] >= 'A' && tempName[i] <= 'Z') || (tempName[i] >= '0' && tempName[i] <= '9') || tempName[i] == ' ')
				NAME += tempName[i];
		}

		string ADDRESS = "";
		string tempAdd;
		getline(iStr, tempAdd, ',');
		
		for(int i=0; i<tempAdd.length(); ++i){
			if(tempAdd[i] == '\''){
				ADDRESS += '\\';
				ADDRESS += '\'';
			}
			else{
				ADDRESS += tempAdd[i];
			}
		}
		string ZIP;
		string tZIP;
		getline(iStr, tZIP, ',');
		for(int i=0; i<tZIP.length(); ++i){
			if(tZIP[i] == '\''){
				ZIP += '\\';
				ZIP += '\'';
				//NAME += " ";
				//cout << "detected!!!!!!!!!!!" << endl;
			}
			else 
				ZIP += tZIP[i];
		}

		string ZIP2;
		string tZIP2;
		getline(iStr, tZIP2, ',');
		for(int i=0; i<tZIP2.length(); ++i){
			if(tZIP2[i] == '\''){
				ZIP2 += '\\';
				ZIP2 += '\'';
				//NAME += " ";
				//cout << "detected!!!!!!!!!!!" << endl;
			}
			else 
				ZIP2 += tZIP2[i];
		}	
		string LATITUDE;
		getline(iStr, LATITUDE, ',');
		string LONGITUDE;
		getline(iStr, LONGITUDE, ',');
		string TOT_ENROLL;
		getline(iStr, TOT_ENROLL, ',');
		string HOUSING;
		getline(iStr, HOUSING, ',');
		string DORM_CAP;
		getline(iStr, DORM_CAP, ',');

		string temp = "('"+IPEDSID+"','"+NAME+"','"+ADDRESS+"','"+ZIP+"','"+ZIP2+"','"+LATITUDE+"','"+LONGITUDE+"','"+TOT_ENROLL+"','"+HOUSING+"','"+DORM_CAP+"'),";
		myfile << temp << "\n";
	}
	return 0;
}


