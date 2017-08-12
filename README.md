# lyrics-to-go
1) Download the zip above
2) Double-tap on the download to unzip
3) Press Command + Space and search for Terminal
4) Open Terminal and copy this line into the terminal and enter this series of commands, pressing enter after each one:
 ```
 cd ~/Downloads/lyrics-to-go
 ./bin/python2.7 -m pip install requests
 ./bin/python2.7 -m pip install rauth
 ./bin/python2.7 lyrics_to_go.py
 ```
5) Open up the file named 'wordFile' in any text editor and type each word you want process on a new line and save the file
6) Copy this line into the terminal and press enter:
 ```python lyrics-to-go.py wordFile```
7) A file with the results of the program will be created in the words folder for each word in your word list file
