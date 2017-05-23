__author__ = 'Nisha Bhanushali'

import pymongo
list_result=[]

def readApiText():

    global list_result
    global data
    keys =["id","title","summary","rating","name","label","author","description",
           "type","downloads","useCount","sampleUrl","downloadUrl","dateModified",
           "remoteFeed","numComments","commentsUrl","Tags","category","protocols",
           "serviceEndpoint","version","wsdl","data formats","apigroups","example",
           "clientInstall","authentication","ssl","readonly","VendorApiKits",
           "CommunityApiKits","blog","forum","support","accountReq","commercial",
           "provider","managedBy","nonCommercial","dataLicensing","fees","limits",
           "terms","company","updated"]

    readFile(keys,"api.txt")
    createDatabase("mongodb://myTester:xyz123@127.0.0.1:27017/tracking?authSource=test",'apis')

def readMashupText():

    global list_result
    global data

    keys = ["id","title","summary","rating","name","label","author","description","type","downloads","useCount",
            "sampleUrl","dateModified","numComments","commentsUrl","tags","APIs","updated"]

    readFile(keys,"mashup.txt")
    createDatabase("mongodb://myTester:xyz123@127.0.0.1:27017/tracking?authSource=test",'mashup')

def readFile(keys,filename):

    with open(filename,encoding = "ISO-8859-1") as f:
        for line in f:
            currentLine = line.split("$#$")
            length = len(currentLine)
            d = {}
            for iter in range(length):
                currLine = currentLine[iter]
                if "###" in currLine:
                    currLine=currLine.replace("###",";")
                d [keys[iter]]= currLine
            list_result.append(d)

def createDatabase(auth,db_name):
    global list_result
    client = pymongo.MongoClient(auth)
    db = client['test']
    coll = db[db_name]
    db.mashup.insert_many(
        list_result)



readMashupText()
readApiText()

