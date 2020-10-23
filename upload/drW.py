# -*- coding: utf-8 -*-
"""
Created on Thu Aug 20 16:09:02 2020

@author: work
"""

from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
boolean1=False
boolean2=False

import os
os.chdir("path/to")
print(os.path.abspath('abc'))


import pickle
try:
    with open("C:\\Users\\work\\Desktop\\ml project 2\\upload\\drV2.pickle",'rb') as reader:            #change it not perfect
        classifier=pickle.load(reader)
except:
    print("error in loading the classifier. try differnt algorithm")
    boolean1=True

if(not boolean1):
    try:
        img=load_img("C:\\Users\\work\\Desktop\\ml project 2\\upload\\drimg.jpg",color_mode = "grayscale",target_size=((28,28)))
        img=img_to_array(img)
        img=img.reshape(1,28,28,1)
        img=img.astype("float32")
        img=img/255.0
    
    except:
        print("error in processing image.try different image format like jpg png etc.")
        boolean2=True

if(not boolean1 and not boolean2):
    try:
        val=classifier.predict_classes(img)
    
        print(val[0])
    except:
        print("sorry,problem with predicting image.we will solve it soon.")



