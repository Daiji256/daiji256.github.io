export default function rehypeQuotes() {
  const replaceQuotes = (tree) => {
    const rPm = "）｠」』］〛｝】〗〉》〕〙〟。．、，";
    const mPm = "・：；";
    replaceText(tree, new RegExp(`([${rPm}${mPm}])'`, 'g'), '$1‘');
    replaceText(tree, / '/g, " ‘");
    replaceText(tree, /' /g, "’ ");
    replaceText(tree, /^'/g, "‘");
    replaceText(tree, /'/g, "’");
    replaceText(tree, new RegExp(`([${rPm}${mPm}])"`, 'g'), '$1“');
    replaceText(tree, / "/g, " “");
    replaceText(tree, /" /g, "” ");
    replaceText(tree, /^"/g, "“");
    replaceText(tree, /"/g, "”");
  };

  const replaceText = (tree, regexp, replacement) => {
    mapText(tree, (node) => {
      return {
        type: "text",
        value: node.value.replace(regexp, replacement),
      };
    });
  };

  const mapText = (tree, block) => {
    const ignoreTags = ["code", "code-inline", "pre", "mi", "mn", "mo", "ms"];
    const _mapText = (node) => {
      if (ignoreTags.includes(node.tagName)) return node;
      if (node.children) {
        node.children = node.children.map((child) => _mapText(child));
      }
      if (node.type !== "text") return node;
      return block(node);
    };

    return _mapText(tree);
  };

  return replaceQuotes;
}
