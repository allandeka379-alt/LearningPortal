l="content/subjects/mathematics-o/lessons/statistics/cumulative-frequency.md"
t=open(l,encoding="utf8").read()
pairs=[
(r"1. Median: read at $\frac{1}{2} \times 80 = 40$. The 40th value is in $60 < t \leq 70$, which holds the 33rd to 48th values. It is the 8th of 16 values in that class: $60 + \frac{8}{16} \times 10 = 65$ minutes.",
 r"1. Median: read at $\frac{1}{2} \times 80 = 40$. Across from 40 to the curve and down gives $65.2$ minutes. Check: the 40th value is in $60 < t \leq 70$ (the 33rd to 48th values), the 8th of 16 values in that class, so assuming an even spread $60 + \frac{8}{16} \times 10 = 65$ minutes."),
(r"2. Lower quartile: read at 20. The 20th value is the 4th of 16 values in $50 < t \leq 60$: $50 + \frac{4}{16} \times 10 = 52.5$ minutes.",
 r"2. Lower quartile: read at 20, which gives $52.7$ minutes from the curve. Check: the 20th value is the 4th of 16 values in $50 < t \leq 60$, so $50 + \frac{4}{16} \times 10 = 52.5$ minutes with an even spread."),
(r"3. Upper quartile: read at 60. The 60th value is the 12th of 20 values in $70 < t \leq 80$: $70 + \frac{12}{20} \times 10 = 76$ minutes.",
 r"3. Upper quartile: read at 60, which gives $75.8$ minutes from the curve. Check: the 60th value is the 12th of 20 values in $70 < t \leq 80$, so $70 + \frac{12}{20} \times 10 = 76$ minutes with an even spread."),
(r"4. $\text{IQR} = 76 - 52.5 = 23.5$ minutes, and the semi-interquartile range is $11.75$ minutes.",
 r"4. $\text{IQR} = 75.8 - 52.7 = 23.1$ minutes, and the semi-interquartile range is $11.55$ minutes. (The even-spread checks give $76 - 52.5 = 23.5$ and $11.75$, within a small tolerance of the curve readings.)"),
("A smooth curve drawn by hand gives readings close to these values, and examiners accept answers within a small tolerance.",
 "A smooth curve drawn by hand gives readings close to the even-spread checks, and examiners accept answers within a small tolerance. In the figure below the reading lines meet the curve exactly."),
("meet the curve at the lower quartile 52.5, the median 65 and the upper quartile 76 minutes.",
 "meet the curve at the lower quartile 52.7, the median 65.2 and the upper quartile 75.8 minutes."),
]
for a,b in pairs:
    assert a in t,a[:40]
    t=t.replace(a,b)
open(l,"w",encoding="utf8").write(t)
print("ok")
