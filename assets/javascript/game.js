$(document).ready(function() {

    var subzero = {
        name: "Sub-Zero",
        hp: 120,
        ap: 18,
    }

    var scorpion = {
        name: "Scorpion",
        hp: 180,
        ap: 15
    }

    var liukang = {
        name: "Liu Kang",
        hp: 100,
        ap: 25
    }

    var raiden = {
        name: "Raiden",
        hp: 150,
        ap: 20
    }


function health(){
    $("#subzeroHP").text(subzero.hp);
    $("#scorpionHP").text(scorpion.hp);
    $("#liukangHP").text(liukang.hp);
    $("#raidenHP").text(raiden.hp);
}

function results(x, y){
    $("#results").text("You attacked " + x + " for " + y + " damage.");
}

function toObject(x){
    if(x == "subzero")
    return subzero;
    if(x == "scorpion")
    return scorpion;
    if(x == "liukang")
    return liukang;
    if(x == "raiden")
    return raiden;
}

function characterSelect(){
    var click = 0;
    $(".characterWrapper").on("click", function(event){
        if(click == 0){

            var character = toObject(this.id);
            console.log(character);
            $("#characterSelect").css({"display": "none"});
            $(this).appendTo("#yourCharacter");
            $(".characterWrapper").not(this).appendTo("#remainingEnemies");
            
            defender(this);    
            click++;
        }
    });
};

function defender(x){
    var click = 0;
    var character = toObject(x.id);
    $(".characterWrapper").on("click", function(event){
        if(click == 0 && this !== x){
            var enemy = toObject(this.id);
            console.log(enemy);
            $(this).appendTo("#defenderSection");
            
            attack(x, this);

            click++;
       }
    });
}

function attack(x, y){

    var character = toObject(x.id);
    var enemy = toObject(y.id);
    var apTemp = character.ap;

    $("#attackButton").on("click", function(event){

        

        if(enemy.hp > 0){
            enemy.hp -= apTemp;
            apTemp += character.ap;
            console.log("ap =" + apTemp);
            if(enemy.hp > 0)
            character.hp -= enemy.ap;
        }
        
        health();
        
        if(enemy.hp <= 0){
            $("#defenderSection").html("Defender Section<br>");
            enemy = "";
            character.ap = apTemp;
            defender(x);
        }
        
        results(enemy.name, apTemp);
        
    });

}

health();
characterSelect();


});