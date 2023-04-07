import * as helpers from './helpers';
import { MISC_MSGS, PROMPTS } from './constants';
import sinon from 'sinon';
import { expect } from 'chai';
import { p } from './prompt';
import { IEvent, IMenu } from './interfaces';

describe('Helper functions test suite', () => {
    afterEach(sinon.restore);

    describe('displayMenu', () => {
        const menu: IMenu = {
            title: 'Menu title',
            menuOptions: [
                { value: 1, name: 'Option 1' },
                { value: 2, name: 'Option 2' },
            ],
        };
        it('Calls console.log with menu title', () => {
            const consoleSpy = sinon.spy(console, 'log');
            helpers.displayMenu(menu);
            expect(consoleSpy.calledWith(`*** ${menu.title} ***`)).to.be.true;
        });

        it('Calls console.log with menu options', () => {
            const consoleSpy = sinon.spy(console, 'log');
            helpers.displayMenu(menu);
            menu.menuOptions.forEach(({ value, name }) => {
                expect(consoleSpy.calledWith(`${value}. ${name}`));
            });
        });
    });

    describe('askMenuSelection', () => {
        it('Calls p.ask once with correct argument', async () => {
            const askStub = sinon.stub(p, 'ask').resolves('3');
            await helpers.askMenuSelection();
            expect(askStub.calledOnceWith(PROMPTS.menuSelection)).to.be.true;
        });

        it('Returns user input as string', async () => {
            sinon.stub(p, 'ask').resolves('3');
            const selection = await helpers.askMenuSelection();
            expect(selection).to.equal('3');
        });

        it('Returns empty string and logs error if p.ask fails', async () => {
            sinon.stub(p, 'ask').rejects('error');
            const consoleSpy = sinon.spy(console, 'error');
            const selection = await helpers.askMenuSelection();
            expect(consoleSpy.calledOnce).to.be.true;
            expect(selection).to.be.empty;
        });
    });

    describe('askEventDetails', () => {
        it('Calls p.ask with correct arguments when adding event', async () => {
            const askStub = sinon.stub(p, 'ask').resolves('test');
            await helpers.askEventDetails('add');
            expect(askStub.calledThrice).to.be.true;
            expect(askStub.calledWith(PROMPTS.enterEventName)).to.be.true;
            expect(askStub.calledWith(PROMPTS.enterStartTime)).to.be.true;
            expect(askStub.calledWith(PROMPTS.enterEndTime)).to.be.true;
        });

        it('Calls p.ask with correct arguments when updating event', async () => {
            const askStub = sinon.stub(p, 'ask').resolves('test');
            await helpers.askEventDetails('update');
            expect(askStub.calledThrice).to.be.true;
            expect(askStub.calledWith(PROMPTS.enterNewEventName)).to.be.true;
            expect(askStub.calledWith(PROMPTS.enterNewStartTime)).to.be.true;
            expect(askStub.calledWith(PROMPTS.enterNewEndTime)).to.be.true;
        });

        it('Returns user input as IEvent object', async () => {
            const expectedEventDetails: IEvent = {
                name: 'Party',
                startTime: '12:00',
                endTime: '13:00',
            };

            const askStub = sinon.stub(p, 'ask');
            askStub.onCall(0).resolves(expectedEventDetails.name);
            askStub.onCall(1).resolves(expectedEventDetails.startTime);
            askStub.onCall(2).resolves(expectedEventDetails.endTime);
            const actualEventDetails: any = await helpers.askEventDetails(
                'add'
            );
            expect(actualEventDetails)
                .to.be.an('object')
                .and.to.deep.equal(expectedEventDetails);
        });

        it('Returns IEvent object with empty values and logs error if p.ask fails', async () => {
            const expectedEventDetails = {
                name: '',
                startTime: '',
                endTime: '',
            };

            sinon.stub(p, 'ask').resolves(Promise.reject());
            const consoleSpy = sinon.spy(console, 'error');
            const actualEventDetails = await helpers.askEventDetails('add');
            expect(consoleSpy.calledOnce).to.be.true;
            expect(actualEventDetails)
                .to.be.an('object')
                .and.to.deep.equal(expectedEventDetails);
        });
    });

    describe('askEventName', () => {
        it('Calls p.ask with correct arguments when updating event', async () => {
            const askStub = sinon.stub(p, 'ask').resolves('test');
            await helpers.askEventName('update');
            expect(askStub.calledOnceWith(PROMPTS.enterEventNameToUpdate)).to.be
                .true;
        });

        it('Calls p.ask with correct arguments when canceling event', async () => {
            const askStub = sinon.stub(p, 'ask').resolves('test');
            await helpers.askEventName('cancel');
            expect(askStub.calledOnceWith(PROMPTS.enterEventNameToCancel)).to.be
                .true;
        });

        it('Returns user input as string', async () => {
            const expectedEventName: string = 'Party';

            sinon.stub(p, 'ask').resolves(expectedEventName);
            const actualEventName: any = await helpers.askEventName('update');
            expect(actualEventName)
                .to.be.a('string')
                .and.to.equal(expectedEventName);
        });

        it('Returns empty string and logs error if p.ask fails', async () => {
            const expectedEventName: string = '';

            sinon.stub(p, 'ask').resolves(Promise.reject());
            const consoleSpy = sinon.spy(console, 'error');
            const actualEventName: any = await helpers.askEventName('update');
            expect(consoleSpy.calledOnce).to.be.true;
            expect(actualEventName)
                .to.be.a('string')
                .and.to.equal(expectedEventName);
        });
    });

    describe('isBlank', () => {
        it('Returns true or false if the input string is empty or only whitespace', () => {
            const testCases = [
                { input: '', expectedResult: true },
                { input: ' ', expectedResult: true },
                { input: ' Party ', expectedResult: false },
                { input: 'Party', expectedResult: false },
                { input: 'Party 2', expectedResult: false },
            ];

            testCases.forEach(testCase => {
                expect(helpers.isBlank(testCase.input)).to.equal(
                    testCase.expectedResult
                );
            });
        });
    });

    describe('quit', () => {
        it('Calls console.log with correct argument', async () => {
            const consoleSpy = sinon.spy(console, 'log');
            await helpers.quit();
            expect(consoleSpy.calledWith(MISC_MSGS.quitApp)).to.be.true;
        });

        it('Calls p.close', async () => {
            const closeSpy = sinon.spy(p, 'close');
            await helpers.quit();
            expect(closeSpy.called).to.be.true;
        });
    });

    describe('askPressEnter', () => {
        it('Calls p.ask with correct argument', async () => {
            const askStub = sinon.stub(p, 'ask').resolves('test');
            await helpers.askPressEnter();
            expect(askStub.calledWith(PROMPTS.pressEnter)).to.be.true;
        });

        it('Logs error if p.ask fails', async () => {
            sinon.stub(p, 'ask').resolves(Promise.reject());
            const consoleSpy = sinon.spy(console, 'error');
            await helpers.askPressEnter();
            expect(consoleSpy.calledOnce).to.be.true;
        });
    });

    describe('clearConsole', () => {
        it('Calls console.log with correct argument', () => {
            const consoleSpy = sinon.spy(console, 'log');
            helpers.clearConsole();
            expect(consoleSpy.calledWith(MISC_MSGS.clearConsole)).to.be.true;
        });
    });
});
