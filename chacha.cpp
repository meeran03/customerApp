// #include <iostream>

// using namespace std;

// int length(char arr[]) {
//     int i=0;
//     int size=0;
//     while (arr[i] != '\0') {
//         size++;
//         i++;
//     }
//     return size;
// }

// int main() {
//     cout << "Enter a string\n";
//     char arr[50];
//     char l;
//     int i=0;
//     while (l != '\n') {
//         cin.get(l);
//         arr[i] = l;
//         i++;
//     }
//     cout << "The length of string is : " << length(arr) << endl;
// }







// #include <iostream>
// using namespace std;
// void concatenate(char src1[],char src2[],char des[]) {
//     int i=0;
//     while (1) {
//         des[i] = src1[i];
//         if (src1[i] == '\0') {
//             break;
//         }
//         i++;
//     }
//     int j=0;
//     while (1) {
//         des[i] = src2[j];
//         if (src2[j] == '\0') {
//             break;
//         }
//         j++;
//         i++;
//     }

// }
// int main() {
//     char arr1[20];
//     char arr2[20];
//     char final[18];
//     cout << "Enter the first string\n";
//     cin >> arr1;
//     cout << "Enter the second string\n";
//     cin >> arr2;
//     concatenate(arr1,arr2,final);
//     cout << "Final string is : " << final << endl;
// }



#include <iostream>

using namespace std;

void swap(int& N1, int& N2) {
    N1= N1+N2;
    N2 = N1-N2;
    N1 = N1-N2;
}

int main() {
    cout << "Enter the first Number  : " ;
    int N1;
    cin >> N1; 

    cout << "Enter the second Number  : " ;
    int N2;
    cin >> N2; 

    swap(N1,N2);

    cout << "First Number is : " << N1 << endl;
    cout << "Second Number is : " << N2 << endl;
}