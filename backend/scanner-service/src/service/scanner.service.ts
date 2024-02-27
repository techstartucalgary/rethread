import ScannerProvider from "../abstract/scanner.abstract.js";
import { ScannerRequest, Tag, sustainable, Info, Flags, countries} from "../types.js";

class ScannerService implements ScannerProvider {
  constructor(private provider: ScannerProvider) {
    this.provider = provider;
  }
  //want to add functions that detect made in sustainable countries and care instructions
  public getMaterials = (text: string): Flags => {
    const materialRegex = /(100|\d{1,2})% *(\b\w+\b)/g;
    const countryRegex = /(Made\s+in|Product\s+of) *(\b\w+\b)/ig;
    const materialMatches = text.matchAll(materialRegex);
    const countryMatches = text.matchAll(countryRegex);
    let dryClean = false;
    let coldWater = false;
    let lineDry = false;
    
    
    const scannedTags: Tag[] = [];
    let country = "";

    for (const match of materialMatches) {
      if (match) {
        scannedTags.push({
          material: match[2],
          percentage: match[1],
        });
        console.log(match[2]);
      }
    }

    for (const match of countryMatches) {
      if (match) {
        country = match[2];
        console.log("Country: ", country);
      }
    }
    
    if (text.match(/dry\s+clean/ig)){//checking if dry cleaning is recommended
      console.log("dry cleaning");
      dryClean = true;
    }

    if (text.match(/cold/ig)){//checking if cold  is recommended
      console.log("cold water");
      coldWater = true;
    }
    if (text.match(/(line|hang)\s+dry/ig)){//checking if line drying is recommended
      lineDry = true;
    }
    const infoFound: Flags = {
      country: country,
      dryClean: dryClean,
      coldWater: coldWater,
      lineDry: lineDry,
      tags: this.checkPercent(scannedTags),
    };
    return infoFound;
  };

  public checkPercent = (arr: Tag[]): Tag[] => {    //for checking if percentages add to 100 and ignoring any excess materials
    let total = 0;
    let res: Tag[] = [];
    for(let i=0;i<arr.length;i++){
        if(total < 100){
            res.push(arr[i]);
            total += +arr[i].percentage;
        }
    }
    if(total != 100){
        console.log("Composition did not add to 100%");
        return [];
    }
    return res;
  }

  public getSustainability = (arr: Flags): Info => { //gives a score for the sustainability of the article of clothing
    let score = 0;
    let notes = "";
    if(arr.tags.length == 0){
      notes = "Composition did not add to 100%";
    }
    for(let i=0;i<arr.tags.length;i++){
        if(sustainable.includes(arr.tags[i].material.toLowerCase())){
            score += +arr.tags[i].percentage;
            notes = notes.concat(" " + arr.tags[i].material + " is sustainable ");
        }
        else{
            notes = notes.concat(" " + arr.tags[i].material + " is not sustainable");
        }
    }
    if(arr.country != ""){
      if(countries.includes(arr.country.toLowerCase())){
        score += 50;
        notes = notes.concat(". Produced in " + arr.country + " which is has strong environmental and labor regulations")
      }
      else{
        notes = notes.concat(". Produced in " + arr.country + " which does not have strong environmental and labor regulations")
      }
    }
    if(arr.lineDry){
      score += 20;
      notes = notes.concat(". Line drying is recommended, which consumes less energy");
    }
    if(arr.coldWater){
      score += 20;
      notes = notes.concat(". Cold water is recommended, which consumes less energy");
    }
    if(arr.dryClean){
      score -= 20;
      notes = notes.concat(". Dry cleaning is recommended, which consumes more energy");
    }
    const info: Info = {score: score,
                        notes: notes,};
    return info;
  }
  
  public getTextFromImage = async (
    scannerRequest: ScannerRequest,
  ): Promise<string> => {
    return await this.provider.getTextFromImage(scannerRequest);
  };
}

export default ScannerService;
