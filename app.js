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

/*const processNamedGroupsValues = (groups, groupIndices, matches) => {
  Object.entries(groups).map(group => {    
    let key = group[0].split("_")[0];
    if (key.includes("decimal")) {
      let decimal = group[1];
      convertedValues.push(parseFloat(group[1].slice(0, -decimal) + "." + group[1].slice(-decimal)));
    }
    if (key.includes("quote")) {
      console.log(group[1]);
      convertedValues.push('"'+ group[1] +'"');
    }
  });
  groupIndices.map((group) => {
    matches.indices.map((match, k) => {
      if (JSON.stringify(group) == JSON.stringify(match)) {
        convertedValuesIndexes.push(k);
      }
    });
  });
};*/

/* helper function to convert a line with the given regex, useful especially for the Orders Interface */
const convertLine = (line, regex, groups) => {
  return line.replace(regex, groups);
};

/* claims is different as well? haven't seen the data for this yet so this is a placeholder at the moment */
const processClaimsInterface = () => {};

const headerWhichLine = (line) => {
  return interfaceData["orders"]["oc"][line.charAt(2) - 1].regex;
};

const regexWhichLine = (line) => {
  return interfaceData["orders"]["oc"][line.charAt(2) - 1].regex;
}

/* Order interface is a lot different to the others */
const processOrderInterface = (data, lines, type, fileIndex) => {
  let ordersData = [];
  let headerIndexes = [];
  let headerLine = [];
  let ocLines = [];
  let orderNumbers = [];
  let ocHeaders = [];;

  let filteredLines = lines.filter(
    (line) =>
      line.substring(0, 2) !== "FT" &&
      line.substring(0, 2) !== "FH" &&
      line.length !== 0
  );

  /* for orders we need to combine order header line to each order detail, ie each header can contain multiple order details lines */
  if (fileIndex == 0) {
    interfaceData[type]["oc"].forEach((element, index) => {
      let elementComma = element.heading.split(",");
      elementComma.forEach(e => {
        ocHeaders.push(e.split("-")[0] + "-" + e.split("-")[1] + '' + (index + 1) + "-" + e.split("-")[2]);
      });
    });

    ordersData.push(
      data["oh"].heading +
        "," +
        data["od"].heading +
        "," +
        ocHeaders.join(",")
    );
  }

  filteredLines.map((line, i) => {
    let header = line.substring(0, 2).toLowerCase();
    
    let interfaceLength = (header != "oc") ? interfaceData[type][header].heading.split(",").length : 3;

    let regex = (header != "oc") ? interfaceData[type][header].regex : headerWhichLine(line);

    let captureGroups = captureGroupString(interfaceLength).slice(0, -1);

    let matches = (header != "oc") ? regex.exec(line) : regexWhichLine(line).exec(line);

    let currentLine = convertLine(line, regex, captureGroups);

    /* need a way to construct the lines, to add each oh type line to od type */
    if (header == "oh") {
      orderNumbers.push({ orderNumber: currentLine.split(",")[4], start: i });
      headerIndexes.push(i);
    }

    if (header == "ot") {
      let orderObj = orderNumbers.find(
        (order) => order.orderNumber == currentLine.split(",")[3].substring(1)
      );
      orderObj.end = i;
    }

    let groupIndices = matches.indices.groups
      ? Object.values(matches.indices.groups)
      : null;

    let groups = matches.groups ? matches.groups : null;

    if (groups != null) {
      processDecimalValues(groups, groupIndices, matches);
    }
    let finalLine = currentLine.split(",");
    if (header == "od") {
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
      let headerFinalLine = headerLine.concat(finalLine);
      ordersData.push(headerFinalLine);
    }

    /* need to find and add the order ID to each line, so then we can add this to the oc line to work out which order these belong to */
    if (header == "oc") {
      let ocLine = convertLine(line, interfaceData[type]["oc"][line.charAt(2) - 1].regex, captureGroupString(interfaceData[type]["oc"][line.charAt(2) - 1].heading.split(",").length).slice(0, -1) + ",");
      ocLines.push({line: ocLine, index: i});
    }
  });

  let orderNumbersArr = orderNumbers.filter(order => Object.hasOwn(order, "end"));

  orderNumbersArr.map((order) => {
    ocLines.map((oc) => {
      if (oc.index > order.start && oc.index < order.end) {
        oc.orderNumber = order.orderNumber;
      }
    });
  });

  const finalOrdersData = [];
  ordersData.map(line => {
    let lineOrderNumber = line.split(",")[4];
    let orderOcLines = ocLines.filter(oc => oc.orderNumber == lineOrderNumber);
    let orderOcLine = orderOcLines.map(o => o.line).join("").slice(0, -1);
    finalOrdersData.push(line + ",".concat(orderOcLine.slice(0, 537)) + "\n");
  });
  return finalOrdersData;
};



function getType(file) {
  const type = file.name.match(
    /((EBIZ_|CORD\d*_|SAP2WEB_|WEB2SAP_|OURBOOKER))(?<interface>[a-z]+)(.*)/i
  );
  const fileType = type.groups.interface
    ? type.groups.interface.toLowerCase()
    : "";
  return fileType;
}

function readFileAsText(file, index, fileType) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      let csvData = [];
      const splitLines = reader.result.split(/\r\n|\n/);
      const lines = splitLines.filter((line) => line.length > 0).map(line => line.replace(/,/g, " "));

      if (fileType == "orders") {
        csvData = processOrderInterface(
          interfaceData[fileType],
          lines,
          fileType,
          index
        );
      } else {
          if (index == 0) {
            csvData.push(interfaceData[fileType].heading + "\n");
          }
        let regex = interfaceData[fileType].regex;
        let interfaceLength = interfaceData[fileType].heading.split(",").length;
      
        let captureGroups = captureGroupString(interfaceLength).slice(0, -1);

        lines.map((line) => {
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
      resolve(csvData.join(""));
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function readFile(files) {
  document.getElementById("downloadFile").innerHTML = "";
  const uploadedFiles = [...files.files];

  const fileType = getType(uploadedFiles[0]);

  const fileNames = uploadedFiles.map((file) => getType(file));

  if (!fileNames.every((fileName) => fileName === fileType)) {
    return;
  }

  const processedData = await Promise.all(
    uploadedFiles.map(async (file, index) => {
      return await readFileAsText(file, index, fileType);
    })
  );
  
  return new Promise((resolve) => {
    resolve(downloadFile(fileType, processedData));
  });
}

async function loadingSpinner(files) {
  document.getElementById("loaderDiv").innerHTML = `<div id="loader"></div>`;
  const result = await readFile(files);
}

async function downloadFile(type, data) {
  const convertedFile = new File(data, {
    type: "text/csv;charset=utf-8",
  });

  const objUrl = URL.createObjectURL(convertedFile);

  const convertedFileLink = document.createElement("a");
  
  convertedFileLink.setAttribute(
    "class",
    "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
  );

  convertedFileLink.setAttribute("href", objUrl);
  convertedFileLink.setAttribute("download", type + "ConvertedFile.csv");
  convertedFileLink.textContent = "Click to download converted " + type.toUpperCase() + " file";
  document.getElementById("loader").remove();
  document.getElementById("downloadFile").append(convertedFileLink);
}

