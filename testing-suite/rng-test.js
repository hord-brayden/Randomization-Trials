class XORShift {
    constructor(seed) {
      this.state = seed;
    }
  
    random() {
      let x = this.state;
      x ^= x << 13;
      x ^= x >> 17;
      x ^= x << 5;
      this.state = x;
      return x / 4294967296 + 0.5;
    }
  }
  
  class LCG {
    constructor(seed) {
      this.a = 1664525;
      this.c = 1013904223;
      this.m = 4294967296; // 2^32
      this.state = seed;
    }
  
    random() {
      this.state = (this.a * this.state + this.c) % this.m;
      return this.state / this.m;
    }
  }

  async function runTests() {
    const rngSelect = document.getElementById("rngSelect");
    const rngMethod = rngSelect.value;
    const jsonFileInput = document.getElementById("jsonFile");
    const jsonFile = jsonFileInput.files[0];

    const seed = 12345;
    const generateRandomNumber = getRNGFunction(rngMethod, seed);

    let samples;
    if (jsonFile) {
        samples = await readJSONFile(jsonFile);
    } else {
        const numSamples = 100000;
        samples = Array.from({ length: numSamples }, () => {
            const randomNumber = generateRandomNumber();
            return Math.round(randomNumber * 1e15) / 1e15;
        });
    }
    const numBins = 100;
    const frequencyTestResults = frequencyTest(samples, numBins);

    const binSize = 1 / numBins;
    const formattedBinCounts = frequencyTestResults.binCounts.map((count, index) => {
        const lowerBound = (index * binSize).toFixed(2);
        const upperBound = ((index + 1) * binSize).toFixed(2);
        return `Bin ${index + 1} (${lowerBound}-${upperBound}): ${count}`;
    }).join(',<p>');
    const resultsElement = document.getElementById("results");
    resultsElement.innerHTML = `<p>RNG Method: ${rngMethod}</p><p>Frequency Test:</p><p>Chi-Squared: ${frequencyTestResults.chiSquared}</p><p>Pass: ${frequencyTestResults.pass}</p><div class="bin-counts"><p>Bin Counts:</p><br>[<br>${formattedBinCounts}<br>]</div><div class="sample-counts"><!-- DON'T UNCOMMENT BELOW UNLESS YOU LIKE TO PARTY --><!-- Samples: $//{JSON.stringify(samples, null, 2)} --><!-- DON'T UNCOMMENT ABOVE UNLESS YOU LIKE TO PARTY --></div>
    `.trim();
}
  
  function getRNGFunction(method, seed) {
    switch (method) {
      case "mathRandom":
        return () => Math.random();
      case "xorShift":
        const xorShiftRng = new XORShift(seed);
        return () => xorShiftRng.random();
      case "lcg":
        const lcgRng = new LCG(seed);
        return () => lcgRng.random();
      case "cryptoRandomValues":
        return () => crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
      // Placeholder
      default:
        throw new Error("Unknown RNG method");
    }
  }
  

function frequencyTest(samples, numBins) {
    const binCounts = Array(numBins).fill(0);
    samples.forEach((sample) => {
        const binIndex = Math.floor(sample * numBins);
        binCounts[binIndex]++;
    });

    const expectedBinCount = samples.length / numBins;
    const chiSquared = binCounts.reduce((sum, count) => {
        const diff = count - expectedBinCount;
        return sum + (diff * diff) / expectedBinCount;
    }, 0);

    return {
        binCounts,
        chiSquared,
        pass: chiSquared < 3.841, // For a significance level of 0.05 with 1 degree of freedom
    };
}

async function readJSONFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const samples = JSON.parse(event.target.result);
                resolve(samples);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsText(file);
    });
}
