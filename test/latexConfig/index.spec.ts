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
        '\\defaultfontsize',
        '\\applicationcodefontsize',
        '\\codefontsize',
        '\\topic',
        '\\year',
        '\\student',
        '\\reportsubjectsubject',
        '\\reportsubject',
        '\\studentgroup',
        '\\lecturer',
        '\\lecturerprof',
        '\\variantnumber',
        '\\variant',
    ].forEach(command =>
        test(`Command "${command}" should exists`, () => {
            const content = fs.readFileSync(configTex, 'utf8');
            expect(content).toContain(command);
        }),
    );

    [
        '12pt',
        '8pt',
        '10pt',
        'Surname A. A.',
        'The awesome document',
        '2021',
        'The subject',
        'homework 1',
        'GG1-1',
        '99',
        'Amogus S. U.',
        'Imposter',
    ].forEach(text =>
        test(`Text "${text} should exists"`, () => {
            const content = fs.readFileSync(configTex, 'utf8');
            expect(content).toContain(text);
        }),
    );
});
