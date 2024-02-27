import { ScannerRequest, Tag, Info, Flags } from "../types";

abstract class ScannerProvider {
  abstract getMaterials(text: string): Flags;

  abstract getSustainability(arr: Flags): Info;

  abstract checkPercent(arr: Tag[]): Tag[];

  abstract getTextFromImage(scannerRequest: ScannerRequest): Promise<string>;
}

export default ScannerProvider;
