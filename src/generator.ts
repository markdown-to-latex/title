import { MarkDownToLaTeXTitle } from './config/types';

type GeneratorChainValidator = (config: MarkDownToLaTeXTitle) => boolean;
type GeneratorChainFunction = (config: MarkDownToLaTeXTitle) => string[];

type ChainItem = {
    function: GeneratorChainFunction;
    validator: GeneratorChainValidator;
};

const latexGeneratorChain: ChainItem[] = [
    {
        function: config => [
            `
\\newcommand{\\defaultfontsize}{${config.latex?.defaultFontSize}pt}
`,
        ],
        validator: config => !!config.latex?.defaultFontSize,
    },
    {
        function: config => [
            `
\\newcommand{\\defaultfontsize}{14pt}
`,
        ],
        validator: config => !config.latex?.defaultFontSize,
    },
    {
        function: config => [
            `
\\newcommand{\\applicationcodefontsize}{${config.latex?.applicationCodeFontSize}pt}
`,
        ],
        validator: config => !!config.latex?.applicationCodeFontSize,
    },
    {
        function: config => [
            `
\\newcommand{\\applicationcodefontsize}{10pt}
`,
        ],
        validator: config => !config.latex?.applicationCodeFontSize,
    },
    {
        function: config => [
            `
\\newcommand{\\codefontsize}{${config.latex?.codeFontSize}pt}
`,
        ],
        validator: config => !!config.latex?.codeFontSize,
    },
    {
        function: config => [
            `
\\newcommand{\\codefontsize}{12pt}
`,
        ],
        validator: config => !config.latex?.codeFontSize,
    },
];

const generalGeneratorChain: ChainItem[] = [
    {
        function: config => [
            `
\\newcommand{\\topic}{${config.general.document.topic}}
\\renewcommand{\\year}{${config.general.document.year}}
\\newcommand{\\student}{${config.general.author.name}}
`,
        ],
        validator: config => !!config.general,
    },
];

const reportTitleGeneratorChain: ChainItem[] = [
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

const titleGeneratorChain: ChainItem[] = [...reportTitleGeneratorChain];

const generatorChain: ChainItem[] = [
    ...latexGeneratorChain,
    ...generalGeneratorChain,
    ...titleGeneratorChain,
];

export function createLatexConfig(config: MarkDownToLaTeXTitle): string {
    return generatorChain
        .filter(data => data.validator(config))
        .map(data => data.function(config))
        .join('');
}
