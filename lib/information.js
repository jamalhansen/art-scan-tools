const getTemplate = () => {
  return { 
    name: ""
    ,imagefile: ""
    ,date: ""
    ,artist: "Jamal Hansen"
    ,author: "Jamal Hansen"
    ,title: ""
    ,scanned: ""
    ,category: ""
    ,tags: []
    ,media: []
    ,orientation: "landscape"
    ,description: ""
    ,references:[{
      name: ""
      ,url: ""
      ,description: ""
    }]
  }
}

const infer = info => {
  const dn = splitFileName(info.name)
  let result = {}
  result.name = dn.name.join("-")
  result.imagefile = info.filename
  result.date = parseDate(dn.date)
  result.title = dn.name.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(" ")
  result.scanned = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
  result.tags = dn.name
  return result
}

const splitFileName = filename => {
  const parts = filename.split("-")
  const date = parts.shift()
  return {date: date, name: parts}
}

const parseDate = s => {
  const y = s.substring(0,4);
  const m = s.substring(4,6);
  const d = s.substring(6,8);

  return new Date(y, m-1, d);
}

const merge = (v, d) => {
  const values = v()
  const defaults = d()
  let result = {}
  
  for (var key in defaults) {
    if (values.hasOwnProperty(key)) {
      result[key] = values[key]
    } else if (defaults.hasOwnProperty(key)) {
      result[key] = defaults[key]
    }
  }
  return result
}

const getInfo = info => {
  const inferFromFile = () => {return infer(info)}
  return merge(inferFromFile, getTemplate)
}

module.exports = {getTemplate, infer, splitFileName, parseDate, merge, getInfo}