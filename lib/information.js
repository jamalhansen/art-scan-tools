const getTemplate = () => {
  return { 
    name: ""
    ,date: ""
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

const infer = filename => {
  const dn = splitFileName(filename)
  let result = {}
  result.name = dn.name.join("-")
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

const getInfo = filename => {
  const inferFromFile = () => {return infer(filename)}
  return merge(inferFromFile, getTemplate)
}

module.exports = {getTemplate, infer, splitFileName, parseDate, merge, getInfo}