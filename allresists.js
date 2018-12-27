var allTypes = [
    "Normal", 
    "Fire", 
    "Fighting", 
    "Water", 
    "Flying", 
    "Grass", 
    "Poison", 
    "Electric", 
    "Ground", 
    "Psychic", 
    "Rock", 
    "Ice", 
    "Bug", 
    "Dragon", 
    "Ghost", 
    "Dark", 
    "Steel", 
    "Fairy"
];

function resistDict(mon) {
    tList = ["t1"]
    if (mon.hasOwnProperty("t2")) {
        tList.push("t2");
    }
    let acc = [];
    for (let pt in tList) {
        let acc2 = {};
        for (i in allTypes) {
            let t = allTypes[i];
            acc2[t] = TYPE_CHART_XY[t][mon[tList[pt]]];
        }
        acc.push(acc2);
    }
    let acc3;
    if (tList.length > 1) {
        acc3 = {};
        for (let i in allTypes) {
            let t = allTypes[i];
            acc3[t] = acc[0][t] * acc[1][t];
        }
    } else {
        acc3 = acc[0];
    }
    if (mon.ab === "Flash Fire") {
        acc3.Fire = 0;
    } else if (mon.ab === "Levitate") {
        acc3.Ground = 0;
    } else if (mon.ab in {"Lightning Rod": true, "Volt Absorb": true, "Motor Drive": true}) {
        acc3.Electric = 0;
    } else if (mon.ab in {"Water Absorb": true, "Storm Drain": true}) {
        acc3.Water = 0;
    } else if (mon.ab == "Sap Sipper") {
        acc3.Grass = 0;
    } else if (mon.ab == "Thick Fat") {
        acc3.Fire = .5 * acc3.Fire;
        acc3.Ice = .5 * acc3.Ice;
    } else if (mon.ab == "Heatproof") {
        acc3.Fire = .5 * acc3.Fire;
    }
    return acc3;
}

function minimize(d0, d1) {
    let acc = {};
    for (let i in allTypes) {
        let t = allTypes[i];
        acc[t] = Math.min(d0[t], d1[t]);
    }
    return acc;
}

function generate(){
    let acc_ = [];
    let checkedPokemon = {};
    const dex = POKEDEX_SM
    for (let mon1 in dex) {
        if (dex.hasOwnProperty(mon1)) {
            let d1 = resistDict(dex[mon1]);
            for (let mon2 in checkedPokemon) {
                if (checkedPokemon.hasOwnProperty(mon2)) {
                    let d2 = checkedPokemon[mon2];
                    let d3 = minimize(d1, d2);
                    b = true;
                    for (let t in d3) {
                        if (d3.hasOwnProperty(t)) {
                            if (d3[t] >= 1) {
                                b = false;
                            }
                        }
                    }
                    if (b) acc_.push([mon1, mon2]);
                }
            }
            checkedPokemon[mon1] = d1;
        }
    }
    return acc_;
}

function output() {
    const ans = generate();
    for (i in ans) {
        pair = ans[i];
        console.log(pair[0] + ", " + pair[1]);
    }
}

function generate2(){
    let acc_ = [];
    let checkedPokemon = {};
    let checkedPokemon2 = {};
    const dex = POKEDEX_SM
    for (let mon1 in dex) {
        if (dex.hasOwnProperty(mon1)) {
            let d1 = resistDict(dex[mon1]);
            for (let mon2 in checkedPokemon) {
                if (checkedPokemon.hasOwnProperty(mon2)) {
                    console.log(mon2);
                    let d2 = checkedPokemon[mon2];
                    let d5 = minimize(d1, d2);
                    c = true;
                    for (let t in d5) {
                        if (d5.hasOwnProperty(t)) {
                            if (d5[t] >= 1) {
                                c = false;
                            }
                        }
                    }
                    if (c) {
                        acc_.push([mon1, mon2, "*"]);
                        continue;
                    }
                    for (let mon3 in checkedPokemon2) {
                        if (checkedPokemon2.hasOwnProperty(mon3)) {
                            let d3 = checkedPokemon2[mon3];
                            let d4 = minimize(d5, d3);
                            b = true;
                            for (let t in d4) {
                                if (d4.hasOwnProperty(t)) {
                                    if (d4[t] >= 1) {
                                        b = false;
                                    }
                                }
                            }
                            if (b) acc_.push([mon1, mon2, mon3]);
                        }
                    }
                    checkedPokemon2[mon2] = d2;
                }
            }
            checkedPokemon[mon1] = d1;
        }
    }
    return acc_;
}

function output2() {
    const ans = generate2();
    for (i in ans) {
        tuple = ans[i];
        console.log(tuple.join(", "));
    }
    return ans
}