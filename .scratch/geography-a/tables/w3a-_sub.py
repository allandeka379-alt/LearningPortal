import sys,json
# usage: python w3a-_sub.py file.mjs subs.json  (list of [old,new] pairs, each must match exactly once)
p=sys.argv[1]; subs=json.load(open(sys.argv[2],encoding='utf8'))
s=open(p,encoding='utf8').read()
for o,n in subs:
    c=s.count(o)
    if c!=1: print("MATCH COUNT",c,"for",o[:70]); continue
    s=s.replace(o,n)
open(p,'w',encoding='utf8').write(s)
