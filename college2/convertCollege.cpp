#include <iostream>
#include <fstream>
#include <sstream>
using namespace std;

//FID,IPEDSID,NAME,ADDRESS,ZIP,TELEPHONE,LATITUDE,LONGITUDE,TOT_ENROLL,HOUSING,DORM_CAP

int main(){
	ofstream myfile;
	myfile.open("collegeResult.sql");

	ifstream input("college2.txt");
	string line1 = "insert into college2(IPEDSID,NAME,ADDRESS,ZIP,TELEPHONE,LATITUDE,LONGITUDE,TOT_ENROLL,HOUSING,DORM_CAP,TOT_EMPLOY) values ";
	myfile << line1 << "\n";
	string line;

	getline(input, line);

	while(getline(input, line)){
		istringstream iStr(line);
		string FID;
		getline(iStr, FID, ',');
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
			else NAME += tempName[i];
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
		getline(iStr, ZIP, ',');
		string TELEPHONE;
		getline(iStr, TELEPHONE, ',');
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
		string TOT_EMPLOY;
		getline(iStr, TOT_EMPLOY, ',');

		string temp = "('"+IPEDSID+"','"+NAME+"','"+ADDRESS+"','"+ZIP+"','"+TELEPHONE+"','"+LATITUDE+"','"+LONGITUDE+"','"+TOT_ENROLL+"','"+HOUSING+"','"+DORM_CAP+"','"+TOT_EMPLOY+"'),";
		myfile << temp << "\n";
	}
	return 0;
}


