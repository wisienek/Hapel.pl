var tytul="§e";
function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getName()=="minecraft:written_book"){
        var t1 = mainh.getText()[0];
        var text = JSON.parse(t1).text;
        if(tytul.length==2){
            tytul += text;
            return e.player.message("Załadowano text: "+tytul);
        }else{
            return e.player.message("Już mam temat książki: "+ tytul + "§f, jeżeli chcesz go usunąć kliknij na mnie pustą ręką");
        }
    }else if(mainh.getDisplayName().toLowerCase()=="kluczyk do drzwi"){
        if(tytul.length>2){
            var lore = [];
            for(var i=0;i<mainh.getLore().length;i++){
                lore.push(mainh.getLore()[i]);
            }
            lore.push(tytul);
            mainh.setLore(lore);
            return;
        }else{
            return e.player.message("Jeszcze nie mam tytułu z książki!");
        }
    }else if(mainh.getName()=="minecraft:air"){
        e.player.message("Aby dodać opis do kluczyka musisz mieć podpisaną książkę odpowiednim textem - brana pod uwagę jest jedynie pierwsza linijka! Najpierw kliknij nią na mnie ppm, a potem kluczykiem");
        tytul="§e";
        return;
    }
}
