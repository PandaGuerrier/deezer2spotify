export class Fidelity {
    name: string;
    points: number;

    constructor(name: string, points: number) {
        this.name = name;
        this.points = points;
    }

    getPoints(): number {
        return this.points;
    }

    getName(): string {
        return this.name;
    }

    setPoints(points: number): void {
        this.points = points;
    }

    setName(name: string): void {
        this.name = name;
    }

    toString(): string {
        return `${this.name} - ${this.points}`;
    }

    toJson(): any {
        return {
            name: this.name,
            points: this.points
        };
    }

    static fromJson(json: any): Fidelity {
        return new Fidelity(json.name, json.points);
    }
}
