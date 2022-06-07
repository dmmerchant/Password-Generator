// Assignment Code
var generateBtn = document.querySelector("#generate");
var alpha = Array.from(Array(26)).map((e, i) => i + 65);
var numericChar = Array.from(Array(10)).map((e, i) => i)
var lowerChar = alpha.map((x) => String.fromCharCode(x).toLowerCase());
var upperChar = alpha.map((x) => String.fromCharCode(x).toUpperCase());
var specialChar = ["!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"]
console.log(lowerChar)

//User Prompts for password criteria. If any of the prompts are canceled, the request will be closed out.
function generatePassword() {
  //prompt user for password length
  var availCharacters = []
  var password = ""
  var length = promptLength();
    if (!length) {return "cancel"};
  //prompt user to include lowercase characters
  var lowercase = promptYesNo("Include lowercase characters?");
    if (!lowercase) {
      return "cancel"
    } else if (lowercase == "y"){
        availCharacters = availCharacters.concat(lowerChar);
    };
  //prompt user to include uppercase characters
  var uppercase = promptYesNo("Include UPPERCASE characters?");
    if (!uppercase) {
      return "cancel"
    } else if (uppercase == "y"){
      availCharacters = availCharacters.concat(upperChar);
    };
  //prompt user to include numeric 
  var numeric = promptYesNo("Include numeric characters?");
    if (!numeric) {
      return "cancel"
    } else if (numeric == "y"){
      availCharacters = availCharacters.concat(numericChar);
    };
  //prompt user to include 
  var special = promptYesNo("Include special characters?");
    if (!special) {
      return "cancel"
    } else if (special == "y"){
      availCharacters = availCharacters.concat(specialChar);
    };
  //Generate password 
  for (var i = 0; i < length; i++) {
    password = password + availCharacters[Math.floor(Math.random() * availCharacters.length)]
  };
  return password;
}

function promptLength(){
    var passwordLength = prompt("What do you want the length of the password to be? (8 - 128)");
    if (passwordLength == undefined) {
      return;
    };
    if (isNaN(Number(passwordLength)) || !Number.isInteger(passwordLength) || passwordLength == "") {
      alert("Please enter a valid integer.");
      return promptLength();
    };
    if (passwordLength < 8 || passwordLength >128) {
      alert("Password must be between 8 and 128 characters.");
      return promptLength();
    } else {
      return passwordLength;
    };    
}

function promptYesNo(msg){
  var YesNo = prompt(msg + " ( y / n )");
  if (YesNo == undefined) {
    return;
  };
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
  if(password == "cancel"){return alert("Request Canceled")};
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

