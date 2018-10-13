/* https://netbasal.com/javascript-the-magic-behind-event-emitter-cce3abcbcef9 */


/*
* This class adds event emitter to call functions from model and view part
*/
export class EventEmitter {
    constructor() {
        this.events = {};
    }

    /*
    * Function which stores function names and starts the proper one
    */
    handle(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);
    }

    /*
    *   Function to call function and store data
    */
    emit(eventName, data) {
        const event = this.events[eventName];
        if (event) {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    }
}

/*
* Helper function to set attributes for elements
*/

export const setAttributes = (el, attrs) => {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

