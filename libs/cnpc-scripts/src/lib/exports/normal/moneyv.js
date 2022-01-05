var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var world = API.getIWorlds()[0];

/**
 * Just spawns money into player's account
 * @param {string} name player's name
 * @param {number} ammount ammount to be spawned
 * @returns 
 */
function payPlayer(name, ammount) {
  if (!name) return {
    isError: true,
    error: "No name!"
  };

  if (isNaN(parseFloat(ammount)))
    return {
      isError: true,
      error: "Wrong ammount!"
    };

  var x = API.executeCommand(world, "eco give " + name + " " + ammount);
  if (x && x.indexOf("dodane do") > -1)
    return true;

  return {
    isError: true,
    error: "Unknown error!"
  };
}

/**
 * Requests payment from a player
 * @param {string} name Player's name
 * @param {number} ammount ammount requested
 * @returns {boolean | CustomError} Returns true or error
 */
function requestPayment(name, ammount) {
  if (!name) return {
    isError: true,
    error: "No name!"
  };

  if (isNaN(parseFloat(ammount)))
    return {
      isError: true,
      error: "Wrong ammount!"
    };

  if (ammount == 0)
    return true;

  var balance = wallet(name);
  if (typeof balance == "object")
    return balance;

  if (balance < ammount)
    return {
      isError: true,
      error: "Player do be broke!"
    };

  var y = API.executeCommand(world, "eco take " + name + " " + ammount);

  if (y && y.indexOf("§e$"+ammount+"§a zostało pobrane z konta gracza") > -1)
    return true;

  return {
    isError: true,
    error: "Unknown error!"
  };
}

/**
 * Gets player ballance
 * @param {string} name name of a player 
 * @returns {number} ammmount of money that player has or undefined
 */
function wallet(name) {
  if (!name) return 0;

  var x = API.executeCommand(world, "balance " + name);
  x = x.split("$")[1];

  if (isNaN(x))
    return 0;

  return parseFloat(x)
}
