#!/usr.bin.python
# This is the main file performing the entire operation together
from subprocess import call
import webbrowser
import os
import time
# Registering a Chrome Instance
# New Chrome instance 

url = "http://localhost:4000/index"
if __name__ == '__main__':
    webbrowser.open_new(url)
    call(["node", "index.js"])
    

