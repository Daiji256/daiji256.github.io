import temml from "temml/dist/temml.cjs";
import { SKIP, visitParents } from "unist-util-visit-parents";
import { toText } from "hast-util-to-text";
import { unified } from "unified";
import rehypeParse from "rehype-parse";

const assign = Object.assign;
const parseHtml = unified().use(rehypeParse, { fragment: true });

const rehypeMathML = (options) => {
  return (tree) => {
    visitParents(tree, "element", (element, parents) => {
      const classes = Array.isArray(element.properties.className)
        ? element.properties.className
        : [];

      const languageMath = classes.includes("language-math");
      const mathDisplay = classes.includes("math-display");
      const mathInline = classes.includes("math-inline");
      if (!languageMath && !mathDisplay && !mathInline) return;

      let scope = element;
      let parent = parents[parents.length - 1];
      let displayMode = mathDisplay;
      if (
        element.tagName === "code" &&
        languageMath &&
        parent &&
        parent.type === "element" &&
        parent.tagName === "pre"
      ) {
        scope = parent;
        parent = parents[parents.length - 2];
        displayMode = true;
      }

      if (!parent) return;

      const latex = toText(scope, { whitespace: "pre" });
      const mathml = temml.renderToString(
        latex,
        assign({}, options || {}, { displayMode: displayMode }),
      );

      const result = parseHtml.parse(mathml).children;
      const index = parent.children.indexOf(scope);
      parent.children.splice(index, 1, ...result);
      return SKIP;
    });
  };
};

export default rehypeMathML;
