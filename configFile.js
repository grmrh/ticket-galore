function configFile() {
  const fs = require("fs");
  try {
    //let config = require('./config/config.json');
    //console.log('config file \n', config);
    let rawContent = fs.readFileSync('./config/config.json');
    let cfg = JSON.parse(rawContent);
    fs.writeFileSync('./config/config.json','');

    cfg.development.host = process.env.MYSQL_HOST;
    cfg.development.port = new Number(process.env.MYSQL_PORT);
    cfg.development.username = process.env.MYSQL_ROOT_USERNAME;
    cfg.development.password = process.env.MYSQL_ROOT_PASSWORD;

    let cfgContent = JSON.stringify(cfg, null, 2);
    fs.writeFileSync('./config/config.json', cfgContent);
    console.log('config file after writeFile \n', cfgContent);
  } catch (error) {
      process.exit(1);
  }
}

module.exports = configFile;