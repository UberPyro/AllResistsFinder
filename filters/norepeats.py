
CAPMons = [
    "Syclant", 
    "Revenankh", 
    "Pyroak", 
    "Fidgit", 
    "Stratagem", 
    "Arghonaut", 
    "Kitsunoh", 
    "Cyclohm", 
    "Colossoil", 
    "Krilowatt", 
    "Voodoom", 
    "Tomohawk", 
    "Necturna", 
    "Mollux", 
    "Auromoth", 
    "Malaconda", 
    "Cawmodore", 
    "Volkraken", 
    "Plasmanta", 
    "Naviathan", 
    "Crucibelle", 
    "Kerfluffle"
]

def Or(x, y):
    return x or y

with open("out.txt") as f:
    t = f.read()

a = frozenset(frozenset(y for y in x.split(", ")) for x in t.split("\n") if reduce(Or, [z not in CAPMons for z in x.split(", ")]))
b = "\n".join([", ".join(x) for x in a])

print(b)

with open("out2.txt", "w") as g:
    g.write(b)