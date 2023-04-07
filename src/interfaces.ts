export interface IEvent {
    name: string;
    startTime: string;
    endTime: string;
}

export interface ISchedule {
    events: IEvent[];
    add(event: IEvent): void;
    update(eventToUpdate: string, updatedEventDetails: IEvent): void;
    cancel(eventToCancel: string): void;
    getEventByName(eventName: string): IEvent;
    displayEvents(): any;
}

export interface IMenuOption {
    value: number;
    name: string;
}

export interface IMenu {
    title: string;
    menuOptions: IMenuOption[];
}
