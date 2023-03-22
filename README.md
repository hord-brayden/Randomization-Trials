# Randomization-Trials
Randomization studies to determine inherent randomness in mainstream paradigms such as excel or python based RAND() &amp; RANDBETWEEN() 


Still a WIP - Examining differing ways of determining at what point too much randomness becomes inherently un-random. Tab 2 (Other Rand Options) on excel sheet demonstrates this potential principle, we'll name the Hord Pattern.

As each iteration of the Rand() & RandBetween() run, there are visual cells found within the coalescing matrix of connecting scatterplot lines. These cells are squares of cubes of their inherent integer, rounded down from the values found within a COUNT() of columns E and F. Determining a principle from this information is still occurring, however consulting tab 1 (Raw Data & Plots) There is a threshold to be found, upon which, quantum keys can be extrapolated to be the most 'Random' and the least 'Random'.

As you can see with the velow images, the coalescing pattern found within the interference creates a range of known even integers ranging from 2,4,8,9,12,16 and others I'm still discovering.

1 X 4 Cells 
![Alt text](assets/1x4.png?raw=true "1 x 4 Cells")

2 x 3 cells
![Alt text](assets/2x3.png?raw=true "2 x 3 Cells")

3 x 3 cells
![Alt text](assets/3sq.png?raw=true "3 x 3 Cells")

3 x 4 cells
![Alt text](assets/3x4.png?raw=true "3 x 4 Cells")

4x4 cells
![Alt text](assets/4sq.png?raw=true "4 x 4 Cells")

Additionally - Inside of [V2.0 Folder](https://github.com/hord-brayden/Randomization-Trials/tree/main/v2.0) you will find an index file that, when placed into a directory with its sibling script, styles, and privacy, will also output various matrices of current randomization trends on a cartesian plane. Currently there are only 2 models built out:

* Math.Random() which comes native with JS and most/all modern languages
* XORShift model randomness combined with the Crypto API using crypto.getRandomValues()

Math.Random()
![Alt text](assets/mathrandom.png?raw=true "Title")

XORShift + Crypto.getRandomValues()
![Alt text](assets/xorshiftcrypto.png?raw=true "Title")

This will be built out more fully with other well known algorithms like:

* Linear Congruential Generator (LCG)
* [Mersenne Twister](https://github.com/boo1ean/mersenne-twister)
* Well Equidistributed Long-period Linear
And Ultimately with the final test being on
* AWS Braket using Hybrid computing, density matrix with noise simulation, and Rigetti quantum processors (universal, gate-model machines based on tunable superconducting qubits) based on Aspen-M-2 and M-3 models.

With this rudimentary HTML analysis, you can deduct from the scatter chart drawn on the canvas, inherent randomness and see the distribution of each of these models.

##UPDATE: Mar 22. 2023

Also uploaded a testing suite in the style of the [NIST Statistical Testing Suite](https://csrc.nist.gov/projects/random-bit-generation/documentation-and-software) that allows for bin-caching and testing against a __**&chi;**__ analysis. Additionally, you can run your own RNGs against this testing bed via a JSON upload. The upload would be structured as an array of random numbers, between 1 and 0. The program will break them into bins for analysis. The format would be as follows:

```
[
  0.123456789012345,
  0.987654321098765,
  0.246813579135792,
  0.864209384120985,
  ...
]
```

Ensure the JSON file has enough runs or numbers within it. The current code of the site only has 100,000 runs, or shots which will be the common nomenclature when we approach the quantum computing methods, so as to give enough data to properly run the analysis across a greater degree of data.

Example Set with __**&chi;**__ analysis:
![Alt text](assets/nist-style-suite.png?raw=true "NIST Style Test Bed")

Would love input on this. If this work is used, please cite correctly. 
