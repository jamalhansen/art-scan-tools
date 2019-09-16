"use strict";

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const config = require("./lib/config.js")
const io = require("./lib/io.js")
const image = require("./lib/image.js")
const information = require("./lib/information.js")


const getConfiguration = () => {
    return fs.readFileSync("./config.yml", 'utf8');
}

const loadConfiguration = () => {
    return config.load(getConfiguration)
}

const generateInfo = config_data => {
    const inbox_path = config.add_home(config_data.inbox)
    console.log(`Gathering images from inbox: "${inbox_path}"`)
    return io.listFiles(inbox_path).then(image.inbox)
}

const runnit = async () => {
    const config_data = loadConfiguration()
    const info = await generateInfo(config_data)
    const home = config.home()
    const infos = info.map(x => {
        const name = path.join(home, config_data.target, `${x.name}.yml`)
        const yml = yaml.dump(information.getInfo(x))
        return {name: name, yaml: yml}
    })
    infos.forEach(info => {
        io.write(info.name, info.yaml)
        console.log(`Generating yaml for: "${info.name}"`)
    });
}

module.exports = {generateInfo, runnit}