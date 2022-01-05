export const serverOnlineJob = async function () {
  const data = await fetch('https://api.mcsrvstat.us/2/51.83.193.68:25923');

  //     if (err) { return console.error(err); }
  //     if(!body){ return console.warn(`Nie udało się pobrać danych z serwera!`) }
  //     if(!body.players){ return console.warn(`Server jest offline!`) }

  //     let x = new Date();
  //     let dzis = `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`;
  //     let czas = `${x.getHours()}:${x.getMinutes()}`;
  //     hplcon.query(`INSERT INTO online(data, czas, ilosc, gracze) VALUES ('${dzis}', '${czas}', '${body.players.online}', '${JSON.stringify(body.players.list)}')`,(err)=>{
  //         if(err)console.error;
  //         console.info(`Zrobiono ustalony Update graczy: ${body.players.online}`);
  //         log(`Zrobiono dzienny Update graczy: ${body.players.online}`);
  //     });
  // });
};
