class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vampGenerations = 0;
    let currVamp = this;

    while(currVamp.creator) {
      currVamp = currVamp.creator;
      vampGenerations++;
    }

    return vampGenerations;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    //if its the same vamp; quick exit
    if(this === vampire){
      return this;
    }

    let thisVampCurr = this;
    let inputVampCurr = vampire;
    const thisVampireAncestors = [this];
    const inputVampireAncestors = [vampire];

    //check all ancestors plus curr vamp and log them for this vamp and input vamp if they have a match output 
    //loop through the ancestors of this vamp
    while(thisVampCurr.creator) {
      thisVampireAncestors.push(thisVampCurr.creator);
      thisVampCurr = thisVampCurr.creator;
    }

    while(inputVampCurr.creator) {
      inputVampireAncestors.push(inputVampCurr.creator);
      inputVampCurr = inputVampCurr.creator;
    }

    //loop through this vamps ancestors and check if input vamp includes it
    for(const ancestor of thisVampireAncestors){
      if(inputVampireAncestors.includes(ancestor)){
        return ancestor;
      }
    }
  }
}

module.exports = Vampire;

