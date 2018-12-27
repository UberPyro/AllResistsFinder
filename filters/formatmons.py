

with open("combos2.txt") as f:
    t = f.read()

def divide(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]

a = divide(sum([], t.split(",")), 3)
out = []
for i in a:
    if "Hydreigon" in i and not "*" in i:
        if "Honedge" in i:
            pass
        if "Doublade" in i:
            pass
        if "Aegislash-Blade" in i:
            pass
        if "Aegislash-Shield" in i:
            pass
        if "Kitsunoh" in i:
            pass
    else:
        out.append(", ".join(i))
out = "\n".join(out)


with open("out.txt", "w") as g:
    g.write(out)