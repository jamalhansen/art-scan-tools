"use strict";

const fs = require('fs');
const config = require("./lib/config.js")

const io = require("./lib/io.js")
const image = require("./lib/image.js")


const go = async () => {
    const config_data = config.load(config.getConfiguration)
    const inbox_path = config.addHome(config_data.inbox)
    const target_path = config.addHome(config_data.target)

    const image_list = await generateInboxList(inbox_path, config_data)
    const target_list = await generateTargetList(target_path, config_data)
    const filtered_list = image.removeExisting(image_list, target_list)

    image.processImages(inbox_path, target_path, filtered_list)
}


const generateInboxList = (inbox_path, config_data) => {
    console.log(`Gathering images from inbox: "${inbox_path}"`)
    return io.listFiles(inbox_path).then(image.inbox)
}

const generateTargetList = (target_path, config_data) => {
    console.log(`Gathering images from inbox: "${target_path}"`)
    return io.listFiles(target_path).then(image.inbox)
}

module.exports = {go}