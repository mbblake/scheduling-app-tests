import {
    displayMenu,
    askEventDetails,
    askMenuSelection,
    askEventName,
    quit,
    askPressEnter,
    clearConsole,
} from './helpers';
import { Schedule } from './schedule';
import { IEvent } from './interfaces';
import { ERROR_MSGS, MAIN_MENU } from './constants';

const schedule: Schedule = new Schedule();

(async () => {
    clearConsole();
    displayMenu(MAIN_MENU);
    let selection = await askMenuSelection();
    while (true) {
        console.log(`You entered: ${selection}`);

        switch (selection) {
            case '1':
                const eventDetails: IEvent = await askEventDetails('add');
                schedule.add(eventDetails);
                break;
            case '2':
                const eventToUpdate: string = await askEventName('update');
                const updatedEventDetails: IEvent = await askEventDetails(
                    'update'
                );
                schedule.update(eventToUpdate, updatedEventDetails);
                break;
            case '3':
                const eventToCancel: string = await askEventName('cancel');
                schedule.cancel(eventToCancel);
                break;
            case '4':
                schedule.displayEvents();
                break;
            case '5':
                quit();
                return;
            default:
                console.log(ERROR_MSGS.invalidSelection);
        }

        // Show menu again
        await askPressEnter();
        clearConsole();
        displayMenu(MAIN_MENU);
        selection = await askMenuSelection();
    }
})();
