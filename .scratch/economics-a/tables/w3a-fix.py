import sys,json
# usage: python w3a-fix.py file edits.json   (edits: [[old,new],...]; plain strings, no escaping surprises)
p=sys.argv[1]
s=open(p,encoding="utf8").read()
for old,new in json.load(open(sys.argv[2],encoding="utf8")):
    if old not in s: print("MISSING:",old[:80])
    s=s.replace(old,new)
open(p,"w",encoding="utf8").write(s)
