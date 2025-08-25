import esbuild from "esbuild";
import path from "node:path";
import * as sass from "sass";


// Function to check if a value has a tag
function hasTag(value, tag) {
	return Array.isArray(value.tags) && value.tags.includes(tag);
}

// Function to select values in an array based on whether they have a tag
function selectTag(array, tag) {
	return array.filter(item => hasTag(item, tag));
}

// Function to resolve a link with the specified data
function resolveLink(value, data) {
	if (typeof value !== 'string' || data === undefined)
		return value;
	return value.startsWith("@") ? data[value.substring(1)] : value;
}


// Function to compile SCSS files
function compileSCSS(inputContent, inputPath) {
	let parsed = path.parse(inputPath);
	if (!parsed.name.startsWith("index"))
		return;

	let result = sass.compileString(inputContent, {
		loadPaths: [
			parsed.dir || ".",
			this.config.dir.includes,
			"./node_modules",
		]
	});

	this.addDependencies(inputPath, result.loadedUrls);
	return async () => result.css;
}

// Function to compile JavaScript files
async function compileJS(inputContent, inputPath) {
	let parsed = path.parse(inputPath);
	if (!parsed.name.startsWith("index"))
		return;

	let result = await esbuild.build({
		target: 'es2020',
		entryPoints: [inputPath],
		minify: true,
		bundle: true,
		write: false,
	});

	return async () => result.outputFiles[0].text;
}


// Export the Eleventy configuration
export const config = {
	htmlTemplateEngine: "njk",
};

// Adjust the configuration
export default async function (eleventyConfig) {
	// Set the directories
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.setLayoutsDirectory("_layouts");

	// Add passthrough copies
	eleventyConfig.addPassthroughCopy("assets");

	// Add custom template handling
	eleventyConfig.addExtension("scss", { outputFileExtension: "css", useLayouts: false, compile: compileSCSS });
	eleventyConfig.addExtension("js", { outputFileExtension: "js", useLayouts: false, compile: compileJS });
	eleventyConfig.addTemplateFormats(["scss", "js"]);

	// Add custom template filters
	eleventyConfig.addFilter("keys", value => Object.keys(value));
	eleventyConfig.addFilter("values", value => Object.values(value));
	eleventyConfig.addFilter("hastag", hasTag);
	eleventyConfig.addFilter("selecttag", selectTag);
	eleventyConfig.addFilter("resolvelink", resolveLink);
};
