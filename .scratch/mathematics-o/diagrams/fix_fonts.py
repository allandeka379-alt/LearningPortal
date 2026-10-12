def edit(p,pairs):
    s=open(p,encoding="utf8").read()
    for a,b in pairs:
        assert a in s,a[:60]
        s=s.replace(a,b)
    open(p,"w",encoding="utf8").write(s)
edit(".scratch/mathematics-o/diagrams/more.mjs",[
('T(S[0], S[1] - 20, "start", { size: 12, fill: C.muted }) + T(150, 345, "3 red and 7 blue counters; the first counter is not replaced.", { size: 13, fill: C.muted, anchor: "start" })','T(S[0], S[1] - 20, "start", { size: 14, fill: C.muted }) + T(150, 355, "3 red and 7 blue counters; the first counter is not replaced.", { size: 14, fill: C.muted, anchor: "start" })'),
('D.text(L2[i][0] + 40, L2[i][1] + 5, pr, { size: 12, fill: C.muted })','D.text(L2[i][0] + 44, L2[i][1] + 5, pr, { size: 14, fill: C.muted })'),
('b += D.text(L2[i][0] + 10, L2[i][1] + 5, n, { weight: 700, size: 15 })','b += D.text(L2[i][0] + 12, L2[i][1] + 5, n, { weight: 700, size: 15 })'),
('700, 360, alt, "Figure: multiply along the branches','780, 370, alt, "Figure: multiply along the branches'),
])
edit(".scratch/mathematics-o/diagrams/geometry3.mjs",[
('const ax = D.axes({ x: [-9, 7], y: [-1, 8], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 600, h: 400 });','const ax = D.axes({ x: [-9, 7], y: [-1, 8], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 760, h: 440 });'),
('b += ax.label(3.9, 1.9, "ABC", { weight: 700, fill: C.blue, anchor: "middle" }) + ax.label(1.7, 4.5, "A′B′C′", { weight: 700, fill: C.amber, anchor: "middle", dx: 0 }) + ax.label(-6.2, 1.8, "A″B″C″", { weight: 700, fill: C.green, anchor: "middle" });','b += ax.label(3.8, 0.45, "ABC", { weight: 700, fill: C.blue, anchor: "middle", size: 15 }) + ax.label(-0.9, 3.6, "A′B′C′", { weight: 700, fill: C.amber, anchor: "start", size: 15 }) + ax.label(-5.5, 0.45, "A″B″C″", { weight: 700, fill: C.green, anchor: "middle", size: 15 });'),
('b += ax.tag(6.9, 7.2, "y = x", { anchor: "end", dy: 4 }) + ax.tag(-1, 6.6, "x = −1", { dx: -64, dy: 4 });','b += ax.tag(6.9, 7.3, "y = x", { anchor: "end", size: 14 }) + ax.tag(-1, 7.4, "x = −1", { dx: -8, anchor: "end", size: 14 });'),
('await fig("reflection-y-x-and-x-minus-1", b, 600, 400,','await fig("reflection-y-x-and-x-minus-1", b, 760, 440,'),
])
