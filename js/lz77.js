ReferencePrefix = "`";
ReferencePrefixCode = ReferencePrefix.charCodeAt(0);

ReferenceIntBase = 96;
ReferenceIntFloorCode = " ".charCodeAt(0);
ReferenceIntCeilCode = ReferenceIntFloorCode + ReferenceIntBase - 1;

MaxStringDistance = Math.pow(ReferenceIntBase, 2) - 1;
MinStringLength = 5;
MaxStringLength = Math.pow(ReferenceIntBase, 1) - 1 + MinStringLength;

MaxWindowLength = MaxStringDistance + MinStringLength;

function encodeReferenceInt(value, width) {
  if ((value >= 0) && (value < (Math.pow(ReferenceIntBase, width) - 1))) {
    var encoded = "";
    while (value > 0) {
      encoded = (String.fromCharCode((value % ReferenceIntBase) + ReferenceIntFloorCode)) + encoded;
      value = Math.floor(value / ReferenceIntBase);
    }

    var missingLength = width - encoded.length;
    for (var i = 0; i < missingLength; i++) {
      encoded = String.fromCharCode(ReferenceIntFloorCode) + encoded;
    }

    return encoded;
  } else {
    throw "Reference int out of range: " + value + " (width = " + width + ")";
  }
}

function encodeReferenceLength(length) {
  return encodeReferenceInt(length - MinStringLength, 1);
}

function decodeReferenceInt(data, width) {
  var value = 0;
  for (var i = 0; i < width; i++) {
    value *= ReferenceIntBase;
    var charCode = data.charCodeAt(i);
    if ((charCode >= ReferenceIntFloorCode) && (charCode <= ReferenceIntCeilCode)) {
      value += charCode - ReferenceIntFloorCode;
    } else {
      throw "Invalid char code in reference int: " + charCode;
    }
  }
  return value;
}

function decodeReferenceLength(data) {
  return decodeReferenceInt(data, 1) + MinStringLength;
}

function compress(data, windowLength) {
  if (windowLength > MaxWindowLength) {
    throw "Window length too large";
  }

  var compressed = "";
  var pos = 0;
  var lastPos = data.length - MinStringLength;
  while (pos < lastPos) {
    var searchStart = Math.max(pos - windowLength, 0);
    var matchLength = MinStringLength;
    var foundMatch = false;
    var bestMatch = {distance: MaxStringDistance, length: 0};
    var newCompressed = null;

    while ((searchStart + matchLength) < pos) {
      var isValidMatch = (
        (data.substr(searchStart, matchLength) == data.substr(pos, matchLength))
        && (matchLength < MaxStringLength)
      );
      if (isValidMatch) {
        matchLength++;
        foundMatch = true;
      } else {
        var realMatchLength = matchLength - 1;
        if (foundMatch && (realMatchLength > bestMatch.length)) {
          bestMatch.distance = pos - searchStart - realMatchLength;
          bestMatch.length = realMatchLength;
        }
        matchLength = MinStringLength;
        searchStart++;
        foundMatch = false;
      }
    }

    if (bestMatch.length) {
      newCompressed = ReferencePrefix
        + encodeReferenceInt(bestMatch.distance, 2)
        + encodeReferenceLength(bestMatch.length);
      pos += bestMatch.length;
    } else {
      if (data.charAt(pos) != ReferencePrefix) {
        newCompressed = data.charAt(pos);
      } else {
        newCompressed = ReferencePrefix + ReferencePrefix;
      }
      pos++;
    }

    compressed += newCompressed;
  }
  return compressed + data.slice(pos).replace(/`/g, "``");
}

function decompress(data) {
  var decompressed = "";
  var pos = 0;
  while (pos < data.length) {
    var currentChar = data.charAt(pos);
    if (currentChar != ReferencePrefix) {
      decompressed += currentChar;
      pos++;
    } else {
      var nextChar = data.charAt(pos + 1);
      if (nextChar != ReferencePrefix) {
        var distance = decodeReferenceInt(data.substr(pos + 1, 2), 2);
        var length = decodeReferenceLength(data.charAt(pos + 3));
        decompressed += decompressed.substr(decompressed.length - distance - length, length);
        pos += MinStringLength - 1;
      } else {
        decompressed += ReferencePrefix;
        pos += 2;
      }
    }
  }
  return decompressed;
}