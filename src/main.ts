import {Controller} from './controller';
import * as settings from './util/settings';

async function main(): Promise<void> {
    // Validate settings
    settings.reRead();
    const errors = settings.validate();
    if (errors.length > 0) {
        console.log([
            `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`,
            '\t\tREAD THIS CAREFULLY',
            `Refusing to start because configuration is not valid, found the following errors:`,
            ...errors.map((e) => `\t- ${e}`),
            `If you don't know how to solve this, read https://www.zigbee2mqtt.io/guide/configuration`,
            `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`,
        ].join('\n'));
        process.exit(1);
    }


    const controller = new Controller(() => { }, () => process.exit(1));
    await controller.start();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
