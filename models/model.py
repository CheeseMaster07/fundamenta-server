from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi

# Establish a connection to MongoDB

uri = 'mongodb+srv://gabbepabbe:1x3YYY8910@cluster0.dvzxzlr.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=certifi.where())



db = client['test']
collection = db['stocks']

# Define the MongoDB schema
# post = {'_id': 1, 'name': 'rolf'}
data = collection.find()

# Insert the document into the collection
# collection.insert_one(post)
arr = []
for documents in data:
  arr.append(documents)

print(arr)