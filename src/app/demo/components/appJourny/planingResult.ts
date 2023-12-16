export class PlaningResult {
    name: string;
    srvcName: string;
    with: string;

    constructor(name: string, srvcName: string, comingWz: string) {
        this.name = name;
        this.srvcName = srvcName;
        this.with = comingWz;
    }
}
