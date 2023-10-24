const { src, dest, series, watch } = require('gulp');
const delet = require('del');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const svgSprite = require('gulp-svg-sprite');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpSass = require('gulp-sass');
const sass = require('sass');
const mainSass = gulpSass(sass);
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const webpackStream = require('webpack-stream');
const image = require('gulp-imagemin');
const webp = require('gulp-webp');
const htmlmin = require('gulp-htmlmin');
const typograf = require('gulp-typograf');

// paths
const srcFolder = './src';
const buildFolder = './dist';
const paths = {
  srcSvg: `${srcFolder}/img/svg/*.svg`,
  srcImgFolder: `${srcFolder}/img`,
  buildImgFolder: `${buildFolder}/img`,
  srcScss: `${srcFolder}/scss/**/*.scss`,
  buildCssFolder: `${buildFolder}/css`,
  srcFullJs: `${srcFolder}/js/**/*.js`,
  srcMainJs: `${srcFolder}/js/main.js`,
  buildJsFolder: `${buildFolder}/js`,
  resourcesFolder: `${srcFolder}/resources`,
};

let isProd = false; // dev by default

const toProd = (done) => {
  isProd = true;
  done();
};

const clean = () => {
  return delet([buildFolder])
}

// svg sprite
const svgSprites = () => {
  return src(paths.srcSvg)
  .pipe(
    svgmin({
      js2svg: {
        pretty: true,
      },
    })
  )
  .pipe(
    cheerio({
      run: function($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true,
      },
    })
  )
  .pipe(replace('&gt;', '>'))
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      },
    },
  }))
  .pipe(dest(paths.buildImgFolder));
}

const create = () => {
  return src('src/resources/**')
  .pipe(dest(paths.buildImgFolder))
}

//  scss styles
const styles = () => {
  return src(paths.srcScss, { sourcemaps: !isProd })
  .pipe(plumber(
    notify.onError({
      title:'SCSS',
      message: 'Error: <%= error.message %>'
    })
  ))
  .pipe(mainSass())
  .pipe(autoprefixer({
    cascade: false,
    grid: true,
    overrideBrowserslist: ['last 5 versions']
  }))
  .pipe(gulpif(isProd, cleanCSS({
    level: 2
  })))
  .pipe(dest(paths.buildCssFolder, { sourcemaps: '.' }))
  .pipe(browserSync.stream());
}

// styles backend
const stylesBackend = () => {
  return src(paths.srcScss)
  .pipe(plumber(
    notify.onError({
      title:'SCSS',
      message: 'Error: <%= error.message %>'
    })
  ))
  .pipe(mainSass())
  .pipe(autoprefixer({
    cascade: false,
    grid: true,
    overrideBrowserslist: ['last 5 versions']
  }))
  .pipe(dest(paths.buildCssFolder))
  .pipe(browserSync.stream());
}

// scripts
const scripts = () => {
  return src(paths.srcMainJs)
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: isProd ? 'production' : 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
      devtool: !isProd ? 'source-map' : false
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(dest(paths.buildJsFolder))
    .pipe(browserSync.stream());
}

// scripts backend
const scriptsBackend = () => {
  return src(paths.srcMainJs)
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
      devtool: false
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(dest(paths.buildJsFolder))
    .pipe(browserSync.stream());
}

const resources = () => {
  return src(`${paths.resourcesFolder}/**`)
    .pipe(dest(buildFolder))
}

const images = () => {
  return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`])
    .pipe(gulpif(isProd, image([
      image.mozjpeg({
        quality: 80,
        progressive: true
      }),
      image.optipng({
        optimizationLevel: 2
      }),
    ])))
    .pipe(dest(paths.buildImgFolder))
};

const webpImages = () => {
  return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`])
    .pipe(webp())
    .pipe(dest(paths.buildImgFolder))
};

const html = () => {
  return src([`${srcFolder}/*.html`])
    .pipe(typograf({
      locale: ['ru', 'en-US']
    }))
    .pipe(dest(buildFolder))
    .pipe(browserSync.stream());
}

const htmlMinify = () => {
  return src(`${buildFolder}/**/*.html`)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest(buildFolder));
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: `${buildFolder}`
    },
  });

  watch(paths.srcScss, styles);
  watch(paths.srcFullJs, scripts);
  watch(`${srcFolder}/*.html`, html);
  watch(`${paths.resourcesFolder}/**`, resources);
  watch(`${paths.srcImgFolder}/**/*.{jpg,jpeg,png,svg}`, images);
  watch(`${paths.srcImgFolder}/**/*.{jpg,jpeg,png}`, webpImages);
  watch(paths.srcSvg, svgSprites);
}

exports.default = series(clean, html, scripts, styles, resources, images, webpImages, svgSprites, watchFiles)

exports.backend = series(clean, html, scriptsBackend, stylesBackend, resources, images, webpImages, svgSprites)

exports.build = series(toProd, clean, html, scripts, styles, resources, images, webpImages, svgSprites, htmlMinify)
