const { publish } = require("semantic-release/lib/definitions/plugins");

/**
 * Semantic Release throws error when `publish` step returns an array.
 * Since workspace may define multiple publish steps, we to avoid validating arrays.
 */
function injectPublish() {
  const { outputValidator } = publish;
  const config = publish.pipelineConfig();

  publish.outputValidator = function (output) {
    return Array.isArray(output)
      ? output.every(outputValidator)
      : outputValidator(output);
  };

  publish.postprocess = function (output) {
    return Array.isArray(output)
      ? output.flat()
      : output;
  };

  publish.pipelineConfig = function (...args) {
    return {
      ...config,
      transform(output) {
        // leave array as is as they already transformed by inner plugin
        return Array.isArray(output)
          ? output
          : config.transform.apply(this, args);
      },
    };
  };
}

// apply
injectPublish();
