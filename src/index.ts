import fs from "fs";
import path from "path";
import {readConfig} from "./config/config";
import {createLatexConfig} from "./generator";

export function generateTitleConfigs(rootDir: string): void {
    const configFileName = path.join(rootDir, 'md-to-latex-title.yml');
    if (!fs.existsSync(configFileName)) {
        throw new Error(`Config ${configFileName} not found`);
    }

    const config = readConfig(configFileName);

    const outDir = path.join(rootDir, 'dist')
    if (!fs.existsSync(outDir)){
        fs.mkdirSync(outDir);
    }

    const configTex = createLatexConfig(config)
    fs.writeFileSync(path.join(outDir, 'config.tex'), configTex, 'utf8')
}