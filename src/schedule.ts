import { ISchedule, IEvent } from './interfaces';
import { isBlank } from './helpers';
import { ERROR_MSGS, SUCCESS_MSGS, MISC_MSGS } from './constants';

export class Schedule implements ISchedule {
    private _events: IEvent[];

    constructor(events: IEvent[] = []) {
        this._events = events;
    }

    get events(): IEvent[] {
        return this._events;
    }

    set events(events: IEvent[]) {
        this._events = events;
    }

    add(newEvent: IEvent): void {
        const errors = this._validateNewEvent(newEvent);

        if (errors.length) {
            console.error(ERROR_MSGS.addFail);
            console.error(ERROR_MSGS.errorsOccurred);
            errors.forEach(error => console.error(error));
        } else {
            this.events.push(newEvent);
            console.log(SUCCESS_MSGS.addOk + '\n');
        }
    }

    update(eventToUpdate: string, updatedEventDetails: IEvent): void {
        const errors: string[] = this._validateUpdateEvent(
            eventToUpdate,
            updatedEventDetails
        );

        if (errors.length) {
            console.error(ERROR_MSGS.updateFail);
            console.error(ERROR_MSGS.errorsOccurred);
            errors.forEach(error => console.error(error));
        } else {
            for (let i = 0; i < this.events.length; i++) {
                if (this.events[i].name === eventToUpdate) {
                    this.events[i].name =
                        updatedEventDetails.name || this.events[i].name;
                    this.events[i].startTime =
                        updatedEventDetails.startTime ||
                        this.events[i].startTime;
                    this.events[i].endTime =
                        updatedEventDetails.endTime || this.events[i].endTime;
                    console.log(SUCCESS_MSGS.updateOk + '\n');
                    break;
                }
            }
        }
    }

    cancel(eventToCancel: string): void {
        const errors: string[] = this._validateCancelEvent(eventToCancel);

        if (errors.length) {
            console.error(ERROR_MSGS.cancelFail);
            console.error(ERROR_MSGS.errorsOccurred);
            errors.forEach(error => console.error(error));
        } else {
            for (let i = 0; i < this.events.length; i++) {
                if (this.events[i].name === eventToCancel) {
                    this.events.splice(i, 1);
                    console.log(SUCCESS_MSGS.cancelOk + '\n');
                    break;
                }
            }
        }
    }

    private _validateNewEvent(newEvent: IEvent): string[] {
        const errors: string[] = [];
        const {
            name,
            startTime,
            endTime,
        }: { name: string; startTime: string; endTime: string } = newEvent;

        if (isBlank(name)) errors.push(ERROR_MSGS.blankName);
        if (isBlank(startTime)) errors.push(ERROR_MSGS.blankStartTime);
        if (isBlank(endTime)) errors.push(ERROR_MSGS.blankEndTime);
        if (!this._isEventTimeValid(startTime, endTime))
            errors.push(ERROR_MSGS.invalidEventTime);
        if (!this._isEventNameAvailable(name))
            errors.push(ERROR_MSGS.eventNameUnavailable);
        if (!this._isTimeSlotAvailable(startTime, endTime))
            errors.push(ERROR_MSGS.timeSlotUnavailable);

        return errors;
    }

    private _validateUpdateEvent(
        eventToUpdate: string,
        updatedEventDetails: IEvent
    ): string[] {
        const errors: string[] = [];

        const {
            name,
            startTime,
            endTime,
        }: { name: string; startTime: string; endTime: string } =
            updatedEventDetails;

        if (isBlank(eventToUpdate))
            errors.push(ERROR_MSGS.blankEventNameToUpdate);

        if (this._isEventNameAvailable(eventToUpdate))
            errors.push(ERROR_MSGS.eventToUpdateNotFound);

        if (isBlank(name) && isBlank(startTime) && isBlank(endTime))
            errors.push(ERROR_MSGS.emptyUpdateDetails);
        else {
            const currentEventDetails = this.getEventByName(eventToUpdate);
            const mergedEventDetails = {
                name: updatedEventDetails.name || currentEventDetails.name,
                startTime:
                    updatedEventDetails.startTime ||
                    currentEventDetails.startTime,
                endTime:
                    updatedEventDetails.endTime || currentEventDetails.endTime,
            };
            if (
                !this._isEventTimeValid(
                    mergedEventDetails.startTime,
                    mergedEventDetails.endTime
                )
            )
                errors.push(ERROR_MSGS.invalidEventTime);
            if (
                !this._isEventNameAvailable(
                    mergedEventDetails.name,
                    eventToUpdate
                )
            )
                errors.push(ERROR_MSGS.eventNameUnavailable);
            if (
                !this._isTimeSlotAvailable(
                    mergedEventDetails.startTime,
                    mergedEventDetails.endTime,
                    eventToUpdate
                )
            )
                errors.push(ERROR_MSGS.timeSlotUnavailable);
        }

        return errors;
    }

    private _validateCancelEvent(eventToCancel: string): string[] {
        const errors: string[] = [];

        if (isBlank(eventToCancel))
            errors.push(ERROR_MSGS.blankEventNameToCancel);
        if (this._isEventNameAvailable(eventToCancel))
            errors.push(ERROR_MSGS.eventToCancelNotFound);

        return errors;
    }

    private _isEventNameAvailable(
        eventName: string,
        eventToSkip?: string
    ): boolean {
        let isAvailable: boolean = false;

        isAvailable = !this.events.some(scheduledEvent => {
            if (scheduledEvent.name !== eventToSkip)
                return scheduledEvent.name === eventName;
        });

        return isAvailable;
    }

    private _isEventTimeValid(startTime: string, endTime: string): boolean {
        return (
            /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(startTime) &&
            /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(endTime) &&
            startTime !== endTime &&
            startTime < endTime
        );
    }

    private _isTimeSlotAvailable(
        startTime: string,
        endTime: string,
        eventToSkip?: string
    ): boolean {
        let isAvailable: boolean = false;

        isAvailable = !this.events.some(scheduledEvent => {
            if (scheduledEvent.name !== eventToSkip)
                return (
                    (eventToSkip !== scheduledEvent.name &&
                        startTime >= scheduledEvent.startTime &&
                        startTime < scheduledEvent.endTime) ||
                    (endTime > scheduledEvent.startTime &&
                        endTime <= scheduledEvent.endTime) ||
                    (startTime <= scheduledEvent.startTime &&
                        endTime >= scheduledEvent.endTime)
                );
        });

        return isAvailable;
    }

    getEventByName(eventName: string): IEvent {
        return (
            this.events.find(event => event.name === eventName) || {
                name: '',
                startTime: '',
                endTime: '',
            }
        );
    }

    displayEvents(): void {
        if (this.events.length) {
            this._sortEventsByStartTime();
            console.log(MISC_MSGS.currentScheduleHeader);
            console.log('--------------\n');
            this.events.forEach((event, i) => {
                console.log(`Event #${i + 1}`);
                console.log(`Name: ${event.name}`);
                console.log(`Start time: ${event.startTime}`);
                console.log(`End time: ${event.endTime}`);
                console.log('--------------\n');
            });
        } else {
            console.log(MISC_MSGS.noEventsScheduled + '\n');
        }
    }

    private _sortEventsByStartTime(): void {
        this.events.sort((e1, e2) => (e1.startTime > e2.startTime ? 1 : -1));
    }
}
