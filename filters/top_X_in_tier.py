import requests as rq

CUTOFF = 50

def And(x, y):
    return x and y

with open("out2.txt") as f:
    t = f.read()
combos = [x.split(", ") for x in t.splitlines()]

u = rq.get("https://www.smogon.com/stats/2018-07/gen7ou-1825.txt").text
u = [s[10:s[10:].find(" ") + 10].encode("ascii", "ignore") for s in u.splitlines()[5:]][:CUTOFF]

out = [c for c in combos if reduce(And, [d in u for d in c])]
out = "\n".join(", ".join(s) for s in out)

print(out)
with open("out3.txt", "w") as g: 
    g.write(out)