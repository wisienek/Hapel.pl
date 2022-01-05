var type;
function init(e) {
  e.item.setTexture(12, 'flying_things:pumpkin_stick');
  e.item.setItemDamage(12);
  e.item.setDurabilityShow(false);
  e.item.setCustomName('§r§eSelf-Mark Wybór znaku');
  e.item.setLore([
    '§8PPM: §rZmienia typ znaku',
    '§6LPM: §rDaje ci znak/odbiera',
  ]);
  type = 0;
}

function attack(e) {
  var marks = e.player.getMarks();
  if (marks.length != 0) {
    if (marks.length > 1) {
      for (var i = 1; i < marks.length; i++) {
        e.player.removeMark(marks[i]);
      }
      e.player.message('Usunięto nadmiar znaków!');
    }
    if (marks.length == 1) {
      var mark = marks[0];
      mark.setType(type);
      mark.update();
      e.player.message('Zamieniono znak na (' + type + ') !');
      return;
    }
  } else {
    var mark = e.player.addMark(type);
    e.player.message('dodano znak (' + type + ')');
    return;
  }
}

function interact(e) {
  type < 5 ? type++ : (type = 0);
  switch (type) {
    case 0:
      e.player.message('Załadowano znak §cPusty§r (' + type + ')');
      break;
    case 1:
      e.player.message('Załadowano znak §czapytania§r (' + type + ')');
      break;
    case 2:
      e.player.message('Załadowano znak §cWykrzyknik§r (' + type + ')');
      break;
    case 3:
      e.player.message('Załadowano znak §cstrzałki§r (' + type + ')');
      break;
    case 4:
      e.player.message('Załadowano znak §cczaszki§r (' + type + ')');
      break;
    case 5:
      e.player.message('Załadowano znak §ckrzyżyka§r (' + type + ')');
      break;
    case 6:
      e.player.message('Załadowano znak §cGwiazdy§r (' + type + ')');
      break;
  }
}
