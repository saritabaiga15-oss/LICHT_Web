import re
import json

with open('preview.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

print("Title:", re.findall(r'<title>(.*?)</title>', text))

# Look for json or data
data_initial = re.findall(r'data-initial.*?>({.*?})</script>', text)
if data_initial:
    data = json.loads(data_initial[0])
    print("INITIAL keys:", list(data.keys()))
    if "INITIAL_OPTIONS" in data:
        init_opts = data["INITIAL_OPTIONS"]
        print("init_opts keys:", list(init_opts.keys()))
        for k in ["request_view_permissions", "file_name", "user_data", "starting_points"]:
            if k in init_opts:
                print(f"{k}:", init_opts[k])

# Let's search for keywords in text
for word in ["Corporate", "recruitment", "employer", "employers", "job", "candidate", "LICHT", "Licht"]:
    matches = len(re.findall(word, text, re.IGNORECASE))
    print(f"Keyword '{word}' count: {matches}")
