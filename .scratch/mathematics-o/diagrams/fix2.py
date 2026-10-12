def edit(p,pairs):
    s=open(p,encoding="utf8").read()
    for a,b in pairs:
        assert a in s,a[:60]
        s=s.replace(a,b)
    open(p,"w",encoding="utf8").write(s)
edit(".scratch/mathematics-o/diagrams/geometry3.mjs",[('ax.label(-0.9, 3.6, "A′B′C′", { weight: 700, fill: C.amber, anchor: "start", size: 15 })','ax.label(2, 5.7, "A′B′C′", { weight: 700, fill: C.amber, anchor: "middle", size: 15 })')])
edit(".scratch/mathematics-o/diagrams/stats.mjs",[
('b += ax.tag(t, ty, lab, { dx: anc === "end" ? -6 : 6, anchor: anc, fill: C.amber, size: 14 });','b += ax.tag(31, cfv + 3.2, lab, { anchor: "start", fill: C.amber, size: 14 });')])
