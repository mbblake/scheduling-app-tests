import { SUCCESS_MSGS, ERROR_MSGS, MISC_MSGS } from './constants';
import sinon from 'sinon';
import { expect } from 'chai';
import { IEvent, ISchedule } from './interfaces';
import { Schedule } from './schedule';

describe('Schedule class test suite', () => {
    afterEach(sinon.restore);

    const getExpectedEvents = (): IEvent[] => {
        return [
            { name: 'Meeting', startTime: '19:00', endTime: '19:30' },
            {
                name: 'Party',
                startTime: '11:00',
                endTime: '12:00',
            },
            {
                name: 'Work',
                startTime: '13:00',
                endTime: '18:00',
            },
        ];
    };

    const getExpectedPartyEvent = (): IEvent => {
        return {
            name: 'Party',
            startTime: '11:00',
            endTime: '12:00',
        };
    };

    const getExpectedWorkEvent = (): IEvent => {
        return {
            name: 'Work',
            startTime: '13:00',
            endTime: '18:00',
        };
    };

    describe('get', () => {
        it('Should get _events property', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            expect(schedule.events).to.deep.equal(getExpectedEvents());
        });
    });

    describe('set', () => {
        it('Should set _events property', () => {
            const schedule: ISchedule = new Schedule();
            schedule.events = getExpectedEvents();

            expect(schedule.events).to.deep.equal(getExpectedEvents());
        });
    });

    describe('add', () => {
        it('Should successfully add an event', () => {
            const schedule: ISchedule = new Schedule();
            const consoleSpy: any = sinon.spy(console, 'log');
            schedule.add(getExpectedPartyEvent());

            expect(schedule.events).to.deep.equal([
                { ...getExpectedPartyEvent() },
            ]);
            expect(consoleSpy.calledOnceWith(SUCCESS_MSGS.addOk + '\n'));
        });

        it('Should fail to add an event: blank name', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const event: IEvent = {
                name: '',
                startTime: '22:00',
                endTime: '23:00',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.add(event);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.addFail));
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred));
            expect(consoleSpy.calledWith(ERROR_MSGS.blankName));
        });

        it('Should fail to add an event: blank start time', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const event: IEvent = {
                name: 'Sports',
                startTime: '',
                endTime: '23:00',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.add(event);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.addFail));
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred));
            expect(consoleSpy.calledWith(ERROR_MSGS.blankStartTime));
        });

        it('Should fail to add an event: blank end time', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const event: IEvent = {
                name: 'Sports',
                startTime: '22:00',
                endTime: '',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.add(event);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.addFail));
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred));
            expect(consoleSpy.calledWith(ERROR_MSGS.blankEndTime));
        });

        it('Should fail to add an event: invalid event time', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const event: IEvent = {
                name: 'Sports',
                startTime: '22',
                endTime: '23',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.add(event);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.addFail));
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred));
            expect(consoleSpy.calledWith(ERROR_MSGS.invalidEventTime));
        });

        it('Should fail to add an event: event name unavailable', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const event: IEvent = {
                name: 'Party',
                startTime: '22:00',
                endTime: '23:00',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.add(event);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.addFail));
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred));
            expect(consoleSpy.calledWith(ERROR_MSGS.eventNameUnavailable));
        });

        it('Should fail to add an event: time slot unavailable', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const event: IEvent = {
                name: 'Sports',
                startTime: '11:30',
                endTime: '12:30',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.add(event);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.addFail));
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred));
            expect(consoleSpy.calledWith(ERROR_MSGS.timeSlotUnavailable));
        });
    });

    describe('update', () => {
        it('Should successfully update an event: all details provided', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            const eventToUpdate: string = 'Party';
            const updatedEventDetails: IEvent = {
                name: 'Party II',
                startTime: '11:30',
                endTime: '12:30',
            };

            const consoleSpy: any = sinon.spy(console, 'log');
            schedule.update(eventToUpdate, updatedEventDetails);

            expect(schedule.events).to.deep.equal([
                { name: 'Meeting', startTime: '19:00', endTime: '19:30' },
                {
                    name: 'Party II',
                    startTime: '11:30',
                    endTime: '12:30',
                },
                {
                    name: 'Work',
                    startTime: '13:00',
                    endTime: '18:00',
                },
            ]);
            expect(consoleSpy.calledOnceWith(SUCCESS_MSGS.updateOk + '\n')).to
                .be.true;
        });

        it('Should successfully update an event: only new name provided', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            const eventToUpdate: string = 'Party';
            const updatedEventDetails: IEvent = {
                name: 'Party II',
                startTime: '',
                endTime: '',
            };

            const consoleSpy: any = sinon.spy(console, 'log');
            schedule.update(eventToUpdate, updatedEventDetails);

            expect(schedule.events).to.deep.equal([
                { name: 'Meeting', startTime: '19:00', endTime: '19:30' },
                { name: 'Party II', startTime: '11:00', endTime: '12:00' },
                { name: 'Work', startTime: '13:00', endTime: '18:00' },
            ]);
            expect(consoleSpy.calledOnceWith(SUCCESS_MSGS.updateOk + '\n')).to
                .be.true;
        });

        it('Should successfully update an event: only new start time provided', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            const eventToUpdate: string = 'Party';
            const updatedEventDetails: IEvent = {
                name: '',
                startTime: '11:01',
                endTime: '',
            };

            const consoleSpy: any = sinon.spy(console, 'log');
            schedule.update(eventToUpdate, updatedEventDetails);

            expect(schedule.events).to.deep.equal([
                { name: 'Meeting', startTime: '19:00', endTime: '19:30' },
                { name: 'Party', startTime: '11:01', endTime: '12:00' },
                { name: 'Work', startTime: '13:00', endTime: '18:00' },
            ]);
            expect(consoleSpy.calledOnceWith(SUCCESS_MSGS.updateOk + '\n')).to
                .be.true;
        });

        it('Should successfully update an event: only new end time provided', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            const eventToUpdate: string = 'Party';
            const updatedEventDetails: IEvent = {
                name: '',
                startTime: '',
                endTime: '12:01',
            };

            const consoleSpy: any = sinon.spy(console, 'log');
            schedule.update(eventToUpdate, updatedEventDetails);

            expect(schedule.events).to.deep.equal([
                { name: 'Meeting', startTime: '19:00', endTime: '19:30' },
                { name: 'Party', startTime: '11:00', endTime: '12:01' },
                { name: 'Work', startTime: '13:00', endTime: '18:00' },
            ]);
            expect(consoleSpy.calledOnceWith(SUCCESS_MSGS.updateOk + '\n')).to
                .be.true;
        });

        it('Should fail to update an event: blank event to update', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            const eventToUpdate: string = '';
            const updatedEventDetails: IEvent = {
                name: 'Party II',
                startTime: '11:30',
                endTime: '12:30',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.update(eventToUpdate, updatedEventDetails);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.updateFail)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.blankEventNameToUpdate)).to
                .be.true;
        });

        it('Should fail to update an event: event to update not found', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            const eventToUpdate: string = 'Cool Party';
            const updatedEventDetails: IEvent = {
                name: 'Cool Party',
                startTime: '09:30',
                endTime: '10:30',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.update(eventToUpdate, updatedEventDetails);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.updateFail)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.eventToUpdateNotFound)).to
                .be.true;
        });

        it('Should fail to update an event: blank event name, start time, and end time', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            const eventToUpdate: string = 'Party';
            const updatedEventDetails: IEvent = {
                name: '',
                startTime: '',
                endTime: '',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.update(eventToUpdate, updatedEventDetails);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.updateFail)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.emptyUpdateDetails)).to.be
                .true;
        });

        it('Should fail to update an event: invalid event time', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            const eventToUpdate: string = 'Party';
            const updatedEventDetails: IEvent = {
                name: 'Party',
                startTime: '22',
                endTime: '23',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.update(eventToUpdate, updatedEventDetails);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.updateFail)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.invalidEventTime)).to.be
                .true;
        });

        it('Should fail to update an event: event name unavailable', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            const eventToUpdate: string = 'Party';
            const updatedEventDetails: IEvent = {
                name: 'Work',
                startTime: '22',
                endTime: '23',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.update(eventToUpdate, updatedEventDetails);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.updateFail)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.eventNameUnavailable)).to.be
                .true;
        });

        it('Should fail to update an event: time slot unavailable', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());

            const eventToUpdate: string = 'Work';
            const updatedEventDetails: IEvent = {
                name: 'Work',
                startTime: '06:00',
                endTime: '11:30',
            };

            const consoleSpy: any = sinon.spy(console, 'error');
            schedule.update(eventToUpdate, updatedEventDetails);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.updateFail)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.timeSlotUnavailable)).to.be
                .true;
        });
    });

    describe('cancel', () => {
        it('Should successfully cancel an event', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const consoleSpy: any = sinon.spy(console, 'log');
            const eventToCancel: string = 'Work';

            schedule.cancel(eventToCancel);

            expect(schedule.events).to.deep.equal([
                { name: 'Meeting', startTime: '19:00', endTime: '19:30' },
                {
                    name: 'Party',
                    startTime: '11:00',
                    endTime: '12:00',
                },
            ]);
            expect(consoleSpy.calledOnceWith(SUCCESS_MSGS.cancelOk + '\n')).to
                .be.true;
        });

        it('Should fail to cancel an event: blank event name to cancel', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const consoleSpy: any = sinon.spy(console, 'error');
            const eventToCancel: string = '';

            schedule.cancel(eventToCancel);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.cancelFail)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.blankEventNameToCancel)).to
                .be.true;
        });

        it('Should fail to cancel an event: event name to cancel not found', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const consoleSpy: any = sinon.spy(console, 'error');
            const eventToCancel: string = 'Party II';

            schedule.cancel(eventToCancel);

            expect(schedule.events).to.deep.equal(getExpectedEvents());
            expect(consoleSpy.calledWith(ERROR_MSGS.cancelFail)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.errorsOccurred)).to.be.true;
            expect(consoleSpy.calledWith(ERROR_MSGS.eventToCancelNotFound)).to
                .be.true;
        });
    });

    describe('getEventByName', () => {
        it('Should return event details if specified event exists', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            let event: IEvent = schedule.getEventByName('Work');

            expect(event).to.deep.equal(getExpectedWorkEvent());

            event = schedule.getEventByName('Party');

            expect(event).to.deep.equal(getExpectedPartyEvent());
        });

        it('Should return empty event details if specified event is not found', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const event: IEvent = schedule.getEventByName('Sports');

            expect(event).to.deep.equal({
                name: '',
                startTime: '',
                endTime: '',
            });
        });
    });

    describe('displayEvents', () => {
        it('Should display all scheduled events', () => {
            const schedule: ISchedule = new Schedule(getExpectedEvents());
            const consoleSpy: any = sinon.spy(console, 'log');

            schedule.displayEvents();

            expect(consoleSpy.calledWith('--------------\n')).to.be.true;

            schedule.events.forEach((event, i) => {
                expect(consoleSpy.calledWith(`Event #${i + 1}`)).to.be.true;
                expect(consoleSpy.calledWith(`Name: ${event.name}`)).to.be.true;
                expect(consoleSpy.calledWith(`Start time: ${event.startTime}`))
                    .to.be.true;
                expect(consoleSpy.calledWith(`End time: ${event.endTime}`)).to
                    .be.true;
                expect(consoleSpy.calledWith('--------------\n')).to.be.true;
            });
        });

        it('Should display "no events" message if no events are scheduled', () => {
            const schedule: ISchedule = new Schedule();
            const consoleSpy: any = sinon.spy(console, 'log');

            schedule.displayEvents();

            expect(
                consoleSpy.calledOnceWith(MISC_MSGS.noEventsScheduled + '\n')
            ).to.be.true;
        });
    });
});
