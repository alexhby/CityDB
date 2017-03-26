#include <iostream>
#include <fstream>
#include <sstream>
using namespace std;

int main(){
	ofstream myfile;
	myfile.open("resultQuery.txt");

	ifstream input("company.txt");
	string line1 = "insert into company(pastRank, Name, City, State, zipCode, altitude, latitude) values ";
	myfile << line1 << "\n";
	string line;

	while(getline(input, line)){
		istringstream iStr(line);
		string rank;
		getline(iStr, rank, '\t');
		string pastRank;
		getline(iStr, pastRank, '\t');
		string dum;
		getline(iStr, dum, '\t');
		string tName;
		getline(iStr, Name, '\t');
		string Name = "";
		for(int i=0; i<tName.length(); ++i){
			if(tName[i] != '\'') Name = Name + tName[i];
		}

		string City;
		getline(iStr, City, '\t');
		string State;
		getline(iStr, State, '\t');
		string zipCode;
		getline(iStr, zipCode, '\t');
		string altitude;
		getline(iStr, altitude, '\t');
		string latitude;
		getline(iStr, latitude, '\t');
		string temp = "('"+pastRank+"','"+Name+"','"+City+"','"+State+"','"+zipCode+"','"+altitude+"','"+latitude+"'),";
		myfile << temp << "\n";
	}
	return 0;
}