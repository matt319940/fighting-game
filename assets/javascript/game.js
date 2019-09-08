$(document).ready(function() {

    var subzero = {
        name: "subzero",
        hp: 100,
        ap: 10
    }

    var scorpion = {
        name: "scorpion",
        hp: 100,
        ap: 10
    }

    var liukang = {
        name: "liukang",
        hp: 100,
        ap: 10
    }

    var raiden = {
        name: "raiden",
        hp: 100,
        ap: 10
    }


function health(){
    $("#subzeroHP").text(subzero.hp);
    $("#scorpionHP").text(scorpion.hp);
    $("#liukangHP").text(liukang.hp);
    $("#raidenHP").text(raiden.hp);
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
            
            var x = this;
            defender(x);    
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
            
            attack(character, enemy);


           
            click++;
       }
    });
}

function attack(character, enemy){
    $("#attackButton").on("click", function(event){
        enemy.hp -= character.ap;
        health();
        if(enemy.hp <= 0){
            $("#defenderSection").html("");
            defender(character);
        }
    });

}

health();
characterSelect();

// var click1 = 0;
// var click2 = 0;
// $(".characterWrapper").on("click", function(event){
//     if(click1 == 0){
//     $("#characterSelect").css({"display": "none"});
//      $(this).appendTo("#yourCharacter");
//      $(".characterWrapper").not(this).appendTo("#remainingEnemies");
//      var x = this;

//      $(".characterWrapper").on("click", function(event){
//          if(click2 == 0 && this !== x){
//             $(this).appendTo("#defenderSection");
//             click2++;
//         }
//      });
//     click1++;
//     }
// });





});