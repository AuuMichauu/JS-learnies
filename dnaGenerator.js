// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}
// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum : specimenNum,
    dna: dna,
    mutate() {
      //Array of possible mutations
      const dnaBases = ['A', 'T', 'C', 'G']

      //Selecting random Gene from given DNA
      let randGeneIndex = Math.floor(Math.random() * this.dna.length);
      let randGene = this.dna[randGeneIndex];

      //Finding an index of previously generated gene from possible mutation list
      let baseGeneIndex = dnaBases.indexOf(randGene);

      //Mutating an array of reduced possible DNA mutations and selects replacement at random
      dnaBases.splice(baseGeneIndex, 1);
      let replacementGene = dnaBases[Math.floor(Math.random() * dnaBases.length)]

      //Replaces found index with newly generated mutation
      this.dna[randGeneIndex] = replacementGene
    },

//Method that compares the percantage of similarities between both methods
    compareDna(diffObj){
      let counter = 0;
      let arrayLength = this.dna.length
      for (let i = 0; i < arrayLength; i++){
        if (this.dna[i] === diffObj.dna[i]) {
          counter++;
        }
      }
      let percentMatch = (counter / arrayLength * 100).toFixed(2)
      return console.log(`Specimen #1 and Specimen #2 have ${percentMatch}% in common.`)
    },
//Method that checks if DNA specie will survive,
    willLikelySurvive(){
      let count = 0;
      let arrayLength = this.dna.length;
      for (let i = 0; i < arrayLength; i++){
        if (this.dna[i] === 'C' || this.dna[i] === 'G'){
          count++;
        }
      }
      let survPerc = (count / arrayLength * 100).toFixed(2);
      if (survPerc >= 60) {
        return true
      }
      else {
        return false
      }
    },
  }
};

// Function that generates 30 species that will survive
let survivorSpeci = () => {
  let speciesArray = [];
  let counter = 0;
  while (counter < 30){
      let tempStrand = pAequorFactory(1, mockUpStrand())
      if (tempStrand.willLikelySurvive() === true){
          counter++;
          speciesArray.push(tempStrand.dna);
      }
  }
  return speciesArray;
}
//FACTORY FUNCTION TEST AREA
let pAq1 = pAequorFactory(1, mockUpStrand());
let pAq2 = pAequorFactory(1, mockUpStrand());
console.log(pAq1.dna);
console.log(pAq2.dna);
pAq1.compareDna(pAq2);

console.log(pAq1.willLikelySurvive());

console.log(survivorSpeci());
