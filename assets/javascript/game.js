$(document).ready(function() {

    var subzero = {
        name: "Sub-Zero",
        hp: 120,
        ap: 8,
        cap: 25
    }

    var scorpion = {
        name: "Scorpion",
        hp: 180,
        ap: 12,
        cap:25
    }

    var liukang = {
        name: "Liu Kang",
        hp: 100,
        ap: 10,
        cap: 5
    }

    var raiden = {
        name: "Raiden",
        hp: 150,
        ap: 10,
        cap: 20
    }

    var click = 0;
    var wins = 0;


function health(){
    $("#subzeroHP").text(subzero.hp);
    $("#scorpionHP").text(scorpion.hp);
    $("#liukangHP").text(liukang.hp);
    $("#raidenHP").text(raiden.hp);
}

function results(enemy, apTemp, character){
    
    if(enemy.hp <= 0){
        $("#results1").text("You have defeated " + enemy.name + ". You can choose to fight another enemy.");
        $("#results2").text("");
        wins++;
    }
    else if(enemy.hp > 0){
        $("#results1").text("You attacked " + enemy.name + " for " + apTemp + " damage.");
        $("#results2").text(enemy.name + " attacked you back for " + enemy.cap + " damage.");
    }
    if(wins == 3){
        $("#results1").text("YOU WIN!");
        $("#results2").text("");
    }
    if(character.hp <= 0){
        $("#results1").text("YOU LOSE!");
        $("#results2").html("<button type='button'>Retry?</button>");
        $("#results2 button").on("click", function(event){
            location.reload();
        });
    }


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

    click++;
    if(click == 1){
        character.cap = 0;
    }
   
    var enemy = toObject(y.id);
    var apTemp = character.cap;

    $("#attackButton").on("click", function(event){


        if(enemy.hp > 0){
            enemy.hp -= apTemp;
            apTemp += character.ap;
            if(enemy.hp > 0)
            character.hp -= enemy.cap;
        }
        
        health();
        results(enemy, apTemp, character);
        
        if(enemy.hp <= 0){
            $("#defenderSection").html("Defender Section<br>");
            enemy = "";
            character.cap = apTemp;
            defender(x);
        }
        
        
    });

}

health();
characterSelect();


});