import { IEvent, IMenu, IMenuOption } from './interfaces';
import { TAction } from './types';
import { p } from './prompt';
import { PROMPTS, MISC_MSGS } from './constants';

export const displayMenu = (menu: IMenu): void => {
    const {
        title,
        menuOptions,
    }: { title: string; menuOptions: IMenuOption[] } = menu;

    console.log(`*** ${title} ***`);

    menuOptions.forEach(({ value, name }: { value: number; name: string }) => {
        console.log(`${value}. ${name}`);
    });
};

export const askMenuSelection = async (): Promise<string> => {
    let selection: string = '';

    try {
        selection = await p.ask(PROMPTS.menuSelection);
    } catch (e) {
        console.error(e);
    }

    return selection;
};

export const askEventDetails = async (action: TAction): Promise<IEvent> => {
    let name: string = '',
        startTime: string = '',
        endTime: string = '';

    try {
        name = await p.ask(
            action === 'add'
                ? PROMPTS.enterEventName
                : PROMPTS.enterNewEventName
        );

        startTime = await p.ask(
            action === 'add'
                ? PROMPTS.enterStartTime
                : PROMPTS.enterNewStartTime
        );

        endTime = await p.ask(
            action === 'add' ? PROMPTS.enterEndTime : PROMPTS.enterNewEndTime
        );
    } catch (e) {
        console.error(e);
    }

    return { name, startTime, endTime };
};

export const askEventName = async (action: TAction): Promise<string> => {
    let eventName: string = '';

    try {
        eventName = await p.ask(
            action === 'update'
                ? PROMPTS.enterEventNameToUpdate
                : PROMPTS.enterEventNameToCancel
        );
    } catch (e) {
        console.error(e);
    }

    return eventName;
};

export const isBlank = (input: string): boolean => {
    return !input.trim();
};

export const quit = (): void => {
    console.log(MISC_MSGS.quitApp);
    p.close();
};

export const askPressEnter = async (): Promise<void> => {
    try {
        await p.ask(PROMPTS.pressEnter);
    } catch (e) {
        console.error(e);
    }
};

export const clearConsole = (): void => {
    console.log(MISC_MSGS.clearConsole);
};
