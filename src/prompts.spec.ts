import { Prompt } from './prompt';
import sinon from 'sinon';
import { expect } from 'chai';
import Interface from 'readline';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

describe('Prompt class test suite', () => {
    afterEach(sinon.restore);

    const p = new Prompt();

    describe('get', () => {
        it('Should get _rl property', () => {
            expect(p.rl).to.be.a(typeof Interface);
        });
    });

    describe('ask', () => {
        it('Should be a function', () => {
            expect(p.ask).to.be.a('function');
        });

        it('Returns user input as a string', () => {
            chai.use(chaiAsPromised);

            const actualInput: any = p.ask('some query');
            const expectedInput: string = 'some user input';
            process.stdin.emit('data', expectedInput + '\r'); // Needs /r, /n, or both
            return expect(actualInput)
                .to.eventually.be.a('string')
                .and.to.eventually.equal(expectedInput);
        });
    });

    describe('close', () => {
        it('Should be a function', () => {
            expect(p.close).to.be.a('function');
        });

        it('Should call readline.close', () => {
            const closeSpy = sinon.spy(p.rl, 'close');
            p.close();
            expect(closeSpy.calledOnce).to.be.true;
        });
    });
});
