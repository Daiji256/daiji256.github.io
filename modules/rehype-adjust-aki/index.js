export default function rehypeAdjustAki() {
  const jpn = "ぁ-んァ-ヶ一-龠ー";
  const wrn = "0-9A-Za-zÀ-žÀ-žͰ-ϿЀ-ӿ";
  const lPm = "（｟「『［〚｛【〖〈《〔〘〝";
  const rPm = "）｠」』］〛｝】〗〉》〕〙〟。．、，";
  const mPm = "・：；";
  const dPm = "！？‼⁇⁈⁉";
  const emSp = "　";
  const jwAkiSC = "aa--jw-aki";
  const lrPmAkiSC = "aa--lr-pm-aki";
  const mPmAkiSC = "aa--m-pm-aki";
  const dPmAkiSC = "aa--d-pm-aki";
  const lPmSC = "aa--l-pm";
  const rPmSC = "aa--r-pm";
  const mPmSC = "aa--m-pm";
  const atrType = "attribute-type";
  const atrLrLeft = "attribute-lr-left";
  const atrLrRight = "attribute-lr-right";
  const atrJpn = "attribute-jpn";
  const atrWrn = "attribute-wrn";
  const atrLPm = "attribute-lpm";
  const atrRPm = "attribute-rpm";
  const atrMPm = "attribute-mpm";
  const atrOth = "attribute-oth";

  const adjustAki = (tree) => {

    markFirstLastCharAttributes(tree);
    // TODO:
    // The current implementation requires multiple calls to move to the top,
    // which is causing performance issues.
    // This needs to be optimized.
    expandAttributes(tree);
    expandAttributes(tree);
    expandAttributes(tree);
    expandAttributes(tree);
    consumeAttributes(tree);
    deleteAttributes(tree);

    insertAkiBetween(tree, new RegExp(`[${jpn}][${wrn}]|[${wrn}][${jpn}]`), jwAkiSC);
    insertAkiBetween(tree, new RegExp(`[^${lPm}${mPm}][${lPm}]|[${rPm}][^${rPm}${mPm}]`), lrPmAkiSC);
    insertAkiBetween(tree, new RegExp(`[^${mPm}][${mPm}]|[${mPm}][^${mPm}]`), mPmAkiSC);

    replaceDpAki(tree, new RegExp(`[${dPm}]${emSp}`), dPmAkiSC);

    eraseAki(tree, new RegExp(`[${lPm}]`), lPmSC);
    eraseAki(tree, new RegExp(`[${rPm}]`), rPmSC);
    eraseAki(tree, new RegExp(`[${mPm}]`), mPmSC);
  };

  const insertAkiBetween = (tree, regexp, className) => {
    flatMapText(tree, (node) => {
      const ret = [];
      let text = node.value;
      while (true) {
        const idx = text.search(regexp);
        if (idx < 0) {
          ret.push(makeTextNode(text));
          break;
        }
        ret.push(makeTextNode(text.slice(0, idx + 1)));
        ret.push(makeSpanNode(className));
        text = text.slice(idx + 1);
      }
      return ret;
    });
  };

  const eraseAki = (tree, regexp, className) => {
    flatMapText(tree, (node) => {
      const ret = [];
      let text = node.value;
      while (true) {
        const idx = text.search(regexp);
        if (idx < 0) {
          ret.push(makeTextNode(text));
          break;
        }
        ret.push(makeTextNode(text.slice(0, idx)));
        ret.push(makeSpanNode(className, text.charAt(idx)));
        text = text.slice(idx + 1);
      }
      return ret;
    });
  };

  const replaceDpAki = (tree, regexp, className) => {
    flatMapText(tree, (node) => {
      const ret = [];
      let text = node.value;
      while (true) {
        const idx = text.search(regexp);
        if (idx < 0) {
          ret.push(makeTextNode(text));
          break;
        }
        ret.push(makeTextNode(text.slice(0, idx + 1)));
        ret.push(makeSpanNode(className));
        text = text.slice(idx + 2);
      }
      return ret;
    });
  };

  const makeTextNode = (value) => {
    return { type: "text", value: value };
  };

  const makeSpanNode = (className, value) => {
    const children = [];
    if (value !== undefined) {
      children.push(makeTextNode(value));
    }
    return {
      type: "element",
      tagName: "span",
      properties: { className: [className] },
      children: children,
    };
  };

  const flatMapText = (tree, block) => {
    const ignoreTags = ["code", "code-inline", "pre"];
    const _flatMapText = (node) => {
      if (ignoreTags.includes(node.tagName)) return [node];
      if (node.children) {
        node.children = node.children.flatMap((child) => _flatMapText(child));
      }
      if (node.type !== "text") return [node];
      return block(node);
    };

    return _flatMapText(tree)[0];
  };

  const makeAttributeNode = (lr, t) => {
    return {
      type: atrType,
      lr: lr,
      t: t,
    };
  };

  const getFirstCharAttribute = (text) => {
    if (text.length === 0) return undefined;
    const char = text.slice(0, 1);
    if ((new RegExp(`^[${jpn}]$`)).test(char)) return atrJpn;
    if ((new RegExp(`^[${wrn}]$`)).test(char)) return atrWrn;
    if ((new RegExp(`^[${lPm}]$`)).test(char)) return atrLPm;
    if ((new RegExp(`^[${rPm}]$`)).test(char)) return atrRPm;
    if ((new RegExp(`^[${mPm}]$`)).test(char)) return atrMPm;
    return atrOth;
  };

  const getLastCharAttribute = (text) => {
    if (text.length === 0) return undefined;
    const char = text.slice(-1);
    if ((new RegExp(`^[${jpn}]$`)).test(char)) return atrJpn;
    if ((new RegExp(`^[${wrn}]$`)).test(char)) return atrWrn;
    if ((new RegExp(`^[${lPm}]$`)).test(char)) return atrLPm;
    if ((new RegExp(`^[${rPm}]$`)).test(char)) return atrRPm;
    if ((new RegExp(`^[${mPm}]$`)).test(char)) return atrMPm;
    return atrOth;
  };

  const markFirstLastCharAttributes = (node) => {
    if (node.children) {
      node.children = node.children.flatMap((child) => {
        return markFirstLastCharAttributes(child);
      });
    }
    if (node.type !== "text") return [node];
    const ret = [];
    const firstCharAttribute = getFirstCharAttribute(node.value);
    if (firstCharAttribute !== undefined) {
      ret.push(makeAttributeNode(atrLrLeft, firstCharAttribute));
    }
    ret.push(node);
    const lastCharAttribute = getLastCharAttribute(node.value);
    if (lastCharAttribute !== undefined) {
      ret.push(makeAttributeNode(atrLrRight, lastCharAttribute));
    }
    return ret;
  };

  const expandAttributes = (node) => {
    if (!node.children) return [node];

    const ignoreTags = [
      "p",
      "sup",
      "sub",
      "ul",
      "ol",
      "li",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ];
    if (ignoreTags.includes(node.tagName)) {
      node.children = node.children.flatMap((child) => {
        return expandAttributes(child);
      });
      return [node];
    }

    node.children = node.children.flatMap((child) => {
      if (!child.children || child.children.length === 0) {
        return expandAttributes(child);
      }
      const ret = [];
      const first = child.children[0];
      if (first.type === atrType) {
        ret.push(first);
      }
      ret.push(...expandAttributes(child));
      const last = child.children[child.children.length - 1];
      if (last.type === atrType) {
        ret.push(last);
      }
      return ret;
    });
    return [node];
  };

  const consumeAttributes = (node) => {
    if (!node.children) return [node];

    const newChildren = [];
    let i = 0;
    while (i < node.children.length) {
      const a = node.children[i];
      const b = node.children[i + 1];
      if (
        a === undefined || a.type !== atrType || a.lr !== atrLrRight ||
        b === undefined || b.type !== atrType || b.lr !== atrLrLeft
      ) {
        newChildren.push(a);
      } else if (
        (a.t === atrWrn && b.t === atrJpn) ||
        (a.t === atrJpn && b.t === atrWrn)
      ) {
        newChildren.push(makeSpanNode(jwAkiSC));
        i++;
      } else if (
        (
          a.t !== atrLPm &&
          a.t !== atrMPm &&
          b.t === atrLPm
        ) ||
        (
          a.t === atrRPm &&
          b.t !== atrRPm &&
          b.t !== atrMPm
        )
      ) {
        newChildren.push(makeSpanNode(lrPmAkiSC));
        i++;
      } else if (
        (a.t !== atrMPm && b.t === atrMPm) ||
        (a.t === atrMPm && b.t !== atrMPm)
      ) {
        newChildren.push(makeSpanNode(mPmAkiSC));
        i++;
      } else {
        newChildren.push(a);
      }
      i++;
    }
    node.children = newChildren.flatMap((child) => consumeAttributes(child));

    return [node];
  };

  const deleteAttributes = (node) => {
    if (node.children) {
      node.children = node.children.flatMap((child) => deleteAttributes(child));
    }
    if (node.type === atrType) return [];
    return [node];
  };

  return adjustAki;
}
