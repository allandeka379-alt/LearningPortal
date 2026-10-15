import sys
# usage: python w3a-splice.py file startmarker endmarker newblockfile
p,start,end,nb=sys.argv[1:5]
s=open(p,encoding="utf8").read()
i=s.index(start); j=s.index(end,i)
s=s[:i]+open(nb,encoding="utf8").read()+s[j:]
open(p,"w",encoding="utf8").write(s)
