import esbuild from "esbuild";
import path from "node:path";
import * as sass from "sass";


// Function to compile SCSS files
function compileSCSS(inputContent, inputPath) {
	let parsed = path.parse(inputPath);
	if (!parsed.name.startsWith("index"))
		return;

	let result = sass.compileString(inputContent, {
		loadPaths: [
			parsed.dir || ".",
			this.config.dir.includes,
			'./node_modules',
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
};
