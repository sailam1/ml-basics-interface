# -*- coding: utf-8 -*-
"""
Created on Mon Jul 27 22:24:18 2020

@author: work
"""

import pickle
import os
import cv2
import numpy as np
import sys

c=False
current_dirct=os.getcwd()


try:
    with open("C:\\Users\\work\\Desktop\\ml project 2\\upload\\trainer2.pickle",'rb') as reader:            #change it not perfect
        classifier=pickle.load(reader)
except:
    print("error in loading the classifier")



try:
    img=cv2.imread("C:\\Users\\work\\Desktop\\ml project 2\\upload\\img.jpg",3)                          #change it not perfect
    img=cv2.resize(img,(64,64))
    img=np.expand_dims(img,axis=0)

except:
    print("error in loading image.please3, try another image format.")


try:
    output=classifier.predict(img)
    c=True;
except:
    print("we will solve our issues soon.sorry, for inconvineace")


if(c):

    if(output<0.7):
        print("it is a cat")
    else:
        print("it is a dog")
else:
    print("try again")




