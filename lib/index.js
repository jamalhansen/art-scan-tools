"use strict";

const yaml = require('js-yaml');
const fs = require('fs');
const config = require("./config.js")
const io = require("./io.js")
const image = require("./image.js")
const information = require("./information.js")
const path = require('path');

const getConfiguration = () => {
    return fs.readFileSync("./config.yml", 'utf8');
}

const loadConfiguration = () => {
    return config.load(getConfiguration)
}

const generateInfo = config => {
    return io.listFiles(config.inbox).then(image.inbox)
}

const runnit = async () => {
    const config = loadConfiguration()
    const info = await generateInfo(config)
    const infos = info.map(x => {
        const name = path.join(config.target, `${x.name}.yml`)
        const yml = yaml.dump(information.getInfo(x.name))
        return {name: name, yaml: yml}
    })
    infos.forEach(info => {
        io.write(info.name, info.yaml)
    });
}

module.exports = {generateInfo, runnit}