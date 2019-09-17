"use strict";

const yaml = require('js-yaml')

const io = require("./io.js")
const information = require("./information.js")


const imageExtensions = ["jpg", "png"]

const inbox = files => {
  return files.map(io.expand).filter(x => imageExtensions.includes(x.extension))
}

const processImages = (source_path, target_path, filtered_list) => {
  const map_source = x => {
    const path = require("path")
    return {
      source: path.join(source_path, x.filename),
      resize_target: path.join(target_path, x.filename),
      copy_target: path.join(target_path, `${x.name}-full.${x.extension}`),
      orientation: null
    }
  }
  const image_names = filtered_list.map(map_source)
  const image_data = generateTemplates(target_path, filtered_list)

  if (image_names.length == 0) {
    console.log("No files to process found.")
  } else {
    io.writeYaml(image_data)
    copyResized(image_names)
  }
}

const copyResized = image_names => {
  image_names.forEach( async image_name => {
    const oriented = await orientation(image_name)
    await resize(image_name, sizing(oriented))
  })
}

const sizing = oriented => {
  (oriented === "landscape") ? { height: 492, width: 820 } : { height: 820, width: 492 }
}

const orientation = image_name => {
  const sharp = require('sharp');
  console.log(`Inspecting ${image_name.source}...`)
  return sharp(image_name.source)
    .metadata()
    .then(metadata =>  {
      if (metadata.width > metadata.height) {
        return "landscape"
      } else {
        return "portrait"
      }
    })
    .catch(function(err) {
      console.log(`Error occurred determining metadata: "${err}"`);
    })
}

const resize = image_name => {
  const sharp = require('sharp');
  const new_size = sizing(image_name.orientation)
  console.log(`Resizing ${image_name.source} to ${image_name.resize_target}`)
  return sharp(image_name.source)
    .resize(new_size)
    .toFile(image_name.resize_target)
    .then(function(newFileInfo) {
      moveFull(image_name)
      console.log("Success");
    })
    .catch(function(err) {
      console.log("Error occurred");
    })
}

const moveFull = image_name => {
  console.log(`Moving ${image_name.source} to ${image_name.copy_target}`)
  io.rename(image_name.source, image_name.copy_target)
}

const removeExisting = (new_images,  existing_images) => {
  const target_files = existing_images.map(x => x.filename)
  return new_images.filter( x => !(target_files.includes(x.filename)))
}

const generateTemplates = (target_path, image_list) => {
  const template_maker = generateTemplate(target_path)
  return image_list.map(template_maker)
}

const generateTemplate = (target_path) => {
  return (image_list) => {
      const name = path.join(target_path, `${image_list.name}.yml`)
      const yml = yaml.dump(information.getInfo(image_list))
      return {name: name, yaml: yml}
  }
}

module.exports = {
  imageExtensions, 
  inbox, 
  processImages, 
  removeExisting, 
  generateTemplates, 
  generateTemplate,
  orientation
}