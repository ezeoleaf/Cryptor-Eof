# Cryptor-Eof
Cryptor encrypts and disencrypt text with homemade encryption methods

# Notes
Cryptor comes with a dictionary of character in default positions. 
If you want to change the dictionary configuration, you can do it from GenerateDictionary.html, then copy and paste the result in:
- dictionary = {default dictionary} in cryptorLibrary.js 
- d={default dictionary} in cryptorLibrary.min.js

# Use
In CryptorTest.html you can test different methods to encrypt and disencrypt.

To encrypt some text, call the method encryptText(t,m)
- t = Text to encrypt
- m = Method

# Methods available:
- 'eof' = "Ezeoleaf"
- 'num' = "Numeric"
- 'vne' = "Vigenere"
- 'sxf' = "SixtyFour"
