function plot(fert) {
    this.state = 0;
        // State
        //  0 growing
        //  1 grown, ready to harvest()
        //  2 empty, needs sowing
    this.fertility = fert; // Number of ticks to fully grow
    this.growth = 0;
    this.yeild = 3; // Yeild constant, the maximum grains harvested

    this.tick = function() {
        if(this.state == 0) {
            this.growth += 1;
            if(this.growth >= this.fertility) this.state = 1;
        }
    }

    this.harvest = function() {
        // This function returns the number of grains to add to the total
        if(this.state == 1) {
            this.growth = 0;
            this.state = 2;
            return Math.floor((Math.random() * this.yeild) + 1);;
        }
        return 0;
    }
}

var player = {
    grains: 0,
    money: 0
}
var g = document.createElement("div");
var m = document.createElement("div");
var plots = [new plot(10),new plot(11),new plot(12)];
var p = document.createElement("div");
function redraw() {
    g.innerHTML = "Grains: "+player.grains.toString();
    m.innerHTML = "Money: "+player.money.toString();
    p.innerHTML = "";
    plots.forEach(function(e) {
        var progress = document.createElement("progress");
        progress.max = e.fertility;
        progress.value = e.growth;
        p.appendChild(progress);
        p.innerHTML += "<br>";
    });
}
window.setInterval(function() {
    plots.forEach(function(e) {e.tick();});
    redraw();
},1000);
var b = document.createElement("button");
b.innerHTML = "Harvest";
b.addEventListener("click",function() {
    plots.forEach(function(e) {player.grains += e.harvest();});
    redraw();
});
var s = document.createElement("button");
s.innerHTML = "Re-sow";
s.addEventListener("click",function() {
    plots.forEach(function(e) {
        if(player.grains > 0 && e.state == 2) {
            e.state = 0;
            player.grains--;
        }
    });
    redraw();
});
var w = document.createElement("button");
w.innerHTML = "Sell 1 Grain";
w.addEventListener("click",function() {
    if (player.grains > 0) {player.grains--; player.money++; redraw();}
});
document.body.appendChild(g);
document.body.appendChild(m);
document.body.appendChild(b);
document.body.appendChild(s);
document.body.appendChild(w);
document.body.appendChild(p);
redraw();
