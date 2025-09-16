let convertedValues = [];
let convertedValuesIndexes = [];

const decimalValue = (decimal, value) => {
  return parseFloat(value).toFixed(decimal);
};

const captureGroupString = (length) => {
  if (length == 0 || length == undefined) {
    return "";
  } else {
    let groups = captureGroupString(length - 1);
    groups += "$" + length + ",";
    return groups;
  }
};

const processDecimalValues = (groups, groupIndices, matches) => {
  Object.entries(groups).map((val) => {
    let decimal = val[0].split("_")[1];
    convertedValues.push(
      parseFloat(val[1].slice(0, -decimal) + "." + val[1].slice(-decimal))
    );
  });
  groupIndices.map((group) => {
    matches.indices.map((match, k) => {
      if (JSON.stringify(group) == JSON.stringify(match)) {
        convertedValuesIndexes.push(k);
      }
    });
  });
};

/* helper function to convert a line with the given regex, useful especially for the Orders Interface */
const convertLine = (line, regex, groups) => {
  return line.replace(regex, groups);
};

/* claims is different as well? haven't seen the data for this yet so this is a placeholder at the moment */
const processClaimsInterface = () => {};

/* Order interface is a lot different to the others */
const processOrderInterface = (data, lines, type) => {
  let ordersData = [];
  let headerIndexes = [];
  let headerLine = [];
  let filteredLines = lines.filter(
    (line) =>
      /*line.substring(0, 2) !== "OT" &&
      line.substring(0, 2) !== "OC" &&*/
      line.substring(0, 2) !== "FT" &&
      line.substring(0, 2) !== "FH" &&
      line.length !== 0
  );

  /* for orders we need to combine order header line to each order detail, ie each header can contain multiple order details lines */
  ordersData.push(data["oh"].heading + "," + data["ot"].heading + "," + data["oc"].heading + "," + data["od"].heading + "\n");

  filteredLines.map((line, i) => {
    let header = line.substring(0, 2).toLowerCase();

		console.log(header);

    let interfaceLength = interfaceData[type][header].heading.split(",").length;

    let regex = interfaceData[type][header].regex;

    let captureGroups = captureGroupString(interfaceLength).slice(0, -1);

    let matches = regex.exec(line);

    let currentLine = convertLine(line, regex, captureGroups);

    /* need a way to construct the lines, to add each oh type line to od type */
    if (header == "oh") {
      headerIndexes.push(i);
    }

    let groupIndices = matches.indices.groups
      ? Object.values(matches.indices.groups)
      : null;

    let groups = matches.groups ? matches.groups : null;

    if (groups != null) {
      processDecimalValues(groups, groupIndices, matches);
    }
    let finalLine = currentLine.split(",");

    /* sack off oc for now */
    if (header == "od" || header == 'oc' || header == 'ot') {
      headerLine = convertLine(
        filteredLines[headerIndexes[headerIndexes.length - 1]],
        interfaceData[type]["oh"].regex,
        captureGroupString(
          interfaceData[type]["oh"].heading.split(",").length
        ).slice(0, -1) + ","
      );

      for (let j = 0; j < convertedValuesIndexes.length; j++) {
        let index = convertedValuesIndexes[j] - 1;
        finalLine[index] = convertedValues[j];
      }
      finalLine = headerLine.concat(finalLine);

      ordersData.push(finalLine + "\n");
    }
  });
  return ordersData;
};

/* TO DO - refactor readFile function as it is very big at the moment, and contains repeated code with the order interface processing */
function readFile(input) {
  let file = input.files[0];
  let reader = new FileReader();

  reader.readAsText(file);

  let csvData = [];

  /* Clear the previous "click here to download" link if one already exists */
  document.getElementById("downloadFile").innerHTML = "";

  reader.onload = function () {
    /* using includes in the file name is a bit crap because for example, product and productgroup will both return a match and we need to tell exactly which file the user is uploading. Need to actually match the file name properly. The assumption here is that the user gets the file and doesn't rename it, so the format will always be <EBIZ or CORD>_<interface name><load of numbers.ext>, extract the interface name from in between */
    let interface = file.name.match(
      /((EBIZ_|CORD\d*_|SAP2WEB_|OURBOOKER))(?<interface>[a-z]+)(.*)/i
    );

    let fileType = interface.groups.interface
      ? interface.groups.interface.toLowerCase()
      : "";

    let splitLines = reader.result.split(/\r\n|\n/);

    let lines = splitLines.filter((line) => line.length > 0);

    if (fileType == "orders") {
      csvData = processOrderInterface(interfaceData[fileType], lines, fileType);
    } else {
      csvData.push(interfaceData[fileType].heading + "\n");

      let regex = interfaceData[fileType].regex;

      let interfaceLength = interfaceData[fileType].heading.split(",").length;

      let captureGroups = captureGroupString(interfaceLength).slice(0, -1);

      /* may have to look at using good ol for loops (because they are supposed to be quicker than map()?) because there are cases where a file
			could contain 10 million rows and the map function below cannot handle it.  */

      splitLines.map((line) => {
        // check against whitespaces / empty lines in the file
        if (line.length > 0) {
          let matches = regex.exec(line);

          let currentLine = line.replace(regex, captureGroups);

          if (matches.groups !== undefined) {
            processDecimalValues(
              matches.groups,
              Object.values(matches.indices.groups),
              matches
            );

            let finalLine = currentLine.split(",");
            for (let j = 0; j < convertedValuesIndexes.length; j++) {
              let index = convertedValuesIndexes[j] - 1;
              finalLine[index] = convertedValues[j];
            }
            csvData.push(finalLine + "\n");
          } else {
            csvData.push(currentLine + "\n");
          }
        }
      });
    }
    let newFile = new File(csvData, {
      type: "text/csv;charset=utf-8,",
    });

    let objUrl = URL.createObjectURL(newFile);

    let csvFileLink = document.createElement("a");
    csvFileLink.setAttribute(
      "class",
      "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    );
    csvFileLink.setAttribute("href", objUrl);
    csvFileLink.setAttribute("download", file.name + "ConvertedFile.csv");
    csvFileLink.textContent =
      "Click to download converted " + fileType.toUpperCase() + " file";

    document.getElementById("downloadFile").append(csvFileLink);
  };
}
