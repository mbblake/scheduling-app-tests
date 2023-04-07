import readline from 'readline';

export class Prompt {
    private _rl: readline.Interface;

    constructor() {
        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    get rl(): readline.Interface {
        return this._rl;
    }

    ask(query: string): Promise<any> {
        return new Promise(resolve => this.rl.question(query, resolve));
    }

    close(): any {
        this._rl.close();
    }
}

export const p = new Prompt();
