import { IMenu } from './interfaces';

export const PROMPTS = {
    menuSelection: 'Enter an option number and hit enter: ',
    enterEventName: 'Enter the event name: ',
    enterStartTime:
        'Enter the start time in 24 hour HH:MM format (e.g. 09:30 or 23:15): ',
    enterEndTime:
        'Enter the end time in 24 hour HH:MM format (e.g. 09:30 or 23:15): ',
    enterNewEventName:
        'Enter the new event name (leave blank to keep current name): ',
    enterNewStartTime:
        'Enter the new start time (leave blank to keep current start time): ',
    enterNewEndTime:
        'Enter the new end time (leave blank to keep current end time): ',
    enterEventNameToUpdate: 'Enter the name of the event to update: ',
    enterEventNameToCancel: 'Enter the name of the event to cancel: ',
    pressEnter: 'Press enter to continue.',
} as const;

export const MISC_MSGS = {
    quitApp: 'Quitting...',
    currentScheduleHeader: 'Current Schedule',
    noEventsScheduled: 'There are currently no events scheduled.',
    clearConsole: '\x1Bc',
} as const;

export const ERROR_MSGS = {
    invalidSelection: 'Error: Invalid option selected.',
    addFail: 'Unable to schedule this event.',
    updateFail: 'Unable to update this event.',
    cancelFail: 'Unable to cancel this event.',
    errorsOccurred: 'The following errors occurred: ',
    blankName: 'Error: Event name is required when scheduling an event.',
    blankStartTime: 'Error: Start time is required when scheduling an event.',
    blankEndTime: 'Error: End time is required when scheduling an event.',
    invalidEventTime:
        'Error: One or more issues found with the event start time and/or end time. The format must be HH:MM, and the start time must occur before the end time.',
    eventNameUnavailable:
        'Error: An event with this name is already scheduled. Please double-check the schedule.',
    timeSlotUnavailable:
        'Error: Your event overlaps with an existing event. Please double-check the schedule.',
    blankEventNameToUpdate:
        'Error: Event name is required when updating an event.',
    eventToUpdateNotFound: 'Error: The event you wish to update was not found.',
    eventToCancelNotFound: 'Error: The event you wish to cancel was not found.',
    emptyUpdateDetails:
        'Error: No new event details were specified. There is nothing to update.',
    blankEventNameToCancel:
        'Error: Event name is required when canceling an event.',
} as const;

export const SUCCESS_MSGS = {
    addOk: 'The event has been scheduled successfully.',
    updateOk: 'The event has been updated successfully.',
    cancelOk: 'The event has been canceled successfully.',
} as const;

export const MAIN_MENU: IMenu = {
    title: 'Main Menu',
    menuOptions: [
        {
            value: 1,
            name: 'Schedule an event',
        },
        {
            value: 2,
            name: 'Update an event',
        },
        {
            value: 3,
            name: 'Cancel an event',
        },
        {
            value: 4,
            name: 'Display all events',
        },
        {
            value: 5,
            name: 'Quit',
        },
    ],
};
