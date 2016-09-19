'use strict';

import {expect} from 'chai';
import Package from '../lib/Package';
import Bower from '../lib/Registry/Bower';
import Npm from '../lib/Registry/Npm';
import Custom from '../lib/Registry/Custom';
import cd from './helpers/cd';
import fillTypes from './helpers/fillTypes';
import configure from '../lib/configure';
import path from 'path';

const FIXTURES = path.join(__dirname, 'fixtures');

describe('Package', () => {
  afterEach(() => {
    cd.reset();
    configure.clear();
  });

  it('should use bower registry correctly', () => {
    cd('bower');

    let pkg = new Package('bootstrap', {
      js: 'dist/js',
      css: 'dist/css',
      fonts: 'dist/fonts'
    }, {
      registry: 'bower',
      flattenPackages: false,
      flattenTypes: false,
      override: true,
      renames: {},
      replaces: {}
    });

    expect(pkg.name).to.be.equal('bootstrap');
    expect(pkg.registry).to.be.an.instanceof(Bower);
    expect(pkg.options).to.be.eql({
      registry: 'bower',
      flattenPackages: false,
      flattenTypes: false,
      override: true,
      renames: {},
      replaces: {}
    });
    expect(pkg.defination).to.be.eql({
      js: 'dist/js',
      css: 'dist/css',
      fonts: 'dist/fonts'
    });

    expect(pkg.getTypedFiles()).to.be.eql({
      css: [
        'dist/css/bootstrap-theme.css',
        'dist/css/bootstrap-theme.css.map',
        'dist/css/bootstrap-theme.min.css',
        'dist/css/bootstrap-theme.min.css.map',
        'dist/css/bootstrap.css',
        'dist/css/bootstrap.css.map',
        'dist/css/bootstrap.min.css',
        'dist/css/bootstrap.min.css.map'
      ],
      js: [
        'dist/js/bootstrap.js',
        'dist/js/bootstrap.min.js',
        'dist/js/npm.js'
      ],
      fonts: [
        'dist/fonts/glyphicons-halflings-regular.eot',
        'dist/fonts/glyphicons-halflings-regular.svg',
        'dist/fonts/glyphicons-halflings-regular.ttf',
        'dist/fonts/glyphicons-halflings-regular.woff',
        'dist/fonts/glyphicons-halflings-regular.woff2'
      ]
    });

    expect(pkg.getInfo('name')).to.be.equal('bootstrap');
  });

  it('should use npm registry correctly', () => {
    cd('npm');

    let pkg = new Package('bootstrap', {
      js: 'dist/js',
      css: 'dist/css',
      fonts: 'dist/fonts'
    }, {
      registry: 'npm',
      flattenPackages: false,
      flattenTypes: false,
      override: true,
      renames: {},
      replaces: {}
    });

    expect(pkg.name).to.be.equal('bootstrap');
    expect(pkg.registry).to.be.an.instanceof(Npm);
    expect(pkg.options).to.be.eql({
      registry: 'npm',
      flattenPackages: false,
      flattenTypes: false,
      override: true,
      renames: {},
      replaces: {}
    });
    expect(pkg.defination).to.be.eql({
      js: 'dist/js',
      css: 'dist/css',
      fonts: 'dist/fonts'
    });

    expect(pkg.getTypedFiles()).to.be.eql({
      css: [
        'dist/css/bootstrap-theme.css',
        'dist/css/bootstrap-theme.css.map',
        'dist/css/bootstrap-theme.min.css',
        'dist/css/bootstrap-theme.min.css.map',
        'dist/css/bootstrap.css',
        'dist/css/bootstrap.css.map',
        'dist/css/bootstrap.min.css',
        'dist/css/bootstrap.min.css.map'
      ],
      js: [
        'dist/js/bootstrap.js',
        'dist/js/bootstrap.min.js',
        'dist/js/npm.js'
      ],
      fonts: [
        'dist/fonts/glyphicons-halflings-regular.eot',
        'dist/fonts/glyphicons-halflings-regular.svg',
        'dist/fonts/glyphicons-halflings-regular.ttf',
        'dist/fonts/glyphicons-halflings-regular.woff',
        'dist/fonts/glyphicons-halflings-regular.woff2'
      ]
    });

    expect(pkg.getInfo('name')).to.be.equal('bootstrap');
  });

  it('should use custom registry correctly', () => {
    cd('custom');

    configure.set('registry.libs.dir', 'libs');

    let pkg = new Package('bootstrap', {
      js: 'js',
      css: 'css',
      fonts: 'fonts'
    }, {
      registry: 'libs',
      flattenPackages: false,
      flattenTypes: false,
      override: true,
      renames: {},
      replaces: {}
    });

    expect(pkg.name).to.be.equal('bootstrap');
    expect(pkg.registry).to.be.an.instanceof(Custom);
    expect(pkg.options).to.be.eql({
      registry: 'libs',
      flattenPackages: false,
      flattenTypes: false,
      override: true,
      renames: {},
      replaces: {}
    });
    expect(pkg.defination).to.be.eql({
      js: 'js',
      css: 'css',
      fonts: 'fonts'
    });

    expect(pkg.getTypedFiles()).to.be.eql({
      css: [
        'css/bootstrap-theme.css',
        'css/bootstrap-theme.css.map',
        'css/bootstrap-theme.min.css',
        'css/bootstrap-theme.min.css.map',
        'css/bootstrap.css',
        'css/bootstrap.css.map',
        'css/bootstrap.min.css',
        'css/bootstrap.min.css.map'
      ],
      js: [
        'js/bootstrap.js',
        'js/bootstrap.min.js',
        'js/npm.js'
      ],
      fonts: [
        'fonts/glyphicons-halflings-regular.eot',
        'fonts/glyphicons-halflings-regular.svg',
        'fonts/glyphicons-halflings-regular.ttf',
        'fonts/glyphicons-halflings-regular.woff',
        'fonts/glyphicons-halflings-regular.woff2'
      ]
    });

    expect(pkg.getInfo('name')).to.be.equal('bootstrap');
  });

  describe('hasDirectory()', () => {
    it('should return true if directory in the package', () => {
      cd('manifest');

      let pkg = new Package('bootstrap', true, {
        registry: 'bower'
      });

      expect(pkg.hasDirectory('dist/css')).to.be.true();
    });

    it('should return false if directory in the package', () => {
      cd('manifest');

      let pkg = new Package('bootstrap', true, {
        registry: 'bower'
      });

      expect(pkg.hasDirectory('dist/none')).to.be.false();
    });

    it('should return true if directory in the package with cwd set', () => {
      cd(FIXTURES);

      configure.set('cwd', path.resolve(FIXTURES, 'manifest'));

      let pkg = new Package('bootstrap', true, {
        registry: 'bower'
      });

      expect(pkg.hasDirectory('dist/css')).to.be.true();
    });
  });

  describe('isInstalled()', () => {
    it('should return true if bower package is installed', () => {
      cd('bower');

      let pkg = new Package('normalize-css', true, {
        registry: 'bower'
      });

      expect(pkg.isInstalled()).to.be.true();
    });

    it('should return true if npm package is installed', () => {
      cd('npm');

      let pkg = new Package('bootstrap', {
        js: 'dist/js',
        css: 'dist/css',
        fonts: 'dist/fonts'
      }, {
        registry: 'npm'
      });

      expect(pkg.isInstalled()).to.be.true();
    });

    it('should return true if custom package is installed', () => {
      cd('custom');
      configure.set('registry.libs.dir', 'libs');

      let pkg = new Package('bootstrap', true, {
        registry: 'libs',
      });

      expect(pkg.isInstalled()).to.be.true();
    });

    it('should return false if bower package is not installed', () => {
      cd('bower');

      let pkg = new Package('uninstalled', true, {
        registry: 'bower'
      });

      expect(pkg.isInstalled()).to.be.false();
    });

    it('should return false if npm package is not installed', () => {
      cd('npm');

      let pkg = new Package('uninstalled', true, {
        registry: 'npm'
      });

      expect(pkg.isInstalled()).to.be.false();
    });

    it('should return false if custom package is not installed', () => {
      cd('custom');
      configure.set('registry.libs.dir', 'libs');

      let pkg = new Package('uninstalled', true, {
        registry: 'libs',
      });

      expect(pkg.isInstalled()).to.be.false();
    });
  });

  describe('getFiles()', () => {
    it('should get files correctly', () => {
      cd('bower');

      let pkg = new Package('normalize-css', true, {
        registry: 'bower'
      });

      expect(pkg.getFiles()).to.be.eql([
        'bower.json',
        'LICENSE.md',
        'normalize.css'
      ]);

      // it should use cached files
      expect(pkg.getFiles()).to.be.eql([
        'bower.json',
        'LICENSE.md',
        'normalize.css'
      ]);
    });
  });

  describe('getTypedFiles()', () => {
    it('should get files types automatically without definations', () => {
      cd('bower');

      let pkg = new Package('normalize-css', '**/*', {
        registry: 'bower'
      });

      expect(pkg.getTypedFiles()).to.be.eql(fillTypes({
        css: [
          'normalize.css'
        ]
      }));
    });

    it('should get files types with main files', () => {
      cd('bower');

      let pkg = new Package('bootstrap', true, {
        registry: 'bower'
      });

      expect(pkg.getTypedFiles()).to.be.eql(fillTypes({
        less: [
          'less/bootstrap.less'
        ],
        js: [
          'dist/js/bootstrap.js'
        ]
      }));
    });

    it('should get files types with files array definations', () => {
      cd('bower');

      let pkg = new Package('bootstrap', {
        js: ['dist/js/bootstrap.js'],
        css: ['dist/css/bootstrap.css', 'dist/css/bootstrap-theme.css']
      }, {
        registry: 'bower'
      });

      expect(pkg.getTypedFiles()).to.be.eql({
        css: [
          'dist/css/bootstrap.css',
          'dist/css/bootstrap-theme.css'
        ],
        js: [
          'dist/js/bootstrap.js'
        ]
      });
    });

    it('should get files types with definations', () => {
      cd('bower');

      let pkg = new Package('bootstrap', {
        js: 'dist/js',
        css: ['dist/css/*.css', '!dist/css/*.min.css']
      }, {
        registry: 'bower'
      });

      expect(pkg.getTypedFiles()).to.be.eql({
        css: [
          'dist/css/bootstrap-theme.css',
          'dist/css/bootstrap.css'
        ],
        js: [
          'dist/js/bootstrap.js',
          'dist/js/bootstrap.min.js',
          'dist/js/npm.js'
        ]
      });
    });

    it('should get files types with files object definations', () => {
      cd('bower');

      let pkg = new Package('bootstrap', {
        js: {
          'bootstrap.js': 'dist/js/bootstrap.min.js'
        },
        css: {
          'main.css':'dist/css/bootstrap.css',
          'theme.css':'dist/css/bootstrap-theme.css'
        }
      }, {
        registry: 'bower'
      });

      expect(pkg.getTypedFiles()).to.be.eql({
        css: [
          'dist/css/bootstrap.css',
          'dist/css/bootstrap-theme.css'
        ],
        js: [
          'dist/js/bootstrap.min.js'
        ]
      });
    });
  });

  describe('getMainFiles()', () => {
    it('should get main files correctly', () => {
      cd('bower');

      let bower = new Package('normalize-css', true, {
        registry: 'bower'
      });

      expect(bower.getMainFiles()).to.be.eql(['normalize.css']);

      cd('npm');
      let npm = new Package('normalize.css', true, {
        registry: 'npm'
      });

      expect(npm.getMainFiles()).to.be.eql(['normalize.css']);
    });
  });

  describe('getFilesByType()', () => {
    it('should get files type with definations', () => {
      cd('bower');

      let pkg = new Package('bootstrap', {
        js: 'dist/js',
        css: ['dist/css/*.css', '!dist/css/*.min.css']
      }, {
        registry: 'bower'
      });

      expect(pkg.getFilesByType('js')).to.be.eql([
        'dist/js/bootstrap.js',
        'dist/js/bootstrap.min.js',
        'dist/js/npm.js'
      ]);

      expect(pkg.getFilesByType('css')).to.be.eql([
        'dist/css/bootstrap-theme.css',
        'dist/css/bootstrap.css'
      ]);

      expect(pkg.getFilesByType('fonts')).to.be.eql([
      ]);
    });
  });
});
