from faker import Faker
from faker.providers import internet
import json
#from faker.providers.geo import geo
fake = Faker()
from random import randint, sample, choice

specialties = json.loads(open("./specialties.liquid","r").read())
titles = json.loads(open("./titles.liquid","r").read())

COMPANY_NUMBER = 500;
PROGRAMMER_NUMBER = 1000;

records = []

def generate_programmers(size):
  for id in range(size):
    records.append({
      "type_name": "modules/geolocation/programmer",
      "properties": {
        "name": fake.name(),
        "email": fake.email(),
        "title": choice(titles),
        "specialties": sample(specialties, randint(3,7)),
        "company_id": randint(1,COMPANY_NUMBER-1)
      }
    })

def generate_companies(size):
  for id in range(size):
    location = fake.local_latlng(country_code="US", coords_only=False)

    records.append({
      "id": id,
      "type_name": "modules/geolocation/company",
      "properties": {
        "name": fake.company() + ", " + fake.company_suffix(),
        "description": fake.catch_phrase(),
        "city": location[2],
        "timezone": location[4],
        "location": {
          "type": "Point",
          "coordinates": [float(location[1]), float(location[0])],
        }
      }
    })

generate_companies(COMPANY_NUMBER)
generate_programmers(PROGRAMMER_NUMBER)

print(json.dumps({ "records": records, "users": [], "transactables": [] }))
