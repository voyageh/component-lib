import path from "path";
import chalk from "chalk";
import { dest, src } from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import consola from "consola";
import { themeRoot, pkgOutput } from "../utils/paths";
import { filePrefix } from "../config/build-info";

const distFolder = path.resolve(pkgOutput, "theme-chalk");

export const buildThemeChalk = async () => {
  const sass = gulpSass(dartSass);
  const noElPrefixFile = /(index|base|display)/;
  return src(path.resolve(themeRoot, "src/*.scss"))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(details.stats.originalSize / 1000)} KB -> ${chalk.green(
            details.stats.minifiedSize / 1000
          )} KB`
        );
      })
    )
    .pipe(
      rename((path) => {
        if (!noElPrefixFile.test(path.basename)) {
          path.basename = `${filePrefix}${path.basename}`;
        }
      })
    )
    .pipe(dest(distFolder));
};
