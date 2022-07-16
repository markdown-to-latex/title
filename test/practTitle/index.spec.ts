import { generateTitleConfigs } from '../../src';
import * as fs from 'fs';
import * as path from 'path';

describe('generateTitleConfigs with LaTeX', () => {
    generateTitleConfigs(__dirname);

    const dist = path.join(__dirname, 'dist');
    const configTex = path.join(dist, 'config.tex');

    test('files exists', () => {
        expect(fs.existsSync(dist)).toBeTruthy();
        expect(fs.existsSync(configTex)).toBeTruthy();
    });

    [
        '\\year',
        '\\student',
        '\\practiceid',
        '\\practicespec',
        '\\practicefacility',
        '\\practicefacilityleader',
        '\\practiceduration',
        '\\practicetasks',
    ].forEach(command =>
        test(`Command "${command}" should exists`, () => {
            const content = fs.readFileSync(configTex, 'utf8');
            expect(content).toContain(command);
        }),
    );

    [
        '2022',
        'Bebra E.N.',
        '3',
        '\\_Gang\\_USSR\\_',
        'Twitter',
        'Elon Musk',
        '01.01.1970-19.01.2038',
        '{Do a thing;}{Investigate another thing;}{Collect some money.}{}',
    ].forEach(text =>
        test(`Text "${text} should exists"`, () => {
            const content = fs.readFileSync(configTex, 'utf8');
            expect(content).toContain(text);
        }),
    );
});
