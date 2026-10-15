import sys
# Doubles the backslash in US\$ occurrences (JS "..." strings need US\$ to produce US\$ in the JSON).
BS=chr(92)
for p in sys.argv[1:]:
    s=open(p,encoding='utf8').read()
    one="US"+BS+"$"; two="US"+BS+BS+"$"
    s=s.replace(two,one)      # normalise
    s=s.replace(one,two)
    open(p,'w',encoding='utf8').write(s)
