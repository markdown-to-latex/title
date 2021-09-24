// eslint-disable-next-line @typescript-eslint/no-var-requires
const schemaConverter = require('json-schema-to-typescript');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

// compile from file
schemaConverter
    .compileFromFile('md-to-latex-title.schema.json')
    .then(ts => fs.writeFileSync('src/config/types.ts', ts));
