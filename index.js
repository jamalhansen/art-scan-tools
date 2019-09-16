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

const generateInboxList = (inbox_path, config_data) => {
    console.log(`Gathering images from inbox: "${inbox_path}"`)
    return io.listFiles(inbox_path).then(image.inbox)
}

const generateTargetList = (target_path, config_data) => {
    console.log(`Gathering images from inbox: "${target_path}"`)
    return io.listFiles(target_path).then(image.inbox)
}

const runnit = async () => {
    const config_data = loadConfiguration()
    const inbox_path = config.add_home(config_data.inbox)
    const target_path = config.add_home(config_data.target)

    const image_list = await generateInboxList(inbox_path, config_data)
    const target_list = await generateTargetList(target_path, config_data)

    const target_files = target_list.map(x => x.filename)
    const filtered_list = image_list.filter( x => !(target_files.includes(x.filename)))

    const image_data = generate_templates(target_path, filtered_list)
    write_yaml(image_data)
}

const generate_templates = (target_path, image_list) => {
    const template_maker = generate_template(target_path)
    return image_list.map(template_maker)
}

const generate_template = (target_path) => {
    return (image_list) => {
        const name = path.join(target_path, `${image_list.name}.yml`)
        const yml = yaml.dump(information.getInfo(image_list))
        return {name: name, yaml: yml}
    }
}

const write_yaml = image_data => {
    image_data.forEach(image => {
        io.write(image.name, image.yaml)
        console.log(`Generating yaml for: "${image.name}"`)
    });
}

module.exports = {runnit}