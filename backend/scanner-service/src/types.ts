import { z } from "zod";
import { ScannerSchema } from "./schema/scanner.schema.js";

export type Info = {
  score: number;
  notes: string;
}

export type Tag = {
  material: string;
  percentage: string;
};

export type Flags = {
  country: string;
  dryClean: boolean;
  coldWater: boolean;
  lineDry: boolean;
  tags: Tag[];
};

export type ScannerRequest = z.infer<typeof ScannerSchema>["body"];

export const sustainable: Array<string> = ["organic cotton",
"recycled cotton",
"hemp",
"linen",
"bamboo linen",
"cork",
"econyl",
"recycled polyester",
"deadstock",
"lyocell",
"modal",
"bamboo lyocell",
"ecovero",
"piñatex",
"bananatex",
"scoby leather",
"s.cafe",
"brewed protein",
"apple leather",
"woocoa",
"cupro",
"qmilk",
"sheep wool",
"merino wool",
"alpaca wool",
"cashmere",
"camel",
"yak wool",
"vegetable tanned leather",
"down",
"silk",
"recycled"]; //list of sustainable materials. must be lowercase

export const countries: Array<string> = ["sweden",
"norway", "denmark", "finland",
"germany", "france", "netherlands", 
"canada", "australia", "new zealand", 
"switzerland", "austria", "united kingdom", 
"belgium", "luxembourg", "iceland", 
"japan", "south korea", "costa rica", 
"uruguay"];