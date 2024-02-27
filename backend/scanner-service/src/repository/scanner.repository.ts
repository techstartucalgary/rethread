import ScannerProvider from "../abstract/scanner.abstract.js";
import { createWorker } from "tesseract.js";
import { ScannerRequest, Tag, Info, Flags} from "../types.js";
import { TesseractServiceError } from "../error/tesseract.error.js";

class ScannerRepository implements ScannerProvider {
  public getMaterials = (text: string): Flags => {
    throw new Error("Method not implemented.");
  };
  public checkPercent = (arr: Tag[]): Tag[] => {
    throw new Error("Method not implemented.");
  };
  public getSustainability = (arr: Flags): Info => {
    throw new Error("Method not implemented.");
  };
  public getTextFromImage = async (
    scannerRequest: ScannerRequest,
  ): Promise<string> => {
    try {
      const worker: Tesseract.Worker = await createWorker("eng");
      const ret: Tesseract.RecognizeResult = await worker.recognize(
        scannerRequest.imageUrl,
      );
      await worker.terminate();
      console.log(ret.data.text);
      return ret.data.text;
    } catch (e) {
      throw new TesseractServiceError();
    }
  };
}

export default ScannerRepository;
