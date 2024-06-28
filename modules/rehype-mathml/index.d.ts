/**
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function rehypeMathML():
  | void
  | import('unified').Transformer<import('hast').Root, import('hast').Root>
export type Root = import('hast').Root
