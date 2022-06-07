// Assignment Code
var generateBtn = document.querySelector("#generate");

//Generate an array of character codes
var alpha = Array.from(Array(26)).map((e, i) => i + 65);

//Generate an array of 0-10
var numericChar = Array.from(Array(10)).map((e, i) => i)

//Utilize array of character codes to create an array of the alphabet in LOWERCASE
var lowerChar = alpha.map((x) => String.fromCharCode(x).toLowerCase());

//Utilize array of character codes to create an array of the alphabet in UPPERCASE
var upperChar = alpha.map((x) => String.fromCharCode(x).toUpperCase());
var specialChar = ["!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"]
console.log(lowerChar)

//User Prompts for password criteria. If any of the prompts are canceled, the request will be closed out.
function generatePassword() {
  //Create array variable to be populated with requested characters
  var availCharacters = []
  var password = ""
    //prompt user for password length.
  var length = promptLength();
    if (!length) {return "cancel"};
  //prompt user to include lowercase characters. If yes, add array to available characters.
  var lowercase = promptYesNo("Include lowercase characters?");
    if (!lowercase) {
      return "cancel"
    } else if (lowercase == "y"){
        availCharacters = availCharacters.concat(lowerChar);
    };
  //prompt user to include uppercase characters. If yes, add array to available characters.
  var uppercase = promptYesNo("Include UPPERCASE characters?");
    if (!uppercase) {
      return "cancel"
    } else if (uppercase == "y"){
      availCharacters = availCharacters.concat(upperChar);
    };
  //prompt user to include numeric. If yes, add array to available characters.
  var numeric = promptYesNo("Include numeric characters?");
    if (!numeric) {
      return "cancel"
    } else if (numeric == "y"){
      availCharacters = availCharacters.concat(numericChar);
    };
  //prompt user to include special characters. If yes, add array to available characters.
  var special = promptYesNo("Include special characters?");
    if (!special) {
      return "cancel"
    } else if (special == "y"){
      availCharacters = availCharacters.concat(specialChar);
    };
  //Generate password. Loops through the length requested and randomly inputs characters utilizing the compiled array.
  for (var i = 0; i < length; i++) {
    password = password + availCharacters[Math.floor(Math.random() * availCharacters.length)]
  };
  return password;
}

//Lenght Question. Checks the response and makes sure the response is an integer between 8-128
function promptLength(){
    var passwordLength = prompt("What do you want the length of the password to be? (8 - 128)");
    //If cancel button is selected, exit out of code.
    if (passwordLength == undefined) {
      return;
    };
    //Checks to see if the response is a number
    if (isNaN(Number(passwordLength)) || !Number.isInteger(Number(passwordLength)) || passwordLength == "") {
      alert("Please enter a valid integer.");
      return promptLength();
    };
    //Checks to see if the response is within 8 and 128
    if (passwordLength < 8 || passwordLength >128) {
      alert("Password must be between 8 and 128 characters.");
      return promptLength();
    } else {
      return passwordLength;
    };    
}

//Reusable YesNo prompt. Prompts the user to respond "y" or "n"
function promptYesNo(msg){
  var YesNo = prompt(msg + " ( y / n )");
  //If cancel button is selected, exit out of code.
  if (YesNo == undefined) {
    return;
  };
  //Check if the response was valid. If not, alert and reprompt
  if (YesNo != "y" && YesNo != "n" ) {
    alert("Please enter y or n. *Case Sensitive*")
    return promptYesNo(msg);
  } else {
    return YesNo;
  };
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  //Check to see if any of the inputs were canceled
  if(password == "cancel"){return alert("Request Canceled")};
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

