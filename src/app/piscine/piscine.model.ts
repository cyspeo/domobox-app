export class Piscine {
  waterTmp: number;
}

export class Secteur {
  nombre:string;
  x:number;
  y:number;
  angle: number;
  constructor(n,angle) {
    this.nombre = n;
    this.angle = angle;
  }
}

export class Programmation {
  topics: Array<boolean> = [];
}