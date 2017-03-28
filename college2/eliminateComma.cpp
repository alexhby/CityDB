#include <iostream>
#include <fstream>
#include <sstream>
using namespace std;

int main(){
	ofstream myfile;
	myfile.open("cleanCollege.csv");

	ifstream input("Colleges_and_Universities.csv");
	string line;

	while(getline(input, line)){
		bool inQuote = false;
		for(int i=0; i<line.length(); ++i){
			if(line[i] == ','){
				if(inQuote) line[i] = ' ';
			}
			else if(line[i] == '"'){
				if(inQuote) inQuote = false;
				else inQuote = true;
			}
		}
		myfile << line << "\n";
	}
	return 0;
}