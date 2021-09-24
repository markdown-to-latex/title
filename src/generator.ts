import { MarkDownToLaTeXTitle } from './config/types';

type GeneratorChainValidator = (config: MarkDownToLaTeXTitle) => boolean;
type GeneratorChainFunction = (config: MarkDownToLaTeXTitle) => string[];

const generatorChain: {
    function: GeneratorChainFunction;
    validator: GeneratorChainValidator;
}[] = [
    {
        function: config => [
            `
\\newcommand{\\topic}{${config.general.document.topic}}
\\newcommand{\\year}{${config.general.document.year}}
\\newcommand{\\student}{${config.general.author.name}}
`,
        ],
        validator: config => !!config.general,
    },
    {
        function: config => [
            `
\\newcommand{\\reportsubjectsubject}{${config.title.report?.document.typeDative}}
\\newcommand{\\reportsubject}{${config.title.report?.document.subject}}
\\newcommand{\\studentgroup}{${config.title.report?.author.group}}
\\newcommand{\\lecturer}{${config.title.report?.reviewer.name}}
\\newcommand{\\lecturerprof}{${config.title.report?.reviewer.status}}
`,
        ],
        validator: config => !!config.title.report,
    },
    {
        function: config => [
            `
\\newcommand{\\variantnumber}{${config.title.report?.author.variant}}
\\newcommand{\\variant}{Вариант «\\variantnumber»}
`,
        ],
        validator: config => !!config.title.report?.author.variant,
    },
];

export function createLatexConfig(config: MarkDownToLaTeXTitle): string {
    return generatorChain
        .filter(data => data.validator(config))
        .map(data => data.function(config))
        .join('');
}
