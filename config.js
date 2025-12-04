import StyleDictionary from 'style-dictionary';
import { isColor } from './config/filter.js';
import { cssVarsPlugin, preset, themeColors } from './config/format.js';
import { rgbChannels } from './config/transform.js';

StyleDictionary.registerTransform({
	name: 'color/rgb-channels',
	type: 'value',
	filter: isColor,
	transform: rgbChannels,
});

StyleDictionary.registerTransformGroup({
	name: 'tailwind',
	transforms: ['name/kebab', 'color/rgb', 'color/rgb-channels'],
});

StyleDictionary.registerFormat({
	name: 'tailwind/css-vars-plugin',
	format: cssVarsPlugin,
});

StyleDictionary.registerFormat({
	name: 'tailwind/theme-colors',
	format: themeColors,
});

StyleDictionary.registerFormat({
	name: 'tailwind/preset',
	format: preset,
});

export default {
    source: [
        'tokens/**/*.json'
    ],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'build/css/',
            files: [
                {
                    destination: '_variables.css',
                    format: 'css/variables',
					filter: (token) => token.path[0] !== 'primitives',
                }
            ]
        },
        javaScript: {
            transformGroup: 'js',
            buildPath: 'build/js/',
            files: [
                {
                    destination: 'variables.js',
                    format: 'javascript/es6',
					filter: (token) => token.path[0] !== 'primitives',
                }
            ]
        },
		esModule: {
			transformGroup: 'js',
			buildPath: 'build/es/',
			files: [
				{
					destination: 'variables.mjs',
					format: 'javascript/es6',
					filter: (token) => token.path[0] !== 'primitives',
				}
			]
		},	
		tailwindPreset: {
			buildPath: 'build/tailwind/',
			transformGroup: 'tailwind',
			files: [
				{
					destination: 'cssVarsPlugin.js',
					format: 'tailwind/css-vars-plugin',
					filter: (token) => token.path[0] !== 'primitives',
				},
				{
					destination: 'themeColors.js',
					format: 'tailwind/theme-colors',
					filter: (token) => token.path[0] !== 'primitives',
				},
				{
					destination: 'preset.js',
					format: 'tailwind/preset',
				},
			],
		},
    },
};