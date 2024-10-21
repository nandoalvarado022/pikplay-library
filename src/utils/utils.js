export function snakeToCamel(string) {
  let splitStringArr = string.split("_");
  let builtStr = splitStringArr.reduce((acc, curr, i) => {
    curr = i !== 0 ? curr[0].toUpperCase() + curr.slice(1) : curr;
    return acc + curr;
  }, "");
  return builtStr;
}

export function convertResponse(response) {
  if (response == null) return response;
  let parentKeys = Object.keys(response);
  parentKeys.forEach((key) => {
    let currentObj = response[key];
    delete response[key];
    let newKey = snakeToCamel(key);
    response[newKey] = currentObj;
    if (typeof response[newKey] === "object") {
      convertResponse(response[newKey]);
    }
  });
  return response;
}
