import requests
import json

url = 'https://codeforces.com/api/problemset.problems'
data = requests.get(url).content
result = json.loads(data.decode())
result = result['result']['problems']
res = []

for problem in result:
    try:
        if(problem['rating'] > 800 and problem['rating'] < 1600):
            res.append(problem)
    except:
        print("fuck u")

print((res))
data = {
    "questions": res
}

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
